//src/lib/features/products.slice.ts
import {initialProduct, ProductModel} from "@/model/product/product.model";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface ProductState{
    products: ProductModel[];
    product:ProductModel | null;
    loading: boolean;
    error: string | null;
}

const initialState: ProductState = {
    products: [],
    product:null,
    loading:false,
    error:null,
};

const productSlice = createSlice({
    name:'product',
    initialState,
    reducers:{
        setProductImage: (state, action: PayloadAction<ProductModel[]>) => {
            state.products = action.payload;
            console.log("저장이 됐는지 확인하는 코드 프로덕트 슬라이스 리덕스 저장 가즈아 상태 : " ,state )
            console.log("저장이 됐는지 확인하는 코드 프로덕트 슬라이스 리덕스 저장 가즈아 액션 : " ,action )
        },
        setProduct:(state, action: PayloadAction<ProductModel>) => {
            state.product = action.payload;
        },
        resetProduct: (state) => {
            state.product = initialProduct;
        },
        setLoading:(state,action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError:(state, action: PayloadAction<string | null>) => {
            state.error = action.payload
        }
    }
})

export const { setProductImage, setProduct, resetProduct, setLoading, setError } = productSlice.actions;
export default productSlice.reducer;