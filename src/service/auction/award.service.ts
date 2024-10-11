import Cookies from "js-cookie";
import {awardAPI} from "@/api/auction/award.api";
import {RequestOptions} from "@/model/api/RequestOptions";

export async function fetchAwardDetails(awardId: string) {
    const token = Cookies.get("token");
    const userToken = Cookies.get("userToken");
    const options: RequestOptions<null> = {
        params: {
            awardId: awardId
        },
        token: token,
        userToken: userToken,
    }

    try {
        return await awardAPI.findById(options);
    } catch (error) {
        console.log(error);
    }
}