"use client";

import {AuctionModel} from "@/model/auction/auction.model";
import {useRouter} from "next/navigation";
import {getColor} from "@/utils/productUtils";
import {ProductModel} from "@/model/product/product.model";


export default function AuctionTable({auctions, product}: { auctions: AuctionModel[], product: ProductModel }) {
    const router = useRouter();

    if (auctions === null || auctions.length === 0) {
        return <div>현재 진행중인 경매가 없습니다.</div>
    }

    return (
        <div className="">
            <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead
                    className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 whitespace-nowrap">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        색상
                    </th>
                    <th scope="col" className="px-6 py-3">
                        사이즈
                    </th>
                    <th scope="col" className="px-6 py-3">
                        판매자
                    </th>
                    <th scope="col" className="px-6 py-3">
                        경매종료일
                    </th>
                    <th scope="col" className="px-6 py-3">
                        최고입찰가
                    </th>
                </tr>
                </thead>
                <tbody>
                {auctions.map((auction) => (
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 cursor-pointer"
                        key={auction.id}
                        onClick={() => router.push(`/auction/${auction.id}?productId=${product.id}`)}>
                        <th scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {getColor(product.name)}
                        </th>
                        <td className="px-6 py-4">
                            {auction.size}
                        </td>
                        <td className="px-6 py-4">
                            {auction.user}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {auction.endedAt && !isNaN(new Date(auction.endedAt).getTime())
                                ? new Date(auction.endedAt).toLocaleDateString()
                                : "N/A"}
                        </td>
                        <td className="px-6 py-4">
                            {auction.currentBid}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};