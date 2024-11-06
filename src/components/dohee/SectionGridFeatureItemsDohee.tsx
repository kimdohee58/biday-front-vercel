import React, {FC, useEffect, useState} from "react";
import CollectionCard2Dohee from "@/components/dohee/CollectionCard2Dohee";
import {AuctionWithProduct} from "@/app/dohee/auction/last-chance/page";
import Heading from "@/shared/Heading/Heading";
import Nav from "@/shared/Nav/Nav";
import NavItem from "@/shared/NavItem/NavItem";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import {ChevronDownIcon} from "@heroicons/react/24/outline";
import {Transition} from "@/app/headlessui";
import TabFiltersProduct from "@/components/dohee/TabFiltersProduct";

export interface SectionGridFeatureItemsProps {
    header: string;
    data: AuctionWithProduct[];
}

const SectionGridFeatureItemsDohee: FC<SectionGridFeatureItemsProps> = ({header = "", data = []}) => {
    const [filteredData, setFilteredData] = useState<AuctionWithProduct[]>(data);
    const [isOpen, setIsOpen] = useState(true);
    const [tabActive, setTabActive] = useState("All items");

    const [selectedPrices, setSelectedPrices] = useState<number[]>([10000, 500000]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<string>("");

    useEffect(() => {
        setFilteredData(data.sort((a, b) => new Date(a.auction.auction.endedAt).getTime() - new Date(b.auction.auction.endedAt).getTime()));
    }, [data]);

    const handleFilterChange = (filter: string) => {
        setTabActive(filter);
        if (filter.toLowerCase() === "all items") {
            setFilteredData(data);
        } else {
            const newFilteredData = data.filter(item => {
                const category = item.product.product.category;
                if (Array.isArray(category)) {
                    return category.some(cat => cat.toLowerCase() === filter.toLowerCase());
                } else if (typeof category === "string") {
                    return category.toLowerCase() === filter.toLowerCase();
                }
                return false;
            });
            setFilteredData(newFilteredData);
        }
    };

    useEffect(() => {
        let filtered = [...data];

        // Price filter
        if (selectedPrices[0] !== null || selectedPrices[1] !== null) {
            filtered = filtered.filter(item => {
                const price = item.auction.auction.currentBid;
                return (
                    (selectedPrices[0] === null || price >= selectedPrices[0]) &&
                    (selectedPrices[1] === null || price <= selectedPrices[1])
                );
            });
        }

        // Color filter
        if (selectedColors.length > 0) {
            filtered = filtered.filter(item =>
                selectedColors.some(color => item.product.product.color.toLowerCase() === color.toLowerCase())
            );
        }

        // Brand filter
        if (selectedBrands.length > 0) {
            filtered = filtered.filter(item =>
                selectedBrands.some(brand => item.product.product.brand.toLowerCase() === brand.toLowerCase())
            );
        }

        // Sort by order
        if (selectedOrder) {
            filtered = sortProductsByOrder(filtered, selectedOrder);
        }

        if (filtered.length !== filteredData.length || !filtered.every((item, index) => item === filteredData[index])) {
            setFilteredData(filtered);
        }
    }, [data, selectedPrices, selectedBrands, selectedColors, selectedOrder]);

    const sortProductsByOrder = (auctions: AuctionWithProduct[], order: string): AuctionWithProduct[] => {
        switch (order) {
            case "newest":
                return [...auctions].sort((a, b) => new Date(b.auction.auction.endedAt).getTime() - new Date(a.auction.auction.endedAt).getTime());
            case "oldest":
                return [...auctions].sort((a, b) => new Date(a.auction.auction.endedAt).getTime() - new Date(b.auction.auction.endedAt).getTime());
            case "price-low-to-high":
                return [...auctions].sort((a, b) => a.auction.auction.currentBid - b.auction.auction.currentBid);
            case "price-high-to-low":
                return [...auctions].sort((a, b) => b.auction.auction.currentBid - a.auction.auction.currentBid);
            case "wishlist-low-to-high":
                return [...auctions].sort((a, b) => a.product.product.wishes - b.product.product.wishes);
            case "wishlist-high-to-low":
                return [...auctions].sort((a, b) => b.product.product.wishes - a.product.product.wishes);
            default:
                return auctions;
        }
    };

    const handleDetailFilterChange = (newSelectedPrices: number[], newSelectedBrands: string[], newSelectedColors: string[], newSelectedOrder: string) => {
        setSelectedPrices(newSelectedPrices);
        setSelectedBrands(newSelectedBrands);
        setSelectedColors(newSelectedColors);
        setSelectedOrder(newSelectedOrder);
    };

    return (
        <div className="nc-SectionGridFeatureItems relative">
            <div className={"flex flex-col relative mb-12"}>
                <Heading desc={"BiDay에서 당신이 원하는 상품을 찾아보세요."}>{header}</Heading>
                <div
                    className="flex flex-col lg:flex-row lg:items-center justify-between space-y-6 lg:space-y-0 lg:space-x-2">
                    <Nav className="sm:space-x-2"
                         containerClassName="relative flex w-full overflow-x-auto text-sm md:text-base hiddenScrollbar">
                        {["All items", "Outer", "Top", "Bottom", "ACC"].map((item, index) => (
                            <NavItem key={index} isActive={tabActive === item} onClick={() => handleFilterChange(item)}>
                                {item}
                            </NavItem>
                        ))}
                    </Nav>
                    <span className="block flex-shrink-0">
          <ButtonPrimary
              className="w-full !pr-16"
              sizeClass="pl-4 py-2.5 sm:pl-6"
              onClick={() => {
                  setIsOpen(!isOpen);
              }}
          >
            <svg className={`w-6 h-6`} viewBox="0 0 24 24" fill="none">
              <path
                  d="M14.3201 19.07C14.3201 19.68 13.92 20.48 13.41 20.79L12.0001 21.7C10.6901 22.51 8.87006 21.6 8.87006 19.98V14.63C8.87006 13.92 8.47006 13.01 8.06006 12.51L4.22003 8.47C3.71003 7.96 3.31006 7.06001 3.31006 6.45001V4.13C3.31006 2.92 4.22008 2.01001 5.33008 2.01001H18.67C19.78 2.01001 20.6901 2.92 20.6901 4.03V6.25C20.6901 7.06 20.1801 8.07001 19.6801 8.57001"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
              />
              <path
                  d="M16.07 16.52C17.8373 16.52 19.27 15.0873 19.27 13.32C19.27 11.5527 17.8373 10.12 16.07 10.12C14.3027 10.12 12.87 11.5527 12.87 13.32C12.87 15.0873 14.3027 16.52 16.07 16.52Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
              />
              <path
                  d="M19.87 17.12L18.87 16.12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
              />
            </svg>

            <span className="block truncate ml-2.5">Filter</span>
            <span className="absolute top-1/2 -translate-y-1/2 right-5">
              <ChevronDownIcon
                  className={`w-5 h-5 ${isOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
              />
            </span>
          </ButtonPrimary>
        </span>
                </div>

                <Transition
                    as={"div"}
                    show={isOpen}
                    enter="transition-opacity duration-150"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="w-full border-b border-neutral-200 dark:border-neutral-700 my-8"></div>
                    <TabFiltersProduct
                        selectedPrices={selectedPrices}
                        selectedBrands={selectedBrands}
                        selectedColors={selectedColors}
                        selectedOrder={selectedOrder}
                        onFilterChange={handleDetailFilterChange}
                    />
                </Transition>
            </div>

            <div className={`grid gap-8 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3`}>
                {filteredData.length > 0 ? (
                    filteredData.map((item, index) => {
                        const auction = item.auction;
                        const product = item.product;
                        const user = item.user;
                        const combinedImages = [product.image, ...auction.images];

                        return (
                            <CollectionCard2Dohee
                                key={auction.auction.id}
                                id={auction.auction.id}
                                name={product.product.name}
                                price={auction.auction.currentBid}
                                imgs={combinedImages}
                                description={auction.auction.description}
                                wishes={product.product.wishes}
                                endedAt={auction.auction.endedAt}
                                user={user.name}
                            />
                        );
                    })
                ) : (
                    <div
                        className="text-center text-2xl font-semibold text-gray-900 my-10 bg-white p-6 rounded-lg shadow-md border border-gray-300">
                        {header === '진행 중인 경매' ? '진행 중인 경매가 없습니다.' : '곧 종료될 경매가 없습니다.'}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SectionGridFeatureItemsDohee;