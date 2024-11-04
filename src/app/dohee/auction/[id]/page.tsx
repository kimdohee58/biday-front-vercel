"use client";

import React, {Suspense, useEffect, useState} from "react";
import {ClockIcon, NoSymbolIcon, SparklesIcon,} from "@heroicons/react/24/outline";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import NcImage from "@/shared/NcImage/NcImage";
import IconDiscount from "@/components/IconDiscount";
import BagIcon from "@/components/BagIcon";
import toast from "react-hot-toast";
import {StarIcon} from "@heroicons/react/24/solid";
import SectionSliderProductCard from "@/components/SectionSliderProductCard";
import AccordionInfo from "@/components/AccordionInfo";
import ListingImageGallery from "@/components/listing-image-gallery/ListingImageGallery";
import {useParams, usePathname, useRouter, useSearchParams} from "next/navigation";
import {Route} from "next";
import {useMutation, useSuspenseQuery} from "@tanstack/react-query";
import Cookies from "js-cookie";
import {saveBid} from "@/service/auction/bid.service";
import {Timer} from "./Timer";
import {getColor} from "@/utils/productUtils";
import {useSuspenseAuctionAndProduct} from "@/hooks/react-query/useAuctionlist";
import HighestBid from "./HighestBid";
import NotifyBid from "./NotifyBid";
import LikeSaveBtns from "@/components/LikeSaveBtns";
import {findByAuctionId} from "@/service/auction/award.service";
import {useSelector} from "react-redux";
import {getUserToken} from "@/lib/features/user.slice";
import {differenceInMinutes} from "date-fns";
import {CancelAuction} from "@/service/auction/auction.service";
import {AwardDto} from "@/model/auction/award.model";

