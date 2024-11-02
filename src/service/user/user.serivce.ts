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

        if (response === "비밀번호 변경이 완료했습니다.") {
            alert("비밀번호가 성공적으로 변경되었습니다.");
        } else if (response === "예전 비밀번호가 틀렸습니다.") {
            alert("예전 비밀번호가 틀렸습니다.");
        } else if (response === "유저 대상이 없습니다.") {
            alert("유저 대상이 없습니다.");
        } else {
            throw new Error("비밀번호 변경 실패");
            // TODO error enum
        }
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

export async function emailByPhoneRetrieve(userData: UserModel): Promise<UserModel> {
    console.log("emailByPhoneRetrieve 진입 확인 하는 로그 :",emailByPhoneRetrieve)
    try {
        const options = {
            data: userData
        };
        const emailPhone = await userAPI.emailByPhone(options);
        console.log("return 전에 확인 하는 코드 : ", emailPhone)
        return emailPhone;
    } catch (error) {
        console.error("emailByPhoneRetrieve 에러 발생 :", error);
        throw new Error("핸드폰으로 이메일 찾기가 불가능합니다.");
        //TODO error enum
    }
}