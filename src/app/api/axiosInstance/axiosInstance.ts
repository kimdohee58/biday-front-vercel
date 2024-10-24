// src/app/api/axiosInstance/axiosInstance.ts
import axios from 'axios';
import Cookies from 'js-cookie';
import {handleReissueToken} from "@/utils/reissue/reissueToken";
import {getTokenRemainingTime, saveToken} from "@/utils/cookie/cookie.api"; // 쿠키를 사용하기 위해 js-cookie 임포트


// Axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_SERVER_URL, // 기본 URL 설정
    withCredentials: true,  // 쿠키를 포함하여 요청을 보내도록 설정
    timeout: 10000, // 시간 초과
    maxRedirects: 0,  // 리다이렉트를 따르지 않도록 설정
});

// 요청 인터셉터: Axios 요청 전 쿠키에서 액세스 토큰을 가져와 헤더에 추가
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = Cookies.get('token');  // 쿠키에서 액세스 토큰 가져오기
        console.log("accessToken : 액시오스 인스턴ㅅ으 : " , accessToken)
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


axiosInstance.interceptors.response.use(
    async (response) => {
        if (response.config.url === '/reissue' && response.status === 200) {
            console.log("axiosInstance.interceptors!!!!!!!!")
            const location = response.headers['location'];
            if (location) {
                try {
                    const redirectResponse = await axios.get(location, {withCredentials: true});
                    const authorizationHeader = redirectResponse.headers['authorization'];

                    if (authorizationHeader) {
                        const accessToken = authorizationHeader.split(' ')[1];
                        saveToken(accessToken);
                        console.log("로그인 후 저장된 액세스 토큰:", accessToken);
                    } else {
                        await handleReissueToken();
                        console.error('Authorization 헤더가 없습니다.');
                    }
                    return redirectResponse;
                } catch (error) {
                    console.error('리다이렉트 요청 중 오류 발생:', error);
                    return Promise.reject(error);
                }
            }
        }

        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);


axiosInstance.interceptors.response.use(
    async (response) => {
        // 로그인 요청에 대한 응답 처리
        if (response.config.url === '/login' && response.status === 200) {
            const authorizationHeader = response.headers['authorization'];
            if (authorizationHeader) {
                const accessToken = authorizationHeader.split(' ')[1];
                // 액세스 토큰을 쿠키에 저장
                saveToken(accessToken);
                console.log("로그인 후 저장된 액세스 토큰:", accessToken);
                const access = Cookies.get('token');
                console.log("access", access)
                const remainingTime = getTokenRemainingTime(access);
                console.log("엑시오스 remainingTime: ", remainingTime);

                if (remainingTime !== null && remainingTime <= 60) {
                    try {
                        console.log("토큰 만료 임박, 새로운 액세스 토큰 발급 시도");
                        await handleReissueToken();

                        if (accessToken) {
                            response.config.headers['Authorization'] = `Bearer ${accessToken}`;
                            console.log("새로운 액세스 토큰이 요청에 적용되었습니다:", accessToken);
                        } else {
                            console.error('액세스 토큰 재발급 실패');
                        }
                    } catch (error) {
                        console.error('토큰 재발급 중 오류:', error);
                        return Promise.reject(error); // 재발급 실패 시 요청 중단
                    }
                } else {
                    console.log("interceptorsheaders")

                    response.config.headers['Authorization'] = `Bearer ${accessToken}`;
                }
            } else {
                console.error('Authorization 헤더가 없습니다.');
            }
        }

        return response; // 최종적으로 응답을 반환
    },
    (error) => {
        return Promise.reject(error);
    }
);


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

                console.log("New accessToken from reissue:", Cookies.get('token'));

                const newAccessToken = Cookies.get('token');
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
