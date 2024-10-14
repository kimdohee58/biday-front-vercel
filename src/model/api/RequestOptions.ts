export interface RequestOptions<K extends Record<string, any>, T> {
    params?: K;
    data?: T;
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