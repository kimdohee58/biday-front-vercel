"use client";

import React, {useState, useEffect} from "react";
import {AuctionModel} from "@/model/auction/auction.model";
import {useRouter} from "next/navigation";
import {getColor} from "@/utils/productUtils";
import {ProductModel} from "@/model/product/product.model";
import {Button, IconButton} from "@material-tailwind/react";
import {ArrowRightIcon, ArrowLeftIcon} from "@heroicons/react/24/outline";

type AuctionTableProps = {
    auctions: AuctionModel[];
    product: ProductModel;
    size: number | null;
};

type SizeListType = {
    size: string;
    sizeId: number;
}

export default function AuctionTable({auctions, product, size}: AuctionTableProps) {
    const router = useRouter();
    const itemsPerPage = 3;
    const [filteredAuctions, setFilteredAuctions] = useState<AuctionModel[]>([]);
    const [currentPageData, setCurrentPageData] = useState<AuctionModel[]>([]);
    const [activePage, setActivePage] = useState(1);
    const [sizeList, setSizeList] = useState<SizeListType[]>([]);

    useEffect(() => {
        setSizeList(getSizeList(product));
    }, [product]);

    useEffect(() => {
        const allSizeIds = product.sizes.map((productSize) => productSize.id);
        const newFilteredAuctions = size !== null
            ? auctions.filter((auction) => auction.sizeId === size)
            : auctions.filter((auction) => allSizeIds.includes(auction.sizeId));
        setFilteredAuctions(newFilteredAuctions);
    }, [auctions, product, size]);

    useEffect(() => {
        const startIndex = (activePage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setCurrentPageData(filteredAuctions.slice(startIndex, endIndex));
    }, [filteredAuctions, activePage]);

    const getSizeList = (item:ProductModel) => {
        return item.sizes.map((size) => {
            return {
                size: size.size,
                sizeId: size.id,
            }
        })
    };

    const getSize = (auctionSize:number) => {
        const sizeString = sizeList.find((size) => size.sizeId === auctionSize);
        return sizeString ? sizeString.size : "";
    };

    const totalPages = Math.ceil(filteredAuctions.length / itemsPerPage);

    const getItemProps = (index: number) =>
        ({
            variant: activePage === index ? "filled" : "text",
            color: "gray",
            onClick: () => handlePageChange(index + 1),
            className: `rounded-full`,
        } as any);

    const handlePageChange = (pageNumber: number) => setActivePage(pageNumber);
    const nextPage = () => activePage < totalPages && setActivePage(activePage + 1);
    const prevPage = () => activePage > 1 && setActivePage(activePage - 1);

    if (filteredAuctions.length === 0) {
        return <div>현재 진행중인 경매가 없습니다.</div>;
    }

    return (
        <div className="w-full">
            <table className="text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">색상</th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">사이즈</th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">판매자</th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">경매종료일</th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">최고입찰가</th>
                </tr>
                </thead>
                <tbody>
                {currentPageData.map((auction) => (
                    <tr
                        className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 cursor-pointer"
                        key={auction.id}
                        onClick={() =>
                            router.push(`/auction/${auction.id}`)
                        }
                    >
                        <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                            {getColor(product.name)}
                        </th>
                        <td className="px-6 py-4 whitespace-nowrap">{getSize(auction.sizeId)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{auction.userId}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {auction.endedAt && !isNaN(new Date(auction.endedAt).getTime())
                                ? new Date(auction.endedAt).toLocaleDateString()
                                : "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{auction.currentBid}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="flex items-center justify-center mt-4 gap-4">
                <Button
                    variant="text"
                    className="flex items-center gap-2 rounded-full"
                    onClick={prevPage}
                    disabled={activePage === 1}
                >
                    <ArrowLeftIcon strokeWidth={2} className="h-4 w-4"/>
                </Button>
                <div className="flex items-center gap-2">
                    {Array.from({length: totalPages}, (_, index) => (
                        <IconButton
                            key={index + 1}
                            variant={activePage === index + 1 ? "filled" : "text"}
                            color="gray"
                            onClick={() => handlePageChange(index + 1)}
                            className={activePage === index + 1 ? "rounded-full bg-slate-900" : "rounded-full"}
                        >
                            {index + 1}
                        </IconButton>
                    ))}
                </div>
                <Button
                    variant="text"
                    className="flex items-center gap-2 rounded-full"
                    onClick={nextPage}
                    disabled={activePage === totalPages}
                >
                    <ArrowRightIcon strokeWidth={2} className="h-4 w-4"/>
                </Button>
            </div>
        </div>
    );
}
