"use client";

import React, { useEffect, useState } from "react";
import Stats from "./Stats";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { TStatics } from "@/types/admin";
import axiosInstance from "@/lib/api";
import { formatNumber } from "@/lib/formatNumber";


const Overview = () => {
  const [data, setData] = useState<TStatics>({
  totalWalkers: 0,
  totalTeams: 0,
  totalDistance: "",
  totalSteps: "",
  totalPledged: "",
  totalSponsors: 0,
  challengeStats: [],
});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchAdminOverview = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/admin/dashboard");
        setData(res.data.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchAdminOverview();
  }, []);
  return (
    <>
      <Stats data = {data}/>
      {/* Stats by Challenge */}
      <Card
        className="bg-white rounded-2xl border border-stone-100 mt-6"
        data-testid="admin-stats-by-challenge"
      >
        <CardContent className="p-6">
          <h3 className="text-lg font-bold text-stone-900 mb-4">
            Stats by Challenge
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-100">
                  <th className="text-left py-2 px-3 text-xs text-stone-400 font-medium uppercase">
                    Challenge
                  </th>
                  <th className="text-left py-2 px-3 text-xs text-stone-400 font-medium uppercase">
                    Status
                  </th>
                  <th className="text-right py-2 px-3 text-xs text-stone-400 font-medium uppercase">
                    Walkers
                  </th>
                  <th className="text-right py-2 px-3 text-xs text-stone-400 font-medium uppercase">
                    Teams
                  </th>
                  <th className="text-right py-2 px-3 text-xs text-stone-400 font-medium uppercase">
                    Pledged
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.challengeStats?.map((cs, indx) => (
                  <tr key={indx} className="border-b border-stone-50">
                    <td className="py-2.5 px-3 font-medium text-stone-900">
                      {cs.challenge}
                    </td>
                    <td className="py-2.5 px-3">
                      <Badge
                        className={`rounded-full text-xs ${true ? "bg-emerald-100 text-emerald-700" : "bg-stone-100 text-stone-400"}`}
                      >
                        {cs.status ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="py-2.5 px-3 text-right text-stone-600">{cs.walkers}</td>
                    <td className="py-2.5 px-3 text-right text-stone-600">{cs.teams}</td>
                    <td className="py-2.5 px-3 text-right font-medium text-stone-900">
                      ${formatNumber(cs.pledged)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Overview;
