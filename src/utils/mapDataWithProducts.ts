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
    if (!data || !productList || !Array.isArray(data.content)) {
        return [];
    }

    const dataArray = data.content; // content 배열을 사용

    return dataArray.map((item: AuctionModel) => {
        const matchedProduct = productList.find(
            (product: ProductModel) => product.id === (item as any).sizeId || (item as any).size
        );

        // AuctionModel과 ProductModel을 하나의 객체로 반환
        const combinedObject = {
            ...item,           // AuctionModel 데이터를 포함
            product: matchedProduct || null, // 매칭된 ProductModel 데이터를 추가
        };

        // 객체가 결합되었는지 확인하기 위한 콘솔 출력
        console.log("🎯 경매 최종 결합된 객체:", combinedObject);

        return combinedObject;
    });
};


export const mapDataWithAwardModel = (
    data: { content: AwardModel[] },
    productList: ProductModel[]
): (AwardModel & { product: ProductModel | null })[] => {
    if (!data || !productList || !Array.isArray(data.content)) {
        return [];
    }

    const dataArray = data.content; // content 배열을 사용

    return dataArray.map((item: AwardModel) => {

        // award 데이터의 auction 객체 안에 sizeId가 있음
        const sizeId = item.auction?.sizeId;

        if (!sizeId) {
            return { ...item, product: null }; // sizeId가 없을 경우 처리
        }

        const matchedProduct = productList.find(
            (product: ProductModel) => product.id === sizeId
        );

        // AwardModel과 ProductModel을 결합한 객체
        const combinedObject = {
            ...item,
            product: matchedProduct ? matchedProduct : null,
        };

        // 결합된 객체를 확인하기 위한 콘솔 출력
        console.log("🎯 최종 결합된 Award 객체:", combinedObject);

        return combinedObject;
    });
};



export const mapDataWithPaymentModel = async (
    paymentData: PaymentRequestModel[], // PaymentRequestModel 배열
    productList: ProductDTO[] // ProductModel 리스트
): Promise<PaymentRequestModel[]> => {
    if (!paymentData || !productList) {
        return [];
    }

    // 유틸 함수 호출하여 awardIds 추출
    const awardIds = extractAwardIdsFromPaymentData(paymentData);

    // fetchSizeIdsFromAwards API를 통해 sizeIds 추출
    const paymentSizeIds = await fetchSizeIdsFromAwards(awardIds);

    // paymentData 배열을 순회하며 sizeId와 product를 매칭
    return paymentData.map((payment, index) => {

        // awardIds와 paymentSizeIds가 동일한 인덱스를 기준으로 매칭된다고 가정
        const sizeId = awardIds.includes(payment.awardId) ? paymentSizeIds[index] : undefined;

        if (!sizeId) {
            return { ...payment, product: null }; // sizeId가 없을 경우 처리
        }

        // productList에서 sizeId와 매칭되는 product 찾기
        const matchedProduct = productList.find(
            (product: ProductDTO) => product.id === sizeId
        );

        // PaymentRequestModel과 ProductModel을 결합한 객체
        const combinedObject = {
            ...payment,
            product: matchedProduct ? matchedProduct : null, // 매칭된 product 추가
        };

        // 결합된 객체를 확인하기 위한 콘솔 출력
        console.log("🎯 최종 결합된 Payment 객체:", combinedObject);

        return combinedObject;
    });
};
