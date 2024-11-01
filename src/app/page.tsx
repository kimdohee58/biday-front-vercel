import PageClient from './page-client';
import {cookies, headers} from 'next/headers';
import TokenManager from "@/components/TestToken";
import {fetchAllProductCards, fetchAllProductsWithImages} from "@/service/product/product.service";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";

export default async function PageHome({params}: {params:{filter:string}}) {
    const cookieStore = cookies();
    const authorizationToken = cookieStore.get('token')?.value || '';

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({queryKey: ["allProductCards"], queryFn: () => fetchAllProductsWithImages()});
    const dehydratedState = dehydrate(queryClient);

    return (
        <div>
            <HydrationBoundary state={dehydratedState}>
                <PageClient authorizationToken={authorizationToken}
                            products={productWithImagesData}
                />
                <TokenManager/>
            </HydrationBoundary>
        </div>
    );
}
