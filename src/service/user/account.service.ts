import fetchWithToken from "@/lib/fetchWithToken";
import Cookies from "js-cookie";
import {AccountModel} from "@/model/user/account.model";
import {accountAPI} from "@/api/user/account.api";


// 판매자 계좌등록
export async function saveAccount(account: AccountModel) {

    const options = {
        data: account,
    }

    try {
        return await accountAPI.save(options);
    } catch (error) {

    }

}

// 판매자 계좌조회
export async function getAccount() {
    const userToken = Cookies.get("userToken");

    if (!userToken) {
        throw new Error("토큰 없음");
        //TODO error enum
    }

    const options = {
        userToken: userToken,
    };

    try {
        return await accountAPI.findById(options);

    } catch (error) {
        console.error("getAccount 도중 오류 발생", error);
        throw new Error("");
    }

}

