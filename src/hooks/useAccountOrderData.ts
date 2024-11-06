import {useEffect, useState} from "react";
import {AwardModel} from "@/model/auction/award.model";
import {AuctionDTO} from "@/model/auction/auction.model";
import {fetchAuction, findByUserAuction} from "@/service/auction/auction.service";
import {fetchSizeIdsFromAwards, findByUserAward} from "@/service/auction/award.service";
import {fetchAllPaymentByUserId} from "@/service/order/payment.service";
import {extractAwardIdsFromBidData, extractAwardIdsFromPaymentData} from "@/utils/extract";
import {BidLoadModel} from "@/model/auction/bid.model";
import {findByUserBid} from "@/service/auction/bid.service";
import {PaymentRequestModel} from "@/model/order/payment.model";


export const useFetchData = (activeTab: string) => {
    const [auctionData, setAuctionData] = useState<AuctionDTO[]>([]);
    const [bidData, setBidData] = useState<BidLoadModel[]>([]);
    const [awardData, setAwardData] = useState<AwardModel[]>([]);
    const [paymentData, setPaymentData] = useState<PaymentRequestModel[]>([]);
    const [loading, setLoading] = useState(true);

    // 경매 데이터를 가져오는 함수 Service.ts
    const fetchAuctionData = async () => {
        setLoading(true);
        try {
            const data = await findByUserAuction();
            setAuctionData(data);
        } catch (error) {
            console.error("경매 데이터를 가져오는 중 오류가 발생했습니다.", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchBidData = async () => {
        setLoading(true);
        try {
            const data = await findByUserBid();

            const highestBids = data.reduce<Record<number, typeof data[0]>>((acc, bid) => {
                const { auctionId, currentBid } = bid;

                // 같은 auctionId가 이미 존재하면 최고 입찰가로 업데이트
                if (!acc[auctionId] || acc[auctionId].currentBid < currentBid) {
                    acc[auctionId] = bid;
                }

                return acc;
            }, {});

            // 객체를 배열로 변환
            const highestBidArray = Object.values(highestBids);

            // 경매 아이디를 추출
            const bidAuctionIds = extractAwardIdsFromBidData(highestBidArray);

            // 경매 데이터 fetch
            const auctionData = await fetchAllAuctions(bidAuctionIds);

            // 경매 데이터에서 auctionId와 sizeId 매핑을 위한 객체 생성
            const auctionIdToSizeIdMap = auctionData.reduce<Record<number, string | undefined>>((map, auction) => {
                if (auction?.id && auction.size) {
                    map[auction.id] = auction.size.toString(); // size를 문자열로 변환
                }
                return map;
            }, {});

            // BidLoadModel에 맞게 데이터 구조화
            const mappedBids = highestBidArray.map((bid) => {
                const sizeId = auctionIdToSizeIdMap[bid.auctionId]; // 현재 bid의 auctionId에 해당하는 sizeId를 매핑
                return {
                    ...bid, // 기존의 bid 데이터
                    sizeId: sizeId || null, // sizeId를 추가
                } as BidLoadModel; // BidLoadModel 타입으로 명시
            });

            // 최종 데이터 설정
            setBidData(mappedBids);
        } catch (error) {
            console.error("입찰 데이터를 가져오는 중 오류가 발생했습니다.", error);
        } finally {
            setLoading(false);
        }
    };


    // 낙찰 데이터를 가져오는 함수 Service.ts
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

    // 결제 데이터를 가져오는 함수 및 결제 내역에서 awardId 추출 후 sizeId 추출
    const fetchPaymentData = async () => {
        setLoading(true);
        try {
            const data = await fetchAllPaymentByUserId();

            const awardIds = extractAwardIdsFromPaymentData(data);

            const paymentSizeIds = await fetchSizeIdsFromAwards(awardIds);

            const paymentDataWithSizes = mapPaymentDataWithSizes(data, paymentSizeIds);

            setPaymentData(paymentDataWithSizes); // 결제 데이터를 설정
        } catch (error) {
            console.error("결제 데이터를 가져오는 중 오류가 발생했습니다.", error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                if(activeTab === "auction"){
                    await Promise.all([fetchAuctionData(), fetchBidData()]);
                }else if (activeTab === "award"){
                    await Promise.all([fetchAwardData(), fetchPaymentData()]);
                }
            } catch (error) {
                console.error("데이터를 가져오는 중 오류가 발생했습니다.", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [activeTab]);

    const fetchAllAuctions = async (auctionIds: string[]) => {
        return await Promise.all(auctionIds.map((id) => fetchAuction(id)));
    };

    const mapPaymentDataWithSizes = (
        paymentData: { awardId: number; paymentKey: string; amount: number; orderId: string; approvedAt: string; [key: string]: any }[],
        sizeIds: number[]
    ): PaymentRequestModel[] => {
        return paymentData.map((payment, index) => ({
            ...payment,
            sizeId: sizeIds[index] // Default to -1 if no matching sizeId
        }));
    };



    return {
        auctionData,
        awardData,
        paymentData,
        bidData,
        loading,
    };
};