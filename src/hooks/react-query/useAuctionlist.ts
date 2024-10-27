import {useSuspenseQuery} from "@tanstack/react-query";
import {fetchAuctionWithImages} from "@/service/auction/auction.service";

export const useSuspenseAuctionImageList = (auctionId: string) => {
    return useSuspenseQuery({
        queryKey: ["auction", auctionId],
        queryFn: () => fetchAuctionWithImages(auctionId),
    });
};