export interface PaymentTempModel  {
    orderId:string;
    awardId:number;
    amount:number;
}

export const initialPaymentTempModel : PaymentTempModel = {
    orderId:"",
    awardId:0,
    amount:0,
}