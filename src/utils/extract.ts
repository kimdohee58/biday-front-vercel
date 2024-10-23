//src/utils/extract.ts
// auctionData와 awardData에서 sizeId를 추출하는 함수
export const extractSizeIds = (data: any) => {
    if (data?.content && Array.isArray(data.content)) {
        return data.content.map((item: any) => item.auction?.sizeId || item.sizeId);
    }
    return [];
};

// paymentData에서 awardId를 추출하는 함수
export const extractAwardIdsFromPaymentData = (paymentData: any[]) => {
    return paymentData.map((payment) => payment.awardId);
};
