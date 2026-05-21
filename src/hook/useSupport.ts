import { getApi } from "@/lib/apiHandler";
import { TUser } from "@/types/auth";
import { useQuery } from "@tanstack/react-query";

export type TSupportResponse = {
    user: TUser;
    raised: number;
    totalSupporter: number;
    supporter: TUser[];
};

export const useSupport = () => {
    return useQuery({
        queryKey: ["supports"],
        queryFn: async () => {
            const res = await getApi<{ data: { data: TSupportResponse } }>("/supporter");
            return res?.data?.data;
        },
    });
};