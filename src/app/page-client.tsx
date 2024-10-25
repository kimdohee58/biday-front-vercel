"use client";

import React, {useEffect} from "react";
import {ProductCardModel} from "@/model/product/product.model";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import SectionSliderCollections from "@/components/SectionSliderLargeProduct";
import SectionPromo1 from "@/components/SectionPromo1";
import ProductCard from "@/components/ProductCard";
import {useRouter} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import {
    getProductCards, getRandomCategoryProducts,
    setProductCards,
    setRandomCategoryProducts,
    updateIsLiked
} from "@/lib/features/productCard.slice";
import {useWishlist} from "@/lib/hooks/react-query/useWishlist";
import {ProductCardSkeleton} from "@/components/skeleton/ProductCardSkeleton";

interface ClientComponentProps {
    authorizationToken: string;
    products: ProductCardModel[];
}

function RandomProductsByCategory({category}: { category: string }) {
    const dispatch = useDispatch();
    const router = useRouter();
    const products = useSelector(getRandomCategoryProducts(category));

    useEffect(() => {
        dispatch(setRandomCategoryProducts(category));
    }, [category, dispatch]);

    const handleShowMoreClick = (filter: string) => {
        router.push(`/${filter.toLowerCase()}`);
    };

    return (
        <div className="mt-10">
            <div className="space-y-10 lg:space-y-14">
                <div className="flex justify-between items-center w-full">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">{category}</h2>
                    <ButtonPrimary onClick={() => handleShowMoreClick(category)}>Show More</ButtonPrimary>
                </div>
            </div>
            <hr className="mt-4 border-slate-200 dark:border-slate-700"/>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-8 gap-y-10 mt-8 lg:mt-10">
                {products && products.length > 0 ? (
                    products.map((product) => (
                        <ProductCard key={product.product.id} {...product} />
                    ))
                ) : (
                    [...Array(5)].map((_, index) => (
                        <ProductCardSkeleton key={index}/>
                    ))
                )}
            </div>
        </div>
    );
}

export default function PageClient({products}: ClientComponentProps) {
    const dispatch = useDispatch();
    const productsInRedux = useSelector(getProductCards);
    const categoryArray = ["outer", "top", "bottom"];
    const [isLoading, setIsLoading] = React.useState(true);

    useEffect(() => {
        if (productsInRedux.length === 0 && products.length > 0) {
            dispatch(setProductCards(products));
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    }, [productsInRedux, products, dispatch]);

    const {data: wishList, isLoading: isWishLoading, isError} = useWishlist();

    useEffect(() => {
        if (wishList && !isWishLoading && !isError) {
            wishList.forEach((wish) => {
                dispatch(updateIsLiked(wish.product.id));
            })
        }
    }, [wishList, isWishLoading, isError]);

    if (isLoading) {
        return (
            <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-8 gap-y-10 mt-8 lg:mt-10">
                    {[...Array(5)].map((_, index) => (
                        <ProductCardSkeleton key={index}/>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="nc-PageCollection">
            <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
                <main>
                    {categoryArray.map((category) => (
                        <RandomProductsByCategory key={category} category={category}/>
                    ))}
                </main>

                <hr className="border-slate-200 dark:border-slate-700"/>

                <SectionSliderCollections/>
                <hr className="border-slate-200 dark:border-slate-700"/>

                <SectionPromo1/>
            </div>
        </div>
    );
}

