import {awardAPI} from "@/api/auction/award.api";
import Cookies from "js-cookie";
import {AwardModel} from "@/model/auction/award.model";

// awardId: number
export async function fetchAwardOne (awardId: number): Promise<AwardModel> {
    const userToken = Cookies.get("userToken");
    if (!userToken) {
        throw new Error("쿠키 접근 불가");
        // 추후 error enum 변경
    }

    const options = {
        params : {awardId: awardId},
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
            userToken : userToken, // 쿠키에서 가져온 userToken을 사용
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

// awardIds 배열을 기반으로 각 awardId로 fetchAwardOne을 호출해 sizeId를 추출하는 함수
export async function fetchSizeIdsFromAwards(awardIds: number[]): Promise<number[]> {


    const userToken = Cookies.get("userToken");
    if (!userToken) {
        throw new Error("쿠키 접근 불가");
        // 추후 error enum 변경
    }

    try {
        // Promise.all을 사용하여 모든 awardId에 대해 fetchAwardOne 호출
        const awards = await Promise.all(
            awardIds.map(async (awardId) => {
                const options = {
                    params: { awardId },  // 개별 awardId를 전달
                    userToken: userToken,
                };

                // 각 awardId에 대해 fetchAwardOne 호출
                return await awardAPI.findById(options);  // 반환된 award 데이터 반환
            })
        );

        const sizeIds = awards.map((award) => award?.auction?.sizeId).filter((sizeId) => sizeId !== undefined);

        return sizeIds
    } catch (error) {
        console.error("sizeId를 추출하는 도중 오류 발생: ", error);
        throw new Error("sizeId 추출 실패");
    }
}
