// src/model/user/address.model.ts
export interface AddressModel {

    id: string;
    userId: string;
    streetAddress: string;
    detailAddress: string;

    zipcode: string;
    type: string;

    pick: boolean;
    email: string;
}

// 주소 초기값 설정
export const initialAddress: AddressModel = {
    id: "",
    userId: "",

    streetAddress: "",
    detailAddress: "",
    zipcode: '',
    type: '',
    pick: false,
    email: "",
};