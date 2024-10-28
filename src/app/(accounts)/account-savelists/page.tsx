'use client';

import React, {useState, useEffect} from "react";
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
        return <div>찜 목록이 없습니다.</div>;
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
