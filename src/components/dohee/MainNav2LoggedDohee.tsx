"use client";

import React, { createRef, FC, useState } from "react";
import Logo from "@/shared/Logo/Logo";
import MenuBar from "@/shared/MenuBar/MenuBar";
import Navigation from "@/shared/Navigation/Navigation";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import AvatarDropdown from "@/components/Header/AvatarDropdown";
import CartDropdown from "@/components/Header/CartDropdown";

export interface MainNav2LoggedProps {}

const MainNav2LoggedDohee: FC<MainNav2LoggedProps> = () => {
    const inputRef = createRef<HTMLInputElement>();
    const [showSearchForm, setShowSearchForm] = useState(false);
    const router = useRouter();
    const [keyword, setKeyword] = useState("");

    const renderMagnifyingGlassIcon = () => (
        <svg width={22} height={22} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M22 22L20 20"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (keyword.trim()) {
            router.push(`/dohee/search?keyword=${encodeURIComponent(keyword)}`);
        } else {
            console.log("No keyword entered");
        }
    };

    const handleCloseSearch = () => {
        setShowSearchForm(false);
        setKeyword(""); // x 버튼 클릭 시 입력 필드 초기화
    };

    const renderSearchForm = () => (
        <form className="flex-1 py-2 text-slate-900 dark:text-slate-100" onSubmit={handleSearchSubmit}>
            <div className="bg-slate-50 dark:bg-slate-800 flex items-center space-x-1.5 px-5 h-full rounded">
                {renderMagnifyingGlassIcon()}
                <input
                    type="text"
                    placeholder="MainNav2Dohee"
                    className="border-none bg-transparent focus:outline-none focus:ring-0 w-full text-base"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    autoFocus
                />
                <button type="button" onClick={handleCloseSearch}>
                    <XMarkIcon className="w-5 h-5" />
                </button>
            </div>
            <button type="submit" hidden />
        </form>
    );

    const renderContent = () => (
        <div className="h-20 flex justify-between">
            <div className="flex items-center lg:hidden flex-1">
                <MenuBar />
            </div>
            <div className="lg:flex-1 flex items-center">
                <Logo className="flex-shrink-0" />
            </div>
            <div className="flex-[2] hidden lg:flex justify-center mx-4">
                {showSearchForm ? renderSearchForm() : <Navigation />}
            </div>
            <div className="flex-1 flex items-center justify-end text-slate-700 dark:text-slate-100">
                {!showSearchForm && (
                    <button
                        className="hidden lg:flex w-10 h-10 sm:w-12 sm:h-12 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none items-center justify-center"
                        onClick={() => setShowSearchForm(true)}
                    >
                        {renderMagnifyingGlassIcon()}
                    </button>
                )}
                <AvatarDropdown />
                <CartDropdown />
            </div>
        </div>
    );

    return (
        <div className="nc-MainNav2Logged relative z-10 bg-white dark:bg-neutral-900 border-b border-slate-100 dark:border-slate-700">
            <div className="container">{renderContent()}</div>
        </div>
    );
};

export default MainNav2LoggedDohee;