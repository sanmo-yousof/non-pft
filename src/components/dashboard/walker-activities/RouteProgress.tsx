import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatNumber } from "@/lib/formatNumber";
import { TProgress } from "@/types/shared";
import Image from "next/image";

export default function RouteProgressCard({
   progress,
   total_distance
}: {
   progress: TProgress | null;
   total_distance: number;
}){

    if (!progress) {
        return null
    };


    return (
        <Card className="rounded-2xl border border-stone-100 overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)]" data-testid="route-progress-mini">
            <div className="relative h-32">
                 {/* <Image
                    src={"https://images.unsplash.com/photo-1759767119566-e7dad33d540b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDV8MHwxfHNlYXJjaHwyfHxrZW55YSUyMGxhbmRzY2FwZSUyMHJvYWQlMjByZWQlMjBlYXJ0aCUyMG1vdW50JTIwa2VueWF8ZW58MHx8fHwxNzcwNzQ3MzM3fDA&ixlib=rb-4.1.0&q=85"}
                    alt="Route"
                    className="w-full h-full object-cover"
                    width={500}
                    height={300}
                />  */}
                <div className="absolute inset-0 bg-stone-900/60" />
                <div className="absolute inset-0 flex items-center justify-center text-center">
                    <div>
                        <p className="text-white text-xs uppercase tracking-wider">Your Progress</p>
                        <p className="text-white text-2xl font-bold">{progress?.percentage}%</p>
                        <p className="text-stone-300 text-xs">{progress?.total_distance} / {total_distance} km</p>
                    </div>
                </div>
            </div>
            <CardContent className="p-4">
                <Progress value={progress?.percentage} className="h-2" />
                <p className="text-xs text-stone-500 mt-2">
                    {progress.next_milestone
                        ? `Next: ${progress.next_milestone.title} (${formatNumber(progress.remaining_distance)} km)`
                        : 'Route complete!'}
                </p>
            </CardContent>
        </Card>
    );
}