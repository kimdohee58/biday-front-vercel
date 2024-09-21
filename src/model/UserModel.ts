interface UserModel {
    id?: number;
    oauthName?: string;
    name: string;
    email: string;
    password: string;
    phoneNum: string;
    createdAt: Date;
    updatedAt: Date;
    role: Role;
    status: string;
    totalRating: number;

    zipcode: string;
    streetAddress: string;
    detailAddress: string;
    type: string;
}