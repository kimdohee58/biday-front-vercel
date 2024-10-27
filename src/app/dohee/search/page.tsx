'use client';
import React, { useEffect, useState } from "react";
import Pagination from "@/shared/Pagination/Pagination";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import SectionSliderCollections from "@/components/SectionSliderLargeProduct";
import SectionPromo1 from "@/components/SectionPromo1";
import ProductCard from "@/components/ProductCard3";
import { ProductModel, ProductWithImageModel } from "@/model/product/product.model";
import { fetchAllProductsWithImages } from "@/service/product/product.service";
import { defaultImage } from "@/model/ftp/image.model";
import { useSearchParams } from 'next/navigation';
import HeaderFilterSearchPageDohee from "@/components/dohee/HeaderFilterSearchPageDohee";

export default function PageSearch() {
    const itemsPerPage = 20;
    const [products, setProducts] = useState<ProductModel[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<ProductModel[]>([]);
    const [productsWithImages, setProductsWithImages] = useState<ProductWithImageModel[]>([]);
    const [tempProducts, setTempProducts] = useState<ProductModel[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const searchParams = useSearchParams();
    const [keyword, setKeyword] = useState<string | null>(null);

    useEffect(() => {
        const keywordParam = searchParams.get("keyword");
        setKeyword(keywordParam);
    }, [searchParams]);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const productsWithImagesData = await fetchAllProductsWithImages();
                const productsArray = productsWithImagesData.map((item) => item.product);

                if (keyword) {
                    const lowerCaseKeyword = keyword.toLowerCase();
                    const filtered = productsArray.filter((product) => {
                        const nameMatches = product.name.toLowerCase().includes(lowerCaseKeyword);
                        const subNameMatches = product.subName && product.subName.includes(keyword);
                        const descriptionMatches = product.description.toLowerCase().includes(lowerCaseKeyword);
                        const colorMatches = product.color.toLowerCase().includes(lowerCaseKeyword);
                        const brandMatches = product.brand.toLowerCase().includes(lowerCaseKeyword);
                        const categoryMatches = product.category.toLowerCase().includes(lowerCaseKeyword);
                        const productCodeMatches = product.productCode.toLowerCase().includes(lowerCaseKeyword);

                        return (
                            nameMatches ||
                            subNameMatches ||
                            descriptionMatches ||
                            colorMatches ||
                            brandMatches ||
                            categoryMatches ||
                            productCodeMatches
                        );
                    });
                    setFilteredProducts(filtered);
                    setTempProducts(filtered);
                } else {
                    setFilteredProducts([]);
                    setTempProducts([]);
                }

                setProducts(productsArray);
                setProductsWithImages(productsWithImagesData);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        loadProducts();
    }, [keyword]);

    console.log("키워드 필터링 리스트:", filteredProducts);

    const getProductImage = (item: ProductModel): string => {
        const productImage = productsWithImages.find((img) => img.product.id === item.id);
        return productImage?.image ? productImage.image.uploadUrl : defaultImage.uploadUrl;
    };

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const selectedProducts = filteredProducts.length > 0
        ? tempProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        : tempProducts;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleFilteredProductsChange = (newFilteredProducts: ProductModel[]) => {
        setTempProducts(newFilteredProducts);
        setCurrentPage(1);
        console.log('필터링된 제품:', newFilteredProducts);
    };

    return (
        <div className={`nc-PageSearch`} data-nc-id="PageSearch">
            <div className={`nc-HeadBackgroundCommon h-24 2xl:h-28 top-0 left-0 right-0 w-full`} />
            <div className="container">
                <header className="max-w-2xl mx-auto -mt-10 flex flex-col lg:-mt-7 text-center">
                    <h1 className="text-5xl font-bold mb-4">Search Results</h1>
                    <p className={`text-3xl ${keyword ? 'text-gray-700' : 'text-red-500'}`}>
                        {keyword ? (
                            <span>Searching for: <strong>{keyword}</strong></span>
                        ) : (
                            <span>No keyword provided.</span>
                        )}
                    </p>
                </header>
            </div>

            <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28">
                <main>
                    <HeaderFilterSearchPageDohee
                        products={filteredProducts}
                        onFilteredProductsChange={handleFilteredProductsChange}
                    />

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-8 gap-y-10 mt-8 lg:mt-10">
                        {selectedProducts.length > 0 ? (
                            selectedProducts.map((item) => (
                                <ProductCard data={item} image={getProductImage(item)} key={item.id} />
                            ))
                        ) : (
                            <>
                                <p className="text-lg text-red-500 text-center mb-4">{keyword}를 포함한 상품이 없습니다.</p>
                                <h2 className="text-lg font-bold text-center mb-4">추천 상품</h2>
                                {products.length > 0 ? (
                                    products.slice(0, 20).map((item) => (
                                        <ProductCard data={item} image={getProductImage(item)} key={item.id} />
                                    ))
                                ) : (
                                    <p className="text-lg text-center">추천 상품이 없습니다.</p>
                                )}
                            </>
                        )}
                    </div>

                    <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-5 sm:flex-row sm:justify-between sm:items-center">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                        <ButtonPrimary loading>Show me more</ButtonPrimary>
                    </div>
                </main>

                <hr className="border-slate-200 dark:border-slate-700" />
                <SectionSliderCollections />
                <hr className="border-slate-200 dark:border-slate-700" />
                <SectionPromo1 />
            </div>
        </div>
    );
}