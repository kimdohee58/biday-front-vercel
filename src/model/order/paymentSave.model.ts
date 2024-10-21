import {PaymentCardModel} from "@/model/order/paymentCard.model";
import {PaymentEasyPayModel} from "@/model/order/paymentEasyPay.model";

export interface PaymentSaveModel {
    id: number;
    userId: string;
    amount: number;
    orderId: string;
    status: string;
    card: PaymentCardModel;
    easyPay: PaymentEasyPayModel;
    approvedAt: Date;
}