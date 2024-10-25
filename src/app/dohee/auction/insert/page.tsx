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
import {deleteAuction, saveAuction} from "@/service/auction/auction.service";
import {SaveAuctionModel} from "@/model/auction/auction.model";
import {uploadImages} from "@/service/ftp/image.service";
import {useRouter} from "next/navigation";

interface CustomError extends Error {
    response?: {
        status: number;
        data?: any; // 필요한 경우 데이터 추가
    };
}

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
    const [duration, setDuration] = useState<number>(0);
    const [files, setFiles] = useState<(File | null)[]>([null, null, null]);
    const [size, setSize] = useState<number>(0);
    const [startedAt, setStartedAt] = useState<Date>();
    const [endedAt, setEndedAt] = useState<Date>();
    const [auctionId, setAuctionId] = useState();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const productList = useQuery({
        queryKey: ["allProductsWithImages"],
        queryFn: () => fetchAllProductsWithImages(),
    });

    const auctionMutate = useMutation({mutationFn: saveAuction});
    const imageMutate = useMutation({mutationFn: uploadImages});
    const auctionDelete = useMutation({mutationFn: deleteAuction});

    if (productList.isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
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
            </div>
        );
    }

    if (!productList || !productList.data) {
        return <div>프로덕트 리스트를 불러올 수 없습니다.</div>;
    }

    if (productList.error instanceof Error) return <div>Error: {productList.error.message}</div>;

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

        return (
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="flex items-center justify-center space-x-4">
                    {durations.map((days) => (
                        <button
                            className={`rounded-md border border-gray-300 py-2 px-4 text-sm font-semibold transition-all duration-200 shadow-sm
                hover:shadow-lg hover:text-white hover:bg-slate-800 
                focus:text-white focus:bg-slate-800 focus:border-slate-800
                active:border-slate-800 active:bg-slate-800
                disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none
                ${duration === days ? `border-slate-800 text-white bg-slate-800` : `border-gray-300`}`}
                            key={days}
                            onClick={() => handleClick(days)}
                        >
                            {days}일
                        </button>
                    ))}
                </div>

                {startedAt && endedAt ? (
                    <div className="font-bold mt-2">
                        {`${startedAt.toLocaleDateString()} ${String(startedAt.getHours()).padStart(2, '0')} : ${String(startedAt.getMinutes()).padStart(2, '0')} - ${endedAt.toLocaleString()}`}
                    </div>
                ) : (
                    <span className="text-gray-500 mt-2">기간을 선택해 주세요.</span>
                )}
            </div>
        );
    };


    const isFormValid = !!(selectedProduct && description && duration && files.length > 0 && files && startedAt && endedAt && size != 0
        && files.every((file) => file !== null));

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (isFormValid) {
            // errorMessage 초기화
            setErrorMessage("");

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
                };

                const message = await imageMutate.mutateAsync(image);

                // 성공적인 경우 리다이렉트
                if (message === "success" && message.status === 200) {
                    router.push("/dohee/auction/insert/success");
                } else {
                    if (data.id != null) {
                        await auctionDelete.mutateAsync(data.id);
                        console.log("image message", message);
                    }
                    // 오류 메시지를 URL에 담아 리다이렉트
                    router.push(`/dohee/auction/insert/fail?message=이미지%20업로드에%20실패했습니다.`);
                }

            } catch (error: unknown) {
                if (error instanceof Error) {
                    handleErrorResponse(error);
                } else {
                    router.push(`/dohee/auction/insert/fail?message=네트워크%20오류가%20발생했습니다.%20확인해%20주세요.`);
                }

                console.error("옥션 등록 중 오류 발생", error);
            }

        } else {
            setErrorMessage("모든 필드를 올바르게 입력해주세요.");
            // router.push(`/dohee/auction/insert/fail?message=모든%20필드를%20올바르게%20입력해주세요.`);
        }
    };

    const handleErrorResponse = (error: unknown) => {
        if (error instanceof Error) {
            const customError = error as CustomError; // 타입 단언

            if (customError.response) {
                // HTTP 상태 코드에 따라 메시지 설정
                switch (customError.response.status) {
                    case 400:
                        router.push(`/dohee/auction/insert/fail?message=잘못된%20요청입니다.%20입력을%20확인하세요.`);
                        break;
                    case 404:
                        router.push(`/dohee/auction/insert/fail?message=요청한%20자원이%20존재하지%20않습니다.`);
                        break;
                    case 500:
                        router.push(`/dohee/auction/insert/fail?message=서버%20오류가%20발생했습니다.`);
                        break;
                    default:
                        router.push(`/dohee/auction/insert/fail?message=알 수 없는 오류가 발생했습니다.`);
                        break;
                }
            }
        }
    };

    const renderDescription = () => {
        return (
            <div className="itmes-end">
                <div className="relative w-full min-w-[200px]">
                    <textarea placeholder="경매에 등록할 상품의 설명을 적어주세요. (필수)"
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

    // return (
    //     <form onSubmit={handleSubmit}
    //           className="flex flex-col items-center min-h-screen mx-auto p-8 rounded-lg shadow-xl">
    //         <div className="w-full max-w-3xl space-y-6">
    //             <Label className="block text-xl font-bold text-gray-800">상품:</Label>
    //             <div className="w-full">
    //                 <ProductSection openModal={openModalProduct} selectedProduct={selectedProduct}
    //                                 handleSize={handleSize}/>
    //                 {isOpen && currentModal === "product" && (
    //                     <ProductModal onClose={closeModal} productList={productList.data}
    //                                   onClick={handleSelectProduct}/>
    //                 )}
    //                 <input type="hidden" name="productId" value={selectedProduct?.product.id}/>
    //             </div>
    //
    //             <div className="w-full">
    //                 <Label className="block text-xl font-bold text-gray-800">경매 기간:</Label>
    //                 {/*<span className="ml-2 font-light text-gray-600">{getDuration()}</span>*/}
    //                 {durationSelectButton()}
    //                 <input type="hidden" name="duration"/>
    //             </div>
    //
    //             <div className="w-full">
    //                 <Label className="block text-xl font-bold text-gray-800">업로드 이미지:</Label>
    //                 <div className="flex gap-4 mt-4">
    //                     {files.map((file, index) => (
    //                         <ImageCard key={index} file={file} onClick={() => openModal("image", index)}/>
    //                     ))}
    //                 </div>
    //                 {isOpen && currentModal === "image" && (
    //                     <ImageModal onClose={closeModal} isOpen={isOpen} onSubmit={handleImageSubmit} files={files}/>
    //                 )}
    //             </div>
    //
    //             {renderDescription()}
    //
    //             <div className="flex justify-end items-center mt-4 w-full">
    //                 {errorMessage && (
    //                     <div className="text-red-500 text-sm font-medium mr-4">
    //                         {errorMessage}
    //                     </div>
    //                 )}
    //                 <button
    //                     type="submit"
    //                     className={`py-3 px-8 rounded-lg text-white font-semibold transition duration-300 ease-in-out shadow-md hover:shadow-lg ${isFormValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
    //                     disabled={!isFormValid}>
    //                     경매 등록
    //                 </button>
    //             </div>
    //         </div>
    //     </form>
    // );

    return (
        <div className="max-w-5xl mx-auto pt-14 pb-24 lg:pb-32">
            <h2 className="text-3xl font-semibold mb-6">경매 등록</h2>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="w-full">
                        <Label className="block text-lg font-bold text-gray-800">상품</Label>
                        <p className="mt-2 text-sm text-gray-600">
                            경매하고자 하는 상품을 선택해주세요.
                        </p>
                        <ProductSection openModal={openModalProduct} selectedProduct={selectedProduct}
                                        handleSize={handleSize}/>
                        {isOpen && currentModal === "product" && (
                            <ProductModal onClose={closeModal} productList={productList.data}
                                          onClick={handleSelectProduct}/>
                        )}
                        <input type="hidden" name="productId" value={selectedProduct?.product.id}/>
                    </div>

                    <div className="w-full">
                        <Label className="block text-lg font-bold text-gray-800">경매 기간</Label>
                        <p className="mt-2 text-sm text-gray-600">
                            선택한 경매 기간에 따라 경매가 진행됩니다.
                        </p>
                        <div className="mt-2 p-4 border rounded-lg shadow-sm">
                            <div className="max-w-lg mx-auto flex flex-col items-center justify-center space-y-4 text-center">
                                {durationSelectButton()}
                            </div>
                        </div>
                        <input type="hidden" name="duration"/>
                    </div>
                </div>

                <div className="w-full">
                    <Label className="block text-lg font-bold text-gray-800">업로드 이미지</Label>
                    <p className="mt-2 text-sm text-gray-600">
                        내가 가진 상품의 사진과 상세 설명을 적어주세요.
                    </p>
                    <div className="flex gap-4 mt-4">
                        {files.map((file, index) => (
                            <ImageCard key={index} file={file} onClick={() => openModal("image", index)}/>
                        ))}
                    </div>
                    {isOpen && currentModal === "image" && (
                        <ImageModal onClose={closeModal} isOpen={isOpen} onSubmit={handleImageSubmit} files={files}/>
                    )}
                </div>

                {renderDescription()}

                <div className="flex justify-end items-center mt-4 w-full">
                {errorMessage && (
                        <div className="text-red-500 text-sm font-medium mr-4">
                            {errorMessage}
                        </div>
                    )}
                    <button
                        type="submit"
                        className={`py-3 px-8 rounded-lg text-white font-semibold transition duration-300 ease-in-out shadow-md hover:shadow-lg ${
                            isFormValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
                        }`}
                        disabled={!isFormValid}
                    >
                        경매 등록
                    </button>
                </div>
            </form>
        </div>
    );

}