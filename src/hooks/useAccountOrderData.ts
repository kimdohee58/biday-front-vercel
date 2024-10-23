
import {useEffect, useState} from "react";
import {PaymentModel, PaymentRequestModel} from "@/model/order/payment.model";
import {AwardModel} from "@/model/auction/award.model";
import { AuctionModel } from "@/model/auction/auction.model";
import {findByUserAuction} from "@/service/auction/auction.service";
import {fetchSizeIdsFromAwards, findByUserAward} from "@/service/auction/award.service";
import {fetchAllPaymentByUserId} from "@/service/order/payment.service";
import {extractSizeIds} from "@/utils/extract";


export const useFetchData = (activeTab: string) => {
    const [auctionData, setAuctionData] = useState<AuctionModel[]>([]);
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
            setPaymentData(data); // 결제 데이터를 설정
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
                    await Promise.all([fetchAuctionData()]);
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


    // auctionData와 awardData에서 추출된 sizeIds
    const auctionSizeIds = extractSizeIds(auctionData); // 유틸리티 함수 사용
    const awardSizeIds = extractSizeIds(awardData);     // 유틸리티 함수 사용

    return {
        auctionData,
        awardData,
        paymentData,
        auctionSizeIds,
        awardSizeIds,
        loading,
    };
};