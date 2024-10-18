import {AwardModel} from "@/model/auction/award.model"; // 필요에 맞게 경로 수정
import {api} from "../request";
import {strategy} from "../api.strategy";
import {RequestOptions} from "@/model/api/RequestOptions";
import {AuctionModel} from "@/model/auction/auction.model";

// 사용자 낙찰 목록 조회 (GET 요청)
type awardsParams = {
    period: string;
    cursor?: Date;
    page: number;
    size: number;
}
type findByUserProps = {
    size?: number;
    cursor?: number;
    period? : string;
    page?: number
}
// 낙찰 목록 (userInfo, params: period, cursor?, page, size, !data)
const findByUser = async (options: RequestOptions<findByUserProps,null>): Promise<AwardModel[]> => {
   return await strategy.GET(`${api.award}`, options);
};

// 낙찰 상세 조회 (userInfo, awardId: number)
const findById = async (options: RequestOptions<{awardId: number}, null>): Promise<AwardModel> => {
    return await strategy.GET(`${api.award}/findById`, options);
};

export const awardAPI= {
    findByUser,
    findById,
};
