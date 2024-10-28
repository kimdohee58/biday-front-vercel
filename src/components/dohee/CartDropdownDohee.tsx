"use client";

import {
    Popover,
    PopoverButton,
    PopoverPanel,
    Transition,
} from "@/app/headlessui";
import Prices from "@/components/Prices";
import {Product, PRODUCTS} from "@/data/data";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Image from "next/image";
import Link from "next/link";
import {useQuery} from "@tanstack/react-query";
import {fetchWishes} from "@/service/product/wish.service";
import React, {useEffect, useState} from "react";
import {Spinner} from "@chakra-ui/react";
import {AwardModel} from "@/model/auction/award.model";
import {findByUserAward} from "@/service/auction/award.service";
import {extractSizeIds} from "@/utils/extract";
import {useFetchAwardProducts} from "@/components/AccountuseQuery/useQuery";
import {renderAwardHistory} from "@/components/RenderAccountOrder";
import {mapDataWithAwardModel} from "@/utils/mapDataWithProducts";
import {ProductModel} from "@/model/product/product.model";

export default function CartDropdownDohee() {// const wishes = useQuery({queryKey: ['fetchWishes'], queryFn: () => fetchWishes()});
    // console.log(">>>>>>>>>>>>>>>>wishes", wishes);
    //
    // if (wishes.isLoading) {
    //   return <Spinner/>
    // }
    //
    // if (!wishes.data || wishes.data.length === 0) {
    //   return <div>찜 목록이 없습니다.</div>;
    // }

    const [awardData, setAwardData] = useState<AwardModel[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchAwardData = async () => {
        setLoading(true);
        try {
            const data = await findByUserAward();
            setAwardData(data);
        } catch (error) {
            console.error("낙찰 데이터를 가져오는 중 오류가 발생했습니다.", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                await Promise.all([fetchAwardData()]);
            } catch (error) {
                console.error("데이터를 가져오는 중 오류가 발생했습니다.", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const awardSizeIds = extractSizeIds(awardData);
    const {data: awardProductList} = useFetchAwardProducts(awardData);

// 오늘 날짜를 구하기
    const currentDate = new Date();

    console.log("awardProductList", awardProductList);

// awardProductList에서 결제 가능 기간이 유효한 상품만 필터링
    const filteredAwardProductList = (awardProductList || []).filter((item) => {
        const { bidedAt } = item;

        // bidedAt을 Date 객체로 변환하고 3일 더하기
        const bidedDate = new Date(bidedAt);
        bidedDate.setDate(bidedDate.getDate() + 3);

        // 결제 가능 기간이 현재 날짜 이후인지 확인
        return bidedDate >= currentDate;
    });

// 필터링된 리스트 로그 출력
    console.log("Filtered awardProductList", filteredAwardProductList);
    const totalBid = filteredAwardProductList.reduce((acc, item) => acc + item.currentBid, 0);

    const renderProduct = (
        item: AwardModel & { product: ProductModel | null; matchedSize: string | null } | null, // item이 null일 수 있도록 수정
        index: number,
        close: () => void
    ) => {
        // item이 null일 경우 메시지 반환
        if (!item) {
            return <p className="text-center">결제 대기 중인 상품이 없습니다.</p>;
        }

        const {product, matchedSize, currentBid, bidedAt} = item; // currentBid 추가

        if (!product) {
            console.log("Product is null!!!");
            return null;
        } else {
            console.log("Product:", product);
        }

        const {name, price} = product;

        // bidedAt을 Date 객체로 변환하고 3일 더하기
        const bidedDate = new Date(bidedAt);
        bidedDate.setDate(bidedDate.getDate() + 3);

        // 결제 가능 기간을 원하는 형식으로 포맷하기
        const options: Intl.DateTimeFormatOptions = {year: 'numeric', month: '2-digit', day: '2-digit'};
        const formattedDate = bidedDate.toLocaleDateString('ko-KR', options); // 한국어 형식으로 변환

        return (
            <div key={index} className="flex py-5 last:pb-0">
                <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                    <Link onClick={close} className="absolute inset-0" href={"/product-detail"}/>
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                    <div>
                        <div className="flex justify-between ">
                            <div>
                                <h3 className="text-base font-medium ">
                                    <Link onClick={close} href={`/product/${product.id}`}>
                                        {product.name}
                                    </Link>
                                </h3>
                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                    <span>{item.matchedSize || "사이즈"}</span>
                                </p>
                            </div>
                            <Prices price={currentBid} className="mt-0.5"/>
                        </div>
                    </div>

                    <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="text-gray-500 dark:text-slate-400">결제 가능 기간: {formattedDate}까지</p>
                        <div className="flex">
                            <button type="button" className="font-medium text-primary-6000 dark:text-primary-500 ">
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <Popover className="relative">
            {({open, close}) => (
                <>
                    <PopoverButton
                        className={`
                ${open ? "" : "text-opacity-90"}
                 group w-10 h-10 sm:w-12 sm:h-12 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full inline-flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 relative`}
                    >
                        <div
                            className="w-3.5 h-3.5 flex items-center justify-center bg-primary-500 absolute top-1.5 right-1.5 rounded-full text-[10px] leading-none text-white font-medium">
                            <span className="mt-[1px]">{filteredAwardProductList.length}</span>
                        </div>
                        <svg
                            className="w-6 h-6"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M2 2H3.74001C4.82001 2 5.67 2.93 5.58 4L4.75 13.96C4.61 15.59 5.89999 16.99 7.53999 16.99H18.19C19.63 16.99 20.89 15.81 21 14.38L21.54 6.88C21.66 5.22 20.4 3.87 18.73 3.87H5.82001"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M16.25 22C16.9404 22 17.5 21.4404 17.5 20.75C17.5 20.0596 16.9404 19.5 16.25 19.5C15.5596 19.5 15 20.0596 15 20.75C15 21.4404 15.5596 22 16.25 22Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M8.25 22C8.94036 22 9.5 21.4404 9.5 20.75C9.5 20.0596 8.94036 19.5 8.25 19.5C7.55964 19.5 7 20.0596 7 20.75C7 21.4404 7.55964 22 8.25 22Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M9 8H21"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>

                        <Link className="block md:hidden absolute inset-0" href={"/cart"}/>
                    </PopoverButton>
                    <Transition
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <PopoverPanel
                            className="hidden md:block absolute z-10 w-screen max-w-xs sm:max-w-md px-4 mt-3.5 -right-28 sm:right-0 sm:px-0">
                            <div
                                className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 dark:ring-white/10">
                                <div className="relative bg-white dark:bg-neutral-800">
                                    <div className="max-h-[60vh] p-5 overflow-y-auto hiddenScrollbar">
                                        <h3 className="text-xl font-semibold mr-4">Award Cart</h3>
                                        <div className="divide-y divide-slate-100 dark:divide-slate-700">
                                            {loading ? (
                                                <div className="flex justify-center items-center py-5">
                                                    <Spinner />
                                                </div>
                                            ) : filteredAwardProductList?.length > 0 ? (
                                                filteredAwardProductList.map((item, index) => renderProduct(item, index, close))
                                            ) : (
                                                <p className="text-center m-9 text-lg">결제 대기 중인 상품이 없습니다.</p>
                                            )}
                                            {/*/!*{renderAwardHistory(mapDataWithAwardModel({content: awardData}, awardProductList!!))}*!/*/}
                                            {/*{mapDataWithAwardModel({content: awardData}, filteredAwardProductList!!).map(*/}
                                            {/*    (item, index) => renderProduct(item, index, close)*/}
                                            {/*)}*/}
                                        </div>
                                    </div>
                                    <div className="bg-neutral-50 dark:bg-slate-900 p-5">
                                        <p className="flex justify-between font-semibold text-slate-900 dark:text-slate-100">
                      <span>
                        <span>Subtotal</span>
                        <span className="block text-sm text-slate-500 dark:text-slate-400 font-normal">
                          Shipping and taxes calculated at checkout.
                        </span>
                      </span>
                                            <span className="">₩{totalBid.toLocaleString()}</span>
                                        </p>
                                        <div className="flex space-x-2 mt-5">
                                            <ButtonSecondary
                                                href="/cart"
                                                className="flex-1 border border-slate-200 dark:border-slate-700"
                                                onClick={close}
                                            >
                                                View cart
                                            </ButtonSecondary>
                                            <ButtonPrimary
                                                href="/checkout"
                                                onClick={close}
                                                className="flex-1"
                                            >
                                                Check out
                                            </ButtonPrimary>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </PopoverPanel>
                    </Transition>
                </>
            )}
        </Popover>
    );
}
