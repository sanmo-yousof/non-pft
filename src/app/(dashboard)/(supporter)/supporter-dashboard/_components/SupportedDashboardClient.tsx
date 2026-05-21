"use client";
import Loader from "@/components/shared/Loader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getApi } from "@/lib/apiHandler";
import { TPledge } from "@/types/pledge";
import {
  ArrowRight,
  DollarSign,
  ExternalLink,
  Heart,
  MapPin,
  Mountain,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SupporterDashboardClient() {
  const [pledges, setPledges] = useState<TPledge[]>([]);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = (await getApi("/supporter/dashboard")) as any;
        setData(res?.data?.data);
        const formatted: TPledge[] = res?.data?.data?.pledges?.map(
          (item: any) => {
            const isPerKm = item.pledge.type === "per_km";
            const amount = Number(item.pledge.amount);
            const distance = Number(item.totalDistance || 0);

            return {
              id: item.pledge.id,
              walker_name: item?.walker,
              pledge_type: item.pledge.type,
              pledge_total: isPerKm ? undefined : amount,
              pledge_per_km: isPerKm ? amount : undefined,
              status: item.pledge.status,
              created_at: item.pledge.created_at,

              walker: {
                display_name: item.walker,
                full_name: item.walker,
              },

              challenge: {
                name: item.challenge.name,
                total_distance_km: item.challenge.distance,
              },

              walker_progress_pct: Number(item.percentage || 0),
              walker_total_km: distance,
            };
          },
        );

        setPledges(formatted);
        console.log(formatted);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div
      className="container-app py-8 md:py-12"
      data-testid="supporter-dashboard"
    >
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-stone-900 mb-2">
          Your Supporter Dashboard
        </h1>
        <p className="text-stone-500">
          Track the walkers you&apos;re supporting and your pledges.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card className="bg-white rounded-2xl border border-stone-100">
          <CardContent className="p-5 text-center">
            <Heart className="w-6 h-6 text-rose-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-stone-900">
              {pledges.length}
            </p>
            <p className="text-xs text-stone-400">Active Pledges</p>
          </CardContent>
        </Card>
        <Card className="bg-white rounded-2xl border border-stone-100">
          <CardContent className="p-5 text-center">
            <Users className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-stone-900">
              {data?.warkerSupport}
            </p>
            <p className="text-xs text-stone-400">Walkers Supported</p>
          </CardContent>
        </Card>
        <Card className="bg-white rounded-2xl border border-stone-100">
          <CardContent className="p-5 text-center">
            <DollarSign className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-emerald-600">
              ${data?.pledgeAmount}
            </p>
            <p className="text-xs text-stone-400">Total Pledged</p>
          </CardContent>
        </Card>
      </div>

      {pledges.length === 0 ? (
        <Card className="bg-white rounded-2xl border border-stone-100">
          <CardContent className="p-12 text-center">
            <Heart className="w-12 h-12 text-stone-200 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-stone-900 mb-2">
              No Pledges Yet
            </h3>
            <p className="text-stone-500 mb-6">
              Support walkers by visiting their fundraising pages and making a
              pledge.
            </p>
            <Link href="/leaderboard">
              <Button className="rounded-full bg-orange-600 hover:bg-orange-700 text-white">
                Discover Walkers <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-stone-900">Your Pledges</h2>
          {pledges.map((pledge) => {
            const walker = pledge.walker;
            const challenge = pledge.challenge;
            const progressPct = pledge.walker_progress_pct || 0;

            return (
              <Card
                key={pledge.id}
                className="bg-white rounded-2xl border border-stone-100 hover:shadow-md transition-shadow"
                data-testid={`pledge-card-${pledge.id}`}
              >
                <CardContent className="p-5">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                        <span className="text-lg font-bold text-orange-700">
                          {walker?.display_name?.[0] ||
                            walker?.full_name?.[0] ||
                            "?"}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-stone-900 truncate">
                          {pledge?.walker_name}
                        </h3>
                        {challenge && (
                          <div className="flex items-center gap-1 text-xs text-stone-500">
                            <Mountain className="w-3 h-3" />
                            <span className="truncate">{challenge.name}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="text-stone-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />{" "}
                          {pledge.walker_total_km || 0} km
                        </span>
                        <span className="font-medium text-stone-700">
                          {progressPct}%
                        </span>
                      </div>
                      <Progress value={progressPct} className="h-2" />
                      {challenge && (
                        <p className="text-[10px] text-stone-400 mt-1">
                          of {challenge.total_distance_km} km
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <Badge className="bg-emerald-50 text-emerald-700 rounded-full font-bold px-3 py-1">
                          {pledge.pledge_type === "per_km"
                            ? `$${pledge.pledge_per_km}/km`
                            : `$${pledge.pledge_total}`}
                        </Badge>
                        {pledge.pledge_type === "per_km" && (
                          <p className="text-[10px] text-stone-400 mt-1">
                            Est: $
                            {(challenge?.total_distance_km || 0) *
                              (pledge.pledge_per_km || 0)}
                          </p>
                        )}
                      </div>
                      <Link href={`/fundraise/${pledge.id}`}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full text-stone-400 hover:text-orange-600"
                          data-testid={`view-walker-${pledge.walker_name}`}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="rounded-full text-xs border-stone-200 text-stone-500"
                      >
                        {pledge.status === "active" ? "Active" : pledge.status}
                      </Badge>
                      <span className="text-xs text-stone-400">
                        Pledged on{" "}
                        {new Date(pledge.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {pledges.length > 0 && (
        <Card className="bg-linear-to-r from-orange-50 to-amber-50 rounded-2xl border border-orange-100 mt-8">
          <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-stone-900 mb-1">
                Want to support more walkers?
              </h3>
              <p className="text-sm text-stone-600">
                Check out the leaderboard to find more walkers making a
                difference.
              </p>
            </div>
            <Link href="/leaderboard">
              <Button className="rounded-full bg-orange-600 hover:bg-orange-700 text-white shrink-0">
                View Leaderboard <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
