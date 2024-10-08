import { fetchAPI } from './fetch';
import {handleReissueToken} from "@/utils/reissue/reissueToken";
import {ApiError} from "@/utils/error";

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | "PATCH" ;

interface RequestOptions {
    method: HttpMethod;
    params?: Record<string, string>;
    data?: any;
    headers?: Record<string, string>;
    token?: string;
}

const createQueryString = (params?: Record<string, string>) =>
    params ? `?${new URLSearchParams(params)}` : '';

const apiRequest = async (url: string, {method, params, data, headers, token}: RequestOptions) => {
    console.log("strategy 진입");

    console.log("url", url);
    console.log("method", method);
    console.log("params", params);
    console.log("data", data);
    console.log("headers", headers);
    console.log("token", token);

    const queryString = createQueryString(params);

    const options: RequestInit = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            ...(token && {'Authorization': `Bearer ${token}`}),
            ...(typeof headers === "object" ? headers : {}),

        },
        ...(data && typeof data === "object" ? {body: JSON.stringify(data)} : {}),
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

    const data1 = await response.json();
    console.log("strategy에서 받은 data1", data1);

    return data1;

};

export const strategy = {

    GET: (url: string, params?: Record<string, string>, headers?: Record<string, string>, token?: string) =>
        apiRequest(url, {method: 'GET', ...(params && {params}), ...(headers && {headers}), ...(token && {token})}),
    POST: (url: string, data: any, params?: Record<string, string>, headers?: Record<string, string>, token?: string) =>
        apiRequest(url, {
            method: 'POST',
            data, ...(params && {params}), ...(headers && {headers}), ...(token && {token})
        }),
    PUT: (url: string, data: any, headers?: Record<string, string>, token?: string) =>
        apiRequest(url, {method: 'PUT', data, ...(headers && {headers}), ...(token && {token})}),
    DELETE: (url: string, headers?: Record<string, string>, token?: string) =>
        apiRequest(url, {method: 'DELETE', ...(headers && {headers}), ...(token && {token})}),
    PATCH: (url: string, data: any, headers?: Record<string, string>, token?: string) =>
        apiRequest(url, {method: 'PATCH', data, ...(headers && {headers}), ...(token && {token})}),
};


