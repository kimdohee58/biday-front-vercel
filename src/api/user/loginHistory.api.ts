import {api} from "../request";
import {strategy} from "../api.strategy";
import {LoginHistoryModel} from "@/model/user/loginHistory.model";

// 유저 로그인이력 조회 (GET 요청)
const findByUserId = async (userId: string): Promise<boolean> => {
    return await strategy.GET(`${api.loginHistory}/${userId}`, {}) as boolean; // 서버에서 Mono<Boolean>을 반환하므로 boolean으로 처리
};

// 유저 로그인이력 저장 (POST 요청)
const saveLoginHistory = async (loginHistoryData: LoginHistoryModel): Promise<LoginHistoryModel> => {
    const result = await (await strategy.POST(`${api.loginHistory}`, {})).json() as LoginHistoryModel;

    // 서버에서 받은 createdAt 값이 문자열일 경우 Date 객체로 변환
    return {
        ...result,
        createdAt: new Date(result.createdAt) // createdAt을 Date 객체로 변환
    };
};

export const loginHistoryAPI = {
    findByUserId,
    saveLoginHistory,
};
