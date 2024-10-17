
//src/model/user.model.ts
import {AddressModel} from "@/model/user/address.model";

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

export interface UserSlice {
    id: string;
    oauthName?: string;
    name: string;
    email: string;
    phoneNum: string;
    createdAt: Date;
    updatedAt: Date;
    status: string;
    totalRating?: number;
    role: UserRole
    addresses: AddressModel[];
}


// initialUser 설정
export const initialUser: UserSlice = {
    id: '',
    oauthName: '',
    name: '',
    email: '',
    phoneNum: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    status: '',
    totalRating: 0,
    addresses: [],
    role: {} as UserRole, // 기본값 설정 (필요 시)
};

export enum UserRole {
    ADMIN = "ROLE_ADMIN",
    USER = "ROLE_USER",
    SELLER = "ROLE_SELLER",
}