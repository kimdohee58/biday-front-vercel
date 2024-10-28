
import {useQuery} from "@tanstack/react-query";
import {fetchProductBySizeId} from "@/service/product/product.service";
import {extractAwardIdsFromPaymentData, extractSizeIds} from "@/utils/extract";
import {fetchSizeIdsFromAwards} from "@/service/auction/award.service";
import {ColorType, ProductDTO} from "@/model/product/product.model";
import {SizeModel} from "@/model/product/size.model";

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
    console.log("useFetchPaymentProducts :",paymentData)
    console.log("awardIds :",awardIds)

    return useQuery({
        queryKey: ["paymentSizeIds", awardIds],
        queryFn: async () => {

            const paymentSizeIds = await fetchSizeIdsFromAwards(awardIds);
            console.log("paymentSizeIds :",paymentSizeIds)

            const productLists = await Promise.all(
                paymentSizeIds.map(async (sizeId: number) => {
                    const product = await fetchProductBySizeId(sizeId);
                    console.log(`🎯 fetchProductBySizeId(${sizeId}) 결과:`, product);
                    return product;
                })
            );

            console.log("🎯🎯🎯🎯🎯useFetchPaymentProducts 함수에서 최종 productLists🎯🎯🎯🎯🎯🎯:", productLists);


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
            console.log("convertSizeToProduct :",convertSizeToProduct)
            return productLists.flat().map(convertSizeToProduct);
        },
        enabled: awardIds.length > 0,
    });
};