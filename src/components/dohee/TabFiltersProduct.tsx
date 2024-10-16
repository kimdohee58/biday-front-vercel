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
    {name: "Brown"},
    {name: "Green"},
    {name: "Navy"},
    {name: "Charcoal"},
    {name: "Gray"},
    {name: "Burgundy"},
    {name: "Olive"},
    {name: "Purple"},
    {name: "Ivory"},
    {name: "Melange"},
    {name: "Cream"},
    {name: "Yellow"},
    {name: "Red"},
    {name: "Pink"},
    {name: "Orange"},
    {name: "Khaki"},
];

const DATA_brands = [
    {name: "esfai"},
    {name: "haveoffduty"},
];

const DATA_sortOrderRadios = [
    {id: "price-low-to-high", name: "가격 낮은 순"},
    {id: "price-high-to-low", name: "가격 높은 순"},
    {id: "wishlist-low-to-high", name: "위시 적은 순"},
    {id: "wishlist-high-to-low", name: "위시 많은 순"},
    {id: "newest", name: "최신 등록 순"},
    {id: "oldest", name: "오래된 순"},
];

type TabFiltersProductProps = {
    selectedBrands: string[];
    selectedColors: string[];
    onFilterChange: (selectedBrands: string[], selectedColors: string[]) => void;
};

