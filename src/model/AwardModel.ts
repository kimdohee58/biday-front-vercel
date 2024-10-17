//src/model/AwardModel.ts
import {AuctionModel, AwardAuctionModel} from "@/model/auction/auction.model";

export interface AwardModel {
    id: number;
    auction: AwardAuctionModel;
    userId: string;
    bidedAt: Date;
    currentBid: number;
    count: number;
}