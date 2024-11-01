import React, {FC} from "react";
import HeaderFilterSectionDohee from "@/components/dohee/HeaderFilterSectionDohee";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import {Product, PRODUCTS} from "@/data/data";
import {AuctionWithImageModel} from "@/model/auction/auction.model";
import {DEMO_LARGE_PRODUCTS} from "@/components/SectionSliderLargeProduct2";
import Link from "next/link";
import CollectionCard2Dohee from "@/components/dohee/CollectionCard2Dohee";
import {ImageModel} from "@/model/ftp/image.model";

//
export interface SectionGridFeatureItemsProps {
    data: Array<{
        auction: {
            id: number;
            user: string;
            size: number;
            description: string;
            currentBid: number;
            images: ImageModel[]; // images 배열 타입 설정
        };
        product: {
            name: string; // product 객체의 타입
            image: ImageModel; // image 객체의 타입
            size: string;
        };
        user: {
            id: string;
            oauthName: string | null;
            name: string;
            email: string;
            password: string;
        };
    }>;
}

const SectionGridFeatureItemsDohee: FC<SectionGridFeatureItemsProps> = ({data = []}) => {
    console.log("data", data)
    return (
        <div className="nc-SectionGridFeatureItems relative">
            <HeaderFilterSectionDohee/>
            <div
                className={`grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 `}
            >
                {data.map((item, index) => {
                    const auction = item.auction; // auction 객체
                    const product = item.product; // product 객체
                    const user = item.user; // user 객체

                    // 경매 이미지와 제품 이미지를 결합
                    const combinedImages = [
                        product.image, // 제품 이미지
                        ...auction.images, // 경매 이미지
                    ];

                    return (
                        <li className={`glide__slide`} key={index}>
                            <CollectionCard2Dohee
                                name={product.name}
                                price={auction.currentBid}
                                imgs={combinedImages}
                                description={auction.description}
                            />
                        </li>
                    );
                })}
            </div>
            <div className="flex mt-16 justify-center items-center">
                <ButtonPrimary loading>Show me more</ButtonPrimary>
            </div>
        </div>
    );
};

export default SectionGridFeatureItemsDohee;
