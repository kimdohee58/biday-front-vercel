// src/api/product11/product11.api.ts
import {api} from "../request";
import {strategy} from "../api.strategy";
import {ProductDictionary, ProductModel, SearchFilter} from "@/model/product/product.model";
import {RequestOptions} from "@/model/api/RequestOptions";
import {SizeModel} from "@/model/product/size.model";

type ProductParams = {
    productId: number;
}

type ProductSizeParams = {
    sizeId: number;
}

// 상품 상세 조회 (params: productId)
const findById = async (options: RequestOptions<ProductParams,null>): Promise<ProductDictionary[]> => {
    return await strategy.GET(`${api.product}`, options);
};

// 상품 등록 (userInfo, data:ProductModel)
const saveProduct = async (options: RequestOptions<any,ProductModel>) => {
    return await strategy.POST(`${api.product}`, options);
};

// 상품 삭제 (userInfo, productId: number, !data)
const deleteProduct = async (options: RequestOptions<ProductParams, null>): Promise<void> => {
    await strategy.DELETE(`${api.product}`, options);
};

// 전체 상품 목록 불러오기 (GET 요청)
const findAll = async (): Promise<ProductModel[]> => {
    return await strategy.GET(`${api.product}/findAll`, {});
};

// 필터를 이용한 상품 목록 불러오기 (params: SearchFilter, !data)
const searchByFilter = async (
    options: RequestOptions<SearchFilter,null>
): Promise<ProductModel[]> => {
    return await strategy.GET(`${api.product}/findByFilter`,
        options);
};

// 상품 수정 (PATCH 요청)
const updateProduct = async (options: RequestOptions<any, any>): Promise<ProductModel> => {
    return await strategy.PATCH(`${api.product}`, options);
};

// 상품 1개 상세보기 (GET 요청)
const findOneById = async (options: RequestOptions<ProductParams,null>):Promise<ProductDictionary> => {
    return await strategy.GET(`${api.product}/findOne`, options);
}

// sizeId를 가지고 있는 상품 1개를 반환, 마이페이지에서 내역보기 등 사이즈 id 기준으로 불러오는 상품 정보
const findBySizeId = async (options: RequestOptions<ProductSizeParams,null>):Promise<SizeModel> => {
    return await strategy.GET(`${api.product}/findBySizeId`, options);
}


export const productAPI = {
    findAll,
    searchByFilter,
    findById,
    saveProduct,
    updateProduct,
    deleteProduct,
    findOneById,
    findBySizeId,
};