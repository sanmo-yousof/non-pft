import React from "react";
import {
  Building2,
  DollarSign,
  Footprints,
  Mountain,
  Users,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { TStatics } from "@/types/admin";
import { formatNumber } from "@/lib/formatNumber";

const Stats = ({ data }: { data: TStatics }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <Card className="bg-white rounded-2xl border border-stone-100">
        <CardContent className="p-5">
          <Users className="w-5 h-5 text-primary-600 mb-2" />
          <p className="text-2xl font-bold text-stone-900">
            {formatNumber(data.totalWalkers)} 
          </p>
          <p className="text-xs text-stone-400 uppercase tracking-wider font-medium mt-0.5">
            Total Walkers
          </p>
        </CardContent>
      </Card>

      <Card className="bg-white rounded-2xl border border-stone-100">
        <CardContent className="p-5">
          <Users className="w-5 h-5 text-primary-600 mb-2" />
          <p className="text-2xl font-bold text-stone-900">{formatNumber(data.totalTeams)}</p>
          <p className="text-xs text-stone-400 uppercase tracking-wider font-medium mt-0.5">
            Total Teams
          </p>
        </CardContent>
      </Card>
      <Card className="bg-white rounded-2xl border border-stone-100">
        <CardContent className="p-5">
          <Mountain className="w-5 h-5 text-primary-600 mb-2" />
          <p className="text-2xl font-bold text-stone-900">
            {formatNumber(data.totalDistance)} km
          </p>
          <p className="text-xs text-stone-400 uppercase tracking-wider font-medium mt-0.5">
            Total Distance
          </p>
        </CardContent>
      </Card>
      <Card className="bg-white rounded-2xl border border-stone-100">
        <CardContent className="p-5">
          <Footprints className="w-5 h-5 text-primary-600 mb-2" />
          <p className="text-2xl font-bold text-stone-900">{formatNumber(data.totalSteps)}</p>
          <p className="text-xs text-stone-400 uppercase tracking-wider font-medium mt-0.5">
            Total Steps
          </p>
        </CardContent>
      </Card>
      <Card className="bg-white rounded-2xl border border-stone-100">
        <CardContent className="p-5">
          <DollarSign className="w-5 h-5 text-primary-600 mb-2" />
          <p className="text-2xl font-bold text-stone-900">${formatNumber(data.totalPledged)}</p>
          <p className="text-xs text-stone-400 uppercase tracking-wider font-medium mt-0.5">
            Total Pledged
          </p>
        </CardContent>
      </Card>
      <Card className="bg-white rounded-2xl border border-stone-100">
        <CardContent className="p-5">
          <Building2 className="w-5 h-5 text-primary-600 mb-2" />
          <p className="text-2xl font-bold text-stone-900">{formatNumber(data.totalSponsors)}</p>
          <p className="text-xs text-stone-400 uppercase tracking-wider font-medium mt-0.5">
            Corporate Sponsors
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Stats;
