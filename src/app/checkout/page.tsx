"use client";

import Label from "@/components/Label/Label";
import NcInputNumber from "@/components/NcInputNumber";
import Prices from "@/components/Prices";
import {Product, PRODUCTS} from "@/data/data";
import React, {Suspense, useEffect, useState} from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import ContactInfo from "./ContactInfo";
import PaymentMethod from "./PaymentMethod";
import ShippingAddress from "./ShippingAddress";
import Image from "next/image";
import Link from "next/link";
import {PaymentTempModel} from "@/model/order/paymentTemp.model";
import {useMutation, useQuery, useSuspenseQuery} from "@tanstack/react-query";
import {savePaymentTemp} from "@/service/order/payment.service";
import {useRouter, useSearchParams} from "next/navigation";
import useRandomId from "@/hooks/useRandomId";
import Checkout from "@/app/checkout/payment/Checkout";
import CustomModal from "@/app/checkout/payment/CustomModal";
import {fetchProductOne} from "@/service/product/product.service";
import {fetchAwardOne} from "@/service/auction/award.service";
import {AddressModel} from "@/model/user/address.model";
import {useSelector} from "react-redux";
import {RootState} from "@/lib/store";
import {ImageType} from "@/model/ftp/image.model";
import {fetchImageOne} from "@/service/ftp/image.service";
import {getColor, getSizeById} from "@/utils/productUtils";
import {Alert} from "@/shared/Alert/Alert";
import {getAddresses, getUser} from "@/lib/features/user.slice";

