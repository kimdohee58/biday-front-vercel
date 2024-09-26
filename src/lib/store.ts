//src.lib/store.ts
import {configureStore} from '@reduxjs/toolkit';
import userSlice from './features/user.slice';
import productSlice from "@/lib/features/product.slice";
import {createWrapper} from "next-redux-wrapper";
import {thunk} from "redux-thunk";
import wishSlice from "@/lib/features/wish.slice";
import accountSlice from "@/lib/features/account.slice";
import addressSlice from "@/lib/features/address.slice";
import brandSlice from "@/lib/features/brand.slice";
import categorySlice from "@/lib/features/category.slice";
import faqSlice from "@/lib/features/faq.slice";
import loginHistorySlice from "@/lib/features/loginHistory.slice";
import ratingSlice from "@/lib/features/rating.slice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            user: userSlice,
            product: productSlice,
            wish: wishSlice, // 여기서 'wish'로 등록
            account: accountSlice,
            address: addressSlice,
            brand: brandSlice,
            category: categorySlice,
            faq: faqSlice,
            loginHistory:loginHistorySlice,
            rating:ratingSlice,
        },
    });
};
/*이 파일 자체는 컴포넌트가 아니라 Redux 스토어 설정 코드입니다.
Redux 스토어는 애플리케이션의 전역 상태를 관리하기 위한 것이며,
그 자체로는 서버 컴포넌트나 클라이언트 컴포넌트와는 상관이 없습니다.
*/

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export const wrapper = createWrapper(makeStore);


// 리덕스에서 /슬라이스를 사용하는 이유는 유저 슬라이스를 만들었잖아.
// 그 다음에 프로덕트 슬라이스 만들었잖아.
// 슬라이스를 쓰는 이유가 페이지에서만 쓰는거잖아.
// 완성이 안됐잖아. 꼴랑 두개 넣고, 완성이 안된 상태에서 에러가 나오잖아.
// 에러 나왔다고 하니, 유즈 클라이언트 하고, 에러 고치고 또 똘리고,
// 이미 에러가 나올거 다 아니깐,
// 슬라이스는 어떤 페이지에서 슬라이스를 쓰는거잖아.
// 유즈 클라이언트는 당연한거고 슬라이스는