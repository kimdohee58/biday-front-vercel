import {AuctionModel} from "@/model/AuctionModel";
import {ImageModel} from "@/model/ImageModel";
import {SizeModel} from "@/model/SizeModel";

export interface ProductModel {
    id?: number;
    brand: string;
    category: string;
    name: string;
    subName: string;
    productCode: string;
    price: number;
    color: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    wishes: number;
    image: ImageModel;
    sizes: SizeModel[];
}

export type ProductDictionary = { [key: string]: ProductModel; };