import {configureStore} from '@reduxjs/toolkit';
import userSlice from '@/lib/features/user.slice';
import productSlice from "@/lib/features/product.slice";
import wishSlice from "@/lib/features/wish.slice";
import addressSlice from "@/lib/features/address.slice";
import categorySlice from "@/lib/features/category.slice";
import faqSlice from "@/lib/features/faq.slice";
import ratingSlice from "@/lib/features/rating.slice";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
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


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'],
};

const rootReducer = combineReducers({
    user: userSlice,
    product: productSlice,
    wish: wishSlice,
    address: addressSlice,
    category: categorySlice,
    faq: faqSlice,
    rating: ratingSlice,
    products: productSlice,
    productCards: productCardSlice,

});


const persistedReducer
    = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
            ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        }),
    devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

