"use client";
import React, {useEffect, useState} from "react";
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
    mapDataWithAwardModel,
    mapDataWithPaymentModel
} from "@/utils/mapDataWithProducts";
import {PaymentRequestModel} from "@/model/order/payment.model";

const AccountOrder = () => {
    const [activeTab, setActiveTab] = useState("auction");
    const [mappedPaymentData, setMappedPaymentData] = useState<PaymentRequestModel[]>([]);

    const {
        auctionData,
        awardData,
        paymentData,
        loading
    } = useFetchData(activeTab);

    const { data: auctionProductList } = useFetchAuctionProducts(auctionData);
    const { data: bidProductList } = useFetchBidProducts();
    const { data: awardProductList } = useFetchAwardProducts(awardData);
    const { data: paymentProductList } = useFetchPaymentProducts(paymentData);





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
                <div className="flex space-x-8 mb-8">
                    <h2
                        className={`text-2xl sm:text-3xl font-semibold cursor-pointer ${activeTab === "auction" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-800"}`}
                        onClick={() => {setActiveTab("auction")}}
                    >
                        경매 내역
                    </h2>
                    <h2
                        className={`text-2xl sm:text-3xl font-semibold cursor-pointer ${activeTab === "award" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-800"}`}
                        onClick={() => {setActiveTab("award")}}
                    >
                        낙찰 내역
                    </h2>
                </div>
                {loading ? <div className="flex h-screen items-center justify-center">
                    <div className="text-center">
                        <svg
                            className="animate-spin h-12 w-12 text-indigo-600 mx-auto mb-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8H4z"
                            />
                        </svg>
                        <h2 className="text-2xl font-semibold text-indigo-600">Loading...</h2>
                    </div>
                </div> : (
                    <>
                        {activeTab === "auction" && (
                            <>
                                <div className="mb-8">
                                    {renderAuctionHistory(mapDataWithAuctionModel({content: auctionData}, auctionProductList!!))}
                                </div>
                                <div className="mb-8">
                                    {renderBidHistory(bidProductList!!)}
                                </div>
                            </>
                        )}
                        {activeTab === "award" && (
                            <>
                                <div className="mb-8">
                                    {renderAwardHistory(mapDataWithAwardModel({content: awardData}, awardProductList!!))}
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