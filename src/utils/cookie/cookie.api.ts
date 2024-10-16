//src/utils/cookie/cookie.api.ts
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import {UserToken} from "@/model/user/userToken";

// 유저 토큰을 저장하는 함수
/*export const saveUserTokenToCookie = (userToken:UserToken) => {
    Cookies.set('userToken', JSON.stringify(userToken), { expires: 7 });  // 7일 동안 쿠키 유지

    console.log("유저객체가 쿠키에 저장되었습니다.");

    // 사용방법 노션에 있음 frontend userToken 이라고 검색을 하기
};*/

export const saveUserTokenToCookie = (userToken: UserToken) => {
    Cookies.set('userToken', JSON.stringify(userToken), { path: '/', secure: true, sameSite: 'Lax' });
    console.log("유저객체가 쿠키에 저장되었습니다.");
    //
};


export const saveToken = (token: string, refreshToken?: string) => {

    // 무결성 검증 먼저 수행
    if (!IntegrityToken(token)) {
        console.error('무결성 검증 실패: 토큰 저장이 중단되었습니다.');
        return;
    }

    // 1. JWT 토큰을 쿠키에 저장 (7일 동안 유지)

    Cookies.set('token', token, {
        expires: 7, // 7일 동안 유지
        path: '/',  // 모든 경로에서 유효
        secure: true, // HTTPS에서만 쿠키 전송
        sameSite: 'strict', // 동일 사이트에서만 쿠키 사용
    });

    // 2. Refresh 토큰이 있을 경우 쿠키에 저장 (30일 동안 유지)
    if (refreshToken) {
        Cookies.set('refreshToken', refreshToken, {
            expires: 30, // 30일 동안 유지
            path: '/',  // 모든 경로에서 유효
            secure: true, // HTTPS에서만 쿠키 전송
            sameSite: 'strict', // 동일 사이트에서만 쿠키 사용
        });
    }
};



// JWT 토큰을 로컬 스토리지와 쿠키에서 삭제하는 함수 (로그아웃 시 사용)
/*export const clearToken = () => {
    // 로컬 스토리지에서 토큰 제거
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem("userInfo");

    // 이미지에 있던 항목
    localStorage.removeItem('TanstackQueryDevtools.open');
    localStorage.removeItem('ally-supports-cache');
    localStorage.removeItem('as;dlfkjad');
    localStorage.removeItem('com.naver.oauth.state_token');
    localStorage.removeItem('persist:root');
    localStorage.removeItem('theme');

    Cookies.remove('token', {path: '/', secure: true, sameSite: 'strict'});
    Cookies.remove('refreshToken', {path: '/', secure: true, sameSite: 'strict'});
    Cookies.remove('token', {path: '/', secure: true, sameSite: 'strict'});
    Cookies.remove('refreshToken', {path: '/', secure: true, sameSite: 'strict'});
    Cookies.remove('accessToken', { path: '/', secure: true, sameSite: 'strict' }); // accessToken 제거
    Cookies.remove('userToken', { path: '/', secure: true, sameSite: 'strict' });   // userToken 제거
    Cookies.remove('Authorization', { path: '/', secure: true, sameSite: 'strict' });   // userToken 제거
};*/
// JWT 토큰을 로컬 스토리지와 쿠키에서 삭제하는 함수 (로그아웃 시 사용)
export const clearToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem("userInfo");

    Cookies.remove('token', { path: '/', secure: true, sameSite: 'strict' });
    Cookies.remove('refreshToken', { path: '/', secure: true, sameSite: 'strict' });
};


export const AuthorizationToken = () => {

    Cookies.remove('Authorization', { path: '/', secure: true, sameSite: 'strict' });
};

/*쿠키만 삭제 하는 메서드 */
export const removeCookie = () => {
    const allCookies = Cookies.get();
    Object.keys(allCookies).forEach(cookieName => {
        Cookies.remove(cookieName, {path: '/'})
    })
}

// 쿠키 읽어오는 함수
export const getCookie = (name: string): string | null => {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
};

// JWT 무결성 검사 함수
export const IntegrityToken = (token: string | null): boolean => {
    if (!token) {
        console.error('토큰이 없습니다.');
        return false;
    }

    try {
        // 토큰을 디코딩하고 페이로드를 추출
        const decoded = jwt.decode(token) as jwt.JwtPayload;
        // 만료 시간 (exp) 추출
        const exp = decoded?.exp;
        if (!exp) {
            console.error('토큰에 만료 시간이 없습니다.');
            return false;
        }

        // 현재 시간과 만료 시간 비교
        const currentTime = Math.floor(Date.now() / 1000); // 현재 시간 (초 단위)
        const timeRemaining = exp - currentTime;
        if (timeRemaining <= 0) {
            console.error('토큰이 만료되었습니다.');
            return false;
        }

        console.log(`토큰이 유효합니다. 남은 시간: ${timeRemaining}초`);
        return true;
    } catch (error) {
        console.error('토큰 디코딩 실패:', error);
        return false;
    }
};

// JWT 토큰 남은 시간 계산 함수
export const getTokenRemainingTime = (token: string | null): number | null => {
    if (!token) return null;

    try {
        // 토큰 디코딩
        const decoded = jwt.decode(token) as jwt.JwtPayload;
        if (!decoded || !decoded.exp) {
            console.error('토큰에서 만료 시간을 추출할 수 없습니다.');
            return null;
        }

        // 현재 시간과 만료 시간 비교
        const currentTime = Math.floor(Date.now() / 1000); // 초 단위로 현재 시간
        const timeRemaining = decoded.exp - currentTime;

        return timeRemaining > 0 ? timeRemaining : 0; // 남은 시간 반환, 없으면 0
    } catch (error) {
        console.error('토큰 디코딩 실패:', error);
        return null;
    }
};
