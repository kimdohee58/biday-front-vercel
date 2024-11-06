import {useMutation, useQuery} from "@tanstack/react-query";
import {findByAuctionId, updateStatus} from "@/service/auction/award.service";

export const useUpdateStatus = () => {
    return useMutation({
        mutationFn: (awardId: number) => updateStatus(awardId),
    })
};

export const useAward = ( auctionId: number, isEnded:boolean) => {
    return useQuery({
        queryKey: ["award", "auctionId", auctionId],
        queryFn: () => findByAuctionId(auctionId),
        enabled: isEnded,
    });
}