// src/api/bid/bid.api.ts
import { BidModel } from "@/model/BidModel";
import { api } from "../request";
import { strategy } from "../api.strategy";

// 입찰 저장 (POST 요청)
export const saveBid = async (bidData: BidModel)=> {
    const response = await strategy.POST(`${api.bid}`, bidData);
};

// 입찰 스트림 조회 (GET 요청 - SSE)
const streamBid = async (auctionId: number): Promise<BidModel[]> => {

    const response = await fetch(`${api.bid}/stream?auctionId=${auctionId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'text/event-stream',
        },
    });

    const reader = response.body?.getReader();
    const decoder = new TextDecoder("utf-8");

    if (reader) {
        let result: BidModel[] = [];

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const decodedValue = decoder.decode(value, { stream: true });

            try {
                const parsedData = JSON.parse(decodedValue) as BidModel;
                result.push(parsedData);
                console.log(parsedData);
            } catch (error) {
                console.error("Error parsing stream data", error);
            }
        }

        return result;
    }

    return [];
};

export const bid = {
    saveBid,
    streamBid,
};