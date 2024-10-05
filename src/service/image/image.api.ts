import {ImageModel, ImageType, UploadImageParams} from "@/model/ImageModel";
import {PrismaClient} from "@prisma/client";

const baseUrl = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/images`;
const prisma = new PrismaClient();

// 이미지 업로드
export async function uploadImage({filePath, type, referenceId, files}: UploadImageParams) {

    const url = baseUrl + `/upload`;

    try {
        // 경로 복수형 영어로
        // 타입 : 경매, 상품, 평점

        const formData = new FormData();

        files.forEach((file) => {
            formData.append("files", file);
        });

        formData.append("filePath", filePath);
        formData.append("type", type);
        formData.append("referenceId", referenceId.toString());

        const response = await fetch(url, {
            method: "POST",
            headers: {
                // 토큰
            },
            body: formData,
        });

        // 브랜드, 상품, 에러, 평점(오리지널 파일명 0,1,2,3) => 단일
        // 에러 ,평점 => 단 한번 불러오고 리덕스에 넣어놓음.
        // 경매, 환불, => list

        return await response.json();

    } catch (error) {
        console.error("이미지 업로드 중 에러 발생: image.api.ts : uploadImage", error);
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

// 이미지 업데이트

// 이미지 불러오기
export async function fetchImage(id: string, type: ImageType): Promise<ImageModel[]> {

    console.log("fetchImage 호출");
    // 상품을 타입으로 referenceId 조회
    // 타입이 옥션일수도, 프로덕트일수도
    try {
        const image: ImageModel[] = await prisma.image.findMany({
            where: {
                AND: [
                    {type: type},
                    {referencedId: id}
                ]
            },
            take: 3,
            orderBy: {
                id: 'desc',
            }
        });

        // if (image.length === 0) {
        //     console.log("존재하지 않는 이미지");
        //     return [];
        // }

        console.log("이미지 확인", image);

        return image;

    } catch (error) {
        console.error("이미지 로드 중 에러 발생: image.api.ts: fetchImage", error);
        throw new Error("이미지 로드 실패");
    }
}
