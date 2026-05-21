// @ts-nocheck

import { ArrowRight, Footprints } from "lucide-react";
import Link from "next/link";
import { TProgress } from "@/types/shared";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type TRecentActivitiesProps = {
    progress: TProgress;
}

export default function RecentActivities({ progress }: TRecentActivitiesProps) {
    if (progress.recent_activities?.length > 0) return null;
    return (
        <Card className="bg-white rounded-2xl border border-stone-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-stone-900">Recent Activity</h3>
                    <Link href="/activity">
                        <Button variant="ghost" size="sm" className="text-orange-600 hover:text-orange-700 rounded-full" data-testid="dashboard-view-all-btn">
                            View All <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                    </Link>
                </div>
                <div className="space-y-3">
                    {progress.recent_activities.slice(0, 5).map((act) => (
                        <div key={act.id} className="flex items-center justify-between py-2 border-b border-stone-50 last:border-0">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-stone-50 flex items-center justify-center">
                                    <Footprints className="w-4 h-4 text-stone-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-stone-900">{act.km} km</p>
                                    <p className="text-xs text-stone-400">{act.steps?.toLocaleString()} steps</p>
                                </div>
                            </div>
                            <Badge variant="outline" className="text-xs text-stone-400 border-stone-200 rounded-full">{act.date}</Badge>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
