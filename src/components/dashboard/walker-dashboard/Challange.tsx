"use client";

import { TWalkerDashboardResponse } from "@/app/(dashboard)/(walker)/walker-dashboard/page";
import NoChallengeMap from "./NoChallengeMap";
import NoChallengeStats from "./NoChallengeStats";
import RouteMap from "./RouteMap";
import NoChallengeActions from "./NoChallengeActions";
import Achievements from "./Achievements";
import { formatNumber } from "@/lib/formatNumber";
import ProgressBar from "@/components/fundraise/ProgressBar";

type TNoChallengeProps = {
    data: TWalkerDashboardResponse
}

// export const dynamic = "force-dynamic";

export default function Challenge({ data }: TNoChallengeProps) {
    // console.log(data)
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <NoChallengeStats
                    nextMilestone={data?.nextMilestone}
                    stats={{
                        distance: formatNumber(data?.totalDistance || 0),
                        steps: formatNumber(data?.totalSteps || 0),
                        supporters: formatNumber(data?.supporters || 0),
                        raised: formatNumber(data?.raisedAmount || 0),
                    }}
                    challenge={data?.challenge}
                />
                <NoChallengeMap routerMap={data?.challenge?.route_map} />
            </div>

            <ProgressBar data={data?.milestone} parcentage={data?.distancePercentage} totalDistance={data?.challenge?.distance || 0 } totalReach={data?.totalDistance || 0} />
            
            <NoChallengeActions team={data?.team} />
            {/* <RecentActivities progress={progress} /> */}
            <Achievements
                registrationLabel={data?.registrationLabel}
                nextAchievement={data?.nextAchievement}
                currentAchievement={data?.currentAchievement}
                isPaid={data?.user?.paymentStatus === "draft" ? false : true}
            />
        </div>
    )
}
