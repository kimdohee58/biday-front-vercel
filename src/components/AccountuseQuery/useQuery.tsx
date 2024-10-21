// src/hooks/useAccountProductQueries.ts
import { useQuery } from "@tanstack/react-query";
import { fetchProductBySizeId } from "@/service/product/product.service";
import {extractAwardIdsFromPaymentData, extractSizeIds} from "@/utils/extract";
import {fetchSizeIdsFromAwards} from "@/service/auction/award.service"; // sizeId 추출 유틸리티 함수 가져오기

// auctionSizeIds를 사용하여 상품 데이터 가져오기
export const useFetchAuctionProducts = (auctionData: any) => {
    const auctionSizeIds = extractSizeIds(auctionData);
    return useQuery({
        queryKey: ["auctionSizeIds", auctionSizeIds],
        queryFn: async () => {
            const productLists = await Promise.all(
                auctionSizeIds.map((sizeId: number) => fetchProductBySizeId(sizeId))
            );
            return productLists.flat();
        },
        enabled: auctionSizeIds.length > 0,
    });
};

// bidSizeIds를 사용하여 상품 데이터 가져오기
export const useFetchBidProducts = () => {
    const bidSizeIds = [0]; // 고정된 값 사용
    return useQuery({
        queryKey: ["bidSizeIds", bidSizeIds],
        queryFn: async () => {
            const productLists = await Promise.all(
                bidSizeIds.map((sizeId: number) => fetchProductBySizeId(sizeId))
            );
            return productLists.flat();
        },
        enabled: bidSizeIds.length > 0,
    });
};

// awardSizeIds를 사용하여 상품 데이터 가져오기
export const useFetchAwardProducts = (awardData: any) => {
    const awardSizeIds = extractSizeIds(awardData);
    return useQuery({
        queryKey: ["awardSizeIds", awardSizeIds],
        queryFn: async () => {
            const productLists = await Promise.all(
                awardSizeIds.map((sizeId: number) => fetchProductBySizeId(sizeId))
            );
            return productLists.flat();
        },
        enabled: awardSizeIds.length > 0,
    });
};

export const useFetchPaymentProducts = (paymentData: any) => {
    // paymentData에서 awardId 추출
    const awardIds = extractAwardIdsFromPaymentData(paymentData);

    return useQuery({
        queryKey: ["paymentSizeIds", awardIds],
        queryFn: async () => {
            const paymentSizeIds = await fetchSizeIdsFromAwards(awardIds);
            const productLists = await Promise.all(
                paymentSizeIds.map((sizeId: number) => fetchProductBySizeId(sizeId))
            );
            return productLists.flat();
        },
        enabled: awardIds.length > 0, // awardIds가 있을 때만 실행
    });
};

