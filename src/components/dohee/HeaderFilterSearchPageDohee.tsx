"use client";

import React, { FC, useEffect, useState } from "react";
import Nav from "@/shared/Nav/Nav";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import { Transition } from "@/app/headlessui";
import TabFiltersProduct from "@/components/dohee/TabFiltersProduct";
import { ProductModel } from "@/model/product/product.model";

export interface HeaderFilterSearchPageProps {
    className?: string;
    products: ProductModel[];
    onFilteredProductsChange: (filteredProducts: ProductModel[]) => void;
}

const HeaderFilterSearchPage: FC<HeaderFilterSearchPageProps> = ({
                                                                     className = "mb-12",
                                                                     products,
                                                                     onFilteredProductsChange
                                                                 }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [filteredProducts, setFilteredProducts] = useState<ProductModel[]>(products);
    const [selectedPrices, setSelectedPrices] = useState<number[]>([100000, 500000]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<string>("");

    useEffect(() => {
        console.log('Received products:', products);
    }, [products]);

    useEffect(() => {
        const applyFilters = () => {
            let filtered = [...products];

            if (selectedPrices[0] !== null || selectedPrices[1] !== null) {
                filtered = filtered.filter((product) => {
                    const price = product.price;
                    return (
                        (selectedPrices[0] === null || price >= selectedPrices[0]) &&
                        (selectedPrices[1] === null || price <= selectedPrices[1])
                    );
                });
            }

            if (selectedColors.length > 0) {
                filtered = filtered.filter((product) =>
                    selectedColors.some((color) => product.color.toLowerCase().trim() === color.toLowerCase().trim())
                );
            }

            if (selectedBrands.length > 0) {
                filtered = filtered.filter((product) =>
                    selectedBrands.some((brand) => product.brand.toLowerCase().trim() === brand.toLowerCase().trim())
                );
            }

            if (selectedOrder) {
                filtered = sortProductsByOrder(filtered, selectedOrder);
            }

            if (JSON.stringify(filtered) !== JSON.stringify(filteredProducts)) {
                setFilteredProducts(filtered);
                onFilteredProductsChange(filtered);
            }
        };

        applyFilters();
    }, [products, selectedPrices, selectedBrands, selectedColors, selectedOrder]);

    const sortProductsByOrder = (products: ProductModel[], order: string): ProductModel[] => {
        switch (order) {
            case "newest":
                return [...products].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            case "oldest":
                return [...products].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
            case "price-low-to-high":
                return [...products].sort((a, b) => a.price - b.price);
            case "price-high-to-low":
                return [...products].sort((a, b) => b.price - a.price);
            case "wishlist-low-to-high":
                return [...products].sort((a, b) => a.wishes - b.wishes);
            case "wishlist-high-to-low":
                return [...products].sort((a, b) => b.wishes - a.wishes);
            default:
                return products;
        }
    };

    const handleFilterChange = (newSelectedPrices: number[], newSelectedBrands: string[], newSelectedColors: string[], newSelectedOrder: string) => {
        setSelectedPrices(newSelectedPrices);
        setSelectedBrands(newSelectedBrands);
        setSelectedColors(newSelectedColors);
        setSelectedOrder(newSelectedOrder);

        console.log('Selected Prices:', newSelectedPrices);
        console.log('Selected Brands:', newSelectedBrands);
        console.log('Selected Colors:', newSelectedColors);
        console.log('Selected Order:', newSelectedOrder);
    };

    return (
        <div className={`flex flex-col relative ${className}`}>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-6 lg:space-y-0 lg:space-x-2">
                <Nav className="sm:space-x-2" containerClassName="relative flex w-full overflow-x-auto text-sm md:text-base hiddenScrollbar" />
                <span className="block flex-shrink-0 text-right">
                    <ButtonPrimary
                        className="w-auto !pr-16"
                        sizeClass="pl-4 py-2.5 sm:pl-6"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <svg className={`w-4 h-4 sm:w-6 sm:h-6`} viewBox="0 0 24 24" fill="none" />
                        <span className="block truncate ml-2.5">Filter</span>
                        <span className="absolute top-1/2 -translate-y-1/2 right-5">
                            <ChevronDownIcon
                                className={`w-4 h-4 sm:w-5 sm:h-5 ${isOpen ? "rotate-180" : ""}`}
                                aria-hidden="true"
                            />
                        </span>
                    </ButtonPrimary>
                </span>
            </div>

            <Transition
                show={isOpen}
                as={"div"}
                enter="transition-opacity duration-150"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="w-full border-b border-neutral-200/70 dark:border-neutral-700 my-8"></div>
                <TabFiltersProduct
                    selectedPrices={selectedPrices}
                    selectedBrands={selectedBrands}
                    selectedColors={selectedColors}
                    selectedOrder={selectedOrder}
                    onFilterChange={handleFilterChange}
                />
            </Transition>
        </div>
    );
};

export default HeaderFilterSearchPage;
