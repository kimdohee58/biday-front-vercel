// src/app/client-component.tsx (클라이언트 컴포넌트)
"use client"; // 클라이언트 컴포넌트

import React, { useEffect, useState } from "react";
import { fetchAllProducts } from "@/service/product/product.api";
import { ProductModel } from "@/model/ProductModel";
import {AuthorizationToken, getCookie, saveToken} from "@/utils/cookie/cookie.api";
import { useDispatch } from "react-redux";
import { extractUserInfoFromToken } from "@/utils/jwt.utils";
import { saveUser } from "@/lib/features/user.slice";
import { findUserById } from "@/service/user/user.api";
import {checkTokenAndReissueIfNeeded} from "@/utils/token/token";
import {dispatch} from "d3-dispatch";

interface ClientComponentProps {
    authorizationToken: string;
}

export default function ClientComponent({ authorizationToken }: ClientComponentProps) {
    const [products, setProducts] = useState<ProductModel[]>([]);
    const dispatch = useDispatch();

    const loadProducts = async () => {
        try {
            const productData = await fetchAllProducts();
            const productsArray = Object.values(productData);
            setProducts(productsArray);
        } catch (error) {
            console.error("상품 데이터를 가져오는 중 에러: ", error);
        }
    };

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

    useEffect(() => {
        handleAuthToken(); // 페이지 로드 시 인증 토큰 확인
        loadProducts(); // 상품 데이터 로드
        checkTokenAndReissueIfNeeded(authorizationToken);
    }, [authorizationToken]);

    return (
        <div>
            <h1>상품 목록</h1>
            {products.map((product) => (
                <div key={product.id}>
                    <h2>{product.name}</h2>
                    <p>{product.price}원</p>
                </div>
            ))}
        </div>
    );
}

