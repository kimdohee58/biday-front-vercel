//src/model/UserModel.ts
export interface UserModel {
    id?: number;
    oauthName?: string;
    name?: string;  // Optional로 변경
    email: string;
    password: string;
    phoneNum?: string;  // Optional로 변경
    zipcode?: string;  // Optional로 변경
    streetAddress?: string;  // Optional로 변경
    detailAddress?: string;  // Optional로 변경
    addressType?: string;  // Optional로 변경
    createdAt?: Date;
    updatedAt?: Date;
    status?: string;
    totalRating?: number;
}
// 데이터 타입 쓰잖아. 이걸 불러올 때 API

//DTo를 위에 만들었으니 엔티티 같은 역할이 필요하다.
export const initialUser: UserModel={
    id:0,
    oauthName:'',
    name:'',
    email:'',
    password:'',
    phoneNum:'',
    zipcode:'',
    streetAddress:'',
    detailAddress:'',
    addressType:'',
    createdAt:new Date,
    updatedAt:new Date,
    status:'',
    totalRating:0
}

