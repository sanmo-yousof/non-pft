import { getApi } from "@/lib/apiHandler";
import { TUser } from "@/types/auth";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
    return useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            try {
                const res = await getApi<{ data: { data: TUser } }>("/auth/user");
                return res?.data?.data;
            } catch (e: unknown) {
                return null;
            }
        },
    });
};