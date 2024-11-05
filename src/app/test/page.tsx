"use client";

import {useQuery} from "@tanstack/react-query";
import {getColorsArray} from "@/utils/productUtils";
import {productTest} from "@/service/test/test.service";
import {Alert} from "@/shared/Alert/Alert";
import PageLogin from "@/app/login/page";
import {Spinner} from "@/shared/Spinner/Spinner";
import React from "react";

export default function TestPage() {

    const productData = useQuery({queryKey: ["product", "image", "test", "wish"], queryFn: () => productTest(1)})

    if(productData.isLoading) return (
        <Spinner/>
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

    const alertText = "이게뭐임?";

    return <Alert><PageLogin/></Alert>;
};