// 'use client'; // 클라이언트 컴포넌트
//
// import React, {useEffect, useState} from "react";
// import {fetchAllProducts} from "@/service/product/product.service";
// import {ProductModel} from "@/model/ProductModel";
// import {getCookie, saveToken} from "@/utils/cookie/cookie.api";
// import {useDispatch} from "react-redux";
// import {extractUserInfoFromToken} from "@/utils/jwt.utils";
// import {saveUser} from "@/lib/features/user.slice";
// import {findUserById} from "@/service/user/user.api";
// import TabFilters from "@/components/TabFilters";
// import ProductCard from "@/components/ProductCard";
// import Pagination from "@/shared/Pagination/Pagination";
// import ButtonPrimary from "@/shared/Button/ButtonPrimary";
// import SectionSliderCollections from "@/components/SectionSliderLargeProduct";
// import SectionPromo1 from "@/components/SectionPromo1";
// import {setLoading} from "@/lib/features/products.slice";
// import {SearchFilter} from "@/model/product/product.model";
// import {fetchProducts} from "@/service/product/product.service";
// import {useRouter} from "next/navigation";
//
// interface ClientComponentProps {
//     authorizationToken: string;
// }
//
// export default function ClientComponent({authorizationToken}: ClientComponentProps) {
//     const [outerProducts, setOuterProducts] = useState<ProductModel[]>([]);
//     const [topProducts, setTopProducts] = useState<ProductModel[]>([]);
//     const [bottomProducts, setBottomProducts] = useState<ProductModel[]>([]);
//     const [brandProducts, setBrandProducts] = useState<ProductModel[]>([]);
//     const dispatch = useDispatch();
//
//     // // category filter 별 api 호출
//     // const loadOuterProducts = async () => {
//     //     try {
//     //         const searchFilter: SearchFilter = {
//     //             category: "outer"
//     //         };
//     //         const productData = await fetchProducts(searchFilter);
//     //         // @ts-ignore
//     //         setOuterProducts(productData);
//     //     } catch (error) {
//     //         console.error("상품 데이터를 가져오는 중 에러: ", error);
//     //     }
//     // }
//     //
//     // const loadTopProducts = async () => {
//     //     try {
//     //         const searchFilter: SearchFilter = {
//     //             category: "top"
//     //         };
//     //         const productData = await fetchProducts(searchFilter);
//     //         // @ts-ignore
//     //         setTopProducts(productData);
//     //     } catch (error) {
//     //         console.error("상품 데이터를 가져오는 중 에러: ", error);
//     //     }
//     // };
//     //
//     // // const loadTopProducts = async () => {
//     // //     try {
//     // //         const productData = await fetchAllProducts();
//     // //
//     // //         // productData가 배열이 아니면 배열로 변환
//     // //         const productsArray: ProductModel[] = Array.isArray(productData) ? productData : Object.values(productData);
//     // //
//     // //         setTopProducts(productsArray.filter((product) => product.category.toLowerCase().includes("top")).slice(0, 5));
//     // //     } catch (error) {
//     // //         console.error("상품 데이터를 가져오는 중 에러: ", error);
//     // //     }
//     // // };
//     //
//     // const loadBottomProducts = async () => {
//     //     try {
//     //         const searchFilter: SearchFilter = {
//     //             category: "bottom"
//     //         };
//     //         const productData = await fetchProducts(searchFilter);
//     //         // @ts-ignore
//     //         setBottomProducts(productData);
//     //     } catch (error) {
//     //         console.error("상품 데이터를 가져오는 중 에러: ", error);
//     //     }
//     // }
//     //
//     // const loadBrandProducts = async () => {
//     //     try {
//     //         const searchFilter: SearchFilter = {
//     //             brand: "esfai"
//     //         };
//     //         const productData = await fetchProducts(searchFilter);
//     //         // @ts-ignore
//     //         setBrandProducts(productData);
//     //     } catch (error) {
//     //         console.error("상품 데이터를 가져오는 중 에러: ", error);
//     //     }
//     // }
//     //
//     // const handleAuthToken = async () => {
//     //     const authToken = authorizationToken || getCookie("Authorization");
//     //
//     //     if (authToken) {
//     //         try {
//     //             saveToken(authToken);
//     //             const {id} = extractUserInfoFromToken(authToken);
//     //
//     //             const user = await findUserById(id);
//     //             if (user) {
//     //                 const userData = {
//     //                     id: user.id,
//     //                     name: user.name,
//     //                     email: user.email,
//     //                     phoneNum: user.phoneNum,
//     //                     status: user.status ? String(user.status) : "",
//     //                     newPassword: user.newPassword || "",
//     //                 };
//     //
//     //                 dispatch(saveUser({user: userData, token: authToken}));
//     //                 localStorage.setItem("userToken", JSON.stringify(userData));
//     //             }
//     //         } catch (error) {
//     //             console.error("토큰 로그인 실패: ", error);
//     //         }
//     //     } else {
//     //         console.log("Authorization 토큰을 찾을 수 없습니다.");
//     //     }
//     // };
//     //
//     // useEffect(() => {
//     //     handleAuthToken(); // 페이지 로드 시 인증 토큰 확인
//     //     loadOuterProducts(); // 상품 데이터 로드
//     //     loadTopProducts();
//     //     loadBottomProducts();
//     //     loadBrandProducts();
//     // }, [authorizationToken]);
//     //
//     // const itemsPerPage = 5;
//     //
//     // const totalPages = Math.ceil(outerProducts.length / itemsPerPage);
//     // // 현재 페이지 상태를 관리
//     // const [currentPage, setCurrentPage] = useState(1);
//     // const startIndex = (currentPage - 1) * itemsPerPage;
//     // const selectedOuterProducts = outerProducts.slice(startIndex, startIndex + itemsPerPage);
//     // const selectedTopProducts = topProducts.slice(startIndex, startIndex + itemsPerPage);
//     // const selectedBottomProducts = bottomProducts.slice(startIndex, startIndex + itemsPerPage);
//     // const selectedBrandProducts = brandProducts.slice(startIndex, startIndex + itemsPerPage);
//     //
//     //
//     // // 페이지 처리 클릭 핸들러
//     // const handlePageChange = (page: number) => {
//     //     console.log("페이지 변경", page)
//     //     setCurrentPage(page);
//     // };
//     // const router = useRouter()
//     // const handleShowMoreClick = (filter: string) => {
//     //     router.push(`/${filter}`);  // 해당 카테고리 페이지로 이동
//     // };
//     //
//     // // 사진 제외 다 됨
//     // return (
//     //     <div className={`nc-PageCollection`}>
//     //         <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
//     //             <main>
//     //                 <TabFilters/>
//     //                 <div>
//     //                     <div className="space-y-10 lg:space-y-14">
//     //                         HEADING
//     //                         <div className="flex justify-between items-center w-full">
//     //                             <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
//     //                                 Outer
//     //                             </h2>
//     //                             <ButtonPrimary onClick={() => handleShowMoreClick('outer')}>
//     //                                 Show More
//     //                             </ButtonPrimary>
//     //                         </div>
//     //                     </div>
//     //                     <hr className="border-slate-200 dark:border-slate-700"/>
//     //
//     //                     <div
//     //                         className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-8 gap-y-10 mt-8 lg:mt-10">
//     //                         {selectedOuterProducts.map((item, index) => (
//     //                             <ProductCard data={item} key={index}/>
//     //                         ))}
//     //                     </div>
//     //                 </div>
//     //
//     //                 <div className="mt-10">
//     //                     <div className="space-y-10 lg:space-y-14">
//     //                         HEADING
//     //                         <div className="flex justify-between items-center w-full">
//     //                             <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
//     //                                 Top
//     //                             </h2>
//     //                             <ButtonPrimary onClick={() => handleShowMoreClick('top')}>
//     //                                 Show More
//     //                             </ButtonPrimary>
//     //                         </div>
//     //                     </div>
//     //                     <hr className="border-slate-200 dark:border-slate-700"/>
//     //
//     //                     <div
//     //                         className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-8 gap-y-10 mt-8 lg:mt-10">
//     //                         {selectedTopProducts.map((item, index) => (
//     //                             <ProductCard data={item} key={index}/>
//     //                         ))}
//     //                     </div>
//     //                 </div>
//     //
//     //                 <div className="mt-10">
//     //                     <div className="space-y-10 lg:space-y-14">
//     //                         HEADING
//     //                         <div className="flex justify-between items-center w-full">
//     //                             <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
//     //                                 Bottom
//     //                             </h2>
//     //                             <ButtonPrimary onClick={() => handleShowMoreClick('top')}>
//     //                                 Show More
//     //                             </ButtonPrimary>
//     //                         </div>
//     //                     </div>
//     //                     <hr className="border-slate-200 dark:border-slate-700"/>
//     //
//     //                     <div
//     //                         className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-8 gap-y-10 mt-8 lg:mt-10">
//     //                         {selectedBottomProducts.map((item, index) => (
//     //                             <ProductCard data={item} key={index}/>
//     //                         ))}
//     //                     </div>
//     //                 </div>
//     //             </main>
//     //
//     //             <hr className="border-slate-200 dark:border-slate-700"/>
//     //
//     //             <SectionSliderCollections/>
//     //             <hr className="border-slate-200 dark:border-slate-700"/>
//     //
//     //             <SectionPromo1/>
//     //         </div>
//     //     </div>
//     // );
//
//     // 준한이형 코드
//     // const loadTopProducts = async () => {
//     //     try {
//     //         const searchFilter: SearchFilter = {
//     //             category: "top"
//     //         };
//     //         const productData = await fetchProducts(searchFilter);
//     //         const productsArray = Object.values(productData);
//     //         setTopProducts(productsArray);
//     //     } catch (error) {
//     //         console.error("상품 데이터를 가져오는 중 에러: ", error);
//     //     }
//     // };
//
//     // fetchAllProducts
//     const loadAllProducts = async () => {
//         try {
//             const productData = await fetchAllProducts();
//
//             if (!productData) {
//                 return;
//             }
//             const productsArray: ProductModel[] = Array.isArray(productData) ? productData : Object.values(productData);
//             console.log("productArray", productsArray)
//
//             setOuterProducts(productData.filter((product) => product.category.toLowerCase().includes("outer")).slice(0, 5));
//             setTopProducts(productData.filter((product) => product.category.toLowerCase().includes("top")).slice(0, 5));
//             setBottomProducts(productData.filter((product) => product.category.toLowerCase().includes("bottom")).slice(0, 5));
//             setBrandProducts(productData.filter((product) => product.brand.toLowerCase().includes("esfai")).slice(0, 5));
//         } catch (error) {
//             console.error("상품 데이터를 가져오는 중 에러: ", error);
//         }
//     };
//
//     console.log("outer", outerProducts)
//
//     useEffect(() => {
//         loadAllProducts(); // 페이지 로드 시 한 번에 모든 상품 데이터 불러오기
//     }, []);
//
//     const router = useRouter()
//     const handleShowMoreClick = (filter: 'outer' | 'top' | 'bottom' | 'brand') => {
//         router.push(`/${filter}`)
//     };
//
//     // 각 카테고리별 상품을 출력
//     return (
//         <div className="nc-PageCollection">
//             <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
//                 <main>
//                     {/* Outer 카테고리 */}
//                     <div>
//                         <div className="space-y-10 lg:space-y-14">
//                             <div className="flex justify-between items-center w-full">
//                                 <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">Outer</h2>
//                                 <ButtonPrimary onClick={() => handleShowMoreClick('outer')}>Show More</ButtonPrimary>
//                             </div>
//                         </div>
//                         <hr className="border-slate-200 dark:border-slate-700"/>
//                         <div
//                             className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-8 gap-y-10 mt-8 lg:mt-10">
//                             {outerProducts.map((item, index) => (
//                                 <ProductCard data={item} key={index}/>
//                             ))}
//                             {/*{outerProducts.map((product) => (*/}
//                             {/*    <div key={product.id}>*/}
//                             {/*        <h2>{product.name}</h2>*/}
//                             {/*        <p>{product.price}원</p>*/}
//                             {/*    </div>*/}
//                             {/*))}*/}
//                         </div>
//                     </div>
//
//                     {/* Top 카테고리 */}
//                     <div>
//                         <div className="space-y-10 lg:space-y-14">
//                             <div className="flex justify-between items-center w-full">
//                                 <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">Top</h2>
//                                 <ButtonPrimary onClick={() => handleShowMoreClick('top')}>Show More</ButtonPrimary>
//                             </div>
//                         </div>
//                         <hr className="border-slate-200 dark:border-slate-700"/>
//                         <div
//                             className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-8 gap-y-10 mt-8 lg:mt-10">
//                             {topProducts.map((item, index) => (
//                                 <ProductCard data={item} key={index}/>
//                             ))}
//                             {/*{topProducts.map((product) => (*/}
//                             {/*    <div key={product.id}>*/}
//                             {/*        <h2>{product.name}</h2>*/}
//                             {/*        <p>{product.price}원</p>*/}
//                             {/*    </div>*/}
//                             {/*))}*/}
//                         </div>
//                     </div>
//
//                     {/* Bottom 카테고리 */}
//                     <div>
//                         <div className="space-y-10 lg:space-y-14">
//                             <div className="flex justify-between items-center w-full">
//                                 <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">Bottom</h2>
//                                 <ButtonPrimary onClick={() => handleShowMoreClick('bottom')}>Show More</ButtonPrimary>
//                             </div>
//                         </div>
//                         <hr className="border-slate-200 dark:border-slate-700"/>
//                         <div
//                             className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-8 gap-y-10 mt-8 lg:mt-10">
//                             {bottomProducts.map((item, index) => (
//                                 <ProductCard data={item} key={index}/>
//                             ))}
//                             {/*{bottomProducts.map((product) => (*/}
//                             {/*    <div key={product.id}>*/}
//                             {/*        <h2>{product.name}</h2>*/}
//                             {/*        <p>{product.price}원</p>*/}
//                             {/*    </div>*/}
//                             {/*))}*/}
//                         </div>
//                     </div>
//
//                     {/* Brand 카테고리 */}
//                     <div>
//                         <div className="space-y-10 lg:space-y-14">
//                             <div className="flex justify-between items-center w-full">
//                                 <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">Brand</h2>
//                                 <ButtonPrimary onClick={() => handleShowMoreClick('brand')}>Show More</ButtonPrimary>
//                             </div>
//                         </div>
//                         <hr className="border-slate-200 dark:border-slate-700"/>
//                         <div
//                             className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-8 gap-y-10 mt-8 lg:mt-10">
//                             {brandProducts.map((item, index) => (
//                                 <ProductCard data={item} key={index}/>
//                             ))}
//                             {/*{brandProducts.map((product) => (*/}
//                             {/*    <div key={product.id}>*/}
//                             {/*        <h2>{product.name}</h2>*/}
//                             {/*        <p>{product.price}원</p>*/}
//                             {/*    </div>*/}
//                             {/*))}*/}
//                         </div>
//                     </div>
//                 </main>
//
//                 <hr className="border-slate-200 dark:border-slate-700"/>
//                 <SectionSliderCollections/>
//                 <hr className="border-slate-200 dark:border-slate-700"/>
//                 <SectionPromo1/>
//             </div>
//         </div>
//     );
// }