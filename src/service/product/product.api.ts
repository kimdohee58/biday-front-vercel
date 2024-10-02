
//src/service/product/product.api.ts

import { ProductModel } from "@/model/ProductModel";

let baseUrl =  `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/products`



// 등록 함수
export async function insertProduct(product: ProductModel): Promise<any | { status: number }> {
    try {
        const response = await fetch(baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'// 토큰 필요
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

// 상품 개별 가져오기 함수
export async function getProduct(id?:number): Promise<any | {state: number}> {
    try {

        let url = id ? `${baseUrl}/${id}` : baseUrl;
        // 삼항 연산자로 URL 결정 아이디가 있으면 뒤에 url/5 / 업승면 그냥 url
        //let url = baseUrl;
        //url = id? url + `/${id}` : url

        const response = await fetch(`${url}/${id}`, {
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

// 전체 상품 가져오는 함수
export async function getProductList() {
    try {
        const response = await fetch(`${baseUrl}/findByFilter`, {
            method: 'GET',
        });


        const data = await response.json();
        console.log("getProductList 확인 로그 " , data)

        console.log("제이슨으로 데이터는 받아지는 것 같음 JSON.stringfy(data) : " + JSON.stringify(data));

        return data;
    } catch (error) {
        console.error("상품 리스트 로드 중 오류 발생", error);
        return { status: 500 };
    }
}

// 상품 삭제 함수
export async function deleteProduct(id:number) {
    try {

        const response = await fetch(`${baseUrl}/${id}`, {
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