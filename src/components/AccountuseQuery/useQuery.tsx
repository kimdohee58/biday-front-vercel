import {useQuery} from "@tanstack/react-query";
import {fetchProductBySizeId} from "@/service/product/product.service";
import {extractAwardIdsFromPaymentData, extractSizeIds} from "@/utils/extract";
import {fetchSizeIdsFromAwards} from "@/service/auction/award.service";
import {ColorType, ProductDTO} from "@/model/product/product.model";
import {SizeModel} from "@/model/product/size.model";

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
    const awardIds = extractAwardIdsFromPaymentData(paymentData);
    return useQuery({
        queryKey: ["paymentSizeIds", awardIds],
        queryFn: async () => {
            const paymentSizeIds = await fetchSizeIdsFromAwards(awardIds);
            const productLists = await Promise.all(
                paymentSizeIds.map((sizeId: number) => fetchProductBySizeId(sizeId))
            );

            const convertSizeToProduct = (size: SizeModel): ProductDTO => ({
                id: size.sizeProduct.id,
                brand: size.sizeProduct.brand,
                category: size.sizeProduct.category,
                name: size.sizeProduct.name,
                subName: size.sizeProduct.subName,
                productCode: size.sizeProduct.productCode,
                price: size.sizeProduct.price || 0,
                color: size.sizeProduct.color || "unknown" as ColorType,
                createdAt: new Date(),
                updatedAt: new Date(),
                wishes: 0
            });

            return productLists.flat().map(convertSizeToProduct);
        },
        enabled: awardIds.length > 0,
    });
};