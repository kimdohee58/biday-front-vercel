//src/app/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { fetchAllProducts } from "@/service/product/product.api";
import {ProductModel} from "@/model/ProductModel";
import {getCookie, removeCookie, saveToken} from "@/utils/cookie/cookie.api";
import { useDispatch } from 'react-redux';
import {extractUserInfoFromToken} from "@/utils/jwt.utils";
import {saveUser} from "@/lib/features/user.slice";
import {router} from "next/client";
import {findUserById} from "@/service/user/user.api";

export default function PageHome() {
    const [products, setProducts] = useState<ProductModel[]>([]); // 상품 목록 상태 관리
    const [isLoading, setIsLoading] = useState<boolean>(true); // 로딩 상태 관리
    const dispatch = useDispatch();

    // 상품 데이터를 로드하는 함수
    const loadProducts = async () => {
        try {
            const productData = await fetchAllProducts(); // API 호출
            const productsArray = Object.values(productData); // 객체 값을 배열로 변환
            setProducts(productsArray); // 배열로 변환된 데이터 상태에 저장
        } catch (error) {
            console.error("상품 데이터를 가져오는 중 에러: ", error);
        } finally {
            setIsLoading(false) // 데이터 로딩 완료 후 로딩 상태 해제.
        }
    };

    // 토큰 기반 로그인 처리 함수
    const handleAuthToken = async () => {
        const authToken = getCookie("Authorization");

        console.log("Authorization", authToken)
        if (authToken) {
            console.log("OAuth 토큰: ", authToken);
            try {
                saveToken(authToken); // 토큰을 쿠키에 저장
                const { id } = extractUserInfoFromToken(authToken); // 토큰에서 유저 정보 추출

                const user = await findUserById(id);

                if (user) {
                    const userData = {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        phoneNum: user.phoneNum,
                        status: user.status ? String(user.status) : '',
                        newPassword: user.newPassword || "",
                    };

                    // Redux store에 유저 정보를 저장
                    dispatch(saveUser({ user: userData, token: authToken }));
                    console.log("dalkdfjl;kasddjfl;sdajf;" , userData , authToken)
                    // 유저 정보를 로컬 스토리지에 저장
                    localStorage.setItem('userToken', JSON.stringify(userData));

                    console.log("유저 정보가 쿠키와 로컬스토리지에 저장됨");
                    router.push("/"); // 로그인 후 메인 페이지로 리다이렉트
                }
            } catch (error) {
                console.error("토큰 로그인 실패: ", error);
            }
            removeCookie("Authorization"); // 쿠키에서 토큰 삭제
        } else {
            console.log("Authorization 토큰을 찾을 수 없습니다.");
        }
    };

    useEffect(() => {
        handleAuthToken(); // 페이지 로드 시 인증 토큰 확인
        loadProducts(); // 상품 데이터 로드
    }, []);

    // 카테고리별 상품 분류
    const categories: { [key: string]: ProductModel[] } = {
        상의: products.slice(0, 5),
        하의: products.slice(5, 10),
        신발: products.slice(10, 15),
        가방: products.slice(15, 20),
    };


    return (
        <main className="container mx-auto px-4 lg:px-8">
            {Object.keys(categories).map((category) => (
                <section key={category}>
                    <h2 className="text-xl font-bold my-4">{category}</h2>
                    <div className="grid grid-cols-5 gap-4">
                        {categories[category].map((product) => (
                            <div key={product.id} className="border p-4">
                                <div>{product.name}</div>
                                <div>{product.price}원</div>
                            </div>
                        ))}
                    </div>
                </section>
            ))}
        </main>
    );
}

