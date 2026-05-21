import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, MapPin, Trophy, Users } from "lucide-react";
import LeaderRow from "./LeaderRow";
import { TLeaderBoard } from "@/types/leaderboard";
import { formatNumber } from "@/lib/formatNumber";

const TabSection = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/leaderboard`,
    {
      cache: "no-store",
    },
  );

  const { data }: { data: TLeaderBoard } = await res.json();

  return (
    <Tabs defaultValue="distance" className="max-w-2xl w-full mx-auto">
      <TabsList className="grid grid-cols-4 bg-stone-100  w-full rounded-xl p-1 mb-6">
        <TabsTrigger
          value="distance"
          className="rounded-lg text-xs sm:text-sm data-[state=active]:bg-white"
          data-testid="tab-distance"
        >
          <MapPin className="w-3 h-3 mr-1 hidden sm:inline" /> Distance
        </TabsTrigger>
        <TabsTrigger
          value="raised"
          className="rounded-lg text-xs sm:text-sm data-[state=active]:bg-white"
          data-testid="tab-raised"
        >
          <Heart className="w-3 h-3 mr-1 hidden sm:inline" /> Raised
        </TabsTrigger>
        <TabsTrigger
          value="team-distance"
          className="rounded-lg text-xs sm:text-sm data-[state=active]:bg-white"
          data-testid="tab-team-distance"
        >
          <Users className="w-3 h-3 mr-1 hidden sm:inline" /> Teams (km)
        </TabsTrigger>
        <TabsTrigger
          value="team-raised"
          className="rounded-lg text-xs sm:text-sm data-[state=active]:bg-white"
          data-testid="tab-team-raised"
        >
          <Users className="w-3 h-3 mr-1 hidden sm:inline" /> Teams ($)
        </TabsTrigger>
      </TabsList>

      <TabsContent value="distance">
        <Card className="bg-white rounded-2xl border border-stone-100">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-stone-900 mb-4">
              Top Walkers by Distance
            </h3>
            {data.distance?.length === 0 ? (
              <p className="text-stone-400 text-center py-6">No entries yet</p>
            ) : (
              <div className="space-y-2">
                {data?.distance?.map((l, i) => (
                  <LeaderRow
                    key={l.id}
                    rank={i}
                    name={l.display_name}
                    value={formatNumber(l.total_distance)}
                    unit="km"
                    userId={l.registrations?.id}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="raised">
        <Card className="bg-white rounded-2xl border border-stone-100">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-stone-900 mb-4">
              Top Fundraisers
            </h3>
            {data.raised?.length === 0 ? (
              <p className="text-stone-400 text-center py-6">No entries yet</p>
            ) : (
              <div className="space-y-2">
                {data.raised?.map((l, i) => (
                  <LeaderRow
                    key={l.id}
                    rank={i}
                    name={l.display_name}
                    value={l.total_amount?`$${formatNumber(l.total_amount)}`:"$0.00"}
                    unit=""
                    userId={l.registrations?.id}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="team-distance">
        <Card className="bg-white rounded-2xl border border-stone-100">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-stone-900 mb-4">
              Top Teams by Distance
            </h3>
            {data.teamsDistance?.length === 0 ? (
              <p className="text-stone-400 text-center py-6">No entries yet</p>
            ) : (
              <div className="space-y-2">
                {data?.teamsDistance?.map((t, i) => (
                  <LeaderRow
                    key={t.id}
                    rank={i}
                    name={t.name}
                    member={`${t.team_members_count} members`}
                    value={formatNumber(t.total_distance)}
                    unit="km"
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="team-raised">
        <Card className="bg-white rounded-2xl border border-stone-100">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-stone-900 mb-4">
              Top Teams by Fundraising
            </h3>
            {data.teamsFundraising?.length === 0 ? (
              <p className="text-stone-400 text-center py-6">No entries yet</p>
            ) : (
              <div className="space-y-2">
                {data.teamsFundraising?.map((t, i) => (
                  <LeaderRow
                    key={t.id}
                    rank={i}
                    name={t.name}
                    member={`${t.team_members_count} members`}
                    value={t.total_raised?`$${formatNumber(t.total_raised)}`:"$0.00"}
                    unit=""
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default TabSection;
