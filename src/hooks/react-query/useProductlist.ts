import {useQuery, useSuspenseQuery} from "@tanstack/react-query";
import {
    fetchAllProductCards,
    fetchProductWithImage,
    fetchProductWithImageBySizeId
} from "@/service/product/product.service";

export const useProductCardList = (isProductInRedux: boolean) => {
    return useQuery({
        queryKey: ["productCardList"],
        queryFn: () => fetchAllProductCards(),
        enabled: !isProductInRedux,
    })
};

export const useProductWithImageBySizeId = (sizeId: number, enabled: boolean = true) => {
    return useQuery({
        queryKey: ["productWithImage", "size", sizeId],
        queryFn: () => fetchProductWithImageBySizeId(sizeId),
        enabled,
    })
};
