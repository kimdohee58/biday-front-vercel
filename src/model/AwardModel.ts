export interface AwardModel {
    id: number;
    auction: number;
    user: string;
    bidedAt: Date;
    currentBid: number;
    count: number;
}