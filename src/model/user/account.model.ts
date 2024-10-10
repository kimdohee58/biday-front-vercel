//src/model/account.model.ts

export interface AccountModel {
    id?: string;
    userId:string; // 단순작엄이다. useModel 타입으로 하지 말라고 하심.
    bankTranId:string;
    bankCode : string;
    bankName : string;
    accountNum:string;
    accountName:string;
    bankRspCode:string;
    bankTranDate : Date;
    bankRspMessage: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export enum BankCode {
    한국은행 = "001",
    산업은행 = "002",
    기업은행 = "003",
    국민은행 = "004",]
    외환은행 = "005",
    수협중앙회 = "006",
    수출입은행 = "008",
    농협중앙회 = "011",
    지역농축협 = "012",
    우리은행 = "020",
    SC은행 = "023",
    한국씨티은행 = "027",
    새마을금고중앙회 = "045",
    신협중앙회 = "048",
    우체국 = "071",
    하나은행 = "081",
    신한은행 = "088",
    카카오뱅크 = "090",
    토스뱅크 = "092",
}


export const initialAccountModel : AccountModel = {
    id: "",
    userId: "",
    bankTranId:"",
    bankCode : "",
    bankName :"",
    accountNumber:"",
    accountName:"",
    bankRspCode:"",
    bankTranDate : new Date(),
}

/*export const aacountState: AccountModel = {
    id: 0, // 처음에는 ID가 없을 수 있으므로 undefined로 설정
};*/
