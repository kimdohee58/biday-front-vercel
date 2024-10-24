'use client';

import {useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {useMutation} from "@tanstack/react-query";
import {confirmPayment} from "@/service/order/payment.service";
import {PaymentSaveModel} from "@/model/order/paymentSave.model";
import {Spinner} from "@/shared/Spinner/Spinner";

/**
 * 추후 패러렐 라우트로 처리
 * @constructor
 */

export default function SuccessPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [paymentInfo, setPaymentInfo] = useState<PaymentSaveModel>();
    const mutation = useMutation({mutationFn: confirmPayment})
    /* const mutation = useMutation({
         mutationFn: confirmPayment,
         onSuccess: (data) => {
                 setPaymentInfo(data);
         }
     });
 */
    const awardId = searchParams.get("awardId") || "";
    const orderId = searchParams.get("orderId") || "";
    const amount = searchParams.get("amount") || "";

    useEffect(() => {
        const processPayment = async () => {
            console.log("processPatment 진입");
            const requestData = {
                awardId: Number(awardId),
                orderId: orderId,
                amount: Number(searchParams.get("amount")),
                paymentKey: searchParams.get("paymentKey") || "",
            };

            try {
                const data = await mutation.mutateAsync(requestData);

                setPaymentInfo(data);
                sessionStorage.setItem("paymentData", JSON.stringify(data));

                router.push("/checkout/payment/complete");
            } catch (error) {
                console.error("결제 처리 중 오류 발생", error);
            }
        };

        processPayment();
    }, [orderId, awardId]);

    return (
        <Spinner/>
    )
}