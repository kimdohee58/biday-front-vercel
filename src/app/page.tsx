import PageClient from './page-client';
import {cookies, headers} from 'next/headers';
import TokenManager from "@/components/TestToken";
import {fetchAllProductCards, fetchAllProductsWithImages} from "@/service/product/product.service";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";

export default async function PageHome() {
    const cookieStore = cookies();
    const authorizationToken = cookieStore.get('token')?.value || '';

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({queryKey: ["allProductCards"], queryFn: fetchAllProductCards});
    const dehydratedState = dehydrate(queryClient);

    return (
        <div>
            <HydrationBoundary state={dehydratedState}>
                <PageClient authorizationToken={authorizationToken}/>
                <TokenManager/>
            </HydrationBoundary>
        </div>
    );
}
