// last-chance
'use client'

import React, {useEffect, useState} from "react";
import SectionPromo1 from "@/components/SectionPromo1";
import {fetchAuctionDetails, ProductDTOWithImage} from "@/service/auction/auction.service";
import {AuctionDTO, AuctionDTOs, AuctionWithImageModel} from "@/model/auction/auction.model";
import {auctionAPI} from "@/api/auction/auction.api";
import SectionGridFeatureItemsDohee from "@/components/dohee/SectionGridFeatureItemsDohee";
import {UserModel} from "@/model/user/user.model";

export interface AuctionWithProduct {
    auction: AuctionWithImageModel,
    product: ProductDTOWithImage,
    user: UserModel
}

export default function LastChance() {
    const [auctionData, setAuctionData] = useState<AuctionWithProduct[]>([]);

    useEffect(() => {
        const fetchAuctionsWithImages = async () => {
            try {
                // 경매 데이터를 불러오고 각 항목에 대해 fetchAuctionWithImages 호출
                const auctionDTOs = await auctionAPI.findByHeader({}) as AuctionDTOs;
                const auctionContents = auctionDTOs.content || [];

                const today = new Date();
                const tomorrow = new Date(today);
                tomorrow.setDate(today.getDate() + 1);
                const todayString = today.toISOString().split("T")[0];
                const tomorrowString = tomorrow.toISOString().split("T")[0];

                // 종료 날짜 필터링
                const filteredContents = auctionContents.filter((auction: AuctionDTO) => {
                    if (auction.endedAt) {
                        const endedAtDate = new Date(auction.endedAt).toISOString().split("T")[0];
                        return endedAtDate === todayString || endedAtDate === tomorrowString;
                    }
                    return false;
                });

                // 필터링된 경매에 대해 fetchAuctionDetails 호출
                const auctionsWithImages: AuctionWithProduct[] = await Promise.all(
                    filteredContents.map(async (auction: AuctionDTO) => {
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
                <SectionGridFeatureItemsDohee header={"마감 임박 경매"} data={auctionData}/>

                <SectionPromo1/>
            </div>
        </div>
    );
}