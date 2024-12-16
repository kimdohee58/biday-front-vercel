"use client";

import React, {useEffect, useState} from "react";
import ButtonClose from "@/shared/ButtonClose/ButtonClose";
import Logo from "@/shared/Logo/Logo";
import {Disclosure} from "@/app/headlessui";
import {NavItemType} from "./NavigationItem";
import {NAVIGATION_DEMO_2} from "@/data/navigation";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import SocialsList from "@/shared/SocialsList/SocialsList";
import {ChevronDownIcon} from "@heroicons/react/24/solid";
import SwitchDarkMode from "@/shared/SwitchDarkMode/SwitchDarkMode";
import Link from "next/link";
import {useSelector} from "react-redux";
import {getUserToken} from "@/lib/features/user.slice";
import {XMarkIcon} from "@heroicons/react/24/outline";
import {useRouter} from "next/navigation";

export interface NavMobileProps {
    data?: NavItemType[];
    onClickClose?: () => void;
}

const NavMobile: React.FC<NavMobileProps> = ({data = NAVIGATION_DEMO_2, onClickClose,}) => {
    // TODO 경매 등록 role = seller 아니라면 판매자 등록 페이지로 넘어가기
    const userToken = useSelector(getUserToken);
    const [userRole, setUserRole] = useState("");
    const [showSearchForm, setShowSearchForm] = useState(false);
    const [keyword, setKeyword] = useState("");
    const router = useRouter();

    useEffect(() => {
        if(userToken && userToken.userRole) {
            setUserRole(userToken.userRole[0]);
        }
    }, [userToken]);

    const _renderMenuChild = (item: NavItemType, itemClass = "pl-3 text-neutral-900 dark:text-neutral-200 font-medium") => {

        return (
            <ul className="nav-mobile-sub-menu pl-6 pb-1 text-base">
                {item.children?.map((i, index) => (
                    <Disclosure key={index} as="li">
                        <Link
                            href={{pathname: i.href || undefined}}
                            className={`flex text-sm rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 mt-0.5 pr-4 ${itemClass}`}
                        >
                            <span
                                className={`py-2.5 ${!i.children ? "block w-full" : ""}`}
                                onClick={onClickClose}
                            >
                                {i.name}
                            </span>
                            {i.children && (
                                <span
                                    className="flex items-center flex-grow"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    <Disclosure.Button as="span" className="flex justify-end flex-grow">
                                        <ChevronDownIcon className="ml-2 h-4 w-4 text-slate-500" aria-hidden="true"/>
                                    </Disclosure.Button>
                                </span>
                            )}
                        </Link>
                        {i.children && (
                            <Disclosure.Panel>
                                {_renderMenuChild(i, "pl-3 text-slate-600 dark:text-slate-400")}
                            </Disclosure.Panel>
                        )}
                    </Disclosure>
                ))}
            </ul>
        );
    };

    const _renderItem = (item: NavItemType, index: number) => {
        const href = !userRole ? "/login"
            : (item.name === "경매 등록" && userRole !== "ROLE_SELLER") ? "/account-seller"
                : item.href;

        return (
            <Disclosure key={index} as="li" className="text-slate-900 dark:text-white">
                <Link
                    className="flex w-full items-center py-2.5 px-4 font-medium uppercase tracking-wide text-sm hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                    href={{pathname: href || undefined}}
                >
                <span className={!item.children ? "block w-full" : ""} onClick={onClickClose}>
                    {item.name}
                </span>
                    {item.children && (
                        <span className="block flex-grow" onClick={(e) => e.preventDefault()}>
                        <Disclosure.Button as="span" className="flex justify-end flex-grow">
                            <ChevronDownIcon className="ml-2 h-4 w-4 text-neutral-500" aria-hidden="true"/>
                        </Disclosure.Button>
                    </span>
                    )}
                </Link>
                {item.children && <Disclosure.Panel>{_renderMenuChild(item)}</Disclosure.Panel>}
            </Disclosure>
        );
    };

    const renderMagnifyingGlassIcon = () => (
        <svg width={22} height={22} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path d="M22 22L20 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                  strokeLinejoin="round"/>
        </svg>
    );

    const renderSearchForm = () => {
        const handleSearchSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            if (keyword.trim()) {
                router.push(`/search?keyword=${encodeURIComponent(keyword)}`);
                setShowSearchForm(false);
                onClickClose?.();
            }
        };

        return (
            <form onSubmit={handleSearchSubmit} className="flex-1 text-slate-900 dark:text-slate-200">
                <div className="bg-slate-50 dark:bg-slate-800 flex items-center space-x-1 py-2 px-4 rounded-xl h-full">
                    {renderMagnifyingGlassIcon()}
                    <input
                        type="search"
                        placeholder="Type and press Enter"
                        className="border-none bg-transparent focus:outline-none focus:ring-0 w-full text-sm"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        autoFocus
                    />
                    <button type="button" onClick={() => setShowSearchForm(false)}>
                        <XMarkIcon className="w-5 h-5"/>
                    </button>
                </div>
                <button type="submit" hidden/>
            </form>
        );
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const navElement = document.getElementById("nav-mobile");
            if (navElement && !navElement.contains(event.target as Node)) {
                onClickClose?.(); // 클릭이 NavMobile 바깥에서 발생하면 닫기
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClickClose]);

    return (
        <div
            id="nav-mobile"
            className="overflow-y-auto w-full h-screen py-2 transition transform shadow-lg ring-1 dark:ring-neutral-700 bg-white dark:bg-neutral-900 divide-y-2 divide-neutral-100 dark:divide-neutral-800"
        >
            <div className="py-6 px-5">
                <Logo/>
                <div className="flex flex-col mt-5 text-slate-600 dark:text-slate-300 text-sm">
                    <span>
                        BiDay에서 특별한 경매와 입찰의 기회를 만나보세요. 여러분의 취향을 담은 아이템을 찾아보세요!
                    </span>
                    <div className="flex justify-between items-center mt-4">
                        <SocialsList
                            itemClass="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-xl"/>
                        <span className="block">
                            <SwitchDarkMode className="bg-neutral-100 dark:bg-neutral-800"/>
                        </span>
                    </div>
                </div>
                <span className="absolute right-2 top-2 p-1">
                    <ButtonClose onClick={onClickClose}/>
                </span>
                <div className="mt-5">{renderSearchForm()}</div>
            </div>
            <ul className="flex flex-col py-6 px-2 space-y-1">
                {data.map(_renderItem)}
            </ul>
            <div className="flex items-center justify-between py-6 px-5 space-x-2">
                <ButtonPrimary href={"/"} className="!px-10">
                    Buy this template
                </ButtonPrimary>
            </div>
        </div>
    );
};

export default NavMobile;