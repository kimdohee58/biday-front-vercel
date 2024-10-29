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

export interface BidLoadModel {
    auctionId: number;
    award: boolean;
    bidedAt: Date;
    currentBid : number;
    id : string;
    userId : string;
    sizeId : string;
}