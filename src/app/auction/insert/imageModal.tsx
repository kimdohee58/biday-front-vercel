'use client';

import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    IconButton,
    Typography,
    DialogFooter,
} from "@material-tailwind/react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/solid";

interface MembersProps {
    img: string;
    name: string;
    size: string;
}

function ImageCard({ img, name, size }: MembersProps) {
    return (
        <div className="border p-3 rounded-lg w-full">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <img
                        src={img}
                        alt="dark"
                        className="w-[70px] h-[50px] rounded-lg"
                    />
                    <div>
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="!font-bold mb-1"
                        >
                            {name}
                        </Typography>
                        <Typography
                            variant="small"
                            className="!font-normal text-gray-600"
                        >
                            {size}
                        </Typography>
                    </div>
                </div>
                <IconButton size="sm" variant="text">
                    <TrashIcon className="w-5 h-5 text-gray-500" />
                </IconButton>
            </div>
        </div>
    );
}

const data = [
    {
        img: "https://www.material-tailwind.com/image/dark-image.png",
        name: "cover-1.jpg",
        size: "140 KB",
    },
    {
        img: "https://www.material-tailwind.com/image/dark-image.png",
        name: "cover-2.jpg",
        size: "288 KB",
    },
];

export default function ImageModal({onClose, onClick}) {
    const [open, setOpen] = React.useState(true);

    const handleOpen = () => setOpen((cur) => !cur);

    return (
        <section className="grid place-items-center h-screen">
            <Button onClick={handleOpen}>Open Modal</Button>
            <Dialog className="p-4" open={open} handler={handleOpen}>
                <DialogHeader className="justify-between pb-0">
                    <Typography color="blue-gray" className="mb-1 font-bold">
                        Upload Files
                    </Typography>
                    <IconButton
                        color="gray"
                        size="sm"
                        variant="text"
                        onClick={handleOpen}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            className="h-4 w-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </IconButton>
                </DialogHeader>
                <DialogBody className="overflow-y-scroll pt-0">
                    <Typography
                        variant="small"
                        className="font-normal text-gray-600"
                    >
                        Easily upload files to your account with just a few clicks.
                    </Typography>
                    <label
                        htmlFor="upload"
                        className="grid place-items-center py-10 rounded-lg border border-dashed border-gray-300 mt-6"
                    >
                        <input type="file" id="upload" className="hidden" />
                        <IconButton variant="text" className="mb-4">
                            <ArrowUpTrayIcon
                                className="h-8 w-8 text-gray-900"
                                strokeWidth={2}
                            />
                        </IconButton>
                        <Typography color="blue-gray" className="mb-1 font-bold">
                            Drag and Drop or{" "}
                            <a href="#" className="underline">
                                Choose a Local File
                            </a>
                        </Typography>
                        <Typography
                            variant="small"
                            className="font-normal text-gray-600"
                        >
                            Supported formats: .png, .jpg, .svg
                        </Typography>
                    </label>
                    <div className="!mt-4 flex flex-col md:flex-row justify-between gap-4">
                        {data.map(({ img, name, size }) => (
                            <ImageCard key={name} img={img} name={name} size={size} />
                        ))}
                    </div>
                </DialogBody>
                <DialogFooter className="gap-2">
                    <Button onClick={handleOpen} variant="outlined">
                        취소
                    </Button>
                    <Button>submit</Button>
                </DialogFooter>
            </Dialog>
        </section>
    );
}
