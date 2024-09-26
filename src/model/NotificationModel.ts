import {UserModel} from "@/model/UserModel";

interface NotificationModel {
    id: number;
    user: UserModel;
    type: NotificationTypeModel;
    message: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}