//src/model/auction/auction.model.ts
import {AwardModel} from "@/model/auction/award.model";
import {ImageModel} from "@/model/ftp/image.model";

export interface AuctionModel {
    id: number;
    userId: string;
    description: string;
    startingBid: number;
    currentBid: number;
    startedAt: Date;
    endedAt: Date;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
    sizeId:number,
    award:AwardModel,
}

export interface AuctionWithImageModel {
    auction: AuctionModel,
    images: ImageModel[];
}

export interface SaveAuctionModel {
    sizeId: number;
    description: string;
    startingBid: number;
    currentBid: number;
    startedAt: Date;
    endedAt: Date;
}

export interface AwardAuctionModel {
    id: number;
    userId: string;
    description: string;
    startingBid: number;
    currentBid: number;
    startedAt: Date;
    endedAt: Date;
    status: boolean,
    createdAt: Date;
    updatedAt: Date;
    sizeId: number;
}



