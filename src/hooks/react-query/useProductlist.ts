import {useQuery, useSuspenseQuery} from "@tanstack/react-query";
import {
    fetchAllProductCards, fetchProductDetails,
    fetchProductWithImage,
    fetchProductWithImageBySizeId
} from "@/service/product/product.service";
import {ProductCardModel, ProductDetails} from "@/model/product/product.model";

export const useProductCardList = (isProductInRedux: boolean) => {
    return useQuery<ProductCardModel[]>({
        queryKey: ["allProductCards"],
        queryFn: fetchAllProductCards,
        enabled: !isProductInRedux,
    });
};

export const useProductWithImageBySizeId = (sizeId: number, enabled: boolean = true) => {
    return useQuery({
        queryKey: ["productWithImage", "size", sizeId],
        queryFn: () => fetchProductWithImageBySizeId(sizeId),
        enabled,
    })
};

export const useProductDetail = (productId: string) => {
    return useQuery<ProductDetails>({
        queryKey: ["product", productId],
        queryFn: () => fetchProductDetails(productId),
    });
}

export const useSuspenseProductDetail = (productId: string) => {
    return useSuspenseQuery<ProductDetails>({
            queryKey: ["product", productId],
            queryFn: () => fetchProductDetails(productId),
        }
    )
};