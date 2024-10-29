import {useQuery, useSuspenseQuery} from "@tanstack/react-query";
import {fetchAuctionDetails, fetchAuctionsBySize, fetchAuctionWithImages} from "@/service/auction/auction.service";

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

export const useSuspenseAuctionBySizeId = (sizeId: number) => {
    return useSuspenseQuery({
        queryKey: ["auction", "size", sizeId],
        queryFn: () => fetchAuctionsBySize(sizeId),
    })
}