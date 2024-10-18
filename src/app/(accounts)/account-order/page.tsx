"use client";
import React, { useState } from "react";
import Sidebar from "@/components/SidebarFilters";
import SidebarFilters from "@/components/SidebarFilters";

// MainTab과 SubTab 타입 선언 (사이드바에서 동일하게 사용)
enum MainTab {
    AUCTION = "AUCTION",
    AWARD = "AWARD",
}

enum AuctionSubTab {
    SELL = "SELL",
    BID = "BID",
}

enum AwardSubTab {
    AWARD = "AWARD",
    PAYMENT = "PAYMENT",
}

export default function AccountOrder() {
    // 상위 탭 상태: 경매내역, 낙찰내역
    const [selectedMainTab, setSelectedMainTab] = useState<MainTab>(MainTab.AUCTION);

    // 하위 탭 상태: 각 상위 탭에 따라 다름 (판매내역, 입찰내역, 낙찰내역, 결제내역)
    const [selectedSubTab, setSelectedSubTab] = useState<AuctionSubTab | AwardSubTab>(AuctionSubTab.SELL);

    // 하위 탭에 따른 콘텐츠 렌더링
    const renderContent = () => {
        if (selectedMainTab === MainTab.AUCTION) {
            // 경매 내역 선택 시
            if (selectedSubTab === AuctionSubTab.SELL) {
                return <div>판매내역을 표시합니다.</div>;
            }
            if (selectedSubTab === AuctionSubTab.BID) {
                return <div>입찰내역을 표시합니다.</div>;
            }
        } else if (selectedMainTab === MainTab.AWARD) {
            // 낙찰 내역 선택 시
            if (selectedSubTab === AwardSubTab.AWARD) {
                return <div>낙찰내역을 표시합니다.</div>;
            }
            if (selectedSubTab === AwardSubTab.PAYMENT) {
                return <div>결제내역을 표시합니다.</div>;
            }
        }
        return null;
    };

    return (
        <div className="flex">
            {/* Sidebar 컴포넌트에 상태와 핸들러를 전달 */}
            <Sidebar
                selectedMainTab={selectedMainTab}
                selectedSubTab={selectedSubTab}
                onMainTabChange={setSelectedMainTab}
                onSubTabChange={setSelectedSubTab}
            />

            {/* 오른쪽 콘텐츠 영역 */}
            <div className="flex-1 p-4">
                {renderContent()}
            </div>
        </div>
    );
}
