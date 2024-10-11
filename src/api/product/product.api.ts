// src/api/product11/product11.api.ts
import {api} from "../request";
import {strategy} from "../api.strategy";
import {ProductDictionary, ProductModel} from "@/model/product/product.model";
import {RequestOptions} from "@/model/api/RequestOptions";

// 전체 상품 목록 불러오기 (GET 요청)
const findAll = async (): Promise<ProductModel[]> => {
    return await strategy.GET(`${api.product}/findAll`);
};

// 필터를 이용한 상품 목록 불러오기 (GET 요청)
const searchByFilter = async (
    brandId?: number,
    categoryId?: number,
    keyword: string = '',
    color: string = '',
    order: string = '',
    lastItemId?: number
): Promise<ProductModel[]> => {
    const response = await strategy.GET(`${api.product}/findByFilter`, {
        ...(brandId && { brandId: brandId.toString() }),
        ...(categoryId && { categoryId: categoryId.toString() }),
        keyword,
        color,
        order,
        ...(lastItemId && { lastItemId: lastItemId.toString() }),
    });
    return response;
};

// 상품 상세 조회 (GET 요청)
const findById = async (options: RequestOptions<null>): Promise<ProductModel> => {
    return await strategy.GET(`${api.product}`, options);
};

// 상품 등록 (POST 요청)
const saveProduct = async (options: RequestOptions<ProductModel>) => {
    return await strategy.POST(`${api.product}`, options);
};

// 상품 수정 (PATCH 요청)
const updateProduct = async (options: RequestOptions<Partial<ProductModel>>): Promise<ProductModel> => {
    return await strategy.PATCH(`${api.product}`, options);
};

// 상품 1개 상세보기 (GET 요청)
const findOneById = async (options: RequestOptions<null>):Promise<ProductDictionary> => {
    return await strategy.GET(`${api.product}/findOne`, options);
}

// 상품 삭제 (DELETE 요청)
const deleteProduct = async (options: RequestOptions<null>): Promise<void> => {
    await strategy.DELETE(`${api.product}?id=${id}`);
};

export const productAPI = {
    findAll,
    searchByFilter,
    findById,
    saveProduct,
    updateProduct,
    deleteProduct,
    findOneById,
};
