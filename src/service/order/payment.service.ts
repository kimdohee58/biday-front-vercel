import Cookies from "js-cookie";
import {paymentAPI} from "@/api/order/payment.api";
import {PaymentTempModel} from "@/model/order/paymentTemp.model";
import {RequestOptions} from "@/model/api/RequestOptions";
import {productAPI} from "@/api/product/product.api";
import {awardAPI} from "@/api/auction/award.api";
import {AddressModel} from "@/model/user/address.model";
import {addressAPI} from "@/api/user/address.api";
import {PaymentModel} from "@/model/order/payment.model";

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



export async function fetchAllPaymentByUserId(): Promise<PaymentModel[]> {
    try {
        // 클라이언트에서 쿠키 갖고 오기
        const userToken = Cookies.get('userToken');

        if (!userToken) {
            throw new Error("userToken 갖고 올 수 없습니다.")
        }

        const options = {
            userToken : userToken, // 쿠키에서 가져온 userToken을 사용
        }

        const paymentArray: PaymentModel[] = await paymentAPI.findByUser(options);

        if (paymentArray.length === 0) {
            console.log("주소를 찾을 수 없습니다.");
            return [];
        }
        return paymentArray
    } catch (error){
        console.error("fetchAllAddressesByUserId 에러 발생", error);
        throw new Error("주소 목록을 가져오는 중 에러가 발생했습니다.");
    }
}