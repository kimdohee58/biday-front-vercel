import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getTokenRemainingTime } from "@/utils/cookie/cookie.api";

// 백엔드 API URL
const REISSUE_API_URL = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/reissue`;

const protectedRoutes = ['/', '/account', '/users/*'];

export async function middleware(req: NextRequest) {
    const authorizationToken = req.cookies.get('refresh'); // 리프레시 토큰
    const tokenCookie = req.cookies.get('token'); // 액세스 토큰

    console.log("middleware authorizationToken:", authorizationToken);
    console.log("middleware token:", tokenCookie);

    const { pathname } = req.nextUrl;

    if (!authorizationToken) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    const token = tokenCookie?.value;
    if (token) {
        const timeRemaining = getTokenRemainingTime(token);

        if (timeRemaining !== null && timeRemaining <= 590) {
            console.log("토큰 만료 임박, 재발급 요청");

            try {
                const response = await fetch(`${REISSUE_API_URL}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authorizationToken?.value}`,
                    },
                    credentials: 'include', // 쿠키 포함
                });

                if (response.ok) {
                    const responseData = await response.json();
                    const newAccessToken = responseData.access;

                    console.log("새로운 액세스 토큰:", newAccessToken);

                    const res = NextResponse.next();
                    res.cookies.set('token', newAccessToken, {
                        httpOnly: true,
                        secure: true,
                        path: '/',
                    });

                    return res;
                } else {
                    console.error("토큰 재발급 실패:", response.statusText);
                    return NextResponse.redirect(new URL('/login', req.url));
                }
            } catch (error) {
                console.error("토큰 재발급 중 오류 발생:", error);
                return NextResponse.redirect(new URL('/login', req.url));
            }
        }
    } else {
        console.log("No token found");
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/account'], // 미들웨어 적용 경로
};
