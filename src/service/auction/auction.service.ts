import {RequestOptions} from "@/model/api/RequestOptions";
import {auctionAPI} from "@/api/auction/auction.api";

export async function fetchAuction(auctionId: string) {
    try {
        const options = {
            params: {
                id: auctionId,
            },
        };

        return await auctionAPI.findById(options);
    } catch (error) {
        console.log(error);
    }
}

export async function fetchAuctionsBySize(sizeId: number) {
    try {
        const options = {
            params: {sizeId: sizeId},
        };

        const result = await auctionAPI.findAllBySize(options);

        if (typeof result === "undefined") return [];

        return result;

    } catch (error) {
        console.error("fetchAuctionBySize 도중 오류 발생", error);
    }
}
