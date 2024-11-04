import {productAPI} from "@/api/product/product.api";
import {
    ColorType,
    ProductCardModel, ProductDetails,
    ProductDictionary,
    ProductModel,
    ProductWithImageModel,
    SearchFilter
} from "@/model/product/product.model";
import {setLoading} from "@/lib/features/products.slice";
import {fetchAllProductImage, fetchImageOne} from "@/service/ftp/image.service";
import {defaultImage, ImageType} from "@/model/ftp/image.model";
import {SizeModel} from "@/model/product/size.model";
import {getColorsArray} from "@/utils/productUtils";
import {ApiErrors, handleApiError, handleApiErrorResponse, isApiError} from "@/utils/error/error";

export async function fetchAllProductCards(): Promise<ProductCardModel[]> {
    try {
        const products = await fetchAllProducts();
        const images = await fetchAllProductImage();

        if (!products) {
            console.error("products 값이 undefined");
            return [];
        }

        return await Promise.all(products.map(async (product) => {
            const productGroup = await fetchProduct(String(product.id));
            const colors = getColorsArray(productGroup);
            const productImages = images.find(image => (
                image.referencedId === product.id.toString() && image.type === ImageType.PRODUCT
            )) || defaultImage;

            return {
                product,
                image: productImages,
                colors,
                isLiked: false,
            };
        }));

    } catch (error) {
        if (isApiError(error)) {
            if (error.status === 404 || error.status === 504) {
                return [];
            } else {
                handleApiError(error.status);
                return [];
            }
        }
        return [];
    }

}

export async function fetchAllProductsWithImages(): Promise<ProductWithImageModel[]> {
    try {
        const products = await fetchAllProducts();
        const images = await fetchAllProductImage();

        if (!products) {
            console.error("products 값이 undefined");
            throw new Error("");
        }

        return products.map(product => {
            const productImages = images.find(image => (
                image.referencedId === product.id.toString() && image.type === ImageType.PRODUCT
            )) || defaultImage;

            return {
                product,
                image: productImages,
            };
        });

    } catch (error) {
        console.error("fetchAllProductsWithImages 중 오류 발생");
        throw new Error("")
    }
}

export async function fetchAllProducts() {
    try {

        return Object.values(await productAPI.findAll());

    } catch (error) {
        console.error("상품 데이터를 가져오는 데 오류가 발생했습니다:", error);
    }
}

export async function fetchProducts(searchFilter: SearchFilter) {
    try {
        const options = {
            params: {
                ...(searchFilter.brand && {brand: searchFilter.brand}),
                ...(searchFilter.category && {category: searchFilter.category}),
                ...(searchFilter.keyword && {keyword: searchFilter.keyword}),
                ...(searchFilter.color && {color: searchFilter.color}),
                ...(searchFilter.order && {order: searchFilter.order}),
            }
        }

        // API 호출
        return await productAPI.searchByFilter(options)
    } catch (error) {
        console.error("상품 데이터를 가져오는 데 오류가 발생했습니다:", error);
    } finally {
        setLoading(false); // 로딩 완료
    }
}

export async function fetchProductOne(productId: string): Promise<ProductModel> {

    try {
        const options = {
            params: {
                productId: Number(productId)
            }
        }

        const result = (await productAPI.findOneById(options))[String(productId)];

        if (result === undefined) {
            console.log("Product not found");
        } else {
            console.log("Product found: ", result);
        }

        return result;

    } catch (error) {
        console.error("fetchProductOne 에러 발생", error);
        throw new Error();
        // TODO error enum
    }
}

// 상품 (색상 포함) 들을 이미지와 함께 불러오는 함수
export async function fetchProductsWithImages(productId: string): Promise<ProductWithImageModel[]> {
    try {
        const products = await fetchProduct(productId);

        console.log("products", products);

        const images = await Promise.all(products.map((product) => {
            return fetchImageOne(ImageType.PRODUCT, String(product.id));
        }))

        return products.map(product => {
            const productImages = images.find(image => (
                image.referencedId === product.id.toString() && image.type === ImageType.PRODUCT
            )) || defaultImage;

            return {
                product,
                image: productImages,
            };
        });

    } catch (error) {
        console.error("fetchProductWithImages 중 오류 발생");
        throw new Error();
    }
}

export async function fetchProductWithImage(productId: string): Promise<Omit<ProductCardModel, "isLiked">> {
    try {
        const products = await fetchProduct(productId);
        const colors = getColorsArray(products);
        const product = await fetchProductOne(productId);
        const image = await fetchImageOne(ImageType.PRODUCT, productId);

        return {product, image, colors};
    } catch (error) {
        throw new Error("");
    }
}

// productId의 색상만 다른 product 들도 함께 불러오는 함수
export async function fetchProduct(productId: string): Promise<ProductModel[]> {
    try {
        const options = {
            params: {
                productId: Number(productId),
            }
        };

        const productDictArray: ProductDictionary[] = await productAPI.findById(options);
        if (productDictArray.length === 0) {
            return [];
        }

        return productDictArray.map((item) => Object.values(item)).flat();

    } catch (error) {
        console.error("fetchProduct 에러 발생", error);
        throw new Error("");
        // TODO error enum
    }
}

export async function fetchProductDetails(productId: string): Promise<ProductDetails> {
    try {
        const productWithImagesArray = await fetchProductsWithImages(productId);
        console.log("productWithImagesArray", productWithImagesArray);
        const product = productWithImagesArray.find((item) => String(item.product.id) === productId);
        if (product === undefined) {
            throw new Error(`해당 product를 찾을 수 없습니다. id: ${productId}`);
        }

        const colors = productWithImagesArray.map((item) => item.product.color);

        const size = product.product.sizes.map((size) => size.size);


        return {colors, product, size, productWithImagesArray};


    } catch (error) {
        if (isApiError(error)) {
            if (error.status === 404) {
                return {} as ProductDetails;
            } else {
                return {} as ProductDetails;
            }

        } else {
            console.error("정의되지 않은 에러", error)
            return {} as ProductDetails;
        }
    }
}


export async function fetchProductBySizeId(sizeId: number): Promise<SizeModel> {
    try {
        const options = {
            params: {
                sizeId: sizeId
            }
        };
        return await productAPI.findBySizeId(options);

    } catch (error) {
        console.error("fetchProduct 에러 발생", error);
        throw new Error("");
        // TODO error enum
    }
}

export async function fetchProductWithImageBySizeId(sizeId: number) {
    try {
        const sizeProduct = await fetchProductBySizeId(sizeId);
        const image = await fetchImageOne(ImageType.PRODUCT, String(sizeProduct.sizeProduct.id));

        return {
            product: sizeProduct.sizeProduct,
            image: image,
            size: sizeProduct.size,
        }

    } catch (error) {
        throw new Error("");
    }
}

