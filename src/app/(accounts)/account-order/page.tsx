//src/app/(account)/account-order/page.tsx
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

    // useFetchData 훅을 사용하여 데이터를 가져옴
    const {
        auctionData,
        awardData,
        paymentData,
        loading
    } = useFetchData(activeTab);


    // 각 데이터 훅 사용
    const { data: auctionProductList } = useFetchAuctionProducts(auctionData);
    const { data: bidProductList } = useFetchBidProducts();
    const { data: awardProductList } = useFetchAwardProducts(awardData);
    const { data: paymentProductList } = useFetchPaymentProducts(paymentData);

    // 비동기 데이터 매핑 처리
    useEffect(() => {
        const fetchMappedPaymentData = async () => {
            if (paymentData && paymentProductList) {
                const mappedData = await mapDataWithPaymentModel(paymentData, paymentProductList);
                setMappedPaymentData(mappedData); // 비동기 데이터 매핑 후 상태에 저장
            }
        };

        fetchMappedPaymentData(); // 함수 호출
    }, [paymentData, paymentProductList]); // paymentData나 paymentProductList가 변경될 때 실행


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
                {loading ? <div>Loading...</div> : (
                    <>
                        {activeTab === "auction" && (
                            <>
                                <div className="mb-8">
                                    {renderAuctionHistory(mapDataWithAuctionModel(auctionData, auctionProductList!!))}
                                </div>
                                <div className="mb-8">
                                    {renderBidHistory(bidProductList!!)}  {/* bidProductList 전달 */}
                                </div>
                            </>
                        )}
                        {activeTab === "award" && (
                            <>
                                <div className="mb-8">
                                    {renderAwardHistory(mapDataWithAwardModel(awardData, awardProductList!!))}  {/* awardProductList 전달 */}
                                </div>
                                <div className="mb-8">
                                    {renderPaymentHistory(mappedPaymentData)}  {/* 비동기 처리된 mappedPaymentData 사용 */}
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

//mapDataWithModel,mapDataWithoutModel
