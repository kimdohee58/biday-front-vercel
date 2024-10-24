// src/model/product/size.model.ts
import {ProductDTO} from "@/model/product/product.model";

export interface SizeModel {
    id: number;
    sizeProduct: ProductDTO;
    size: string;
    createdAt: Date;
    updatedAt: Date;
}

// 기본 초기값 설정
export const initialSize: SizeModel = {
    id: 0,
    sizeProduct: {} as ProductDTO,
    size: '',
    createdAt: new Date(),
    updatedAt:  new Date(),
};

