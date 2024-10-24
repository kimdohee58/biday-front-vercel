//src/api/api.strategy.ts
import { fetchAPI } from './fetch';
import {handleReissueToken} from "@/utils/reissue/reissueToken";
import {ApiError} from "@/utils/error";
import {RequestOptions} from "@/model/api/RequestOptions";
import {HTTPRequest} from "@/utils/headers";

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | "PATCH" ;

const apiRequest = async (url: string, method: HttpMethod, {params, data, headers, token, userToken, contentType, cache}: RequestOptions<any,any>) => {
    console.log("strategy 진입");

    if (userToken) {
        console.log("token", HTTPRequest(userToken));
    }

    const queryString = params ? `?${new URLSearchParams(params)}` : '';

    const options: RequestInit = {
        method: method,
        headers: {
            ...(contentType !== "multipart/form-data" && {'Content-Type': contentType || 'application/json'}),
            ...(token && {'Authorization': `Bearer ${token}`}),
            ...(userToken && {'UserInfo': HTTPRequest(userToken)}),
            ...(headers || {}),
        },
        ...(cache && {cache: {cache}}),
        ...(data && !contentType && {body: JSON.stringify(data)}),
        ...(data && contentType === "multipart/form-data" && {body: data}),

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
    const responseType = response.headers.get("Content-Type");

    const contentLength = response.headers.get("Content-Length");
    if (contentLength === '0') {
        return {};
    }
    if (responseType && responseType.includes("application/json")) {
        return response.json();
    } else {
        return response.text();
    }
};

export const strategy = {
    GET: (url: string, options: RequestOptions<any, any>) => apiRequest(url, 'GET', options),
    POST: (url: string, options: RequestOptions<any, any>) => apiRequest(url, 'POST', options),
    PUT: (url: string, options: RequestOptions<any, any>) => apiRequest(url, 'PUT', options),
    DELETE: (url: string, options: RequestOptions<any, any>) => apiRequest(url, 'DELETE', options),
    PATCH: (url: string, options: RequestOptions<any, any>) => apiRequest(url, 'PATCH', options),
};