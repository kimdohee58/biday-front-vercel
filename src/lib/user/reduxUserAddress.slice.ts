import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {initialUser, ReduxUserAddress} from "@/model/redux/store.model";

// Slice 상태 인터페이스 정의
export interface UserState {
    user: ReduxUserAddress;
}

// 초기 상태 정의
const initialState: UserState = {
    user: initialUser,
};

const userSlice = createSlice({
    name: 'user', // Slice 이름
    initialState, // 초기 상태
    reducers: {
        // 유저 정보 저장 액션 (기본값을 설정)
        saveUser: (state, action: PayloadAction<Partial<ReduxUserAddress>>) => {
            state.user = {
                ...state.user, // 기존 유저 정보를 유지
                ...action.payload, // 전달된 값으로 업데이트
                role: action.payload.role || state.user.role, // role이 없으면 기존 role을 유지
            };
        },
        // 유저 정보 초기화 액션
        clearUser: (state) => {
            state.user = initialUser;
        },
    },
});


// 액션과 리듀서를 export
export const { saveUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
