//src/model/AwardModel.ts
import {AuctionModel} from "@/model/auction/auction.model";

export interface AwardModel {
    id: number;
    auction: AuctionModel;
    userId: string;
    bidedAt: Date;
    currentBid: number;
    count: number;
}