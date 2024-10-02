//src/app/page.tsx
"use client"

import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ProductModel} from "@/model/ProductModel";
import {useProductList} from "@/hooks/useProductList";


export default function PageHome() {
    const {data, isLoading} = useProductList(); // 상품 리스트 가져오는 훅

    if (isLoading) return <div>로딩. ..</div>

    const products: ProductModel[] = data?.content || [];  // content 필드에서 상품 가져오기

    const categories: { [key: string]: ProductModel[] } = {
        상의: products.slice(0, 5),
        하의: products.slice(0, 5),
        신발: products.slice(0, 5),
        가방: products.slice(0, 5),
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

// 웹블럭스에서 안먹더라고, 그래서 페이지어블 다 빼버렸다.
// 우리 더보기여서 그렇게 까지 힘들거없다.
// 할 수 있지 할 숭 ㅣㅆ다.
//
// 페이지네이션 더보기만 있잖아. 무한스콜ㄹ처럼 있으니깐 훨신 쉽다. 사이즈만, 페이자만 이씅면 된다.
// 셋이 합치고 올릴려고 했다.
// 에이피아이 관련된거 다 바뀌는건가..?
