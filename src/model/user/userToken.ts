/*
export enum Role {
    ADMIN = "ROLE_ADMIN",
    USER = "ROLE_USER",
    SELLER = "ROLE_SELLER",
}

const userRole: Role = Role.USER;

if (userRole === Role.ADMIN) {
    console.log("관리자")
}else if (userRole === Role.USER) {
    console.log("일반 유저")
}else{
    console.log("판매자")
}*/

import {UserRole} from "@/model/user/user.model";

export interface UserToken {
    userId: string;
    userName: string;
    userRole: UserRole;
}


export const initialUserToken : UserToken = {
    userId: '',
    userName: '',
    userRole: {} as UserRole
}