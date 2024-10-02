import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {initialUser, UserModel} from "@/model/UserModel";
import type {RootState} from "../store";

export const userSlice = createSlice({
    name: 'user',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState : initialUser,
    reducers: {
        saveUser: (state, action) => {
            return action.payload;
        },
        clearUser: (state) => {
            return initialUser;
        },
    }, /*setter*/
    extraReducers: (builder) => {

    },
})

export const getUser = (state: RootState) => state.user;

// Other code such as selectors can use the imported `RootState` type
export const {saveUser, clearUser} = userSlice.actions;

export default userSlice.reducer;