//src/lib/features/user.slice.ts

import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from '@/lib/store'
import {initialUser, UserModel } from '@/model/user/user.model';
import {initialUserToken, UserToken} from "@/model/user/userToken";
import {AddressModel} from "@/model/user/address.model";

export interface UserState {
    user: UserModel;
    token: string | null;
    userInfo : UserToken;
    addresses: AddressModel[];  // 주소 정보를 별도로 관리
}

const initialState: UserState = { // 초기 상태
    user: initialUser,
    token: null,
    userInfo: initialUserToken,
    addresses: [],
};

// 로그인을 해서 리턴을 해서 사용을
// saveUser 메서드(액션)는 유저 정보와 토큰을 한 번에 저장을 한다.
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        saveUser: (state, action: PayloadAction<{ user: UserModel, token: string }>) => {
            console.log("유저슬라이스 유저정보 리덕스에 저장 : " , saveUser)
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        saveUserToken: (state, action: PayloadAction<{userInfo:UserToken}>) => {
            state.userInfo = action.payload.userInfo;
        },
        clearUser: (state) => {
            state.user = initialUser;
            state.token = null;
            state.userInfo = initialUserToken;
        },
        addAddress: (state, action: PayloadAction<AddressModel>) => {
            // 주소 배열에 새 주소 추가
            if (state.addresses) {
                state.addresses.push(action.payload);
            }
        },
        removeAddress: (state, action: PayloadAction<string>) => {
            state.addresses = state.addresses.filter(address => address.id !== action.payload);  // 특정 주소 삭제
        },
        updatePickAddress: (state, action: PayloadAction<string>) => {
            state.addresses = state.addresses.map(address =>
                address.id === action.payload ? { ...address, pick: true } : { ...address, pick: false });
        },
    },
});


// 액션과 셀렉터를 export
export const {saveUser, clearUser, saveUserToken, addAddress, removeAddress, updatePickAddress} = userSlice.actions;
export const getUser = (state: RootState) => state.user.user;
export const getToken = (state: RootState) => state.user.token;
export const getUserToken = (state: RootState) => state.user.userInfo;
export const getAddresses = (state: RootState) => state.user.addresses; // 주소 셀렉터 추가
export default userSlice.reducer;


