import {useEffect, useState} from "react";
import {loadTossPayments} from "@tosspayments/tosspayments-sdk";

const clientKey = `${process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY}`;

export function usePayment(customerKey: string) {
    const [widgets, setWidgets] = useState<any>(null);
    const [ready, setReady] = useState<boolean>(false);

    useEffect(() => {
        async function fetchPaymentWidgets() {
            try {
                const tossPayments = await loadTossPayments(clientKey);
                const widgets = tossPayments.widgets({customerKey});
                setWidgets(widgets);
                setReady(true);
            } catch (error) {
                console.error("결제 위젯 로드 중 에러 발생", error);
                throw new Error("");
            }
        }

        fetchPaymentWidgets();

    }, [customerKey]);


    return {widgets, ready};
}