'use client';

import Link from "next/link";
import { useSearchParams } from "next/navigation"; // next/navigation에서 useSearchParams를 가져옵니다.

export default function InsertAuctionFailPage() {
    const searchParams = useSearchParams();
    const message = searchParams.get('message'); // 쿼리 파라미터에서 message 가져오기

    return (
        <div className="flex h-screen items-center justify-center">
            <div>
                <div className="flex flex-col items-center space-y-8"> {/* 간격을 넓히기 위해 space-y-8로 변경 */}
                    {/* 빨간색 X 아이콘 */}
                    <div className="flex items-center justify-center w-28 h-28 bg-red-600 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </div>
                    <h1 className="text-4xl font-bold">경매 등록 실패</h1>
                    {/* message 텍스트 크기를 크게 변경 */}
                    {message && <p className="text-lg text-center">{message}</p>}

                    {/* 링크 두 개를 한 행에 배치 */}
                    <div className="flex space-x-4">
                        <Link
                            className="inline-flex items-center rounded border border-indigo-600 bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring"
                            href="/">
                            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18"/>
                            </svg>
                            <span className="text-sm font-medium">메인으로</span>
                        </Link>

                        <Link
                            className="inline-flex items-center rounded border border-indigo-600 bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring"
                            href="/dohee/auction/insert">
                            <span className="text-sm font-medium">다시 경매 등록하기</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}