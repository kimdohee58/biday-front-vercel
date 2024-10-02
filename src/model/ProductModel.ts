//src/model/ProductModel.ts
import {AuctionModel} from "@/model/AuctionModel";

export interface ProductModel {
    id: number;
    brand: string;
    category: string;
    name: string;
    subName?: string;
    productCode: number;
    price: number;
    color: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    auctions: AuctionModel[];
}

export const initialProduct: ProductModel = {
    id: 0,
    brand: '',
    category: '',
    name: '',
    productCode: 0,
    price: 0,
    color: '',
    description: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    auctions: [],  // 빈 배열로 초기화
};