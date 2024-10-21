//src/service/auction/auction.service.ts

import {auctionAPI} from "@/api/auction/auction.api";
import Cookies from "js-cookie";
import {AuctionModel} from "@/model/auction/auction.model";
import {fetchImage} from "@/service/ftp/image.service";
import {ImageType} from "@/model/ftp/image.model";


export async function fetchAuction(auctionId: string) {
    try {
        const options = {
            params: {
                id: auctionId,
            },
        };

        return await auctionAPI.findById(options);
    } catch (error) {
        console.log(error);
    }
}

export async function fetchAuctionsBySize(sizeId: number) {
    try {
        const options = {
            params: {sizeId: sizeId},
        };

        const result = await auctionAPI.findAllBySize(options);

        if (typeof result === "undefined") return [];

        return result;

    } catch (error) {
        console.error("fetchAuctionBySize 도중 오류 발생", error);
    }
}

// findByUserAuction 함수 수정
export async function findByUserAuction(): Promise<AuctionModel[]> {
    try {
        // 쿠키에서 userToken 가져오기
        const userToken = Cookies.get('userToken')

        if (!userToken) {
            throw new Error("userToken 갖고 올 수 없습니다.")
        }

        const options = {
            userToken : userToken, // 쿠키에서 가져온 userToken을 사용
            params: {}
        };

        // findByUser API 호출
        const auctionArray: AuctionModel[] = await auctionAPI.findByUser(options);



        if (auctionArray.length === 0) {
            console.log("경매 내역을 찾을 수 없습니다.");
            return [];
        }
        return auctionArray;
    } catch (error) {
        console.error("findByUserAuction 에러 발생", error);
        throw new Error("경매 내역을 가져오는 중 에러가 발생했습니다.");
    }
}

export async function fetchAuctionWithImages(auctionId: string) {
    try {
        const auction = await fetchAuction(auctionId);
        if (!auction) {
            console.error('auction 값이 undefined');
            new Error('');
        }

        const images = await fetchImage(ImageType.AUCTION, auctionId);

        return { auction, images };
    } catch (error) {
        console.error('fetchAuctionWithImages 중 오류 발생');
        throw new Error('fetchAuctionWithImages 중 오류 발생');
        // TODO error enum
    }
}
