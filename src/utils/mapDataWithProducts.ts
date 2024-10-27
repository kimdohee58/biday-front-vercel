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
        console.log("❌ 데이터 또는 제품 목록이 잘못되었습니다.");
        return [];
    }


    return dataArray.map((item: AwardModel) => {
        const sizeId = item.auction?.sizeId;
        console.log("🔵 현재 Award 아이템:", item);
        console.log("🔵 Award의 sizeId:", sizeId);

        if (!sizeId) {
            console.log("🔴 sizeId가 없습니다. 이 아이템은 매칭되지 않습니다.");
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
        //console.log("결제 데이터 또는 제품 목록이 잘못되었습니다.");
        return [];
    }

    //console.log("🟢 paymentData:", paymentData);
    //console.log("🟢 productList:", productList);

    const awardIds = extractAwardIdsFromPaymentData(paymentData);
   // console.log("🔵 추출된 awardIds:", awardIds);

    const paymentSizeIds = await fetchSizeIdsFromAwards(awardIds);
   // console.log("🔵 추출된 paymentSizeIds:", paymentSizeIds);

    return paymentData.map((payment, index) => {
        const sizeId = awardIds.includes(payment.awardId) ? paymentSizeIds[index] : undefined;
        //console.log("🔵 매칭된 sizeId:", sizeId);

        if (!sizeId) {
            //console.log("🔴 sizeId가 없습니다. 이 결제는 매칭되지 않습니다.");
            return { ...payment, product: null };
        }

        const matchedProduct = productList.find(
            (product: ProductDTO) => product.id === sizeId
        );
        //console.log("🔵 매칭된 제품:", matchedProduct);


        const combinedObject = {
            ...payment,
            product: matchedProduct ? matchedProduct : null,
        };

        console.log("🎯 최종 결합된 Payment 객체:", combinedObject);

        return combinedObject;
    });
};
