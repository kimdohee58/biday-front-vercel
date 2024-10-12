import {RequestOptions} from "@/model/api/RequestOptions";
import {auctionAPI} from "@/api/auction/auction.api";

export async function fetchAuction(auctionId: string) {
    console.log("fetchAuction 진입");
    try {
        const options = {
            params: {
                id: auctionId,
            },
        };

        return auctionAPI.findById(options);
    } catch (error) {
        console.log(error);
    }
}
