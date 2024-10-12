//src/model/bid.model.ts

export interface BidModel {
    auctionId: number;
    currentBid: number;
}

export interface BidStreamModel {
    auctionId: number;
    currentBid: number;
    award: boolean;
    count: number;
    bidedAt: Date;
}