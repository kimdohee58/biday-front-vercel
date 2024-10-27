'use client';

import {fetchWishes} from '@/service/product/wish.service';
import ButtonSecondary from '@/shared/Button/ButtonSecondary';
import {useQuery} from '@tanstack/react-query';
import React from "react";

export default function AccountSavelists() {
    const wishes = useQuery({queryKey: ['fetchWishes'], queryFn: () => fetchWishes()});

    if (wishes.isLoading) {
        return <div className="flex h-screen items-center justify-center">
            <div className="text-center">
                <svg
                    className="animate-spin h-12 w-12 text-indigo-600 mx-auto mb-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                    />
                </svg>
                <h2 className="text-2xl font-semibold text-indigo-600">Loading...</h2>
            </div>
        </div>;
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

                </div>
                <div className="flex !mt-20 justify-center items-center">
                    <ButtonSecondary loading>Show me more</ButtonSecondary>
                </div>
            </div>
        );
    };

    return renderSection1();
}
