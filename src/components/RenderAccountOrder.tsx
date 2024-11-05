// src/components/RenderAccountOrder.tsx
import Prices from "@/components/Prices";
import ImageFetcher from "@/components/ImageFetcher";
import {format} from "date-fns";

function findNestedProperty<T = any>(obj: any, keys: string[]): T | undefined {
    if (!obj || typeof obj !== "object") return undefined; // Check for valid object at the start

    let current: any = obj;

    for (const key of keys) {
        // Check if current is still a valid object before accessing properties
        if (current && typeof current === "object" && key in current) {
            current = current[key];
        } else {
            return undefined; // Return undefined if any key is not found
        }
    }
    return current as T; // Return the found value
}


function formatDate(dateString: string): string {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        return "Invalid Date"; // 기본값 또는 에러 메시지 설정
    }
    return format(date, "yyyy-MM-dd");
}

const renderProductItem = (product: any, index: number, type: string,
                           onImg?: (auctionId: string) => void,
                           onCheckout?: (awardId: string, productId: string) => void
) => {


    const defaultProductId = `product-${index}`;
    const defaultProductName = "No name available";
    const defaultProductSubName = "No sub-name available";
    const defaultBrand = "No brand available";
    const defaultOriginalPrice = 0;
    const defaultSize = "No size available";

    let productId, productName, productSubName, brand, originalPrice, size, awardId: any;

    productId = findNestedProperty<string>(product, ["product", "sizeProduct", "id"]) ||
        findNestedProperty<string>(product, ["id"]) || defaultProductId;

    productName = findNestedProperty<string>(product, ["product", "sizeProduct", "name"]) || defaultProductName;
    productSubName = findNestedProperty<string>(product, ["product", "sizeProduct", "subName"]) || defaultProductSubName;
    brand = findNestedProperty<string>(product, ["product", "sizeProduct", "brand"]) || defaultBrand;
    originalPrice = findNestedProperty<number>(product, ["product", "sizeProduct", "price"]) || defaultOriginalPrice;
    size = findNestedProperty<string>(product, ["product", "size"]) || defaultSize;

    const auctionId: string | undefined = type === 'auction'
        ? findNestedProperty<string>(product, ["id"])?.toString() // auction 객체의 id를 문자열로 변환
        : type === 'bid'
            ? findNestedProperty<string>(product, ["auctionId"])?.toString() // bid 객체의 auctionId를 문자열로 변환
            : type === 'award'
                ? findNestedProperty<string>(product, ["auction", "id"])?.toString() // award 객체의 auction.id를 문자열로 변환
                : undefined;


    if (type === 'award') {
        awardId = product.id;
    }


    const price = product.amount || product.currentBid || 0;

    const createdAt = formatDate(findNestedProperty<string>(product, ["createdAt"]) || "Invalid Date");
    const startedAt = formatDate(findNestedProperty<string>(product, ["startedAt"]) || "Invalid Date");
    const endedAt = formatDate(findNestedProperty<string>(product, ["endedAt"]) || "Invalid Date");
    const approvedAt = formatDate(findNestedProperty<string>(product, ["approvedAt"]) || "Invalid Date");

    let registrationLabel = "등록 날짜:";
    let dateContent = createdAt; // Default to createdAt for most types

    if (type === 'payment') {
        registrationLabel = "결제 날짜:";
        dateContent = approvedAt;
    } else if (type === 'award') {
        registrationLabel = "낙찰 날짜:";
    } else if (type === 'bid') {
        registrationLabel = "입찰 날짜:";
    } else if (type === 'auction') {
        registrationLabel = "경매 날짜:";
        dateContent = `${startedAt} ~ ${endedAt}`; // Show the range for auction
    }

    // 경매 종료, 결제 불가 버튼 찍기
    const now = new Date();
    const endedDate = new Date(formatDate(endedAt));
    const createdDate = new Date(formatDate(createdAt));

    let isAvailable;

    if (type === 'award') {
        isAvailable = new Date(createdDate.getTime() + 3 * 24 * 60 * 60 * 1000) < now;
    } else if (type === 'auction') {
        isAvailable = new Date(endedDate.getTime() + 3 * 24 * 60 * 60 * 1000) < now;
    }

    return (
        <div key={index} className="flex py-4 sm:py-7 last:pb-0 first:pt-0 mb-2">

            <div
                onClick={['auction', 'bid', 'award'].includes(type) && onImg && auctionId ? () => {
                    onImg(auctionId,);
                } : undefined}

                style={{cursor: ['auction', 'bid', 'award'].includes(type) && auctionId ? 'pointer' : 'default'}}
            >
                <ImageFetcher id={productId} altText={productName}/>
            </div>

            <div className="ml-4 flex flex-1 flex-col">
                <div>
                    <div className="flex justify-between">
                        <div>
                            <h3 className="text-base font-medium line-clamp-1">{productName}</h3>
                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                <span>{productSubName}</span>
                                <span className="mx-2 border-l border-slate-200 dark:border-slate-700 h-4"></span>
                                <span>{size}</span>
                            </p>
                        </div>

                        <div>
                            {isAvailable ? (
                                <button
                                    disabled
                                    className="bg-gray-400 text-gray-700 border border-gray-500 cursor-not-allowed rounded-md py-1 px-3 font-semibold text-base w-32"
                                >
                                    {type === 'auction' ? 'Sold Out' : type === 'award' ? 'Unavailable' : 'Not Available'}
                                </button>
                            ) : (
                                <div
                                    onClick={type === 'award' && onCheckout ? () => onCheckout(awardId, productId) : undefined}
                                    style={{cursor: type === 'award' ? 'pointer' : 'default'}} // Change cursor based on type
                                >
                                    <Prices className="mt-0.5 ml-2" price={price} contentClass="py-2 px-3"/>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500 dark:text-slate-400 flex items-center">
                        <span className="hidden sm:inline-block">브랜드: {brand}</span>
                        <span className="inline-block sm:hidden">x</span>
                        <span className="ml-2">원가: {originalPrice}</span>
                    </p>

                    <div className="flex">
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            {registrationLabel} {dateContent}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};


// 경매 내역 렌더링
export const renderAuctionHistory = (auctionProductList: any[],
                                     onImg: (auctionId: string) => void
) => {
    return (
        <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden z-0">
            <div
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 sm:p-8 bg-slate-50 dark:bg-slate-500/5">
                <p className="text-lg font-semibold">경매 내역</p>
            </div>
            <div
                className="border-t border-slate-200 dark:border-slate-700 p-2 sm:p-8 divide-y divide-y-slate-200 dark:divide-slate-700">
                {auctionProductList && auctionProductList.length > 0 ? (
                    <div>
                        <p className="text-lg font-semibold mt-4">경매상품 정보</p>
                        {auctionProductList.map((product, index) => renderProductItem(product, index, "auction", onImg))}
                    </div>
                ) : (
                    <p>내역이 없습니다.</p>
                )}
            </div>
        </div>
    );
};


// 입찰 내역 렌더링
export const renderBidHistory = (bidProductList: any[],
                                 onImg: (auctionId: string) => void
) => {
    return (
        <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden z-0">
            <div
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 sm:p-8 bg-slate-50 dark:bg-slate-500/5">
                <p className="text-lg font-semibold"> 진행중 입찰 내역</p>
            </div>
            <div
                className="border-t border-slate-200 dark:border-slate-700 p-2 sm:p-8 divide-y divide-y-slate-200 dark:divide-slate-700">
                {bidProductList && bidProductList.length > 0 ? (
                    <div>
                        <p className="text-lg font-semibold mt-4">입찰상품 정보</p>
                        {bidProductList.map((product, index) => renderProductItem(product, index, "bid", onImg))}
                    </div>
                ) : (
                    <p>내역이 없습니다.</p>
                )}
            </div>
        </div>
    );
};

// 낙찰 내역 렌더링
// TODO 낙찰 이후 3일 뒤라면 결제 버튼 막기
// TODO 결제 완료 되었다면 완료 표시
export const renderAwardHistory = (
    awardProductList: any[],
    onImg: (auctionId: string) => void,
    onCheckout: (awardId: string, productId: string) => void
) => {
    return (
        <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden z-0">
            <div
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 sm:p-8 bg-slate-50 dark:bg-slate-500/5">
                <p className="text-lg font-semibold">낙찰 내역</p>
            </div>
            <div
                className="border-t border-slate-200 dark:border-slate-700 p-2 sm:p-8 divide-y divide-y-slate-200 dark:divide-slate-700">
                {awardProductList && awardProductList.length > 0 ? (
                    <div>
                        <p className="text-lg font-semibold mt-4">낙찰상품 정보</p>
                        {awardProductList.map((product, index) => renderProductItem(product, index, "award", onImg, onCheckout))}
                    </div>
                ) : (
                    <p>내역이 없습니다.</p>
                )}
            </div>
        </div>
    );
};


// 결제 내역 렌더링
export const renderPaymentHistory = (paymentProductList: any[]) => {
    return (
        <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden z-0">
            <div
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 sm:p-8 bg-slate-50 dark:bg-slate-500/5">
                <p className="text-lg font-semibold">결제 내역</p>
            </div>
            <div
                className="border-t border-slate-200 dark:border-slate-700 p-2 sm:p-8 divide-y divide-y-slate-200 dark:divide-slate-700">
                {paymentProductList && paymentProductList.length > 0 ? (
                    <div>
                        <p className="text-lg font-semibold mt-4">결제상품 정보</p>
                        {paymentProductList.map((product, index) => renderProductItem(product, index, "payment"))}
                    </div>
                ) : (
                    <p>내역이 없습니다.</p>
                )}
            </div>
        </div>
    );
};