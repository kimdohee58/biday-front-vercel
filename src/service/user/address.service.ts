//src/service/user/address.service.ts
import {AddressModel} from "@/model/user/address.model";
import {addressAPI} from "@/api/user/address.api";
import {RequestOptions} from "@/model/api/RequestOptions";
import Cookies from "js-cookie";
// tsx 이게 컴포넌트이다. ts는 모듈이다.  모듈은 클라이언트, 서버 컴포넌트는 서비스가 불러오는거에 따라 다르다.


export async function fetchAllAddressesByUserId(): Promise<AddressModel[]> {
    try {
        // 클라이언트에서 쿠키 갖고 오기
        const userToken = Cookies.get('userToken');

        if (!userToken) {
            throw new Error("userToken 갖고 올 수 없습니다.")
        }

        const options = {
            userToken : userToken, // 쿠키에서 가져온 userToken을 사용
        }

        const addressArray: AddressModel[] = await addressAPI.findAllByUserId(options);

        if (addressArray.length === 0) {
            console.log("주소를 찾을 수 없습니다.");
            return [];
        }
        return addressArray
    } catch (error){
        console.error("fetchAllAddressesByUserId 에러 발생", error);
        throw new Error("주소 목록을 가져오는 중 에러가 발생했습니다.");
    }
}

export async function fetchPickAddress(addressId: string): Promise<string> {
    try {
        const options = {
            params: {
                id: addressId // 선택한 주소 ID 전달
            }
        };

        const result = await addressAPI.pickAddress(options);
        console.log("Address selected:", result);

        return result;

    } catch (error) {
        console.error("fetchPickAddress 에러 발생", error);
        throw new Error("주소 선택 중 에러가 발생했습니다.");
    }
}

export async function fetchAddressCount(userId: string): Promise<number> {
    try {
        const options = {
            params: {
                id: userId // userId를 쿼리 파라미터로 전달
            }
        };

        const count = await addressAPI.countAddresses(options);
        console.log("Number of addresses:", count);

        return count;

    } catch (error) {
        console.error("fetchAddressCount 에러 발생", error);
        throw new Error("주소 수를 가져오는 중 에러가 발생했습니다.");
    }
}

export async function fetchDeleteAddress(addressId: string): Promise<void> {
    try {

        const userToken = Cookies.get('userToken');

        if (!userToken) {
            throw new Error("userToken 갖고 올 수 없습니다.")
        }

        const options = {
            userToken : userToken, // 쿠키에서 가져온 userToken을 사용
            params: {
                id: addressId // 선택한 주소 ID 전달
            }
        }

        await addressAPI.deleteAddressById(options);
        console.log(`Address with id ${addressId} has been deleted.`);

    } catch (error) {
        console.error("fetchDeleteAddress 에러 발생", error);
        throw new Error("주소 삭제 중 에러가 발생했습니다.");
    }
}

export async function fetchInsertAddress(addressData: AddressModel ,): Promise<AddressModel> {
    try {
        const options = {
            data: addressData // 등록할 주소 데이터를 본문으로 전달
        };

        const insertedAddress = await addressAPI.insertAddress(options);
        console.log("Address inserted:", insertedAddress);

        return insertedAddress;

    } catch (error) {
        console.error("fetchInsertAddress 에러 발생", error);
        throw new Error("주소 등록 중 에러가 발생했습니다.");
    }
}