export default function CheckoutPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const productId = searchParams.get("productId") || "";
    const awardId = searchParams.get("awardId") || "";

    const product = useSuspenseQuery({queryKey: ["product", productId], queryFn: () => fetchProductOne(productId)});
    const award = useSuspenseQuery({queryKey: ["award", awardId], queryFn: () => fetchAwardOne(Number(awardId))});
    const productImage = useSuspenseQuery({queryKey: ["image", productId, ImageType.PRODUCT],
        queryFn: () => fetchImageOne(ImageType.PRODUCT, productId)});
    const user = useSelector(getUser);

    if (!user) {
        return;
    }

    const [phoneNum, setPhoneNum] = useState<string>(user.phoneNum || "");
    const [email, setEmail] = useState<string>(user.email || "");
    const addresses: AddressModel[] = useSelector(getAddresses);
    console.log("addresses", addresses);
    const [selectedAddressIndex, setSelectedAddressIndex] = useState<number>(0);

    const handleAddressChange = (index: number) => {
        setSelectedAddressIndex(index);
    };

    const [name, setName] = useState<string>(user.name || "");

    const size = getSizeById(award.data.auction.sizeId, product.data.sizes);
    const color = getColor(product.data.name);

    const amount = award.data.currentBid;

    const RenderProduct = () => {

        return (
            <div key={product.data.id} className="relative flex py-7 first:pt-0 last:pb-0">
                <div className="relative h-36 w-24 sm:w-28 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                    <Image
                        src={productImage.data.uploadUrl}
                        fill
                        alt={productImage.data.uploadName}
                        className="h-full w-full object-contain object-center"
                        sizes="150px"
                    />
                    <Link href={`/product/${productId}`} className="absolute inset-0"></Link>
                </div>

                <div className="ml-3 sm:ml-6 flex flex-1 flex-col">
                    <div>
                        <div className="flex justify-between ">
                            <div className="flex-[1.5] ">
                                <h3 className="text-base font-semibold">
                                    <Link href={`/product/${product.data.id}`}>{product.data.name}</Link>
                                </h3>
                                <div className="mt-1.5 sm:mt-2.5 flex text-sm text-slate-600 dark:text-slate-300">
                                    <div className="flex items-center space-x-1.5">
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
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

                                        <span>{color}</span>
                                    </div>
                                    <span className="mx-4 border-l border-slate-200 dark:border-slate-700 "></span>
                                    <div className="flex items-center space-x-1.5">
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                                            <path
                                                d="M21 9V3H15"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M3 15V21H9"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M21 3L13.5 10.5"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M10.5 13.5L3 21"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>

                                        <span>{size}</span>
                                    </div>
                                </div>

                                <div className="mt-3 flex justify-between w-full sm:hidden relative">
                                    <select
                                        name="qty"
                                        id="qty"
                                        className="form-select text-sm rounded-md py-1 border-slate-200 dark:border-slate-700 relative z-10 dark:bg-slate-800 "
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                    </select>
                                    <Prices
                                        contentClass="py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium h-full"
                                        price={amount}
                                    />
                                </div>
                            </div>

                            <div className="hidden flex-1 sm:flex justify-end">
                                <Prices price={amount} className="mt-0.5"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };


    const mutation = useMutation({
        mutationFn: savePaymentTemp,
    });

    const [tabActive, setTabActive] = useState<
        "ContactInfo" | "ShippingAddress" | "PaymentMethod"
    >("ShippingAddress");

    const orderId = useRandomId(20);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    const handleClick = async () => {

        const temp: PaymentTempModel = {
            orderId: orderId,
            awardId: Number(awardId),
            amount: amount,
        };

        mutation.mutate(temp);
        setIsModalOpen(true);

    };

    const handleScrollToEl = (id: string) => {
        const element = document.getElementById(id);
        setTimeout(() => {
            element?.scrollIntoView({behavior: "smooth"});
        }, 80);
    };

    const handleContactInfo = (newPhoneNum: string, newEmail: string) => {
        setPhoneNum(newPhoneNum)
        setEmail(newEmail);
    };

    const renderLeft = () => {
        return (
            <div className="space-y-8">
                <div id="ContactInfo" className="scroll-mt-24">
                    <ContactInfo
                        isActive={tabActive === "ContactInfo"}
                        onOpenActive={() => {
                            setTabActive("ContactInfo");
                            handleScrollToEl("ContactInfo");
                        }}
                        onCloseActive={() => {
                            setTabActive("ShippingAddress");
                            handleScrollToEl("ShippingAddress");
                        }}
                        phoneNum={phoneNum}
                        email={email}
                        name={name}
                        onSave={handleContactInfo}

                    />
                </div>

                <div id="ShippingAddress" className="scroll-mt-24">
                    <ShippingAddress
                        isActive={tabActive === "ShippingAddress"}
                        onOpenActive={() => {
                            setTabActive("ShippingAddress");
                            handleScrollToEl("ShippingAddress");
                        }}
                        onCloseActive={() => {
                            setTabActive("PaymentMethod");
                            handleScrollToEl("PaymentMethod");
                        }}
                        name={name}
                        selectedAddress={addresses[selectedAddressIndex]}
                        onAddressChange={handleAddressChange}
                    />
                </div>
            </div>
        );
    };

    return (
        <div className="nc-CheckoutPage">
            <main className="container py-16 lg:pb-28 lg:pt-20 ">
                <div className="mb-16">
                    <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold ">
                        Checkout
                    </h2>
                    <div
                        className="block mt-3 sm:mt-5 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-400">
                        <Link href={"/"} className="">
                            Homepage
                        </Link>
                        <span className="text-xs mx-1 sm:mx-1.5">/</span>
                        <Link href={"/collection-2"} className="">
                            Clothing Categories
                        </Link>
                        <span className="text-xs mx-1 sm:mx-1.5">/</span>
                        <span className="underline">Checkout</span>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row">
                    <div className="flex-1">{renderLeft()}</div>

                    <div
                        className="flex-shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 my-10 lg:my-0 lg:mx-10 xl:lg:mx-14 2xl:mx-16 "></div>

                    <div className="w-full lg:w-[36%] ">
                        <h3 className="text-lg font-semibold">Order summary</h3>
                        <div className="mt-8 divide-y divide-slate-200/70 dark:divide-slate-700 ">
                                <RenderProduct/>
                        </div>

                        <div
                            className="mt-10 pt-6 text-sm text-slate-500 dark:text-slate-400 border-t border-slate-200/70 dark:border-slate-700 ">
                            <div>
                                <Label className="text-sm">Discount code</Label>
                                <div className="flex mt-1.5">
                                    <Input sizeClass="h-10 px-4 py-3" className="flex-1"/>
                                    <button
                                        className="text-neutral-700 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 rounded-2xl px-4 ml-3 font-medium text-sm bg-neutral-200/70 dark:bg-neutral-700 dark:hover:bg-neutral-800 w-24 flex justify-center items-center transition-colors">
                                        Apply
                                    </button>
                                </div>
                            </div>

                            <div className="mt-4 flex justify-between py-2.5">
                                <span>Subtotal</span>
                                <span className="font-semibold text-slate-900 dark:text-slate-200">
                  $249.00
                </span>
                            </div>
                            <div className="flex justify-between py-2.5">
                                <span>Shipping estimate</span>
                                <span className="font-semibold text-slate-900 dark:text-slate-200">
                  $5.00
                </span>
                            </div>
                            <div className="flex justify-between py-2.5">
                                <span>Tax estimate</span>
                                <span className="font-semibold text-slate-900 dark:text-slate-200">
                  $24.90
                </span>
                            </div>
                            <div
                                className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 text-base pt-4">
                                <span>Order total</span>
                                <span>$276.00</span>
                            </div>
                        </div>
                            <ButtonPrimary onClick={handleClick}
                                           className="mt-8 w-full">
                                Confirm order</ButtonPrimary>
                            <CustomModal isOpen={isModalOpen} onClose={handleCloseModal}>
                                <Checkout value={amount} product={product.data.name} orderId={orderId}
                                          customerKey={user.id}/>
                            </CustomModal>

                        <div
                            className="mt-5 text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center">
                            <p className="block relative pl-5">
                                <svg
                                    className="w-4 h-4 absolute -left-1 top-0.5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M12 8V13"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M11.9945 16H12.0035"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                Learn more{` `}
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="##"
                                    className="text-slate-900 dark:text-slate-200 underline font-medium"
                                >
                                    Taxes
                                </a>
                                <span>
                  {` `}and{` `}
                </span>
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="##"
                                    className="text-slate-900 dark:text-slate-200 underline font-medium"
                                >
                                    Shipping
                                </a>
                                {` `} infomation
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
