import {HeartIcon, StarIcon} from "@heroicons/react/24/solid";
import {productImgs} from "@/contains/fakeData";
import React, {FC} from "react";
import NcImage from "@/shared/NcImage/NcImage";
import Link from "next/link";
import {StaticImageData} from "next/image";
import {ImageModel} from "@/model/ftp/image.model";
import Prices from "@/components/Prices";

export interface CollectionCard2Props {
    id?: number;
    className?: string;
    imgs?: (string | ImageModel)[];
    name?: string;
    price?: number;
    description?: string;
    wishes?: number;
    endedAt?: Date;
    user?: string;
}

const CollectionCard2Dohee: FC<CollectionCard2Props>
    = ({
           id = 0,
           className,
           imgs = [],
           name = "",
           description = "",
           price = 0,
           wishes = 0,
           endedAt = "",
           user = "",
       }) => {
    const getImageSrc = (img: string | ImageModel | undefined) => {
        if (!img) {
            return "/images/products/detail1.jpg"; // Fallback image
        }
        return typeof img === "string" ? img : img.uploadUrl;
    };

    const formatUser = (userName: string) => {
        if (userName.length <= 2) return "*"; // 2글자 이하일 경우 별표로 표시
        return `${userName[0]}*${userName[userName.length - 1]}`;
    };

    const formatDate = (date: Date | string) => {
        const endDate = new Date(date);

        const formattedDate = `${endDate.getFullYear().toString().slice(-2)}/${
            String(endDate.getMonth() + 1).padStart(2, '0')
        }/${String(endDate.getDate()).padStart(2, '0')} ${String(endDate.getHours()).padStart(2, '0')}:${String(endDate.getMinutes()).padStart(2, '0')}:${String(endDate.getSeconds()).padStart(2, '0')}`;

        return `~ ${formattedDate} 까지`;
    };

    return (
        <div className={`CollectionCard2 group ${className}`}>
            <div className={"flex"}>
                <div className="flex-none w-3/4 pr-2">
                    {/* Main Image */}
                    <NcImage
                        containerClassName="aspect-w-20 aspect-h-10 bg-neutral-100 rounded-2xl overflow-hidden"
                        className="bg-cover w-full h-full rounded-2xl object-cover"
                        src={getImageSrc(imgs[0]) || "/images/products/detail1.jpg"}  // Fallback to default image
                        alt="Main Image"
                        width={400}
                        height={250}
                        sizes="500px"
                    />
                </div>
                <div className="flex-none w-1/4 grid grid-cols-1 gap-2.5 mt-2.5 ml-2">
                    {/* Secondary Images */}
                    {imgs.slice(1, 4).map((img, idx) => (
                        <NcImage
                            key={idx}
                            containerClassName="w-full h-24 sm:h-28"
                            className="object-cover w-full h-full rounded-2xl"
                            src={getImageSrc(img) || "/images/products/detail1.jpg"}  // Fallback if image is missing
                            alt={`Image ${idx + 2}`}
                            width={150}
                            height={100}
                            sizes="150px"
                        />
                    ))}
                </div>
            </div>

            <div className="relative mt-5 flex justify-between">
                {/* TITLE */}
                <div className="flex-1">
                    <h2 className="font-semibold text-lg sm:text-xl ">{name || "이름 없음"}</h2>
                    {/* AUTHOR */}
                    <div className="mt-3 flex items-center text-slate-500 dark:text-slate-400">
                        {/*<span className="flex text-sm">*/}
                        {/*  <span className="line-clamp-1">{formatUser(user) || "판매자 없음"}</span>*/}
                        {/*</span>*/}
                        {/*<span className="h-5 mx-1 sm:mx-2 border-l border-slate-200 dark:border-slate-700"></span>*/}
                        <span className="flex text-sm">
                          <span className="line-clamp-1">{formatDate(endedAt) || "설명 없음"}</span>
                        </span>
                        {/*<span className="h-5 mx-1 sm:mx-2 border-l border-slate-200 dark:border-slate-700"></span>*/}
                        {/*<span className="flex text-sm">*/}
                        {/*  <span className="line-clamp-1">{description || "설명 없음"}</span>*/}
                        {/*</span>*/}
                        <span
                            className="h-5 mx-1 sm:mx-2 border-l border-slate-200 dark:border-slate-700"></span>
                        <HeartIcon className="w-4 h-4 text-orange-400"/>
                        <span className="flex text-sm ml-1">
                          <span className="line-clamp-1">{wishes || 0} (269 reviews)</span>
                        </span>
                    </div>
                </div>
                <Prices className="mt-0.5 sm:mt-1 ml-4" price={price || 0}/>
            </div>
            <Link href={`/auction/${id}`} className="absolute inset-0"></Link>
        </div>
    );
};

export default CollectionCard2Dohee;
