//src/model/AuctionModel.ts
import {ProductModel} from "@/model/ProductModel";
import {BidModel} from "@/model/BidModel";

export interface AuctionModel {
    id?: number;
    userId: number;
    product: ProductModel;
    description: string;
    startingBid: number;
    currentBid: number;
    startedAt: Date;
    endedAt: Date;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
    //images: ImagesModel[]
    bid: BidModel;
}