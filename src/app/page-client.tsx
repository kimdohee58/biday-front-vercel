"use client";

import React, { useEffect, useState } from "react";
import { ProductModel, ProductWithImageModel } from "@/model/product/product.model";
import { checkTokenAndReissueIfNeeded } from "@/utils/token/token";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import SectionSliderCollections from "@/components/SectionSliderLargeProduct";
import SectionPromo1 from "@/components/SectionPromo1";
import ProductCard from "@/components/ProductCard3";
import { fetchAllProductsWithImages } from "@/service/product/product.service";
import { checkPasswordService } from "@/service/user/user.serivce";
import { defaultImage } from "@/model/ftp/image.model";
import { useRouter } from "next/navigation";
import {useDispatch} from "react-redux";
import {setProductImage} from "@/lib/features/products.slice";

interface ClientComponentProps {
    authorizationToken: string;
}

export default function PageClient({ authorizationToken }: ClientComponentProps) {
    const router = useRouter();
    const dispatch = useDispatch();
    const topItemsToShow = 5;

    const [outerProducts, setOuterProducts] = useState<ProductModel[]>([]);
    const [topProducts, setTopProducts] = useState<ProductModel[]>([]);
    const [bottomProducts, setBottomProducts] = useState<ProductModel[]>([]);
    const [productsWithImages, setProductsWithImages] = useState<ProductWithImageModel[]>([]);

    useEffect(() => {
        checkTokenAndReissueIfNeeded(authorizationToken);
        handleCheckPassword();
        loadProductsByCategory("outer", setOuterProducts);
        loadProductsByCategory("top", setTopProducts);
        loadProductsByCategory("bottom", setBottomProducts);
    }, [authorizationToken]);

    const loadProductsByCategory = async (category: string, setProducts: React.Dispatch<React.SetStateAction<ProductModel[]>>) => {
        try {
            const productsWithImagesData = await fetchAllProductsWithImages();
            const productsArray = productsWithImagesData.map((item) => item.product);

            dispatch(setProductImage(productsArray));
            setProducts(
                productsArray
                    .filter((product) => product.category.toLowerCase().includes(category))
                    .sort((a, b) => b.wishes - a.wishes) // 또는 createdAt으로 정렬 가능
                    .slice(0, topItemsToShow)
            );
            setProductsWithImages(productsWithImagesData);
        } catch (error) {
            console.error(`Error loading ${category} products:`, error);
        }
    };


    const getProductImage = (item: ProductModel): string => {
        const productImage = productsWithImages.find(img => img.product.id === item.id);
        return productImage && productImage.image ? productImage.image.uploadUrl : defaultImage.uploadUrl;
    };

    const handleCheckPassword = async () => {
        try {
            const isPasswordSame = await checkPasswordService();
            if (isPasswordSame) {
                alert("이메일과 비밀번호가 동일합니다. 비밀번호를 변경해 주세요.");
            }
        } catch (error) {
            console.error("Password check error:", error);
        }
    };

    const handleShowMoreClick = (filter: string) => {
        router.push(`/${filter.toLowerCase()}`);
    };

    return (
        <div className="nc-PageCollection">
            <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
                <main>
                    {/* Outer Products Section */}
                    <ProductSection
                        title="Outer"
                        products={outerProducts}
                        onShowMoreClick={() => handleShowMoreClick("outer")}
                        getProductImage={getProductImage}
                    />

                    {/* Top Products Section */}
                    <ProductSection
                        title="Top"
                        products={topProducts}
                        onShowMoreClick={() => handleShowMoreClick("top")}
                        getProductImage={getProductImage}
                    />

                    {/* Bottom Products Section */}
                    <ProductSection
                        title="Bottom"
                        products={bottomProducts}
                        onShowMoreClick={() => handleShowMoreClick("bottom")}
                        getProductImage={getProductImage}
                    />
                </main>

                <hr className="border-slate-200 dark:border-slate-700" />

                <SectionSliderCollections />
                <hr className="border-slate-200 dark:border-slate-700" />

                <SectionPromo1 />
            </div>
        </div>
    );
}

// ProductSection 컴포넌트 (반복되는 섹션을 컴포넌트화)
const ProductSection = ({
                            title,
                            products,
                            onShowMoreClick,
                            getProductImage,
                        }: {
    title: string;
    products: ProductModel[];
    onShowMoreClick: () => void;
    getProductImage: (item: ProductModel) => string;
}) => {
    return (
        <div className="mt-10">
            <div className="space-y-10 lg:space-y-14">
                <div className="flex justify-between items-center w-full">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">{title}</h2>
                    <ButtonPrimary onClick={onShowMoreClick}>Show More</ButtonPrimary>
                </div>
            </div>
            <hr className="mt-4 border-slate-200 dark:border-slate-700" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-8 gap-y-10 mt-8 lg:mt-10">
                {products.map((item) => (
                    <ProductCard data={item} image={getProductImage(item)} key={item.id} />
                ))}
            </div>
        </div>
    );
};
