import Cookies from 'js-cookie';

// JWT 토큰을 쿠키와 로컬 스토리지에 저장하는 함수
export const saveToken = (token: string, refreshToken?: string) => {
    // 1. 로컬 스토리지에 JWT 토큰 저장
    localStorage.setItem('token', token);

    // 2. 쿠키에 JWT 토큰 저장
    Cookies.set('token', token, {expires: 7}); // 7일 동안 유지

    // refreshToken이 있을 경우 쿠키와 로컬 스토리지에 저장
    if (refreshToken) {
        Cookies.set('refreshToken', refreshToken, {expires: 30}); // 30일 동안 유지
        localStorage.setItem('refreshToken', refreshToken);
    }
    console.log('JWT 토큰이 로컬 스토리지와 쿠키에 저장되었습니다.');
};

// JWT 토큰을 로컬 스토리지와 쿠키에서 삭제하는 함수 (로그아웃 시 사용)
export const clearToken = () => {
    // 로컬 스토리지에서 토큰 제거
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');

    // 쿠키에서 토큰 제거
    //Cookies.remove('token');
    //Cookies.remove('refreshToken');
    document.cookie = 'token=; Max-Age=0; path=/;';
    document.cookie = 'refreshToken=; Max-Age=0; path=/;';

    console.log('JWT 토큰이 로컬 스토리지와 쿠키에서 삭제되었습니다.');
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