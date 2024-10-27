import {useQuery, useSuspenseQuery} from "@tanstack/react-query";
import {fetchAllProductCards, fetchProductWithImage} from "@/service/product/product.service";

export const useProductCardList = (isProductInRedux: boolean) => {
    return useQuery({
        queryKey: ["productCardList"],
        queryFn: () => fetchAllProductCards(),
        enabled: !isProductInRedux,
    })
};

export const useProductImageList = (productId: number) => {
    return useSuspenseQuery({
        queryKey: ["productWithImage", productId],
        queryFn: () => fetchProductWithImage(productId),
    })
}
