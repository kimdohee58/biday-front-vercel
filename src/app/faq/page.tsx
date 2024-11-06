'use client'

import React, { useState } from "react";
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection";
import SectionPromo1 from "@/components/SectionPromo1";
import { FAQ_DATA } from "@/app/faq/FaqData";

// 카테고리 데이터
const CATEGORIES = [
    { id: null, name: "전체" }, // 전체 보기
    { id: 1, name: "이용정책" },
    { id: 2, name: "공통" },
    { id: 3, name: "구매" },
    { id: 4, name: "판매" },
];

export default function PageFaq() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setOpenIndex(prevIndex => (prevIndex === index ? null : index));
    };

    const handleCategoryChange = (categoryId: number | null) => {
        setSelectedCategory(categoryId);
        setOpenIndex(null); // 카테고리 변경 시 아코디언 초기화
    };

    // 카테고리에 따라 FAQ 데이터 필터링
    const filteredFAQData = selectedCategory
        ? FAQ_DATA.filter(item => item.categoryId === selectedCategory) // categoryId에 따라 필터링
        : FAQ_DATA;

    const ChevronDownIcon = () => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-5 h-5 transition-transform duration-200"
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
    );

    const ChevronUpIcon = () => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-5 h-5 transition-transform duration-200"
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
        </svg>
    );

    return (
        <div className="nc-PageFaq bg-white dark:bg-gray-900 overflow-hidden">
            <div className="container max-w-4xl mx-auto px-4 py-12">
                <h2 className="my-10 text-4xl md:text-5xl font-semibold text-center text-neutral-900 dark:text-neutral-100">
                    자주 묻는 질문 (FaQ)
                </h2>

                {/* 카테고리 선택 */}
                <div className="flex justify-center mb-8 space-x-6">
                    {CATEGORIES.map(category => (
                        <button
                            key={category.id}
                            className={`px-8 py-3 rounded-lg text-sm font-semibold transition duration-200
                            ${selectedCategory === category.id ? 'bg-blue-600 text-white shadow-lg' : 'bg-neutral-200 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-100'} 
                            hover:bg-blue-500 dark:hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                            active:scale-95 transform hover:scale-105`}
                            onClick={() => handleCategoryChange(category.id)}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                <div className="space-y-6">
                    {filteredFAQData.map(item => (
                        <div key={item.id} className="border-b border-neutral-200 dark:border-neutral-700 pb-4">
                            <div
                                className="flex justify-between items-center p-5 bg-neutral-50 dark:bg-neutral-800 rounded-xl cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-700 transition duration-200"
                                onClick={() => toggleAccordion(item.id)}
                            >
                                <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
                                    {item.question}
                                </h3>
                                {openIndex === item.id ? <ChevronUpIcon /> : <ChevronDownIcon />}
                            </div>
                            {openIndex === item.id && (
                                <div className="p-4 bg-neutral-100 dark:bg-neutral-700 rounded-xl">
                                    <p className="text-neutral-700 dark:text-neutral-300">{item.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}