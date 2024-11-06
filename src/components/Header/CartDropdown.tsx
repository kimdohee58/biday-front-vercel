// CartDropdown
"use client";

import {Popover, PopoverButton, PopoverPanel, Transition,} from "@/app/headlessui";
import Prices from "@/components/Prices";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {Spinner} from "@/shared/Spinner/Spinner";
import {AwardModel} from "@/model/auction/award.model";
import {findByUserAward} from "@/service/auction/award.service";
import {useFetchAwardProducts} from "@/components/AccountuseQuery/useQuery";
import {mapDataWithAwardModel} from "@/utils/mapDataWithProducts";
import ImageFetcher from "../ImageFetcher";
import {SizeModel} from "@/model/product/size.model";

interface ContentAward {
  content: AwardModel[];
}

export default function CartDropdown() {
  const [awardData, setAwardData] = useState<ContentAward>();
  const [awardContent, setAwardContent] = useState<AwardModel[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAwardData = async () => {
    setLoading(true);
    try {
      const data: ContentAward = await findByUserAward() as any as ContentAward;
      setAwardData(data)
      const award: AwardModel[] = data.content || []
      setAwardContent(award)
    } catch (error) {
      console.error("낙찰 데이터를 가져오는 중 오류가 발생했습니다.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchAwardData()]);
      } catch (error) {
        console.error("데이터를 가져오는 중 오류가 발생했습니다.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const currentDate = new Date();
  const filteredAwardList = awardContent.filter((item) => {
    const { status, createdAt } = item;
    const payDate = new Date(createdAt);
    payDate.setDate(payDate.getDate() + 3);
    return !status && payDate >= currentDate;
  }) || [];

  const {data: awardProductList = []} = useFetchAwardProducts(awardData);
  const sizeIds = filteredAwardList.map((item) => item.auction?.sizeId);
  const matchedAwardProductList = awardProductList.filter((size) =>
      sizeIds.includes(size.id)
  );

  const totalBid = filteredAwardList.reduce((acc, item) => acc + item.currentBid, 0);

  const renderProduct = (
      item: AwardModel & { product: SizeModel | null; matchedSize: string | null } | null,
      index: number,
      close: () => void
  ) => {
    if (!item || !item.product) {
      console.log("Product is null or item is null!!!");
      return null;
    }

    const { auction, currentBid, createdAt, product } = item;
    const { id, size, sizeProduct } = product;

    const payDate = new Date(createdAt);
    payDate.setDate(payDate.getDate() + 3);

    const options: Intl.DateTimeFormatOptions = {year: 'numeric', month: '2-digit', day: '2-digit'};
    const formattedDate = payDate.toLocaleDateString('ko-KR', options);

    return (
        <div key={index} className="flex py-5 last:pb-0">
          <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
            <ImageFetcher id={String(sizeProduct.id)} altText={sizeProduct.name}/>
            <Link onClick={close} className="absolute inset-0" href={`/auction/${auction.id}`}/>
          </div>

          <div className="ml-4 flex flex-1 flex-col">
            <div>
              <div className="flex justify-between ">
                <div>
                  <h3 className="text-base font-medium ">
                    <Link onClick={close} href={`/product/${sizeProduct.id}`}>
                      {sizeProduct?.name || "이름이 없습니다."}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    <span>{size || "사이즈 정보 없음"}</span>
                  </p>
                </div>
                <Prices price={currentBid} className="mt-0.5"/>
              </div>
            </div>

            <div className="flex flex-1 items-end justify-between text-sm">
              <p className="text-gray-500 dark:text-slate-400">결제 기간: {formattedDate}까지</p>
              <div className="flex">
                <Link
                    type="button"
                    className={`flex items-center justify-center px-4 py-2 rounded-md border border-blue-600 text-blue-600 font-semibold transition duration-200 shadow-sm hover:bg-blue-100 hover:text-blue-800 hover:shadow-lg active:bg-blue-200`}
                    href={`/checkout?awardId=${item.id}&productId=${sizeProduct.id}`}
                    onClick={close}
                >
                  <span className="mr-1 text-lg">🛒</span>
                  결제
                </Link>
              </div>
            </div>
          </div>
        </div>
    );
  };

  return (
      <Popover className="relative">
        {({open, close}) => (
            <>
              <PopoverButton
                  className={`
                ${open ? "" : "text-opacity-90"}
                 group w-10 h-10 sm:w-12 sm:h-12 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full inline-flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 relative`}
              >
                <div
                    className="w-3.5 h-3.5 flex items-center justify-center bg-primary-500 absolute top-1.5 right-1.5 rounded-full text-[10px] leading-none text-white font-medium">
                  <span className="mt-[1px]">{filteredAwardList.length}</span>
                </div>
                <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                      d="M2 2H3.74001C4.82001 2 5.67 2.93 5.58 4L4.75 13.96C4.61 15.59 5.89999 16.99 7.53999 16.99H18.19C19.63 16.99 20.89 15.81 21 14.38L21.54 6.88C21.66 5.22 20.4 3.87 18.73 3.87H5.82001"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                  />
                  <path
                      d="M16.25 22C16.9404 22 17.5 21.4404 17.5 20.75C17.5 20.0596 16.9404 19.5 16.25 19.5C15.5596 19.5 15 20.0596 15 20.75C15 21.4404 15.5596 22 16.25 22Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                  />
                  <path
                      d="M8.25 22C8.94036 22 9.5 21.4404 9.5 20.75C9.5 20.0596 8.94036 19.5 8.25 19.5C7.55964 19.5 7 20.0596 7 20.75C7 21.4404 7.55964 22 8.25 22Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                  />
                  <path
                      d="M9 8H21"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                  />
                </svg>

                <Link className="block md:hidden absolute inset-0" href={"/account-order"}/>
              </PopoverButton>
              <Transition
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
              >
                <PopoverPanel
                    className="hidden md:block absolute z-10 w-screen max-w-xs sm:max-w-md px-4 mt-3.5 -right-28 sm:right-0 sm:px-0">
                  <div
                      className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 dark:ring-white/10">
                    <div className="relative bg-white dark:bg-neutral-800">
                      <div className="max-h-[60vh] p-5 overflow-y-auto hiddenScrollbar">
                        <h3 className="text-xl font-semibold mr-4">Award Cart</h3>
                        <div className="divide-y divide-slate-100 dark:divide-slate-700">
                          {loading ? (
                              <div className="flex justify-center items-center py-5">
                                <Spinner/>
                              </div>
                          ) : mapDataWithAwardModel(filteredAwardList, matchedAwardProductList!!)?.length > 0 ? (
                              mapDataWithAwardModel(filteredAwardList, matchedAwardProductList!!).map((item, index) => renderProduct(item as any as AwardModel & { product: SizeModel | null; matchedSize: string | null }, index, close))
                          ) : (
                              <p className="text-center mt-8 mb-2 text-lg">결제 대기 중인 상품이 없습니다.</p>
                          )}
                        </div>
                      </div>
                      <div className="bg-neutral-50 dark:bg-slate-900 p-5">
                        <p className="flex justify-between font-semibold text-slate-900 dark:text-slate-100">
                                          <span>
                                            <span>Subtotal</span>
                                            <span
                                                className="block text-sm text-slate-500 dark:text-slate-400 font-normal">
                                              Shipping and taxes calculated at checkout.
                                            </span>
                                          </span>
                          <span className="">₩{totalBid.toLocaleString()}</span>
                        </p>
                        <div className="flex space-x-2 mt-5">
                          <ButtonSecondary
                              href="/account-savelists"
                              className="flex-1 border border-slate-200 dark:border-slate-700"
                              onClick={close}
                          >
                            찜 목록
                          </ButtonSecondary>
                          <ButtonPrimary
                              href="/account-order"
                              onClick={close}
                              className="flex-1"
                          >
                            결제 목록
                          </ButtonPrimary>
                        </div>
                      </div>
                    </div>
                  </div>
                </PopoverPanel>
              </Transition>
            </>
        )}
      </Popover>
  );
}