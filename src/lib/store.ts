//src/lib/store.ts
import {configureStore} from '@reduxjs/toolkit';
import userSlice from '@/lib/features/user.slice';
import productSlice from "@/lib/features/product.slice";
import wishSlice from "@/lib/features/wish.slice";
import addressSlice from "@/lib/features/address.slice";
import brandSlice from "@/lib/features/brand.slice";
import categorySlice from "@/lib/features/category.slice";
import faqSlice from "@/lib/features/faq.slice";
import loginHistorySlice from "@/lib/features/loginHistory.slice";
import ratingSlice from "@/lib/features/rating.slice";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // 기본적으로 localStorage 사용
import { combineReducers } from 'redux';
import productCardSlice from "@/lib/features/productCard.slice";

// 무한 스크롤 실패
// import productsReducer from '@/features/dohee/products.slice';
//
// export const storeProduct = configureStore({
//     reducer: {
//         products: productsReducer,
//     },
// });
//
// export type RootStateProduct = ReturnType<typeof storeProduct.getState>;
// export type AppDispatchProduct = typeof storeProduct.dispatch;


// redux-persist 설정
const persistConfig = {
    key: 'root',
    storage,      // localStorage 사용
    whitelist: ['user'],
};

// 루트 리듀서 정의 (combineReducers 사용)
const rootReducer = combineReducers({
    user: userSlice,
    product: productSlice,
    wish: wishSlice,
    address: addressSlice,
    brand: brandSlice,
    category: categorySlice,
    faq: faqSlice,
    loginHistory: loginHistorySlice,
    rating: ratingSlice,
    products: productSlice,
    productCards: productCardSlice,

});


// persistReducer로 루트 리듀서를 감싸줌
const persistedReducer
    = persistReducer(persistConfig, rootReducer);

// 스토어 생성
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,  // 직렬화 경고 무시
            ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        }),
    devTools: process.env.NODE_ENV !== 'production',  // DevTools 활성화 여부 설정 (production 환경에서는 비활성화)
});

// redux-persist에서 사용할 persistor 생성
export const persistor = persistStore(store);

// 타입 정의
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

