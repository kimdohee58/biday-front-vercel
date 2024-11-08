'use client';

import { useEffect, useState } from 'react';
import { FixedSizeList as List } from 'react-window';
import { ProductWithImageModel } from "@/model/product/product.model";
import { Avatar, Typography } from "@material-tailwind/react";

type ModalProps = {
    onClose: () => void;
    productList: ProductWithImageModel[];
    onClick: (product: ProductWithImageModel) => void;
};

function ProductListCard({ product, image, onClick }: ProductWithImageModel & { onClick: () => void }) {
    return (
        <div
            className="flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors duration-200 rounded-lg p-2"
            onClick={onClick}
        >
            <div className="flex items-center gap-3">
                <Avatar src={image.uploadUrl} alt={image.uploadName} size="md" />
                <div>
                    <Typography variant="small" color="blue-gray" className="!font-bold">
                        {product.productCode}
                    </Typography>
                    <Typography variant="small" className="!font-normal text-gray-600">
                        {product.name}
                        <span> | {product.brand}</span>
                    </Typography>
                </div>
            </div>
        </div>
    );
}

export default function ProductModal({ onClose, productList, onClick }: ModalProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState<ProductWithImageModel[]>(productList);

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
    };

    const handleSearchSubmit = () => {
        const lowerSearchTerm = searchTerm.toLowerCase();
        const filtered = productList.filter(product => {
            return (
                product.product.name.toLowerCase().includes(lowerSearchTerm) ||
                product.product.subName.toLowerCase().includes(lowerSearchTerm) ||
                product.product.description.toLowerCase().includes(lowerSearchTerm) ||
                product.product.productCode.toLowerCase().includes(lowerSearchTerm)
            );
        });
        setFilteredProducts(filtered);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearchSubmit();
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50" onClick={handleOutSideClick}>
            <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg">
                <button className="mb-4 text-blue-600 font-semibold hover:text-blue-500 transition-colors duration-200"
                        onClick={onClose}>
                    Close
                </button>

                <div className="flex gap-4 mb-4 w-full">
                    <input
                        type="text"
                        placeholder="Search products"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    />
                    <button
                        onClick={handleSearchSubmit}
                        className="w-20 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-200"
                    >
                        검색
                    </button>
                </div>


                {filteredProducts.length === 0 ? (
                    <div className="text-center text-gray-600 mt-4">
                        "{searchTerm}"에 해당하는 상품이 없습니다.
                    </div>
                ) : (
                    <div style={{height: '300px'}}>
                        <List
                            height={300}
                            itemCount={filteredProducts.length}
                            itemSize={70}
                            width={'100%'}
                        >
                            {({ index, style }) => {
                                const product = filteredProducts[index];
                                return (
                                    <div style={style} key={product.product.id}>
                                        <ProductListCard {...product} onClick={() => onClick(product)} />
                                    </div>
                                );
                            }}
                        </List>
                    </div>
                )}
            </div>
        </div>
    );
};