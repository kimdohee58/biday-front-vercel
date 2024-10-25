// src/app/page.tsx (서버 컴포넌트)
import PageClient from './page-client'; // 클라이언트 컴포넌트 import
import {cookies, headers} from 'next/headers';
import TokenManager from "@/components/TestToken";
import {fetchAllProductCards, fetchAllProductsWithImages} from "@/service/product/product.service";

export default async function PageHome({params}: {params:{filter:string}}) {
    // 서버 사이드에서 Authorization 헤더 가져오기
    const cookieStore = cookies();
    const authorizationToken = cookieStore.get('token')?.value || '';

    const productWithImagesData = await fetchAllProductCards();

    return (
        <div>
            <PageClient authorizationToken={authorizationToken} products={productWithImagesData}/>
            <TokenManager/>
        </div>
    );
}
