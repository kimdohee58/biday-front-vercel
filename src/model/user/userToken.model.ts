export interface UserToken {
    userId: string;
    userName: string;
    userRole: UserRole;
}

enum UserRole {
    ADMIN = "ROLE_ADMIN",
    USER = "ROLE_USER",
    SELLER = "ROLE_SELLER",
}