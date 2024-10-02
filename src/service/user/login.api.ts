// src/service/user/login.api.ts
import { getCookie } from "@/utils/cookie/cookie.api";

export const handleLogin = async (username: string, password: string): Promise<Response | null> => {
    try {
        // JSON 형식으로 데이터 구성
        const body = JSON.stringify({
            username: username,
            password: password,
        });

        const response = await fetch("http://localhost:8080/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",  // JSON 형식으로 전송
            },
            body: body,  // JSON 데이터를 body에 담아서 전송
            credentials: "include",  // 쿠키 포함
        });

        if (response.ok) {
            // 서버에서 'Authorization' 헤더에 액세스 토큰을 담아 보냈다면, 이를 추출
            const authorizationHeader = response.headers.get("Authorization");
            if (authorizationHeader) {
                // "Bearer {accessToken}" 형태로 전송되므로 'Bearer' 부분을 제거
                const accessToken = authorizationHeader.split(" ")[1];
                console.log("Access Token:", accessToken);

                // 액세스 토큰을 로컬 스토리지에 저장
                if (accessToken) {
                    localStorage.setItem("accessToken", accessToken);
                }
            }

            // 리프레시 토큰은 쿠키에 저장되어 있으므로, 별도의 처리 필요 없음
            const refreshToken = getCookie("refresh");  // 쿠키에서 리프레시 토큰 가져오기
            console.log("Refresh Token:", refreshToken);

            // 응답이 비어있지 않을 때만 JSON 파싱
            const data = response.headers.get('content-length') !== '0' ? await response.json() : {};

            // 필요한 경우, 추가 처리
            return response;
        } else {
            // 응답이 성공적이지 않은 경우 에러 처리
            throw new Error(response.statusText);
        }
    } catch (jsonError) {
        console.error('JSON Error:', jsonError);
        throw jsonError;
    }
};
