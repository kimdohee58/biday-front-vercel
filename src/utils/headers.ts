// src/utils/headers.ts

type HTTPMethod = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';

export const HTTPRequest = (method: HTTPMethod, url: string) => {
    const userToken = getUserToken();

    if (userToken != null) {
        // role 배열의 첫 번째 요소만 가져오기
        const userRole = userToken.userRole ? userToken.userRole[0] : null; // 첫 번째 요소가 없으면 null
        const { role: _, ...restuserToken } = userToken; // role 제외한 나머지 정보 저장
        const encodeuserToken = encodeURIComponent(JSON.stringify({ ...restuserToken, userRole })); // 나머지 정보와 role을 함께 인코딩

        console.log("encodeuserToken 되는지 확인: ", encodeuserToken);
        // 이거 나중에 쿠키로 설정을 해야 한다.

        return  encodeuserToken
    } else {
        return userToken;
    }
}

export const getUserToken = () => {
    console.log("getuserToken 들어오는지 확인: ", getUserToken);
    const userTokenString = localStorage.getItem("userToken");
    console.log("userTokenString 들어오는지 확인: ", userTokenString);
    return userTokenString ? JSON.parse(userTokenString) : null; // JSON 문자열을 객체로 변환
};


