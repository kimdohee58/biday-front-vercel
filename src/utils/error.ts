export enum ApiError {
    UNAUTHORIZED = "Unauthorized",
    FORBIDDEN = "Forbidden",
    NOT_FOUND = "Not Found",
    INTERNAL_SERVER_ERROR = "Internal Server Error",
    NETWORK_ERROR = "Network Error",
}

export class ApiException extends Error {
    constructor(message: string, public status: number) {
        super(message);
    }
}