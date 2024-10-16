// src/service/user/user.api.ts

import {UserModel} from "@/model/user/user.model";
import Cookies from "js-cookie";
import {RequestOptions} from "@/model/api/RequestOptions";
import {strategy} from "@/api/api.strategy";
import {HTTPRequest} from "@/utils/headers";


let baseURL = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/users`;

// 공통 fetch 처리 함수
async function apiRequest(
    endpoint: string,
    method: string = "GET",
    body?: any
): Promise<any> {
    const headers = {
        "Content-Type": "application/json",
    };

    try {
        const response = await fetch(`${baseURL}${endpoint}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
        });



        if (!response.ok) {
            throw new Error(`API 불러오는데 실패 : ${response.status}`);
        }

        const contentType = response.headers.get("Content-Type");

        // 응답이 JSON일 경우 JSON으로 파싱, 그렇지 않으면 텍스트로 처리
        if (contentType && contentType.includes("application/json")) {
            return await response.json();
        } else {
            return await response.text(); // JSON이 아닐 경우 텍스트로 처리
        }
    } catch (error) {
        console.error(`API 에러 요청 : ${endpoint}`, error);
        throw error;
    }
}


// 회원 한 명의 정보를 가져오는 API
export async function findUserById(id: string): Promise<UserModel | null> {
    try {
        const data = await apiRequest(`/findById/${id}`, "GET");  // 경로에 ID 추가
        return data as UserModel;
    } catch (error) {
        console.error(`ID 불러오기 실패 : ${id}`, error);
        return null;  // 오류 발생 시 null 반환
    }
}


// 회원가입 API
export async function insertUser(user: UserModel): Promise<any> {
    const body = {
        name: user.name,
        email: user.email,
        password: user.password,
        phoneNum: user.phoneNum,
    };

    try {
        const data = await apiRequest("/join", "POST", body);
        return {...data, status: true}; // 성공 시 true 반환
    } catch (error) {
        console.error('Error inserting user:', error);
        return {status: false}; // 실패 시 false 반환
    }
}

// 유저 삭제 API
export async function deleteUser(id: number): Promise<void | { status: number }> {
    console.log("deleteUser API 호출 - ID:", id);
    try {
        await apiRequest(`/${id}/cancel`, "DELETE");
    } catch (error) {
        return {status: 500};
    }
}

// 유저 업데이트 API
export const updateUser = async (id: string, user: UserModel): Promise<Response> => {
    const body = {
        name: user.name,
        email: user.email,
        password: user.password,
        phoneNum: user.phoneNum,
    };

    return apiRequest(`/${id}`, "PUT", body);
};

// 비밀번호 변경 API
export async function changepass(user: UserModel): Promise<Response> {

    const UserInfo = HTTPRequest('PATCH', `${baseURL}/changepass`);

    const body = {
        password: user.password, // 기존 비밀번호
        newPassword: user.newPassword // 새로운 비밀번호
    }

    console.log(UserInfo)

    // const headers = {
    //     "Content-Type": "application/json",
    //     "UserInfo": userTokenStr
    // }
    try {

        const response = await apiRequest(`/changepass`, 'PATCH', { UserInfo, body });

        // 응답이 텍스트 또는 JSON일 수 있으므로 둘 다 d처리
        if (typeof response === 'string') {
            console.log("비밀번호 변경 성공 제발 됐으면 좋겠다. ", response);
        } else {
            console.log("비밀번호 변경 성공 (JSON 응답):", response);
        }

        return response; // 성공 시 응답 반환
    } catch (error) {
        console.error("비밀번호 변경 실패:", error);
        throw error; // 에러 발생 시 호출한 쪽으로 에러 던짐
    }
}

// 로그아웃 API
export const logoutUser = async (): Promise<void> => {

    const refreshToken = document.cookie.split('; ').find(row => row.startsWith('refresh='));
    const tokenValue = refreshToken ? refreshToken.split('=')[1] : '';

    try {
        // 전역적으로 사용하는 apiRequest 사용해서 logout api 처리
        const response = await apiRequest(`/logout`, "POST", {refreshToken: tokenValue});

        if (response.ok) {
        } else {
            console.error(`로그아웃 실패: ${response.statusText}`);
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Fetch 에러: ${error.message}`);
        } else {
            console.error('알 수 없는 에러 발생');
        }
    }
};

// 이메일 중복확인
export async function checkEmailDuplication(email: string): Promise<boolean> {
    try {
        const data = await apiRequest("/validate", "POST", {email});
        return data;//이메일 사용 가능.
    } catch (error) {
        throw error;
    }
}

// 핸드폰 중복확인
export async function checkPhoneDuplication(phoneNum: string): Promise<boolean> {
    try {
        const data = await apiRequest("/phoneNum", "POST", {phoneNum});
        return data; // 핸드폰 번호 사용 가능
    } catch (error) {
        throw error;
    }
}

