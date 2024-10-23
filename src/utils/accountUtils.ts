import {BankCode} from "@/model/user/account.model";

export const getRandomBankCode = (): BankCode => {
    const bankCodes = Object.values(BankCode);
    const randomIndex = Math.floor(Math.random() * bankCodes.length);
    return bankCodes[randomIndex] as BankCode;
}

export const getBankName = (code:BankCode): string => {
    const entries = Object.entries(BankCode);
    const bank = entries.find(([, value]) => value === code);
    return bank ? bank [0] : "Unknown Bank";
}