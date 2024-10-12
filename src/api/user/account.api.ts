// src/api/account/account.api.ts
import { api } from "../request";
import { strategy } from "../api.strategy";
import {AccountModel} from "@/model/user/account.model";
import Cookies from "js-cookie";
import {UserInfo} from "@/model/user/userInfo.model";
import {RequestOptions} from "@/model/api/RequestOptions";

// 계좌 조회 (GET 요청)
const findById = async (userId: string, token:string, userToken:UserInfo): Promise<AccountModel> => {

    console.log("토큰 확인: ", token);

    const response = await strategy.GET(`${api.account}`, undefined, {'UserInfo' : JSON.stringify(userToken)}, token);

    const data = await response;

    console.log("api/account/account.api.ts response 응답: ", data);

    console.log("응답확인: ", data);

    return data;

};



// 계좌 등록 (POST 요청)
const save = async (options: RequestOptions<AccountModel>): Promise<AccountModel> => {
    const response = await strategy.POST(`${api.account}/save`, options);

    const data = await response.json();
    console.log("응답확인: ",data);
    return data;
};

export const accountAPI = {
    findById,
    save,
};
