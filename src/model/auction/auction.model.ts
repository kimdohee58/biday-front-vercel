//src/model/auction/auction.model.ts
import {AwardModel} from "@/model/auction/award.model";

export interface AuctionModel {
    id?: number;
    user?: string;
    description: string;
    startingBid: number;
    currentBid: number;
    startedAt: Date;
    endedAt: Date;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
    size:number,
    award:AwardModel,
}

export interface SaveAuctionModel {
    sizeId: number;
    description: string;
    startingBid: number;
    currentBid: number;
    startedAt: Date;
    endedAt: Date;
    userId: any;
    createdAt: any;
    updatedAt: any;
    status: any;
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
//     award: {} as AwardModel, 여기서 이게 new 생성자이다. new AwardModel() x



