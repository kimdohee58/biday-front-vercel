import React, {ChangeEvent} from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import {accountAPI} from "@/api/user/account.api"
import {Suspense} from "react";
import {DefaultSkeleton} from "@/components/skeleton/DefaultSkeletone"

import {
    Input,
    Typography,
    Select,
    Option,
    Popover,
    PopoverHandler,
    PopoverContent,
} from "@material-tailwind/react";


import {AccountModel, BankCode} from "@/model/user/account.model";
import Cookies from "js-cookie";
import {useMutation, useQuery} from "@tanstack/react-query";
import useRandomId from "@/hooks/useRandomId";
import {getAccount, saveAccount} from "@/service/account/account.api";
import {ApiError} from "@/utils/error";
import {UserToken} from "@/model/user/userToken.model";
import { cookies } from "next/headers";


async function AccountDetails() {

    const accountData = useQuery({queryKey: ["account"], queryFn: () => getAccount()});
    const cookieStore = cookies();
    const userToken = cookieStore.get("userToken");
    if (!userToken) {
        return;
    }

    const user = JSON.parse(userToken.value);

    if (!accountData.data) {
        return (
            <div>
                <div>
                    계좌 정보가 존재하지 않습니다.
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
                        value={user.userName}
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
                        value={accountData.data!.bankName}
                    >
                        {accountData.data!.bankName}
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
                        value={accountData.data!.accountNum}
                        className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                    />
                </div>
            </div>
        </div>
    );

}


export default function Account1() {
    const [date, setDate] = useState();
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

    if (!accountData.isLoading) {
        console.log(accountData.data);
    }

    if (accountData.error) {
        switch (accountData.error.message) {
            case ApiError.NOT_FOUND :
                return (<div>
                    <Typography variant="h5" color="blue-gray">
                        아직 등록된 계좌가 없습니다.
                    </Typography>
                    <Typography
                        variant="small"
                        className="text-gray-600 font-normal mt-1"
                    >
                        계좌를 등록하면 판매를 시작할 수 있습니다.
                    </Typography>
                    <ButtonPrimary> 판매자 등록 </ButtonPrimary>
                </div>);
        }

    }


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
        window.location.href = `${AUTH_URL}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPE)}&state=${STATE}&auth_type=${AUTH_TYPE}`;
    };

    const onClickSubmit = () => {
        const userToken = JSON.parse(localStorage.getItem("userToken")!);

        const account: AccountModel = {
            userId: userToken.userId,
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
            <Typography
                variant="small"
                className="text-gray-600 font-normal mt-1"
            >
                Update your profile information below.
            </Typography>
            <Suspense fallback={<DefaultSkeleton/>}>
                <AccountDetails/>
            </Suspense>
            <ButtonPrimary
                onClick={handleLogin}>판매자 등록</ButtonPrimary>
        </div>
    );
}

export function AccountBilling() {

    return (
        <div className="space-y-10 sm:space-y-12">
            {/* HEADING */}
            <h2 className="text-2xl sm:text-3xl font-semibold">계좌 등록</h2>
            <div className="max-w-2xl prose prose-slate dark:prose-invert">

                <div className="pt-10">
                    <ButtonPrimary>판매자 등록</ButtonPrimary>
                </div>
            </div>
        </div>
    );
}

