"use client";

import React, {FC, useState} from "react";
import LikeButton from "./LikeButton";
import Prices from "./Prices";
import {useRouter} from "next/navigation";
import Link from "next/link";
import NcImage from "@/shared/NcImage/NcImage";
import {ColorType, ProductModel} from "@/model/product/product.model";
import {getColorsByTypes} from "@/utils/productUtils";
import {ImageModel} from "@/model/ftp/image.model";
import WishDeleteButton from "@/components/WishDeleteButton";
import {TrashIcon} from "@heroicons/react/24/solid";

export interface ProductCardProps {
    className?: string;
    product: ProductModel;
    image: ImageModel;
    colors: ColorType[];
    wishId: number;
    onDelete: () => void;
}

const ProductCard: FC<ProductCardProps> = ({
                                               className = "",
                                               product,
                                               image,
                                               colors,
                                               wishId,
                                               onDelete
                                           }) => {

    const colorArray = getColorsByTypes(colors);
    const router = useRouter();
    const [colorActive, setColorActive] = useState(colors.findIndex(c => c === product.color));

    const imageSrc = image.uploadUrl || "/—Pngtree—loading icon vector_6629917.png";

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
                                    color.thumbnail.src
                                })`,
                            }}
                        ></div>
                    </div>
                ))}
            </div>
        );
    };

    /* const renderGroupButtons = () => {
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
     };*/

    const renderSizeList = () => {
        if (!product.sizes || !product.sizes.length) {
            return <div
                className="absolute bottom-0 inset-x-1 gap-2 flex flex-wrap justify-center opacity-0 invisible group-hover:bottom-4 group-hover:opacity-100 group-hover:visible transition-all">
                {"free"}
            </div>;
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

    const deleteButton = () => {
        return (
            <div className={`${className}`}>
                <div className={`flex items-center border-2 border-red-500 rounded-lg`}>
                    <button
                        className="text-red-500 !leading-none flex items-center"
                        onClick={onDelete}
                    >
                        <TrashIcon className="h7- w-7 mr-0" aria-hidden="true" /> {/* 쓰레기통 아이콘 */}

                    </button>
                </div>
            </div>
        )
    }

    return (
        <>
            <div
                className={`nc-ProductCard relative flex flex-col bg-transparent ${className}`}
            >

                <div
                    className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded-3xl overflow-hidden z-1 group">
                    <Link href={`/product/${product.id}`} className="block"
                          onClick={(event) => event.stopPropagation()}>
                        <NcImage
                            containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0"
                            src={imageSrc}
                            className="object-cover w-full h-full drop-shadow-xl"
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
                            alt="product"
                        />
                    </Link>

                    {product.sizes ? renderSizeList() : null}
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
                        {deleteButton()}
                    </div>

                </div>
            </div>
        </>
    );
};

export default ProductCard;
