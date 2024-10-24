"use client";

import React, { useEffect, useState } from "react";
import { ProductModel, ProductWithImageModel } from "@/model/product/product.model";
import TabFiltersProduct from "@/components/dohee/TabFiltersProduct";
import Pagination from "@/shared/Pagination/Pagination";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import SectionSliderCollections from "@/components/SectionSliderLargeProduct";
import SectionPromo1 from "@/components/SectionPromo1";
import ProductCard from "@/components/ProductCard3";
import { fetchAllProductsWithImages } from "@/service/product/product.service";
import { defaultImage } from "@/model/ftp/image.model";

export default function PageCollection({ params }: { params: { filter: string } }) {
    const itemsPerPage = 20;
    const [products, setProducts] = useState<ProductModel[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<ProductModel[]>([]);
    const [productsWithImages, setProductsWithImages] = useState<ProductWithImageModel[]>([]);

    const [selectedPrices, setSelectedPrices] = useState<number[]>([100000, 500000]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<string>("");

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const selectedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const productsWithImagesData = await fetchAllProductsWithImages();
                const productsArray = productsWithImagesData.map((item) => item.product);
                setProducts(productsArray);
                setFilteredProducts(productsArray);
                setProductsWithImages(productsWithImagesData);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        loadProducts();
    }, []);

    useEffect(() => {
        let filtered = products;

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

        setFilteredProducts(filtered);
    }, [selectedPrices, selectedColors, selectedBrands, selectedOrder, products]);

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

    const getProductImage = (item: ProductModel): string => {
        const productImage = productsWithImages.find((img) => img.product.id === item.id);
        return productImage && productImage.image ? productImage.image.uploadUrl : defaultImage.uploadUrl;
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
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
                            {params.filter ? params.filter.charAt(0).toUpperCase() + params.filter.slice(1) : ""}
                        </h2>
                    </div>
                    <hr className="border-slate-200 dark:border-slate-700" />
                    <main>
                        <TabFiltersProduct
                            selectedPrices={selectedPrices}
                            selectedBrands={selectedBrands}
                            selectedColors={selectedColors}
                            selectedOrder={selectedOrder}
                            onFilterChange={handleFilterChange}
                        />
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-8 gap-y-10 mt-8 lg:mt-10">
                            {selectedProducts.map((item) => (
                                <ProductCard data={item} image={getProductImage(item)} key={item.id} />
                            ))}
                        </div>
                        <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
                            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                            <ButtonPrimary loading>Show me more</ButtonPrimary>
                        </div>
                    </main>
                </div>
                <hr className="border-slate-200 dark:border-slate-700" />
                <SectionSliderCollections />
                <hr className="border-slate-200 dark:border-slate-700" />
                <SectionPromo1 />
            </div>
        </div>
    );
}