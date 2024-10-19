// src/api/payment/payment.api.ts
import { api } from "../request";
import { strategy } from "../api.strategy";
import {PaymentModel} from "@/model/order/payment.model";
import {PaymentTempModel} from "@/model/order/paymentTemp.model";
import {RequestOptions} from "@/model/api/RequestOptions";
import {AddressModel} from "@/model/user/address.model";

// 결제 데이터 임시 저장 (POST 요청)
const savePaymentTemp = async (options: RequestOptions<PaymentTempModel>): Promise<void> => {
    await strategy.POST(`${api.payment}/temp`, options);
};

// 결제 승인 (POST 요청)
const savePayment = async (paymentData: Partial<PaymentModel>): Promise<PaymentModel> => {
    const response = await strategy.POST(`${api.payment}`, paymentData);
    return response.data;
};

// 결제 조회 (GET 요청)
const findPaymentByPaymentKey = async (id: number): Promise<PaymentModel> => {
    const response = await strategy.GET(`${api.payment}?id=${id}`);
    return response;
};

// 사용자 기준 결제 내역 조회 (GET 요청)
const findByUser = async (options:RequestOptions<{}, null>): Promise<PaymentModel[]> => {
    const response = await strategy.GET(`${api.payment}/findByUser`, options);
    return response;
};

export const paymentAPI = {
    savePaymentTemp,
    savePayment,
    findPaymentByPaymentKey,
    findByUser,
};
