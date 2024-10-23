// src/api/payment/payment.api.ts
import {api} from "../request";
import {strategy} from "../api.strategy";
import {PaymentModel, PaymentRequestModel} from "@/model/order/payment.model";
import {PaymentTempModel} from "@/model/order/paymentTemp.model";
import {RequestOptions} from "@/model/api/RequestOptions";
import {PaymentConfirmModel} from "@/model/order/paymentConfirm.model";
import {PaymentSaveModel} from "@/model/order/paymentSave.model";

// 결제 데이터 임시 저장 (POST 요청)
const savePaymentTemp = async (options: Omit<RequestOptions<any,PaymentTempModel>, "params">): Promise<void> => {
    await strategy.POST(`${api.payment}/temp`, options);
};

// 결제 승인 (POST 요청)
const savePayment = async (options: Omit<RequestOptions<any, PaymentConfirmModel>, "params">): Promise<PaymentSaveModel> => {
    return (await strategy.POST(`${api.payment}`, options));
};

// 결제 조회 (GET 요청)
const findPaymentByPaymentKey = async (id: number): Promise<PaymentModel> => {
    return await strategy.GET(`${api.payment}?id=${id}`, {});
};

// 사용자 기준 결제 내역 조회 (GET 요청)
const findByUser = async (options:Omit<RequestOptions<any, null>, "params">): Promise<PaymentRequestModel[]> => {
    return await strategy.GET(`${api.payment}/findByUser`, options);
};

export const paymentAPI = {
    savePaymentTemp,
    savePayment,
    findPaymentByPaymentKey,
    findByUser,
};
