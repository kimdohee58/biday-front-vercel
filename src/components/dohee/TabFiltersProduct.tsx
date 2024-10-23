"use client";

import React, {Fragment, useEffect, useState} from "react";
import {Dialog, DialogTitle, Popover, PopoverButton, PopoverPanel, Transition, TransitionChild} from "@/app/headlessui";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonThird from "@/shared/Button/ButtonThird";
import Checkbox from "@/shared/Checkbox/Checkbox";
import {ChevronDownIcon} from "@heroicons/react/24/outline";
import Radio from "@/shared/Radio/Radio";
import ButtonClose from "@/shared/ButtonClose/ButtonClose";
import Slider from "rc-slider";
import MySwitch from "@/components/MySwitch";
import path from "path";

const PRICE_RANGE = [10000, 1000000];

const DATA_colors = [
    {name: "White"},
    {name: "Beige"},
    {name: "Blue"},
    {name: "Black"},
    {name: "Brown"}
];

const DATA_brands = [
    {name: "esfai"},
    {name: "haveoffduty"},
];

const DATA_sortOrderRadios = [
    {id: "newest", name: "최신 등록 순"},
    {id: "oldest", name: "오래된 순"},
    {id: "price-low-to-high", name: "가격 낮은 순"},
    {id: "price-high-to-low", name: "가격 높은 순"},
    {id: "wishlist-low-to-high", name: "위시 적은 순"},
    {id: "wishlist-high-to-low", name: "위시 많은 순"},
];

type TabFiltersProductProps = {
    selectedPrices: number[]; // min, max 2개만 받기
    selectedBrands: string[];
    selectedColors: string[];
    selectedOrder: string;
    onFilterChange: (selectedPrices: number[], selectedBrands: string[], selectedColors: string[], selectedOrder: string) => void;
};

