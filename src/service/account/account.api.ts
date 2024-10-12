import fetchWithToken from "@/lib/fetchWithToken";
import Cookies from "js-cookie";
import {AccountModel} from "@/model/user/account.model";
import {accountAPI} from "@/api/user/account.api";


// 판매자 계좌등록
export async function saveAccount(account: AccountModel) {

    const options = {

    }

    try {
        return await accountAPI.save(options);
    } catch (error) {

    }

}

// 판매자 계좌조회
export async function getAccount() {

    const userToken = Cookies.get("userToken");

    const userId = "6703c9bf0ef91f70f4e4e0ec";


    try {

        return await accountAPI.findById(userId, token, userToken);


    } catch (error) {

    }

}

