// src/service/user/user.service.ts
import {RequestOptions} from "@/model/api/RequestOptions";
import {userAPI} from "@/api/user/user.api";
import Cookies from "js-cookie";
import {UserModel} from "@/model/user/user.model";

export async function changePasswordService(password: string, newPassword: string): Promise<any> {

    const userToken = Cookies.get('userToken');

    if (!userToken) {
        throw new Error("User token을 가져올 수 없습니다.");
        // TODO error enum
    }

    const options: RequestOptions<{}, { password: string, newPassword: string }> = {
        userToken: userToken,
        data: {
            password: password,
            newPassword: newPassword
        }
    };

    try {
        const response = await userAPI.changePassword(options);

        return  response
    } catch (error) {
        console.error("비밀번호 변경 실패:", error);
        alert("비밀번호 변경에 실패했습니다.");
    }
}

export async function checkPasswordService(): Promise<boolean> {
    const userToken = Cookies.get('userToken');

    if (!userToken) {
        throw new Error("UserToken을 가져올 수 없습니다.");
    }

    const options: RequestOptions<{  }, null> = {
        userToken: userToken
    }


    try {
        const response = await userAPI.checkPassword(options);
        console.log("checkPasswordService : ",response)
        return response;
    } catch (error) {
        console.log("비밀번호 확인 오류")
        throw new Error()
    }
}

export async function emailByPhoneRetrieve(userData: UserModel): Promise<{ email: string | undefined } | null> {
    try {
        const options = {
            data: userData
        };

        // 응답 타입을 any로 임시 설정 및 JSON 파싱 확인
        const response: any = await userAPI.emailByPhone(options);
        const parsedResponse = typeof response === 'string' ? JSON.parse(response) : response;

        // 최상위 수준에서 이메일 추출
        const email = parsedResponse?.email;

        if (email) {
            return { email };
        } else {
            console.error("응답에 이메일 정보가 없습니다.");
            throw new Error("응답에 이메일 정보가 없습니다.");
        }
    } catch (error) {
        console.error("emailByPhoneRetrieve 에러 발생:", error);
        throw new Error("핸드폰으로 이메일 찾기가 불가능합니다.");
    }
}

export async function randomPassword(email: string, phoneNum: string): Promise<UserModel> {
    try {
        // 요청 데이터 설정 (RequestOptions 형태로 설정)
        const options: RequestOptions<{}, { email: string; phoneNum: string }> = {
            data: {
                email: email,
                phoneNum: phoneNum, // API에서 예상하는 속성 이름을 맞춤
            },
        };

        const response: UserModel = await userAPI.resetPassword(options);
        console.log("서버에서 들어오는 응답 로그:", response);

        return response; // 성공 시 응답 반환
    } catch (error) {
        console.error("randomPassword 호출 실패:", error);
        throw new Error("비밀번호 초기화에 실패했습니다.");
    }
}