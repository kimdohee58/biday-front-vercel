// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
//
// export function middleware(req: NextRequest) {
//     const authorizationToken = req.headers.get('Authorization');
//     const authToken = req.cookies.get('Authorization');
//     console.log("미들웨어 : " , authorizationToken)
//     console.log("어오스토큰 : " , authToken)
//     // Authorization 헤더가 없으면 로그인 페이지로 리디렉트
//     if (!authorizationToken) {
//         return NextResponse.redirect(new URL('/', req.url));
//     }
//
//     // Authorization 헤더가 존재하면 쿠키에 토큰 저장
//     const response = NextResponse.next();
//     response.cookies.set('Authorization', authorizationToken, { httpOnly: true });
//     console.log("미들웨어 리스폰스 : " , response)
//     return response;
// }
//
// // 설정 경로
// export const config = {
//     matcher: ['/(.*)'], // API 경로는 제외
// };
// src/middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 보호할 경로를 지정합니다.
const protectedRoutes = ['/dashboard', '/profile'];

export function middleware(req: NextRequest) {
    // 쿠키에서 액세스 토큰을 가져옵니다.
    const token = req.cookies.get('Authorization')?.value;

        console.log("어오스토큰 : " , token)
    // 요청 경로를 확인합니다.
    const { pathname } = req.nextUrl;

    // 만약 보호된 경로에 접근하려고 하지만, 토큰이 없다면 로그인 페이지로 리다이렉트합니다.
    if (protectedRoutes.includes(pathname) && !token) {
        const loginUrl = new URL('/login', req.url);  // 로그인 페이지로 리다이렉트
        return NextResponse.redirect(loginUrl);
    }

    // 토큰이 있거나 보호된 경로가 아니라면 그대로 통과시킵니다.
    return NextResponse.next();
}

// 이 미들웨어를 모든 경로에서 사용
export const config = {
    matcher: '/:path*',  // 모든 경로에 대해 미들웨어를 적용
};
