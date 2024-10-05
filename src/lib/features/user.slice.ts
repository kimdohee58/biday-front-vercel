import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from '@/lib/store'
import {initialUser, UserModel} from '@/model/UserModel';

export interface UserState {
    user: UserModel;
    token: string | null;
}

const initialState: UserState = {
    user: initialUser,
    token:null,
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
        clearUser: (state) => {
            state.user = initialUser;  // 유저 정보 초기화
            state.token = null;  // 토큰 초기화
        },
    },
});

export const getUser = (state: RootState) => state.user;
export const {saveUser, clearUser} = userSlice.actions;
export const getToken = (state: RootState) => state.user.token;
export default userSlice.reducer;