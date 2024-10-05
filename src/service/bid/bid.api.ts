import {BidModel} from "@/model/BidModel";
import {useSelector} from "react-redux";
import {getToken} from "@/lib/features/user.slice";

const link = 'http://localhost:8080/api/bids'


export async function insertBid(bid: BidModel): Promise<any | { status: number }> {

    const token = useSelector(getToken);

    const userinfo = bid.userId;

    try {

        const response = await fetch(link, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'UserInfo': `${userinfo}`,
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(bid)
            }
        );

        return await response.json();

    } catch (error) {
        console.error("입찰 등록 중 오류 발생: ", error);
        return {status: 500}
    }
}

export async function getBid(id:number): Promise<any | {state: number}> {
    try {
        const response = await fetch(link + "/" + id, {
            method: 'GET'
        });

        const data = await response.json();

        console.log("+++++>" + JSON.stringify(data));

        return data;
    } catch (error) {
        console.error("입찰 개별 데이터 로드 중 오류 발생", error);
        return { status: 500 };
    }
}

export async function getBidListByUserId() {
    try {

    } catch (error) {
        console.error("유저 입찰 리스트 로드 중 오류 발생", error);
        return {state: 500}
    }
}

export async function getBidList() {
    try {
        const response = await fetch(link, {
            method: 'GET'
        });

        const data = await response.json();

        console.log("+++++>" + JSON.stringify(data));

        return data;
    } catch (error) {
        console.error("입찰 리스트 로드 중 오류 발생", error);
        return { status: 500 };
    }
}


export async function deleteBid(id:number) {
    try {

        const response = await fetch(link + "/" + id, {
            method: 'DELETE'
            // 토큰 필요
        });

        const data: any = await response;

        return data;

    } catch (error) {
        console.error("입찰 개별 삭제 중 오류 발생", error);

        return {status: 500}
    }

}