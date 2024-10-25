import {ProductCardModel, ProductWithImageModel} from "@/model/product/product.model";
import {fetchImageOne} from "@/service/ftp/image.service";
import {defaultImage, ImageModel, ImageType} from "@/model/ftp/image.model";
import {fetchProduct} from "@/service/product/product.service";
import {fetchWishes} from "@/service/product/wish.service";
import {getColorsArray} from "@/utils/productUtils";

export async function productTest(productId: number): Promise<ProductCardModel[]> {
    try {

        const products = await fetchProduct(productId);

        console.log("products", products);

        const wishes = await fetchWishes();
        const wishProductIds = wishes.map((item) => item.product.id);

        const images: ImageModel[] = await Promise.all(products.map((product) => {
            return fetchImageOne(ImageType.PRODUCT, String(product.id));
        }))

        const colors = getColorsArray(products);

        return products.map(product => {
            const productImages = images.find(image => (
                image.referencedId === product.id.toString() && image.type === ImageType.PRODUCT
            )) || defaultImage;

            const isLiked = wishProductIds.includes(product.id);

            return {
                product,
                image: productImages,
                isLiked,
                colors,
            };
        });

    } catch (error) {
        console.error("fetchProductWithImages 중 오류 발생");
        throw new Error();
    }
}
