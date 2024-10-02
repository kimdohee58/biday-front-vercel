export interface UserModel {
    id?: number;
    oauthName?: string;
    name: string;
    email: string;
    password: string;
    phoneNum: string;
    createdAt: Date;
    updatedAt: Date;
    role: string;
    status: string;
    totalRating: number;

    zipcode: string;
    streetAddress: string;
    detailAddress: string;
    type: string;
}

export const initialUser: UserModel = {
    // 타입만 제공하는 클래스와 달리 인스턴스는 메모리 공간까지 제공
    id: 0,
    oauthName: "",
    name: "",
    email: "",
    password: "",
    phoneNum: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    role: "",
    status: "",
    totalRating: 0,

    zipcode: "",
    streetAddress: "",
    detailAddress: "",
    type: "",
}