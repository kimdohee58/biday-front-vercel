// src/model/store.model.ts

import {AddressModel} from "@/model/user/address.model";
import {UserRole} from "@/model/user/user.model";

export interface ReduxUserAddress {
    id:string;
    oauthName?: string;
    name: string;
    email: string;
    phoneNum: string;
    createdAt: Date;
    updatedAt: Date;
    status: string;
    totalRating?: number;
    role: UserRole;
    addresses: AddressModel[];
}

// 초기 상태
export const initialUser: ReduxUserAddress = {
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
    role: {} as UserRole,
};