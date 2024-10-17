//src/lib/features/user.slice.ts

import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from '@/lib/store'
import {initialUser, UserModel } from '@/model/user/user.model';
import {initialUserToken, UserToken} from "@/model/user/userToken";

export interface UserState {
    user: UserModel;
    token: string | null;
    userInfo : UserToken;
}

const initialState: UserState = { // 초기 상태
    user: initialUser,
    token: null,
    userInfo: initialUserToken
};


// saveUser 메서드(액션)는 유저 정보와 토큰을 한 번에 저장을 한다.
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        saveUser: (state, action: PayloadAction<{ user: UserModel, token: string }>) => {
            state.user = action.payload.user;  // 유저 정보 저장
            state.token = action.payload.token;  // 토큰 저장
        },
        saveUserToken: (state, action: PayloadAction<{  userInfo:UserToken}>) => {
            state.userInfo = action.payload.userInfo;
        },
        clearUser: (state) => {
            state.user = initialUser;  // 유저 정보 초기화
            state.token = null;  // 토큰 초기화
            state.userInfo = initialUserToken; // 유저토큰초기화
        },
    },
});

// 액션과 셀렉터를 export
export const {saveUser, clearUser,saveUserToken} = userSlice.actions;
export const getUser = (state: RootState) => state.user;
export const getToken = (state: RootState) => state.user.token;
export const getUserToken = (state: RootState) => state.user.userInfo;
export default userSlice.reducer;


