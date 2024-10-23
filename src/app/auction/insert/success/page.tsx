import Link from "next/link";

export default function insertAuctionSuccessPage() {
    return (
        <div className="flex h-screen items-center justify-center">
            <div>
                <div className="flex flex-col items-center space-y-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-28 w-28 text-green-600" fill="none"
                         viewBox="0 0 24 24"
                         stroke="currentColor" stroke-width="1">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <h1 className="text-4xl font-bold">경매 등록 완료</h1>
                    <p>경매가 성공적으로 등록되었습니다. 즐거운 BIDay 되세요!</p>
                    <Link
                        className="inline-flex items-center rounded border border-indigo-600 bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring"
                        href="/">
                        <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-3 w-3" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18"/>
                        </svg>
                        <span className="text-sm font-medium"> 메인으로 </span>
                    </Link>
                </div>
            </div>
        </div>
    );
};