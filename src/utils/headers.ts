//src/utils/headers.ts

// const url = `${process.env.NEXT_PUBLIC_API_CLIENT_URL}`;
type HTTPMethod = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';

export const HTTPRequest = (method:HTTPMethod, url:string) =>{
    const userInfo = getUserInfo();
    const xhr = new XMLHttpRequest();

    // HTTP 메서드 동적으로 설정
    xhr.open(method,url,true);
    console.log("HTTPMethod 확인 : " , method)

    if (userInfo != null) {
        // 헤더에 값을 넣기 전에 유저 객체 인코딩
        const encodeUserInfo = encodeURIComponent(JSON.stringify(userInfo));
        xhr.setRequestHeader("UserInfo", encodeUserInfo);
        console.log("encodeUserInfo 되는지 확인 :   " ,encodeUserInfo)

        return {'UserInfo': encodeUserInfo}
        // return encodeUserInfo;
    } else {
        return {'UserInfo': userInfo};
    }
}


export const getUserInfo = () => {

    console.log("getUserInfo 들어오는지 확인 : " , getUserInfo)

    const userInfoString = localStorage.getItem("userInfo");
    console.log("userInfoString 들어오는지 확인 : " , userInfoString)

    return userInfoString ? JSON.parse(userInfoString) : null; // JSON 문자열을 객체로 변환
};





