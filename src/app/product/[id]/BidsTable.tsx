"use client";

let url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/auction`
import {AuctionModel} from "@/model/AuctionModel";
import {useQuery, UseQueryResult} from "@tanstack/react-query";


/*export async function getAuction(id?:any){
    if (!id) url = url += `/${id}`;

    try {
        const response = await fetch(url, {
            method: 'GET'
        });

        const data = await response.json();

        console.log("+++++>" + JSON.stringify(data));

        return data;
    } catch (error) {
        console.error("경매 데이터 로드 중 오류 발생", error);
        return { status: 500 };
    }
}*/


export default function BidsTable({auctions} : {auctions: AuctionModel[]}) {

   /* const {
        data: auction,
        isLoading,
        isError,
    }: UseQueryResult<AuctionModel> = useQuery<AuctionModel>({queryKey: [productId], queryFn: () => getAuction(productId)})


    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <div>Error occurred while fetching auction data</div>;
    }*/

   /* const auctions: AuctionModel[] = auction ? [auction] : [];*/

    return (
        <div className="">
            <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead
                    className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 whitespace-nowrap">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        상품명
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
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                        key={auction.id}>
                        <th scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {auction.product.name}
                        </th>
                        <td className="px-6 py-4">
                            {auction.user.name}
                        </td>
                        <td className="px-6 py-4">
                            {auction.endedAt.toLocaleDateString()}
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