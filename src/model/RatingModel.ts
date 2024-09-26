//src/model/RatingModel.ts
import {UserModel} from "@/model/UserModel";

export interface RatingModel {
    id?: number;
    user: UserModel;
    rating: number;
    createdAt: Date;
}