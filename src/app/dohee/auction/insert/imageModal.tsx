'use client';

import React, {ChangeEvent, useEffect, useState} from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    IconButton,
    Typography,
    DialogFooter,
} from "@material-tailwind/react";
import {ArrowUpTrayIcon} from "@heroicons/react/24/outline";
import {TrashIcon} from "@heroicons/react/24/solid";

interface MembersProps {
    img: string;
    name: string;
    size: string;
    onDelete: () => void;
}

function ImageCard({img, name, size, onDelete}: MembersProps) {
    return (
        <div className="border p-3 rounded-lg w-full">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    {img ? (
                        <img
                            src={img}
                            alt="dark"
                            className="w-[70px] h-[50px] rounded-lg"
                        />
                    ) : (
                        <div className="w-[70px] h-[50px] bg-gray-300 rounded-lg"></div>
                    )}
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
                            {size} KB
                        </Typography>
                    </div>
                </div>
                <IconButton size="sm" variant="text" onClick={onDelete}>
                    <TrashIcon className="w-5 h-5 text-gray-500"/>
                </IconButton>
            </div>
        </div>
    );
}

type ImageModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (selectedFiles: File[]) => void;
    files: (File | null)[];
}

export default function ImageModal({isOpen, onClose, onSubmit, files}: ImageModalProps) {

    const [tempFile, setTempFile] = useState<File[]>([]);

    useEffect(() => {
        console.log("tempFile", tempFile);
    }, [tempFile]);

    useEffect(() => {
        if (isOpen) {
            const validFiles = files.filter((file): file is File => file !== null);
            setTempFile(validFiles);
        }
    }, [isOpen, files]);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setTempFile((prevFiles) => [...prevFiles, ...newFiles]);
        }
    }

    const handleDelete = (index: number) => {
        setTempFile((prevFiles) => {
            const updatedFiles = [...prevFiles];
            updatedFiles.splice(index, 1);
            return updatedFiles;
        });
    }

    const handleConfirm = () => {
        const finalFiles:(File | null)[] = [...tempFile];

        while (finalFiles.length < 3) {
            finalFiles.push(null);
        }

        onSubmit(finalFiles as File[]);
        onClose();
    };

    return (
        <Dialog className="p-4" open={isOpen}>
            <DialogHeader className="justify-between pb-0">
                <Typography color="blue-gray" className="mb-1 font-bold">
                    사진 등록
                </Typography>
                <IconButton
                    color="gray"
                    size="sm"
                    variant="text"
                    onClick={onClose}
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
                    파일을 선택하세요. 최대 3개의 파일을 등록할 수 있습니다.
                </Typography>
                <label
                    htmlFor="upload"
                    className="grid place-items-center py-10 rounded-lg border border-dashed border-gray-300 mt-6"
                >
                    <input type="file" id="upload" className="hidden" multiple
                           accept="image/png, image/jpeg, image/svg+xml" onChange={handleFileChange}/>
                    <IconButton variant="text" className="mb-4">
                        <ArrowUpTrayIcon
                            className="h-8 w-8 text-gray-900"
                            strokeWidth={2}
                        />
                    </IconButton>
                    <Typography color="blue-gray" className="mb-1 font-bold">
                        드래그 앤 드롭 또는{" "}
                        <a href="#" className="underline">
                            파일 선택
                        </a>
                    </Typography>
                    <Typography
                        variant="small"
                        className="font-normal text-gray-600"
                    >
                        지원되는 포맷: .png, .jpg, .svg
                    </Typography>
                </label>
                <div className="!mt-4 flex flex-col md:flex-row justify-between gap-4">
                    {tempFile.map((file, index) => (
                        file && (
                        <ImageCard key={index} img={URL.createObjectURL(file)} name={file.name}
                                   size={(file.size / 1024).toFixed(2)}
                                   onDelete={() => handleDelete(index)}/>
                        )
                    ))}
                </div>
            </DialogBody>
            <DialogFooter className="gap-2">
                <Button onClick={onClose} variant="outlined">
                    취소
                </Button>
                <Button onClick={handleConfirm}>저장</Button>
            </DialogFooter>
        </Dialog>
    );
};
