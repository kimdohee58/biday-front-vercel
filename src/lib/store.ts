import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/user.slice';
import productsSlice from "@/lib/features/products.slice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            user: userSlice,
            products: productsSlice,
        },
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];