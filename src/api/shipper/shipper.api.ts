// src/api/shipper/shipper.api.ts
import { ShipperModel } from "@/model/ShipperModel";
import { api } from "../request";
import { strategy } from "../api.strategy";

// 배송 목록 조회 (GET 요청)
const findAll = async (): Promise<ShipperModel[]> => {
    const response = await strategy.GET(`${api.shipper}`);
    return response;
};

// 배송 상세보기 (GET 요청)
const findById = async (id: number): Promise<ShipperModel> => {
    const response = await strategy.GET(`${api.shipper}/findById`, { id: String(id) });
    return response;
};

// 배송 등록 (POST 요청)
const createShipper = async (token: string, shipperData: Partial<ShipperModel>): Promise<ShipperModel> => {
    const response = await strategy.POST(`${api.shipper}`, shipperData, { Authorization: token });
    return response;
};

// 배송 수정 (PATCH 요청)
const updateShipper = async (token: string, shipperData: Partial<ShipperModel>): Promise<ShipperModel> => {
    const response = await strategy.PUT(`${api.shipper}`, shipperData);
    return response;
};

/*
// 배송 삭제 (DELETE 요청)
const deleteById = async (token: string, id: number): Promise<void> => {
    await strategy.DELETE(`${api.shipper}/${id}`, {
        headers: {
            Authorization: token
        }
    });
};
*/


export const shipper = {
    findAll,
    findById,
    createShipper,
    updateShipper,
    //deleteById,
};