const TabFiltersProduct = ({
                               selectedPrices,
                               selectedBrands,
                               selectedColors,
                               selectedOrder,
                               onFilterChange,
                           }: TabFiltersProductProps) => {
    const [isOpenMoreFilter, setisOpenMoreFilter] = useState(false);
    const closeModalMoreFilter = () => setisOpenMoreFilter(false);
    const openModalMoreFilter = () => setisOpenMoreFilter(true);

    const [tempRangePrices, setTempRangePrices] = useState<number[]>(selectedPrices);
    const [tempSelectedBrands, setTempSelectedBrands] = useState<string[]>(selectedBrands);
    const [tempSelectedColors, setTempSelectedColors] = useState<string[]>(selectedColors);
    const [tempSelectedSortOrder, setTempSelectedSortOrder] = useState<string>(selectedOrder);

    useEffect(() => {
        setTempRangePrices(selectedPrices);
        setTempSelectedBrands(selectedBrands);
        setTempSelectedColors(selectedColors);
        setTempSelectedSortOrder(selectedOrder)
    }, [selectedPrices, selectedBrands, selectedColors, selectedOrder]);

    const renderXClear = () => {
        return (
            <span
                className="flex-shrink-0 w-4 h-4 rounded-full bg-primary-500 text-white flex items-center justify-center ml-3 cursor-pointer">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
        >
          <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
          />
        </svg>
      </span>
        );
    };

    const handleChangeBrands = (checked: boolean, name: string) => {
        setTempSelectedBrands((prevState) => {
            if (checked) {
                return [...prevState, name];
            } else {
                return prevState.filter((brand) => brand !== name);
            }
        });
    };

    const handleChangeColors = (checked: boolean, name: string) => {
        setTempSelectedColors((prevState) => {
            if (checked) {
                return [...prevState, name];
            } else {
                return prevState.filter((color) => color !== name);
            }
        });
    };

    const renderTabsPriceRage = () => {
        return (
            <Popover className="relative">
                {({open, close}) => (
                    <>
                        <PopoverButton
                            className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-primary-500 bg-primary-50 text-primary-900 focus:outline-none`}
                        >
                            <svg
                                className="w-4 h-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M8.67188 14.3298C8.67188 15.6198 9.66188 16.6598 10.8919 16.6598H13.4019C14.4719 16.6598 15.3419 15.7498 15.3419 14.6298C15.3419 13.4098 14.8119 12.9798 14.0219 12.6998L9.99187 11.2998C9.20187 11.0198 8.67188 10.5898 8.67188 9.36984C8.67188 8.24984 9.54187 7.33984 10.6119 7.33984H13.1219C14.3519 7.33984 15.3419 8.37984 15.3419 9.66984"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M12 6V18"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <span className="ml-2 min-w-[90px]">
                            {`₩ ${tempRangePrices[0].toLocaleString()} - ₩ ${tempRangePrices[1].toLocaleString()}`}
                            </span>
                            {tempRangePrices[0] === PRICE_RANGE[0] &&
                            tempRangePrices[1] === PRICE_RANGE[1] ? null : (
                                <span onClick={() => {
                                    setTempRangePrices(PRICE_RANGE);
                                    setTimeout(() => {
                                        onFilterChange(tempRangePrices, tempSelectedBrands, tempSelectedColors, tempSelectedSortOrder);
                                    }, 0);
                                }}>{renderXClear()}
                                </span>
                            )}
                        </PopoverButton>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <PopoverPanel className="absolute z-40 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0">
                                <div
                                    className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                                    <div className="relative flex flex-col px-5 py-6 space-y-8">
                                        <div className="space-y-5">
                                            <span className="font-medium">Price range</span>
                                            <Slider
                                                range
                                                min={PRICE_RANGE[0]}
                                                max={PRICE_RANGE[1]}
                                                step={10000}
                                                defaultValue={[tempRangePrices[0], tempRangePrices[1]]}
                                                allowCross={false}
                                                onChange={(_input: number | number[]) =>
                                                    setTempRangePrices(_input as number[])
                                                }
                                            />
                                        </div>

                                        <div className="flex justify-between space-x-5">
                                            <div>
                                                <label
                                                    htmlFor="minPrice"
                                                    className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                                                >
                                                    Min price
                                                </label>
                                                <div className="mt-1 relative rounded-md">
                                                <span
                                                    className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-neutral-500 sm:text-sm">
                                                    원
                                                </span>
                                                    <input
                                                        type="text"
                                                        name="minPrice"
                                                        disabled
                                                        id="minPrice"
                                                        className="block w-32 pr-10 pl-4 sm:text-sm border-neutral-200 dark:border-neutral-700 rounded-full bg-transparent"
                                                        value={tempRangePrices[0].toLocaleString()}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="maxPrice"
                                                    className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                                                >
                                                    Max price
                                                </label>
                                                <div className="mt-1 relative rounded-md">
                                                <span
                                                    className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-neutral-500 sm:text-sm">
                                                    원
                                                </span>
                                                    <input
                                                        type="text"
                                                        disabled
                                                        name="maxPrice"
                                                        id="maxPrice"
                                                        className="block w-32 pr-10 pl-4 sm:text-sm border-neutral-200 dark:border-neutral-700 rounded-full bg-transparent"
                                                        value={tempRangePrices[1].toLocaleString()}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                                        <ButtonThird
                                            onClick={() => {
                                                setTempRangePrices(PRICE_RANGE);
                                                close();
                                                onFilterChange(tempRangePrices, tempSelectedBrands, tempSelectedColors, tempSelectedSortOrder)
                                            }}
                                            sizeClass="px-4 py-2 sm:px-5"
                                        >
                                            Clear
                                        </ButtonThird>
                                        <ButtonPrimary
                                            onClick={() => {
                                                close();
                                                onFilterChange(tempRangePrices, tempSelectedBrands, tempSelectedColors, tempSelectedSortOrder)
                                            }}
                                            sizeClass="px-4 py-2 sm:px-5"
                                        >
                                            Apply
                                        </ButtonPrimary>
                                    </div>
                                </div>
                            </PopoverPanel>
                        </Transition>
                    </>
                )}
            </Popover>
        );
    };

    const renderTabsBrand = () => {
        return (
            <Popover className="relative">
                {({ open, close }) => (
                    <>
                        <PopoverButton
                            className={`
                            flex items-center justify-center px-4 py-2 text-sm rounded-full border focus:outline-none select-none
                            ${open ? "!border-primary-500" : "border-neutral-300 dark:border-neutral-700"}
                            ${tempSelectedBrands.length
                                ? "!border-primary-500 bg-primary-50 text-primary-900"
                                : "border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500"}
                        `}
                        >
                            <svg
                                className="w-4 h-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M8 2V5"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M16 2V5"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M7 13H15"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M7 17H12"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M16 3.5C19.33 3.68 21 4.95 21 9.65V15.83C21 19.95 20 22.01 15 22.01H9C4 22.01 3 19.95 3 15.83V9.65C3 4.95 4.67 3.69 8 3.5H16Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>

                            <span className="ml-2">Brands</span>

                            {!tempSelectedBrands.length ? (
                                <ChevronDownIcon className="w-4 h-4 ml-3" />
                            ) : (
                                <span
                                    onClick={() => {
                                        setTempSelectedBrands([]);
                                        setTimeout(() => {
                                            onFilterChange(
                                                tempRangePrices,
                                                [],
                                                tempSelectedColors,
                                                tempSelectedSortOrder
                                            );
                                        }, 0);
                                    }}
                                >
                                {renderXClear()}
                            </span>
                            )}
                        </PopoverButton>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <PopoverPanel className="absolute z-40 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-sm">
                                <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                                    <div className="relative flex flex-col px-5 py-6 space-y-5">
                                        {DATA_brands.map((item) => (
                                            <div key={item.name}>
                                                <Checkbox
                                                    name={item.name}
                                                    label={item.name}
                                                    defaultChecked={tempSelectedBrands.includes(item.name)}
                                                    onChange={(checked) =>
                                                        handleChangeBrands(checked, item.name)
                                                    }
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    <div className="p-5 bg-slate-50 dark:bg-slate-900 dark:border-t dark:border-slate-800 flex items-center justify-between">
                                        <ButtonThird
                                            onClick={() => {
                                                setTempSelectedBrands([]);
                                                close();
                                                onFilterChange(tempRangePrices, tempSelectedBrands, tempSelectedColors, tempSelectedSortOrder);
                                            }}
                                            sizeClass="px-4 py-2 sm:px-5"
                                        >
                                            Clear
                                        </ButtonThird>
                                        <ButtonPrimary
                                            onClick={() => {
                                                close();
                                                onFilterChange(tempRangePrices, tempSelectedBrands, tempSelectedColors, tempSelectedSortOrder);
                                            }}
                                            sizeClass="px-4 py-2 sm:px-5"
                                        >
                                            Apply
                                        </ButtonPrimary>
                                    </div>
                                </div>
                            </PopoverPanel>
                        </Transition>
                    </>
                )}
            </Popover>
        );
    };

    const renderTabsColor = () => {
        return (
            <Popover className="relative">
                {({open, close}) => (
                    <>
                        <PopoverButton
                            className={`
                            flex items-center justify-center px-4 py-2 text-sm rounded-full border focus:outline-none select-none
                            ${open ? "!border-primary-500" : ""}
                            ${tempSelectedColors.length
                                ? "!border-primary-500 bg-primary-50 text-primary-900"
                                : "border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500"}
                        `}
                        >
                            <svg
                                className="w-4 h-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M7.01 18.0001L3 13.9901C1.66 12.6501 1.66 11.32 3 9.98004L9.68 3.30005L17.03 10.6501C17.4 11.0201 17.4 11.6201 17.03 11.9901L11.01 18.0101C9.69 19.3301 8.35 19.3301 7.01 18.0001Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M8.35 1.94995L9.69 3.28992"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M2.07 11.92L17.19 11.26"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M3 22H16"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M18.85 15C18.85 15 17 17.01 17 18.24C17 19.26 17.83 20.09 18.85 20.09C19.87 20.09 20.7 19.26 20.7 18.24C20.7 17.01 18.85 15 18.85 15Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>

                            <span className="ml-2">Colors</span>

                            {tempSelectedColors.length ? (
                                <span
                                    onClick={() => {
                                        setTempSelectedColors([]);
                                        setTimeout(() => {
                                            onFilterChange(tempRangePrices, tempSelectedBrands, [], tempSelectedSortOrder);
                                        }, 0);
                                    }}
                                >
                                {renderXClear()}
                            </span>
                            ) : (
                                <ChevronDownIcon className="w-4 h-4 ml-3" />
                            )}
                        </PopoverButton>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <PopoverPanel
                                className="absolute z-40 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-sm">
                                <div
                                    className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                                    <div className="relative flex flex-col px-5 py-6 space-y-5">
                                        {DATA_colors.map((item) => (
                                            <div key={item.name} className="">
                                                <Checkbox
                                                    name={item.name}
                                                    label={item.name}
                                                    defaultChecked={tempSelectedColors.includes(item.name)}
                                                    onChange={(checked) =>
                                                        handleChangeColors(checked, item.name)
                                                    }
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    <div
                                        className="p-5 bg-slate-50 dark:bg-slate-900 dark:border-t dark:border-slate-800 flex items-center justify-between">
                                        <ButtonThird
                                            onClick={() => {
                                                close();
                                                setTempSelectedColors([]);
                                                onFilterChange(tempRangePrices, tempSelectedBrands, [], tempSelectedSortOrder)
                                            }}
                                            sizeClass="px-4 py-2 sm:px-5"
                                        >
                                            Clear
                                        </ButtonThird>
                                        <ButtonPrimary
                                            onClick={() => {
                                                close();
                                                onFilterChange(tempRangePrices, tempSelectedBrands, tempSelectedColors, tempSelectedSortOrder)
                                            }}
                                            sizeClass="px-4 py-2 sm:px-5"
                                        >
                                            Apply
                                        </ButtonPrimary>
                                    </div>
                                </div>
                            </PopoverPanel>
                        </Transition>
                    </>
                )}
            </Popover>
        );
    };

    const renderTabsSortOrder = () => {
        return (
            <Popover className="relative">
                {({ open, close }) => (
                    <>
                        <PopoverButton
                            className={`
                            flex items-center justify-center px-4 py-2 text-sm rounded-full border focus:outline-none select-none
                            ${open ? "!border-primary-500" : ""}
                            ${tempSelectedSortOrder
                                ? "!border-primary-500 bg-primary-50 text-primary-900"
                                : "border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500"}
                        `}
                        >
                            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none">
                                <path
                                    d="M11.5166 5.70834L14.0499 8.24168"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M11.5166 14.2917V5.70834"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M8.48327 14.2917L5.94995 11.7583"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M8.48315 5.70834V14.2917"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M10.0001 18.3333C14.6025 18.3333 18.3334 14.6024 18.3334 10C18.3334 5.39763 14.6025 1.66667 10.0001 1.66667C5.39771 1.66667 1.66675 5.39763 1.66675 10C1.66675 14.6024 5.39771 18.3333 10.0001 18.3333Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <span className="ml-2">
                            {tempSelectedSortOrder
                                ? DATA_sortOrderRadios.find(i => i.id === tempSelectedSortOrder)?.name
                                : "Sort order"}
                        </span>
                            {!tempSelectedSortOrder ? (
                                <ChevronDownIcon className="w-4 h-4 ml-3" />
                            ) : (
                                <span
                                    onClick={() => {
                                        setTempSelectedSortOrder("");
                                        setTimeout(() => {
                                            onFilterChange(tempRangePrices, tempSelectedBrands, tempSelectedColors, "");
                                        }, 0);
                                    }}
                                >
                                {renderXClear()}
                            </span>
                            )}
                        </PopoverButton>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <PopoverPanel className="absolute z-40 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-sm">
                                <div className="rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200">
                                    <div className="px-5 py-6 space-y-5">
                                        {DATA_sortOrderRadios.map((radio) => (
                                            <Radio
                                                key={radio.id}
                                                id={radio.id}
                                                name="sortOrder"
                                                label={radio.name}
                                                defaultChecked={tempSelectedSortOrder === radio.id}
                                                onChange={() => setTempSelectedSortOrder(radio.id)}
                                            />
                                        ))}
                                    </div>

                                    <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                                        <ButtonThird
                                            onClick={() => {
                                                close();
                                                setTempSelectedSortOrder("");
                                                onFilterChange(tempRangePrices, tempSelectedBrands, tempSelectedColors, tempSelectedSortOrder);
                                            }}
                                            sizeClass="px-4 py-2 sm:px-5"
                                        >
                                            Clear
                                        </ButtonThird>
                                        <ButtonPrimary
                                            onClick={() => {
                                                close();
                                                onFilterChange(tempRangePrices, tempSelectedBrands, tempSelectedColors, tempSelectedSortOrder);
                                            }}
                                            sizeClass="px-4 py-2 sm:px-5"
                                        >
                                            Apply
                                        </ButtonPrimary>
                                    </div>
                                </div>
                            </PopoverPanel>
                        </Transition>
                    </>
                )}
            </Popover>
        );
    };

    // TODO 도희 : 반응형 웹 처리 하기 위해서 처리 해야함, 선택된 애들 filter 페이지로 넘어가게만 하면 완료
    // const renderMoreFilterItem = (
    //     data: {
    //         name: string;
    //         description?: string;
    //         defaultChecked?: boolean;
    //     }[],
    //     onFilterChange: (checkedItems: string[]) => void
    // ) => {
    //     const [checkedItems, setCheckedItems] = useState<string[]>(
    //         data.filter(item => item.defaultChecked).map(item => item.name)
    //     );
    //
    //     const handleCheckboxChange = (name: string) => {
    //         setCheckedItems((prevChecked) => {
    //             const updatedCheckedItems = prevChecked.includes(name)
    //                 ? prevChecked.filter(item => item !== name)
    //                 : [...prevChecked, name];
    //
    //             // 상태가 업데이트될 때마다 부모에게 전달
    //             onFilterChange(updatedCheckedItems);
    //             return updatedCheckedItems;
    //         });
    //     };
    //
    //     const list1 = data.filter((_, i) => i < data.length / 2);
    //     const list2 = data.filter((_, i) => i >= data.length / 2);
    //
    //     return (
    //         <div className="grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-8">
    //             <div className="flex flex-col space-y-5">
    //                 {list1.map((item) => (
    //                     <Checkbox
    //                         key={item.name}
    //                         name={item.name}
    //                         subLabel={item.description}
    //                         label={item.name}
    //                         checked={checkedItems.includes(item.name)}
    //                         onChange={() => handleCheckboxChange(item.name)}
    //                     />
    //                 ))}
    //             </div>
    //             <div className="flex flex-col space-y-5">
    //                 {list2.map((item) => (
    //                     <Checkbox
    //                         key={item.name}
    //                         name={item.name}
    //                         subLabel={item.description}
    //                         label={item.name}
    //                         checked={checkedItems.includes(item.name)}
    //                         onChange={() => handleCheckboxChange(item.name)}
    //                     />
    //                 ))}
    //             </div>
    //         </div>
    //     );
    // };
    //
    // const renderTabMobileFilter = () => {
    //     return (
    //         <div className="flex-shrink-0">
    //             <div
    //                 className="flex flex-shrink-0 items-center justify-center px-4 py-2 text-sm rounded-full border border-primary-500 bg-primary-50 text-primary-900 focus:outline-none cursor-pointer select-none"
    //                 onClick={openModalMoreFilter}
    //             >
    //                 <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    //                     <path d="M22 6.5H16" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    //                     <path d="M6 6.5H2" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    //                     <path d="M10 10C11.933 10 13.5 8.433 13.5 6.5C13.5 4.567 11.933 3 10 3C8.067 3 6.5 4.567 6.5 6.5C6.5 8.433 8.067 10 10 10Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    //                     <path d="M22 17.5H18" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    //                     <path d="M8 17.5H2" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    //                     <path d="M14 21C15.933 21 17.5 19.433 17.5 17.5C17.5 15.567 15.933 14 14 14C12.067 14 10.5 15.567 10.5 17.5C10.5 19.433 12.067 21 14 21Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    //                 </svg>
    //                 <span className="ml-2">Products filters (3)</span>
    //                 {renderXClear()}
    //             </div>
    //
    //             <Transition appear show={isOpenMoreFilter}>
    //                 <Dialog as="div" className="fixed inset-0 z-50" onClose={closeModalMoreFilter}>
    //                     <div className="min-h-screen text-center">
    //                         <TransitionChild enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
    //                             <div className="fixed inset-0 bg-black bg-opacity-40 dark:bg-opacity-60" />
    //                         </TransitionChild>
    //
    //                         <span className="inline-block h-svh align-middle" aria-hidden="true">
    //                         &#8203;
    //                     </span>
    //
    //                         <TransitionChild
    //                             as={"div"}
    //                             className="inline-block h-svh w-full max-w-4xl"
    //                             enter="ease-out duration-300"
    //                             enterFrom="opacity-0 scale-95"
    //                             enterTo="opacity-100 scale-100"
    //                             leave="ease-in duration-200"
    //                             leaveFrom="opacity-100 scale-100"
    //                             leaveTo="opacity-0 scale-95"
    //                         >
    //                             <div className="inline-flex flex-col w-full text-left align-middle transition-all transform bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 h-full">
    //                                 <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
    //                                     <DialogTitle as="h3" className="text-lg font-medium leading-6 text-gray-900">
    //                                         Products filters
    //                                     </DialogTitle>
    //                                     <span className="absolute left-3 top-3">
    //                                     <ButtonClose onClick={closeModalMoreFilter} />
    //                                 </span>
    //                                 </div>
    //
    //                                 <div className="flex-grow overflow-y-auto">
    //                                     <div className="px-6 sm:px-8 md:px-10 divide-y divide-neutral-200 dark:divide-neutral-800">
    //                                         {/* Categories */}
    //                                         <div className="py-7">
    //                                             <h3 className="text-xl font-medium">Brands</h3>
    //                                             <div className="mt-6 relative ">{renderMoreFilterItem(DATA_brands)}</div>
    //                                         </div>
    //
    //                                         {/* Colors */}
    //                                         <div className="py-7">
    //                                             <h3 className="text-xl font-medium">Colors</h3>
    //                                             <div className="mt-6 relative ">{renderMoreFilterItem(DATA_colors)}</div>
    //                                         </div>
    //
    //                                         {/* Range Prices */}
    //                                         <div className="py-7">
    //                                             <h3 className="text-xl font-medium">Range Prices</h3>
    //                                             <div className="mt-6 relative ">
    //                                                 <div className="relative flex flex-col space-y-8">
    //                                                     <div className="space-y-5">
    //                                                         <Slider
    //                                                             range
    //                                                             className="text-red-400"
    //                                                             min={PRICE_RANGE[0]}
    //                                                             max={PRICE_RANGE[1]}
    //                                                             defaultValue={tempRangePrices}
    //                                                             allowCross={false}
    //                                                             onChange={(_input: number | number[]) =>
    //                                                                 setTempRangePrices(_input as number[])
    //                                                             }
    //                                                         />
    //                                                     </div>
    //
    //                                                     <div className="flex justify-between space-x-5">
    //                                                         <div>
    //                                                             <label
    //                                                                 htmlFor="minPrice"
    //                                                                 className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
    //                                                             >
    //                                                                 Min price
    //                                                             </label>
    //                                                             <div className="mt-1 relative rounded-md">
    //                                                                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
    //                                                                     <span className="text-neutral-500 sm:text-sm">₩</span>
    //                                                                 </div>
    //                                                                 <input
    //                                                                     type="text"
    //                                                                     name="minPrice"
    //                                                                     disabled
    //                                                                     id="minPrice"
    //                                                                     className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
    //                                                                     value={tempRangePrices[0]}
    //                                                                 />
    //                                                             </div>
    //                                                         </div>
    //                                                         <div>
    //                                                             <label
    //                                                                 htmlFor="maxPrice"
    //                                                                 className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
    //                                                             >
    //                                                                 Max price
    //                                                             </label>
    //                                                             <div className="mt-1 relative rounded-md">
    //                                                                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
    //                                                                     <span className="text-neutral-500 sm:text-sm">₩</span>
    //                                                                 </div>
    //                                                                 <input
    //                                                                     type="text"
    //                                                                     disabled
    //                                                                     name="maxPrice"
    //                                                                     id="maxPrice"
    //                                                                     className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
    //                                                                     value={tempRangePrices[1]}
    //                                                                 />
    //                                                             </div>
    //                                                         </div>
    //                                                     </div>
    //                                                 </div>
    //                                             </div>
    //                                         </div>
    //
    //                                         {/* Sort Order */}
    //                                         <div className="py-7">
    //                                             <h3 className="text-xl font-medium">Sort Order</h3>
    //                                             <div className="mt-6 relative ">
    //                                                 <div className="relative flex flex-col space-y-5">
    //                                                     {DATA_sortOrderRadios.map((item) => (
    //                                                         <Radio
    //                                                             id={item.id}
    //                                                             key={item.id}
    //                                                             name="radioNameSort"
    //                                                             label={item.name}
    //                                                             defaultChecked={tempSelectedSortOrder === item.id}
    //                                                             onChange={setTempSelectedSortOrder}
    //                                                         />
    //                                                     ))}
    //                                                 </div>
    //                                             </div>
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //
    //                                 <div className="px-6 py-5 flex-shrink-0 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
    //                                     <ButtonThird
    //                                         onClick={() => {
    //                                             setTempRangePrices(PRICE_RANGE);
    //                                             setTempSelectedBrands([]);
    //                                             setTempSelectedColors([]);
    //                                             setTempSelectedSortOrder("");
    //                                             closeModalMoreFilter();
    //                                         }}
    //                                         sizeClass="py-2.5 px-5"
    //                                     >
    //                                         Clear
    //                                     </ButtonThird>
    //                                     <ButtonPrimary
    //                                         onClick={() => {
    //                                             closeModalMoreFilter();
    //                                             // Apply the filters
    //                                             onFilterChange(
    //                                                 tempRangePrices,
    //                                                 tempSelectedBrands,
    //                                                 tempSelectedColors,
    //                                                 tempSelectedSortOrder
    //                                             );
    //                                         }}
    //                                         sizeClass="py-2.5 px-5"
    //                                     >
    //                                         Apply
    //                                     </ButtonPrimary>
    //                                 </div>
    //                             </div>
    //                         </TransitionChild>
    //                     </div>
    //                 </Dialog>
    //             </Transition>
    //         </div>
    //     );
    // };

    return (
        <div className="flex lg:space-x-4">
            {/* FOR DESKTOP */}
            <div className="hidden lg:flex flex-1 space-x-4">
                {renderTabsPriceRage()}
                {renderTabsBrand()}
                {renderTabsColor()}
                <div className="!ml-auto">{renderTabsSortOrder()}</div>
            </div>

            {/*<div className="flex overflow-x-auto lg:hidden space-x-4">*/}
            {/*    {renderTabMobileFilter()}*/}
            {/*</div>*/}
        </div>
    );
};

export default TabFiltersProduct;
