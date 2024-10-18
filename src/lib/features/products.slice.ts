//src/lib/features/products.slice.tsㅋ
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
        setProducts: (state, action: PayloadAction<ProductModel[]>) => {
            state.products = action.payload;
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

export const { setProducts, setProduct, resetProduct, setLoading, setError } = productSlice.actions;
export default productSlice.reducer;