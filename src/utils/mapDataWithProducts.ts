
import { AuctionModel } from "@/model/auction/auction.model";
import { AwardModel } from "@/model/auction/award.model";
import { PaymentRequestModel} from "@/model/order/payment.model";
import {ProductDTO, ProductModel} from "@/model/product/product.model";
import {extractAwardIdsFromPaymentData} from "@/utils/extract";
import {fetchSizeIdsFromAwards} from "@/service/auction/award.service";
import {BidLoadModel, BidModel} from "@/model/auction/bid.model"; // ProductModel 경로는 가정입니다.

interface DataModel {
    content?: AuctionModel[] | AwardModel[] ;
}

export const mapDataWithAuctionModel = (
    auctionData: AuctionModel[] | undefined, // undefined도 허용
    productList: ProductModel[]
): (AuctionModel & { product: ProductModel | null })[] => {
    const dataArray = Array.isArray(auctionData) ? auctionData : [];

    if (dataArray.length === 0 || !productList || productList.length === 0) {
        return [];
    }

    return dataArray.map((item: AuctionModel) => {
        const matchedProduct = productList.find(
            (product: ProductModel) => product.id === (item as any).sizeId || (item as any).size
        );

        const combinedObject = {
            ...item,
            product: matchedProduct || null,
        };

        console.log("🎯 경매 최종 결합된 객체:", combinedObject);

        return combinedObject;
    });
};

export const mapDataWithBidModel = (
    bidData: BidLoadModel[], // `BidModel` 배열로 받기
    productList: ProductDTO[]
): (BidLoadModel & { product: ProductDTO | null })[] => {
    if (!bidData || bidData.length === 0 || !productList || productList.length === 0) {
        return [];
    }

    return bidData.map((item: BidLoadModel) => {
        const matchedProduct = productList.find(
            (product: ProductDTO) => product.id === parseInt(item.sizeId) // auctionId에 해당하는 product 찾기
        );

        const combinedObject = {
            ...item,
            product: matchedProduct || null, // 일치하는 제품이 없으면 null
        };

         console.log("🎯 최종 결합된 Bid 객체:", combinedObject);

        return combinedObject;
    });
};


export const mapDataWithAwardModel = (
    dataArray: AwardModel[], // `content` 없이 `AwardModel[]` 배열로 받기
    productList: ProductModel[]
): (AwardModel & { product: ProductModel | null })[] => {
    if (!dataArray || dataArray.length === 0 || !productList || productList.length === 0) {
        return [];
    }

    return dataArray.map((item: AwardModel) => {
        const sizeId = item.auction?.sizeId;
        if (!sizeId) {
            return { ...item, product: null };
        }
        const matchedProduct = productList.find(
            (product: ProductModel) => product.id === sizeId
        );
        const combinedObject = {
            ...item,
            product: matchedProduct || null,
        };
        console.log("🎯 최종 결합된 Award 객체:", combinedObject);
        return combinedObject;
    });
};



export const mapDataWithPaymentModel = async (
    paymentData: PaymentRequestModel[],
    productList: ProductDTO[]
): Promise<PaymentRequestModel[]> => {
    if (!paymentData || !productList) {
        return [];
    }

    const awardIds = extractAwardIdsFromPaymentData(paymentData);

    const paymentSizeIds = await fetchSizeIdsFromAwards(awardIds);

    return paymentData.map((payment, index) => {
        const sizeId = awardIds.includes(payment.awardId) ? paymentSizeIds[index] : undefined;
        if (!sizeId) {
            return { ...payment, product: null };
        }

        const matchedProduct = productList.find(
            (product: ProductDTO) => product.id === sizeId
        );

        if (!matchedProduct) {
            console.log(`❗ matchedProduct 없음: sizeId = ${sizeId}`);
        }

        const combinedObject = {
            ...payment,
            product: matchedProduct ? matchedProduct : null,
        };

        console.log("🎯 최종 결합된 Payment 객체:", combinedObject);

        return combinedObject;
    });
};