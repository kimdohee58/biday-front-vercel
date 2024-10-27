export const extractSizeIds = (data: any) => {
    if (data?.content && Array.isArray(data.content)) {
        return data.content.map((item: any) => item.auction?.sizeId || item.sizeId);
    }
    return [];
};

export const extractAwardIdsFromPaymentData = (paymentData: any[]) => {
    console.log("extractAwardIdsFromPaymentData :",paymentData)
    return paymentData.map((payment) => payment.awardId);
};
