import Cookies from "js-cookie";
import {paymentAPI} from "@/api/order/payment.api";
import {PaymentTempModel} from "@/model/order/paymentTemp.model";
import {RequestOptions} from "@/model/api/RequestOptions";
import {productAPI} from "@/api/product/product.api";
import {awardAPI} from "@/api/auction/award.api";

export async function savePaymentTemp(
    paymentTemp: PaymentTempModel
) {

    const userToken = Cookies.get('userToken');
    if (!userToken) throw new Error("유저토큰 없음");
    // TODO error enum

    const requestOptions = {
        data: paymentTemp,
        userToken: userToken,
    };

    try {
        return await paymentAPI.savePaymentTemp(requestOptions);
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}

export async function confirmPayment(payments: ) {
    const userToken = Cookies.get("userToken");
    if (!userToken) throw new Error("유저토큰 없음");
    // TODO error enum

    const options = {
        userToken: userToken
        data:
    }
}