//src/service/auction/bid.service.ts

import {bidAPI} from "@/api/auction/bid.api";
import {BidModel} from "@/model/auction/bid.model";

const link = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/bids`


export async function saveBid(bid: BidModel) {
    const userToken = localStorage.getItem("userToken")!;

    try {
        const options = {
            userToken: userToken,
            data: bid,
        }

        return await bidAPI.save(options);
    } catch (error) {
        console.error("입찰 등록 중 오류 발생: ", error);
    }
}
