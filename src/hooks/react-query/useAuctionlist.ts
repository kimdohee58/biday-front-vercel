import {useQuery, useSuspenseQuery} from "@tanstack/react-query";
import {fetchAuctionDetails, fetchAuctionWithImages} from "@/service/auction/auction.service";

export const useSuspenseAuctionImage = (auctionId: string) => {
    return useSuspenseQuery({
        queryKey: ["auction", auctionId],
        queryFn: () => fetchAuctionWithImages(auctionId),
    });
};

export const useAuctionWithImage = (auctionId: string) => {
    return useQuery({
        queryKey: ["auction", auctionId],
        queryFn: () => fetchAuctionWithImages(auctionId),
    })
}

export const useSuspenseAuctionAndProduct = (auctionId: string) => {
    return useSuspenseQuery({
        queryKey: ["auction", "product", "size", "image", auctionId],
        queryFn: () => fetchAuctionDetails(auctionId),
    })
}