// ProductModal.tsx
'use client';

import {useState, useEffect} from 'react';
import { FixedSizeList as List } from 'react-window';
import {ProductWithImageModel} from "@/model/product/product.model";
import {Avatar, Typography} from "@material-tailwind/react";

type ModalProps = {
    onClose: () => void;
    productList: ProductWithImageModel[];
    onClick: (product: ProductWithImageModel) => void
}

function ProductListCard({product, image, onClick}: ProductWithImageModel & { onClick: () => void }) {
    return (
        <div className="flex items-center justify-between !mt-4 cursor-pointer" onClick={onClick}>
            <div className="flex items-center gap-3">
                <Avatar src={image.uploadUrl} alt={image.uploadName} size="md"/>
                <div>
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="!font-bold"
                    >
                        {product.productCode}
                    </Typography>
                    <Typography
                        variant="small"
                        className="!font-normal text-gray-600"
                    >
                        {product.name}
                        <span> | {product.brand}</span>
                    </Typography>
                </div>
            </div>
        </div>
    );
}

export default function ProductModal ({ onClose, productList, onClick}: ModalProps){
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    const handleOutSideClick = (e: MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
             onClick={onClose}>
            <div className="bg-white p-6 rounded-lg max-w-md w-full">
                <button className="mb-4" onClick={onClose}>
                    Close
                </button>
                <input
                    type="text"
                    placeholder="Search products"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 mb-4 border"
                />
                <div style={{height: '300px'}}>
                    <List
                        height={300}
                        itemCount={productList.length}
                        itemSize={70}
                        width={'100%'}
                    >
                        {({index, style}) => {
                            const product = productList[index];
                            return (
                                <div style={style} key={product.product.id}>
                                    <ProductListCard {...product}
                                                     onClick={() => onClick(product)}/>
                                </div>
                            );
                        }}
                    </List>
                </div>
            </div>
        </div>
    );
};
