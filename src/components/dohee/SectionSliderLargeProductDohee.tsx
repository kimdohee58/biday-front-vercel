"use client";

import React, {useEffect, useRef, useState} from "react";
import Heading from "@/components/Heading/Heading";
import Link from "next/link";
import Glide from "@glidejs/glide";
import {AuctionWithProduct} from "@/app/auction/last-chance/page";
import {auctionAPI} from "@/api/auction/auction.api";
import {AuctionDTO, AuctionDTOs} from "@/model/auction/auction.model";
import {fetchAuctionDetails} from "@/service/auction/auction.service";
import CollectionCard2Dohee from "@/components/dohee/CollectionCard2Dohee";

const SectionSliderLargeProductDohee = () => {
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
                    })
                    .slice(0, 5);

                setAuctionData(filteredAndSortedData);
            } catch (error) {
                console.error("fetchAuctionsWithImages 중 오류 발생", error);
                setAuctionData([]);
            }
        };

        fetchAuctionsWithImages();
    }, []);
    console.log("auctionData", auctionData)

    const sliderRef = useRef(null);

    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        const OPTIONS: Partial<Glide.Options> = {
            perView: 3,
            gap: 32,
            bound: true,
            breakpoints: {
                1280: {
                    gap: 28,
                    perView: 2.5,
                },
                1024: {
                    gap: 20,
                    perView: 2.15,
                },
                768: {
                    gap: 20,
                    perView: 1.5,
                },

                500: {
                    gap: 20,
                    perView: 1,
                },
            },
        };
        if (!sliderRef.current) return;

        let slider = new Glide(sliderRef.current, OPTIONS);
        slider.mount();
        setIsShow(true);
        return () => {
            slider.destroy();
        };
    }, [sliderRef]);

    return (
        <div className={`nc-SectionSliderLargeProduct`}>
            <div ref={sliderRef} className={`flow-root ${isShow ? "" : "invisible"}`}>
                <Heading desc={"BiDay에서 원하는 상품을 지금 찾아보세요."} isCenter={false} hasNextPrev>
                    현재 진행 중인 경매
                </Heading>

                <div className="glide__track" data-glide-el="track">
                    {/*<ul className="glide__slides">*/}
                    <ul className="glide__slides flex space-x-4 overflow-x-auto">
                        {auctionData.slice(0,4).map((item, index) => {
                            const auction = item.auction;
                            const product = item.product;
                            const user = item.user;
                            const combinedImages = [product.image, ...auction.images];

                            return (
                                <li className="glide__slide flex-none w-[calc(20%_-_0.5rem)]" key={auction.auction.id}>
                                    <CollectionCard2Dohee
                                        key={auction.auction.id}
                                        id={auction.auction.id}
                                        name={product.product.name}
                                        price={auction.auction.currentBid}
                                        imgs={combinedImages}
                                        description={auction.auction.description}
                                        wishes={product.product.wishes}
                                        endedAt={auction.auction.endedAt}
                                        user={user.name}
                                    />
                                </li>
                            );
                        })}

                        <li className={`glide__slide   `}>
                        <Link href={"/ongoing"} className="block relative group">
                                <div className="relative rounded-2xl overflow-hidden h-[410px]">
                                    <div className="h-[410px] bg-black/5 dark:bg-neutral-800"></div>
                                    <div
                                        className="absolute inset-y-6 inset-x-10  flex flex-col items-center justify-center">
                                        <div className="flex items-center justify-center relative">
                                            <span className="text-xl font-semibold">More items</span>
                                            <svg
                                                className="absolute left-full w-5 h-5 ml-2 rotate-45 group-hover:scale-110 transition-transform"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M18.0701 9.57L12.0001 3.5L5.93005 9.57"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeMiterlimit="10"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M12 20.4999V3.66992"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeMiterlimit="10"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </div>
                                        <span className="text-sm mt-1">Show me more</span>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SectionSliderLargeProductDohee;