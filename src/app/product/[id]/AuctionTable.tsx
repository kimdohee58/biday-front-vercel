"use client";

import React, {useEffect, useState} from "react";
import {AuctionDTO} from "@/model/auction/auction.model";
import {useRouter} from "next/navigation";
import {getColor} from "@/utils/productUtils";
import {ProductModel} from "@/model/product/product.model";
import {Button, IconButton} from "@material-tailwind/react";
import {ArrowLeftIcon, ArrowRightIcon} from "@heroicons/react/24/outline";

type AuctionTableProps = {
    auctions: AuctionDTO[];
    product: ProductModel;
    size: number | null;
};

type SizeListType = {
    size: string;
    sizeId: number;
};

export default function AuctionTable({ auctions, product, size }: AuctionTableProps) {
    const router = useRouter();
    const itemsPerPage = 3;
    const [filteredAuctions, setFilteredAuctions] = useState<AuctionDTO[]>(auctions);
    const [currentPageData, setCurrentPageData] = useState<(AuctionDTO | null)[]>([]);
    const [activePage, setActivePage] = useState(1);
    const [sizeList, setSizeList] = useState<SizeListType[]>([]);
    console.log("auctions in table", auctions);

    useEffect(() => {
        setSizeList(getSizeList(product));
    }, [product]);

    useEffect(() => {
        const matchingSizeIds = product.sizes.map((productSize) => productSize.id);
        const newFilteredAuctions = size !== null
            ? auctions.filter((auction) => auction.sizeId === size && matchingSizeIds.includes(auction.sizeId))
            : auctions.filter((auction) => matchingSizeIds.includes(auction.sizeId));
        setFilteredAuctions(newFilteredAuctions);
    }, [auctions, product, size]);

    useEffect(() => {
        const startIndex = (activePage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const dataSlice = filteredAuctions.slice(startIndex, endIndex);

        const emptyRows = Array.from({ length: itemsPerPage - dataSlice.length }, () => null);
        setCurrentPageData([...dataSlice, ...emptyRows]);
    }, [filteredAuctions, activePage]);

    const getSizeList = (item: ProductModel) => {
        return item.sizes.map((size) => ({
            size: size.size,
            sizeId: size.id,
        }));
    };

    const getSize = (auctionSize: number) => {
        const sizeString = sizeList.find((size) => size.sizeId === auctionSize);
        return sizeString ? sizeString.size : "";
    };

    const totalPages = Math.ceil(filteredAuctions.length / itemsPerPage);

    const handlePageChange = (pageNumber: number) => setActivePage(pageNumber);
    const nextPage = () => activePage < totalPages && setActivePage(activePage + 1);
    const prevPage = () => activePage > 1 && setActivePage(activePage - 1);

    const emptyCellContent = String.fromCharCode(160);

    return (
        <div className="relative w-full">
            <table className={`text-sm text-left text-gray-500 dark:text-gray-400 ${filteredAuctions.length === 0 ? "opacity-50" : ""}`}>
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
                {currentPageData.map((auction, index) => (
                    <tr
                        className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 cursor-pointer min-h-[48px]"
                        key={auction ? auction.id : `empty-${index}`}
                        onClick={() => auction && router.push(`/auction/${auction.id}`)}
                    >
                        <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white min-h-[48px]"
                        >
                            {auction ? getColor(product.name) : emptyCellContent}
                        </th>
                        <td className="px-6 py-4 whitespace-nowrap">{auction ? getSize(auction.sizeId) : emptyCellContent}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{auction ? auction.userId : emptyCellContent}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {auction && auction.endedAt && !isNaN(new Date(auction.endedAt).getTime())
                                ? new Date(auction.endedAt).toLocaleDateString()
                                : emptyCellContent}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{auction ? auction.currentBid : emptyCellContent}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {filteredAuctions.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-900 bg-opacity-70">
                    <p className="text-gray-700 dark:text-gray-300">현재 진행중인 경매가 없습니다.</p>
                </div>
            )}

            <div className="flex items-center justify-center mt-4 gap-4">
                <Button
                    variant="text"
                    className="flex items-center gap-2 rounded-full"
                    onClick={prevPage}
                    disabled={activePage === 1}
                >
                    <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <IconButton
                            key={index + 1}
                            variant={activePage === index + 1 ? "filled" : "text"}
                            color="gray"
                            onClick={() => handlePageChange(index + 1)}
                            className={activePage === index + 1 ? "rounded-full bg-slate-900 text-white" : "rounded-full"}
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
                    <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
