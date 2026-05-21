
import { getApi } from "@/lib/apiHandler";
import { TActivity, TChallenge, TProgress } from "@/types/shared";
import { useQuery } from "@tanstack/react-query";


export type TActivitiesResponse = {
    activities: TActivity[];
    challenge: TChallenge;
    progress: TProgress;
};


export const useActivities = () => {
    return useQuery({
        queryKey: ["activities"],
        queryFn: async () => {
            const res = await getApi<{ data: { data: TActivitiesResponse } }>("/walker/activity");
            return res?.data?.data;
        },
    });
};