import React from "react";
import { Card, CardContent } from "../ui/card";
import { Footprints, Heart, MapPin, Mountain } from "lucide-react";
import Image from "next/image";
import { TFunraise } from "@/types/fundraise";
import { formatNumber } from "@/lib/formatNumber";

const Stats = ({data}:{data:TFunraise}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2  gap-6 mb-6">
      {/* Left: Stats + Challenge Info */}
      <div className="space-y-4 ">
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-white rounded-2xl border border-stone-100">
            <CardContent className="p-4 text-center">
              <MapPin className="w-5 h-5 text-orange-600 mx-auto mb-1" />
              <p className="text-xl font-bold text-stone-900">{formatNumber(data.totalDistance)} km</p>
              <p className="text-xs text-stone-400">walked</p>
            </CardContent>
          </Card>
          <Card className="bg-white rounded-2xl border border-stone-100">
            <CardContent className="p-4 text-center">
              <Footprints className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
              <p className="text-xl font-bold text-stone-900">{formatNumber(data.totalSteps)}</p>
              <p className="text-xs text-stone-400">steps</p>
            </CardContent>
          </Card>
          <Card className="bg-white rounded-2xl border border-stone-100">
            <CardContent className="p-4 text-center">
              <Heart className="w-5 h-5 text-rose-600 mx-auto mb-1" />
              <p className="text-xl font-bold text-stone-900">${formatNumber(data.raised)}</p>
              <p className="text-xs text-stone-400">raised</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white rounded-2xl border border-stone-100">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <Mountain className="w-5 h-5 text-orange-600" />
              <h3 className="text-lg font-bold text-stone-900">
                {data.challenge.name}
              </h3>
            </div>
            <p className="text-sm text-stone-500 mb-3">
              {data.challenge.description}
            </p>
            <p className="text-xs text-stone-400">
              {formatNumber(data.totalDistance)} of {formatNumber(data.challenge.distance)} km · {data.distancePercentage}% complete · {formatNumber(data.remainingDistance)} km remaining
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Right: Route Map Image */}
      <div className="flex  items-stretch">
          <Image
            src={data.challenge.route_map?
              `${process.env.NEXT_PUBLIC_BASE_URL}${data.challenge.route_map}`
              :"/images/placeholder.jpg"
              
              }
            alt={`route map`}
            width={500}
            height={500}
            className="w-full h-full border rounded-2xl object-contain"
          />
      </div>
    </div>
  );
};

export default Stats;
