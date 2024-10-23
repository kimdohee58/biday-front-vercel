import Cookies from "js-cookie";
import {AccountModel} from "@/model/user/account.model";
import {accountAPI} from "@/api/user/account.api";

const getUserToken = () => {
    const userToken = Cookies.get("userToken");
    if (!userToken) {
        throw new Error("토큰 없음");
        //TODO error enum
    }

    return userToken;
}

// 판매자 계좌등록
export async function saveAccount(account: AccountModel) {
    const options = {
        userToken: getUserToken(),
        data: account,
    }

    try {
        return await accountAPI.save(options);
    } catch (error) {
        console.error("saveAccount 도중 오류 발생", error);
        throw new Error("");
        // TODO error num
    }

}

// 판매자 계좌조회
export async function getAccount() {
    const options = {
        userToken: getUserToken(),
    };

    try {
        const result =  await accountAPI.findById(options);

        console.log("getAccount", result);
        return result;

    } catch (error) {
        console.error("getAccount 도중 오류 발생", error);
        throw new Error('');
        // TODO error num
    }
}