"use client";

import React, { useEffect, useState } from "react";
import { ProductModel, ProductWithImageModel } from "@/model/product/product.model";
import { useDispatch } from "react-redux";
import { checkTokenAndReissueIfNeeded } from "@/utils/token/token";
import TabFiltersProduct from "@/components/dohee/TabFiltersProduct";
import Pagination from "@/shared/Pagination/Pagination";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import SectionSliderCollections from "@/components/SectionSliderLargeProduct";
import SectionPromo1 from "@/components/SectionPromo1";
import ProductCard from "@/components/ProductCard3";
import { fetchAllProductsWithImages } from "@/service/product/product.service";
import {checkPasswordService} from "@/service/user/user.serivce";

interface ClientComponentProps {
    authorizationToken: string;
    filter: string; // filter를 추가
}

export default function ClientComponent({ authorizationToken, filter }: ClientComponentProps) {
    const dispatch = useDispatch();

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
    const startIndex = (currentPage - 1) * itemsPerPage;
    const selectedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    const loadProducts = async () => {
        try {
            const productsWithImagesData = await fetchAllProductsWithImages();
            const productsArray = productsWithImagesData.map((item) => item.product); // Assuming the structure has a product field.

            setProducts(productsArray);
            setFilteredProducts(productsArray);
            setProductsWithImages(productsWithImagesData);
        } catch (error) {
            console.error("상품 데이터를 가져오는 중 에러: ", error);
        }
    };

    const handleFilterChange = (newSelectedPrices: number[], newSelectedBrands: string[], newSelectedColors: string[], newSelectedOrder: string) => {
        setSelectedPrices(newSelectedPrices);
        setSelectedBrands(newSelectedBrands);
        setSelectedColors(newSelectedColors);
        setSelectedOrder(newSelectedOrder);
    };
    const getProductImage = (item: ProductModel): string | undefined => {
        const productImage = productsWithImages.find(img => img.product.id === item.id);
        return productImage && productImage.image ? productImage.image.uploadUrl : undefined; // URL로 변환
    };
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleCheckPassword = async () => {
        try {
            const isPasswordSame = await checkPasswordService(); // 비밀번호와 이메일이 같은지 확인
            if (isPasswordSame) {
                alert("이메일과 비밀번호가 동일합니다. 보안을 위해 비밀번호를 변경해 주세요.");
            }
        } catch (error) {
            console.error("비밀번호 확인 오류:", error);
        }
    };


    useEffect(() => {
        loadProducts(); // 상품 데이터 로드
        checkTokenAndReissueIfNeeded(authorizationToken);
        handleCheckPassword();
    }, [authorizationToken]);

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
                selectedColors.some((color) =>
                    product.color.toLowerCase().trim() === color.toLowerCase().trim()
                )
            );
        }

        if (selectedBrands.length > 0) {
            filtered = filtered.filter((product) =>
                selectedBrands.some((brand) =>
                    product.brand.toLowerCase().trim() === brand.toLowerCase().trim()
                )
            );
        }

        if (selectedOrder) {
            switch (selectedOrder) {
                case "newest":
                    filtered = filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                    break;
                case "oldest":
                    filtered = filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
                    break;
                case "price-low-to-high":
                    filtered = filtered.sort((a, b) => a.price - b.price);
                    break;
                case "price-high-to-low":
                    filtered = filtered.sort((a, b) => b.price - a.price);
                    break;
                case "wishlist-low-to-high":
                    filtered = filtered.sort((a, b) => a.wishes - b.wishes);
                    break;
                case "wishlist-high-to-low":
                    filtered = filtered.sort((a, b) => b.wishes - a.wishes);
                    break;
                default:
                    break;
            }
        }

        setFilteredProducts(filtered);
    }, [selectedPrices, selectedColors, selectedBrands, selectedOrder, products]);

    return (
        <div className="nc-PageCollection">
            <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
                <div className="space-y-10 lg:space-y-14">
                    <hr className="border-slate-200 dark:border-slate-700" />
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
                            {selectedProducts.map((item, index) => (
                                <ProductCard data={item} image={getProductImage(item)} key={index} />
                            ))}
                        </div>
                        <div
                            className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
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
