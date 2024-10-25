"use client";

import {useQuery} from "@tanstack/react-query";
import ProductCard from "@/components/ProductCard";
import {getColorsArray} from "@/utils/productUtils";
import {productTest} from "@/service/test/test.service";

export default function TestPage() {

    const productData = useQuery({queryKey: ["product", "image", "test", "wish"], queryFn: () => productTest(1)})

    if(productData.isLoading) return (
        <div>
            Loading...
        </div>
    );

    if (!productData.data) {
        return <div>?
        </div>
    }
    if (!productData.isLoading) {
        console.log("productData", productData.data);
    }

    const products = productData.data.map((item) => {
        return item.product;
    });

    const colors = getColorsArray(products);

    return <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-8 gap-y-10 mt-8 lg:mt-10">
        {productData.data!.map((product) => (
            <ProductCard key={product.product.id} {...product} />
        ))}
    </div>;
};