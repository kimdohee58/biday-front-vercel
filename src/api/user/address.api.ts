import { api } from "../request";
import { strategy } from "../api.strategy";
import { AddressModel } from "@/model/user/address.model";
import {RequestOptions} from "@/model/api/RequestOptions";

// 주소 목록 조회 (GET 요청)
const findAllByUserId = async (options:RequestOptions<{}, null>): Promise<AddressModel[]> => {
    const response = await strategy.GET(`${api.address}/list`, options);
    return response;
};

// 주소 선택 (PUT 요청)
const pickAddress = async (options:RequestOptions<{id:string},null>): Promise<string> => {
    const response = await strategy.PUT(`${api.address}/pick`, options);
    return response;
};

// 주소 수 카운트 (GET 요청)
const countAddresses = async (options:RequestOptions<{},null>): Promise<number> => {
    const response = await strategy.GET(`${api.address}/count`, options);
    return response;
};

// 주소 삭제 (DELETE 요청)
const deleteAddressById = async (options:RequestOptions<{id:string},null>): Promise<void> => {
    const response = await strategy.DELETE(`${api.address}/deleteById`, options);
    return response;
};

const insertAddress = async (options: RequestOptions<{}, AddressModel>): Promise<AddressModel> => {
    const response = await strategy.POST(`${api.address}/insert`, options)
    return response;
};

export const addressAPI = {
    findAllByUserId,
    pickAddress,
    countAddresses,
    deleteAddressById,
    insertAddress,
};
