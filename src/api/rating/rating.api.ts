// src/api/rating/rating.api.ts
import { RatingModel } from "@/model/RatingModel";
import { api } from "../request";
import { strategy } from "../api.strategy";

// 판매자 리뷰 목록 조회 (GET 요청)
const findBySeller = async (token: string, sellerId: string): Promise<RatingModel[]> => {
    const response = await strategy.GET(`${api.rating}`, {
       // headers: { Authorization: token },
       // params: { id: sellerId },
    });
    return response;
};

// 새로운 리뷰 등록 (POST 요청)
const saveRating = async (token: string, ratingData: RatingModel): Promise<RatingModel> => {
    const response = await strategy.POST(`${api.rating}`, ratingData, {
       // headers: { Authorization: token },
    });
    return response;
};

export const rating = {
    findBySeller,
    saveRating,
};
