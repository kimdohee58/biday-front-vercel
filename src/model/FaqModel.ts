export interface FaqModel {
    id: number;
    user: UserModel;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}