//src/lib/features/user.slice.ts

import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from '@/lib/store'
import {initialUser, UserModel} from '@/model/UserModel'
const userSlice = createSlice({
    name: 'user',
    initialState: initialUser, // initialUser를 올바르게 전달
    reducers: {
        saveUser: (state, action: PayloadAction<UserModel>) => {
            return action.payload
        },
        clearUser: (state) => {
            return initialUser
        }
    },
    extraReducers: (builder) => {

    }
});

export const getUser = (state: RootState) => state.user;

export const {saveUser, clearUser} = userSlice.actions;
export default userSlice.reducer;



// 액션이 메서드 기능이고, 스테이트가 속성이다.

// 유즈 슬라이스 여기 있잖아. 셋 유저 클리어 유저 만들었잔항.
// 셋은 세이브 라고 하고 / 세이브 프로덕트 / 이름은 단수형,
// 페이지는 시나리오상으로 이미 결정 되어 있으니 유즈 클라이언트, 익스포트 디폴트 하고 /
// 슬라이스 다 해놓기
// 