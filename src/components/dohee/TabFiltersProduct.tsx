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
    selectedBrands: string[];
    selectedColors: string[];
    selectedOrder: string;
    onFilterChange: (selectedBrands: string[], selectedColors: string[], selectedOrder: string) => void;
};

const TabFiltersProduct = ({
                               selectedBrands,
                               selectedColors,
                               selectedOrder,
                               onFilterChange,
                           }: TabFiltersProductProps) => {
    const [isOpenMoreFilter, setisOpenMoreFilter] = useState(false);
    const closeModalMoreFilter = () => setisOpenMoreFilter(false);
    const openModalMoreFilter = () => setisOpenMoreFilter(true);

    const [tempSelectedBrands, setTempSelectedBrands] = useState<string[]>(selectedBrands);
    const [tempSelectedColors, setTempSelectedColors] = useState<string[]>(selectedColors);
    const [tempSelectedSortOrder, setTempSelectedSortOrder] = useState<string>(selectedOrder);

    useEffect(() => {
        setTempSelectedBrands(selectedBrands);
        setTempSelectedColors(selectedColors);
        setTempSelectedSortOrder(selectedOrder)
    }, [selectedBrands, selectedColors, selectedOrder]);

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

    const renderTabsBrand = () => {
        return (
            <Popover className="relative">
                {({open, close}) => (
                    <>
                        <PopoverButton
                            className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border focus:outline-none select-none
               ${
                                open
                                    ? "!border-primary-500 "
                                    : "border-neutral-300 dark:border-neutral-700"
                            }
                ${
                                !!tempSelectedBrands.length
                                    ? "!border-primary-500 bg-primary-50 text-primary-900"
                                    : "border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500"
                            }
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
                            {!selectedBrands.length ? (
                                <ChevronDownIcon className="w-4 h-4 ml-3"/>
                            ) : (
                                <span onClick={() => setTempSelectedBrands([])}>{renderXClear()}</span>
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
                                        {DATA_brands.map((item) => (
                                            <div key={item.name} className="">
                                                <Checkbox
                                                    name={item.name}
                                                    label={item.name}
                                                    defaultChecked={selectedBrands.includes(item.name)}
                                                    onChange={(checked) =>
                                                        handleChangeBrands(checked, item.name)
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
                                                setTempSelectedBrands([]);
                                                onFilterChange(tempSelectedBrands, tempSelectedColors, tempSelectedSortOrder)
                                            }}
                                            sizeClass="px-4 py-2 sm:px-5"
                                        >
                                            Clear
                                        </ButtonThird>
                                        <ButtonPrimary
                                            onClick={() => {
                                                close();
                                                onFilterChange(tempSelectedBrands, tempSelectedColors, tempSelectedSortOrder)
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
                            className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border focus:outline-none select-none
              ${open ? "!border-primary-500 " : ""}
                ${
                                !!tempSelectedColors.length
                                    ? "!border-primary-500 bg-primary-50 text-primary-900"
                                    : "border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500"
                            }
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
                            {!selectedColors.length ? (
                                <ChevronDownIcon className="w-4 h-4 ml-3"/>
                            ) : (
                                <span onClick={() => setTempSelectedColors([])}>{renderXClear()}</span>
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
                                                    defaultChecked={selectedColors.includes(item.name)}
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
                                                onFilterChange(tempSelectedBrands, tempSelectedColors, tempSelectedSortOrder)
                                            }}
                                            sizeClass="px-4 py-2 sm:px-5"
                                        >
                                            Clear
                                        </ButtonThird>
                                        <ButtonPrimary
                                            onClick={() => {
                                                close();
                                                onFilterChange(tempSelectedBrands, tempSelectedColors, tempSelectedSortOrder)
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
                {({open, close}) => (
                    <>
                        <PopoverButton
                            className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border focus:outline-none select-none
                            ${open ? "!border-primary-500" : ""}
                            ${tempSelectedSortOrder
                                ? "!border-primary-500 bg-primary-50 text-primary-900"
                                : "border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500"}`}
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
                    ? DATA_sortOrderRadios.filter(
                        (i) => i.id === tempSelectedSortOrder
                    )[0].name
                    : "Sort order"}
              </span>
                            {!tempSelectedSortOrder.length ? (
                                <ChevronDownIcon className="w-4 h-4 ml-3"/>
                            ) : (
                                <span onClick={() => setTempSelectedSortOrder("")}>
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
                            <PopoverPanel
                                className="absolute z-40 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-sm">
                                <div
                                    className="rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200">
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
                                    <div
                                        className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                                        <ButtonThird
                                            onClick={() => {
                                                close();
                                                setTempSelectedSortOrder("");
                                            }}
                                            sizeClass="px-4 py-2 sm:px-5"
                                        >
                                            Clear
                                        </ButtonThird>
                                        <ButtonPrimary
                                            onClick={() => {
                                                close();
                                                onFilterChange(tempSelectedBrands, tempSelectedColors, tempSelectedSortOrder);
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

    return (
        <div className="flex lg:space-x-4">
            {/* FOR DESKTOP */}
            <div className="hidden lg:flex flex-1 space-x-4">
                {/*{renderTabsPriceRage()}*/}
                {/*{renderTabsCategories()}*/}
                {renderTabsBrand()}
                {renderTabsColor()}
                {/*{renderTabsSize()}*/}
                {/*{renderTabIsOnsale()}*/}
                <div className="!ml-auto">{renderTabsSortOrder()}</div>
            </div>
        </div>
    );
};

export default TabFiltersProduct;
