import {ImageModel, ImageType, UploadImageParams} from "@/model/ftp/image.model";
import {PrismaClient} from "@prisma/client";
import Cookies from "js-cookie";
import {imageAPI} from "@/api/ftp/image.api";

const baseUrl = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/images`;
const prisma = new PrismaClient();

// 이미지 업로드
export async function uploadImages({filePath, type, referencedId, files}: UploadImageParams) {

    try {
        const userToken = Cookies.get("userToken");
        if (!userToken) {
            throw new Error("유저토큰 없음");
            //TODO error enum
        }

        const formData = new FormData();
        formData.append("filePath", filePath);
        formData.append("type", type);
        formData.append("referencedId", String(referencedId));
        files.forEach((file) => {
            formData.append(`files`, file);
        });

        const options = {
            userToken: userToken,
            data: formData,
            contentType: "multipart/form-data",
        }


        return await imageAPI.uploadImages(options);

        // 경로 복수형 영어로
        // 타입 : 경매, 상품, 평점


        // 브랜드, 상품, 에러, 평점(오리지널 파일명 0,1,2,3) => 단일
        // 에러 ,평점 => 단 한번 불러오고 리덕스에 넣어놓음.
        // 경매, 환불, => list



    } catch (error) {
        console.error("이미지 업로드 중 에러 발생: image.service.ts : uploadImages", error);
        throw new Error("이미지 업로드 실패");
    }
}

// 이미지 삭제
export async function deleteImage(id: number) {
    const url = baseUrl + `/${id}`;

    try {

    } catch (error) {

    }
}

// 클라이언트 컴포넌트에서 이미지 불러오기
export async function fetchImage(type: ImageType, id?: string): Promise<ImageModel[] | ImageModel> {
    const url = `${process.env.NEXT_PUBLIC_API_CLIENT_URL}/api/images?id=${id}&type=${type}`;

    /**TODO
     * id 없는 경우 전체 이미지 부르는걸로 변경
     */

    try {
        const response = await fetch(url, {
            method: "GET",
        });

        if (!response.ok) {
            return [];
        }

        const data: ImageModel[] = await response.json();

        console.log("fetchImageFromClient 이미지 확인: ", data);


        return data;

    } catch (error) {
        console.error("이미지 로드 중 오류 발생", error);
        throw new Error("이미지 로드 실패");
    }

}

export async function fetchImageOne(type: ImageType, id: string) {

    const url = `${process.env.NEXT_PUBLIC_API_CLIENT_URL}/api/images?id=${id}&type=${type}`;
    // 클라이언트 컴포넌트
    try {
        const response = await fetch(url, {
            method: "GET",
            cache: "no-store",
        });

        return await response.json();

    } catch (error) {
        console.error("이미지 로드 중 오류 발생", error);
        throw new Error("이미지 로드 실패");
    }
}

export async function fetchAllProductImage(): Promise<ImageModel[]> {

    const url = `${process.env.NEXT_PUBLIC_API_CLIENT_URL}/api/images?type=${ImageType.PRODUCT}`;

    try {
        const response = await fetch(url, {
            method: "GET"
        })

        return await response.json();
    } catch (error) {
        console.error("이미지 로드 중 오류 발생", error);
        throw new Error("상품 이미지 전체 로드 실패");
    }
}