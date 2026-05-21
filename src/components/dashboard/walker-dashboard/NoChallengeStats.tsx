import { Footprints, Heart, MapPin, Users } from "lucide-react";
import { TProgress } from "@/types/shared";
import { Card, CardContent } from "@/components/ui/card";

type TNoChallengeProps = {
    // progress: TProgress;
    // isComplete: boolean;
    // distance: number;
    // steps: number;
    // supporters: number;
    // raised: number;
    challenge: {
        name: string;
        route_map: string;
    };
    nextMilestone?: {
        title: string;
        distance: number;
    };
    stats: {
        distance: string;
        steps: string;
        supporters: string;
        raised: string;
    };
}

export default function NoChallengeStats({ stats, nextMilestone, challenge }: TNoChallengeProps) {
    return (
        <div className="space-y-4">
            <div className="flex flex-wrap gap-6">
                <div>
                    <p className="text-xs text-stone-400 uppercase tracking-wider font-medium">Your Current Challenge</p>
                    <p className="text-lg font-bold text-stone-900">{challenge?.name}</p>
                </div>
                {nextMilestone && (
                    <div>
                        <p className="text-xs text-stone-400 uppercase tracking-wider font-medium">Next Milestone</p>
                        <p className="text-lg font-bold text-stone-900">{nextMilestone?.title}</p>
                        <p className="text-xs text-stone-500">{(nextMilestone?.distance).toFixed(1)} km away</p>
                    </div>
                )}
                {/* {isComplete && !progress.next_milestone && (
                    <div>
                        <p className="text-xs text-emerald-600 uppercase tracking-wider font-bold">Challenge Complete!</p>
                        <p className="text-sm font-bold text-stone-900">{progress.total_km} km walked</p>
                    </div>
                )} */}
            </div>

            {/* 2x2 Stat Cards */}
            <div className="grid grid-cols-2 gap-3">
                {[
                    { label: 'Distance', value: `${stats?.distance} km`, icon: MapPin, color: 'bg-orange-50 text-orange-600' },
                    { label: 'Steps', value: stats?.steps?.toLocaleString(), icon: Footprints, color: 'bg-emerald-50 text-emerald-600' },
                    { label: 'Raised', value: `$${stats?.raised}`, icon: Heart, color: 'bg-rose-50 text-rose-600' },
                    { label: 'Supporters', value: stats?.supporters, icon: Users, color: 'bg-sky-50 text-sky-600' },
                ].map((stat) => (
                    <Card key={stat.label} className="bg-white rounded-2xl border py-0 border-stone-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                        <CardContent className="p-4">
                            <div className={`w-9 h-9 rounded-xl ${stat.color.split(' ')[0]} flex items-center justify-center mb-2`}>
                                <stat.icon className={`w-4 h-4 ${stat.color.split(' ')[1]}`} />
                            </div>
                            <p className="text-2xl font-bold text-stone-900">{stat.value}</p>
                            <p className="text-xs text-stone-400 mt-0.5 uppercase tracking-wider font-medium">{stat.label}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
