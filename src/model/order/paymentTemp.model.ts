import {AddressModel} from "@/model/user/address.model";

export interface PaymentTempModel  {
    orderId:string;
    awardId:number;
    amount:number;
}

export interface CheckoutDataModel {
    product: string,
    address: AddressModel,
    phoneNum: string;
    awardId: string;
}

export const initialPaymentTempModel : PaymentTempModel = {
    orderId:"",
    awardId:0,
    amount:0,
}
