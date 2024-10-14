/*
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const authorizationToken = req.headers.get('Authorization');
    const authToken = req.cookies.get('Authorization');
    console.log("미들웨어 : " , authorizationToken)
    console.log("어오스토큰 : " , authToken)
    // Authorization 헤더가 없으면 로그인 페이지로 리디렉트
    if (!authorizationToken) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    // Authorization 헤더가 존재하면 쿠키에 토큰 저장
    const response = NextResponse.next();
    response.cookies.set('Authorization', authorizationToken, { httpOnly: true });
    console.log("미들웨어 리스폰스 : " , response)
    return response;
}

// 설정 경로
export const config = {
    matcher: ['/(.*)'], // API 경로는 제외
};
*/
