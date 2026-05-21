import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { TSponsor } from '@/types/walker-support';
import { Heart } from 'lucide-react';

export default function Supporters({ sponsors }: { sponsors: TSponsor[] }) {
    return (
        <Card className="bg-white rounded-2xl border border-stone-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <CardContent className="p-6">
                <h3 className="text-lg font-bold text-stone-900 mb-4">
                    Supporters ({sponsors.length})
                </h3>
                {sponsors.length === 0 ? (
                    <div className="text-center py-8">
                        <Heart className="w-10 h-10 text-stone-200 mx-auto mb-3" />
                        <p className="text-stone-400">No supporters yet. Share your fundraising link!</p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {sponsors.map(s => (
                            <div key={s.id} className="flex items-center justify-between p-3 rounded-xl bg-stone-50" data-testid={`supporter-${s.id}`}>
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full bg-rose-50 flex items-center justify-center">
                                        <Heart className="w-4 h-4 text-rose-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-stone-900">{s.name}</p>
                                        {s.message && <p className="text-xs text-stone-400 italic">&quot;{s.message}&quot;</p>}
                                    </div>
                                </div>
                                <Badge className="bg-emerald-50 hover:bg-emerald-50 text-emerald-700 rounded-full font-bold">${s.amount}</Badge>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
