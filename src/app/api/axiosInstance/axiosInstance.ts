// src/app/api/axiosInstance/axiosInstance.ts
import axios from 'axios';
import Cookies from 'js-cookie';
import {handleReissueToken} from "@/utils/reissue/reissueToken"; // 쿠키를 사용하기 위해 js-cookie 임포트

// Axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_SERVER_URL, // 기본 URL 설정
    withCredentials: true,  // 쿠키를 포함하여 요청을 보내도록 설정
    timeout: 20000, // 시간 초과
});

// 요청 인터셉터 설정 (쿠키에서 토큰 가져오기)
axiosInstance.interceptors.response.use(

    (response) => response,
    async (error) => {
        console.log("Axios Error Details:", error.response); // 에러 세부 정보 출력
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // 리프레시 토큰을 사용하여 액세스 토큰 재발급
                await handleReissueToken();
                console.log("New accessToken from reissue:", Cookies.get('accessToken'));

                const newAccessToken = Cookies.get('accessToken');
                if (newAccessToken) {
                    // 재발급된 액세스 토큰을 사용하여 헤더 업데이트
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                    // 실패한 요청을 새로운 토큰으로 다시 시도
                    return axiosInstance(originalRequest);
                }
            } catch (refreshError) {
                console.error('토큰 재발급 실패:', refreshError);
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
