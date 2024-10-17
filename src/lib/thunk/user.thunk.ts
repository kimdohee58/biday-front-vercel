//src/lib/thunk/user.thunk.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllAddressesByUserId } from "@/service/user/address.service";
import { AddressModel } from '@/model/user/address.model';
import {setAddresses} from "@/lib/features/address.slice";

// 주소 데이터를 비동기로 불러와서 Redux에 저장하는 Thunk
export const fetchAddresses = createAsyncThunk(

    // 밑에 코드는 Redux의 액션 타입을 나타내는 문자열이다. 서버와의 앤드포인트랑은 상관이 없다.
    // Redux에 Thunk 액션을 구분하는 문자열이다.
    'user/fetchAddresses',
    async (_, { dispatch }) => {
        try {
            const addresses: AddressModel[] = await fetchAllAddressesByUserId();  // 주소 데이터를 서버에서 불러옴
            dispatch(setAddresses(addresses));  // 불러온 주소 데이터를 Redux에 저장
        } catch (error) {
            console.error("주소 불러오기 실패: ", error);
        }
    }
);
