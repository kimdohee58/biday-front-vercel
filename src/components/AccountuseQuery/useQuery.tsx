import { useQuery } from "@tanstack/react-query";
import { fetchProductBySizeId } from "@/service/product/product.service";
import {extractAwardIdsFromPaymentData, extractSizeIds} from "@/utils/extract";
import {fetchSizeIdsFromAwards} from "@/service/auction/award.service";
import {ColorType, ProductDTO, ProductModel} from "@/model/product/product.model";
import {SizeModel} from "@/model/product/size.model"; // sizeId 추출 유틸리티 함수 가져오기

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
    // 리액트쿼리를 할 때 훅 디렉토리에 있어도 된다. 근데 약간 명확하지 않을 것 같다. 근데 에이싱크 어웨잇 비동기잖아 서비스로 분리를 하고,
    // 리액트 쿼리를 쓰고 싶으면, 리액트 쿼리로 써서 해라.
    return useQuery({
        queryKey: ["paymentSizeIds", awardIds],
        queryFn: async () => {
            const paymentSizeIds = await fetchSizeIdsFromAwards(awardIds);
            const productLists = await Promise.all(
                paymentSizeIds.map((sizeId: number) => fetchProductBySizeId(sizeId))
            );

            // SizeModel을 ProductModel으로 변환하는 함수
            const convertSizeToProduct = (size: SizeModel): ProductDTO => ({
                id: size.sizeProduct.id,
                brand: size.sizeProduct.brand,
                category: size.sizeProduct.category,
                name: size.sizeProduct.name,
                subName: size.sizeProduct.subName,
                productCode: size.sizeProduct.productCode,
                price: size.sizeProduct.price || 0, // 기본값 설정
                color: size.sizeProduct.color || "unknown" as ColorType, // 기본값 설정
                createdAt: new Date(), // 필요에 따라 size.sizeProduct.createdAt 사용 가능
                updatedAt: new Date(), // 필요에 따라 size.sizeProduct.updatedAt 사용 가능
                wishes: 0 // 기본값 설정
            });

            // SizeModel 리스트를 ProductModel 리스트로 변환
            return productLists.flat().map(convertSizeToProduct);
        },
        enabled: awardIds.length > 0, // awardIds가 있을 때만 실행
    });
};