//src/servcie/auction/award.service.ts

import {awardAPI} from "@/api/auction/award.api";
import Cookies from "js-cookie";
import {AwardModel} from "@/model/auction/award.model";

// awardId: number
export async function fetchAwardOne (awardId: number): Promise<AwardModel> {
    const userToken = Cookies.get("userToken");
    if (!userToken) {
        throw new Error("쿠키 접근 불가");
        // TODO error enum
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
        // TODO error enum
    }
}

export async function findByUserAward(): Promise<AwardModel[]> {
    try {

        const userToken = Cookies.get('userToken')

        if (!userToken) {
            throw new Error("userToken 갖고 올 수 없습니다.")
        }

        const options = {
            userToken : userToken,
            params: {}
        };

        const awardArray: AwardModel[] = await awardAPI.findByUser(options);



        if (awardArray.length === 0) {
            console.log("낙찰 내역을 찾을 수 없습니다.");
            return [];
        }
        return awardArray;
    } catch (error) {
        console.error("findByUserAward 에러 발생", error);
        throw new Error("낙찰 내역을 가져오는 중 에러가 발생했습니다.");
        // TODO error enum
    }
}

export async function fetchSizeIdsFromAwards(awardIds: number[]): Promise<number[]> {
    const userToken = Cookies.get("userToken");

    if (!userToken) {
        throw new Error("쿠키 접근 불가");
        // TODO error enum
    }

    try {
        const awards = await Promise.all(
            awardIds.map(async (awardId) => {
                const options = {
                    params: { awardId },
                    userToken: userToken,
                };

                const award = await awardAPI.findById(options);
                return award;
            })
        );

        const sizeIds = awards.map((award) => award?.auction?.sizeId).filter((sizeId) => sizeId !== undefined);


        return sizeIds as number[];
    } catch (error) {
        console.error("sizeId를 추출하는 도중 오류 발생: ", error);
        throw new Error("sizeId 추출 실패");
        // TODO error enum
    }
}
