//src/model/user/loginHistory.model.ts
export interface LoginHistoryModel {
    id: string;
    userId: string;
    createdAt: Date;
}

export const initialLoginHistoryModel: LoginHistoryModel = {
    id: "",
    userId: "",
    createdAt: new Date()
}