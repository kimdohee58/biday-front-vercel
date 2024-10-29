import {ColorType, ProductModel} from "@/model/product/product.model";
import {UserModel} from "@/model/user/user.model";
import {ImageModel} from "@/model/ftp/image.model";

export interface WishModel {
    id?: number;
    user: UserModel;
    product: ProductModel;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface WishCardModel {
    wish: WishModel;
    image: ImageModel;
    colors: ColorType[];
}

export const initialWishModel: WishModel = {
    id: 0,
    user: {} as UserModel,
    product: {} as ProductModel,
    status: false,
    createdAt: new Date(),
    updatedAt: new Date(),
};