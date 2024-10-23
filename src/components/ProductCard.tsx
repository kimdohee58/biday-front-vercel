"use client";

import React, {FC, useEffect, useState} from "react";
import LikeButton from "./LikeButton";
import Prices from "./Prices";
import {ArrowsPointingOutIcon} from "@heroicons/react/24/outline";
import {StarIcon} from "@heroicons/react/24/solid";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import BagIcon from "./BagIcon";
import toast from "react-hot-toast";
import {Transition} from "@/app/headlessui";
import ModalQuickView from "./ModalQuickView";
import ProductStatus from "./ProductStatus";
import {useRouter} from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import NcImage from "@/shared/NcImage/NcImage";
import {ColorType, ProductWithImageModel} from "@/model/product/product.model";
import {getColorsByTypes} from "@/utils/productUtils";

export interface ProductCardProps {
    className?: string;
    data: ProductWithImageModel;
    isLiked: boolean;
    colors: ColorType[];
}

const ProductCard: FC<ProductCardProps> = ({
                                               className = "",
                                               data,
                                               isLiked,
                                               colors,
                                           }) => {
    const {
        product,
        image
    } = data;

    const router = useRouter();
    const [colorActive, setColorActive] = useState(0);
    const [showModalQuickView, setShowModalQuickView] = useState(false);
    const colorArray = getColorsByTypes(colors);

    const imageSrc = image.uploadUrl || "/—Pngtree—loading icon vector_6629917.png";

    const notifyAddTocart = ({size}: { size?: string }) => {
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
                    <div className="border-t border-slate-200 dark:border-slate-700 my-4"/>
                    {renderProductCartOnNotify({size})}
                </Transition>
            ),
            {
                position: "top-right",
                id: String(product.id) || `/product/${product.id}`,
                duration: 3000,
            }
        );
    };

    const renderProductCartOnNotify = ({size}: { size?: string }) => {
        return (
            <div className="flex ">
                <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                    <Image
                        width={80}
                        height={96}
                        src={image.uploadUrl}
                        alt={image.uploadName}
                        className="absolute object-cover object-center"
                    />
                </div>

                <div className="ms-4 flex flex-1 flex-col">
                    <div>
                        <div className="flex justify-between ">
                            <div>
                                <h3 className="text-base font-medium ">{product.name}</h3>
                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  <span>
                    {colorArray ? colorArray[colorActive].name : `Natural`}
                  </span>
                                    <span className="mx-2 border-s border-slate-200 dark:border-slate-700 h-4"></span>
                                    <span>{size || "XL"}</span>
                                </p>
                            </div>
                            <Prices price={product.price} className="mt-0.5"/>
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

    const renderVariants = () => {
        if (!colorArray || !colorArray.length) {
            return null;
        }

        return (
            <div className="flex ">
                {colorArray.map((color, index) => (
                    <div
                        key={index}
                        onClick={() => setColorActive(index)}
                        className={`relative w-11 h-6 rounded-full overflow-hidden z-10 border cursor-pointer ${
                            colorActive === index
                                ? "border-black dark:border-slate-300"
                                : "border-transparent"
                        }`}
                        title={color.name}
                    >
                        <div
                            className="absolute inset-0.5 rounded-full overflow-hidden z-0 bg-cover"
                            style={{
                                backgroundImage: `url(${
                                    color.thumbnail
                                })`,
                            }}
                        ></div>
                    </div>
                ))}
            </div>
        );
    };

    const renderGroupButtons = () => {
        return (
            <div
                className="absolute bottom-0 group-hover:bottom-4 inset-x-1 flex justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <ButtonPrimary
                    className="shadow-lg"
                    fontSize="text-xs"
                    sizeClass="py-2 px-4"
                    onClick={() => notifyAddTocart({size: "XL"})}
                >
                    <BagIcon className="w-3.5 h-3.5 mb-0.5"/>
                    <span className="ms-1">Add to bag</span>
                </ButtonPrimary>
                <ButtonSecondary
                    className="ms-1.5 bg-white hover:!bg-gray-100 hover:text-slate-900 transition-colors shadow-lg"
                    fontSize="text-xs"
                    sizeClass="py-2 px-4"
                    onClick={() => setShowModalQuickView(true)}
                >
                    <ArrowsPointingOutIcon className="w-3.5 h-3.5"/>
                    <span className="ms-1">Quick view</span>
                </ButtonSecondary>
            </div>
        );
    };

    const renderSizeList = () => {
        if (!product.sizes || !product.sizes.length) {
            return null;
        }

        return (
            <div
                className="absolute bottom-0 inset-x-1 gap-2 flex flex-wrap justify-center opacity-0 invisible group-hover:bottom-4 group-hover:opacity-100 group-hover:visible transition-all">
                {product.sizes.map((size, index) => {
                    return (
                        <div
                            key={index}
                            className="nc-shadow-lg w-10 h-10 rounded-xl bg-white hover:bg-slate-900 hover:text-white transition-colors cursor-pointer flex items-center justify-center uppercase font-semibold tracking-tight text-sm text-slate-900"
                            onClick={() => router.push(`/product/${product.id}?size=${size.id}`)}
                        >
                            {size.size}
                        </div>
                    );
                })}
            </div>
        );
    };

    const HeartIcon = ({className}: { className?: string}) => {
        return (
            <div className={className}>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
                        fill="#ef4444"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>

        )
    };

    return (
        <>
            <div
                className={`nc-ProductCard relative flex flex-col bg-transparent ${className}`}
            >
                <Link href={`/product/${product.id}`} className="absolute inset-0"></Link>

                <div
                    className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded-3xl overflow-hidden z-1 group">
                    <Link href={`/product/${product.id}`} className="block">
                        <NcImage
                            containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0"
                            src={imageSrc}
                            className="object-cover w-full h-full drop-shadow-xl"
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
                            alt="product"
                        />
                    </Link>
                    {/*<ProductStatus status={status}/>*/}

                    {/*기존코드랑 여기가 좀 다름.*/}
                    <LikeButton
                        className="absolute top-3 end-3 z-10"
                        productId={product.id}
                        liked={isLiked}
                    />
                    {product.sizes ? renderSizeList() : renderGroupButtons()}
                </div>

                <div className="space-y-4 px-2.5 pt-5 pb-2.5">
                    {renderVariants()}
                    <div>
                        <h2 className="nc-ProductCard__title text-base font-semibold transition-colors">
                            {product.name}
                        </h2>
                        <p className={`text-sm text-slate-500 dark:text-slate-400 mt-1 `}>
                            {product.subName}
                        </p>
                    </div>

                    <div className="flex justify-between items-end ">
                        <Prices price={product.price}/>
                        <div className="flex items-center mb-0.5">
                            <HeartIcon className="w-5 h-5 pb-[1px] text-amber-400"/>
                            <span className="text-sm ms-1 text-slate-500 dark:text-slate-400">
                                ({product.wishes || 0} wishes)
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <ModalQuickView
                show={showModalQuickView}
                onCloseModalQuickView={() => setShowModalQuickView(false)}
            />
        </>
    );
};

export default ProductCard;
