"use client";
import React, { useState, useEffect } from "react";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import { useUserContext } from "@/utils/userContext";
import { findByUserAuction } from "@/service/auction/auction.service";
import { findByUserAward } from "@/service/auction/award.service";
import { AuctionModel } from "@/model/auction/auction.model";
import { AwardModel } from "@/model/auction/award.model";

// HistoryType을 세분화
enum HistoryType {
    AUCTION = "AUCTION", // 경매 내역
    AWARD = "AWARD",     // 낙찰 내역
}

enum AuctionSubType {
    AUCTION_SELL = "AUCTION_SELL", // 판매 내역
    AUCTION_BID = "AUCTION_BID",   // 입찰 내역
}

enum AwardSubType {
    AWARD_AWARD = "AWARD_AWARD",  // 낙찰 내역
    PAYMENT = "PAYMENT",          // 결제 내역
}

export default function AccountOrder() {
    const [selectedHistory, setSelectedHistory] = useState<HistoryType | null>(null);
    const [selectedAuctionSubType, setSelectedAuctionSubType] = useState<AuctionSubType | null>(null);
    const [selectedAwardSubType, setSelectedAwardSubType] = useState<AwardSubType | null>(null);
    const [auctionData, setAuctionData] = useState<AuctionModel[]>([]);
    const [awardData, setAwardData] = useState<AwardModel[]>([]);
    const [loading, setLoading] = useState(false);
    const { user } = useUserContext();

    // 경매 데이터를 가져오는 함수
    const fetchAuctionData = async () => {
        setLoading(true);
        try {
            const data = await findByUserAuction();
            console.log("auctionData: ",data)
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
            console.log("awardData: ",data)
            setAwardData(data);
        } catch (error) {
            console.error("낙찰 데이터를 가져오는 중 오류가 발생했습니다.", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (selectedAuctionSubType) {
            fetchAuctionData(); // 판매 내역 또는 입찰 내역 선택 시 경매 데이터를 가져오기
        } else if (selectedAwardSubType) {
            fetchAwardData(); // 낙찰 내역 또는 결제 내역 선택 시 낙찰 데이터를 가져오기
        }
    }, [selectedAuctionSubType, selectedAwardSubType]);

    // 경매 내역 렌더링
    const renderAuctionHistory = () => {
        if (loading) {
            return <div>Loading...</div>;
        }

        return auctionData.length > 0 ? (
            auctionData.map((product, index) => (
                <div key={index} className="flex py-4 sm:py-7 last:pb-0 first:pt-0">
                    <div className="ml-4 flex flex-1 flex-col">
                        <div>
                            <h3 className="text-base font-medium">{product.id}</h3>
                        </div>
                    </div>
                </div>
            ))
        ) : (
            <p>내역이 없습니다.</p>
        );
    };

    // 낙찰 내역 렌더링
    const renderAwardHistory = () => {
        if (loading) {
            return <div>Loading...</div>;
        }

        return awardData.length > 0 ? (
            awardData.map((award, index) => (
                <div key={index} className="flex py-4 sm:py-7 last:pb-0 first:pt-0">
                    <div className="ml-4 flex flex-1 flex-col">
                        <div>
                            <h3 className="text-base font-medium">{award.id}</h3>
                        </div>
                    </div>
                </div>
            ))
        ) : (
            <p>내역이 없습니다.</p>
        );
    };

    // 전체 내역 렌더링
    const renderHistoryContent = () => {
        if (selectedHistory === HistoryType.AUCTION) {
            // 경매 내역 선택 시
            return (
                <div>
                    <div className="flex space-x-4">
                        <ButtonSecondary onClick={() => setSelectedAuctionSubType(AuctionSubType.AUCTION_SELL)}>
                            판매 내역
                        </ButtonSecondary>
                        <ButtonSecondary onClick={() => setSelectedAuctionSubType(AuctionSubType.AUCTION_BID)}>
                            입찰 내역
                        </ButtonSecondary>
                    </div>
                    {selectedAuctionSubType === AuctionSubType.AUCTION_SELL && (
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-semibold">판매 내역</h2>
                            {renderAuctionHistory()}
                        </div>
                    )}
                    {selectedAuctionSubType === AuctionSubType.AUCTION_BID && (
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-semibold">입찰 내역</h2>
                            {renderAuctionHistory()}
                        </div>
                    )}
                </div>
            );
        }

        if (selectedHistory === HistoryType.AWARD) {
            // 낙찰 내역 선택 시
            return (
                <div>
                    <div className="flex space-x-4">
                        <ButtonSecondary onClick={() => setSelectedAwardSubType(AwardSubType.AWARD_AWARD)}>
                            낙찰 내역
                        </ButtonSecondary>
                        <ButtonSecondary onClick={() => setSelectedAwardSubType(AwardSubType.PAYMENT)}>
                            결제 내역
                        </ButtonSecondary>
                    </div>
                    {selectedAwardSubType === AwardSubType.AWARD_AWARD && (
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-semibold">낙찰 내역</h2>
                            {renderAwardHistory()}
                        </div>
                    )}
                    {selectedAwardSubType === AwardSubType.PAYMENT && (
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-semibold">결제 내역</h2>
                            {renderAwardHistory()}
                        </div>
                    )}
                </div>
            );
        }

        return null;
    };

    return (
        <div className="space-y-10 sm:space-y-12">
            <div className="flex space-x-4">
                <ButtonSecondary onClick={() => setSelectedHistory(HistoryType.AUCTION)}>
                    경매 내역
                </ButtonSecondary>
                <ButtonSecondary onClick={() => setSelectedHistory(HistoryType.AWARD)}>
                    낙찰 내역
                </ButtonSecondary>
            </div>
            {renderHistoryContent()}
        </div>
    );
}
