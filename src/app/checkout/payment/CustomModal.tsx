"use client";


import {useEffect} from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode
}

const CustomModal: React.FC<ModalProps> = ({isOpen, onClose, children}) => {

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }

        return () => {
            document.body.classList.remove("overflow-hidden");
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl mx-4 md:mx-auto">
                {/* 모달 닫기 버튼 */}
                <button
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                    onClick={onClose}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h2 className="text-xl font-semibold mb-4 text-gray-700">결제 방법</h2>

                {/* 모달의 내용 */}
                <div className="overflow-y-auto max-h-[70vh]">
                    {children}
                </div>

                {/* 모달 닫기 버튼 */}
                <div className="mt-6 flex justify-end">
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        onClick={onClose}
                    >
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CustomModal;
