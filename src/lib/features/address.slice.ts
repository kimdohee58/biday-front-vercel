// src/lib/features/address.slice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/lib/store';
import {AddressModel} from "@/model/user/address.model";

// AddressState 인터페이스 정의
interface AddressState {
    addresses: AddressModel[];
}

const initialState: AddressState = {
    addresses: [],  // 초기값으로 빈 주소 목록을 사용
};

const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {
        setAddresses: (state, action: PayloadAction<AddressModel[]>) => {
            state.addresses = action.payload;
        },
        addAddress: (state, action: PayloadAction<AddressModel>) => {
            state.addresses.push(action.payload);
        },
        removeAddress: (state, action: PayloadAction<string>) => {
            state.addresses = state.addresses.filter(address => address.userId !== action.payload);
        },
        clearAddresses:(state)=>{
            state.addresses = [];// 모든 주소 초기화
        }
    },
});

export const { setAddresses, addAddress, removeAddress} = addressSlice.actions;
export const selectAddresses = (state: RootState) => state.address.addresses;
export default addressSlice.reducer;
