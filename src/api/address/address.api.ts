//src/api/address/address.api.ts
import { AddressModel } from "@/model/AddressModel";
import { api } from "../request";
import { strategy } from "../api.strategy";

const findAll = async (): Promise<AddressModel[]> => {
    const response = await strategy.GET(`${api.address}/list`);
    return response.data;
};

const pick = async (id: number): Promise<string> => {
    const response = await strategy.PUT(`${api.address}/pick`, { id });
    return response.data;
};

const count = async (): Promise<number> => {
    const response = await strategy.GET(`${api.address}/count`);
    return response.data;
};

const deleteById = async (id: number): Promise<void> => {
    await strategy.DELETE(`${api.address}/deleteById?id=${id}`);
};

const insert = async (addressData: Partial<AddressModel>): Promise<AddressModel> => {
    const response = await strategy.POST(`${api.address}/insert`, addressData);
    return response.data;
};

export const address = {
    findAll,
    pick,
    count,
    deleteById,
    insert,
};