'use client';

import {useEffect, useState} from "react";
import {BidStreamModel} from "@/model/BidModel";


export default function HighestBid(auctionId:string) {
    const [highestBid, setHighestBid] = useState<number>();
    const [error, setError] = useState<string | null>(null);

    const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/bids/stream?auctionId=${Number(auctionId)}`

    useEffect(() => {
        console.log("auctionId 확인", auctionId);
        console.log("useEffect 진입");

        const eventSource = new EventSource(url);

        eventSource.addEventListener("message", (event: MessageEvent) => {
            console.log("데이터 수신 완료, 수신데이터: ", event.data);
            try {
                const bidStream: BidStreamModel = JSON.parse(event.data);
                const currentBid = bidStream.currentBid;
                setHighestBid(currentBid);

            } catch (error) {
                console.error("SSE 데이터 파싱 중 오류 발생", error);
                setError("SSE 데이터 파싱 중 오류 발생");
            }
        });

        eventSource.addEventListener("open", () => {
            console.log("SSE 연결 완료");
        });

        eventSource.addEventListener("error", () => {
            console.error("SSE 오류 발생", error);
            if (eventSource.readyState === EventSource.CLOSED) {
                console.log("연결 종료");
            }
        });

        return () => {
            console.log("연결 종료")
            eventSource.close();
        };

    }, [auctionId]);

    useEffect(() => {
        if (highestBid !== undefined) {
            console.log("최고입찰가 갱신", highestBid);
        }
    }, [highestBid]);

    return (
        <div>
            {highestBid}
        </div>
    );
};