"use client";

import {BidStreamModel} from "@/model/auction/bid.model";
import {useEffect, useRef} from "react";

interface HighestBidProps {
    auctionId: string;
    onDataUpdate: (data: { highestBid: number; adjustBid: number }) => void
}

export default function HighestBid({auctionId, onDataUpdate}: HighestBidProps) {
    const eventSourceRef = useRef<EventSource | null>(null);


    useEffect(() => {

        if (eventSourceRef.current) {
            console.log("기존 연결 아직 열려있음");
            eventSourceRef.current.close();
        }

        if (eventSourceRef.current && eventSourceRef.current.readyState !== EventSource.CLOSED) {
            console.log("기존 연결이 아직 열려 있으나 닫을 수 없는 상태입니다. 이 로그가 뜬다면 설유정에게 알려주세요.");
            //TODO 닫을 수 없으면서 열려있는 상태가 존재하는지 확인하는 코드, 해당 로그가 뜬다면 알려주세요
        }


        const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/bids/stream?auctionId=${auctionId}`;
        eventSourceRef.current = new EventSource(url);

        eventSourceRef.current.addEventListener("message", (event: MessageEvent) => {
            try {
                const bidStream: BidStreamModel = JSON.parse(event.data);
                const newHighestBid = bidStream.currentBid;
                const newAdjustBid = newHighestBid + 4000;

                onDataUpdate({highestBid: newHighestBid, adjustBid: newAdjustBid});
            } catch (error) {
                console.error("SSE 데이터 파싱 중 오류 발생", error);
            }
        });

        eventSourceRef.current.addEventListener("open", () => {
            console.log("SSE 연결 완료");
        });

        eventSourceRef.current.addEventListener("error", () => {
            console.error("SSE 오류 발생");
            if (eventSourceRef.current && eventSourceRef.current.readyState === EventSource.CLOSED) {
                console.log("SSE 연결 종료");
                eventSourceRef.current = null;
            }
        })

        return () => {
            if (eventSourceRef.current) {
                eventSourceRef.current.close();
                eventSourceRef.current = null;
            }
        }


    }, [auctionId]);

    return null;
}