'use client';

import {useEffect, useState} from "react";
import {BidStreamModel} from "@/model/BidModel";

interface HighestBidProps {
    auctionId: string;
}

const HighestBid = ({auctionId}: HighestBidProps) => {
    const [highestBid, setHighestBid] = useState<number>();
    const [error, setError] = useState<string | null>(null);

    const url = `${[process.env.NEXT_PUBLIC_API_SERVER_URL]}/api/bids/stream?auctionId=${Number(auctionId)}`

    useEffect(() => {
        const eventSource = new EventSource(url);

        eventSource.onmessage = (event: MessageEvent) => {
            try {
                const bidStreamModel: BidStreamModel[] = JSON.parse(event.data);
                const currentBid = bidStreamModel[0].currentBid;
                if (!!currentBid) {
                    setHighestBid(currentBid);
                }
            } catch (error) {
                console.error();
            }

            eventSource.onerror = () => {

            };

        };

        return () => {
            eventSource.close();
        };

    }, [auctionId]);


};