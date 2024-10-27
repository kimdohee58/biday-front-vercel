import { AuctionModel } from "@/model/auction/auction.model";
import { AwardModel } from "@/model/auction/award.model";
import { PaymentRequestModel} from "@/model/order/payment.model";
import {ProductDTO, ProductModel} from "@/model/product/product.model";
import {extractAwardIdsFromPaymentData} from "@/utils/extract";
import {fetchSizeIdsFromAwards} from "@/service/auction/award.service"; // ProductModel 경로는 가정입니다.

interface DataModel {
    content?: AuctionModel[] | AwardModel[] ;
}

export const mapDataWithAuctionModel = (
    data: { content: AuctionModel[] },
    productList: ProductModel[]
): (AuctionModel & { product: ProductModel | null })[] => {

    const dataArray: AuctionModel[] =
        Array.isArray(data?.content)
            ? data.content
            : Array.isArray((data?.content as { content?: AuctionModel[] })?.content)
                ? (data?.content as { content: AuctionModel[] }).content
                : [];

    if (!dataArray || dataArray.length === 0 || !productList || productList.length === 0) {
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


export const mapDataWithAwardModel = (
    data: { content: AwardModel[] },
    productList: ProductModel[]
): (AwardModel & { product: ProductModel | null })[] => {

    const dataArray: AwardModel[] =
        Array.isArray(data?.content)
            ? data.content
            : Array.isArray((data?.content as { content?: AwardModel[] })?.content)
                ? (data.content as { content: AwardModel[] }).content
                : [];

    // 데이터 배열과 제품 목록이 유효한지 확인
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

        console.log("🔵 매칭된 제품:", matchedProduct);

        const combinedObject = {
            ...item,
            product: matchedProduct ? matchedProduct : null,
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


        const combinedObject = {
            ...payment,
            product: matchedProduct ? matchedProduct : null,
        };

        console.log("🎯 최종 결합된 Payment 객체:", combinedObject);

        return combinedObject;
    });
};
