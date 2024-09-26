import {UserModel} from "@/model/UserModel";

export interface LoginHistoryModel {
    id?: number;
    user: UserModel;
    createdAt: Date;
}