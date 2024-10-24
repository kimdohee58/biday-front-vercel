'use client';

import Label from "@/components/Label/Label";
import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {defaultProduct, ProductWithImageModel} from "@/model/product/product.model";
import {useQuery} from "@tanstack/react-query";
import {fetchAllProductsWithImages} from "@/service/product/product.service";
import {defaultImage, ImageType} from "@/model/ftp/image.model";
import ProductModal from "@/app/auction/insert/ProductModal";
import {useSearchParams} from "next/navigation";
import ProductSection from "@/app/auction/insert/productSection";
import ImageCard from "@/app/auction/insert/imageCard";
import ImageModal from "@/app/auction/insert/imageModal";
import {useMutation} from "@tanstack/react-query";
import {saveAuction} from "@/service/auction/auction.service";
import {SaveAuctionModel} from "@/model/auction/auction.model";
import {uploadImages} from "@/service/ftp/image.service";
import {useRouter} from "next/navigation";

export default function InsertAuction() {

    const searchParams = useSearchParams();
    const router = useRouter();

    const productId = searchParams.get("productId");
    const [selectedProduct, setSelectedProduct] = useState<ProductWithImageModel>({
        product: defaultProduct,
        image: defaultImage,
    });
    const [description, setDescription] = useState("");
    const [endDate, setEndDate] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [currentModal, setCurrentModal] = useState<"product" | "image" | null>(null);
    const [currentFileIndex, setCurrentFileIndex] = useState<number | null>(null);
    const [duration, setDuration] = useState<number>(3);
    const [files, setFiles] = useState<(File | null)[]>([null, null, null]);
    const [size, setSize] = useState<number>(0);
    const [startedAt, setStartedAt] = useState<Date>();
    const [endedAt, setEndedAt] = useState<Date>();
    const [auctionId, setAuctionId] = useState();
    // const [startingBid, setStartingBid] = useState();

    const productList = useQuery({queryKey: ["allProductsWithImages"], queryFn: () => fetchAllProductsWithImages()});

    const auctionMutate = useMutation({mutationFn: saveAuction});
    const imageMutate = useMutation({mutationFn: uploadImages});

    if (productList.isLoading) {
        return <div className="flex h-screen items-center justify-center">
            <div className="text-center">
                <svg
                    className="animate-spin h-12 w-12 text-indigo-600 mx-auto mb-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                    />
                </svg>
                <h2 className="text-2xl font-semibold text-indigo-600">Loading...</h2>
            </div>
        </div>;
    }

    console.log("productList", productList);

    if (!productList || !productList.data) {
        return <div>프로덕트 리스트를 불러올 수 없습니다.</div>;
        //TODO error enum
    }


    /*    useEffect(() => {
            if (!productList.isLoading && productList.data && productId) {
                const foundProduct = productList.data.find((item) => item.product.id === productId);
                if (foundProduct) {
                    setSelectedProduct(foundProduct);
                }
            }
        }, [productList.data, productId]);*/


    if (productList.error instanceof Error) return <div>Error: {productList.error.message}</div>;
    // 에러 페이지로 변경

    // 사이즈 핸들러
    const handleSize = (size: number) => {
        setSize(size);
    };

    // 모달 핸들러
    const openModalProduct = () => {
        setCurrentModal("product");
        setIsOpen(true);
    };

    // 설명 핸들러
    const handleDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    };

    /*    // 입찰시작가 핸들러
        const handleStartingBid = (price: number) => {
            setStartingBid()
        };*/

    const openModal = (type: "image" | "product", index?: number) => {
        if (type === "image" && index !== undefined) {
            setCurrentFileIndex(index);
        }
        setCurrentModal(type);
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
        setCurrentModal(null);
    };


    // 파일 업로드 핸들러
    /*    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) {
                const selectedFiles = Array.from(e.target.files).slice(0, 3);
                setFiles(selectedFiles);
            }
        };*/

    const handleImageSubmit = (newFiles: File[]) => {
        setFiles((prevFiles) => {
            const updatedFiles = [...prevFiles];

            newFiles.slice(0, 3).forEach((file, index) => {
                updatedFiles[index] = file;
            });

            for (let i = updatedFiles.length; i < 3; i++) {
                updatedFiles[i] = null;
            }

            return updatedFiles.slice(0, 3);

        });
        setIsOpen(false);
        setCurrentModal(null);
    };

    // 제품 선택 핸들러
    const handleSelectProduct = (product: ProductWithImageModel) => {
        setSelectedProduct(product);
        closeModal();
    }

    // 기간 선택 핸들러
    const durationSelectButton = () => {
        const durations = [3, 5, 7];

        const handleClick = (days: number) => {
            setDuration(days);

            const currentDate = new Date();

            const minutes = currentDate.getMinutes();
            const roundedMinutes = Math.ceil(minutes / 5) * 5;

            if (roundedMinutes !== minutes) {
                currentDate.setMinutes(roundedMinutes);
            }

            const endDate = new Date(currentDate);
            endDate.setDate(currentDate.getDate() + days);

            setStartedAt(currentDate);
            setEndedAt(endDate);
        };

        return ((
            <div className="flex">
                {durations.map((days, index) => (
                    <button
                        className={`rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm
                        hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800
                        active:border-slate-800 active:text-white active:bg-slate-800
                        disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none
                        ${duration === days ? `border-state-800 text-white bg-slate-800` : `border-slate-300`}
                        ${index !== durations.length - 1 ? "mr-4" : ""}`}
                        key={days}
                        onClick={() => handleClick(days)}>
                        {days}일
                    </button>
                ))}
            </div>
        ))
    };

    const getDuration = () => {
        if (!startedAt || !endedAt) {
            return <div>기간을 선택해 주세요.</div>;
        }

        return (
            `${startedAt.toLocaleDateString()} ${String(startedAt.getHours()).padStart(2, '0')} : ${String(startedAt.getMinutes()).padStart(2, '0')} -
                ${endedAt.toLocaleString()}`

        );
    };

    const isFormValid = !!(selectedProduct && description && duration && files.length > 0 && files && startedAt && endedAt && size != 0
        && files.every((file) => file !== null));

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // const formData = new FormData();
        const imageData = new FormData();
        /*if (isFormValid) {
            formData.append("productId", selectedProduct.product.id.toString());
            formData.append("sizeId", size.toString());
            formData.append("description", description);
            formData.append("startingBid", "10000");
            formData.append("currentBid", "10000");
            formData.append("startedAt", startedAt.toString());
            formData.append("endedAt", endedAt.toString());

            auctionMutate.mutate(formData);
            console.log("AuctionMutate 실행");
        }*/

        if (isFormValid) {
            const body: SaveAuctionModel = {
                sizeId: size,
                description: description,
                startingBid: 10000,
                currentBid: 10000,
                startedAt: startedAt,
                endedAt: endedAt,
            };


            try {
                const data = await auctionMutate.mutateAsync(body);

                const image = {
                    filePath: "auctions",
                    type: ImageType.AUCTION,
                    referencedId: data.id as number,
                    files: files as File[],
                }

                const message = await imageMutate.mutateAsync(image);

                if (message) {
                    router.push("/auction/insert/success");
                }

            } catch (error) {
                console.error("옥션 등록 중 오류 발생", error);
            }

        }


    };

    const renderDescription = () => {
        return (
            <div className="itmes-end">
                <div className="relative w-full min-w-[200px]">
                <textarea placeholder="상품설명"
                          className="peer h-full min-h-[100px] w-full resize-none border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                          value={description}
                          onChange={handleDescription}></textarea>
                    <label
                        className="after:content[' '] pointer-events-none absolute left-0 -top-2.5 flex h-full w-full select-none text-sm font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-900 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    </label>
                </div>
            </div>
        );
    };

    return (
        <form onSubmit={handleSubmit} className="flex justify-center items-center min-h-screen mx-auto">
            <div className="w-3/4 items-center mt-10 mb-10 ml-10">
                <Label className="block">
                    상품:
                </Label>
                <div className="w-full mb-6">
                    <ProductSection openModal={openModalProduct} selectedProduct={selectedProduct}
                                    handleSize={handleSize}/>
                    {isOpen && currentModal === "product" && (
                        <ProductModal
                            onClose={closeModal}
                            productList={productList.data}
                            onClick={handleSelectProduct}/>
                    )}
                    <input type="hidden" name="productId" value={selectedProduct?.product.id}/>
                </div>
                <div className="w-full mb-6">
                    <Label>
                        경매 기간:
                    </Label>
                    <span className="ml-2 rfont-light accent-gray-400">{getDuration()}</span>
                    {durationSelectButton()}
                    <input type="hidden" name="duration"/>
                    {/* input value 설정 필요 */}
                </div>
                <div className="w-full mb-6">
                    <Label>
                        업로드 이미지:
                    </Label>
                    <div className="flex gap-4 mt-6">
                        {files.map((file, index) => (
                            <ImageCard
                                key={index}
                                file={file}
                                onClick={() => openModal("image", index)}/>
                        ))}
                    </div>
                    {isOpen && currentModal === "image" && (
                        <ImageModal
                            onClose={closeModal}
                            isOpen={isOpen}
                            onSubmit={handleImageSubmit}
                            files={files}/>
                    )}
                </div>
                {renderDescription()}
                <button type="submit"
                        className={`mt-4 py-2 px-4 rounded text-white ${isFormValid ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
                        disabled={!isFormValid}>
                    경매 등록
                </button>
            </div>

        </form>
    );

};