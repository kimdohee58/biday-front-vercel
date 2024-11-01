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
            <div className={`grid gap-8 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3`}>
                {data.length > 0 ? (
                    data.map((item, index) => {
                        const auction = item.auction;
                        const product = item.product;
                        const user = item.user;
                        const combinedImages = [product.image, ...auction.images];

                        // 데이터 확인
                        console.log(`Auction ID: ${auction.id}, Product Name: ${product.name}, Price: ${auction.currentBid}, Wishes: ${product.wishes}`);

                        return (
                            <li className={`glide__slide`} key={index}>
                                <CollectionCard2Dohee
                                    id={auction.auction.id}
                                    name={product.product.name}
                                    price={auction.auction.currentBid}
                                    imgs={combinedImages}
                                    description={auction.auction.description}
                                    wishes={product.product.wishes}
                                    endedAt={auction.auction.endedAt}
                                    user={user.name}
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