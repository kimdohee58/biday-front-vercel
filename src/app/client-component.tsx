// src/app/client-component.tsx (클라이언트 컴포넌트)
"use client"; // 클라이언트 컴포넌트

import React, { useEffect, useState } from "react";
import { fetchAllProducts } from "@/service/product/product.api";
import { ProductModel } from "@/model/ProductModel";
import {checkTokenAndReissueIfNeeded} from "@/utils/token/token";

interface ClientComponentProps {
    authorizationToken: string;
}


export default function ClientComponent({ authorizationToken }: ClientComponentProps) {
    const [products, setProducts] = useState<ProductModel[]>([]);

    const loadProducts = async () => {
        try {
            const productData = await fetchAllProducts();
            const productsArray = Object.values(productData);
            setProducts(productsArray);
        } catch (error) {
            console.error("상품 데이터를 가져오는 중 에러: ", error);
        }
    };

    useEffect(() => {

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
