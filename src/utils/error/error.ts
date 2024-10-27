import {ApiErrorType} from "@/model/error/error.model";

export const ApiErrorMessages: Record<ApiErrorType, {message : string; statusCode: number}> = {
    [ApiErrorType.UNAUTHORIZED]: { message: "", statusCode: 401},
    [ApiErrorType.FORBIDDEN]: { message: "", statusCode: 403},
    [ApiErrorType.NOT_FOUND]: { message: "", statusCode: 404},
    [ApiErrorType.CONFLICT]: { message: "", statusCode: 409},
    [ApiErrorType.BAD_REQUEST]: { message: "", statusCode: 400},
    [ApiErrorType.INTERNAL_SERVER_ERROR]: { message: "", statusCode: 500},
    [ApiErrorType.SERVICE_UNAVAILABLE]: { message: "", statusCode: 503},
    [ApiErrorType.GATEWAY_TIMEOUT]: { message: "", statusCode: 504},
    [ApiErrorType.NETWORK_AUTHENTICATION_REQUIRED]: { message: "", statusCode: 511},
    [ApiErrorType.UNKNOWN]: { message: "", statusCode: 0}
}