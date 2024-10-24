import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { fetchImageOne } from "@/service/ftp/image.service";
import { ImageType } from "@/model/ftp/image.model";

// 이미지 데이터를 가져오는 컴포넌트
const ImageFetcher = ({ id, altText }: { id: string, altText: string }) => {
    const [image, setImage] = useState<string | undefined>(undefined);
    const initialImage = "/default-image.jpg"; // 기본 이미지 경로

    // useQuery를 사용하여 이미지 가져오기
    const { data: images, isLoading, error } = useQuery({
        queryKey: ["image", id],
        queryFn: () => fetchImageOne(ImageType.PRODUCT, id),
        enabled: !!id, // id가 있을 때만 쿼리 실행
    });



    /**
     * 컴포넌트 자체에서 가져와서
     * 최상위 페이지에서 패치해온것을
     * product fetch 를 전부 서비스 .ts
     * fetch all products with imges 이거로 수정 하고
     * 프로덕트 카드 3을 만들어서
     */

    // 이미지 데이터가 있으면 상태에 설정하고, 없으면 기본 이미지로 설정
    useEffect(() => {
        if (!isLoading && !error && images?.uploadUrl) {
            setImage(images.uploadUrl); // 가져온 이미지 URL을 설정
        } else {
            setImage(initialImage); // 이미지가 없거나 에러가 발생한 경우 기본 이미지 설정
        }
    }, [id, isLoading, error, images]);

    const imageSrc = image || "/—Pngtree—loading icon vector_6629917.png"; // 기본 로딩 이미지

    if (isLoading) {
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
        </div>; // 로딩 중일 때 표시
    }

    if (error) {
        return <p>Error loading image</p>; // 에러 발생 시 표시
    }

    return (
        <div className="relative h-24 w-16 sm:w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
            <Image
                fill
                sizes="100px"
                src={imageSrc} // 설정된 이미지 또는 기본 로딩 이미지 사용
                alt={altText}
                className="h-full w-full object-cover object-center"
            />
        </div>
    );
};

export default ImageFetcher;
