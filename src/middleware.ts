import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/', '/account', '/users/*'];

export function middleware(req: NextRequest) {
    const authorizationToken = req.headers.get('Authorization') || req.cookies.get('Authorization')|| req.cookies.get('refresh');

    const token = req.cookies.get('token')
    const userToken =  req.cookies.get('userToken')

    console.log("middleware authorizationToken :",authorizationToken)
    console.log("middleware token :",token)
    console.log("middleware userToken :",userToken)
    const { pathname } = req.nextUrl;

    // if (protectedRoutes.some(route => typeof route === 'string' ? route === pathname : route.test(pathname))) {
        if (!authorizationToken) {
            return NextResponse.redirect(new URL('/login', req.url));
        }
    // }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/account'], // 인덱스 페이지와 '/account' 페이지에 미들웨어 적용
};
