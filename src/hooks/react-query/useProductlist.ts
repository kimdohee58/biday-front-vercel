import {useQuery} from "@tanstack/react-query";
import {fetchAllProductCards} from "@/service/product/product.service";

export const useProductCardList = (productsInReduxLength: number) => {
    return useQuery({
        queryKey: ["productCardList"],
        queryFn: () => fetchAllProductCards(),
        enabled: productsInReduxLength === 0,
    })
};