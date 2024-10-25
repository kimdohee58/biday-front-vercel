"use client"

import React, {Suspense} from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import {Input, Select, Typography,} from "@material-tailwind/react";
import {AccountModel} from "@/model/user/account.model";
import {useSuspenseQuery} from "@tanstack/react-query";
import useRandomId from "@/hooks/useRandomId";
import {getAccount, saveAccount} from "@/service/user/account.service";
import {useSelector} from "react-redux";
import {getUser} from "@/lib/features/user.slice";
import {UserModel, UserRole} from "@/model/user/user.model";
import {getBankName, getRandomBankCode} from "@/utils/accountUtils";


function AccountDetails({user, onClick}: { user: UserModel, onClick: () => void }) {
    const accountData = useSuspenseQuery({
        queryKey: ["account", user.id],
        queryFn: () => getAccount(),
    });


    return (
        <div>
            {accountData.data && Object.keys(accountData.data).length > 0 ? (
                <div className="flex flex-col mt-8">
                    <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
                        <div className="w-full">
                            <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                                이름
                            </Typography>
                            <Input
                                size="lg"
                                value={user.name}
                                labelProps={{
                                    className: "hidden",
                                }}
                                disabled
                                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                            />
                        </div>
                        <div className="w-full">
                            <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                                생년월일
                            </Typography>
                            <Input
                                size="lg"
                                value={"19990919"}
                                labelProps={{
                                    className: "hidden",
                                }}
                                disabled
                                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                            />
                        </div>
                    </div>
                    <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
                        <div className="w-full">
                            <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                                은행
                            </Typography>
                            <Input
                                size="lg"
                                labelProps={{
                                    className: "hidden",
                                }}
                                className="border-t-blue-gray-200 aria-[expanded=true]:border-t-primary"
                                disabled
                                value={accountData.data.bankName}
                            />
                        </div>
                        <div className="w-full">
                            <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                                계좌번호
                            </Typography>
                            <Input
                                size="lg"
                                labelProps={{
                                    className: "hidden",
                                }}
                                disabled
                                value={accountData.data.accountNumber}
                                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                            />
                        </div>
                    </div>
                    <ButtonPrimary onClick={onClick}>
                        계좌 정보 변경
                    </ButtonPrimary>
                </div>
            ) : (
                <div>
                    <div>
                        계좌 정보가 존재하지 않습니다.
                        <br/>
                        계좌를 등록하고 판매를 시작해 보세요.
                    </div>
                    <div className="mt-4">
                        <ButtonPrimary onClick={onClick}>
                            계좌 등록하기
                        </ButtonPrimary>
                    </div>
                </div>
            )}
        </div>
    );
}


export default function Account1() {
    const bankTranId = useRandomId(16);
    const bankCode = getRandomBankCode();
    const bankName = getBankName(bankCode);

    const AUTH_URL = 'https://testapi.openbanking.or.kr/oauth/2.0/authorize';
    const CLIENT_ID = 'fce251a9-d76a-449c-8024-021ec51dc4eb';
    const REDIRECT_URI = 'http://localhost:3000/callback';
    const SCOPE = 'login inquiry transfer';
    const STATE = '12341234123412341234123412341234';
    const AUTH_TYPE = '0';


    const user: UserModel = useSelector(getUser);

    /*useEffect(() => {
        switch (bankCode) {
            case BankCode.한국은행:
                setAccountPlaceholder("1234-5678-9012");
                setAccountPattern("^[0-9]{4}-[0-9]{4}-[0-9]{4}$");
                break;
            case BankCode.산업은행:
                setAccountPlaceholder("000-00-000000");
                break;
            case BankCode.기업은행:
                setAccountPlaceholder("000-00-0000000");
                break;
            case BankCode.국민은행:
                break;
            case BankCode.외환은행:
                break;
            case BankCode.수협중앙회:
                break;
            case BankCode.수출입은행:
                break;
            case BankCode.농협중앙회:
                break;
            case BankCode.지역농축협:
                break;
            case BankCode.우리은행:
                break;
            case BankCode.SC은행:
                break;
            case BankCode.한국씨티은행:
                break;
            case BankCode.새마을금고중앙회:
                break;
            case BankCode.신협중앙회:
                break;
            case BankCode.우체국:
                break;
            case BankCode.하나은행:
                break;
            case BankCode.신한은행:
                break;
            case BankCode.카카오뱅크:
                break;
            case BankCode.토스뱅크:
                break;

        }
    }, []);*/


    const onClickButton = () => {

        const account: AccountModel = {
            userId: user.id!,
            bankTranId: bankTranId,
            bankCode: bankCode,
            bankName: bankName,
            accountName: user.name!,
            accountNumber: "111-222-3333",
            bankRspCode: "000",
            bankTranDate: new Date(),
            bankRspMessage: "너무멋져용~!",
        };

        sessionStorage.setItem("account", JSON.stringify(account));

        window.location.href = `${AUTH_URL}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPE)}&state=${STATE}&auth_type=${AUTH_TYPE}`;
    };


    return (
        <div className="space-y-10 sm:space-y-12">
            <h2 className="text-2xl sm:text-3xl font-semibold">계좌 정보</h2>
            <Suspense fallback={<div className="flex h-screen items-center justify-center">
                <div className="text-center">
                    <svg
                        className="animate-spin h-12 w-12 text-indigo-600 mx-auto mb-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                        />
                    </svg>
                    <h2 className="text-2xl font-semibold text-indigo-600">Loading...</h2>
                </div>
            </div>}>
                <AccountDetails user={user} onClick={onClickButton}/>
            </Suspense>
        </div>
    );
}
