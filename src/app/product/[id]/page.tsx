import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import LikeButton from "@/components/LikeButton";
import {StarIcon} from "@heroicons/react/24/solid";
import BagIcon from "@/components/BagIcon";


import {ClockIcon, NoSymbolIcon, SparklesIcon,} from "@heroicons/react/24/outline";
import IconDiscount from "@/components/IconDiscount";
import Prices from "@/components/Prices";
import SectionSliderProductCard from "@/components/SectionSliderProductCard";
import detail1JPG from "@/images/products/detail1.jpg";
import Policy from "./Policy";
import SectionPromo2 from "@/components/SectionPromo2";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {AuctionModel} from "@/model/AuctionModel";
import BidsTable from "./BidsTable";
import {getProduct} from "@/service/product/product.api";
import {ProductModel} from "@/model/ProductModel";
// import {useReducer} from "react";

const LIST_IMAGES_DEMO = [detail1JPG];

/*type Action = {
    type: string;
    data: {

    }
}*/

/*function reducer(state, action: Action) {

}*/

export default async function ProductDetailPage({params}: { params: { id: string | string[]; }; }) {
    // const [state, dispatch] = useReducer(reducer);

    const router = useRouter();

    const product: ProductModel = await getProduct(Number(params.id));
    const {id, brand, category, name, subName, price, color, description, auctions} = product;

    const moveToInsertAuction = () => {
        router.push(`/auction/insert?productId=${params.id}`);
    };


   /* const renderStatus = () => {
        if (!status) {
            return null;
        }
        const CLASSES =
            "absolute top-3 left-3 px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 nc-shadow-lg rounded-full flex items-center justify-center text-slate-700 text-slate-900 dark:text-slate-300";
        if (status === "New in") {
            return (
                <div className={CLASSES}>
                    <SparklesIcon className="w-3.5 h-3.5"/>
                    <span className="ml-1 leading-none">{status}</span>
                </div>
            );
        }
        if (status === "50% Discount") {
            return (
                <div className={CLASSES}>
                    <IconDiscount className="w-3.5 h-3.5"/>
                    <span className="ml-1 leading-none">{status}</span>
                </div>
            );
        }
        if (status === "Sold Out") {
            return (
                <div className={CLASSES}>
                    <NoSymbolIcon className="w-3.5 h-3.5"/>
                    <span className="ml-1 leading-none">{status}</span>
                </div>
            );
        }
        if (status === "limited edition") {
            return (
                <div className={CLASSES}>
                    <ClockIcon className="w-3.5 h-3.5"/>
                    <span className="ml-1 leading-none">{status}</span>
                </div>
            );
        }
        return null;
    };*/

    const renderSectionContent = () => {
        return (
            <div className="space-y-7 2xl:space-y-8">
                {/* ---------- 1 HEADING ----------  */}
                <div>
                    <h2 className="text-2xl sm:text-3xl font-semibold">
                        {name}
                    </h2>
                    <h6 className="text-gray-300 text-left">
                        {subName}
                    </h6>

                    <div className="flex items-center mt-5 space-x-4 sm:space-x-5">
                        {/* <div className="flex text-xl font-semibold">$112.00</div> */}
                        <Prices
                            contentClass="py-1 px-2 md:py-1.5 md:px-3 text-lg font-semibold"
                            price={price}
                        />

                        <div className="h-7 border-l border-slate-300 dark:border-slate-700"></div>

                        <div className="flex items-center">
                            <a
                                className="flex items-center text-sm font-medium"
                            >
                                <StarIcon className="w-5 h-5 pb-[1px] text-yellow-400"/>
                                <div className="ml-1.5 flex">
                  <span className="text-slate-600 dark:text-slate-400">
                    142 wishes
                  </span>
                                </div>
                            </a>
                            <span className="hidden sm:block mx-2.5">·</span>
                            <div className="hidden sm:flex items-center text-sm">
                                <SparklesIcon className="w-3.5 h-3.5"/>
                                <span className="ml-1 leading-none">임시 status</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/*  ---------- 4  QTY AND ADD TO CART BUTTON */}
                <div className="flex space-x-3.5">
                    <ButtonPrimary
                        className="flex-1 flex-shrink-0"
                        onClick={moveToInsertAuction}
                    >
                        <BagIcon className="hidden sm:inline-block w-5 h-5 mb-0.5"/>
                        <span className="ml-3">판매하기</span>
                    </ButtonPrimary>
                </div>
                <hr className=" 2xl:!my-10 border-slate-200 dark:border-slate-700"></hr>
                <div className="flex-1 items-center justify-center mt-5 space-x-3.5">
                    <BidsTable auctions={auctions}/>
                </div>

                {/* ---------- 5 ----------  */}
                {/*<AccordionInfo />*/}

                {/* ---------- 6 ----------  */}
                <div className="hidden xl:block">
                    <Policy/>
                </div>
            </div>
        );
    };

    const renderDetailSection = () => {
        return (
            <div className="">
                <h2 className="text-2xl font-semibold">Product Details</h2>
                <div className="prose prose-sm sm:prose dark:prose-invert sm:max-w-4xl mt-7">
                    <p>
                        The patented eighteen-inch hardwood Arrowhead deck --- finely
                        mortised in, makes this the strongest and most rigid canoe ever
                        built. You cannot buy a canoe that will afford greater satisfaction.
                    </p>
                    <p>
                        The St. Louis Meramec Canoe Company was founded by Alfred Wickett in
                        1922. Wickett had previously worked for the Old Town Canoe Co from
                        1900 to 1914. Manufacturing of the classic wooden canoes in Valley
                        Park, Missouri ceased in 1978.
                    </p>
                    <ul>
                        <li>Regular fit, mid-weight t-shirt</li>
                        <li>Natural color, 100% premium combed organic cotton</li>
                        <li>
                            Quality cotton grown without the use of herbicides or pesticides -
                            GOTS certified
                        </li>
                        <li>Soft touch water based printed in the USA</li>
                    </ul>
                </div>
            </div>
        );
    };

    return (
        <div className={`nc-ProductDetailPage `}>
            {/* MAIn */}
            <main className="container mt-5 lg:mt-11">
                <div className="lg:flex">
                    {/* CONTENT */}
                    <div className="w-full lg:w-[55%] ">
                        {/* HEADING */}
                        <div className="relative">
                            <div className="aspect-w-16 aspect-h-16 relative">
                                <Image
                                    fill
                                    sizes="(max-width: 640px) 100vw, 33vw"
                                    src={LIST_IMAGES_DEMO[0]}
                                    className="w-full rounded-2xl object-cover"
                                    alt="product detail 1"
                                />
                            </div>
                            {/*{renderStatus()}*/}
                            {/* META FAVORITES */}
                            <LikeButton className="absolute right-3 top-3 "/>
                        </div>
                    </div>

                    {/* SIDEBAR */}
                    <div className="w-full lg:w-[45%] pt-10 lg:pt-0 lg:pl-7 xl:pl-9 2xl:pl-10">
                        {renderSectionContent()}
                    </div>
                </div>
                `
                {/* DETAIL AND REVIEW */}
                <div className="mt-12 sm:mt-16 space-y-10 sm:space-y-16">

                    {renderDetailSection()}

                    <hr className="border-slate-200 dark:border-slate-700"/>

                    <hr className="border-slate-200 dark:border-slate-700"/>

                    {/* OTHER SECTION */}
                    <SectionSliderProductCard
                        heading="Customers also purchased"
                        subHeading=""
                        headingFontClassName="text-2xl font-semibold"
                        headingClassName="mb-10 text-neutral-900 dark:text-neutral-50"
                    />

                    {/* SECTION */}
                    <div className="pb-20 xl:pb-28 lg:pt-14">
                        <SectionPromo2/>
                    </div>
                </div>
            </main>
        </div>
    );
};

