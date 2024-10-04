import {AuctionModel} from "@/model/AuctionModel";

let baseUrl = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/auctions`

/**
 * 1. 옥션 추가 (토큰 필요)
 * 2. 옥션 개별 호출
 * 3. 옥션 리스트 호출
 * 4. 옥션 삭제 (토큰 필요)
 */

// 마이페이지 경매목록 : 준한

// 경매 등록
export async function insertAuction(auction: AuctionModel): Promise<any | { status: number }> {
    try {

        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
                // 토큰 필요
            },
            body: JSON.stringify(auction)
            }
        );

        return await response.json();

    } catch (error) {
        console.error("경매 등록 중 오류 발생: ", error);
        return {status: 500}
    }
}

// 경매 삭제
export async function deleteAuction(id:number) {

    baseUrl = baseUrl += `/${id}`;
    try {
        const response = await fetch(baseUrl, {
            method: 'DELETE'
            // 토큰 필요
        });

        const data: any = await response.json();

        return data;

    } catch (error) {
        console.error("경매 개별 삭제 중 오류 발생", error);

        return {status: 500}
    }

}


// 상품 상세 경매 목록
export async function fetchAuctionList(id: number): Promise<any | { status: number }> {
    const url = baseUrl + `/findAllBySize?sizeId=${id}`;


    try {
        const response = await fetch(url, {
            cache: "no-store",
            method: 'GET',
        });

        const data = await response.json();

        if (!data || data.length == 0) return [];

        return data;
    } catch (error) {
        console.error("상품 id로 경매 데이터 로드 중 오류 발생", error);
        return { status: 500 };
    }
}

// 경매 상세보기
export async function fetchAuction(id?:number): Promise<AuctionModel>{
    let url = baseUrl;
    if (id) url = baseUrl + `/findById/${id}`;

    try {
        const response = await fetch(url, {
            method: 'GET'
        });

        const data = await response.json();

        return data;

    } catch (error) {
        console.error("경매 데이터 로드 중 오류 발생", error);
        throw new Error("경매 데이터 로드 중 오류 발생");
    }
}

