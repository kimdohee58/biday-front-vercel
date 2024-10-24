"use client";

import {loadTossPayments, ANONYMOUS, TossPaymentsWidgets} from "@tosspayments/tosspayments-sdk";
import {useEffect, useState} from "react";

const clientKey = `${process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY}`;

interface Amount {
    currency: string;
    value: number;
}

export default function Checkout({value, product, orderId, customerKey, awardId}: {
    value: number,
    product: string,
    orderId: string,
    customerKey: string,
    awardId: string
}) {
    const [ready, setReady] = useState<boolean>(false);
    const [widgets, setWidgets] = useState<TossPaymentsWidgets | null>(null);
    const amount: Amount = {
        currency: "KRW",
        value: value,
    };

    console.log("1");

    useEffect(() => {
        async function fetchPaymentWidgets() {
            console.log("2")
            // ------  결제위젯 초기화 ------
            const tossPayments = await loadTossPayments(clientKey);
            console.log("toss", tossPayments);
            // 회원 결제
            const widgets = tossPayments.widgets({
                customerKey,
            });
            // 비회원 결제
            // const widgets = tossPayments.widgets({ customerKey: ANONYMOUS });

            setWidgets(widgets);
        }

        fetchPaymentWidgets();
    }, [clientKey, customerKey]);

    useEffect(() => {
        async function renderPaymentWidgets() {
            if (widgets == null) {
                return;
            }
            // ------ 주문의 결제 금액 설정 ------
            await widgets.setAmount(amount);

            await Promise.all([
                // ------  결제 UI 렌더링 ------
                widgets.renderPaymentMethods({
                    selector: "#payment-method",
                    variantKey: "DEFAULT",
                }),
                // ------  이용약관 UI 렌더링 ------
                widgets.renderAgreement({
                    selector: "#agreement",
                    variantKey: "AGREEMENT",
                }),
            ]);

            setReady(true);
        }

        renderPaymentWidgets();
    }, [widgets]);

    useEffect(() => {
        if (widgets == null) {
            return;
        }

        widgets.setAmount(amount);
    }, [widgets, amount]);

    return (
        <div className="wrapper mx-auto">
            <div className="box_section">

                {/* 결제 UI */}
                <div id="payment-method"/>
                {/* 이용약관 UI */}
                <div id="agreement"/>

                {/* 결제하기 버튼 */}
                <button
                    className="button"
                    disabled={!ready}
                    onClick={async () => {
                        try {
                            // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
                            // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
                            // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
                            await widgets!.requestPayment({
                                orderId: orderId,
                                orderName: product,
                                successUrl: window.location.origin + `/checkout/payment/success?awardId=${awardId}`,
                                failUrl: window.location.origin + "/fail",
                            });
                        } catch (error) {
                            // 에러 처리하기
                            console.error(error);
                        }
                    }}
                >
                    야이새끼야
                </button>
            </div>
        </div>
    );
}