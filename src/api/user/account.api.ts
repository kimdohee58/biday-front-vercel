// src/api/account/account.api.ts
import { api } from "../request";
import { strategy } from "../api.strategy";
import {AccountModel} from "@/model/user/account.model";
import Cookies from "js-cookie";

// 계좌 조회 (GET 요청)
const findById = async (userId: string, token:string): Promise<AccountModel> => {

    console.log("토큰 확인: ", token);

    const userInfo = {
        userId: "6700e19686d1ce6cd1fc6f25",
        userName: "shull",
        userRole: "ROLE_USER",
    }

    const response = await strategy.GET(`${api.account}`, undefined, {'UserInfo' : JSON.stringify(userInfo)}, token);

    const data = await response;

    console.log("api/account/account.api.ts response 응답: ", data);

    console.log("응답확인: ", data);

    return data;
};

// 계좌 등록 (POST 요청)
const save = async (accountData: AccountModel): Promise<AccountModel> => {
    const token = Cookies.get("token");
    console.log("토큰 확인: ", token)
    const response = await strategy.POST(`${api.account}/save`, accountData, undefined, undefined, token);

    const data = await response.json();
    console.log("응답확인: ",data);
    return data;
};

export const accountAPI = {
    findById,
    save,
};
