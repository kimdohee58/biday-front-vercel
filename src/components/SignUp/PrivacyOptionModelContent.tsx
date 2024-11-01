import React from "react";

export const PrivacyOptionModelContent = () => {
    return (
        <>
            <p className="mb-4">
                크림(주)(이하 회사)는 마케팅 정보 전송 및 개인 맞춤형 광고 제공을 위하여 아래와 같이 개인정보를 수집 ・ 이용 및 제공합니다.
            </p>

            <h2 className="text-xl font-semibold mb-2">개인정보 수집 및 이용 내역</h2>

            <table className="min-w-full bg-gray-100 border border-gray-300 rounded-lg">
                <thead>
                <tr className="bg-gray-200">
                    <th className="py-2 px-4 border-b">항목</th>
                    <th className="py-2 px-4 border-b">수집 및 이용 목적</th>
                    <th className="py-2 px-4 border-b">필수여부</th>
                    <th className="py-2 px-4 border-b">보유 및 이용기간</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="py-2 px-4 border-b">이름, 생년월일, 성별, 휴대폰 번호, 이메일 주소, 서비스 이용 기록(구매 기록, 방문
                        기록,
                        검색 기록 등)
                    </td>
                    <td className="py-2 px-4 border-b">마케팅 정보 전송, 개인 맞춤형 상품・서비스 혜택 정보 제공</td>
                    <td className="py-2 px-4 border-b">선택</td>
                    <td className="py-2 px-4 border-b">해당 개인정보 수집/이용 거부 시까지</td>
                </tr>
                </tbody>
            </table>

            <p className="mt-4">
                개인정보의 수집 및 이용에 대한 동의를 거부하시더라도 서비스의 이용은 가능합니다.
            </p>
            <p>
                다만, 동의 전까지 위 정보를 통한 마케팅 정보 수신 및 개인 맞춤형 광고를 제공 받을 수 없습니다.
            </p>
        </>
    );
};