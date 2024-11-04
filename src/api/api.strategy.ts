//src/api/api.strategy.ts
import { fetchAPI } from './fetch';
import {handleReissueToken} from "@/utils/reissue/reissueToken";
import {RequestOptions} from "@/model/api/RequestOptions";
import {HTTPRequest} from "@/utils/headers";
import {ApiErrors, handleApiErrorResponse} from "@/utils/error/error";

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | "PATCH" ;

const apiRequest = async (url: string, method: HttpMethod, {params, data, headers, token, userToken, contentType, cache}: RequestOptions<any,any>) => {
    const controller = new AbortController();
    const timeout = 9000;
    const id = setTimeout(() => controller.abort, timeout);

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
        signal: controller.signal,
    };

    try {
        let response = await fetchAPI(`${url}${queryString}`, options);
        clearTimeout(id);

        if (!response.ok) {
            return handleApiErrorResponse(response.status);
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
    } catch (error) {
        clearTimeout(id);

        if (error instanceof Error) {
            if (error.name === 'AbortError') {
                console.error("응답 시간 만료");
                handleApiErrorResponse(504);
            } else {
                throw new Error("상태가 정의되지 않은 에러 발생");
            }
        } else {
            console.error("알 수 없는 에러", error);
        }
    }


};

export const strategy = {
    GET: (url: string, options: RequestOptions<any, any>) => apiRequest(url, 'GET', options),
    POST: (url: string, options: RequestOptions<any, any>) => apiRequest(url, 'POST', options),
    PUT: (url: string, options: RequestOptions<any, any>) => apiRequest(url, 'PUT', options),
    DELETE: (url: string, options: RequestOptions<any, any>) => apiRequest(url, 'DELETE', options),
    PATCH: (url: string, options: RequestOptions<any, any>) => apiRequest(url, 'PATCH', options),
};