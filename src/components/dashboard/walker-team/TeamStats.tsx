
import { Card, CardContent } from "@/components/ui/card";
import { formatNumber } from "@/lib/formatNumber";
import { Heart, MapPin, Percent, Users } from 'lucide-react';

type TeamStatsProps = {
    stats: {
        totalRaise: number;
        totalDistance: number;
        avgCompletion: number;
        totalMembers: number;
    };
};

export default function TeamStats({ stats }: TeamStatsProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-white rounded-2xl border border-stone-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <CardContent className="p-5">
                    <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center mb-3">
                        <MapPin className="w-4 h-4 text-orange-600" />
                    </div>
                    <p className="text-2xl font-bold text-stone-900">{formatNumber(stats?.totalDistance || 0)} km</p>
                    <p className="text-xs text-stone-400 uppercase tracking-wider font-medium mt-0.5">Total Distance</p>
                </CardContent>
            </Card>
            <Card className="bg-white rounded-2xl border border-stone-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <CardContent className="p-5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center mb-3">
                        <Heart className="w-4 h-4 text-emerald-600" />
                    </div>
                    <p className="text-2xl font-bold text-stone-900">${formatNumber(stats?.totalRaise || 0)}</p>
                    <p className="text-xs text-stone-400 uppercase tracking-wider font-medium mt-0.5">Total Raised</p>
                </CardContent>
            </Card>
            <Card className="bg-white rounded-2xl border border-stone-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <CardContent className="p-5">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center mb-3">
                        <Percent className="w-4 h-4 text-blue-600" />
                    </div>
                    <p className="text-2xl font-bold text-stone-900">{formatNumber(stats?.avgCompletion || 0)}%</p>
                    <p className="text-xs text-stone-400 uppercase tracking-wider font-medium mt-0.5">Avg Completion</p>
                </CardContent>
            </Card>
            <Card className="bg-white rounded-2xl border border-stone-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <CardContent className="p-5">
                    <div className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center mb-3">
                        <Users className="w-4 h-4 text-sky-600" />
                    </div>
                    <p className="text-2xl font-bold text-stone-900">{formatNumber(stats?.totalMembers || 0)}</p>
                    <p className="text-xs text-stone-400 uppercase tracking-wider font-medium mt-0.5">Members</p>
                </CardContent>
            </Card>
        </div>
    )
}
