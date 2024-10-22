export interface ImageModel {
    id?: string;
    originalName: string;
    uploadName: string;
    uploadPath: string;
    uploadUrl: string;
    type: string;
    referencedId: string;
    createdAt: Date;

}

export enum ImageType {
    AUCTION = "경매",
    PRODUCT = "상품",
    RATING = "평점",
}

export interface UploadImageParams {
    filePath: string;
    type: ImageType;
    referencedId: number;
    files: File[];
}

export const defaultImage: ImageModel = {
    id: "default",
    originalName: "default",
    uploadName: "default_image.png",
    uploadUrl: "https://kr.object.ncloudstorage.com/biday/products/ad87ead6-1682-4059-99d2-a5486d024ab2.jpg",
    uploadPath: "product",
    type: ImageType.PRODUCT,
    referencedId: "0",
    createdAt: new Date(),
}