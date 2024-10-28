//src/utils/extract.ts
export const extractSizeIds = (data: any) => {
    if (data?.content && Array.isArray(data.content)) {
        return data.content.map((item: any) => item.auction?.sizeId || item.sizeId);
    }
    return [];
};

export const extractAwardIdsFromPaymentData = (paymentData: any[]) => {
    return paymentData.map((payment) => payment.awardId);
};
