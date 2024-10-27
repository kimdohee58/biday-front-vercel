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
    console.log("🔍 mapDataWithAuctionModel 함수 호출됨");
    console.log("📄 data:", data);
    console.log("📄 productList:", productList);

    // data.content의 타입이 불확실할 때 안전하게 처리
    const dataArray: AuctionModel[] =
        Array.isArray(data?.content)
            ? data.content
            : Array.isArray((data?.content as { content?: AuctionModel[] })?.content)
                ? (data?.content as { content: AuctionModel[] }).content
                : [];

    // dataArray와 productList의 유효성 확인
    if (!dataArray || dataArray.length === 0 || !productList || productList.length === 0) {
        console.log("❌ 데이터 또는 제품 목록이 잘못되었습니다.");
        return [];
    }


    console.log("🟢 mapDataWithAuctionModel dataArray:", dataArray);
    console.log("🟢 mapDataWithAuctionModel productList:", productList);

    return dataArray.map((item: AuctionModel) => {
        const matchedProduct = productList.find(
            (product: ProductModel) => product.id === (item as any).sizeId || (item as any).size
        );
        console.log("🔵 현재 처리 중인 item:", item);
        console.log("🔵 item의 sizeId:", item.size);
        console.log("🔵 매칭된 product:", matchedProduct);

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
    if (!data || !productList || !Array.isArray(data.content)) {
        //console.log("데이터 또는 제품 목록이 잘못되었습니다.");
        return [];
    }

    //console.log("🟢 mapDataWithAwardModel dataArray:", data.content);
    //console.log("🟢 mapDataWithAwardModel productList:", productList);

    const dataArray = data.content;

    return dataArray.map((item: AwardModel) => {
        const sizeId = item.auction?.sizeId;
        //console.log("🔵 현재 Award 아이템:", item);
        //console.log("🔵 Award의 sizeId:", sizeId);

        if (!sizeId) {
            //console.log("🔴 sizeId가 없습니다. 이 아이템은 매칭되지 않습니다.");
            return { ...item, product: null };
        }

        const matchedProduct = productList.find(
            (product: ProductModel) => product.id === sizeId
        );

        //console.log("🔵 매칭된 제품:", matchedProduct);

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
