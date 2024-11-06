//src/service/user/login.api.ts
import axiosInstance from "@/app/api/axiosInstance/axiosInstance";
import axios, {AxiosError, AxiosResponse} from "axios";

interface ErrorResponse {
    message: string;  // 오류 메시지
}

export const handleLogin = async (username: string, password: string): Promise<AxiosResponse | null> => {
    try {
        const response: AxiosResponse = await axiosInstance.post("/login", {
            username,
            password,
        }, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });

        // 상태 코드가 200일 때 로그인 성공
        if (response.status === 200) {
            return response;
        } else {
            // 200이 아닐 경우의 추가 처리
            throw new Error(response.statusText);
        }
    } catch (error) {
        console.error('Login Error:', error);

        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<ErrorResponse>;

            if (axiosError.response?.status === 401) {
                // 401 Unauthorized 에러 시 잘못된 자격 증명
                alert("이메일이나 비밀번호가 잘못되었습니다.");
            } else if (axiosError.response?.status === 500) {
                alert("서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
            } else {
                alert(`로그인 중 오류가 발생했습니다. (오류 코드: ${axiosError.response?.status})`);
            }
        } else {
            alert('서버와의 연결에 문제가 발생했습니다. 다시 시도해주세요.');
        }

        return null; // 오류 발생 시 null 반환
    }
};