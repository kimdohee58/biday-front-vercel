// src/lib/features/address.slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';

// 초기 상태 정의
const initialState: AddressModel = {
    zipcode: '',
    streetaddress: '',
    detailaddress: '',
    type: '',
};

// Slice 생성
const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {
        // 주소 등록
        saveAddress: (state, action: PayloadAction<AddressModel>) => {
            return { ...action.payload }; // 새로운 주소 정보 저장
        },
        // 주소 초기화 (삭제)
        clearAddress: (state) => {
            return initialState; // 주소 정보 초기화
        },
        // 주소 수정
        updateAddress: (state, action: PayloadAction<Partial<AddressModel>>) => {
            return { ...state, ...action.payload }; // 수정된 정보 업데이트
        },
    },
});

// 상태 선택자
export const getAddress = (state: RootState) => state.address;

// 액션 및 리듀서 내보내기
export const { saveAddress, clearAddress, updateAddress } = addressSlice.actions;
export default addressSlice.reducer;
