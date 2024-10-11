// src/utils/headers.ts

type HTTPMethod = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';

export const HTTPRequest = (method: HTTPMethod, url: string) => {
    const userInfo = getUserInfo();
    const xhr = new XMLHttpRequest();

    // HTTP 메서드 동적으로 설정
    xhr.open(method, url, true);
    console.log("HTTPMethod 확인: ", method);

    if (userInfo != null) {
        // role 배열의 첫 번째 요소만 가져오기
        const userRole = userInfo.userRole ? userInfo.userRole[0] : null; // 첫 번째 요소가 없으면 null
        const { role: _, ...restUserInfo } = userInfo; // role 제외한 나머지 정보 저장
        const encodeUserInfo = encodeURIComponent(JSON.stringify({ ...restUserInfo, userRole })); // 나머지 정보와 role을 함께 인코딩
        xhr.setRequestHeader("UserInfo", encodeUserInfo);
        console.log("encodeUserInfo 되는지 확인: ", encodeUserInfo);

        return { 'UserInfo': encodeUserInfo };
    } else {
        return { 'UserInfo': userInfo };
    }
}

export const getUserInfo = () => {
    console.log("getUserInfo 들어오는지 확인: ", getUserInfo);

    const userInfoString = localStorage.getItem("userInfo");
    console.log("userInfoString 들어오는지 확인: ", userInfoString);

    return userInfoString ? JSON.parse(userInfoString) : null; // JSON 문자열을 객체로 변환
};
