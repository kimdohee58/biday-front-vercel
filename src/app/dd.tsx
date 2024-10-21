"use client";

import Prices from "@/components/Prices";
import Image from "next/image";
import { findByUserAuction } from "@/service/auction/auction.service";
import { fetchAwardOne, fetchSizeIdsFromAwards, findByUserAward } from "@/service/auction/award.service";
import { fetchAllPaymentByUserId } from "@/service/order/payment.service"; // 결제 데이터 API
import { AwardModel } from "@/model/auction/award.model";
import { AuctionModel } from "@/model/auction/auction.model";
import { PaymentModel } from "@/model/order/payment.model";
import React, { useState, useEffect } from "react";
import { fetchProductBySizeId } from "@/service/product/product.service";
import { useQuery } from "@tanstack/react-query";


const AccountOrder = () => {
    const [auctionData, setAuctionData] = useState<AuctionModel[]>([]);
    const [awardData, setAwardData] = useState<AwardModel[]>([]);
    const [paymentData, setPaymentData] = useState<PaymentModel[]>([]); // 결제 데이터
    const [paymentSizeIds, setPaymentSizeIds] = useState<number[]>([]); // 결제 내역에서 추출한 sizeIds
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("auction");

    // 경매 데이터를 가져오는 함수
    const fetchAuctionData = async () => {
        setLoading(true);
        try {
            const data = await findByUserAuction();
            console.log("auctionData: ", data);
            setAuctionData(data);
        } catch (error) {
            console.error("경매 데이터를 가져오는 중 오류가 발생했습니다.", error);
        } finally {
            setLoading(false);
        }
    };

    // 낙찰 데이터를 가져오는 함수
    const fetchAwardData = async () => {
        setLoading(true);
        try {
            const data = await findByUserAward();
            console.log("awardData: ", data);
            setAwardData(data);
        } catch (error) {
            console.error("낙찰 데이터를 가져오는 중 오류가 발생했습니다.", error);
        } finally {
            setLoading(false);
        }
    };

    // 결제 데이터를 가져오는 함수 및 결제 내역에서 awardId 추출 후 sizeId 추출
    const fetchPaymentData = async () => {
        setLoading(true);
        try {
            const data = await fetchAllPaymentByUserId();
            setPaymentData(data); // 결제 데이터를 설정

            // 결제 데이터에서 awardId 추출
            const awardIds = extractAwardIdsFromPaymentData(data);
            console.log("추출된 awardIds: ", awardIds);

            // awardIds에서 sizeIds 추출
            const paymentSizeIds = await fetchSizeIdsFromAwards(awardIds);
            console.log("추출된 paymentSizeIds: ", paymentSizeIds);

            // 추출된 sizeIds를 상태에 저장
            setPaymentSizeIds(paymentSizeIds);
        } catch (error) {
            console.error("결제 데이터를 가져오는 중 오류가 발생했습니다.", error);
        } finally {
            setLoading(false);
        }
    };

    // paymentData에서 awardId를 추출하는 함수
    const extractAwardIdsFromPaymentData = (paymentData: any[]) => {
        return paymentData.map((payment) => payment.awardId);
    };

    // auctionData와 awardData에서 sizeId를 추출하는 함수
    const extractSizeIds = (data: any) => {
        if (data?.content && Array.isArray(data.content)) {
            return data.content.map((item: any) => item.auction?.sizeId || item.sizeId);
        }
        return [];
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                await Promise.all([fetchAuctionData(), fetchAwardData(), fetchPaymentData()]);
            } catch (error) {
                console.error("데이터를 가져오는 중 오류가 발생했습니다.", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // 추출된 sizeId
    const auctionSizeIds = extractSizeIds(auctionData);
    const awardSizeIds = extractSizeIds(awardData);
    const bidSizeIds = [0]

    // auctionSizeIds를 사용하여 상품 데이터 가져오기
    const { data: auctionProductList, isLoading: isAuctionLoading, isError: isAuctionError } = useQuery({
        queryKey: ["auctionSizeIds", auctionSizeIds],
        queryFn: async () => {
            const productLists = await Promise.all(
                auctionSizeIds.map((sizeId: number) => fetchProductBySizeId(sizeId))
            );
            console.log('ㅁauctionProductList : ',productLists.flat())
            return productLists.flat();
        },
        enabled: auctionSizeIds.length > 0,
    });

    // awardSizeId를 사용하여 상품 데이터 가져오기
    const { data: bidProductList, isLoading: isBidLoading, isError: isBiddError } = useQuery({
        queryKey: ["bidSizeIds", bidSizeIds],
        queryFn: async () => {
            const productLists = await Promise.all(
                bidSizeIds.map((sizeId: number) => fetchProductBySizeId(sizeId))
            );
            return productLists.flat();
        },
        enabled: bidSizeIds.length > 0,
    });

    // awardSizeIds를 사용하여 상품 데이터 가져오기
    const { data: awardProductList, isLoading: isAwardLoading, isError: isAwardError } = useQuery({
        queryKey: ["awardSizeIds", awardSizeIds],
        queryFn: async () => {
            const productLists = await Promise.all(
                awardSizeIds.map((sizeId: number) => fetchProductBySizeId(sizeId))
            );
            console.log('ㅁawardProductList : ',productLists.flat())
            return productLists.flat();
        },
        enabled: awardSizeIds.length > 0,
    });

    // paymentSizeIds를 사용하여 상품 데이터 가져오기
    const { data: paymentProductList, isLoading: isPaymentLoading, isError: isPaymentError } = useQuery({
        queryKey: ["paymentSizeIds", paymentSizeIds],
        queryFn: async () => {
            const productLists = await Promise.all(
                paymentSizeIds.map((sizeId: number) => fetchProductBySizeId(sizeId))
            );
            console.log('ㅁpaymentProductList : ',productLists.flat())
            return productLists.flat();
        },
        enabled: paymentSizeIds.length > 0,
    });

    const renderProductItem = (product: any, index: number) => {
        const { image, name } = product;
        return (
            <div key={index} className="flex py-4 sm:py-7 last:pb-0 first:pt-0">
                <div className="relative h-24 w-16 sm:w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                    <Image
                        fill
                        sizes="100px"
                        src={image}
                        alt={name}
                        className="h-full w-full object-cover object-center"
                    />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                    <div>
                        <div className="flex justify-between ">
                            <div>
                                <h3 className="text-base font-medium line-clamp-1">{name}</h3>
                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                    <span>{"Natural"}</span>
                                    <span className="mx-2 border-l border-slate-200 dark:border-slate-700 h-4"></span>
                                    <span>{"XL"}</span>
                                </p>
                            </div>
                            <Prices className="mt-0.5 ml-2" />
                        </div>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="text-gray-500 dark:text-slate-400 flex items-center">
                            <span className="hidden sm:inline-block">Qty</span>
                            <span className="inline-block sm:hidden">x</span>
                            <span className="ml-2">1</span>
                        </p>

                        <div className="flex">
                            <button type="button" className="font-medium text-indigo-600 dark:text-primary-500 ">
                                Leave review
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderAuctionHistory = () => (
        <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden z-0">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 sm:p-8 bg-slate-50 dark:bg-slate-500/5">
                <p className="text-lg font-semibold">경매 내역</p>
            </div>
            <div className="border-t border-slate-200 dark:border-slate-700 p-2 sm:p-8 divide-y divide-y-slate-200 dark:divide-slate-700">
                {auctionProductList && auctionProductList.length > 0 ? (
                    <div>
                        <p className="text-lg font-semibold mt-4">경매상품 정보</p>
                        {auctionProductList.map((product, index) => renderProductItem(product, index))}
                    </div>
                ) : (
                    <p>내역이 없습니다.</p>
                )}
            </div>
        </div>
    );


    const renderBidHistory = () => (
        <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden z-0">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 sm:p-8 bg-slate-50 dark:bg-slate-500/5">
                <p className="text-lg font-semibold">입찰 내역</p>
            </div>
            <div className="border-t border-slate-200 dark:border-slate-700 p-2 sm:p-8 divide-y divide-y-slate-200 dark:divide-slate-700">
                {bidProductList && bidProductList.length > 0 ? (
                    <div>
                        <p className="text-lg font-semibold mt-4">입찰상품 정보</p>
                        {bidProductList.map((product, index) => renderProductItem(product, index))}
                    </div>
                ) : (
                    <p>내역이 없습니다.</p>
                )}
            </div>
        </div>
    );

    const renderAwardHistory = () => (
        <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden z-0">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 sm:p-8 bg-slate-50 dark:bg-slate-500/5">
                <p className="text-lg font-semibold">낙찰 내역</p>
            </div>
            <div className="border-t border-slate-200 dark:border-slate-700 p-2 sm:p-8 divide-y divide-y-slate-200 dark:divide-slate-700">
                {awardProductList && awardProductList.length > 0 ? (
                    <div>
                        <p className="text-lg font-semibold mt-4">낙찰상품 정보</p>
                        {awardProductList.map((product, index) => renderProductItem(product, index))}
                    </div>
                ) : (
                    <p>내역이 없습니다.</p>
                )}
            </div>
        </div>
    );

    const renderPaymentHistory = () => (
        <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden z-0">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 sm:p-8 bg-slate-50 dark:bg-slate-500/5">
                <p className="text-lg font-semibold">결제 내역</p>
            </div>
            <div className="border-t border-slate-200 dark:border-slate-700 p-2 sm:p-8 divide-y divide-y-slate-200 dark:divide-slate-700">
                {paymentProductList && paymentProductList.length > 0 ? (
                    <div>
                        <p className="text-lg font-semibold mt-4">결제상품 정보</p>
                        {paymentProductList.map((product, index) => renderProductItem(product, index))}
                    </div>
                ) : (
                    <p>내역이 없습니다.</p>
                )}
            </div>
        </div>
    );

    return (
        <div className="space-y-10 sm:space-y-12">
            <div>
                <div className="flex space-x-8">
                    <h2
                        className={`text-2xl sm:text-3xl font-semibold cursor-pointer ${activeTab === "auction" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-800"}`}
                        onClick={() => setActiveTab("auction")}
                    >
                        경매 내역
                    </h2>
                    <h2
                        className={`text-2xl sm:text-3xl font-semibold cursor-pointer ${activeTab === "award" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-800"}`}
                        onClick={() => setActiveTab("award")}
                    >
                        낙찰 내역
                    </h2>
                </div>
                {loading ? <div>Loading...</div> : (
                    <>
                        {activeTab === "auction" && (
                            <>
                                {renderAuctionHistory()}
                                {renderBidHistory()}
                            </>
                        )}
                        {activeTab === "award" && (
                            <>
                                {renderAwardHistory()}
                                {renderPaymentHistory()}
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default AccountOrder;

