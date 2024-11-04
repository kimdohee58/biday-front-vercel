import {UserModel} from "@/model/user/user.model";
import {strategy} from "../api.strategy";
import {api} from "../request";
import {RequestOptions} from "@/model/api/RequestOptions";

const changePassword = async (options: RequestOptions<{}, { password: string, newPassword: string }>): Promise<any> => {
    const response = await strategy.PATCH(`${api.user}/changepass`, options);

    console.log("response",response)
    if ((response === "예전 비밀번호가 틀렸습니다."||response ==="유저 대상이 없습니다.")) {
        throw new Error("비밀번호 변경 실패");
    }
    return response;
};


const checkPassword = async (options: RequestOptions<{}, null>): Promise<boolean> => {
    const response = await strategy.POST(`${api.user}/password`, options);
    return response;
}

const emailByPhone = async (options: RequestOptions<{}, UserModel>): Promise<UserModel> => {
    const response = await strategy.POST(`${api.user}/retrieve`, options);
    const data = typeof response.json === 'function' ? await response.json() : response;
    return response;
};

const resetPassword = async (options: RequestOptions<{}, { email: string; phoneNum: string }>): Promise<UserModel> => {
    try {
        console.log("resetPassword 요청 전 options:", options);
        console.log("요청 경로: ", `${api.user}/resetPassword`);
        console.log("요청 데이터: ", options);
        const response = await strategy.POST(`${api.user}/resetPassword`, options);
        console.log("resetPassword 응답:", response);
        return response;
    } catch (error) {
        console.error("resetPassword 호출 중 오류 발생:", error);
        throw error;
    }
};



export const userAPI = {
    changePassword,
    checkPassword,
    emailByPhone,
    resetPassword
}