// src/components/RenderAccountOrder.tsx
import Prices from "@/components/Prices";
import ImageFetcher from "@/components/ImageFetcher";

// 재귀적으로 특정 키를 찾는 유틸리티 함수
function findNestedProperty<T = any>(obj: any, key: string): T | undefined {
    if (!obj || typeof obj !== "object") return undefined;

    // 현재 객체에 키가 존재하면 반환
    if (key in obj) return obj[key] as T;

    // 하위 객체를 재귀적으로 탐색
    for (const value of Object.values(obj)) {
        const found = findNestedProperty(value, key);
        if (found !== undefined) return found;
    }

    return undefined;
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR"); // 한국어 날짜 형식으로 변환
}

export const renderProductItem = (product: any, index: number) => {
    //console.log("📦 product 데이터: ", product);

    const productId = findNestedProperty<string>(product, "id") || `product-${index}`;
    const productName = findNestedProperty<string>(product, "name") || "No name available";
    const productSubName = findNestedProperty<string>(product, "subName") || "No sub-name available";
    const brand = findNestedProperty<string>(product, "brand") || "No brand available";
    const originalPrice = findNestedProperty<number>(product, "price") || 0;
    const size = findNestedProperty<string>(product, "size") || "No size available";
    const createdAt = formatDate(product.createdAt); // createdAt 날짜 포맷팅

    const price = product.amount || product.currentBid || 0;

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
                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                경매 생성 날짜: {createdAt}
                            </p>
                        </div>

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
                        <button type="button" className="font-medium text-indigo-600 dark:text-primary-500">
                            Leave review
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


// 경매 내역 렌더링
export const renderAuctionHistory = (auctionProductList: any[]) => {
    console.log("🔍 renderAuctionHistory 호출됨");
    console.log("🗃️ auctionProductList 데이터:", auctionProductList);

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
    console.log("awardProductList :입찰내역 ", awardProductList)
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
    // console.log("🔍 renderAuctionHistory 호출됨");
    // console.log("🗃️ auctionProductList 데이터:", paymentProductList);
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
                        {paymentProductList.map((product, index) => renderProductItem(product, index))}
                    </div>
                ) : (
                    <p>내역이 없습니다.</p>
                )}
            </div>
        </div>
    );
};
