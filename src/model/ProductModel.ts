interface ProductModel {
    id: number;
    brand: string;
    category: string;
    name: string;
    subName?: string;
    productCode: number;
    price: number;
    color: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    auctions: AuctionModel[];
}