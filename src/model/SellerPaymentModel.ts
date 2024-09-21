interface SellerPaymentModel {
    id?: number;
    payment: PaymentModel;
    transactionId: number;
    amount: number;
    refundedAt: Date;
    status: PaymentStatus;
    reason: string;
    createdAt: Date;
    updatedAt: Date;
}