export interface SizeModel {
    id: number;
    sizeProduct: string;
    size: string;
    createdAt: Date;
    updatedAt: Date;
}

// 기본 초기값 설정
export const initialSize: SizeModel = {
    id: 0,
    sizeProduct: '',
    size: '',
    createdAt: new Date(),
    updatedAt: new Date(),
};