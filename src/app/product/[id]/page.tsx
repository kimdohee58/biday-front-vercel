import {fetchProductDetails} from "@/service/product/product.service";
import ProductClientComponent from "@/app/product/[id]/ProductClientComponent";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {Suspense} from "react";

export default async function ProductPage({params}: { params: { id: string} }) {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({queryKey: ["product", params.id], queryFn: () => fetchProductDetails(params.id)});
    const dehydratedState = dehydrate(queryClient);

    return (
        <div>
            <HydrationBoundary state={dehydratedState}>
                <Suspense>
                    <ProductClientComponent productId={params.id}/>
                </Suspense>
            </HydrationBoundary>

        </div>
    );
};