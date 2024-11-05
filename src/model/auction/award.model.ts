//src/model/award.model.ts
import {AuctionDTO} from "@/model/auction/auction.model";

export interface AwardModel {
    id: number;
    auction: AuctionDTO;
    userId: string;
    bidedAt: Date;
    currentBid: number;
    count: number;
    status: boolean;
    createdAt: Date;
}

export interface AwardDto {
    id: number;
    auction: number;
    userId: string;
    bidedAt: Date;
    currentBid: number;
    count: number;
    status: boolean;
    createdAt: Date;
}
