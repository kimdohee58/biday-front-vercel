// src/utils/reissue/reissueToken.ts
import Cookies from 'js-cookie';

const baseUrl = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/reissue`

export const handleReissueToken = async () => {
    try {
        const refreshToken = Cookies.get('refreshToken');
        if (!refreshToken) {
            console.error('리프레시 토큰이 없습니다. 재발급 중단.');
            return;
        }

        // 서버로 리프레시 토큰 전송하여 액세스 토큰 재발급 요청
        const response = await fetch(baseUrl, {
            method: "POST",
            credentials: 'include',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tokenValue: refreshToken }),
        });

        if (response.ok) {
            const data = await response.json();
            // 새로 재발급된 액세스 토큰을 쿠키에 저장
            Cookies.set('accessToken', data.accessToken, {
                expires: 1,
                path: '/',
                secure: true,
                sameSite: 'strict',
                httpOnly: true
            });
            console.log("재발급된 액세스 토큰:", Cookies.get('accessToken'));
        } else {
            console.error(`토큰 재발급 실패: ${response.statusText}`);
        }
    } catch (error) {
        console.error('토큰 재발급 중 오류:', error);
    }
};
