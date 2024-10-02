export interface RatingModel {
    id?: number;
    user: UserModel;
    rating: number;
    createdAt: Date;
}