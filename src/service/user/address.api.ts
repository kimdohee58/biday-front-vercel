// src/service/address/address.api.ts

import { AddressModel } from "@/model/user/address.model";
import {HTTPRequest} from "@/utils/headers";
import {UserToken} from "@/model/user/userToken";


const baseUrl = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/addresses`;

export async function getAddressList(token: string): Promise<AddressModel[]> {
    const response = await fetch(`${baseUrl}/list`, {
        method: 'GET',
        headers: {
            Authorization: token,
            "UserInfo": JSON.stringify({
                // getUser ,
                // userId:userId !!,
                // userName:userName !!,
                // userRole:userRole
            })
        },
    });
    if (!response.ok) {
        throw new Error('주소를 불러오는 중 오류 발생');
    }
    return response.json();
}

export async function insertAddress(userToken: UserToken, address: AddressModel): Promise<void> {

    // userRole이 배열인 경우 첫 번째 요소만 추출해서 문자열로 변환
    const userInfo = {
        ...userToken,
        userRole: Array.isArray(userToken.userRole) ? userToken.userRole[0] : userToken.userRole
    };

    const encodedUserInfo = encodeURIComponent(JSON.stringify(userInfo));
    console.log('Encoded UserInfo:', encodedUserInfo);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/addresses/insert`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'UserInfo': encodedUserInfo,  // 인코딩된 userInfo 헤더로 전송
        },
        body: JSON.stringify(address),  // 주소 데이터를 body에 담아 전송
    });

    if (!response.ok) {
        throw new Error('주소 등록 중 오류 발생');
    }

    return response.json();
}

// 특정 주소 선택하기
export async function pickAddress(token: string, addressId: number): Promise<string> {
    const response = await fetch(`${baseUrl}/pick?id=${String(addressId)}`, {
        method: 'PUT',
        headers: {
            Authorization: token,
        },
    });

    if (!response.ok) {
        throw new Error('주소 선택 중 오류 발생');
    }
    return response.json();
}

// 특정 주소 삭제하기
export async function deleteAddress(token: string, addressId: number): Promise<boolean> {
    const response = await fetch(`${baseUrl}/deleteById?id=${String(addressId)}`, {
        method: 'DELETE',
        headers: {
            Authorization: token,
        },
    });
    if (!response.ok) {
        throw new Error('주소 삭제 중 오류 발생');
    }
    return true;
}

