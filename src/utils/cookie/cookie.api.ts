//src/utils/cookie/cookie.api.ts
import Cookies from 'js-cookie';
import {createUserToken} from "@/utils/jwt.utils";

// JWT 토큰과 Refresh 토큰을 쿠키에 저장하는 함수
export const saveToken = (token: string, refreshToken?: string) => {
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
export const clearToken = () => {
    // 로컬 스토리지에서 토큰 제거
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');


    Cookies.remove('token', {path: '/', secure: true, sameSite: 'strict'});
    Cookies.remove('refreshToken', {path: '/', secure: true, sameSite: 'strict'});

    //document.cookie = 'token=; Max-Age=0; path=/;';
    //document.cookie = 'refreshToken=; Max-Age=0; path=/;';
    Cookies.remove('token', {path: '/', secure: true, sameSite: 'strict'});
    Cookies.remove('refreshToken', {path: '/', secure: true, sameSite: 'strict'});

    console.log('JWT 토큰이 로컬 스토리지와 쿠키에서 삭제되었습니다.');
    console.log('로컬 스토리지에 저장된 토큰:', localStorage.getItem('token'));
    console.log('쿠키에 저장된 토큰:', getCookie('token'));
};


/*쿠키만 삭제 하는 메서드 */
export const removeCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
    // 아주 과거의 날짜를 설정을 하면
    // 쿠키를 즉시 만료시키고 삭제하게할 수 있다.
}

/*쿠키 읽어오는 메서드*/
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


export const userToken = (userInfo: { id: string; name: string; email: string; role:string}) => {
    // 유저 정보를 기반으로 JWT 커스텀 토큰 생성
    const userToken = createUserToken(userInfo);

    // 생성된 JWT 토큰을 쿠키에 저장 (7일 동안 유지)
    Cookies.set('userToken', userToken, {
        expires:7,
        path: "/", // 모든 경로에서 유효
        secure:true, // HTTPS에서만 쿠키를 전송한다고 하는데, 이거 우리 사용 안하지 않나..
        sameSite: 'strict', // 동일 사이트에서만 쿠키 사용
        httpOnly:false // js쿠키에서는 브라우저에서 관리가 되기 때문에 httpOnly는 false로 설정.
    });

    console.log("유저 정보 JWT 토큰이 내 마음속 쿠키에 저장~ ")

}