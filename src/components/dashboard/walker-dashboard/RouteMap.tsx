import { formatNumber } from "@/lib/formatNumber";
import { TMilestone } from "@/types/shared";
import { Flag, Footprints, MapPin } from "lucide-react";
import Image from "next/image";

type TRouteMapProps = {
    data: {
        distancePercentage: number;
        milestones: TMilestone[];
    };
}

function RouteMap({ data }: TRouteMapProps) {
    if (!data) return null;
    const sortedMilestones = [...(data?.milestones || [])].sort((a, b) => a.distance - b.distance);
    const totalDistance = sortedMilestones[sortedMilestones.length - 1].distance;

    const leftOffset = 4; // The % where the track starts
    const scaleFactor = 0.92; // The % of the track width available for milestones

    const getPositionStyle = (distance: number) => {
        const pct = Math.min((distance / totalDistance) * 100, 100);
        // Same math used for both dots and labels ensures perfect vertical alignment
        return { left: `calc(${pct}% * ${scaleFactor} + ${leftOffset}%)` };
    };


    return (
        <div className="relative bg-stone-50 rounded-xl p-4 md:p-6" data-testid="route-map">
            {/* Progress bar track */}
            <div className="relative h-10 flex items-center mb-2">
                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 h-3 bg-stone-200 rounded-full" />
                <div
                    className="absolute left-4 top-1/2 -translate-y-1/2 h-3 bg-primary-500 rounded-full transition-all duration-500"
                    style={{ width: `calc(${data?.distancePercentage || 0}% - 2rem)` }}
                />
                {/* Milestone markers */}
                {sortedMilestones.map((m, i) => {
                    const reached = 0 >= m.distance;
                    return (
                        <div
                            key={i}
                            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
                            style={getPositionStyle(m.distance)}
                        >
                            <div
                                className={`w-4 h-4 rounded-full border-2 ${reached ? "bg-orange-500 border-orange-600" : "bg-white border-stone-300"
                                    }`}
                                title={m.title}
                            />
                        </div>
                    );
                })}
                {/* Start marker */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 border-2 border-emerald-600 flex items-center justify-center">
                        <Flag className="w-3 h-3 text-white" />
                    </div>
                </div>
                {/* Finish marker */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
                    <div className="w-6 h-6 rounded-full bg-stone-800 border-2 border-stone-900 flex items-center justify-center">
                        <Flag className="w-3 h-3 text-white" />
                    </div>
                </div>
                {/* Walker position */}
                <div
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 transition-all duration-500"
                    style={{ left: `calc(${data?.distancePercentage || 0}% * 0.92 + 4%)` }}
                >
                    <div className="relative">
                        <div className="w-9 h-9 rounded-full bg-primary-500 border-3 border-white shadow-lg flex items-center justify-center animate-pulse">
                            <Footprints className="w-4.5 h-4.5 text-white" />
                        </div>
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-stone-900 text-white text-[10px] font-bold px-2 py-1 rounded-full whitespace-nowrap">
                            {formatNumber(data?.distancePercentage || 0)}% &middot; {totalDistance} km
                        </div>
                    </div>
                </div>
            </div>
            {/* Milestone labels + pictures */}
            <div className="relative h-28 mt-4">
                {sortedMilestones.map((m, i) => {
                    const reached = 10 >= m.distance;

                    return (
                        <div
                            key={i}
                            className="absolute top-0 -translate-x-1/2 flex flex-col items-center w-28"
                            style={getPositionStyle(m.distance)}
                        >
                            <p
                                className={`text-[10px] font-semibold text-center leading-tight mb-0.5 line-clamp-1 w-full px-1 ${reached ? "text-stone-700" : "text-stone-400"
                                    }`}
                            >
                                {m.title}
                            </p>
                            <p className="text-[9px] text-stone-400 mb-2">
                                {m.distance}km
                            </p>

                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-stone-200 overflow-hidden border-2 border-white shadow-sm transition-transform hover:scale-110">
                                {m.image ? (
                                    <img
                                        src={m.image.startsWith('http') ? m.image : `${process.env.NEXT_PUBLIC_BASE_URL || ''}/${m.image}`}
                                        alt={m.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-stone-100">
                                        <MapPin className="w-4 h-4 text-stone-300" />
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default RouteMap;