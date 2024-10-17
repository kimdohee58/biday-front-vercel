//src/model/user.model.ts
export interface UserModel {
    id?: string;
    oauthName?: string;
    name?: string;
    email?: string;
    password?: string;
    phoneNum?: string;
    createdAt?: Date;
    updatedAt?: Date;
    status?: string;
    totalRating?: number;
    newPassword?:string;
    role?: UserRole
    phone?:string
}


// initialUser 설정
export const initialUser: UserModel = {
    id: '',
    oauthName: '',
    name: '',
    email: '',
    password: '',
    phoneNum: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    status: '',
    totalRating: 0,
    newPassword:"",
    role: {} as UserRole, // 기본값 설정 (필요 시)
    phone:"",
};

export enum UserRole {
    ADMIN = "ROLE_ADMIN",
    USER = "ROLE_USER",
    SELLER = "ROLE_SELLER",
}