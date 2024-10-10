//src/utils/token/token.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import {userInfo} from "node:os";
import Cookies from "js-cookie";
import {saveUser} from "@/lib/features/user.slice";
import {UserInfo} from "@/model/user/UserInfo";
import {store} from "@/lib/store";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { returnUrl } = req.query;
        // Your logic to generate token data
        res.status(200).json({
            enc_data: 'example_enc_data',
            token_version_id: 'example_token_version_id',
            integrity_value: 'example_integrity_value'
        });
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

// 유저 정보를 단순 문자열로 결합하여 "커스텀 토큰" 생성
export const createCustomUserToken = (userInfo: UserInfo) => {
    // 유저 정보를 단순 문자열로 결합 (커스텀 토큰)
    const customToken = `${userInfo.id};${userInfo.name};${userInfo.role}`;
    return customToken;
};

export const userToken = (userInfo:UserInfo) => {
    const customToken = createCustomUserToken(userInfo);

    // 쿠키에 저장.
    Cookies.set('userToken', customToken, {
        expires: 7,
        path: "/",
        sameSite: "strict",
    });

    // 리덕스 로컬스토리지에 저장.
    store.dispatch(saveUser({user: userInfo, token: customToken}));

}

