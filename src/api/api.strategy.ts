//src/api/api.strategy.ts
import { fetchAPI } from './fetch';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | "PATCH" ;

interface RequestOptions {
    method: HttpMethod;
    params?: Record<string, string>;
    data?: any;
    headers?: Record<string, string>;
}

const createQueryString = (params?: Record<string, string>) =>
    params ? `?${new URLSearchParams(params)}` : '';

const apiRequest = async (url: string, { method, params, data, headers }: RequestOptions) => {
    const queryString = createQueryString(params);
    const options: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...(headers || {}),
        },
        ...(data && { body: JSON.stringify(data) }),
    };

    const response = await fetchAPI(`${url}${queryString}`, options);
    return response.json();
};

export const strategy = {
    GET: (url: string, params?: Record<string, string>, headers?: Record<string, string>) =>
        apiRequest(url, { method: 'GET', params, ...(headers && { headers }) }),
    POST: (url: string, data: any, params?: Record<string, string>, headers?: Record<string, string>) =>
        apiRequest(url, { method: 'POST', data, params, ...(headers && { headers }) }),
    PUT: (url: string, data: any, headers?: Record<string, string>) =>
        apiRequest(url, { method: 'PUT', data, ...(headers && { headers }) }),
    DELETE: (url: string, headers?: Record<string, string>) =>
        apiRequest(url, { method: 'DELETE', ...(headers && { headers }) }),
    PATCH: (url: string, data: any, headers?: Record<string, string>) =>
        apiRequest(url, { method: 'PATCH', data, ...(headers && { headers }) })
};

