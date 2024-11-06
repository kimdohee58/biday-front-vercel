"use client";

import React, {useEffect, useState} from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import SectionSliderLargeProductDohee from "@/components/dohee/SectionSliderLargeProductDohee";
import SectionPromo1 from "@/components/SectionPromo1";
import ProductCard from "@/components/ProductCard";
import {useRouter} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import {
    getRandomCategoryProducts,
    isProductsInRedux,
    setProductCards,
    setRandomCategoryProducts,
    updateIsLiked
} from "@/lib/features/productCard.slice";
import {useWishlist} from "@/hooks/react-query/useWishlist";
import {ProductCardSkeleton} from "@/components/skeleton/ProductCardSkeleton";
import {useProductCardList} from "@/hooks/react-query/useProductlist";
import SectionHero2 from "@/components/SectionHero/SectionHero2";

interface ClientComponentProps {
    authorizationToken: string;
}

function RandomProductsByCategory({category, isLoading}: { category: string, isLoading: boolean }) {
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
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
                        {category ? category.charAt(0).toUpperCase() + category.slice(1) : ""}
                    </h2>
                    <ButtonPrimary onClick={() => handleShowMoreClick(category)}>Show More</ButtonPrimary>
                </div>
            </div>
            <hr className="mt-4 border-slate-200 dark:border-slate-700"/>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-8 gap-y-10 mt-8 lg:mt-10">
                {!isLoading && products && products.length > 0 ? (
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

export default function PageClient(props: ClientComponentProps) {
    const productsInRedux = useSelector(isProductsInRedux);
    const dispatch = useDispatch();
    const categoryArray = ["outer", "top", "bottom", "acc"];
    const [isLoading, setIsLoading] = useState(true);

    const {data: products, isLoading: isProductLoading, isSuccess} = useProductCardList(productsInRedux);
    const {data: wishList, isLoading: isWishLoading, isError} = useWishlist();

    useEffect(() => {
        if (!productsInRedux && isSuccess && products && products.length > 0) {
            dispatch(setProductCards(products));
        }
    }, [productsInRedux, isSuccess, products, dispatch]);

    useEffect(() => {
        if (productsInRedux) {
            setIsLoading(false);
        }
    }, [productsInRedux]);

    useEffect(() => {
        if (wishList && wishList.length > 0 && !isWishLoading && !isError) {
            wishList.forEach((wish) => {
                dispatch(updateIsLiked(wish.product.id));
            });
        }
    }, [wishList, isWishLoading, isError]);

    return (
        <div className="nc-PageCollection">
            <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
                <main>
                    <SectionHero2/>
                    {categoryArray.map((category) => (
                        <RandomProductsByCategory key={category} category={category} isLoading={isLoading}/>
                    ))}
                </main>

                <hr className="border-slate-200 dark:border-slate-700"/>

                {/*<SectionSliderCollections/>*/}
                {/*<SectionSliderLargeProductDohee/>*/}
                {/*<hr className="border-slate-200 dark:border-slate-700"/>*/}

                <SectionPromo1/>
            </div>
        </div>
    );
}
