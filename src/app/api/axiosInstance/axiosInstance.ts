// src/app/api/axiosInstance/axiosInstance.ts
import axios from 'axios';
import Cookies from 'js-cookie';
import {handleReissueToken} from "@/utils/reissue/reissueToken";
import {getTokenRemainingTime} from "@/utils/cookie/cookie.api"; // 쿠키를 사용하기 위해 js-cookie 임포트


// Axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_SERVER_URL,
    withCredentials: true,  // 쿠키를 포함하여 요청을 보내도록 설정
    timeout: 10000, // 시간 초과
});

// 요청 인터셉터: 요청 전에 액세스 토큰 만료 시간 체크 및 재발급 처리
axiosInstance.interceptors.request.use(
    async (config) => {
        let accessToken = Cookies.get('token');  // 쿠키에서 액세스 토큰 가져오기

        if (accessToken) {
            const remainingTime = getTokenRemainingTime(accessToken);  // 토큰 남은 시간 확인

            // 만료 60초 전이면 리프레시 토큰으로 재발급
            if (remainingTime !== null && remainingTime <= 60) {
                try {
                    console.log("액세스 토큰 만료 임박, 재발급 시도");

                    await handleReissueToken(); // 새로운 액세스 토큰 발급 요청
                    accessToken = Cookies.get('token');  // 새로 발급된 액세스 토큰 가져오기

                    if (accessToken) {
                        config.headers['Authorization'] = `Bearer ${accessToken}`;  // 헤더에 추가
                        console.log("새로운 액세스 토큰이 적용되었습니다.");
                    }
                } catch (error) {
                    console.error('액세스 토큰 재발급 중 오류:', error);
                    return Promise.reject(error);
                }
            } else {
                // 토큰이 유효할 경우 바로 헤더에 추가
                config.headers['Authorization'] = `Bearer ${accessToken}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


// 응답 인터셉터: 401 에러 발생 시 토큰 재발급
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // 리프레시 토큰을 사용하여 새로운 액세스 토큰 발급
                await handleReissueToken();

                const newAccessToken = Cookies.get('token');
                if (newAccessToken) {
                    // 헤더에 새로운 액세스 토큰 설정
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                    // 실패한 요청 다시 시도
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