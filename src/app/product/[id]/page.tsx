import {fetchProductDetails} from "@/service/product/product.service";
import ProductClientComponent from "@/app/product/[id]/ProductClientComponent";

export default async function ProductPage({params}: { params: { id: string, size?: string} }) {
    const product = await fetchProductDetails(params.id);

    return (
        <div>
            <ProductClientComponent product={product} size={params.size}/>
        </div>
    );
};