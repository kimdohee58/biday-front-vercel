// src/app/client-component.tsx (클라이언트 컴포넌트)
"use client";

import React, { useEffect, useState } from "react";
import { fetchAllProducts } from "@/service/product/product.api";
import { ProductModel } from "@/model/product/product.model";
import {AuthorizationToken, getCookie, saveToken} from "@/utils/cookie/cookie.api";
import { useDispatch } from "react-redux";
import { extractUserInfoFromToken } from "@/utils/jwt.utils";
import { saveUser } from "@/lib/features/user.slice";
import { findUserById } from "@/service/user/user.api";
import {checkTokenAndReissueIfNeeded} from "@/utils/token/token";
import ProductPage from "@/components/ProductList";

interface ClientComponentProps {
    authorizationToken: string;
    initialProducts: any[]; // 서버에서 받아온 초기 상품 데이터
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
            <ProductPage/>
        </div>
    );
}
