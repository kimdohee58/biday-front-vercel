import axiosInstance from "@/app/api/axiosInstance/axiosInstance";
import axios, {AxiosError, AxiosResponse} from "axios";

// 백엔드에서 보내는 오류 응답의 타입 정의
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
            // error가 AxiosError 타입인지 확인
            const axiosError = error as AxiosError<ErrorResponse>;

            if (axiosError.response?.data?.message) {
                // 백엔드에서 전달된 오류 메시지를 사용자에게 보여줌
                alert(axiosError.response.data.message);
            } else {
                const statusCode = axiosError.response?.status;
                if (statusCode === 500) {
                    alert("서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
                } else {
                    alert(`로그인 중 오류가 발생했습니다. (오류 코드: ${statusCode})`);
                }
            }
        } else {
            // 네트워크 오류 등 서버 응답이 없는 경우 처리
            alert('서버와의 연결에 문제가 발생했습니다. 다시 시도해주세요.');
        }

        throw error; // 상위 호출로 전달
    }
};