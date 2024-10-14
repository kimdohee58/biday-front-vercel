//src/model/api/RequestOption.ts
export interface RequestOptions<K extends Record<string, any>, T> {
    params?: K;
    data?: T; // 데이터가 바디 타입임.
    headers?: Record<string, string>;
    token?: string;
    cache?: CacheOption | CacheRevalidateOptions;
    userToken?: string;
    contentType?: string;
}

export enum CacheOption {
    NOSTORE = "no-store",
    FORCECACHE = "force-cache",
    REVAILDATE = "revalidate",
    ONDEMAND = "tags",
}

export interface CacheRevalidateOptions {
    revalidate?: number;
    tags?: string[];
}