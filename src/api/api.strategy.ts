import { fetchAPI } from './fetch';
import {handleReissueToken} from "@/utils/reissue/reissueToken";
import {ApiError} from "@/utils/error";
import {RequestOptions} from "@/model/api/RequestOptions";

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | "PATCH" ;

const apiRequest = async (url: string, method: HttpMethod, {params, data, headers, token, userToken, contentType}: RequestOptions<any>) => {
    console.log("strategy 진입");

    const queryString = params ? `?${new URLSearchParams(params)}` : '';

    const options: RequestInit = {
        method: method,
        headers: {
            'Content-Type': contentType || 'application/json',
            ...(token && {'Authorization': `Bearer ${token}`}),
            ...(userToken && {'UserInfo': userToken}),
            ...(headers || {}),

        },
        ...(data && {body: JSON.stringify(data)}),
    };

    console.log("options", options);

    let response = await fetchAPI(`${url}${queryString}`, options);

    if (response.status === 404) {
        throw new Error(ApiError.NOT_FOUND);
    }

    if (token && response.status === 401) {
        console.log("리이슈");
        const newToken = await handleReissueToken();
        options.headers = {
            ...options.headers,
            'Authorization': `Bearer ${newToken}`
        };

        response = await fetchAPI(`${url}${queryString}`, options);
    }

    return response.json();

};

export const strategy = {
    GET: (url: string, options: RequestOptions<any>) => apiRequest(url, 'GET', options),
    POST: (url: string, options: RequestOptions<any>) => apiRequest(url, 'POST', options),
    PUT: (url: string, options: RequestOptions<any>) => apiRequest(url, 'PUT', options),
    DELETE: (url: string, options: RequestOptions<any>) => apiRequest(url, 'DELETE', options),
    PATCH: (url: string, options: RequestOptions<any>) => apiRequest(url, 'PATCH', options),
};


