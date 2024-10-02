//src/model/BidModel.ts
export interface BidModel {
    id?: number;
    auction: AuctionModel;
    userId: number;
    bidedAt: Date;
    currentBid: Date;
    count: number;
    createdAt: Date;
    award: boolean;
    //paymentTemp: PaymentTempModel;
}