"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { deleteApi } from '@/lib/apiHandler';
import { TActivity } from '@/types/shared';
import { useQueryClient } from '@tanstack/react-query';
import { Footprints, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function ActivityHistory({ activities }: { activities: TActivity[] }) {
    const queryClient = useQueryClient();

    const handleDelete = async (id: string) => {
        try {
            await deleteApi(`/walker/activity/delete/${id}`);
            queryClient.invalidateQueries({ queryKey: ['activities'] });
            toast.success('Activity deleted');
        } catch {
            toast.error('Failed to delete');
        }
    };

    return (
        <div className="lg:col-span-2">
            <Card className="bg-white rounded-2xl border border-stone-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-stone-900 mb-4">Activity History</h3>
                    {activities.length === 0 ? (
                        <div className="text-center py-12">
                            <Footprints className="w-10 h-10 text-stone-200 mx-auto mb-3" />
                            <p className="text-stone-400">No activities logged yet. Start walking!</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {activities.map((act) => (
                                <div key={act.id} className="flex items-center justify-between p-3 rounded-xl bg-stone-50 hover:bg-stone-100 transition-colors" data-testid={`activity-row-${act.id}`}>
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-lg bg-primary-50/10 flex items-center justify-center">
                                            <Footprints className="w-4 h-4 text-primary-500" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-stone-900">{act.km} km &middot; {act.steps?.toLocaleString()} steps</p>
                                            <p className="text-xs text-stone-400">{act.date}</p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleDelete(act.id)}
                                        className="text-stone-300 hover:text-red-500 rounded-full"
                                        data-testid={`activity-delete-${act.id}`}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
