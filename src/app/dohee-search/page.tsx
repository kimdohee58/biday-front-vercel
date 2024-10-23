'use client';
import React, {useEffect, useState} from "react";
import Pagination from "@/shared/Pagination/Pagination";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import SectionSliderCollections from "@/components/SectionSliderLargeProduct";
import SectionPromo1 from "@/components/SectionPromo1";
import ProductCard from "@/components/ProductCard3";
import {ProductModel, ProductWithImageModel} from "@/model/product/product.model";
import {fetchAllProductsWithImages} from "@/service/product/product.service";
import {defaultImage} from "@/model/ftp/image.model";
import {useSearchParams} from 'next/navigation';
import HeaderFilterSearchPageDohee from "@/components/dohee/HeaderFilterSearchPageDohee";

export default function PageSearch() {
    const itemsPerPage = 20;
    const [products, setProducts] = useState<ProductModel[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<ProductModel[]>([]);
    const [productsWithImages, setProductsWithImages] = useState<ProductWithImageModel[]>([]);
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

                // 필터링 로직 추가
                if (keyword) { // keyword가 있을 경우 필터링
                    const lowerCaseKeyword = keyword.toLowerCase(); // 소문자로 변환하여 비교
                    const filtered = productsArray.filter((product) => {
                        return (
                            product.name.toLowerCase().includes(lowerCaseKeyword) ||
                            // product.subName.toLowerCase().includes(lowerCaseKeyword) ||
                            product.description.toLowerCase().includes(lowerCaseKeyword) ||
                            product.color.toLowerCase().includes(lowerCaseKeyword) ||
                            product.brand.toLowerCase().includes(lowerCaseKeyword) ||
                            product.category.toLowerCase().includes(lowerCaseKeyword) ||
                            product.productCode.toLowerCase().includes(lowerCaseKeyword)
                        );
                    });
                    setFilteredProducts(filtered);
                } else {
                    setFilteredProducts(productsArray);
                }

                setProducts(productsArray);
                setProductsWithImages(productsWithImagesData);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        loadProducts();
    }, [keyword]);

    const getProductImage = (item: ProductModel): string => {
        const productImage = productsWithImages.find((img) => img.product.id === item.id);
        return productImage && productImage.image ? productImage.image.uploadUrl : defaultImage.uploadUrl;
    };

    // 페이지 처리
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const selectedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    // const handleFilterChange = (newFilteredProducts) => {
    //     setFilteredProducts(newFilteredProducts); // 필터링된 결과로 업데이트
    //     setCurrentPage(1); // 필터가 변경되면 첫 페이지로 돌아가기
    // };

    return (
        <div className={`nc-PageSearch`} data-nc-id="PageSearch">
            <div
                // className={`nc-HeadBackgroundCommon h-24 2xl:h-28 top-0 left-0 right-0 w-full bg-primary-50 dark:bg-neutral-800/20 `}
                className={`nc-HeadBackgroundCommon h-24 2xl:h-28 top-0 left-0 right-0 w-full`}
            // 배경 색상 제거
            />
            <div className="container">
            <header className="max-w-2xl mx-auto -mt-10 flex flex-col lg:-mt-7 text-center">
            <h1 className="text-4xl font-bold mb-4"> Search Results</h1>
    {/* 글씨 크기 증가 */
    }
    <p className={`text-xl ${keyword ? 'text-gray-700' : 'text-red-500'}`}> {/* 글씨 크기 증가 */}
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
            {/* FILTER */}
            <HeaderFilterSearchPageDohee
                // products={products}
                // onFilterChange={handleFilterChange} // 필터링된 결과를 업데이트하는 함수 전달
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-8 gap-y-10 mt-8 lg:mt-10">
                {selectedProducts.length > 0 ? (
                    selectedProducts.map((item) => (
                        <ProductCard data={item} image={getProductImage(item)} key={item.id}/>
                    ))
                ) : (
                    <p className="text-lg text-red-500">"{keyword}"를 포함한 상품이 없습니다.</p> // 메시지 추가
                )}
            </div>

            {/* PAGINATION */}
            <div
                className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-5 sm:flex-row sm:justify-between sm:items-center">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
                <ButtonPrimary loading>Show me more</ButtonPrimary>
            </div>
        </main>

        {/* === SECTION 5 === */}
        <hr className="border-slate-200 dark:border-slate-700"/>
        <SectionSliderCollections/>
        <hr className="border-slate-200 dark:border-slate-700"/>

        {/* SUBCRIBES */}
        <SectionPromo1/>
    </div>
        </div>
    )
        ;
}
