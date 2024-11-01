// last-chance
'use client'

import React, {useEffect, useState} from "react";
import SectionPromo1 from "@/components/SectionPromo1";
import {fetchAuctionDetails, fetchAuctionWithImages, headerAuctions} from "@/service/auction/auction.service";
import {AuctionDTO, AuctionWithImageModel} from "@/model/auction/auction.model";
import {auctionAPI} from "@/api/auction/auction.api";
import SectionGridFeatureItemsDohee from "@/components/dohee/SectionGridFeatureItemsDohee";

export default function PageHome2() {
// TODO 경매 임박 페이지

    const [auctionData, setAuctionData] = useState<AuctionWithImageModel[]>([]);

    useEffect(() => {
        const fetchAuctionsWithImages = async () => {
            try {
                // 경매 데이터를 불러오고 각 항목에 대해 fetchAuctionWithImages 호출
                const auctionDTOs = await auctionAPI.findBySize({});
                const auctionContents = auctionDTOs.content || [];
                const auctionsWithImages = await Promise.all(
                    auctionContents.map(async (auction: AuctionDTO) => {
                        return await fetchAuctionDetails(String(auction.id));
                    })
                );
                setAuctionData(auctionsWithImages);
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
                <SectionGridFeatureItemsDohee data={auctionData}/>

                <SectionPromo1/>
            </div>
        </div>
    );
}