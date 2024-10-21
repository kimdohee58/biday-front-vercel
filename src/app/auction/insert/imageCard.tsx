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
import { TrashIcon } from "@heroicons/react/24/solid";

export default function ImageCard() {
    return (
        <>
            <div
                className="relative rounded-lg lg:h-40 md:h-36 h-24 w-full bg-[url('https://www.material-tailwind.com/image/dark-image.png')] bg-cover bg-center bg-no-repeat">
                <div className="flex w-full h-full !items-end !justify-end p-1">
                    <IconButton size="sm" variant="text">
                        <TrashIcon className="w-5 h-5 text-gray-500"/>
                    </IconButton>
                </div>
            </div>
        </>
    );


}