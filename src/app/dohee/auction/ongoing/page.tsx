// last-chance
'use client'

import React, {useEffect, useState} from "react";
import SectionPromo1 from "@/components/SectionPromo1";
import {fetchAuctionDetails} from "@/service/auction/auction.service";
import {AuctionDTO, AuctionDTOs} from "@/model/auction/auction.model";
import {auctionAPI} from "@/api/auction/auction.api";
import SectionGridFeatureItemsDohee from "@/components/dohee/SectionGridFeatureItemsDohee";
import {AuctionWithProduct} from "@/app/auction/last-chance/page";

export default function OnGoing() {
    const [auctionData, setAuctionData] = useState<AuctionWithProduct[]>([]);

    useEffect(() => {
        const fetchAuctionsWithImages = async () => {
            try {
                const auctionDTOs = await auctionAPI.findByHeader({}) as AuctionDTOs;
                const auctionContents = auctionDTOs.content || [];

                const auctionsWithImages = await Promise.all(
                    auctionContents.map(async (auction: AuctionDTO) => {
                        return await fetchAuctionDetails(String(auction.id));
                    })
                );

                const today = new Date();
                const todayString = today.toISOString().split("T")[0];

                const filteredAndSortedData = auctionsWithImages
                    .filter(item => {
                        if (item.auction.auction.endedAt) {
                            const endedAtDate = new Date(item.auction.auction.endedAt).toISOString().split("T")[0];
                            console.log(`auction ${item.auction.auction.id}, auction EndedAt ${endedAtDate}`);
                            return endedAtDate >= todayString;
                        }
                        return false;
                    })
                    .sort((a, b) => {
                        if (!a.auction.auction.status && b.auction.auction.status) return -1;
                        if (a.auction.auction.status && !b.auction.auction.status) return 1;

                        const endedAtA = new Date(a.auction.auction.endedAt).getTime();
                        const endedAtB = new Date(b.auction.auction.endedAt).getTime();
                        return endedAtA - endedAtB;
                    });

                setAuctionData(filteredAndSortedData);
            } catch (error) {
                console.error("fetchAuctionsWithImages 중 오류 발생", error);
                setAuctionData([]);
            }
        };

        fetchAuctionsWithImages();
    }, []);

    return (
        <div className="nc-PageHome2 relative overflow-hidden">
            <div className="container relative space-y-24 my-24 lg:space-y-32 lg:my-32">
                <SectionGridFeatureItemsDohee header={"진행 중인 경매"} data={auctionData}/>

                <SectionPromo1/>
            </div>
        </div>
    );
}