import {Alert} from "@/shared/Alert/Alert";

export const ApiErrors = {
    UNAUTHORIZED: { message: "UNAUTHORIZED", status: 401 },
    FORBIDDEN: { message: "FORBIDDEN", status: 403 },
    NOT_FOUND: { message: "NOT_FOUND", status: 404 },
    CONFLICT: { message: "CONFLICT", status: 409 },
    NETWORK_ERROR: { message: "NETWORK_ERROR", status: 408 },
    BAD_REQUEST: { message: "BAD_REQUEST", status: 400 },
    INTERNAL_SERVER_ERROR: { message: "INTERNAL_SERVER_ERROR", status: 500 },
    SERVICE_UNAVAILABLE: { message: "SERVICE_UNAVAILABLE", status: 503 },
    GATEWAY_TIMEOUT: { message: "GATEWAY_TIMEOUT", status: 504 },
    NETWORK_AUTHENTICATION_REQUIRED: { message: "NETWORK_AUTHENTICATION_REQUIRED", status: 511 },
    UNKNOWN: { message: "UNKNOWN", status: 0 },
};

export type ApiError = typeof ApiErrors[keyof typeof ApiErrors];

export const handleApiErrorResponse = (status: number) => {
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

export const handleApiError = (error: any, showAlert = true) => {
    const status = error?.status || ApiErrors.UNKNOWN.status;
    const errorInfo: ApiError = Object.values(ApiErrors).find(err => err.status === status) || ApiErrors.UNKNOWN;

    console.error(`[Error ${status}]: ${errorInfo.message}`);

    if (showAlert && typeof window !== "undefined") {
        alert(errorInfo.message || "알 수 없는 오류 발생");
    }

};

export const isApiError = (error: any): error is ApiError => {
    return error && typeof error.status === 'number';
}
