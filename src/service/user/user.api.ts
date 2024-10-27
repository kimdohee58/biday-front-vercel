import {UserModel} from "@/model/user/user.model";


let baseURL = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/users`;

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

        if (contentType && contentType.includes("application/json")) {
            return await response.json();
        } else {
            return await response.text();
        }
    } catch (error) {
        console.error(`API 에러 요청 : ${endpoint}`, error);
        throw error;
    }
}


export async function findUserById(id: string): Promise<UserModel | null> {
    try {
        const data = await apiRequest(`/findById/${id}`, "GET");
        return data as UserModel;
    } catch (error) {
        console.error(`ID 불러오기 실패 : ${id}`, error);
        return null;
    }
}


export async function insertUser(user: UserModel): Promise<any> {
    const body = {
        name: user.name,
        email: user.email,
        password: user.password,
        phoneNum: user.phoneNum,
    };
    try {
        const data = await apiRequest("/join", "POST", body);
        return {...data, status: true};
    } catch (error) {
        console.error('Error inserting user:', error);
        return {status: false};
    }
}

export async function deleteUser(id: number): Promise<void | { status: number }> {
    console.log("deleteUser API 호출 - ID:", id);
    try {
        await apiRequest(`/${id}/cancel`, "DELETE");
    } catch (error) {
        return {status: 500};
    }
}

export const updateUser = async (id: string, user: UserModel): Promise<Response> => {
    const body = {
        name: user.name,
        email: user.email,
        password: user.password,
        phoneNum: user.phoneNum,
    };

    return apiRequest(`/${id}`, "PUT", body);
};


export const logoutUser = async (): Promise<void> => {

    const refreshToken = document.cookie.split('; ').find(row => row.startsWith('refresh='));
    const tokenValue = refreshToken ? refreshToken.split('=')[1] : '';

    try {
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

export async function checkEmailDuplication(email: string): Promise<boolean> {
    try {
        const data = await apiRequest("/validate", "POST", {email});
        return data;
    } catch (error) {
        throw error;
        // TODO error enum
    }
}

export async function checkPhoneDuplication(phoneNum: string): Promise<boolean> {
    try {
        const data = await apiRequest("/phoneNum", "POST", {phoneNum});
        return data;
    } catch (error) {
        throw error;
        // TODO error enum
    }
}

