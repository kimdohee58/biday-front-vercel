// src/service/user/login.api.ts
import axiosInstance from "@/app/api/axiosInstance/axiosInstance";
import Cookies from "js-cookie";
import {AxiosResponse} from "axios";

const loginApi = "/login"
export const handleLogin = async (username: string, password: string): Promise<AxiosResponse | null> => {
    try {
        const response: AxiosResponse = await axiosInstance.post("/login", {
            username,  // 요청 데이터에 username과 password 추가
            password,
        }, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true, // 쿠키 포함
        });

        if (response.status === 200) {
            const authorizationHeader = response.headers["Authorization"];
            console.log("login.api.ts" , response) // 값 들어옴.  200.Ok
            if (authorizationHeader) {
                const accessToken = authorizationHeader.split(" ")[1]; // "Bearer {accessToken}" 형태로 전송되므로 'Bearer' 부분을 제거

                Cookies.set('accessToken', accessToken, {
                    expires: 7,  // 쿠키 유효기간 설정
                    path: '/',   // 쿠키 경로 설정
                    secure: true,   // HTTPS에서만 전송되도록 설정
                    sameSite: 'strict',  // sameSite 옵션 설정
                });
                console.log("토큰 쿠키에 저장이 됐습니다. 액세스 ", accessToken);
            }

            return response;
        } else {
            throw new Error(response.statusText);
        }
    } catch (error) {
        console.error('Login Error:', error);
        throw error;
    }
};
