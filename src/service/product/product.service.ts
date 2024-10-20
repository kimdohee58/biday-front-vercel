import {productAPI} from "@/api/product/product.api";
import {ProductDictionary, ProductModel, SearchFilter} from "@/model/product/product.model";
import {AuctionModel} from "@/model/auction/auction.model";
import {fetchAuctionsBySize} from "@/service/auction/auction.service";
import {setLoading} from "@/lib/features/products.slice";
import {fetchAllProductImage} from "@/service/ftp/image.service";
import {ImageType} from "@/model/ftp/image.model";

export async function fetchAllProductsWithImages() {
    try {
        const products = await fetchAllProducts();
        const images = await fetchAllProductImage();

        if (!products) {
            console.error("products 값이 undefined");
            throw new Error("");
        }

        const productsWithImages = products.map(product => {
            const productImages = images.filter(image => (
                image.referencedId === product.id.toString() && image.type === ImageType.PRODUCT
            ));

            return {
                ...product,
                images: productImages,
            };
        });

        return productsWithImages;

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

// 데이터 변환을 여기서 해야한다. 인수로 필요한 것을 받아서,
// 서비스에서 데이터 변환을 자바 스프링을 서비스에서 했잖아. 변환을 똑같이 서비스를 여기에서 해야한다.


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
    }
}

export async function fetchProduct(productId: number): Promise<ProductModel[]> {
    console.log("fetchProduct 진입")
    try {
        const options = {
            params: {
                productId: Number(productId),
            }
        };

        const productDictArray: ProductDictionary[] = await productAPI.findById(options);
        console.log("productDictArray", productDictArray);
        if (productDictArray.length === 0) {
            return [];
        }

        return productDictArray.map((item) => Object.values(item)).flat();

    } catch (error) {
        console.error("fetchProduct 에러 발생", error);
        throw new Error("");
    }
}

export async function fetchProductDetails(id: number): Promise<{
    colorIds: number[],
    product: ProductModel,
    size: string[],
    auctions: AuctionModel[]
}> {
    try {
        console.log("fetchProductDetails 진입");

        const options = {
            params: {
                productId: id,
            }
        };

        const productArray = await fetchProduct(id);
        const product = productArray.find((item) => item.id === id);
        if (product === undefined) {
            throw new Error(`해당 product를 찾을 수 없습니다. id: ${id}`);
        }
        const colorIds = productArray.map((item) => item.id);
        const sizes = product.sizes.map((size) => size.id);

        const auctionArray = await Promise.all(sizes.map((size) => {
            return fetchAuctionsBySize(size);
        }));
        const auctions = auctionArray.flat(Infinity).filter((auction) => auction !== undefined) as unknown as AuctionModel[];
        const size = product.sizes.map((size) => size.size);

        console.log("auctions", auctions);

        return {colorIds, product, size, auctions};


    } catch (error) {
        console.error("fetchProductDetail", error);
        throw new Error("fetchProductError");
    }
}