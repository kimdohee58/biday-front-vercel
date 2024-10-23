// src/api/category/category.api.ts
import {api} from "../request";
import {strategy} from "../api.strategy";
import {CategoryModel} from "@/model/product/category.model";

const findAll = async (): Promise<CategoryModel[]> => {
    return await strategy.GET(`${api.category}`, {});
};

const findById = async (id: number): Promise<CategoryModel> => {
    return await strategy.GET(`${api.category}/findById`, {});
};

const create = async (categoryData: Partial<CategoryModel>): Promise<CategoryModel> => {
    return await strategy.POST(`${api.category}`, {});
};

const update = async (categoryData: Partial<CategoryModel>): Promise<CategoryModel> => {
    return await strategy.PATCH(`${api.category}`, {});
};

const delete_ = async (id: number): Promise<void> => {
    await strategy.DELETE(`${api.address}/${id}`, {});
};

export const categoryAPI = {
    findAll,
    findById,
    create,
    update,
    delete_,
};
