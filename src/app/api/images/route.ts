import {PrismaClient} from "@prisma/client";
import {ImageType} from "@/model/ftp/image.model";
import {NextResponse} from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
    try {

        const {searchParams} = new URL(request.url);
        const id = Number(searchParams.get("id"));
        const type = searchParams.get("type") as ImageType;

        if (!type) {
            return NextResponse.json({error: "잘못된 요청 : type 누락 "}, {status: 400});
        }

        console.log("type", type);
        console.log("searchParams", searchParams);

        if (type === ImageType.PRODUCT && !id) {
            const productImages = await prisma.image.findMany({
                    where: {
                        type: type
                    },
                    orderBy: {
                        id: "desc",

                    },
                }
            );

            return NextResponse.json(productImages.map((productImage) => ({
                ...productImage,
                referencedId: productImage.referencedId.toString(),
            })));
        }

        if (type === ImageType.PRODUCT && id) {
            // console.log("상품, id 하나 불러오기")

            const findProps = {
                where: {
                    type: type,
                    referencedId: id,
                }
            };

            const productImage = await prisma.image.findFirst(findProps
            );

            if (!productImage) {
                throw new Error("");
            }

            return NextResponse.json({
                ...productImage,
                referencedId: productImage.referencedId.toString(),
            });
        }

        if (type === ImageType.AUCTION && id) {

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

            return NextResponse.json(images.map((image) => ({
                ...image,
                referencedId: image.referencedId.toString(),
            })));
        }


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

        return NextResponse.json({error: "이미지 로드 중 오류 발생"}, {status: 500})

    }
}