"use client"
import React, {useEffect, useState} from "react";
import { PRODUCTS, SPORT_PRODUCTS } from "@/data/data";
import ProductCard from "@/components/ProductCard";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState, wrapper} from "@/lib/store";

// 모든 페이지에 유즈 클라이언트에 걸고,


export default function PageHome() {
    const dispatch = useDispatch();

    const limitedProducts = PRODUCTS.slice(0, 5);

    const { products, status } = useSelector((state: RootState) => state.product);

    // CSR에서 데이터를 가져오도록 설정 (백업용)
    useEffect(() => {
        if (status === 'idle') {
            //dispatch(fetchProducts());
        }
    }, [status, dispatch]);

    const tops = products.filter(product => product.category === '상의');
    const bottoms = products.filter(product => product.category === '하의');
    const shoes = products.filter(product => product.category === '신발');
    const bags = products.filter(product => product.category === '가방');



    return (
        <main className="container mx-auto px-4 lg:px-8">
            {/* 상의 목록 */}
            <section>
                <h2>상의</h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-x-6 gap-y-8 mt-8">
                    {tops.map((product) => (
                        <ProductCard key={product.id} data={product} />
                    ))}
                </div>
            </section>

            {/* 하의 목록 */}
            <section>
                <h2>하의</h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-x-6 gap-y-8 mt-8">
                    {bottoms.map((product) => (
                        <ProductCard key={product.id} data={product} />
                    ))}
                </div>
            </section>

            {/* 신발 목록 */}
            <section>
                <h2>신발</h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-x-6 gap-y-8 mt-8">
                    {shoes.map((product) => (
                        <ProductCard key={product.id} data={product} />
                    ))}
                </div>
            </section>

            {/* 가방 목록 */}
            <section>
                <h2>가방</h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-x-6 gap-y-8 mt-8">
                    {bags.map((product) => (
                        <ProductCard key={product.id} data={product} />
                    ))}
                </div>
            </section>
        </main>
    );
}


