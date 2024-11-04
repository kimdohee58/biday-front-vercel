'use client';

import React, {useEffect, useState} from "react";
import {useWishDelete, useWishlistWithImages} from "@/hooks/react-query/useWishlist";
import {Spinner} from "@/shared/Spinner/Spinner";
import WishCard from "@/components/WishCard";

export default function AccountSavelists() {
    const {data: initialWishes, isLoading} = useWishlistWithImages();
    const {mutate: deleteWish} = useWishDelete();
    const [wishes, setWishes] = useState(initialWishes || []);

    useEffect(() => {
        if (initialWishes) {
            setWishes(initialWishes);
        }
    }, [initialWishes]);

    if (isLoading) {
        return <div className="flex h-screen items-center justify-center">
            <div className="text-center">
                <Spinner/>
            </div>
        </div>;
    }

    if (!initialWishes || initialWishes.length === 0) {
        return <div className="flex flex-col items-center justify-center h-64 text-center bg-gray-100 rounded-lg p-6">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-12 h-12 text-gray-400 mb-4"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 20.25l-1.88-1.64c-4.05-3.52-6.62-5.77-6.62-8.61 0-2.37 1.92-4.25 4.29-4.25 1.26 0 2.47.53 3.29 1.46.82-.93 2.03-1.46 3.29-1.46 2.37 0 4.29 1.88 4.29 4.25 0 2.84-2.57 5.09-6.62 8.61L12 20.25z"
                />
            </svg>
            <p className="text-lg font-semibold text-gray-700">찜 목록이 없습니다.</p>
            <p className="text-gray-500">원하는 상품을 찜해보세요!</p>
        </div>
    }

    const handleDeleteWish = (wishId: number) => {
        deleteWish(wishId, {
            onSuccess: () => {
                setWishes(wishes.filter((wish) => wish.wish.id !== wishId));
            }
        });
    };

    const renderSection1 = () => {
        return (
            <div className="space-y-10 sm:space-y-12">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-semibold">장바구니</h2>
                </div>

                <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 ">
                    {wishes.map((wish) => (
                        wish.wish.id !== undefined && (
                            <WishCard
                                key={wish.wish.id}
                                wishId={wish.wish.id}
                                product={wish.wish.product}
                                image={wish.image}
                                colors={wish.colors}
                                onDelete={() => handleDeleteWish(wish.wish.id as number)}
                            />
                        )
                    ))}
                </div>
            </div>
        );
    };

    return renderSection1();
}
