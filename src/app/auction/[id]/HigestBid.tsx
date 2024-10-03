'use client';

import {useEffect, useState} from "react";
import {BidStreamModel} from "@/model/BidModel";


export default function HighestBid(auctionId: string) {
    const [highestBid, setHighestBid] = useState<number>();
    const [error, setError] = useState<string | null>(null);

    const url = `${[process.env.NEXT_PUBLIC_API_SERVER_URL]}/api/bids/stream?auctionId=${Number(auctionId)}`

    useEffect(() => {
        console.log("useEffect 진입");
        const eventSource = new EventSource(url);

        eventSource.onmessage = (event: MessageEvent) => {
            console.log("메세지 탐");
            try {
                const bidStreamModel: BidStreamModel[] = JSON.parse(event.data);
                console.log("bidStreamModel",bidStreamModel)
                const currentBid = bidStreamModel[0].currentBid;
                if (!!currentBid) {
                    setHighestBid(currentBid);
                }

                console.log("highestBid", highestBid);

            } catch (error) {
                console.error("SSE 데이터 파싱 중 오류 발생", error);
                setError("SSE 데이터 파싱 중 오류 발생");

            }

            eventSource.onerror = () => {
                console.error("SSE 에러", error);
                setError("SSE 에러");
            };

        };

        return () => {
            eventSource.close();
        };

    }, [auctionId]);

    useEffect(() => {
        if (highestBid !== undefined) {
            console.log("highestBid updated", highestBid);
        }
    }, [highestBid]);

    return (
        <div>{highestBid}</div>
    );
};