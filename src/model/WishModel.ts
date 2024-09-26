import {UserModel} from "@/model/UserModel";

export interface WishModel {
    id?: number;
    user: UserModel;
    product: ProductModel;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}