import {AwardModel} from "@/model/AwardModel"; // 필요에 맞게 경로 수정
import {api} from "../request";
import {strategy} from "../api.strategy";
import {RequestOptions} from "@/model/api/RequestOptions";

// 사용자 낙찰 목록 조회 (GET 요청)
const findByUser = async (
    token: string,
    userId: string,
    period: string = "3개월",
    cursor?: Date
): Promise<AwardModel[]> => {
    const response = await strategy.GET(`${api.award}`, {
    });
    return response;
};

// 낙찰 상세 조회 (GET 요청)
const findById = async (options: RequestOptions<{awardId: number}, null>): Promise<AwardModel> => {
    return await strategy.GET(`${api.award}/findById`, options);
};

export const awardAPI= {
    findByUser,
    findById,
};
