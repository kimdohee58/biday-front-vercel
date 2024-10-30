import {useQuery} from "@tanstack/react-query";
import {findUserById} from "@/service/user/user.api";

export const useUserInfo = (userId: string) => {
    return useQuery({
        queryKey: ["user", userId],
        queryFn: () => findUserById(userId),
    })
};