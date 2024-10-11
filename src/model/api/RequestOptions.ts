export interface RequestOptions<T> {
    params?: Record<string, string>;
    data?: T;
    headers?: Record<string, string>;
    token?: string;
    userToken?: string;
    contentType?: string;
}