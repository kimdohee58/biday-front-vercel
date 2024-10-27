"use client";

import React, { FC, useEffect, useState } from "react";
import LikeButton from "./LikeButton";
import Prices from "./Prices";
import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline";
import { PRODUCTS } from "@/data/data";
import { StarIcon } from "@heroicons/react/24/solid";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import BagIcon from "./BagIcon";
import toast from "react-hot-toast";
import { Transition } from "@/app/headlessui";
import ModalQuickView from "./ModalQuickView";
import ProductStatus from "./ProductStatus";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import NcImage from "@/shared/NcImage/NcImage";
import { ProductModel } from "@/model/product/product.model";

export interface ProductCardProps {
    className?: string;
    data: ProductModel;
    isLiked?: boolean;
    image: string; // 이미지 프로퍼티 추가
}

const ProductCard: FC<ProductCardProps> = ({
                                               className = "",
                                               data,
                                               isLiked,
                                               image, // 이미지 프로퍼티 사용
                                           }) => {
    const {
        name,
        price,
        description,
        id,
        wishes,
        sizes,
    } = data;

    const [variantActive, setVariantActive] = useState(0);
    const [showModalQuickView, setShowModalQuickView] = useState(false);
    const router = useRouter();
    const status: "New in" | "Limited edition" | "Sold Out" | "50% Discount" | undefined =
        data.category === 'some-category' ? "New in" : undefined; // 이걸 하니깐 컴파일 에러 해결

    const imageSrc = image || "/—Pngtree—loading icon vector_6629917.png"; // 기본 이미지 설정

    const notifyAddTocart = ({ size }: { size?: string }) => {
        toast.custom(
            (t) => (
                <Transition
                    as={"div"}
                    appear
                    show={t.visible}
                    className="p-4 max-w-md w-full bg-white dark:bg-slate-800 shadow-lg rounded-2xl pointer-events-auto ring-1 ring-black/5 dark:ring-white/10 text-slate-900 dark:text-slate-200"
                    enter="transition-all duration-150"
                    enterFrom="opacity-0 translate-x-20"
                    enterTo="opacity-100 translate-x-0"
                    leave="transition-all duration-150"
                    leaveFrom="opacity-100 translate-x-0"
                    leaveTo="opacity-0 translate-x-20"
                >
                    <p className="block text-base font-semibold leading-none">
                        Added to cart!
                    </p>
                    <div className="border-t border-slate-200 dark:border-slate-700 my-4" />
                    {renderProductCartOnNotify({ size })}
                </Transition>
            ),
            {
                position: "top-right",
                id: String(id) || `/product/${id}`,
                duration: 3000,
            }
        );
    };

    const renderProductCartOnNotify = ({ size }: { size?: string }) => {
        return (
            <div className="flex ">
                <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                    <Image
                        width={80}
                        height={96}
                        src={imageSrc}
                        alt={name}
                        className="absolute object-cover object-center"
                    />
                </div>

                <div className="ms-4 flex flex-1 flex-col">
                    <div>
                        <div className="flex justify-between ">
                            <div>
                                <h3 className="text-base font-medium ">{name}</h3>
                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                    <span className="mx-2 border-s border-slate-200 dark:border-slate-700 h-4"></span>
                                    <span>{size || "XL"}</span>
                                </p>
                            </div>
                            <Prices price={price} className="mt-0.5" />
                        </div>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="text-gray-500 dark:text-slate-400">Qty 1</p>

                        <div className="flex">
                            <button
                                type="button"
                                className="font-medium text-primary-6000 dark:text-primary-500 "
                                onClick={(e) => {
                                    e.preventDefault();
                                    router.push("/cart");
                                }}
                            >
                                View cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const getBorderClass = (Bgclass = "") => {
        if (Bgclass.includes("red")) {
            return "border-red-500";
        }
        if (Bgclass.includes("violet")) {
            return "border-violet-500";
        }
        if (Bgclass.includes("orange")) {
            return "border-orange-500";
        }
        if (Bgclass.includes("green")) {
            return "border-green-500";
        }
        if (Bgclass.includes("blue")) {
            return "border-blue-500";
        }
        if (Bgclass.includes("sky")) {
            return "border-sky-500";
        }
        if (Bgclass.includes("yellow")) {
            return "border-yellow-500";
        }
        return "border-transparent";
    };


    const renderGroupButtons = () => {
        return (
            <div
                className="absolute bottom-0 group-hover:bottom-4 inset-x-1 flex justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <ButtonPrimary
                    className="shadow-lg"
                    fontSize="text-xs"
                    sizeClass="py-2 px-4"
                    onClick={() => notifyAddTocart({ size: "XL" })}
                >
                    <BagIcon className="w-3.5 h-3.5 mb-0.5" />
                    <span className="ms-1">Add to bag</span>
                </ButtonPrimary>
                <ButtonSecondary
                    className="ms-1.5 bg-white hover:!bg-gray-100 hover:text-slate-900 transition-colors shadow-lg"
                    fontSize="text-xs"
                    sizeClass="py-2 px-4"
                    onClick={() => setShowModalQuickView(true)}
                >
                    <ArrowsPointingOutIcon className="w-3.5 h-3.5" />
                    <span className="ms-1">Quick view</span>
                </ButtonSecondary>
            </div>
        );
    };

    const renderSizeList = () => {
        if (!sizes || !sizes.length) {
            return null;
        }

        return (
            <div
                className="absolute bottom-0 inset-x-1 gap-2 flex flex-wrap justify-center opacity-0 invisible group-hover:bottom-4 group-hover:opacity-100 group-hover:visible transition-all">
                {sizes.map((size) => {
                    return (
                        <div
                            key={size.id}
                            className="nc-shadow-lg w-10 h-10 rounded-xl bg-white hover:bg-slate-900 hover:text-white transition-colors cursor-pointer flex items-center justify-center uppercase font-semibold tracking-tight text-sm text-slate-900"
                        >
                            {size.size}
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <>
            <div
                className={`nc-ProductCard relative flex flex-col bg-transparent ${className}`}
            >
                <Link href={`/product/${id}`} className="absolute inset-0"></Link>

                <div
                    className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded-3xl overflow-hidden z-1 group">
                    <Link href={`/product/${id}`} className="block">
                        <NcImage
                            containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0"
                            src={imageSrc}
                            className="object-cover w-full h-full drop-shadow-xl"
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
                            alt="product"
                        />
                    </Link>
                    <ProductStatus status={status} />

                    <LikeButton
                        className="absolute top-3 end-3 z-10"
                        productId={data.id}
                        liked={isLiked}
                    />
                    {sizes ? renderSizeList() : renderGroupButtons()}
                </div>

                <div className="space-y-4 px-2.5 pt-5 pb-2.5">
                    <div>
                        <h2 className="nc-ProductCard__title text-base font-semibold transition-colors">
                            {name}
                        </h2>
                        <p className={`text-sm text-slate-500 dark:text-slate-400 mt-1 overflow-hidden overflow-ellipsis whitespace-nowrap`}>
                            {description}
                        </p>
                    </div>

                    <div className="flex justify-between items-end ">
                        <Prices price={price} />
                        <div className="flex items-center mb-0.5">
                            <StarIcon className="w-5 h-5 pb-[1px] text-amber-400" />
                            <span className="text-sm ms-1 text-slate-500 dark:text-slate-400">
                                {wishes || "0"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* QUICKVIEW */}
            <ModalQuickView
                show={showModalQuickView}
                onCloseModalQuickView={() => setShowModalQuickView(false)}
            />
        </>
    );
};

export default ProductCard;
