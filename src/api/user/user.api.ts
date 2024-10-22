import {UserModel} from "@/model/user/user.model";
import {strategy} from "../api.strategy"; // 전략 패턴을 사용하는 공통 모듈 import
import {api} from "../request";
import {RequestOptions} from "@/model/api/RequestOptions"; // 공통 API 경로 설정 import

const changePassword = async (options: RequestOptions<{}, { password: string, newPassword: string }>): Promise<any> => {
    const response = await strategy.PATCH(`${api.user}/changepass`, options);

    console.log("response",response)
    if ((response === "예전 비밀번호가 틀렸습니다."||response ==="유저 대상이 없습니다.")) {
        throw new Error("비밀번호 변경 실패");
    }
    // 문자열 응답 처리
    return response;
};


const checkPassword = async (options: RequestOptions<{}, null>): Promise<boolean> => {
    const response = await strategy.POST(`${api.user}/password`, options);
    return response;
}


export const userAPI = {
    changePassword,
    checkPassword
}
