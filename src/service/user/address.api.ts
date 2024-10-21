// src/service/address/address.api.ts

import { AddressModel } from "@/model/user/address.model";
import {UserToken} from "@/model/user/userToken";

const baseUrl = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/addresses`;

export async function insertAddress(userToken: UserToken, address: AddressModel): Promise<void> {

    const userInfo = {
        ...userToken,
        userRole: Array.isArray(userToken.userRole) ? userToken.userRole[0] : userToken.userRole
    };

    const encodedUserInfo = encodeURIComponent(JSON.stringify(userInfo));

    const response = await fetch(`${baseUrl}/insert`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'UserInfo': encodedUserInfo,
        },
        body: JSON.stringify(address),
    });

    if (!response.ok) {
        throw new Error('주소 등록 중 오류 발생');
        // TODO error enum
    }

    return response.json();
}
