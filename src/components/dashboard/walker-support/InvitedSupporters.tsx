import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { TUser } from '@/types/auth';
import { UserPlus } from 'lucide-react';

export default function InvitedSupporters({ invitedMembers }: { invitedMembers: TUser[] }) {
    return (
        <Card className="bg-white rounded-2xl border border-stone-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <CardContent className="p-6">
                <h3 className="text-lg font-bold text-stone-900 mb-4">
                    Invited ({invitedMembers.length})
                </h3>
                <div className="space-y-2">
                    {invitedMembers.map(inv => (
                        <div key={inv.id} className="flex items-center justify-between p-3 rounded-xl bg-stone-50" data-testid={`invited-${inv.id}`}>
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-primary-50/10 flex items-center justify-center">
                                    <UserPlus className="w-4 h-4 text-primary-500" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-stone-900">{inv.display_name}</p>
                                    <p className="text-xs text-stone-400">{inv.email}</p>
                                </div>
                            </div>
                            <Badge variant="outline" className="rounded-full text-xs border-stone-200 text-stone-400">Invited</Badge>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
