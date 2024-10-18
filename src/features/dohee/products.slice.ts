// // features/dohee/products.slice.ts
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { ProductModel } from '@/model/product/product.model';
//
// // features/dohee/products.slice.ts
// interface ProductsState {
//     products: ProductModel[];  // 빈 배열로 초기화
//     currentPage: number;
//     itemsPerPage: number;
//     isLoading: boolean;
// }
//
// const initialState: ProductsState = {
//     products: [],    // 초기 상태는 빈 배열
//     currentPage: 1,  // 초기 페이지 1
//     itemsPerPage: 20, // 페이지당 아이템 수
//     isLoading: false, // 로딩 상태
// };
//
//
// const productsSlice = createSlice({
//     name: 'products',
//     initialState,
//     reducers: {
//         setProducts(state, action: PayloadAction<ProductModel[]>) {
//             state.products = action.payload;
//         },
//         setLoading(state, action: PayloadAction<boolean>) {
//             state.isLoading = action.payload;
//         },
//         setCurrentPage(state, action: PayloadAction<number>) {
//             state.currentPage = action.payload;
//         },
//     },
// });
//
// export const { setProducts, setLoading, setCurrentPage } = productsSlice.actions;
//
// export default productsSlice.reducer;

// 무한 스크롤 실패