'use client';

import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    IconButton,
    Typography,
    DialogFooter,
    Input,
    Select,
    Option,
    Textarea,
} from "@material-tailwind/react";
import {ProductWithImageModel} from "@/model/product/product.model";
import {getColor} from "@/utils/productUtils";
import {ChangeEvent} from "react";

type ProductSectionProps = {
    openModal: () => void,
    selectedProduct: ProductWithImageModel | null,
    handleSize: (size: number) => void
}
export default function ProductSection({openModal, selectedProduct, handleSize}: ProductSectionProps) {
    const handleSizeChange = (value: string | undefined) => {
        if (value !== undefined) {
            handleSize(Number(value));
        }
    };
    // return (
    //     <div>
    //         <div className="flex items-center flex-col md:flex-row gap-4">
    //             <div className="w-full">
    //                 <Typography
    //                     variant="small"
    //                     color="blue-gray"
    //                     className="mb-1 font-medium"
    //                 >
    //                     상품명
    //                 </Typography>
    //                 <Input
    //                     color="gray"
    //                     labelProps={{
    //                         className: "hidden",
    //                     }}
    //                     className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
    //                     readOnly
    //                     onClick={openModal}
    //                     value={selectedProduct?.product.name || ""}
    //                 />
    //             </div>
    //             <div className="w-full">
    //                 <Typography
    //                     variant="small"
    //                     color="blue-gray"
    //                     className="mb-1 font-medium"
    //                 >
    //                     카테고리
    //                 </Typography>
    //                 <Input
    //                     labelProps={{
    //                         className: "hidden",
    //                     }}
    //                     className="border-t-blue-gray-200 aria-[expanded=true]:border-t-primary"
    //                     disabled
    //                     onClick={openModal}
    //                     value={selectedProduct?.product?.category || ""}
    //                 />
    //             </div>
    //         </div>
    //         <div className="flex items-center flex-col md:flex-row gap-4 my-4">
    //             <div className="w-full">
    //                 <Typography
    //                     variant="small"
    //                     color="blue-gray"
    //                     className="mb-1 font-medium"
    //                 >
    //                     원가
    //                 </Typography>
    //                 <Input
    //                     color="gray"
    //                     placeholder="---"
    //                     labelProps={{
    //                         className: "hidden",
    //                     }}
    //                     className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
    //                     readOnly
    //                     onClick={openModal}
    //                     value={selectedProduct?.product?.price || ""}
    //                 />
    //                 <Typography
    //                     variant="small"
    //                     color="blue-gray"
    //                     className="mt-1 text-gray-500"
    //                 >
    //                     경매의 시작가는 원가의 50%입니다.
    //                 </Typography>
    //             </div>
    //             <div className="w-full">
    //                 <Typography
    //                     variant="small"
    //                     color="blue-gray"
    //                     className="mb-1 font-medium"
    //                 >
    //                     브랜드
    //                 </Typography>
    //                 <Input
    //                     labelProps={{
    //                         className: "hidden",
    //                     }}
    //                     className="border-t-blue-gray-200 aria-[expanded=true]:border-t-primary"
    //                     disabled
    //                     onClick={openModal}
    //                     value={selectedProduct?.product?.brand || ""}
    //                 />
    //             </div>
    //         </div>
    //         <div className="flex items-center flex-col md:flex-row gap-4 my-4">
    //             <div className="w-full">
    //                 <Typography
    //                     variant="small"
    //                     color="blue-gray"
    //                     className="mb-1 font-medium"
    //                 >
    //                     색상
    //                 </Typography>
    //                 <Input
    //                     labelProps={{
    //                         className: "hidden",
    //                     }}
    //                     className="border-t-blue-gray-200 aria-[expanded=true]:border-t-primary"
    //                     disabled
    //                     onClick={openModal}
    //                     value={selectedProduct ? getColor(selectedProduct.product.name) : ""}
    //                 />
    //             </div>
    //             <div className="w-full">
    //                 <Typography
    //                     variant="small"
    //                     color="blue-gray"
    //                     className="mb-1 font-medium"
    //                 >
    //                     사이즈
    //                 </Typography>
    //                 <Select
    //                     labelProps={{
    //                         className: "hidden",
    //                     }}
    //                     className="border-t-blue-gray-200 aria-[expanded=true]:border-t-primary"
    //                     disabled={selectedProduct?.product.id == 0}
    //                     onChange={handleSizeChange}
    //                 >
    //
    //                     {selectedProduct?.product.id == 0 ? (
    //                         <Option value="default">상품을 선택해 주세요</Option>
    //                     ) : (
    //                         selectedProduct?.product.sizes.map((size) => (
    //                             <Option key={size.id} value={size.id.toString()}>
    //                                 {size.size}
    //                             </Option>
    //                         ))
    //                     )}
    //                 </Select>
    //             </div>
    //         </div>
    //     </div>
    // );

    return (
        <div className="p-6 rounded-lg shadow-lg bg-white">
            <div className="flex items-center flex-col md:flex-row gap-6">
                <div className="w-full">
                    <Typography variant="small" color="blue-gray" className="mb-2 font-semibold">
                        상품명
                    </Typography>
                    <Input
                        color="gray"
                        labelProps={{ className: "hidden" }}
                        className="w-full border border-gray-300 focus:border-blue-500 transition duration-200 placeholder:opacity-100"
                        readOnly
                        onClick={openModal}
                        value={selectedProduct?.product.name || ""}
                    />
                </div>
                <div className="w-full">
                    <Typography variant="small" color="blue-gray" className="mb-2 font-semibold">
                        카테고리
                    </Typography>
                    <Input
                        labelProps={{ className: "hidden" }}
                        className="border border-gray-300 aria-[expanded=true]:border-blue-500 transition duration-200"
                        disabled
                        onClick={openModal}
                        value={selectedProduct?.product?.category || ""}
                    />
                </div>
            </div>
            <div className="flex items-center flex-col md:flex-row gap-6 my-4">
                <div className="w-full">
                    <Typography variant="small" color="blue-gray" className="mb-2 font-semibold">
                        원가
                    </Typography>
                    <Input
                        color="gray"
                        placeholder="---"
                        labelProps={{ className: "hidden" }}
                        className="w-full border border-gray-300 focus:border-blue-500 transition duration-200 placeholder:opacity-100"
                        readOnly
                        onClick={openModal}
                        value={selectedProduct?.product?.price || ""}
                    />
                    <Typography variant="small" color="blue-gray" className="mt-1 text-gray-500">
                        경매의 시작가는 원가의 50%입니다.
                    </Typography>
                </div>
                <div className="w-full">
                    <Typography variant="small" color="blue-gray" className="mb-2 font-semibold">
                        브랜드
                    </Typography>
                    <Input
                        labelProps={{ className: "hidden" }}
                        className="border border-gray-300 aria-[expanded=true]:border-blue-500 transition duration-200"
                        disabled
                        onClick={openModal}
                        value={selectedProduct?.product?.brand || ""}
                    />
                </div>
            </div>
            <div className="flex items-center flex-col md:flex-row gap-6 my-4">
                <div className="w-full">
                    <Typography variant="small" color="blue-gray" className="mb-2 font-semibold">
                        색상
                    </Typography>
                    <Input
                        labelProps={{ className: "hidden" }}
                        className="border border-gray-300 aria-[expanded=true]:border-blue-500 transition duration-200"
                        disabled
                        onClick={openModal}
                        value={selectedProduct ? getColor(selectedProduct.product.name) : ""}
                    />
                </div>
                <div className="w-full">
                    <Typography variant="small" color="blue-gray" className="mb-2 font-semibold">
                        사이즈
                    </Typography>
                    <Select
                        labelProps={{ className: "hidden" }}
                        className="border border-gray-300 aria-[expanded=true]:border-blue-500 transition duration-200"
                        disabled={selectedProduct?.product.id === 0}
                        onChange={handleSizeChange}
                    >
                        {selectedProduct?.product.id === 0 ? (
                            <Option value="default">상품을 선택해 주세요</Option>
                        ) : (
                            selectedProduct?.product.sizes.map((size) => (
                                <Option key={size.id} value={size.id.toString()}>
                                    {size.size}
                                </Option>
                            ))
                        )}
                    </Select>
                </div>
            </div>
        </div>
    );


};