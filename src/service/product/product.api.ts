import {ProductModel} from "@/model/product/product.model";


const baseUrl = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/products`

export async function fetchProduct(id?: number) {
    try {

        let url = baseUrl;

        id ? url += `?id=${id}` : url += "/findAll";

        const response = await fetch(url, {cache: "no-store"});

        console.log("확인용", response.ok);

        if (response.ok) {
            const data = await response.json();
            console.log("지금 만든 최신 확인", data);
            return data;

        } else {
            console.log("실패")
            const data = await response.json();
            console.log("실패인 경우", data);
            return {...data, id: 0}

        }

    } catch (error) {
        console.error("상품 데이터 로드 중 오류 발생", error);
        throw new Error("상품 데이터 로드 실패");
        // TODO error enum
    }
}

export async function getProductList() {
    try {
        const response = await fetch(baseUrl, {
            method: 'GET'
        });

        const data = await response.json();

        console.log("+++++>" + JSON.stringify(data));

        return data;
    } catch (error) {
        console.error("상품 리스트 로드 중 오류 발생", error);
        return {status: 500};
    }
}



// 전체 상품 목록
export async function fetchAllProducts(): Promise<ProductModel[]> {
    const url = baseUrl + "/findAll";

    try {
        const response = await fetch(url, {
            cache: "no-store",
            method: "GET",
        });

        console.log("응답 객체 확인: ", response);

        if (response.ok) {
            const data = response.json();
            console.log("프로덕트 데이터 확인", data);
            return data;
        } else {
            throw new Error(`상품 전체 정보 로드 실패 status: ${response.status}`);
            // TODO error enum
        }

    } catch (error) {
        console.error("상품 전체 로드 중 오류 발생: product.api.ts fetchAllProducts", error);
        throw new Error("상품 전체 정보 로드 실패");
        // TODO error enum
    }
}

