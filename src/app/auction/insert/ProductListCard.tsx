"use client";

import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    IconButton,
    Typography,
    Input,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
} from "@material-tailwind/react";

interface ProductProps {
    image: string;
    productCode: string;
    name: string;
}

export default function ProductListCard({image, productCode, name}: ProductProps ) {
    return (
        <div className="flex items-center justify-between !mt-4 ">
            <div className="flex items-center gap-3">
                <Avatar src={image} size="md"/>
                <div>
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="!font-bold"
                    >
                        {productCode}
                    </Typography>
                    <Typography
                        variant="small"
                        className="!font-normal text-gray-600"
                    >
                        {name}
                    </Typography>
                </div>
            </div>
        </div>
    );
};