import {UserModel} from "@/model/UserModel";

interface ChatClickModel {
    id?: number;
    button: ChatButtonModel;
    user: UserModel;
    clickTime: Date;
}