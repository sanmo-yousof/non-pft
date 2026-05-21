import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { deleteApi } from "@/lib/apiHandler";
import { TUser } from "@/types/auth";
import { useQueryClient } from "@tanstack/react-query";
import { Crown, User } from "lucide-react";
import { toast } from "sonner";

type TeamHeaderProps = {
  data: {
    title: string;
    description: string;
    teamLeader: string;
    teamId: number;
  };
  isLeader: boolean;
  teammembers?:number|null
};

export default function TeamHeader({ data, isLeader,teammembers }: TeamHeaderProps) {
  const queryClient = useQueryClient();

  const handleLeave = async () => {
    if (!confirm("Are you sure you want to leave this team?")) return;
    try {
      await deleteApi("/leave-teams/" + data.teamId);
      queryClient.invalidateQueries({ queryKey: ["teams"] });
      toast.success("Left team");
    } catch (err: unknown) {
      toast.error(
        (err as { response?: { data?: { detail?: string } } }).response?.data
          ?.detail || "Failed to leave team",
      );
    }
  };

  return (
    <Card className="bg-white rounded-2xl border border-stone-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
      <CardContent className="p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl font-bold text-stone-900">{data.title}</h2>
              {isLeader ? (
                <Badge className="bg-primary-50/10 text-primary-700 rounded-full text-xs">
                  <Crown className="w-3 h-3 mr-1" /> Team Leader
                </Badge>
              ) : (
                <Badge className="bg-primary-50/10 text-primary-700 rounded-full text-xs">
                  <User className="w-3 h-3 mr-1" /> Team Member
                </Badge>
              )}
            </div>
            <p className="text-sm text-stone-500">{data.description}</p>
            {data?.teamLeader && (
              <p className="text-xs text-stone-400 mt-2">
                Led by{" "}
                <span className="font-medium text-stone-600">
                  {data.teamLeader}
                </span>
              </p>
            )}
          </div>
          {isLeader ? (
            <Button
              onClick={handleLeave}
              variant="ghost"
              className="rounded-full text-stone-400 hover:text-red-500 text-xs"
              data-testid="team-leave-btn"
            >
              Leave Team
            </Button>
          ) : (
            <Badge className="bg-primary-50/10 text-primary-700 rounded-full text-xs">
              {teammembers} Members
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
