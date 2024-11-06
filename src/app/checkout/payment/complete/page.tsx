// 결제 완료될 경우 리다이렉트 될 페이지
"use client";

import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {PaymentSaveModel} from "@/model/order/paymentSave.model";
import {Spinner} from "@/shared/Spinner/Spinner";
import {CheckoutDataModel} from "@/model/order/paymentTemp.model";
import {useUpdateStatus} from "@/hooks/react-query/useAward";

export default function CompletePage() {
    const router = useRouter();
    const [paymentData, setPaymentData] = useState<PaymentSaveModel>();
    const [checkoutData, setCheckoutData] = useState<CheckoutDataModel>();
    const [method, setMethod] = useState<string>();
    const { mutate : updateStatus} = useUpdateStatus();


    useEffect(() => {
        const storageData = sessionStorage.getItem("paymentData");
        const storageCheckoutData = sessionStorage.getItem("checkoutData");

        if (storageData) {
            setPaymentData(JSON.parse(storageData));
            sessionStorage.removeItem("paymentData");
        } else {
            console.error("sessionStorage 에서 paymentData 로드 중 오류 발생");
            router.push("/checkout/payment/fail");
        }

        if (storageCheckoutData) {
            setCheckoutData(JSON.parse(storageCheckoutData));
            sessionStorage.removeItem("checkoutData");
        } else {
            console.error("sessionStorage 에서 checkoutData 로드 중 오류 발생");
            router.push("/checkout/payment/fail");
        }
    }, []);

    useEffect(() => {
        if (checkoutData) {
            updateStatus(Number(checkoutData.awardId));
            console.log("updateStatus");
        }
    }, [checkoutData, updateStatus]);


    if (!paymentData || !checkoutData) {
        return <div className="flex items-center justify-center h-screen w-screen">
            <Spinner/>
        </div>;
    }


    return (
        <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
            <div className="mx-auto max-w-2xl px-4 2xl:px-0">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-2">결제가 완료되었습니다.</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-6 md:mb-8">주문 번호 <a href="#"
                                                                                      className="font-medium text-gray-900 dark:text-white hover:underline">{paymentData.orderId}</a>
                    의 결제가 완료되었습니다. 주문 정보는 판매자에게 전달되어, 판매자가 배송을 시작하면 카카오톡으로 알림을 받을 수 있습니다.</p>
                <div
                    className="space-y-4 sm:space-y-2 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800 mb-6 md:mb-8">
                    <dl className="sm:flex items-center justify-between gap-4">
                        <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">결제 일시</dt>
                        <dd className="font-medium text-gray-900 dark:text-white sm:text-end">{paymentData.approvedAt.toLocaleString()}</dd>
                    </dl>
                    <dl className="sm:flex items-center justify-between gap-4">
                        <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">결제 상품</dt>
                        <dd className="font-medium text-gray-900 dark:text-white sm:text-end">{checkoutData.product}
                        </dd>
                    </dl>
                    <dl className="sm:flex items-center justify-between gap-4">
                        <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">결제 수단</dt>
                        <dd className="font-medium text-gray-900 dark:text-white sm:text-end">{paymentData.card ? (paymentData.card.cardType) :
                            (paymentData.easyPay.provider)}</dd>
                    </dl>
                    <dl className="sm:flex items-center justify-between gap-4">
                        <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">배송지</dt>
                        <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
                            {checkoutData.address.streetAddress} {checkoutData.address.detailAddress} 우){checkoutData.address.zipcode}
                        </dd>
                    </dl>
                    <dl className="sm:flex items-center justify-between gap-4">
                        <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">핸드폰 번호</dt>
                        <dd className="font-medium text-gray-900 dark:text-white sm:text-end">{checkoutData.phoneNum}</dd>
                    </dl>
                </div>
                <div className="flex items-center space-x-4">
                    <ButtonPrimary
                        onClick={() => router.push("/account-order")}>
                        결제 내역으로 돌아가기
                    </ButtonPrimary>
                    <ButtonPrimary
                        onClick={() => router.push("/")}>
                        메인 화면으로
                    </ButtonPrimary>
                </div>
            </div>
        </section>
    );

}