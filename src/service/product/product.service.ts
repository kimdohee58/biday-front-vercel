import {productAPI} from "@/api/product/product.api";
import {
    ProductCardModel,
    ProductDictionary,
    ProductModel,
    ProductWithImageModel,
    SearchFilter
} from "@/model/product/product.model";
import {AuctionModel} from "@/model/auction/auction.model";
import {fetchAuctionsBySize} from "@/service/auction/auction.service";
import {setLoading} from "@/lib/features/products.slice";
import {fetchAllProductImage, fetchImageOne} from "@/service/ftp/image.service";
import {defaultImage, ImageType} from "@/model/ftp/image.model";
import {SizeModel} from "@/model/product/size.model";
import {getColorsArray, getColorsByTypes} from "@/utils/productUtils";

export async function fetchAllProductCards(): Promise<ProductCardModel[]> {
    try {
        const products = await fetchAllProducts();
        const images = await fetchAllProductImage();

        if (!products) {
            console.error("products 값이 undefined");
            throw new Error("");
            // TODO error enum
        }

        return await Promise.all(products.map(async (product) => {
            const productGroup = await fetchProduct(product.id);
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
        console.error("fetchAllProductCards 중 오류 발생", error);
        throw new Error("");
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
export async function fetchProductWithImages(productId: number): Promise<ProductWithImageModel[]> {
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

// productId의 색상만 다른 product 들도 함께 불러오는 함수
export async function fetchProduct(productId: number): Promise<ProductModel[]> {
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

export async function fetchProductDetails(id: number): Promise<{
    colorIds: number[],
    product: ProductWithImageModel,
    size: string[],
    auctions: AuctionModel[]
    productWithImagesArray: ProductWithImageModel[];
}> {
    try {
        console.log("fetchProductDetails 진입");

        const options = {
            params: {
                productId: id,
            }
        };

        const productWithImagesArray = await fetchProductWithImages(id);
        const product = productWithImagesArray.find((item) => item.product.id === id);
        if (product === undefined) {
            throw new Error(`해당 product를 찾을 수 없습니다. id: ${id}`);
        }
        const colorIds = productWithImagesArray.map((item) => item.product.id);
        const sizes = product.product.sizes.map((size) => size.id);

        const auctionArray = await Promise.all(sizes.map((size) => {
            return fetchAuctionsBySize(size);
        }));
        const auctions = auctionArray.flat(Infinity).filter((auction) => auction !== undefined) as unknown as AuctionModel[];
        const size = product.product.sizes.map((size) => size.size);

        console.log("auctions", auctions);

        return {colorIds, product, size, auctions, productWithImagesArray};


    } catch (error) {
        console.error("fetchProductDetail", error);
        throw new Error("fetchProductError");
        // TODO error enum
    }
}


export async function fetchProductBySizeId(sizeId: number): Promise<SizeModel> {
    try {
        const options = {
            params: {
                sizeId: sizeId
            }
        };
        console.log("패치프로덕트바이사이즈아이디 : ", sizeId)
        return await productAPI.findBySizeId(options);

    } catch (error) {
        console.error("fetchProduct 에러 발생", error);
        throw new Error("");
        // TODO error enum
    }
}

