
const link = 'http://localhost:8080/api/auctions'

/**
 * 1. 옥션 추가 (토큰 필요)
 * 2. 옥션 개별 호출
 * 3. 옥션 리스트 호출
 * 4. 옥션 삭제 (토큰 필요)
 */

export async function insertAuction(auction: AuctionModel): Promise<any | { status: number }> {
    try {

        const response = await fetch(link, {
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

export async function getAuction(id:number): Promise<any | {state: number}> {
    try {
        const response = await fetch(link + "/" + id, {
            method: 'GET'
        });

        const data = await response.json();

        console.log("+++++>" + JSON.stringify(data));

        return data;
    } catch (error) {
        console.error("경매 개별 데이터 로드 중 오류 발생", error);
        return { status: 500 };
    }
}

export async function getAuctionList() {
    try {
        const response = await fetch(link, {
            method: 'GET'
        });

        const data = await response.json();

        console.log("+++++>" + JSON.stringify(data));

        return data;
    } catch (error) {
        console.error("경매 리스트 로드 중 오류 발생", error);
        return { status: 500 };
    }
}


export async function deleteAuction(id:number) {
    try {

        const response = await fetch(link + "/" + id, {
            method: 'DELETE'
            // 토큰 필요
        });

        const data: any = await response;

        return data;

    } catch (error) {
        console.error("경매 개별 삭제 중 오류 발생", error);

        return {status: 500}
    }

}