import Cookies from "js-cookie";
import {RequestOptions} from "@/model/api/RequestOptions";
import {productAPI} from "@/api/product/product.api";
import {awardAPI} from "@/api/auction/award.api";
import {ProductDictionary} from "@/model/product/product.model";
import {AwardModel} from "@/model/auction/award.model"
import {cookies} from "next/headers";

export async function fetchProductAndAwardDetails(productId: string, awardId: string) {
    const cookieStore = cookies();
    const cookie = cookieStore.get("userToken");

    if (!cookie) {
        throw new Error("cookie");
    }


    const commonOptions = {
        userToken: localStorage.getItem("userToken")!,
    };
    const productOptions: RequestOptions<null> = {
        params: {
            id: productId,
        }
    }
    const awardOptions: RequestOptions<null> = {
        ...commonOptions,
        params: {
            awardId: awardId,
        }
    }

    try {
        const [productDict, award]: [ProductDictionary, AwardModel] = await Promise.all([
            productAPI.findOneById(productOptions),
            awardAPI.findById(awardOptions)

        ]);

        const product = Object.values(productDict)[0];

        return {product, award};

    } catch (error) {
        console.log("fetchProductAndAwardDetails 호출 중 오류 발생",error);
        throw error;
    }

}