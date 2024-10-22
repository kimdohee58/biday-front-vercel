// src/api/refund/refund.api.ts
import {RefundModel} from "@/model/order/refund.model";
import {api} from "../request";
import {strategy} from "../api.strategy";

// 결제 취소 (POST 요청)
const cancelPayment = async (id: number, cancelRequest: Partial<RefundModel>): Promise<RefundModel> => {
    return await strategy.POST(`${api.refund}?id=${id}`, {});
};

export const refundAPI = {
    cancelPayment,
};
