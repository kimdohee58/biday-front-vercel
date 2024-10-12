import Cookies from "js-cookie";
import {paymentAPI} from "@/api/order/payment.api";
import {PaymentTempModel} from "@/model/order/paymentTemp.model";
import {RequestOptions} from "@/model/api/RequestOptions";
import {productAPI} from "@/api/product/product.api";
import {awardAPI} from "@/api/auction/award.api";

export async function savePaymentTemp(
    paymentTemp: PaymentTempModel
) {

    const userToken = "{\"userId\":\"6700e19686d1ce6cd1fc6f25\",\"userName\":\"shull\",\"userRole\":\"ROLE_USER\"}";

    const requestOptions = {
        data: paymentTemp,
        userToken: userToken,
    }

    try {
        return await paymentAPI.savePaymentTemp(requestOptions);
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}