
//src/model/user/user.model.ts

/**
 * TODO UserModel 자체를 Optional 로 만들지 말고, 로그인에서만 Optional 사용해서 UserModel 사용하세요
 */

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
};

export enum UserRole {
    ADMIN = "ROLE_ADMIN",
    USER = "ROLE_USER",
    SELLER = "ROLE_SELLER",
}