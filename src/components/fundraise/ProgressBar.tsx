import { TMilestones } from "@/types/admin";
import { Flag, Footprints, MapPin } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { formatNumber } from "@/lib/formatNumber";


type RouteMapProps = {
  challenge: number;
  reachKm: number;
  progressPct: number;
  milestones: TMilestones[];
};


const RouteMap = ({
  challenge,
  reachKm,
  progressPct,
  milestones,
}: RouteMapProps) => {
  const sortedMilestones = [...(milestones || [])].sort(
    (a, b) => a.distance - b.distance,
  );

  // Layout constants to match the visual track
  const leftOffset = 4; // The % where the track starts
  const scaleFactor = 0.92; // The % of the track width available for milestones

  const getPositionStyle = (distance: number) => {
    const pct = Math.min((distance / challenge) * 100, 100);
    // Same math used for both dots and labels ensures perfect vertical alignment
    return { left: `calc(${pct}% * ${scaleFactor} + ${leftOffset}%)` };
  };


  return (
    <div
      className="relative bg-stone-50 rounded-xl p-4 min-h-[200px] w-full "
      data-testid="fundraise-route-map"
    >
      {/* Progress bar track */}
      <div className="relative h-10 flex items-center mb-8">
        {/* Gray Background Track */}
        <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 h-3 bg-stone-200 rounded-full" />

        {/* Active Progress Fill (Orange) */}
        <div
          className="absolute left-4 top-1/2 -translate-y-1/2 h-3 bg-orange-500 rounded-full transition-all duration-500"
          style={{ width: `calc(${Math.min(progressPct, 100)}% * ${scaleFactor})` }}
        />

        {/* Milestone Dots */}
        {sortedMilestones.map((m, i) => {
          const reached = reachKm >= m.distance;
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

        {/* Start Flag (Left) */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 -translate-x-1/2">
          <div className="w-7 h-7 rounded-full bg-emerald-500 border-2 border-white shadow-sm flex items-center justify-center">
            <Flag className="w-3.5 h-3.5 text-white" />
          </div>
        </div>

        {/* End Flag (Right) */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 translate-x-1/2">
          <div className="w-7 h-7 rounded-full bg-stone-800 border-2 border-stone-900 flex items-center justify-center">
            <Flag className="w-3.5 h-3.5 text-white" />
          </div>
        </div>

        {/* Current Progress Runner/Indicator */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 transition-all duration-500"
          style={getPositionStyle(reachKm)}
        >
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-orange-600 border-3 border-white shadow-lg flex items-center justify-center animate-pulse">
              <Footprints className="w-4 h-4 text-white" />
            </div>
            {/* Percentage/KM Bubble */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-stone-900 text-white text-[10px] font-bold px-2 py-1 rounded-full whitespace-nowrap shadow-md">
              {`${formatNumber(progressPct)} % - ${ formatNumber(reachKm)}`} km 
            </div>
          </div>
        </div>
      </div>

      {/* Milestone labels + pictures (Absolute Positioning for Alignment) */}
      <div className="relative h-28 mt-4">
        {sortedMilestones.map((m, i) => {
          const reached = reachKm >= m.distance;

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
};


const ProgressBar = ({ data, totalDistance, parcentage, totalReach }: { data: TMilestones[], totalDistance: number, parcentage: number, totalReach: number }) => {

  // console.log(totalDistance,parcentage,totalReach)

  return (
    <Card className="bg-white rounded-2xl border border-stone-100 mb-6">
      <CardContent className="p-6">
        <RouteMap
          challenge={totalDistance}
          reachKm={totalReach}
          progressPct={parcentage}
          milestones={data}
        />
      </CardContent>
    </Card>
  );
};

export default ProgressBar;
