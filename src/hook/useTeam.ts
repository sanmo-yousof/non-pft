import { getApi } from "@/lib/apiHandler";
import { TTeam, TTeamMember } from "@/types/team";
import { useQuery } from "@tanstack/react-query";

export type TTeamsResponse = {
    teams: TTeam;
    totalRaise: number;
    totalDistance: number;
    avgCompletion: number;
    totalMembers: number;
    teamMembers: TTeamMember[];
};

export const useTeams = () => {
    return useQuery({
        queryKey: ["teams"],
        queryFn: async () => {
            const res = await getApi<{ data: { data: TTeamsResponse } }>("/teams");
            return res?.data?.data;
        },
    });
};