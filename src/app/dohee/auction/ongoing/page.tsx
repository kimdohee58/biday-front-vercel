// last-chance
'use client'

import React, {useEffect, useState} from "react";
import SectionPromo1 from "@/components/SectionPromo1";
import {
    fetchAuctionDetails,
    fetchAuctionWithImages,
    headerAuctions,
    ProductDTOWithImage
} from "@/service/auction/auction.service";
import {AuctionDTO, AuctionDTOs, AuctionWithImageModel} from "@/model/auction/auction.model";
import {auctionAPI} from "@/api/auction/auction.api";
import SectionGridFeatureItemsDohee from "@/components/dohee/SectionGridFeatureItemsDohee";
import {UserModel} from "@/model/user/user.model";
import {AuctionWithProduct} from "@/app/auction/last-chance/page";

interface ImageModel {
    uploadUrl: string;
}

interface Auction {
    id: number;
    user: string;
    size: number;
    description: string;
    currentBid: number;
    endedAt: string;
    status: boolean;
    images: ImageModel[];
}

interface Product {
    name: string;
    image: ImageModel;
    size: string;
    wishes: number;
}

interface User {
    id: string;
    oauthName: string | null;
    name: string;
    email: string;
    password: string;
}

// TODO 경매 임박 페이지
export default function PageHome2() {
    const [auctionData, setAuctionData] = useState<AuctionWithProduct[]>([]);

    useEffect(() => {
        const fetchAuctionsWithImages = async () => {
            try {
                // 경매 데이터를 불러오고 각 항목에 대해 fetchAuctionWithImages 호출
                const auctionDTOs = await auctionAPI.findBySize({}) as AuctionDTOs;
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