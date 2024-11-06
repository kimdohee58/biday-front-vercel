//src/api/api.strategy.ts
import {fetchAPI} from './fetch';
import {RequestOptions} from "@/model/api/RequestOptions";
import {HTTPRequest} from "@/utils/headers";
import {ApiErrors, isApiError} from "@/utils/error/error";

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | "PATCH" ;

const apiRequest = async (url: string, method: HttpMethod, {params, data, headers, token, userToken, contentType, cache}: RequestOptions<any,any>) => {
    const controller = new AbortController();
    const timeout = 9000;
    const id = setTimeout(() => controller.abort, timeout);

    if (userToken) {
        console.log("token", HTTPRequest(userToken));
    }

    const handleApiErrorResponse = (status: number) => {
        switch (status) {
            case 404:
                throw ApiErrors.NOT_FOUND;
            case 401:
                throw ApiErrors.UNAUTHORIZED;
            case 403:
                throw ApiErrors.FORBIDDEN;
            case 409:
                throw ApiErrors.CONFLICT;
            case 500:
                throw ApiErrors.INTERNAL_SERVER_ERROR;
            case 503:
                throw ApiErrors.SERVICE_UNAVAILABLE;
            case 504:
                throw ApiErrors.GATEWAY_TIMEOUT;
            default:
                throw ApiErrors.UNKNOWN;
        }
    };

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
        // signal: controller.signal,
    };

    try {
        let response = await fetchAPI(`${url}${queryString}`, options);
        clearTimeout(id);

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
        // clearTimeout(id);

        if (error instanceof Error) {
            if (error.name === 'AbortError') {
                console.error("응답 시간 만료");
                handleApiErrorResponse(504);
            } else {
                throw new Error("상태가 정의되지 않은 에러 발생");
            }
        } else {
            if (isApiError(error)) {
                handleApiErrorResponse(error.status);
            }
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