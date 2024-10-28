// src/components/RenderAccountOrder.tsx
import Prices from "@/components/Prices";
import ImageFetcher from "@/components/ImageFetcher";
import { format } from "date-fns";

function findNestedProperty<T = any>(obj: any, key: string): T | undefined {
    if (!obj || typeof obj !== "object") return undefined;

    if (key in obj) return obj[key] as T;

    for (const value of Object.values(obj)) {
        const found = findNestedProperty(value, key);
        if (found !== undefined) return found;
    }

    return undefined;
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);

    // 날짜가 유효하지 않은 경우 처리
    if (isNaN(date.getTime())) {
        // console.warn("Invalid date string provided:", dateString); 잠시 주석처리
        return "Invalid Date"; // 기본값 또는 에러 메시지 설정
    }

    return format(date, "yyyy-MM-dd HH:mm:ss");
}


export const renderProductItem = (product: any, index: number, type?: string) => {

    const productId = findNestedProperty<string>(product, "id") || `product-${index}`;
    const productName = findNestedProperty<string>(product, "name") || "No name available";
    const productSubName = findNestedProperty<string>(product, "subName") || "No sub-name available";
    const brand = findNestedProperty<string>(product, "brand") || "No brand available";
    const originalPrice = findNestedProperty<number>(product, "price") || 0;
    const size = findNestedProperty<string>(product, "size") || "No size available";
    const price = product.amount || product.currentBid || 0;

    const createdAt = formatDate(product.createdAt); // createdAt 날짜 포맷팅

    // 날짜 포맷팅
    const startedAt = formatDate(product.startedAt);
    const endedAt = formatDate(product.endedAt);

    return (
        <div key={index} className="flex py-4 sm:py-7 last:pb-0 first:pt-0 mb-2">
            {/* ImageFetcher 컴포넌트를 사용하여 이미지 가져오기 */}
            <ImageFetcher id={productId} altText={productName} />

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

                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            낙찰 생성 날짜: {createdAt}
                        </p>

                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            시작 시간: {startedAt}
                        </p>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            종료 시간: {endedAt}
                        </p>
                        <Prices className="mt-0.5 ml-2" price={price} contentClass="py-2 px-3"/>
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
                            생성 날짜: {createdAt}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};


// 경매 내역 렌더링
export const renderAuctionHistory = (auctionProductList: any[]) => {
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
                        {auctionProductList.map((product, index) => renderProductItem(product, index))}
                    </div>
                ) : (
                    <p>내역이 없습니다.</p>
                )}
            </div>
        </div>
    );
};

// 입찰 내역 렌더링
export const renderBidHistory = (bidProductList: any[]) => {

    return (
        <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden z-0">
            <div
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 sm:p-8 bg-slate-50 dark:bg-slate-500/5">
                <p className="text-lg font-semibold">입찰 내역</p>
            </div>
            <div
                className="border-t border-slate-200 dark:border-slate-700 p-2 sm:p-8 divide-y divide-y-slate-200 dark:divide-slate-700">
                {bidProductList && bidProductList.length > 0 ? (
                    <div>
                        <p className="text-lg font-semibold mt-4">입찰상품 정보</p>
                        {bidProductList.map((product, index) => renderProductItem(product, index))}
                    </div>
                ) : (
                    <p>내역이 없습니다.</p>
                )}
            </div>
        </div>
    );
};

// 낙찰 내역 렌더링
export const renderAwardHistory = (awardProductList: any[]) => {
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
                        {awardProductList.map((product, index) => renderProductItem(product, index))}

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
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 sm:p-8 bg-slate-50 dark:bg-slate-500/5">
                <p className="text-lg font-semibold">결제 내역</p>
            </div>
            <div className="border-t border-slate-200 dark:border-slate-700 p-2 sm:p-8 divide-y divide-y-slate-200 dark:divide-slate-700">
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
