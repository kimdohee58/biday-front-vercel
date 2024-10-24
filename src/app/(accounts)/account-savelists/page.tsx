'use client';

import {fetchWishes} from '@/service/product/wish.service';
import ButtonSecondary from '@/shared/Button/ButtonSecondary';
import {useQuery} from '@tanstack/react-query';
import React from "react";
import ProductCard2 from "@/components/ProductCared2";

export default function AccountSavelists() {
    const wishes = useQuery({queryKey: ['fetchWishes'], queryFn: () => fetchWishes()});

    if (wishes.isLoading) {
        return <div>로딩 중...</div>;
    }

    if (!wishes.data || wishes.data.length === 0) {
        return <div>찜 목록이 없습니다.</div>;
    }

    const renderSection1 = () => {
        return (
            <div className="space-y-10 sm:space-y-12">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-semibold">장바구니</h2>
                </div>

                <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 ">
                    {wishes.data.map((wish) => (
                        wish.id !== undefined && (
                            <ProductCard2
                                key={wish.id}
                                wishId={wish.id}
                                data={wish.product}
                            />
                        )
                    ))}
                </div>
                <div className="flex !mt-20 justify-center items-center">
                    <ButtonSecondary loading>Show me more</ButtonSecondary>
                </div>
            </div>
        );
    };

    return renderSection1();
}
