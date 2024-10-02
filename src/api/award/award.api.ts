import { AwardModel } from "@/model/AwardModel"; // 필요에 맞게 경로 수정
import { api } from "../request";
import { strategy } from "../api.strategy";

// 사용자 낙찰 목록 조회 (GET 요청)
/*const findByUser = async (
    token: string,
    userId: string,
    period: string = "3개월",
    cursor?: Date
): Promise<AwardModel[]> => {
    const response = await strategy.GET(`${api.award}`, {
        headers: { Authorization: token },
        params: {
            userId,
            period,
            ...(cursor ? { cursor: cursor.toISOString() } : {}),
        },
    });
    return response;
};

// 낙찰 상세 조회 (GET 요청)
const findById = async (token: string, id: number): Promise<AwardModel> => {
    const response = await strategy.GET(`${api.award}/findById`, {
        headers: { Authorization: token },
        params: { id: id.toString() },
    });
    return response;
};

export const award = {
    findByUser,
    findById,
};*/
