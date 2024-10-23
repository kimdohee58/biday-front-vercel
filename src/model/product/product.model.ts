//src/model/product/product.model.ts
import {SizeModel} from "@/model/product/size.model";
import {ImageModel} from "@/model/ftp/image.model";

export interface ProductModel {
    id: number;
    brand: string;
    category: string;
    name: string;
    subName?: string;
    productCode: string;
    price: number;
    color: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    wishes:number;
    sizes: SizeModel[];
}

export interface ProductDTO {
    id: number;
    brand: string;
    category: string;
    name: string;
    subName: string;
    productCode: string;
    price: number;
    color: string;
    createdAt: Date;
    updatedAt: Date;
    wishes: number;
}

export enum ColorType {
    CHARCOAL = "CHARCOAL",
    GRAY = "GRAY",
    BEIGE = "BEIGE",
    OLIVE = "OLIVE",
    PURPLE = "PURPLE",
    IVORY = "IVORY",
    GREEN = "GREEN",
    MELANGE = "MELANGE",
    BLUE = "BLUE",
    WHITE = "WHITE",
    CREAM = "CREAM",
    YELLOW = "YELLOW",
    BROWN = "BROWN",
    RED = "RED",
    NAVY = "NAVY",
    PINK = "PINK",
    ORANGE = "ORANGE",
    KHAKI = "KHAKI",
    BURGUNDY = "BURGUNDY",
    BLACK = "BLACK"
}

export interface ProductWithImageModel {
    product: ProductModel;
    image: ImageModel;
}

export type ProductDictionary = { [key: string]: ProductModel; };

export interface SearchFilter {
    brand?: string,
    category?: string,
    keyword?: string,
    color?: string,
    order?: string
}

export const initialProduct: ProductModel = {
    id: 0,
    brand: '',
    category: '',
    name: '',
    productCode: "",
    price: 0,
    color: '',
    description: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    wishes:0,
    sizes: {} as SizeModel[],
};

export const defaultProduct: ProductModel = {
    id: 0,
    brand: 'default',
    category: 'default',
    name: 'default',
    productCode: "default",
    price: 0,
    color: 'default',
    description: 'default',
    createdAt: new Date(),
    updatedAt: new Date(),
    wishes:0,
    sizes: [] as SizeModel[],
};