// src/utils/reissue/reissueToken.ts
import Cookies from 'js-cookie';
import { saveToken } from "@/utils/cookie/cookie.api";
import axiosInstance from "@/app/api/axiosInstance/axiosInstance";

// const baseUrl = `${axiosInstance.defaults.baseURL}/reissue`;

export const handleReissueToken = async () => {
    try {
        const refreshToken = Cookies.get('refresh');
        console.log("handleReissueToken" ,refreshToken)
        if (!refreshToken) {
            throw new Error('리프레시 토큰이 없습니다.');
        }

        // 서버로 리프레시 토큰 전송하여 액세스 토큰 재발급 요청
        const response = await axiosInstance.post("/reissue", {
            refresh: refreshToken
        }, {
            withCredentials: true // 쿠키 포함
        });

        // 서버 응답이 성공적인 경우
        if (response.status === 200) {
            const authorizationHeader = response.headers['authorization'];

            if (authorizationHeader) {
                // Authorization 헤더에서 Bearer {token} 형태의 토큰을 추출
                const newAccessToken = authorizationHeader.split(" ")[1]; // Bearer {token}에서 token 추출
                console.log("새로운 액세스 토큰이 쿠키에 저장되었습니다:", newAccessToken);

                // 새로 받은 액세스 토큰을 저장 (saveToken 함수)
                saveToken(newAccessToken);
            } else {
                throw new Error("Authorization 헤더에서 토큰을 찾을 수 없습니다.");
            }
        } else {
            throw new Error(`토큰 재발급 실패: ${response.statusText}`);
        }
    } catch (error) {
        console.error("토큰 재발급 중 오류 발생:", error);
    }
};
