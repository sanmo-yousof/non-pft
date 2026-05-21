import { Card } from "@/components/ui/card";
import { Mountain } from "lucide-react";
import Image from "next/image";

type TNoChallengeProps = {
  // progress: TProgress;
  routerMap?: string;
}

export default function NoChallengeMap({ routerMap }: TNoChallengeProps) {
  return (
    <div className="flex items-stretch">
      {routerMap ? (
        <Card className="bg-white rounded-2xl border border-stone-100 overflow-hidden w-full" data-testid="dashboard-route-map-image">
          <Image
            src={process.env.NEXT_PUBLIC_BASE_URL + routerMap}
            alt={`${routerMap} route map`}
            className="w-full h-auto object-contain"
            width={500}
            height={300}
          />
        </Card>
      ) : (
        <Card className="bg-stone-50 rounded-2xl border border-stone-100 w-full flex items-center justify-center min-h-[280px]">
          <div className="text-center p-8">
            <Mountain className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <p className="text-sm text-stone-400">Route map not yet uploaded</p>
          </div>
        </Card>
      )}
    </div>
  )
}
