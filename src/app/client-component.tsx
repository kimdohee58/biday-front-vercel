'use client'; // 클라이언트 컴포넌트

import React, {useEffect, useState} from "react";
import {fetchAllProducts} from "@/service/product/product.service";
import {ProductModel} from "@/model/ProductModel";
import {AuthorizationToken, getCookie, saveToken} from "@/utils/cookie/cookie.api";
import {useDispatch, useSelector} from "react-redux";
import {extractUserInfoFromToken} from "@/utils/jwt.utils";
import {getAddresses, getUser, saveUser} from "@/lib/features/user.slice";
import {findUserById} from "@/service/user/user.api";
import TabFilters from "@/components/TabFilters";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/shared/Pagination/Pagination";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import SectionSliderCollections from "@/components/SectionSliderLargeProduct";
import SectionPromo1 from "@/components/SectionPromo1";
import {setLoading} from "@/lib/features/products.slice";
import {SearchFilter} from "@/model/product/product.model";
import {fetchProducts} from "@/service/product/product.service";
import {useRouter} from "next/navigation";

interface ClientComponentProps {
    authorizationToken: string;
}

export default function ClientComponent({authorizationToken}: ClientComponentProps) {
    const [outerProducts, setOuterProducts] = useState<ProductModel[]>([]);
    const [topProducts, setTopProducts] = useState<ProductModel[]>([]);
    const [bottomProducts, setBottomProducts] = useState<ProductModel[]>([]);
    const dispatch = useDispatch();

    const handleAuthToken = async () => {
        const authToken = authorizationToken
        if (authToken) {
            try {
                saveToken(authToken);
                const { id } = extractUserInfoFromToken(authToken);

                const user = await findUserById(id);
                if (user) {
                    const userData = {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        phoneNum: user.phoneNum,
                        status: user.status ? String(user.status) : "",
                        newPassword: user.newPassword || "",
                    };

                    dispatch(saveUser({user: userData, token: authToken}));  // 유저 정보와 토큰을 Redux에 저장
                    localStorage.setItem("userToken", JSON.stringify(userData));
                }
            } catch (error) {
                console.error("토큰 로그인 실패: ", error);
            }
            AuthorizationToken();
        } else {
            console.log("Authorization 토큰을 찾을 수 없습니다.");
        }
    };

    // category filter 별 api 호출
    const loadOuterProducts = async () => {
        try {
            const searchFilter: SearchFilter = {
                category: "outer"
            };
            const productData = await fetchProducts(searchFilter);
            setOuterProducts(productData);
        } catch (error) {
            console.error("상품 데이터를 가져오는 중 에러: ", error);
        }
    }

    const loadTopProducts = async () => {
        try {
            const searchFilter: SearchFilter = {
                category: "top"
            };
            const productData = await fetchProducts(searchFilter);
            setTopProducts(productData);
        } catch (error) {
            console.error("상품 데이터를 가져오는 중 에러: ", error);
        }
    };

    const loadBottomProducts = async () => {
        try {
            const searchFilter: SearchFilter = {
                category: "bottom"
            };
            const productData = await fetchProducts(searchFilter);
            setBottomProducts(productData);
        } catch (error) {
            console.error("상품 데이터를 가져오는 중 에러: ", error);
        }
    }

    useEffect(() => {
        handleAuthToken(); // 페이지 로드 시 인증 토큰 확인
        loadOuterProducts(); // 상품 데이터 로드
        loadTopProducts();
        loadBottomProducts();
    }, [authorizationToken]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;  // 페이지당 항목 수
    const topItemsToShow = 5;  // 최상단에서 보여줄 항목 수

    // 현재 페이지에 맞는 제품들 가져오기
    const startIndex = (currentPage - 1) * itemsPerPage;

    // 최상단 5개 항목만 표시하고 그 이후 항목은 페이지네이션 적용
    const selectedOuterProducts = outerProducts.slice(0, topItemsToShow);
    const selectedTopProducts = topProducts.slice(0, topItemsToShow);
    const selectedBottomProducts = bottomProducts.slice(0, topItemsToShow);

    // 페이지 처리 클릭 핸들러
    const handlePageChange = (page: number) => {
        console.log("페이지 변경", page)
        setCurrentPage(page);
    };
    const router = useRouter()
    const handleShowMoreClick = (filter: string) => {
        router.push(`/${filter}`);  // 해당 카테고리 페이지로 이동
    };

    // TODO 리덕스에 상품 전체 저장하고 나면 아래 거 고쳐서 프론트에서 fitler 처리
    /*const loadAllProducts = async () => {
        try {
            const productData = await fetchAllProducts();
            const productsArray: ProductModel[] = Array.isArray(productData) ? productData : Object.values(productData);
            console.log("productArray", productsArray)

            setOuterProducts(productsArray.filter((product) => product.category.toLowerCase().includes("outer")).slice(0, 5));
            setTopProducts(productsArray.filter((product) => product.category.toLowerCase().includes("top")).slice(0, 5));
            setBottomProducts(productsArray.filter((product) => product.category.toLowerCase().includes("bottom")).slice(0, 5));
            setBrandProducts(productsArray.filter((product) => product.brand.toLowerCase().includes("esfai")).slice(0, 5));
        } catch (error) {
            console.error("상품 데이터를 가져오는 중 에러: ", error);
        }
    };

    console.log("outer", outerProducts)

    useEffect(() => {
        loadAllProducts();
    }, []);

    const router = useRouter()
    const handleShowMoreClick = (filter: 'outer' | 'top' | 'bottom' | 'brand') => {
        router.push(`/${filter}`)
    };*/

    // 사진 제외 다 됨
    return (
        <div className={`nc-PageCollection`}>
            <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
                <main>
                    <div>
                        <div className="space-y-10 lg:space-y-14">
                            HEADING
                            <div className="flex justify-between items-center w-full">
                                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
                                    Outer
                                </h2>
                                <ButtonPrimary onClick={() => handleShowMoreClick('outer')}>
                                    Show More
                                </ButtonPrimary>
                            </div>
                        </div>
                        <hr className="mt-4 border-slate-200 dark:border-slate-700"/>

                        <div
                            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-8 gap-y-10 mt-8 lg:mt-10">
                            {selectedOuterProducts.map((item, index) => (
                                <ProductCard data={item} key={index}/>
                            ))}
                        </div>
                    </div>

                    <div className="mt-10">
                        <div className="space-y-10 lg:space-y-14">
                            HEADING
                            <div className="flex justify-between items-center w-full">
                                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
                                    Top
                                </h2>
                                <ButtonPrimary onClick={() => handleShowMoreClick('top')}>
                                    Show More
                                </ButtonPrimary>
                            </div>
                        </div>
                        <hr className="mt-4 border-slate-200 dark:border-slate-700"/>

                        <div
                            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-8 gap-y-10 mt-8 lg:mt-10">
                            {selectedTopProducts.map((item, index) => (
                                <ProductCard data={item} key={index}/>
                            ))}
                        </div>
                    </div>

                    <div className="mt-10">
                        <div className="space-y-10 lg:space-y-14">
                            HEADING
                            <div className="flex justify-between items-center w-full">
                                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
                                    Bottom
                                </h2>
                                <ButtonPrimary onClick={() => handleShowMoreClick('top')}>
                                    Show More
                                </ButtonPrimary>
                            </div>
                        </div>
                        <hr className="mt-4 border-slate-200 dark:border-slate-700"/>

                        <div
                            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-8 gap-y-10 mt-8 lg:mt-10">
                            {selectedBottomProducts.map((item, index) => (
                                <ProductCard data={item} key={index}/>
                            ))}
                        </div>
                    </div>
                </main>

                <hr className="border-slate-200 dark:border-slate-700"/>

                <SectionSliderCollections/>
                <hr className="border-slate-200 dark:border-slate-700"/>

                <SectionPromo1/>
            </div>
        </div>
    );
}