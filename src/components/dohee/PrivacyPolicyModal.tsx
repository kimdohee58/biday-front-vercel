// 덮기 완료
import React from 'react';

// ModalContent만 반환하는 컴포넌트
const PrivacyPolicyContent = () => (
        <>
            <p>BiDay는 서비스 제공을 위하여 아래와 같이 개인정보를 수집 ・ 이용 및 제공합니다.</p>
            <table className="w-full mt-4 border-collapse">
                <thead>
                <tr>
                    <th className="border-b p-2">항목</th>
                    <th className="border-b p-2">수집 및 이용 목적</th>
                    <th className="border-b p-2">필수여부</th>
                    <th className="border-b p-2">보유 및 이용기간</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="border-t p-2">NAVER 회원: 이용자 식별자</td>
                    <td className="border-t p-2" rowSpan={3}>회원 가입 및 프로필 관리</td>
                    <td className="border-t p-2">필수</td>
                    <td className="border-t p-2">회원 탈퇴 또는 서비스 종료 시까지</td>
                </tr>
                <tr>
                    <td className="border-t p-2">APPLE 회원: 이용자 식별자</td>
                    <td className="border-t p-2">필수</td>
                    <td className="border-t p-2">회원 탈퇴 또는 서비스 종료 시까지</td>
                </tr>
                <tr>
                    <td className="border-t p-2">이메일 회원: ID(이메일 주소), 비밀번호, 이름, 휴대폰번호, 성별, 생년월일, CI/DI</td>
                    <td className="border-t p-2">필수</td>
                    <td className="border-t p-2">회원 탈퇴 또는 서비스 종료 시까지</td>
                </tr>
                <tr>
                    <td className="border-t p-2">(공통) 별명, 프로필 사진, 신발 사이즈, 배송 주소, 카드 정보, 거래 은행 및 계좌 번호</td>
                    <td className="border-t p-2">선택</td>
                    <td className="border-t p-2">-</td>
                    <td className="border-t p-2">-</td>
                </tr>
                <tr>
                    <td className="border-t p-2">휴대폰 번호</td>
                    <td className="border-t p-2">ID 찾기</td>
                    <td className="border-t p-2">필수</td>
                    <td className="border-t p-2">ID 찾기 이용 시까지</td>
                </tr>
                <tr>
                    <td className="border-t p-2">휴대폰 번호, 이메일 주소</td>
                    <td className="border-t p-2">비밀번호 찾기</td>
                    <td className="border-t p-2">필수</td>
                    <td className="border-t p-2">비밀번호 찾기 이용 시까지</td>
                </tr>
                </tbody>
            </table>
            <p className="mt-4 text-gray-700">
                개인정보의 수집 및 이용에 대한 동의를 거부하시더라도 서비스의 이용은 가능합니다.
                다만, 수집 항목 중 필수 항목에 대한 동의를 거부하실 경우 회원가입이 불가능합니다.
            </p>
        </>
);

export default PrivacyPolicyContent;