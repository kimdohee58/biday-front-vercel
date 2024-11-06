
export const ApiErrors = {
    UNAUTHORIZED: {message: 'UNAUTHORIZED', status: 401},
    FORBIDDEN: {message: 'FORBIDDEN', status: 403},
    NOT_FOUND: {message: 'NOT_FOUND', status: 404},
    CONFLICT: {message: 'CONFLICT', status: 409},
    NETWORK_ERROR: {message: 'NETWORK_ERROR', status: 408},
    BAD_REQUEST: {message: 'BAD_REQUEST', status: 400},
    INTERNAL_SERVER_ERROR: {message: 'INTERNAL_SERVER_ERROR', status: 500},
    SERVICE_UNAVAILABLE: {message: 'SERVICE_UNAVAILABLE', status: 503},
    GATEWAY_TIMEOUT: {message: 'GATEWAY_TIMEOUT', status: 504},
    NETWORK_AUTHENTICATION_REQUIRED: {message: 'NETWORK_AUTHENTICATION_REQUIRED', status: 511},
    UNKNOWN: {message: 'UNKNOWN', status: 0},
};

export const PaymentErrors = {
    INVALID_REQUEST: {
        status: 400,
        code: 'INVALID_REQUEST',
        message: '잘못된 요청입니다.',
    },
    INVALID_DATA_REQUEST: {
        status: 400,
        code: 'INVALID_DATA_REQUEST',
        message: '일치하지 않는 정보입니다.',
    },
    CONFLICT: {
        status: 409,
        code: 'CONFLICT',
        message: '이미 결제 정보가 존재하는 낙찰입니다.',
    },
};

export type ApiError = (typeof ApiErrors)[keyof typeof ApiErrors];
export type PaymentError = (typeof PaymentErrors)[keyof typeof PaymentErrors];

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

export const handlePaymentErrorResponse = (status: number) => {
    switch (status) {
        case 400:
            throw PaymentErrors.INVALID_DATA_REQUEST;
        case 409:
            throw PaymentErrors.CONFLICT;
        default:
            throw PaymentErrors.INVALID_REQUEST;
    }
};

export const handleApiError = (error: any, showAlert = true) => {
    const status = error?.status || ApiErrors.UNKNOWN.status;
    const errorInfo: ApiError =
        Object.values(ApiErrors).find((err) => err.status === status) || ApiErrors.UNKNOWN;

    console.error(`[Error ${status}]: ${errorInfo.message}`);

    if (showAlert && typeof window !== 'undefined') {
        alert(errorInfo.message || '알 수 없는 오류 발생');
    }
};

export const handlePaymentError = (error: any) => {
    const status = error.status;
};

export const isApiError = (error: any): error is ApiError => {
    return error && typeof error.status === 'number';
};

export const isPaymentError = (error: any): error is PaymentError => {
    return error && typeof error.status === 'number';
};
