"use client"

import React, {ChangeEvent, useState} from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import {Input, Select, Typography,} from "@material-tailwind/react";
import {AccountModel} from "@/model/user/account.model";
import {useMutation, useQuery} from "@tanstack/react-query";
import useRandomId from "@/hooks/useRandomId";
import {getAccount, saveAccount} from "@/service/user/account.service";
import Cookies from "js-cookie";


const getUserToken = () => {
    const userToken = Cookies.get("userToken");
    if (!userToken) {
        throw new Error('');
        //TODO error enum
    }

    return JSON.parse(userToken);
}

async function AccountDetails({accountData, userName}) {
    if (!accountData || Object.keys(accountData).length === 0) {
        return (
            <div>
                <div>
                    계좌 정보가 존재하지 않습니다.
                    <br/>
                    계좌를 등록하고 판매를 시작해 보세요.
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col mt-8">
            <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
                <div className="w-full">
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 font-medium"
                    >
                        이름
                    </Typography>
                    <Input
                        size="lg"
                        value={userName}
                        labelProps={{
                            className: "hidden",
                        }}
                        disabled
                        className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                    />
                </div>
                <div className="w-full">
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 font-medium"
                    >
                        생년월일
                    </Typography>
                    <Input
                        size="lg"
                        placeholder="Roberts"
                        labelProps={{
                            className: "hidden",
                        }}
                        value={"990919"}
                        disabled
                        className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                    />
                </div>
            </div>
            <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
                <div className="w-full">
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 font-medium"
                    >
                        은행
                    </Typography>
                    <Select
                        size="lg"
                        labelProps={{
                            className: "hidden",
                        }}
                        className="border-t-blue-gray-200 aria-[expanded=true]:border-t-primary"
                        disabled
                        value={accountData.bankName}
                    >
                        {accountData.bankName}
                    </Select>
                </div>
                <div className="w-full">
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 font-medium"
                    >
                        계좌번호
                    </Typography>
                    <Input
                        size="lg"
                        labelProps={{
                            className: "hidden",
                        }}
                        disabled
                        value={accountData.accountNum}
                        className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                    />
                </div>
            </div>
        </div>
    );
}


export default function Account1() {
    const [bankCode, setBankCode] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [birth, setBirth] = useState<string>("");
    const [accountNum, setAccountNum] = useState("");
    const [bankName, setBankName] = useState("");
    const bankTranId = useRandomId(16);

    const AUTH_URL = 'https://testapi.openbanking.or.kr/oauth/2.0/authorize';
    const CLIENT_ID = 'fce251a9-d76a-449c-8024-021ec51dc4eb';
    const REDIRECT_URI = 'http://localhost:3000/callback';
    const SCOPE = 'login inquiry transfer';
    const STATE = '12341234123412341234123412341234';
    const AUTH_TYPE = '0';

    const accountData = useQuery({queryKey: ["account"], queryFn: () => getAccount()});
    const user = getUserToken();

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

    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const onChangeBankCode = (value: string) => {
        const [selectedKey, selectedValue] = value.split(':');
        setBankCode(selectedValue);
        setBankName(selectedKey);
    };

    const onChangeBirth = (e: ChangeEvent<HTMLInputElement>) => {
        setBirth(e.target.value);
    }

    const onChangeAccountNum = (e: ChangeEvent<HTMLInputElement>) => {
        setAccountNum(e.target.value);
    }

    const mutation = useMutation({
        mutationFn: saveAccount
    });

    const handleLogin = () => {
        savedAccount();
        window.location.href = `${AUTH_URL}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPE)}&state=${STATE}&auth_type=${AUTH_TYPE}`;
    };

    const savedAccount = () => {
        const account: AccountModel = {
            userId: user.userId,
            bankTranId: bankTranId,
            bankCode: bankCode,
            bankName: bankName,
            accountName: name,
            accountNum: accountNum,
            bankRspCode: "000",
            bankTranDate: new Date(),
            bankRspMessage: "너무멋져용~!",
        };

        mutation.mutate(account);
    };

    return (
        <div className="space-y-10 sm:space-y-12">
            <h2 className="text-2xl sm:text-3xl font-semibold">계좌 정보</h2>
            <AccountDetails accountData={accountData.data} userName={user.userName}/>
            {accountData.data && Object.keys(accountData.data).length === 0 && (
                <ButtonPrimary onClick={handleLogin}>
                    판매자 등록
                </ButtonPrimary>
            )}
        </div>
    );
}
