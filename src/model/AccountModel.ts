//src/model/AccountModel.ts
export interface AccountModel {
    id?: number;
}

export const aacountState: AccountModel = {
    id: 0, // 처음에는 ID가 없을 수 있으므로 undefined로 설정
};