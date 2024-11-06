//src/api/api.strategy.ts
import { fetchAPI } from './fetch';
import {handleReissueToken} from "@/utils/reissue/reissueToken";
import {RequestOptions} from "@/model/api/RequestOptions";
import {HTTPRequest} from "@/utils/headers";
import {
    ApiErrors,
    handleApiErrorResponse,
    handlePaymentErrorResponse,
    isApiError,
    isPaymentError
} from "@/utils/error/error";

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | "PATCH" ;

const apiRequest = async (url: string, method: HttpMethod, {params, data, headers, token, userToken, contentType, cache}: RequestOptions<any,any>) => {

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

    try {
        let response = await fetchAPI(`${url}${queryString}`, options);

        if (!response.ok) {
            const data = await response.json();
            throw {
                status: response.status,
                code: response.statusText,
                message: data.message || '정의되지 않은 에러 발생',
            };
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
        if (isPaymentError(error)) {
            handlePaymentErrorResponse(error.status);
        } else if (isApiError(error)) {
            handleApiErrorResponse(error.status);
        } else {
            throw new Error("정의되지 않은 에러 발생");
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