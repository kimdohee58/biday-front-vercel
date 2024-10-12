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
    const userToken = localStorage.getItem("userToken");
    if (!userToken) {
        throw new Error();
    }

    const options = {
        userToken: userToken,
    }

    try {
        return await accountAPI.findById(options);

    } catch (error) {

    }

}

