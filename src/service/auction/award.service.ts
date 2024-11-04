import {awardAPI} from "@/api/auction/award.api";
import Cookies from "js-cookie";
import {AwardDto, AwardModel} from "@/model/auction/award.model";

// awardId: number
export async function fetchAwardOne(awardId: number): Promise<AwardModel> {
    const userToken = Cookies.get("userToken");
    if (!userToken) {
        throw new Error("쿠키 접근 불가");
        // 추후 error enum 변경
    }

    const options = {
        params: {awardId: awardId},
        userToken: userToken,
    };
    console.log("userToken", JSON.parse(userToken));

    try {

        const data = await awardAPI.findById(options);

        console.log("data", data);

        return data;
        // return await awardAPI.findById(options);

    } catch (error) {
        console.log("fetchAwardOne 도중 오류 발생", error);
        throw new Error("fetchAwardOne  도중 오류 발생");
    }
}

export async function findByUserAward(): Promise<AwardModel[]> {
    try {
        // 쿠키에서 userToken 가져오기
        const userToken = Cookies.get('userToken')

        if (!userToken) {
            throw new Error("userToken 갖고 올 수 없습니다.")
        }

        const options = {
            userToken: userToken, // 쿠키에서 가져온 userToken을 사용
            params: {}
        };

        // findByUser API 호출
        const awardArray: AwardModel[] = await awardAPI.findByUser(options);


        if (awardArray.length === 0) {
            console.log("낙찰 내역을 찾을 수 없습니다.");
            return [];
        }
        return awardArray;
    } catch (error) {
        console.error("findByUserAward 에러 발생", error);
        throw new Error("낙찰 내역을 가져오는 중 에러가 발생했습니다.");
    }
}

export async function findByAuctionId(auctionId: number): Promise<AwardDto> {
    try {
        const options = {
            params: {auctionId: auctionId},
        };
        return await awardAPI.findByAuctionId(options);
    } catch (error) {
        console.error("findByAuctionId 에러 발생", error)
        return {} as AwardDto;
    }
}

// awardIds 배열을 기반으로 각 awardId로 fetchAwardOne을 호출해 sizeId를 추출하는 함수
export async function fetchSizeIdsFromAwards(awardIds: number[]): Promise<number[]> {
    console.log("📌 fetchSizeIdsFromAwards 내부 awardIds:", awardIds);
    const userToken = Cookies.get("userToken");
    if (!userToken) {
        throw new Error("쿠키 접근 불가");
        // 추후 error enum 변경
    }

    try {
        const awards = await Promise.all(
            awardIds.map(async (awardId) => {
                const options = {
                    params: {awardId},  // 개별 awardId를 전달
                    userToken: userToken,
                };
                return await awardAPI.findById(options);
            })
        );
        console.log("📌 fetchSizeIdsFromAwards 내부 awards:", awards);
        const sizeIds = awards
            .map(award => award.auction?.sizeId) // auction이 없는 경우를 대비하여 안전하게 접근
            .filter(sizeId => sizeId !== undefined); // undefined 값 제거

        console.log("📌 fetchSizeIdsFromAwards 내부 sizeIds:", sizeIds);
        return sizeIds
    } catch (error) {
        console.error("sizeId를 추출하는 도중 오류 발생: ", error);
        throw new Error("sizeId 추출 실패");
    }
}

// 결제 완료되었다면 호출될 updateAwardStatus
export async function updateAwardStatus(awardId: number): Promise<AwardModel> {
    try {
        const options = {
            params: {awardId: awardId},
        };
        return await awardAPI.updateAwardStatus(options);
    } catch (error) {
        console.error("Award updateStatus 에러 발생", error)
        return {} as AwardModel;
    }
}
