import NcImage from "@/shared/NcImage/NcImage";
import React from "react";
import {ImageModel} from "@/model/ftp/image.model";

type ImageSectionProps = {
    handleOpenModal: () => void,
    productImage: ImageModel;
    auctionImages: ImageModel[];
};

export const ImageSection = ({handleOpenModal, productImage, auctionImages}: ImageSectionProps) => {
    return (
        <div className="relative ">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-6">
                <div
                    className="md:h-full col-span-2 md:col-span-1 row-span-2 relative rounded-md sm:rounded-xl cursor-pointer"
                    onClick={handleOpenModal}
                >
                    <NcImage
                        alt="firt"
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        containerClassName="aspect-w-3 aspect-h-4 relative md:aspect-none md:absolute md:inset-0"
                        className="object-cover rounded-md sm:rounded-xl"
                        priority
                        src={productImage.uploadUrl}
                    />
                    <div
                        className="absolute inset-0 bg-neutral-900/20 opacity-0 hover:opacity-40 transition-opacity rounded-md sm:rounded-xl">
                    </div>
                </div>


                <div
                    className="col-span-1 row-span-2 relative rounded-md sm:rounded-xl overflow-hidden z-0 cursor-pointer"
                    onClick={handleOpenModal}
                >
                    <NcImage
                        alt=""
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        containerClassName="absolute inset-0"
                        className="object-cover w-full h-full rounded-md sm:rounded-xl"
                        src={Array.isArray(auctionImages) && auctionImages.length > 0
                            ? auctionImages[0].uploadUrl : ""}
                    />
                    <div
                        className="absolute inset-0 bg-neutral-900/20 opacity-0 hover:opacity-40 transition-opacity">

                    </div>
                </div>
                {(Array.isArray(auctionImages) && auctionImages) &&
                    [auctionImages[1], auctionImages[2]].map((item, index) => (
                        <div
                            key={index}
                            className={`relative rounded-md sm:rounded-xl overflow-hidden z-0 ${
                                index >= 2 ? "block" : ""
                            }`}
                        >
                            <NcImage
                                alt=""
                                fill
                                sizes="(max-width: 640px) 100vw, 33vw"
                                containerClassName="aspect-w-6 aspect-h-5 lg:aspect-h-4"
                                className="object-cover w-full h-full rounded-md sm:rounded-xl "
                                src={item?.uploadUrl || ""}
                            />

                            {/* OVERLAY */}
                            <div
                                className="absolute inset-0 bg-slate-900/20 opacity-0 hover:opacity-60 transition-opacity cursor-pointer"
                                onClick={handleOpenModal}
                            />
                        </div>
                    ))}
            </div>
            <div
                className="absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-white text-slate-500 cursor-pointer hover:bg-slate-200 z-10"
                onClick={handleOpenModal}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                </svg>
                <span className="ml-2 text-neutral-800 text-sm font-medium">전체 이미지 확인</span>
            </div>
        </div>
    )
};