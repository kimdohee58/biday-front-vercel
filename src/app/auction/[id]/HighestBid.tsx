"use client";

import {BidStreamModel} from "@/model/auction/bid.model";
import {useEffect} from "react";

interface HighestBidProps {
    auctionId: string;
    onDataUpdate: (data: { highestBid: number; adjustBid: number }) => void
}
export default function HighestBid ({auctionId, onDataUpdate}: HighestBidProps)  {
    const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/bids/stream?auctionId=${auctionId}`;

    useEffect(() => {
        const eventSource = new EventSource(url);

        eventSource.addEventListener("message", (event: MessageEvent) => {
            try {
                const bidStream: BidStreamModel = JSON.parse(event.data);
                const newHighestBid = bidStream.currentBid;
                const newAdjustBid = newHighestBid + 4000;

                // 상위 컴포넌트에 업데이트된 데이터 전달
                onDataUpdate({ highestBid: newHighestBid, adjustBid: newAdjustBid });
            } catch (error) {
                console.error("SSE 데이터 파싱 중 오류 발생", error);
            }
        });

        eventSource.addEventListener("open", () => {
            console.log("SSE 연결 완료");
        });

        eventSource.addEventListener("error", () => {
            console.error("SSE 오류 발생");
            if (eventSource.readyState === EventSource.CLOSED) {
                console.log("연결 종료");
            }
        });

        return () => {
            eventSource.close();
        };
    }, [auctionId, onDataUpdate]);

    return null;
}