export default function AuctionDetailPage() {
    const thisPathname = usePathname();
    const [variantActive, setVariantActive] = useState(0);
    // const [sizeSelected, setSizeSelected] = useState(sizes ? sizes[0] : "");
    const [qualitySelected, setQualitySelected] = useState(1);
    const [isOpenModalViewAllReviews, setIsOpenModalViewAllReviews] = useState(false);
    const initialBid = 15000;
    const initialTimer = "2024-01-01T00:00:00.000Z";

    const [highestBid, setHighestBid] = useState<number>();
    const [adjustBid, setAdjustBid] = useState<number>(initialBid);
    const searchParams = useSearchParams();
    const productId = searchParams.get("productId" || "0") as string;
    const router = useRouter();
    const {id}: { id: string } = useParams();

    const handleBidUpdate = ({highestBid, adjustBid}: { highestBid: number, adjustBid: number }) => {
        setHighestBid(highestBid);
        setAdjustBid(adjustBid);
    }

    const mutation = useMutation({
        mutationFn: saveBid
    });


    const auctionData = useSuspenseAuctionAndProduct(id);

    const {auction, images: auctionImages = []} = auctionData.data.auction || {auction: null, images: []};
    const {product, image: productImage, size} = auctionData.data.product;
    const {id: userId, name: username} = auctionData.data.user;

    // 접속자 판매자 본인인지 여부
    const [isSeller, setIsSeller] = useState(false);
    const userToken = useSelector(getUserToken);

    useEffect(() => {
        console.log("userToken in Auction Detail", userToken);

        if (!userToken) return; // userToken이 없을 때 바로 종료

        if (auctionData.data.user) {
            setIsSeller(userId === userToken.userId);
        } else {
            setIsSeller(false);
        }

        console.log("isSeller", isSeller);
    }, [userToken, auction]);


    // 경매 status 여부
    const isEnded = auction.status;
    console.log("isEnded", isEnded)

    const { data: awardData } = useSuspenseQuery({
        queryKey: ["auctionId", auction?.id],
        queryFn: () => findByAuctionId(Number(auction?.id)),
    });

    const [award, setAward] = useState<AwardDto | null>(null);

    useEffect(() => {
        if (awardData) {
            setAward(awardData);
        }
    }, [awardData]);

    const [isCancel, setIsCancel] = useState(true);

    useEffect(() => {
        // 경매가 종료된 경우, 실행하지 않도록 함
        if (isEnded) {
            setIsCancel(false); // 혹은 원하는 기본값으로 설정
            return; // 이 시점에서 더 이상 실행하지 않음
        }

        const now = new Date();
        const auctionEnd = new Date(auction.endedAt);

        // 남은 시간이 70% 미만일 때 취소 불가 설정
        const auctionDuration = differenceInMinutes(auctionEnd, new Date(auction.startedAt));
        const remainingTime = differenceInMinutes(auctionEnd, now);
        const isBelowSeventyPercent = remainingTime / auctionDuration < 0.6;

        if (isSeller && isBelowSeventyPercent) {
            setIsCancel(false);
        }
    }, [auction, isSeller, isEnded]);

    const handleCloseModalImageGallery = () => {
        let params = new URLSearchParams(document.location.search);
        params.delete("modal");
        router.push(`${thisPathname}/?${params.toString()}` as Route);
    };
    const handleOpenModalImageGallery = () => {
        console.log('thisPathname >> ', `${thisPathname}`);
        router.push(`${thisPathname}/?productId=${productId}&modal=PHOTO_TOUR_SCROLLABLE` as Route);
    };

    const renderVariants = () => {

        return (
            <div>
                <label htmlFor="">
          <span className="text-sm font-medium">
            Color:
            <span className="ml-1 font-semibold">
               {getColor(product.name)}
            </span>
          </span>
                </label>
            </div>
        );
    };

    // 취소하시겠습니까 뜨게 하기 위함
    const [showCancelModal, setShowCancelModal] = useState(false);
    const onClickBidButton = () => {
        const token = Cookies.get("token");
        if (!token) {
            router.push("/login");
            return;
        }

        // sellerId 체크 추가
        if (isSeller) {
            setShowCancelModal(true);
            console.log("Seller ID가 존재합니다.");
        } else {
            if (!adjustBid) {
                return;
            }

            const currentBid = adjustBid;

            const bidData = {
                auctionId: Number(id),
                currentBid: currentBid,
            }

            mutation.mutate(bidData);

            toast.custom(
                (t) => (
                    <NotifyBid
                        productImage={productImage.uploadUrl}
                        qualitySelected={qualitySelected}
                        show={t.visible}
                        sizeSelected={size}
                        variantActive={variantActive}
                        productName={product.name}
                        price={currentBid}
                        size={size}
                        color={getColor(product.name)}
                    />
                ),
                {position: "top-right", id: "nc-product-notify", duration: 3000}
            );
        }
    };

    // 경매 취소
    const [isCancelling, setIsCancelling] = useState(false);
    const [isCancelled, setIsCancelled] = useState(false);
    const handleConfirmCancel = async () => {
        setIsCancelling(true);
        try {
            const cancelMessage = await CancelAuction(Number(auction?.id));

            if (cancelMessage === "경매 취소 성공") {
                setIsCancelled(true);
            } else {
                console.error("경매 취소 실패:", cancelMessage);
            }
        } catch (error) {
            console.error("API 호출 중 오류 발생:", error);
        } finally {
            // 로딩 상태 해제
            setIsCancelling(false);
        }
    };

    const renderSizeList = () => {
        return (
            <div>
                <div className="flex justify-between font-medium text-sm">
                    <label htmlFor="">
            <span className="">
              Size:
              <span className="ml-1 font-semibold"> {auctionData.data.product.size}</span>
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
            </div>
        );
    };

    const renderStatus = () => {
        if (!status) {
            return null;
        }
        const CLASSES =
            "text-sm flex items-center text-slate-700 text-slate-900 dark:text-slate-300";
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
    };

    const renderSectionSidebar = () => {
        return (
            <>
                <div className="mb-4">
                    {!isEnded && (
                        <Timer endedTime={auction?.endedAt ? new Date(auction.endedAt).toISOString() : initialTimer}/>
                    )}
                </div>
                <div className="listingSectionSidebar__wrap lg:shadow-lg relative">
                    <div className="space-y-7 lg:space-y-8 relative">
                        <div className="">
                            <div className="flex items-center justify-between space-x-5">
                                <div className="flex text-2xl font-semibold">
                                    {isEnded ? (
                                        award && Object.keys(award).length > 0 ? (
                                            <span>낙찰가: {award.currentBid}원</span>
                                        ) : (
                                            <span className="text-red-500 font-semibold">취소된 경매입니다.</span>
                                        )
                                    ) : (
                                        <span>{highestBid}원</span>
                                    )}
                                </div>
                                <a className="flex items-center text-sm font-medium">
                                    <div className="">
                                        <StarIcon className="w-5 h-5 pb-[1px] text-orange-400"/>
                                    </div>
                                    <span className="ml-1.5 flex">
                                        <span>4.9 </span>
                                        <span className="mx-1.5">·</span>
                                    </span>
                                </a>
                            </div>

                            <div className="mt-6 space-y-7 lg:space-y-8">
                                <div className="">{renderVariants()}</div>
                                <div className="">{renderSizeList()}</div>
                            </div>
                        </div>

                        <div className="flex space-x-3.5">
                            <div
                                className="flex items-center justify-center bg-slate-100/70 dark:bg-slate-800/70 px-2 py-3 sm:p-3.5 rounded-full">
                                🪙 : {isEnded ? '---' : adjustBid}
                            </div>
                            <ButtonPrimary
                                className={`flex-1 flex-shrink-0 ${isEnded ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                                onClick={onClickBidButton}
                                disabled={isEnded || (isSeller && !isCancel)}
                            >
                                <BagIcon className="hidden sm:inline-block w-5 h-5 mb-0.5"/>
                                <span className="ml-3">
                                    {isEnded ? '경매 종료' : (isSeller ? (isCancel ? '경매 취소' : '취소 불가') : '입찰 참여')}
                                </span>
                            </ButtonPrimary>
                        </div>
                    </div>
                </div>
            </>
        );
    };

    const maskUsername = (username: string | undefined) => {
        if (!username) {
            return '';
        }

        if (username.length === 1) {
            return username;
        }
        if (username.length === 2) {
            return username.charAt(0) + '*';
        }

        const firstChar = username.charAt(0); // 첫 번째 문자
        const lastChar = username.charAt(username.length - 1);
        const maskedPart = '*'.repeat(username.length - 2);

        return `${firstChar}${maskedPart}${lastChar}`;
    };

    const section1Data = [
        {
            name:"판매자 정보",
            content: maskUsername(username),
        },
        {
            name: "경매 상품 설명",
            content: auction?.description,
        }
    ];

    const renderSection1 = () => {
        return (
            <div className="listingSection__wrap !space-y-6">
                <div>
                    <h2 className="text-2xl md:text-3xl font-semibold">
                        {product.name}
                    </h2>
                    <div className="flex items-center mt-4 sm:mt-5">
                        <a
                            href="#reviews"
                            className="hidden sm:flex items-center text-sm font-medium "
                        >
                            <div className="">
                                <StarIcon className="w-5 h-5 pb-[1px] text-slate-800 dark:text-slate-200"/>
                            </div>
                            <span className="ml-1.5">
                <span>4.9</span>
                <span className="mx-1.5">·</span>
                <span className="text-slate-700 dark:text-slate-400 underline">
                  142 reviews
                </span>
              </span>
                        </a>
                        <span className="hidden sm:block mx-2.5">·</span>
                        {renderStatus()}
                        <div className="ml-auto">
                            <LikeSaveBtns/>
                        </div>
                    </div>
                </div>

                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

                <AccordionInfo panelClassName="p-4 pt-3.5 text-slate-600 text-base dark:text-slate-300 leading-7"
                               data={section1Data}/>

            </div>
        );
    };

    const renderSection2 = () => {
        const convertNewlinesToBr = (text: string) => {
            return text.replace(/\n/g, '<br />');
        };

        return (
            <div className="listingSection__wrap !border-b-0 !pb-0">
                <h2 className="text-2xl font-semibold">Product details</h2>
                <div
                    className="prose prose-sm sm:prose dark:prose-invert sm:max-w-4xl"
                    dangerouslySetInnerHTML={{ __html: convertNewlinesToBr(product.description) }}
                />
            </div>
        );
    };

    return (
        <div className={`ListingDetailPage nc-ProductDetailPage2`}>
            <>
                <header className="container mt-8 sm:mt-10">
                    <div className="relative ">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-6">
                            <div
                                className="md:h-full col-span-2 md:col-span-1 row-span-2 relative rounded-md sm:rounded-xl cursor-pointer"
                                onClick={handleOpenModalImageGallery}
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
                                onClick={handleOpenModalImageGallery}
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

                                        <div
                                            className="absolute inset-0 bg-slate-900/20 opacity-0 hover:opacity-60 transition-opacity cursor-pointer"
                                            onClick={handleOpenModalImageGallery}
                                        />
                                    </div>
                                ))}
                        </div>
                        <div
                            className="absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-white text-slate-500 cursor-pointer hover:bg-slate-200 z-10"
                            onClick={handleOpenModalImageGallery}
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
                </header>
            </>

            <main className="container relative z-10 mt-9 sm:mt-11 flex ">
                <div className="w-full lg:w-3/5 xl:w-2/3 space-y-10 lg:pr-14 lg:space-y-14">
                    {renderSection1()}
                    {renderSection2()}
                </div>

                <div className="flex-grow">
                    <div className="hidden lg:block sticky top-28">
                        {renderSectionSidebar()}
                    </div>
                </div>
            </main>
            <HighestBid auctionId={id} onDataUpdate={handleBidUpdate}/>

            <div className="container pb-24 lg:pb-28 pt-14 space-y-14">
                <hr className="border-slate-200 dark:border-slate-700"/>

                <SectionSliderProductCard
                    heading="Customers also purchased"
                    subHeading=""
                    headingFontClassName="text-2xl font-semibold"
                    headingClassName="mb-10 text-neutral-900 dark:text-neutral-50"
                />
            </div>

            <Suspense>
                <div>
                    {isEnded && (
                        // <div
                        //     className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-43 text-red-600 border-8 border-red-600 font-bold text-8xl bg-white rounded-md shadow-md w-[700px] h-[200px] flex items-center justify-center text-center leading-none overflow-hidden"
                        // >
                        //     <span className="whitespace-nowrap">SOLD OUT</span>
                        // </div>
                        <div
                            className="absolute top-[35%] left-1/2 transform -translate-x-1/2 -rotate-40 bg-red-600 border-8 border-white font-bold text-8xl text-white rounded-md shadow-md w-[700px] h-[200px] flex items-center justify-center text-center leading-none overflow-hidden z-10"
                        >
                            <span className="whitespace-nowrap">SOLD OUT</span>
                        </div>
                    )}

                    <ListingImageGallery
                        onClose={handleCloseModalImageGallery}
                        images={[
                            ...((!Array.isArray(productImage) && productImage) ? [productImage] : []),
                            ...((Array.isArray(auctionImages) ? auctionImages : [auctionImages])),
                        ].map((item, index) => {
                            return {
                                id: index,
                                url: item.uploadUrl,
                            };
                        })}
                    />
                </div>
            </Suspense>

            {showCancelModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md w-full">
                        {isCancelling ? (
                            <p className="mb-4">취소하는 중...</p>
                        ) : isCancelled ? (
                            <>
                                <p className="mb-4">취소가 완료되었습니다.</p>
                                <button
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-4"
                                    onClick={() => window.location.reload()} // 페이지 새로고침
                                >
                                    확인
                                </button>
                            </>
                        ) : (
                            <p className="mb-4">현재 진행 중인 경매를 취소하겠습니까?</p>
                        )}
                        {!isCancelling && !isCancelled && (
                            <div className="flex justify-center gap-4">
                                <button
                                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                    onClick={() => setShowCancelModal(false)}
                                >
                                    아니오
                                </button>
                                <button
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    onClick={handleConfirmCancel}
                                >
                                    예
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
