//src/lib/features/product.slice.ts

import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Product} from "@/data/data";

export const fetchProducts = createAsyncThunk('products/fetchProducts',async ()=>{
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/products`);
    const data = await response.json();
    console.log("API 데이터 성공 요청", data);
    return data as Product[];
})
interface ProductState {
    products: Product[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: ProductState = {
    products: [],
    status: 'idle',
    error: null,
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        // 동기 작업이 필요하면 여기에 추가를 하라고 함.
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch products';
            });
    },
});

export default productSlice.reducer;