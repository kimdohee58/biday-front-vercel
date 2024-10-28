import {useQuery} from "@tanstack/react-query";
import {fetchAllProductCards} from "@/service/product/product.service";

export const useProductCardList = (isProductInRedux: boolean) => {
    return useQuery({
        queryKey: ["productCardList"],
        queryFn: () => fetchAllProductCards(),
        enabled: !isProductInRedux,
    })
};