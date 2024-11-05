"use client";

import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import BagIcon from "@/components/BagIcon";

import {SparklesIcon} from "@heroicons/react/24/outline";
import Prices from "@/components/Prices";
import Policy from "./Policy";
import SectionPromo2 from "@/components/SectionPromo2";
import Image from "next/image";
import {ImageModel} from "@/model/ftp/image.model"
import React, {useState} from "react";
import {formatProductName, getColor} from "@/utils/productUtils";
import AuctionTable from "@/app/product/[id]/AuctionTable";
import {HeartIcon} from "@heroicons/react/24/solid";
import {ColorType, ProductWithImageModel} from "@/model/product/product.model";
import {useFetchAuctionBySizeIdsWithUser} from "@/hooks/react-query/useAuctionlist";
import {Colors} from "@/data/color";
import LikeButton from "@/components/LikeButton";
import Chart from "@/app/product/[id]/Chart";
import {useRouter, useSearchParams} from "next/navigation";
import Cookies from "js-cookie";
import {UserToken} from "@/model/user/userToken";
import {UserRole} from "@/model/user/user.model";
import {Spinner} from "@/shared/Spinner/Spinner";
import {useSuspenseProductDetail} from "@/hooks/react-query/useProductlist";

type ProductDetailProps = {
    product: ProductWithImageModel,
    size: string[],
    colors: ColorType[],
    productWithImagesArray: ProductWithImageModel[];
}

function RenderImage({image}: { image: ImageModel }) {

    return (
        <div className="aspect-w-16 aspect-h-16 relative">
            <Image
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                src={image ? `${image.uploadUrl}` : "/error.jpg"}
                className="w-full rounded-2xl object-cover"
                alt={"test"}
            />
        </div>
    );
}

type RenderSizeListProps = {
    sizeArray: string[];
    onClickSizeButton: (size: string) => void;
    currentSize: string | null;
    sizes: number[];
}

