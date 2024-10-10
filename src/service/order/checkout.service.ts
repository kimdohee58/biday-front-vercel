import Cookies from "js-cookie";
import {RequestOptions} from "@/model/api/RequestOptions";
import {productAPI} from "@/api/product/product.api";
import {awardAPI} from "@/api/auction/award.api";
import {ProductDictionary} from "@/model/product/product.model";
import {AwardModel} from "@/model/auction/award.model"

export async function fetchProductAndAwardDetails(productId: string, awardId: string) {
    const userToken = Cookies.get("userToken")!!;
    const token = Cookies.get("token")!!;

    const commonOptions = {
        // token: "eyJhbGciOiJIUzUxMiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsImlkIjoiNjcwMGUxOTY4NmQxY2U2Y2QxZmM2ZjI1Iiwicm9sZSI6IlJPTEVfU0VMTEVSIiwibmFtZSI6IuyEpOycoOyglSIsImlhdCI6MTcyODUyODE1NywiZXhwIjoxNzI4NTI4NzU3fQ.R11WV4lb7kbjNHcs4Hvj1rjaBD2jeveheghOCa8Q3xU8D9HqClZtixpVYV-ss6od3dXAC9fgBmcpx23c5_pP1Q",
        userToken: "{\"userId\":\"6700e19686d1ce6cd1fc6f25\",\"userName\":\"shull\",\"userRole\":\"ROLE_USER\"}"
    }
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