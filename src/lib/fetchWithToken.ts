import {handleReissueToken} from "@/utils/reissue/reissueToken";
import {strategy} from "@/api/api.strategy";

const fetchWithToken = async (
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
    url: string,
    token: string,
    options: {params?: Record<string, string>, data?: any, headers?: Record<string, string>} = {}):Promise<any> => {

    // 로그인 전후 페치

    const headers = {
        ...options.headers,
        ...(token ? {'Authorization': `Bearer ${token}`} : {}),
    };

    try {
        const response = await strategy[method](url, options.data, options.params, headers);

        if (response.status === 401) {
            await handleReissueToken();
            return fetchWithToken(method, url, token, options);
        }

        return response;

    } catch (error) {
        throw new Error("API 요청 중 오류 발생");
    }

};

export default fetchWithToken;