const TabFiltersProduct = ({
                               selectedBrands,
                               selectedColors,
                               onFilterChange,
                           }: TabFiltersProductProps) => {
    const [isOpenMoreFilter, setisOpenMoreFilter] = useState(false);
    const closeModalMoreFilter = () => setisOpenMoreFilter(false);
    const openModalMoreFilter = () => setisOpenMoreFilter(true);

    const [tempSelectedBrands, setTempSelectedBrands] = useState<string[]>(selectedBrands);
    const [tempSelectedColors, setTempSelectedColors] = useState<string[]>(selectedColors);
    const [selectedSortOrder, setSelectedSortOrder] = useState<string>("");

    useEffect(() => {
        setTempSelectedBrands(selectedBrands);
        setTempSelectedColors(selectedColors);
    }, [selectedBrands, selectedColors]);

    const handleChangeBrands = (checked: boolean, name: string) => {
        const newBrandsState = checked
            ? [...tempSelectedBrands, name]
            : tempSelectedBrands.filter((i) => i !== name);
        setTempSelectedBrands(newBrandsState);
    };

    const handleChangeColors = (checked: boolean, name: string) => {
        const newColorsState = checked
            ? [...tempSelectedColors, name]
            : tempSelectedColors.filter((i) => i !== name);
        setTempSelectedColors(newColorsState);
    };

    const handleApplyFilters = () => {
        onFilterChange(tempSelectedBrands, tempSelectedColors);
    };

    const handleClearBrand = () => setTempSelectedBrands([]);
    const handleClearColor = () => setTempSelectedColors([]);
    const handleClearSortOrder = () => setSelectedSortOrder("");

    const renderXClear = () => (
        <span
            className="flex-shrink-0 w-4 h-4 rounded-full bg-primary-500 text-white flex items-center justify-center ml-3 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                />
            </svg>
        </span>
    );

    const renderTabsBrand = () => (
        <Popover className="relative">
            {({open}) => (
                <>
                    <PopoverButton
                        className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border focus:outline-none select-none
                            ${open ? "!border-primary-500" : ""}
                            ${!!tempSelectedBrands.length
                            ? "!border-primary-500 bg-primary-50 text-primary-900"
                            : "border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500"}`}
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7.01 18.0001L3 13.9901C1.66 12.6501 1.66 11.32 3 9.98004L9.68 3.30005L17.03 10.6501C17.4 11.0201 17.4 11.6201 17.03 11.9901L11.01 18.0101C9.69 19.3301 8.35 19.3301 7.01 18.0001Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span className="ml-2">Brands</span>
                        {!tempSelectedBrands.length ? (
                            <ChevronDownIcon className="w-4 h-4 ml-3"/>
                        ) : (
                            <span onClick={() => setTempSelectedBrands([])}>
                                {renderXClear()}
                            </span>
                        )}
                    </PopoverButton>

                    <Transition as={Fragment}>
                        <PopoverPanel className="absolute z-40 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-sm">
                            <div
                                className="rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200">
                                <div className="px-5 py-6 space-y-5">
                                    {DATA_brands.map((item) => (
                                        <Checkbox
                                            key={item.name}
                                            name={item.name}
                                            label={item.name}
                                            isChecked={tempSelectedBrands.includes(item.name)}
                                            onChange={(checked) => handleChangeBrands(checked, item.name)}
                                        />
                                    ))}
                                </div>
                                <div className="p-5 bg-slate-50 dark:bg-slate-900 flex justify-between">
                                    <ButtonThird onClick={handleClearBrand}>Clear</ButtonThird>
                                    <ButtonPrimary onClick={handleApplyFilters}>Apply</ButtonPrimary>
                                </div>
                            </div>
                        </PopoverPanel>
                    </Transition>
                </>
            )}
        </Popover>
    );

    const renderTabsColor = () => (
        <Popover className="relative">
            {({open}) => (
                <>
                    <PopoverButton
                        className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border focus:outline-none select-none
                            ${open ? "!border-primary-500" : ""}
                            ${!!tempSelectedColors.length
                            ? "!border-primary-500 bg-primary-50 text-primary-900"
                            : "border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500"}`}
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7.01 18.0001L3 13.9901C1.66 12.6501 1.66 11.32 3 9.98004L9.68 3.30005L17.03 10.6501C17.4 11.0201 17.4 11.6201 17.03 11.9901L11.01 18.0101C9.69 19.3301 8.35 19.3301 7.01 18.0001Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span className="ml-2">Colors</span>
                        {!tempSelectedColors.length ? (
                            <ChevronDownIcon className="w-4 h-4 ml-3"/>
                        ) : (
                            <span onClick={() => setTempSelectedColors([])}>
                                {renderXClear()}
                            </span>
                        )}
                    </PopoverButton>

                    <Transition as={Fragment}>
                        <PopoverPanel className="absolute z-40 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-sm">
                            <div
                                className="rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200">
                                <div className="px-5 py-6 space-y-5">
                                    {DATA_colors.map((item) => (
                                        <Checkbox
                                            key={item.name}
                                            name={item.name}
                                            label={item.name}
                                            isChecked={tempSelectedColors.includes(item.name)}
                                            onChange={(checked) => handleChangeColors(checked, item.name)}
                                        />
                                    ))}
                                </div>
                                <div className="p-5 bg-slate-50 dark:bg-slate-900 flex justify-between">
                                    <ButtonThird onClick={handleClearColor}>Clear</ButtonThird>
                                    <ButtonPrimary onClick={handleApplyFilters}>Apply</ButtonPrimary>
                                </div>
                            </div>
                        </PopoverPanel>
                    </Transition>
                </>
            )}
        </Popover>
    );

    const renderTabsSortOrder = () => (
        <Popover className="relative">
            {({open}) => (
                <>
                    <PopoverButton
                        className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border focus:outline-none select-none
                            ${open ? "!border-primary-500" : ""}
                            ${selectedSortOrder
                            ? "!border-primary-500 bg-primary-50 text-primary-900"
                            : "border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500"}`}
                    >
                        <span className="ml-2">Sort By</span>
                        {selectedSortOrder ? (
                            <span onClick={handleClearSortOrder}>{renderXClear()}</span>
                        ) : (
                            <ChevronDownIcon className="w-4 h-4 ml-3"/>
                        )}
                    </PopoverButton>

                    <Transition as={Fragment}>
                        <PopoverPanel className="absolute z-40 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-sm">
                            <div
                                className="rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200">
                                <div className="px-5 py-6 space-y-5">
                                    {DATA_sortOrderRadios.map((radio) => (
                                        <Radio
                                            key={radio.id}
                                            id={radio.id}
                                            name="sortOrder"
                                            label={radio.name}
                                            checked={selectedSortOrder === radio.id}
                                            onChange={() => setSelectedSortOrder(radio.id)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </PopoverPanel>
                    </Transition>
                </>
            )}
        </Popover>
    );

    const renderTabMobileFilter = () => {
        return (
            <div className="flex-shrink-0">
                <div
                    className={`flex flex-shrink-0 items-center justify-center px-4 py-2 text-sm rounded-full border border-primary-500 bg-primary-50 text-primary-900 focus:outline-none cursor-pointer select-none`}
                    onClick={openModalMoreFilter}
                >
                    <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M22 6.5H16"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M6 6.5H2"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M10 10C11.933 10 13.5 8.433 13.5 6.5C13.5 4.567 11.933 3 10 3C8.067 3 6.5 4.567 6.5 6.5C6.5 8.433 8.067 10 10 10Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M22 17.5H18"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M8 17.5H2"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M14 21C15.933 21 17.5 19.433 17.5 17.5C17.5 15.567 15.933 14 14 14C12.067 14 10.5 15.567 10.5 17.5C10.5 19.433 12.067 21 14 21Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <span className="ml-2">Products filters (3)</span>
                    {renderXClear()}
                </div>

                <Transition appear show={isOpenMoreFilter}>
                    <Dialog
                        as="div"
                        className="fixed inset-0 z-50"
                        onClose={closeModalMoreFilter}
                    >
                        <div className="min-h-screen text-center">
                            <TransitionChild
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0 bg-black bg-opacity-40 dark:bg-opacity-60" />
                            </TransitionChild>

                            {/* This element is to trick the browser into centering the modal contents. */}
                            <span
                                className="inline-block h-svh align-middle"
                                aria-hidden="true"
                            >
                &#8203;
              </span>
                            <TransitionChild
                                as={"div"}
                                className="inline-block h-svh w-full max-w-4xl"
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <div className="inline-flex flex-col w-full text-left align-middle transition-all transform bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 h-full">
                                    <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                                        <DialogTitle
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            Products filters
                                        </DialogTitle>
                                        <span className="absolute left-3 top-3">
                      <ButtonClose onClick={closeModalMoreFilter} />
                    </span>
                                    </div>

                                    <div className="flex-grow overflow-y-auto">
                                        <div className="px-6 sm:px-8 md:px-10 divide-y divide-neutral-200 dark:divide-neutral-800">
                                            {/* --------- */}
                                            {/*/!* ---- *!/*/}
                                            {/*<div className="py-7">*/}
                                            {/*    <h3 className="text-xl font-medium">Categories</h3>*/}
                                            {/*    <div className="mt-6 relative ">*/}
                                            {/*        {renderMoreFilterItem(DATA_categories)}*/}
                                            {/*    </div>*/}
                                            {/*</div>*/}
                                            {/*/!* --------- *!/*/}
                                            {/* ---- */}
                                            <div className="py-7">
                                                <h3 className="text-xl font-medium">Colors</h3>
                                                <div className="mt-6 relative ">
                                                    {renderMoreFilterItem(DATA_colors)}
                                                </div>
                                            </div>
                                            {/* --------- */}
                                            {/* ---- */}
                                            <div className="py-7">
                                                <h3 className="text-xl font-medium">Brand</h3>
                                                <div className="mt-6 relative ">
                                                    {renderMoreFilterItem(DATA_brands)}
                                                </div>
                                            </div>

                                            {/* --------- */}
                                            {/*/!* ---- *!/*/}
                                            {/*<div className="py-7">*/}
                                            {/*    <h3 className="text-xl font-medium">Size</h3>*/}
                                            {/*    <div className="mt-6 relative ">*/}
                                            {/*        {renderMoreFilterItem(DATA_sizes)}*/}
                                            {/*    </div>*/}
                                            {/*</div>*/}

                                            {/*/!* --------- *!/*/}
                                            {/* ---- */}
                                            {/*<div className="py-7">
                                                <h3 className="text-xl font-medium">Range Prices</h3>
                                                <div className="mt-6 relative ">
                                                    <div className="relative flex flex-col space-y-8">
                                                        <div className="space-y-5">
                                                            <Slider
                                                                range
                                                                className="text-red-400"
                                                                min={PRICE_RANGE[0]}
                                                                max={PRICE_RANGE[1]}
                                                                defaultValue={rangePrices}
                                                                allowCross={false}
                                                                onChange={(_input: number | number[]) =>
                                                                    setRangePrices(_input as number[])
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
                                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-neutral-500 sm:text-sm">
                                      $
                                    </span>
                                                                    </div>
                                                                    <input
                                                                        type="text"
                                                                        name="minPrice"
                                                                        disabled
                                                                        id="minPrice"
                                                                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                                                                        value={rangePrices[0]}
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
                                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-neutral-500 sm:text-sm">
                                      $
                                    </span>
                                                                    </div>
                                                                    <input
                                                                        type="text"
                                                                        disabled
                                                                        name="maxPrice"
                                                                        id="maxPrice"
                                                                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                                                                        value={rangePrices[1]}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                             --------- */}
                                            {/* ---- */}
                                            <div className="py-7">
                                                <h3 className="text-xl font-medium">Sort Order</h3>
                                                <div className="mt-6 relative ">
                                                    <div className="relative flex flex-col space-y-5">
                                                        {DATA_sortOrderRadios.map((item) => (
                                                            <Radio
                                                                id={item.id}
                                                                key={item.id}
                                                                name="radioNameSort"
                                                                label={item.name}
                                                                defaultChecked={sortOrderStates === item.id}
                                                                onChange={setSortOrderStates}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* --------- */}
                                            {/* ---- */}
                                            <div className="py-7">
                                                <h3 className="text-xl font-medium">On sale!</h3>
                                                <div className="mt-6 relative ">
                                                    <MySwitch
                                                        label="On sale!"
                                                        desc="Products currently on sale"
                                                        enabled={isOnSale}
                                                        onChange={setIsIsOnSale}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="px-6 py-5 flex-shrink-0 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                                        <ButtonThird
                                            onClick={() => {
                                                // setRangePrices(PRICE_RANGE);
                                                // setCategoriesState([]);
                                                setTempSelectedColors([])
                                                setTempSelectedBrands([]);
                                                setSelectedSortOrder("");
                                                closeModalMoreFilter();
                                            }}
                                            sizeClass="py-2.5 px-5"
                                        >
                                            Clear
                                        </ButtonThird>
                                        <ButtonPrimary
                                            onClick={closeModalMoreFilter}
                                            sizeClass="py-2.5 px-5"
                                        >
                                            Apply
                                        </ButtonPrimary>
                                    </div>
                                </div>
                            </TransitionChild>
                        </div>
                    </Dialog>
                </Transition>
            </div>
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

            {/* FOR RESPONSIVE MOBILE */}
            <div className="flex overflow-x-auto lg:hidden space-x-4">
                {renderTabMobileFilter()}
            </div>
        </div>
    );
};

export default TabFiltersProduct;
