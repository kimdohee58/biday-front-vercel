//src/model/award.model.ts
import {AuctionModel, AwardAuctionModel} from "@/model/auction/auction.model";

export interface AwardModel {
    id: number;
    auction: AwardAuctionModel;
    userId: string;
    bidedAt: Date;
    currentBid: number;
    count: number;
}

export interface AwardDto {
    id: number;
    auction: number;
    userId: string;
    bidedAt: Date;
    currentBid: number;
    count: number;
    createdAt: Date;
}
