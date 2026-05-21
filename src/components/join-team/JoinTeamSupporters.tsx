import { TUser } from "@/types/auth";
import { Copy, Heart, Plus, UserPlus, X } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "sonner";

type Supporter = {
    name: string;
    email: string;
};

type TJoinTeamSupporterProps = {
    supporters: Supporter[];
    setSupporters: React.Dispatch<React.SetStateAction<Supporter[]>>;
    user: TUser | null | undefined;
};

export function JoinTeamSupporterSection({
    supporters,
    setSupporters,
    user,
}: TJoinTeamSupporterProps) {
    return (
        <Card className="rounded-xl border border-stone-100 mb-6">
            <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                    <UserPlus className="w-5 h-5 text-orange-600" />
                    <h3 className="font-bold text-stone-900">Spread the Word</h3>
                    <Badge variant="outline" className="rounded-full text-[10px] border-stone-200 text-stone-400 ml-auto">Optional</Badge>
                </div>
                <p className="text-xs text-stone-500 mb-4">Invite supporters and share your fundraising page to get more pledges.</p>

                {/* Invite by email */}
                <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                        <Label className="text-stone-700 text-xs font-bold">Invite Supporters by Email</Label>
                        <Button type="button" variant="ghost" size="sm" onClick={() => setSupporters([...supporters, { name: '', email: '' }])} className="text-orange-600 text-xs" data-testid="teammate-add-supporter">
                            <Plus className="w-3 h-3 mr-1" /> Add More
                        </Button>
                    </div>
                    <div className="space-y-2">
                        {supporters.map((s, i) => (
                            <div key={i} className="flex gap-2 items-center">
                                <Input value={s.name} onChange={(e) => { const copy = [...supporters]; copy[i].name = e.target.value; setSupporters(copy); }}
                                    placeholder="Name" className="rounded-xl border-stone-200 bg-stone-50 h-10 flex-1" data-testid={`teammate-supporter-name-${i}`} />
                                <Input type="email" value={s.email} onChange={(e) => { const copy = [...supporters]; copy[i].email = e.target.value; setSupporters(copy); }}
                                    placeholder="Email" className="rounded-xl border-stone-200 bg-stone-50 h-10 flex-1" data-testid={`teammate-supporter-email-${i}`} />
                                {supporters.length > 1 && (
                                    <Button type="button" variant="ghost" size="icon" onClick={() => setSupporters(supporters.filter((_, j) => j !== i))} className="text-stone-300 hover:text-red-500 shrink-0">
                                        <X className="w-4 h-4" />
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3 my-4">
                    <div className="flex-1 h-px bg-stone-100" />
                    <span className="text-xs text-stone-400 font-medium">or share your link</span>
                    <div className="flex-1 h-px bg-stone-100" />
                </div>

                {/* Share Link */}
                {user && (
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Heart className="w-4 h-4 text-primary-500" />
                            <Label className="text-stone-700 text-xs font-bold">Your Fundraising Page</Label>
                        </div>
                        <div className="flex gap-2">
                            <Input readOnly value={`${window.location.origin}/fundraise/${user?.registrations?.id}`}
                                className="rounded-xl bg-stone-50 border-stone-200 text-stone-600 text-xs h-10" data-testid="teammate-fundraise-link" />
                            <Button onClick={() => {
                                navigator.clipboard.writeText(`${window.location.origin}/fundraise/${user.registrations?.id}`);
                                toast.success('Link copied!');
                            }}
                                className="rounded-xl bg-orange-600 hover:bg-orange-700 text-white shrink-0" data-testid="teammate-copy-link">
                                <Copy className="w-4 h-4 mr-1" /> Copy
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}