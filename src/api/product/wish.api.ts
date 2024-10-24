// src/api/wish/wish.api.ts
import {api} from "../request";
import {strategy} from "../api.strategy";
import {WishModel} from "@/model/product/wish.model";
import {RequestOptions} from "@/model/api/RequestOptions";

// 사용자별 위시 목록 조회 (GET 요청)
const findByUser = async (options: RequestOptions<any, null>): Promise<WishModel[]> => {
    return await strategy.GET(`${api.wish}/user`, options);
};

// 위시 토글 (GET 요청, 위시 생성/삭제)
const toggleWish = async (options: RequestOptions<{productId: number}, null>): Promise<boolean> => {
    return await strategy.GET(`${api.wish}`, options);
};

// 위시 삭제 (DELETE 요청)
const deleteWish = async (options: RequestOptions<{id:number}, null>): Promise<boolean> => {
    return await strategy.DELETE(`${api.wish}`, options);
};

export const wishAPI = {
    findByUser,
    toggleWish,
    deleteWish,
};