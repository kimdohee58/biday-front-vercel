import {useQuery} from "@tanstack/react-query";
import {findByAuctionId} from "@/service/auction/award.service";

export const useAward = ( auctionId: number, isEnded:boolean) => {
    return useQuery({
        queryKey: ["award", "auctionId", auctionId],
        queryFn: () => findByAuctionId(auctionId),
        enabled: isEnded,
    });
}