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