function RenderSizeList({sizeArray, onClickSizeButton, currentSize, sizes}: RenderSizeListProps) {
    if (!sizeArray || !sizes || !sizes.length) {
        return null;
    }

    return (
        <div>
            <div className="flex justify-between font-medium text-sm">
                <label htmlFor="">

            <span className="">
              Size:
              <span className="ml-1 font-semibold">{currentSize || "ALL"}</span>
            </span>
                </label>
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="##"
                    className="text-primary-6000 hover:text-primary-500"
                >
                    See sizing chart
                </a>
            </div>
            <div className="grid grid-cols-5 sm:grid-cols-7 gap-2 mt-3">
                {sizeArray.map((size, index) => {
                    const isActive = size === currentSize;
                    return (
                        <div
                            key={index}
                            className={`relative h-10 sm:h-11 rounded-2xl border flex items-center justify-center text-sm sm:text-base uppercase font-semibold select-none overflow-hidden z-0 cursor-pointer
                                ${
                                isActive
                                    ? "bg-primary-600 border-primary-6000 text-white hover:bg-primary-6000"
                                    : "border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-200 hover:bg-neutral-50 dark:hover:bg-neutral-700"
                            }`}
                            onClick={() => onClickSizeButton(size)}
                        >
                            {size}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default function ProductClientComponent({productId} : { productId: string}) {
    const {data: product} = useSuspenseProductDetail(productId);

    const router = useRouter();

    const searchParams = useSearchParams();
    const size = searchParams.get("size");
    const {product: productWithImage, size: sizeArray, colors, productWithImagesArray} = product;
    const {product: initialProduct} = productWithImage;
    const productArray = productWithImagesArray.map((product) => {
        return {
            product: product.product,
            image: product.image,
            color: Colors[product.product.color],
        }

    });

    const getSizeId = (sizeName: string | null) => {
        if (!sizeName) {
            return null;
        }

        const sizeModel = initialProduct.sizes.find(size => size.size === sizeName);
        return sizeModel ? sizeModel.id : null;
    };

    const getIndex = productArray.findIndex(p => p.product.id === initialProduct.id);
    const [colorActive, setColorActive] = useState(colors.findIndex(c => c === initialProduct.color));
    const [currentProduct, setCurrentProduct] = useState(productArray[getIndex].product);
    const [image, setImage] = useState(productArray[getIndex].image);
    const [currentSize, setCurrentSize] = useState<string | null>(size || null);
    const [currentSizeId, setCurrentSizeId] = useState<number | null>(size ? getSizeId(size) : null);
    console.log("currentSizeId", currentSizeId);


    const onClickColorButton = (index: number) => {
        setColorActive(index);
        setCurrentProduct(productArray[index].product);
        setImage(productArray[index].image);
    };

    const onClickSizeButton = (size: string) => {
        if (currentSize === size) {
            setCurrentSize(null);
            setCurrentSizeId(null);
        } else {
            setCurrentSize(size);
            setCurrentSizeId(getSizeId(size));
        }
    };

    const sizes = initialProduct.sizes.map((size) => size.id);
    const auctions = useFetchAuctionBySizeIdsWithUser(sizes);

    const onClickSaleButton = () => {
        const userToken = Cookies.get("userToken");
        if (!userToken) {
            router.push("/login");
        } else {
            const parsedToken:UserToken = JSON.parse(userToken);
            const role = parsedToken.userRole[0];
            switch (role) {
                case UserRole.USER :
                    router.push("/account-seller");
                    break;
                case UserRole.SELLER :
                    router.push(`/auction/insert?productId=${currentProduct.id}`);
                    break;
            }
        }
    }

    /* const renderStatus = () => {
         if (!status) {
             return null;
         }
         const CLASSES =
             "absolute top-3 left-3 px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 nc-shadow-lg rounded-full flex items-center justify-center text-slate-700 text-slate-900 dark:text-slate-300";
         if (status === "New in") {
             return (
                 <div className={CLASSES}>
                     <SparklesIcon className="w-3.5 h-3.5"/>
                     <span className="ml-1 leading-none">{status}</span>
                 </div>
             );
         }
         if (status === "50% Discount") {
             return (
                 <div className={CLASSES}>
                     <IconDiscount className="w-3.5 h-3.5"/>
                     <span className="ml-1 leading-none">{status}</span>
                 </div>
             );
         }
         if (status === "Sold Out") {
             return (
                 <div className={CLASSES}>
                     <NoSymbolIcon className="w-3.5 h-3.5"/>
                     <span className="ml-1 leading-none">{status}</span>
                 </div>
             );
         }
         if (status === "limited edition") {
             return (
                 <div className={CLASSES}>
                     <ClockIcon className="w-3.5 h-3.5"/>
                     <span className="ml-1 leading-none">{status}</span>
                 </div>
             );
         }
         return null;
     };*/

    const renderColors = () => {
        if (!productArray || !productArray.length) {
            return null;
        }

        return (
            <div>
                <label htmlFor="">
          <span className="text-sm font-medium">
            Color:
            <span className="ml-1 font-semibold">
              {getColor(currentProduct.name)}
            </span>
          </span>
                </label>
                <div className="flex mt-3">
                    {productArray.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => onClickColorButton(index)}
                            className={`relative flex-1 max-w-[75px] h-10 sm:h-11 rounded-full border-2 cursor-pointer ${
                                colorActive === index
                                    ? item.color.color
                                    : "border-transparent"
                            }`}
                        >
                            <div
                                className="absolute inset-0.5 rounded-full overflow-hidden z-0 object-cover bg-cover"
                                style={{
                                    backgroundImage: `url(${
                                item.color.thumbnail.src
                            })`,
                                }}
                            ></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };


    const renderSectionContent = () => {
        return (
            <div className="space-y-7 2xl:space-y-8">
                {/* ---------- 1 HEADING ----------  */}
                <div>
                    <h2 className="text-2xl sm:text-3xl font-semibold">
                        {formatProductName(currentProduct.name)}
                    </h2>
                    <h6 className="text-gray-300 text-left">
                        {currentProduct.subName}
                    </h6>

                    <div className="flex items-center mt-5 space-x-4 sm:space-x-5">
                        {/* <div className="flex text-xl font-semibold">$112.00</div> */}
                        <Prices
                            contentClass="py-1 px-2 md:py-1.5 md:px-3 text-lg font-semibold"
                            price={currentProduct.price}
                        />

                        <div className="h-7 border-l border-slate-300 dark:border-slate-700"></div>

                        <div className="flex items-center">
                            <a
                                className="flex items-center text-sm font-medium"
                            >
                                <HeartIcon className="w-5 h-5 pb-[1px] text-red-500"/>
                                <div className="ml-1.5 flex">
                  <span className="text-slate-600 dark:text-slate-400">
                    {currentProduct.wishes} wishes
                  </span>
                                </div>
                            </a>
                            <span className="hidden sm:block mx-2.5">·</span>
                            <div className="hidden sm:flex items-center text-sm">
                                <SparklesIcon className="w-3.5 h-3.5"/>
                                <span className="ml-1 leading-none">임시 status</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div>{renderColors()}</div>
                <RenderSizeList sizes={sizes} currentSize={currentSize} sizeArray={sizeArray}
                                onClickSizeButton={onClickSizeButton}/>

                <div className="flex space-x-3.5">
                    <ButtonPrimary
                        className="flex-1 flex-shrink-0"
                        onClick={onClickSaleButton}
                    >
                        <BagIcon className="hidden sm:inline-block w-5 h-5 mb-0.5"/>
                        <span className="ml-3">판매하기</span>
                    </ButtonPrimary>
                </div>
                <hr className=" 2xl:!my-10 border-slate-200 dark:border-slate-700"></hr>
                <div className="flex-1 items-center justify-center mt-5 space-x-3.5">
                    {
                        !auctions.isLoading ? (
                                <AuctionTable auctions={auctions.data || []} product={currentProduct}
                                              size={currentSizeId}/>)
                            :
                            (<Spinner/>)
                    }

                </div>

                {/* ---------- 5 ----------  */}
                {/*<AccordionInfo />*/}

                <div className="hidden xl:block">
                    <Policy/>
                </div>
            </div>
        );
    };

    const renderDetailSection = () => {
        return (
            <div className="">
                <h2 className="text-2xl font-semibold">Product Details</h2>
                <div className="prose prose-sm sm:prose dark:prose-invert sm:max-w-4xl mt-7">
                    <p dangerouslySetInnerHTML={{__html: currentProduct.description.replace(/\\n/g, '<br/>')}}/>
                </div>
            </div>
        );
    };

    return (
        <div className={"nc-ProductDetailPage"}>
            {/* MAIn */}
            <main className="container mt-5 lg:mt-11">
                <div className="lg:flex">
                    {/* CONTENT */}
                    <div className="w-full lg:w-[55%] ">
                        {/* HEADING */}
                        <div className="relative">
                            <RenderImage image={image}/>
                            {/*{renderStatus()}*/}
                            {/* META FAVORITES */}
                            <LikeButton className="absolute right-3 top-3 "
                                        productId={Number(product.product.product.id)}/>
                        </div>
                    </div>

                    {/* SIDEBAR */}
                    <div className="w-full lg:w-[45%] pt-10 lg:pt-0 lg:pl-7 xl:pl-9 2xl:pl-10">
                        {renderSectionContent()}
                    </div>
                </div>

                {/* DETAIL AND REVIEW */}
                <Chart/>

                <div className="mt-12 sm:mt-16 space-y-10 sm:space-y-16">



                    {renderDetailSection()}

                    <hr className="border-slate-200 dark:border-slate-700"/>

                    <hr className="border-slate-200 dark:border-slate-700"/>

                    {/* OTHER SECTION */}
                    {/* <SectionSliderProductCard
                        heading="Customers also purchased"
                        subHeading=""
                        headingFontClassName="text-2xl font-semibold"
                        headingClassName="mb-10 text-neutral-900 dark:text-neutral-50"
                    />*/}

                    {/* SECTION */}
                    <div className="pb-20 xl:pb-28 lg:pt-14">
                        <SectionPromo2/>
                    </div>
                </div>
            </main>
        </div>
    );
};