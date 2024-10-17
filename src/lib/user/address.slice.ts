//src/lib/user/address.slice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AddressModel } from '@/model/user/address.model';
import { fetchAllAddressesByUserId, fetchDeleteAddress, fetchInsertAddress, fetchPickAddress } from '@/service/user/address.service';
import {RootState} from "@/lib/store";

// Thunk for fetching addresses by user ID
export const fetchAddresses = createAsyncThunk(
    'addresses/fetchAll',
    async (_, thunkAPI) => {
        try {
            const addresses = await fetchAllAddressesByUserId();
            return addresses;
        } catch (error) {
            return thunkAPI.rejectWithValue('주소를 불러오는 데 실패했습니다.');
        }
    }
);

interface AddressState {
    addresses: AddressModel[];
}

const initialState: AddressState = {
    addresses: [],
};

const addressSlice = createSlice({
    name: 'addresses',
    initialState,
    reducers: {
        // 주소 추가
        addAddress: (state, action: PayloadAction<AddressModel>) => {
            state.addresses.push(action.payload);
        },
        // 주소 삭제
        removeAddress: (state, action: PayloadAction<string>) => {
            state.addresses = state.addresses.filter(address => address.id !== action.payload);
        },
        // 픽 업데이트
        updatePickAddress: (state, action: PayloadAction<string>) => {
            state.addresses = state.addresses.map(address =>
                address.id === action.payload ? { ...address, pick: true } : { ...address, pick: false }
            );
        },
        // 전체 주소 설정 (fetch 후에 사용)
        setAddresses: (state, action: PayloadAction<AddressModel[]>) => {
            state.addresses = action.payload;
        }
    },
    extraReducers: (builder) => {
        // Thunk 처리: fetchAddresses가 성공적으로 완료되면 상태 업데이트
        builder.addCase(fetchAddresses.fulfilled, (state, action) => {
            state.addresses = action.payload;
        });
        // Thunk 처리 실패 시 에러 처리
        builder.addCase(fetchAddresses.rejected, (state, action) => {
            console.error("주소 불러오기 실패: ", action.payload);
        });
    }
});

// 액션과 셀렉터를 export
export const { addAddress, removeAddress, updatePickAddress, setAddresses } = addressSlice.actions;
export const getAddresses = (state: RootState) => state.address.addresses;  // 리덕스에서 주소 목록 가져오기
export default addressSlice.reducer;
