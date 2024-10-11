import {NextRequest, NextResponse} from "next/server";

export function middleware(request: NextRequest) {
    // 쿠키에서 jwt 토큰을 가져오기
    const token = request.cookies.get('token');

    // 토큰이 없을 경우 로그인 페이지로 리다이렉트
    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // 토큰이 있을 경우, 다음 단계로 진행
    return NextResponse.next();
}


// 보호할 경로를 설정 로그인 안되면 못들어가는 페이지들,
export const config = {
    matcher: ['/account', '/checkout', '/account-savelists'],
}