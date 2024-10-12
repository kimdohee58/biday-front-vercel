import {productAPI} from "@/api/product/product.api";

export async function fetchProductOne(productId: string) {
    try {
        const options = {
            params: {
                id: productId
            }
        }

        return (await productAPI.findOneById(options))[String(productId)];


    } catch (error) {
        console.error("fetchProductOne 에러 발생",error);
    }
}