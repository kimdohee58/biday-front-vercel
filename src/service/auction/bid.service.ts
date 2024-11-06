import {BidModel} from "@/model/auction/bid.model";
import Cookies from "js-cookie";
import {bidAPI} from "@/api/auction/bid.api";
import {AuctionModel} from "@/model/auction/auction.model";
import {auctionAPI} from "@/api/auction/auction.api";


const link = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/bids`


export async function saveBid(bid: BidModel) {
    const userToken = Cookies.get("userToken");

    if (!userToken) {
        throw new Error("유저토큰 없음");
        //TODO error enum
    }

    try {
        const options = {
            userToken: userToken,
            data: bid,
        }

        return await bidAPI.save(options);
    } catch (error) {
        console.error("입찰 등록 중 오류 발생: ", error);
    }
}

export async function findByUserBid(): Promise<BidModel[]> {
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
        const bidArray: BidModel[] = await bidAPI.findByUser(options);



        if (bidArray.length === 0) {
            console.log(" 입찰 내역을 찾을 수 없습니다.");
            return [];
        }
        return bidArray;
    } catch (error) {
        console.error("findByUserBid 에러 발생", error);
        throw new Error("입찰 내역을 가져오는 중 에러가 발생했습니다.");
    }
}
