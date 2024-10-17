// src/utils/reissue/reissueToken.ts
import Cookies from 'js-cookie';
import {saveToken} from "@/utils/cookie/cookie.api";

const baseUrl = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/reissue`

export const handleReissueToken = async () => {
    try {
        const refreshToken = Cookies.get('refresh');
        if (!refreshToken) {
            throw new Error('리프레시 토큰이 없습니다.');
        }

        // 서버로 리프레시 토큰 전송하여 액세스 토큰 재발급 요청
        const response = await fetch(baseUrl, {
            method: "POST",
            credentials: 'include',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh: refreshToken }),
        });

        if (response.status === 200) {
            const authorizationHeader = response.headers.get("Authorization");

            if (authorizationHeader) {
                // Authorization 헤더에서 Bearer {token} 형태의 토큰을 추출
                const newAccessToken = authorizationHeader.split(" ")[1]; // Bearer {token}에서 token 추출
                console.log("새로운 액세스 토큰이 쿠키에 저장되었습니다:", newAccessToken);
                // 네트워크 패널 확인
                // 브라우저의 개발자 도구 네트워크 탭에서 Reissue 요청이 성공했는지 확인을 할 수 있고,
                // HTTP 상태 코드 200이 나오면 성공적으로 처리된 것이고, 응답 헤더에 새로운 액세스 토큰이 있는지 확인할 수 있다.

                // 재발급 후 새로운 액세스 토큰이 쿠키에 제대로 저장이 되었는지 개발자 도구의 애플리케이션 -> 쿠키에서 확인을 할 수 있다.

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