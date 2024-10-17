"use client";
import React, { useState } from "react";
import Prices from "@/components/Prices";
import { PRODUCTS } from "@/data/data";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Image from "next/image";
import { RootState } from "@/lib/store";
import { useUserContext } from "@/utils/userContext";

enum HistoryType {
    AUCTION = "AUCTION",
    BID = "BID",
    ORDER = "ORDER",
}

export default function AccountOrder() {
    const [selectedHistory, setSelectedHistory] = useState<HistoryType>(
        HistoryType.AUCTION
    );

    const renderProductItem = (product: any, index: number) => {
        const { image, name } = product;
        const { user } = useUserContext();

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
                            <button
                                type="button"
                                className="font-medium text-indigo-600 dark:text-primary-500 "
                            >
                                배송 추적
                            </button>
                        </div>

                        <div className="flex">
                            <button
                                type="button"
                                className="font-medium text-indigo-600 dark:text-primary-500 "
                            >
                                리뷰달기
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderHistoryContent = () => {
        switch (selectedHistory) {
            case HistoryType.AUCTION:
                return (
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-semibold">경매내역 확인</h2>
                        <div className="border-t border-slate-200 dark:border-slate-700 p-2 sm:p-8 divide-y divide-y-slate-200 dark:divide-slate-700">
                            {[PRODUCTS[0], PRODUCTS[1], PRODUCTS[2]].map(renderProductItem)}
                        </div>
                    </div>
                );
            case HistoryType.BID:
                return <h2 className="text-2xl sm:text-3xl font-semibold">입찰내역 확인</h2>;
            case HistoryType.ORDER:
                return <h2 className="text-2xl sm:text-3xl font-semibold">주문내역 확인</h2>;
            default:
                return null;
        }
    };

    return (
        <div className="space-y-10 sm:space-y-12">
            <div className="flex space-x-4">
                <ButtonSecondary onClick={() => setSelectedHistory(HistoryType.AUCTION)}>
                    경매내역
                </ButtonSecondary>
                <ButtonSecondary onClick={() => setSelectedHistory(HistoryType.BID)}>
                    입찰내역
                </ButtonSecondary>
                <ButtonSecondary onClick={() => setSelectedHistory(HistoryType.ORDER)}>
                    주문내역
                </ButtonSecondary>
            </div>
            {renderHistoryContent()}
        </div>
    );
}
