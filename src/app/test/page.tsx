"use client";

import {useQuery} from "@tanstack/react-query";
import {fetchProductBySizeId} from "@/service/product/product.service";

export default function TestPage() {

    const productData = useQuery({queryKey: ["product", "test"], queryFn: () => fetchProductBySizeId(1)})

    if (!productData.isLoading) {
        console.log("productData", productData.data);
    }

    return <div></div>;
};