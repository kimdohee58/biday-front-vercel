// src/app/(accounts)/account-order/page.tsx
"use client";
import React, {useEffect, useState} from "react";
import { useRouter } from "next/navigation";

import {useFetchData} from "@/hooks/useAccountOrderData";
import {
    useFetchAuctionProducts,
    useFetchAwardProducts,
    useFetchBidProducts,
    useFetchPaymentProducts
} from "@/components/AccountuseQuery/useQuery";

import {
    renderAuctionHistory,
    renderBidHistory,
    renderAwardHistory,
    renderPaymentHistory
} from "@/components/RenderAccountOrder";
import {
    mapDataWithAuctionModel,
    mapDataWithAwardModel, mapDataWithBidModel,
    mapDataWithPaymentModel
} from "@/utils/mapDataWithProducts";
import {PaymentRequestModel} from "@/model/order/payment.model";
import {AuctionDTO, AuctionModel} from "@/model/auction/auction.model";
import {AwardModel} from "@/model/auction/award.model";
import {Spinner} from "@/shared/Spinner/Spinner";

// TODO userRole 체크해서 노션 참조해 만들 것
const AccountOrder = () => {
    const router = useRouter(); // Initialize the router
    const [activeTab, setActiveTab] = useState("award");
    const [mappedPaymentData, setMappedPaymentData] = useState<PaymentRequestModel[]>([]);

    const {
        auctionData,
        awardData,
        paymentData,
        bidData,
        loading
    } = useFetchData(activeTab);

    const { data: auctionProductList } = useFetchAuctionProducts(auctionData);
    const { data: bidProductList } = useFetchBidProducts(bidData);
    const { data: awardProductList } = useFetchAwardProducts(awardData);
    const { data: paymentProductList } = useFetchPaymentProducts(paymentData);

    const hasContent = (data: any): data is { content: AuctionDTO[] } => {
        return data && Array.isArray(data.content);
    };

    const auctionContent = hasContent(auctionData) ? auctionData.content : auctionData as AuctionDTO[];

    const hasAwardContent = (data: any): data is { content: AwardModel[] } => {
        return data && Array.isArray(data.content) && data.content.length > 0 && 'userId' in data.content[0];
    };

    const awardContent = hasAwardContent(awardData) ? awardData.content : (awardData as AwardModel[]);

    const handleCheckoutClick = (awardId: string, productId: string) => {
        router.push(`/checkout?awardId=${awardId}&productId=${productId}`);
    };

    const handleImgClick = (auctionId: string) => {
        router.push(`/auction/${auctionId}`);
    };


    useEffect(() => {
        const fetchMappedPaymentData = async () => {
            if (paymentData && paymentProductList) {
                const mappedData = await mapDataWithPaymentModel(paymentData, paymentProductList);
                setMappedPaymentData(mappedData);
            }
        };

        fetchMappedPaymentData();
    }, [paymentData, paymentProductList]);

    return (
        <div className="space-y-10 sm:space-y-12">
            <div>
                <div className="flex justify-center space-x-8 mb-8">
                    <h2
                        className={`text-2xl sm:text-3xl font-semibold cursor-pointer py-2 px-4 rounded-md transition-all duration-300 ease-in-out transform ${
                            activeTab === "award"
                                ? "text-indigo-700 border-b-2 border-indigo-700 bg-indigo-100 shadow-md"
                                : "text-gray-700 hover:text-indigo-700 hover:bg-indigo-50 hover:shadow-md"
                        }`}
                        onClick={() => {
                            setActiveTab("award");
                        }}
                    >
                        낙찰 내역
                    </h2>
                    <h2
                        className={`text-2xl sm:text-3xl font-semibold cursor-pointer py-2 px-4 rounded-md transition-all duration-300 ease-in-out transform ${
                            activeTab === "auction"
                                ? "text-indigo-700 border-b-2 border-indigo-700 bg-indigo-100 shadow-md"
                                : "text-gray-700 hover:text-indigo-700 hover:bg-indigo-50 hover:shadow-md"
                        }`}
                        onClick={() => {
                            setActiveTab("auction");
                        }}
                    >
                        경매 내역
                    </h2>
                </div>
                {loading ? <Spinner/> : (
                    <>
                        {activeTab === "auction" && (
                            <>
                                <div className="mb-8">
                                    {renderAuctionHistory(mapDataWithAuctionModel(auctionContent, auctionProductList!!), handleImgClick)}
                                </div>
                                <div className="mb-8">
                                    {renderBidHistory(mapDataWithBidModel(bidData, bidProductList!!), handleImgClick)}
                                </div>
                            </>
                        )}
                        {activeTab === "award" && (
                            <>
                                <div className="mb-8">
                                    {renderAwardHistory(mapDataWithAwardModel(awardContent, awardProductList!!), handleImgClick, handleCheckoutClick)}
                                </div>
                                <div className="mb-8">
                                    {renderPaymentHistory(mappedPaymentData)}
                                </div>
                            </>
                        )}
                    </>
                )}

            </div>
        </div>
    );
};

export default AccountOrder;