"use client";

import React, {useEffect, useState, useMemo} from "react";
import {ProductCardModel} from "@/model/product/product.model";
import TabFiltersProduct from "@/components/dohee/TabFiltersProduct";
import Pagination from "@/shared/Pagination/Pagination";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import SectionSliderCollections from "@/components/SectionSliderLargeProduct";
import SectionPromo1 from "@/components/SectionPromo1";
import ProductCard from "@/components/ProductCard";
import {useDispatch, useSelector} from "react-redux";
import {getCategoryProducts, getProductCards, isProductsInRedux, updateIsLiked} from "@/lib/features/productCard.slice";
import {useWishlist} from "@/hooks/react-query/useWishlist";
import {setProductCards} from "@/lib/features/productCard.slice";
import {useProductCardList} from "@/hooks/react-query/useProductlist";
import Heading from "@/shared/Heading/Heading";

export default function PageCollection({params}: { params: { filter: string } }) {
    const dispatch = useDispatch();

    const productsInRedux = useSelector(isProductsInRedux);
    console.log("productInRedux", productsInRedux);

    const categoryProducts = useSelector(getCategoryProducts(params.filter));
    console.log("categoryProducts", categoryProducts);

    const allProducts = useProductCardList(productsInRedux);
    const [isLoading, setIsLoading] = useState(true);

    const itemsPerPage = 20;
    const [products, setProducts] = useState<ProductCardModel[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<ProductCardModel[]>([]);

    const [selectedPrices, setSelectedPrices] = useState<number[]>([100000, 500000]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<string>("");

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const selectedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    useEffect(() => {
        console.log("첫번째 useEffect 진입")
        if (!productsInRedux && allProducts.data && allProducts.data.length > 0) {
            dispatch(setProductCards(allProducts.data));
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    }, [productsInRedux, allProducts.data, dispatch]);

    useEffect(() => {
        console.log("두번째 useEffect 진입");
        if (categoryProducts.length > 0) {
            setProducts(categoryProducts);
            setFilteredProducts(categoryProducts);
            setIsLoading(false);
        }
    }, [productsInRedux]);

    const {data: wishList, isLoading: isWishLoading, isError} = useWishlist();

    useEffect(() => {
        if (wishList && !isWishLoading && !isError) {
            wishList.forEach((wish) => {
                dispatch(updateIsLiked(wish.product.id));
            });
        }
    }, [wishList, isWishLoading, isError]);

    useEffect(() => {
        let filtered = products;

        if (selectedPrices[0] !== null || selectedPrices[1] !== null) {
            filtered = filtered.filter((product) => {
                const price = product.product.price;
                return (
                    (selectedPrices[0] === null || price >= selectedPrices[0]) &&
                    (selectedPrices[1] === null || price <= selectedPrices[1])
                );
            });
        }

        if (selectedColors.length > 0) {
            filtered = filtered.filter((product) =>
                selectedColors.some((color) => product.product.color.toLowerCase().trim() === color.toLowerCase().trim())
            );
        }

        if (selectedBrands.length > 0) {
            filtered = filtered.filter((product) =>
                selectedBrands.some((brand) => product.product.brand.toLowerCase().trim() === brand.toLowerCase().trim())
            );
        }

        if (selectedOrder) {
            filtered = sortProductsByOrder(filtered, selectedOrder);
        }

        setFilteredProducts(filtered);
    }, [selectedPrices, selectedColors, selectedBrands, selectedOrder, products]);

    const sortProductsByOrder = (products: ProductCardModel[], order: string): ProductCardModel[] => {
        switch (order) {
            case "newest":
                return [...products].sort((a, b) => new Date(b.product.createdAt).getTime() - new Date(a.product.createdAt).getTime());
            case "oldest":
                return [...products].sort((a, b) => new Date(a.product.createdAt).getTime() - new Date(b.product.createdAt).getTime());
            case "price-low-to-high":
                return [...products].sort((a, b) => a.product.price - b.product.price);
            case "price-high-to-low":
                return [...products].sort((a, b) => b.product.price - a.product.price);
            case "wishlist-low-to-high":
                return [...products].sort((a, b) => a.product.wishes - b.product.wishes);
            case "wishlist-high-to-low":
                return [...products].sort((a, b) => b.product.wishes - a.product.wishes);
            default:
                return products;
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleFilterChange = (newSelectedPrices: number[], newSelectedBrands: string[], newSelectedColors: string[], newSelectedOrder: string) => {
        setSelectedPrices(newSelectedPrices);
        setSelectedBrands(newSelectedBrands);
        setSelectedColors(newSelectedColors);
        setSelectedOrder(newSelectedOrder);
    };

    return (
        <div className="nc-PageCollection">
            <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
                <div className="space-y-10 lg:space-y-14">
                    <div className="max-w-screen-sm">
                        <Heading>{params.filter ? params.filter.charAt(0).toUpperCase() + params.filter.slice(1) : ""}</Heading>
                        {/*<h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">*/}
                        {/*    {params.filter ? params.filter.charAt(0).toUpperCase() + params.filter.slice(1) : ""}*/}
                        {/*</h2>*/}
                    </div>
                    <hr className="border-slate-200 dark:border-slate-700"/>
                    <main>
                        <TabFiltersProduct
                            selectedPrices={selectedPrices}
                            selectedBrands={selectedBrands}
                            selectedColors={selectedColors}
                            selectedOrder={selectedOrder}
                            onFilterChange={handleFilterChange}
                        />
                        <div
                            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-8 gap-y-10 mt-8 lg:mt-10">
                            {selectedProducts.map((productCard) => (
                                <ProductCard key={productCard.product.id} {...productCard}/>
                            ))}
                        </div>
                        <div
                            className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
                            <Pagination currentPage={currentPage} totalPages={totalPages}
                                        onPageChange={handlePageChange}/>
                            <ButtonPrimary loading>Show me more</ButtonPrimary>
                        </div>
                    </main>
                </div>
                <hr className="border-slate-200 dark:border-slate-700"/>
                <SectionSliderCollections/>
                <hr className="border-slate-200 dark:border-slate-700"/>
                <SectionPromo1/>
            </div>
        </div>
    );
}