"use client";
import Challenge from "@/components/dashboard/walker-dashboard/Challange";
import Greeting from "@/components/dashboard/walker-dashboard/Greeting";
import PickChallenge from "@/components/dashboard/walker-dashboard/PickChallange";
import Loader from "@/components/shared/Loader";
import useAuth from "@/hook/useAuth";
import { getApi } from "@/lib/apiHandler";
import { TUser } from "@/types/auth";
import { TAchievement, TMilestone, TRegistration } from "@/types/shared";
import { TTeam } from "@/types/team";
import { useEffect, useState } from "react";

export const dynamic = "force-dynamic";

export type TWalkerDashboardResponse = {
  user: {
    name: string;
    image: string | null;
    paymentStatus: string;
  };

  challenge: {
    id: number;
    name: string;
    distance: number;
    route_map: string;
  };

  nextMilestone: TMilestone;

  milestoneRemainingDistance: number;
  totalDistance: number;
  totalSteps: number;
  raisedAmount: number;
  supporters: number;

  milestone: TMilestone[];

  distancePercentage: number;

  // activities: any[]; // no structure provided

  registrationLabel: TRegistration;

  paymentStatus: {
    id: number;
    user_id: number;
    status: "pending" | "paid" | "failed" | string;
  };

  currentAchievement: TAchievement | null;

  nextAchievement: TAchievement | null;

  team: null | TTeam;
};

export default function DashboardPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<TWalkerDashboardResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getApi<{ data: { data: TWalkerDashboardResponse } }>(
          "/walker/dashboard",
        );
        const data = res?.data?.data;
        setData(data);
        // console.log("res", data);
      } catch (e: unknown) {
        console.error("Error fetching dashboard data:", e);
      }finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  if (loading) {
    return (
      <div className="container-app py-8 md:py-12">
        <Loader />
      </div>
    );
  }


  return (
    <div className="container-app py-8 md:py-12" data-testid="dashboard-page">
      <Greeting
        isOnboarding={!!user?.is_onbording}
        isComplete={(data?.distancePercentage ?? 0) >= 100}
      />
      { !user?.is_onbording  || !data ? (
        <PickChallenge />
      ) : (
        <Challenge data={data} />
      )}
    </div>
  );
}
