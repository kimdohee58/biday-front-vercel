import {ChatButtonModel} from "@/model/ChatButtonModel";
import {UserModel} from "@/model/user/user.model";

export interface ChatClickModel {
    id?: number;
    button: ChatButtonModel;
    user: UserModel;
    clickTime: Date;
}