
const link = 'http://localhost:8080/api/products'

export async function insertProduct(product: ProductModel): Promise<any | { status: number }> {
    try {

        const response = await fetch(link, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                    // 토큰 필요
                },
                body: JSON.stringify(product)
            }
        );

        return await response.json();

    } catch (error) {
        console.error("상품 등록 중 오류 발생: ", error);
        return {status: 500}
    }
}

export async function getProduct(id:number): Promise<any | {state: number}> {
    try {
        const response = await fetch(link + "/" + id, {
            method: 'GET'
        });

        const data = await response.json();

        console.log("+++++>" + JSON.stringify(data));

        return data;
    } catch (error) {
        console.error("상품 개별 데이터 로드 중 오류 발생", error);
        return { status: 500 };
    }
}

export async function getProductList() {
    try {
        const response = await fetch(link, {
            method: 'GET'
        });

        const data = await response.json();

        console.log("+++++>" + JSON.stringify(data));

        return data;
    } catch (error) {
        console.error("상품 리스트 로드 중 오류 발생", error);
        return { status: 500 };
    }
}


export async function deleteProduct(id:number) {
    try {

        const response = await fetch(link + "/" + id, {
            method: 'DELETE'
            // 토큰 필요
        });

        const data: any = await response;

        return data;

    } catch (error) {
        console.error("상품 개별 삭제 중 오류 발생", error);

        return {status: 500}
    }

}