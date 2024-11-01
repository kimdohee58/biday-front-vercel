import React, {FC} from "react";
import HeaderFilterSectionDohee from "@/components/dohee/HeaderFilterSectionDohee";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import CollectionCard2Dohee from "@/components/dohee/CollectionCard2Dohee";
import {ImageModel} from "@/model/ftp/image.model";
import {AuctionWithProduct} from "@/app/dohee/auction/last-chance/page";

export interface SectionGridFeatureItemsProps {
    data: AuctionWithProduct[];
}

const SectionGridFeatureItemsDohee: FC<SectionGridFeatureItemsProps> = ({data = []}) => {
    console.log("sectionGridData", data)
    return (
        <div className="nc-SectionGridFeatureItems relative">
            <HeaderFilterSectionDohee/>
            <div className={`grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`}>
                {data.length > 0 ? (
                    data.map((item, index) => {
                        console.log("item", item)
                        console.log("item.auction", item.auction.auction)
                        console.log("item.product", item.product.product)
                        console.log("item.user", item.user)
                        const auction = item.auction.auction;
                        const product = item.product.product;
                        const combinedImages = [product.image, ...auction.images];

                        // 데이터 확인
                        console.log(`Auction ID: ${auction.id}, Product Name: ${product.name}, Price: ${auction.currentBid}, Wishes: ${product.wishes}`);

                        return (
                            <li className={`glide__slide`} key={index}>
                                <CollectionCard2Dohee
                                    id={auction.id}
                                    name={product.name}
                                    price={auction.currentBid}
                                    imgs={combinedImages}
                                    description={auction.description}
                                    wishes={product.wishes}
                                />
                            </li>
                        );
                    })
                ) : (
                    <p className="text-center text-xl font-semibold text-gray-700 my-10">
                        곧 종료될 경매가 없습니다.
                    </p>
                )}
            </div>
        </div>
    );
};

export default SectionGridFeatureItemsDohee;