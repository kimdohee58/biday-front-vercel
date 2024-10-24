import {AuctionModel, SaveAuctionModel} from "@/model/auction/auction.model";
import {api} from "../request";
import {strategy} from "../api.strategy";
import {RequestOptions} from "@/model/api/RequestOptions";

// 경매 상세보기 (GET 요청)
const findById = async (options: RequestOptions<{ auctionId: string }, null>): Promise<AuctionModel> => {
    return await strategy.GET(`${api.auction}/findById`, options);
};

// 헤더 경매 목록 조회 (GET 요청)
type findBySizeParams = {
    sizeId: number,
    order?: string,
    cursor?: number
}
const findBySize = async (options: RequestOptions<findBySizeParams, null>): Promise<AuctionModel[]> => {
    return await strategy.GET(`${api.auction}/findBySize`, options);
};

// 상품 상세 경매 목록 조회 (GET 요청)
const findAllBySize = async (options: RequestOptions<Omit<findBySizeParams, "cursor">, null>): Promise<AuctionModel[]> => {
    return await strategy.GET(`${api.auction}/findAllBySize`, options);
};

type findByUserProps = {
    size?: number;
    cursor?: number;
    period? : string;
    page?: number
}
// 마이페이지 경매 목록 조회 (GET 요청)
const findByUser = async (options: RequestOptions<findByUserProps,null>): Promise<AuctionModel[]> => {
    return await strategy.GET(`${api.auction}`, options);
};

// 경매 등록 (POST 요청)
const save = async (options: Omit<RequestOptions<any, SaveAuctionModel>, "params">): Promise<AuctionModel> => {
    return await strategy.POST(`${api.auction}`, options);
};

// 경매 수정 (PATCH 요청)
const update = async (auctionData: Partial<AuctionModel>): Promise<AuctionModel> => {
    return await strategy.PATCH(`${api.auction}`, {});
};

// 경매 삭제 (DELETE 요청)
const delete_ = async (options:RequestOptions<{auctionId:string},null>): Promise<void> => {
    return await strategy.DELETE(`${api.auction}`, options);
};

export const auctionAPI = {
    findById,
    findBySize,
    findAllBySize,
    findByUser,
    update,
    save,
    delete_ // 키워드 딜리트라는 단억나 키워드여서 _ 언더바를 준거다. 다른 이름으로 아 자바 컨트롤러랑 맞추고 싶은데 에러가 나서 한거.
};
