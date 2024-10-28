//src/service/product/wish.service.ts

import Cookies from "js-cookie";
import {WishCardModel, WishModel} from "@/model/product/wish.model";
import {wishAPI} from "@/api/product/wish.api";
import {fetchImageOne} from "@/service/ftp/image.service";
import {defaultImage, ImageModel, ImageType} from "@/model/ftp/image.model";
import {getColorsArray} from "@/utils/productUtils";
import {fetchProduct} from "@/service/product/product.service";

const getUserToken = () => {
    return Cookies.get("userToken");
}

export const fetchWishesWithImages = async (): Promise<WishCardModel[]> => {
    try {
        const wishes = await fetchWishes();

        return await Promise.all(wishes.map(async (wish) => {
            const image:ImageModel = await fetchImageOne(ImageType.PRODUCT, String(wish.product.id)) || defaultImage;
            const products = await fetchProduct(wish.product.id);
            const colors = getColorsArray(products);

                return {
                    wish,
                    image,
                    colors,
                }
            })
        );

    } catch (error) {
        console.error("", error);
        throw new Error("");
    }
};

export const fetchWishes = async (): Promise<WishModel[]> => {

    const userToken = getUserToken();

    if (!userToken) {
        return [];
    }

    const options = {
        userToken: userToken,
    };

    try {
        return await wishAPI.findByUser(options);
    } catch (error) {
        console.error('fetchWishes 에러 발생', error);
        throw new Error();
        // TODO error enum
    }
}

export const fetchToggleWish = async (productId: number): Promise<boolean> => {
    const options = {
        userToken: getUserToken(),
        params: {
            productId,
        },
    };

    try {
        return await wishAPI.toggleWish(options);
    } catch (error) {
        console.error('fetchToggleWish 에러 발생', error);
        throw new Error();
        // TODO error enum
    }
}

export const fetchDeleteWish = async (id: number): Promise<boolean> => {
    const options = {
        userToken: getUserToken(),
        params: {
            id,
        },
    };

    try {
        return await wishAPI.deleteWish(options);
    } catch (error) {
        console.error('fetchDeleteWish 에러 발생', error);
        throw new Error();
        // TODO error enum
    }
}