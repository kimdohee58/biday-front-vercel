"use client"
import Prices from "@/components/Prices";
import {PRODUCTS} from "@/data/data";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Image from "next/image";
import {RootState} from "@/lib/store";
import {useUserContext} from "@/utils/userContext";
import {useState} from "react";

export default function AccountOrder() {

    const renderProductItem = (product: any, index: number) => {
        const {image, name} = product;
        const {user} = useUserContext();

        const [activeTab, setActiveTab] = useState<"order" | "bid" | "auction" | "win">("order");

        const renderContent = () => {
            switch (activeTab) {
                case "order":
                    return <OrderList/>;
                case "bid":
                    return <BidList/>;
                case "auction":
                    return <AuctionList/>;
                case "win":
                    return <WinList/>;
                default:
                    return null;
            }
        };


        return (
            <div className="space-y-6 sm:space-y-8">
            <h2 className="text-2xl sm:text-3xl font-semiblod">내역 확인</h2>
            </div>
        )

    }
}