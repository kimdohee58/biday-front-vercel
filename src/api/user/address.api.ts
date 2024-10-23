import {api} from "../request";
import {strategy} from "../api.strategy";
import {AddressModel} from "@/model/user/address.model";
import {RequestOptions} from "@/model/api/RequestOptions";

// 주소 목록 조회 (GET 요청)
const findAllByUserId = async (options:RequestOptions<{}, null>): Promise<AddressModel[]> => {
    return await strategy.GET(`${api.address}/list`, options);
};

// 주소 선택 (PUT 요청)
const pickAddress = async (options:RequestOptions<{id:string},null>): Promise<string> => {
    return await strategy.PUT(`${api.address}/pick`, options);
};

// 주소 수 카운트 (GET 요청)
const countAddresses = async (options:RequestOptions<{},null>): Promise<number> => {
    return await strategy.GET(`${api.address}/count`, options);
};

// 주소 삭제 (DELETE 요청)
const deleteAddressById = async (options:RequestOptions<{id:string},null>): Promise<void> => {
    return await strategy.DELETE(`${api.address}/deleteById`, options);
};

const insertAddress = async (options: RequestOptions<{}, AddressModel>): Promise<AddressModel> => {
    return await strategy.POST(`${api.address}/insert`, options);
};

export const addressAPI = {
    findAllByUserId,
    pickAddress,
    countAddresses,
    deleteAddressById,
    insertAddress,
};
