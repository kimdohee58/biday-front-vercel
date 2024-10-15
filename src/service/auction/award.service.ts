import {awardAPI} from "@/api/auction/award.api";
import Cookies from "js-cookie";

export async function fetchAwardOne (awardId: number) {
    const userToken = Cookies.get("userToken");
    if (!userToken) {
        throw new Error("쿠키 접근 불가");
        // 추후 error enum 변경
    }

    const options = {
        params : {awardId: awardId},
        userToken: userToken,
    };

    try {

        return await awardAPI.findById(options);

    } catch (error) {
        console.log("fetchAwardOne 도중 오류 발생", error);
        throw new Error("fetchAwardOne  도중 오류 발생");
    }
}