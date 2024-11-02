import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from '@/lib/store'
import {initialUser, UserModel, UserRole} from '@/model/user/user.model';
import {initialUserToken, UserToken} from "@/model/user/userToken";
import {AddressModel} from "@/model/user/address.model";

export interface UserState {
    user: UserModel;
    token: string | null;
    userInfo : UserToken;
    addresses: AddressModel[];
}

const initialState: UserState = {
    user: initialUser,
    token: null,
    userInfo: initialUserToken,
    addresses: [],
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        saveUser: (state, action: PayloadAction<{ user: UserModel, token: string }>) => {
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
            if (state.addresses) {
                state.addresses.push(action.payload);
            }
        },
        removeAddress: (state, action: PayloadAction<string>) => {
            state.addresses = state.addresses.filter(address => address.id !== action.payload);
        },
        updatePickAddress: (state, action: PayloadAction<string>) => {
            state.addresses = state.addresses.map(address =>
                address.id === action.payload ? { ...address, pick: true } : { ...address, pick: false });
        },
        updateRole(state, action: PayloadAction<UserRole>) {
            state.userInfo.userRole = action.payload;
            state.user.role = action.payload;
        },
    },
});


export const {saveUser, clearUser, saveUserToken, addAddress, removeAddress, updatePickAddress, updateRole} = userSlice.actions;
export const getUser = (state: RootState) => state.user.user;
export const getToken = (state: RootState) => state.user.token;
export const getUserToken = (state: RootState) => state.user.userInfo;
export const getAddresses = (state: RootState) => state.user.addresses;
export default userSlice.reducer;