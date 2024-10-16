import Cookies from "js-cookie";
import {RequestOptions} from "@/model/api/RequestOptions";
import {productAPI} from "@/api/product/product.api";
import {awardAPI} from "@/api/auction/award.api";
import {ProductDictionary, ProductModel} from "@/model/product/product.model";
import {AwardModel} from "@/model/auction/award.model"
import {fetchProductOne} from "@/service/product/product.service";
import {fetchAwardOne} from "@/service/auction/award.service";

export async function fetchProductAndAwardDetails(productId: string, awardId: string) {

    try {
        const [product, award]: [ProductModel, AwardModel] = await Promise.all([
            fetchProductOne(productId),
            fetchAwardOne(Number(awardId))
        ]);

        return {product, award};

    } catch (error) {
        console.log("fetchProductAndAwardDetails 호출 중 오류 발생",error);
        throw error;
    }

}