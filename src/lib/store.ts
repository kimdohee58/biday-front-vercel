//src/lib/store.ts
import {configureStore} from '@reduxjs/toolkit';
import userSlice from '@/lib/features/user.slice';
import productSlice from "@/lib/features/product.slice";
import wishSlice from "@/lib/features/wish.slice";
import accountSlice from "@/lib/features/account.slice";
import addressSlice from "@/lib/features/address.slice";
import brandSlice from "@/lib/features/brand.slice";
import categorySlice from "@/lib/features/category.slice";
import faqSlice from "@/lib/features/faq.slice";
import loginHistorySlice from "@/lib/features/loginHistory.slice";
import ratingSlice from "@/lib/features/rating.slice";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // 기본적으로 localStorage 사용
import { combineReducers } from 'redux';

// redux-persist 설정
const persistConfig = {
    key: 'root',
    storage,      // localStorage 사용
    whitelist: ['user'],  // user만 persist에 저장
};

// 루트 리듀서 정의 (combineReducers 사용)
const rootReducer = combineReducers({
    user: userSlice,
    product: productSlice,
    wish: wishSlice,
    account: accountSlice,
    address: addressSlice,
    brand: brandSlice,
    category: categorySlice,
    faq: faqSlice,
    loginHistory: loginHistorySlice,
    rating: ratingSlice,
});


// persistReducer로 루트 리듀서를 감싸줌
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 스토어 설정 함수
export const makeStore = () => {
    return configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false,  // 직렬화 경고 무시
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
            }),
        devTools: process.env.NODE_ENV !== 'production',  // DevTools 활성화 여부 설정 (production 환경에서는 비활성화)
    });
};

export const store = makeStore();
//export const persistor = typeof window !== 'undefined' ? persistStore(store) : null;
export const persistor = persistStore(store); // 블로그 보고 적은거 ㅇ원래 위에꺼 사용함.
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

