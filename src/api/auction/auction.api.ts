import { AuctionModel } from "@/model/AuctionModel";
import { api } from "../request";
import { strategy } from "../api.strategy";

// 경매 상세보기 (GET 요청)
const findById = async (id: number): Promise<AuctionModel> => {
    const response = await strategy.GET(`${api.auction}/findById`, { id: id.toString() });
    return response;
};

// 헤더 경매 목록 조회 (GET 요청)
const findBySize = async (sizeId?: number, order?: string, cursor?: number): Promise<AuctionModel[]> => {
    const response = await strategy.GET(`${api.auction}/findBySize`, {
        sizeId: sizeId?.toString() || '',  // undefined인 경우 빈 문자열로 처리
        order: order || '',  // undefined인 경우 빈 문자열로 처리
        cursor: cursor?.toString() || '',  // undefined인 경우 빈 문자열로 처리
    });
    return response;
};

// 상품 상세 경매 목록 조회 (GET 요청)
const findAllBySize = async (sizeId: number, order?: string): Promise<AuctionModel[]> => {
    const response = await strategy.GET(`${api.auction}/findAllBySize`, {
        sizeId: sizeId.toString(),
        order: order || '',  // undefined일 경우 빈 문자열로 처리
    });
    return response;
};

// 마이페이지 경매 목록 조회 (GET 요청)
const findByUser = async (userId: string, period: string, cursor?: number): Promise<AuctionModel[]> => {
    const response = await strategy.GET(`${api.auction}`, {
        userId,
        period,
        cursor: cursor?.toString() || '',  // undefined일 경우 빈 문자열로 처리
    });
    return response;
};

// 경매 등록 (POST 요청)
const saveAuction = async (auctionData: Partial<AuctionModel>): Promise<AuctionModel> => {
    const response = await strategy.POST(`${api.auction}`, auctionData);
    return response;
};

// 경매 수정 (PATCH 요청)
const updateAuction = async (auctionData: Partial<AuctionModel>): Promise<AuctionModel> => {
    const response = await strategy.PATCH(`${api.auction}`, auctionData);
    return response;
};

// 경매 삭제 (DELETE 요청)
const deleteById = async (id: number): Promise<void> => {
    await strategy.DELETE(`${api.auction}?id=${id}`);
};

export const auction = {
    findById,
    findBySize,
    findAllBySize,
    findByUser,
    saveAuction,
    updateAuction,
    deleteById,
};
