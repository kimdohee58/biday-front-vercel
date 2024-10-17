// src/service/user/user.service.ts
import {RequestOptions} from "@/model/api/RequestOptions";
import {userAPI} from "@/api/user/user.api";
import Cookies from "js-cookie";

export async function changePasswordService(password: string, newPassword: string): Promise<any> {

    const userToken = Cookies.get('userToken');

    if (!userToken) {
        throw new Error("User token을 가져올 수 없습니다."); // 명확한 에러 메시지 추가
    }

    const options: RequestOptions<{}, { password: string, newPassword: string }> = {
        userToken: userToken,
        data: {
            password: password,
            newPassword: newPassword
        }
    };

    try {

        // 비밀번호 변경 API 호출
        const response = await userAPI.changePassword(options);

        // 응답에 따른 유효성 체크
        if (response === "비밀번호 변경이 완료했습니다.") {
            alert("비밀번호가 성공적으로 변경되었습니다.");
        } else if (response === "예전 비밀번호가 틀렸습니다.") {
            alert("예전 비밀번호가 틀렸습니다.");
        } else if (response === "유저 대상이 없습니다.") {
            alert("유저 대상이 없습니다.");
        } else {
            throw new Error("비밀번호 변경 실패");
        }
    } catch (error) {
        console.error("비밀번호 변경 실패:", error);
        alert("비밀번호 변경에 실패했습니다.");
    }

}
