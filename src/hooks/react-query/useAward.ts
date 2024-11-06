import {useMutation, useQuery} from "@tanstack/react-query";
import {updateStatus} from "@/service/auction/award.service";

export const useUpdateStatus = () => {
    return useMutation({
        mutationFn: (awardId: number) => updateStatus(awardId),
    })
};