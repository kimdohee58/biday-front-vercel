import {StarIcon} from "@heroicons/react/24/solid";
import {productImgs} from "@/contains/fakeData";
import React, {FC} from "react";
import NcImage from "@/shared/NcImage/NcImage";
import Link from "next/link";
import {StaticImageData} from "next/image";
import {ImageModel} from "@/model/ftp/image.model";
import Prices from "@/components/Prices";

export interface CollectionCard2Props {
    className?: string;
    imgs?: (string | ImageModel)[];
    name?: string;
    price?: number;
    description?: string;
}

const CollectionCard2Dohee: FC<CollectionCard2Props>
    = ({
           className,
           imgs = [],
           name = "Product Name",
           description = "Product Description",
           price,
       }) => {
    const getImageSrc = (img: string | ImageModel | undefined) => {
        if (!img) {
            return "/images/products/detail1.jpg"; // Fallback image
        }
        return typeof img === "string" ? img : img.uploadUrl;
    };

    return (
        <div className={`CollectionCard2 group relative ${className}`}>
            <div className="relative flex flex-col">
                {/* Main Image */}
                <NcImage
                    containerClassName="aspect-w-8 aspect-h-5 bg-neutral-100 rounded-2xl overflow-hidden"
                    className="object-contain w-full h-full rounded-2xl"
                    src={getImageSrc(imgs[0]) || "/images/products/detail1.jpg"}  // Fallback to default image
                    alt="Main Image"
                    width={400} // Width 추가
                    height={250} // Height 추가
                    sizes="400px"
                />
                <div className="grid grid-cols-3 gap-2.5 mt-2.5">
                    {/* Secondary Images */}
                    {imgs.slice(1, 4).map((img, idx) => (
                        <NcImage
                            key={idx}
                            containerClassName="w-full h-24 sm:h-28"
                            className="object-cover w-full h-full rounded-2xl"
                            src={getImageSrc(img) || "/images/products/detail1.jpg"}  // Fallback if image is missing
                            alt={`Image ${idx + 2}`}
                            width={150} // Width 추가
                            height={100} // Height 추가
                            sizes="150px"
                        />
                    ))}
                </div>
                {/*<NcImage*/}
                {/*    containerClassName="aspect-w-8 aspect-h-5 bg-neutral-100 rounded-2xl overflow-hidden"*/}
                {/*    className="object-contain w-full h-full rounded-2xl"*/}
                {/*    src={imgs[0]}*/}
                {/*    alt=""*/}
                {/*    sizes="400px"*/}
                {/*/>*/}
                {/*<div className="grid grid-cols-3 gap-2.5 mt-2.5">*/}
                {/*    <NcImage*/}
                {/*        containerClassName="w-full h-24 sm:h-28"*/}
                {/*        className="object-cover w-full h-full rounded-2xl"*/}
                {/*        src={imgs[1]}*/}
                {/*        alt=""*/}
                {/*        sizes="150px"*/}
                {/*    />*/}
                {/*    <NcImage*/}
                {/*        containerClassName="w-full h-24 sm:h-28"*/}
                {/*        className="object-cover w-full h-full rounded-2xl"*/}
                {/*        src={imgs[2]}*/}
                {/*        alt=""*/}
                {/*        sizes="150px"*/}
                {/*    />*/}
                {/*    <NcImage*/}
                {/*        containerClassName="w-full h-24 sm:h-28"*/}
                {/*        className="object-cover w-full h-full rounded-2xl"*/}
                {/*        src={imgs[3]}*/}
                {/*        alt=""*/}
                {/*        sizes="150px"*/}
                {/*    />*/}
                {/*</div>*/}
            </div>

            <div className="relative mt-5 flex justify-between">
                {/* TITLE */}
                <div className="flex-1">
                    <h2 className="font-semibold text-lg sm:text-xl ">{name}</h2>
                    {/* AUTHOR */}
                    <div className="mt-3 flex items-center text-slate-500 dark:text-slate-400">
            <span className="text-sm ">
              <span className="line-clamp-1">{description}</span>
            </span>
                        <span className="h-5 mx-1 sm:mx-2 border-l border-slate-200 dark:border-slate-700"></span>
                        <StarIcon className="w-4 h-4 text-orange-400"/>
                        <span className="text-sm ml-1 ">
              <span className="line-clamp-1">4.9 (269 reviews)</span>
            </span>
                    </div>
                </div>
                <Prices className="mt-0.5 sm:mt-1 ml-4" price={price}/>
            </div>
            <Link href={"/product-detail-2"} className="absolute inset-0 "></Link>
        </div>
    );
};

export default CollectionCard2Dohee;
