import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { deleteApi } from "@/lib/apiHandler";
import { TTeamMember } from "@/types/team";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

type MembersTableProps = {
    teamMembers: TTeamMember[];
    isLeader?: boolean;
};

export default function MembersTable({ teamMembers, isLeader }: MembersTableProps) {
    const [removingMember, setRemovingMember] = useState<number | null>(null);
    
    const handleRemoveMember = async (
        memberId: number,
        memberName: string
    ) => {
        if (
            !confirm(
                `Are you sure you want to remove ${memberName} from the team?`
            )
        )
            return;

        setRemovingMember(memberId);
        try {
            await deleteApi("");
            toast.success(`${memberName} has been removed from the team`);
        } catch (err: unknown) {
            toast.error((err as { response?: { data?: { detail?: string } } }).response?.data?.detail || "Failed to remove member");
        } finally {
            setRemovingMember(null);
        }
    };

    return (
        <Card className="bg-white rounded-2xl border border-stone-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <CardContent className="p-6">
                <h3 className="text-lg font-bold text-stone-900 mb-4">Team Members</h3>
                {/* Table header */}
                <div className="hidden sm:grid grid-cols-12 gap-2 px-4 pb-2 border-b border-stone-100 text-xs text-stone-400 font-medium uppercase tracking-wider">
                    <div className="col-span-1">Id</div>
                    <div className="col-span-2">Image</div>
                    <div className="col-span-4">Name</div>
                    <div className=""
                        style={{
                            gridColumn: isLeader ? "span 4" : "span 5 text-right",
                        }}
                    >Email</div>
                    {
                        isLeader &&
                        <div className="col-span-1 text-right">Action</div>
                    }
                </div>
                <div className="space-y-2 mt-2">
                    {/* Sort: leader first */}
                    {[...(teamMembers || [])]?.map((member,indx) => (
                        <div className="grid grid-cols-12 gap-2 px-4 pb-2 border-b last:pb-0 last:border-b-0 items-center border-stone-100 text-xs text-stone-400 font-medium  tracking-wider" key={member.id}>
                            <div className="col-span-1">{indx+1}</div>
                            <div className="col-span-2">
                                {
                                    member.user.profile_picture_url ?
                                        <Image
                                            src={process.env.NEXT_PUBLIC_BASE_URL + member.user.profile_picture_url}
                                            alt="Profile Picture"
                                            width={40}
                                            height={40}
                                            className="rounded-full"
                                        /> :
                                        <div className="w-11 h-11 rounded-full bg-primary-50/10 flex items-center justify-center relative">
                                            <p className="text-sm font-medium text-primary-500">{member.user.display_name[0]}</p>
                                        </div>
                                }
                            </div>
                            <div className="col-span-4">{member.user.display_name}</div>
                            <div className=""
                                style={{
                                    gridColumn: isLeader ? "span 4 " : "span 5 text-right",
                                }}
                            >{member.user.email}</div>
                            {
                                isLeader &&
                                <div className="col-span-1 text-right">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleRemoveMember(member.id, member?.user?.display_name)}
                                        disabled={removingMember === member.id}
                                        className="text-stone-300 hover:text-red-500 hover:bg-red-50"
                                        data-testid={`remove-member-${member.id}`}
                                    >
                                        {removingMember === member.id ? (
                                            <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            <Trash2 className="w-4 h-4" />
                                        )}
                                    </Button>
                                </div>
                            }
                        </div>
                    ))}
                    {/* {[...(teamMembers || [])].sort((a, b) => (b.is_leader ? 1 : 0) - (a.is_leader ? 1 : 0)).map((member) => (
                        <div key={member.id} className="flex items-center justify-between p-4 rounded-xl bg-stone-50" data-testid={`team-member-${member.id}`}>
                            <div className="flex items-center gap-4 flex-1">
                                <div className="w-11 h-11 rounded-full bg-primary-50/10 flex items-center justify-center relative">
                                    <span className="text-sm font-bold text-primary-600">{member?.user?.display_name[0]}</span>
                                    {member.is_leader && (
                                        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center border-2 border-white">
                                            <Crown className="w-3 h-3 text-white" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-medium text-stone-900">{member.user.display_name}</p>
                                        {member.is_leader && (
                                            <Badge className="bg-primary-50/10 text-primary-600 text-[10px] rounded-full">Leader</Badge>
                                        )}
                                    </div>
                                    {member.challenge && (
                                        <p className="text-xs text-stone-400 flex items-center gap-1 mt-0.5">
                                            <Mountain className="w-3 h-3" /> {member.challenge.name}
                                        </p>
                                    )}
                                    <div className="mt-2 max-w-xs">
                                        <div className="flex items-center justify-between text-xs mb-1">
                                            <span className="text-stone-500">{member.total_km} km</span>
                                            <span className="font-medium text-stone-700">{member.progress_pct}%</span>
                                        </div>
                                        <Progress value={member.progress_pct} className="h-1.5" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <p className="text-sm font-bold text-emerald-600">${member.total_raised}</p>
                                    <p className="text-xs text-stone-400">raised</p>
                                </div>
                                {isLeader && !member.is_leader && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        // onClick={() => handleRemoveMember(member.id, member.display_name || member.full_name)}
                                        disabled={removingMember === member.id}
                                        className="text-stone-300 hover:text-red-500 hover:bg-red-50"
                                        data-testid={`remove-member-${member.id}`}
                                    >
                                        {removingMember === member.id ? (
                                            <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            <Trash2 className="w-4 h-4" />
                                        )}
                                    </Button>
                                )}
                            </div>
                        </div>
                    ))} */}
                </div>
            </CardContent>
        </Card>
    )
}
