// src/utils/headers.ts

type HTTPMethod = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';

export const HTTPRequest = (method: HTTPMethod, url: string) => {
    const userInfo = getUserInfo();
    // const xhr = new XMLHttpRequest();
    // // HTTP 메서드 동적으로 설정
    // xhr.open(method, url, true);
    // console.log("HTTPMethod 확인: ", method);

    if (userInfo != null) {
        // role 배열의 첫 번째 요소만 가져오기
        const userRole = userInfo.userRole ? userInfo.userRole[0] : null; // 첫 번째 요소가 없으면 null
        const { role: _, ...restUserInfo } = userInfo; // role 제외한 나머지 정보 저장
        const encodeUserInfo = encodeURIComponent(JSON.stringify({ ...restUserInfo, userRole })); // 나머지 정보와 role을 함께 인코딩
        //xhr.setRequestHeader("UserInfo", encodeUserInfo);

        console.log("encodeUserInfo 되는지 확인: ", encodeUserInfo);
        // 이거 나중에 쿠키로 설정을 해야 한다.
        /*TODO
        *  나중에 userToken에다가 userInfo 모델을 넣어야 함.
        *
        *
        *
        * / */
        return  encodeUserInfo
    } else {
        return userInfo;
    }
}

export const getUserInfo = () => {
    console.log("getUserInfo 들어오는지 확인: ", getUserInfo);

    const userInfoString = localStorage.getItem("userToken");
    console.log("userInfoString 들어오는지 확인: ", userInfoString);

    // 쿠키 셋도 만들기
    // junhan 으로 피알을 하고,
    // 그 다음에 준한 삭젤르 해서,
    // 송으로 다시 하라는거야?
    //피알 올리면, 머지를 주잖아.
        // 머지 컨펌을 하고 델리트 브렌치가 있어 -b 준한을 밀고ㅡ,
    // 송은 남잖아.
    // 그 다음에 풀을 해서 데브 끌어올리면 된다.

    // 어떤거? 루트 레이아웃 use client 삭제를 하자는거지?
    // 오케이 오킹
    // 퍼시스 컴포넌트

    // 미안 내가 조금 더 알아볼게
    // 메인
    return userInfoString ? JSON.parse(userInfoString) : null; // JSON 문자열을 객체로 변환
};
// userToken 배열, 인코딩 껴놓은거 유정이가 ㅁ나든걸로 껴 놓으면 된다.
