import {AwardDto, AwardModel} from "@/model/auction/award.model"; // 필요에 맞게 경로 수정
import {api} from "../request";
import {strategy} from "../api.strategy";
import {RequestOptions} from "@/model/api/RequestOptions";

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
    console.log("findById 확인하는 코드 : ", options )
    return await strategy.GET(`${api.award}/findById`, options);
};

// 종료된 경매에서 호출될 낙찰 정보(auctionId: number)
const findByAuctionId = async (options: RequestOptions<{auctionId: number}, null>): Promise<AwardDto> => {
    return await strategy.GET(`${api.award}/findByAuction`, options);
}

// 결제시 award status 업데이트 (awardId: number)
const updateStatus = async (options: RequestOptions<{ awardId: number }, null>) => {
    return await strategy.PATCH(`${api.award}/updateStatus`, options);
};

export const awardAPI= {
    findByUser,
    findById,
    findByAuctionId,
    updateStatus,
};
