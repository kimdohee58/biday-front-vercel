// src/service/user/login.api.ts
import axiosInstance from "@/app/api/axiosInstance/axiosInstance";
import Cookies from "js-cookie";
import {AxiosResponse} from "axios";
import {saveToken} from "@/utils/cookie/cookie.api";

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

            const authorizationHeader = response.headers["authorization"];

            if (authorizationHeader) {
                const accessToken = authorizationHeader.split(" ")[1]; // "Bearer {accessToken}" 형태로 전송되므로 'Bearer' 부분을 제거

                saveToken(accessToken)
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
