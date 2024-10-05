import {PrismaClient} from "@prisma/client";
import {ImageModel, ImageType} from "@/model/ImageModel";
import {NextResponse} from "next/server";

const prisma = new PrismaClient();

export async function GET(id: string, type: ImageType) {
    try {
        const images = await prisma.image.findMany({
            where: {
                AND: [
                    {type: type},
                    {referencedId: id}
                ]
            },
            take: 3,
            orderBy: {
                id: "desc",
            }
        });


        return NextResponse.json(images);

    } catch (error) {
        console.error("이미지 로드 중 에러 발생", error);
    }
}