import {ProductCardModel} from "@/model/product/product.model";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "@/lib/store";
import {getRandomItems} from "@/utils/productUtils";

interface ProductCardState {
    productCards: ProductCardModel[];
    randomCategoryProducts: { [key: string]: ProductCardModel[] };
}

const initialState: ProductCardState = {
    productCards: [],
    randomCategoryProducts: {},
};

const productCardSlice = createSlice({
    name: 'productCards',
    initialState,
    reducers: {
        setProductCards: (state, action: PayloadAction<ProductCardModel[]>) => {
            state.productCards = action.payload;
        },
        updateIsLiked(state, action: PayloadAction<number>) {
            const product = state.productCards.find(product => product.product.id === action.payload);
            if (product) {
                product.isLiked = true;
            }
        },
        setRandomCategoryProducts: (state, action: PayloadAction<string>) => {
            const category = action.payload.toLowerCase();
            const filteredProducts = state.productCards.filter(product => product.product.category.toLowerCase() === category);
            state.randomCategoryProducts[category] = getRandomItems(filteredProducts, 5);
        },
    }
})


export const { setProductCards, updateIsLiked, setRandomCategoryProducts } = productCardSlice.actions;
export const getProductCards = (state: RootState) => state.productCards.productCards;
export const getRandomCategoryProducts = (category: string) => (state: RootState) => state.productCards.randomCategoryProducts[category];
export default productCardSlice.reducer;