// src/api/sellerPayment/sellerPayment.api.ts
import {api} from "../request";
import {strategy} from "../api.strategy";
import {SellerPaymentModel} from "@/model/order/sellerPayment.model";

// 모든 셀러 결제 조회 (GET 요청)
const findAll = async (): Promise<SellerPaymentModel[]> => {
    return await strategy.GET(`${api.seller}`, {});
};

export const sellerPaymentAPI = {
    findAll,
};
