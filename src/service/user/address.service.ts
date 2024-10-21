//src/service/user/address.service.ts
import {AddressModel} from "@/model/user/address.model";
import {addressAPI} from "@/api/user/address.api";
import Cookies from "js-cookie";

export async function fetchAllAddressesByUserId(): Promise<AddressModel[]> {
    try {

        const userToken = Cookies.get('userToken');

        if (!userToken) {
            throw new Error("userToken 갖고 올 수 없습니다.")
        }

        const options = {
            userToken : userToken,
        }

        const addressArray: AddressModel[] = await addressAPI.findAllByUserId(options);

        if (addressArray.length === 0) {
            return [];
        }
        return addressArray
    } catch (error){
        console.error("fetchAllAddressesByUserId 에러 발생", error);
        throw new Error("주소 목록을 가져오는 중 에러가 발생했습니다.");
        // TODO error enum
    }
}

export async function fetchPickAddress(addressId: string): Promise<string> {
    try {
        const options = {
            params: {
                id: addressId
            }
        };

        const result = await addressAPI.pickAddress(options);

        return result;

    } catch (error) {
        console.error("fetchPickAddress 에러 발생", error);
        throw new Error("주소 선택 중 에러가 발생했습니다.");
        // TODO error enum
    }
}

export async function fetchAddressCount(userId: string): Promise<number> {
    try {
        const options = {
            params: {
                id: userId
            }
        };

        const count = await addressAPI.countAddresses(options);

        return count;

    } catch (error) {
        console.error("fetchAddressCount 에러 발생", error);
        throw new Error("주소 수를 가져오는 중 에러가 발생했습니다.");
        // TODO error enum
    }
}

export async function fetchDeleteAddress(addressId: string): Promise<void> {
    try {

        const userToken = Cookies.get('userToken');

        if (!userToken) {
            throw new Error("userToken 갖고 올 수 없습니다.")
            // TODO error enum
        }

        const options = {
            userToken : userToken,
            params: {
                id: addressId
            }
        }

        await addressAPI.deleteAddressById(options);

    } catch (error) {
        console.error("fetchDeleteAddress 에러 발생", error);
        throw new Error("주소 삭제 중 에러가 발생했습니다.");
    }
}

export async function fetchInsertAddress(addressData: AddressModel ,): Promise<AddressModel> {
    try {
        const options = {
            data: addressData
        };
        const insertedAddress = await addressAPI.insertAddress(options);

        return insertedAddress;
    } catch (error) {
        console.error("fetchInsertAddress 에러 발생", error);
        throw new Error("주소 등록 중 에러가 발생했습니다.");
        // TODO error enum
    }
}
