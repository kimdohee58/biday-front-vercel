// src/api/brand/brand.api.ts
import { BrandModel } from "@/model/BrandModel";
import { api } from "../request";
import { strategy } from "../api.strategy";

// 브랜드 목록 불러오기 (GET 요청)
const findAll = async (): Promise<BrandModel[]> => {
    const response = await strategy.GET(`${api.brand}`);
    return response;
};

// 브랜드 상세보기 (GET 요청)
const findById = async (id: number): Promise<BrandModel> => {
    const response = await strategy.GET(`${api.brand}/findById`, { id: id.toString() });
    return response;
};

// 브랜드 등록 (POST 요청)
const create = async (brandData: Partial<BrandModel>): Promise<BrandModel> => {
    const response = await strategy.POST(`${api.brand}`, brandData);
    return response;
};

// 브랜드 수정 (PATCH 요청)
const update = async (brandData: Partial<BrandModel>): Promise<BrandModel> => {
    const response = await strategy.PATCH(`${api.brand}`, brandData);
    return response;
};

// 브랜드 삭제 (DELETE 요청)
const deleteById = async (id: number): Promise<void> => {
    await strategy.DELETE(`${api.brand}?id=${id}`);
};

export const brand = {
    findAll,
    findById,
    create,
    update,
    deleteById,
};
