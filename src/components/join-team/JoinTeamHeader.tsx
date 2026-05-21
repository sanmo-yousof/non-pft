import { Users } from "lucide-react";
import { Badge } from "../ui/badge";
import { TTeam } from "@/types/team";

type TJoinTeamHeader = {
    team: TTeam;
};

export function JoinTeamHeader({ team }: TJoinTeamHeader) {
    return (
        <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-3">
                <Users className="w-7 h-7 text-orange-600" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-stone-900 mb-1">
                Join {team.name}
            </h1>
            {team.tagline && <p className="text-stone-500">{team.tagline}</p>}
            <Badge variant="outline" className="mt-2 rounded-full border-stone-200">
                {team?.team_members_count} members
            </Badge>
        </div>
    );
}