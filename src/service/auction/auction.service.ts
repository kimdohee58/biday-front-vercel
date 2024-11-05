//src/service/auction/auction.service.ts

import {auctionAPI} from "@/api/auction/auction.api";
import Cookies from "js-cookie";
import {
    AuctionDTO,
    AuctionDTOWithImageModel,
    AuctionModel,
    AuctionWithImageModel,
    SaveAuctionModel
} from "@/model/auction/auction.model";
import {fetchImage} from "@/service/ftp/image.service";
import {defaultImage, ImageModel, ImageType} from "@/model/ftp/image.model";
import {fetchProductWithImageBySizeId} from "@/service/product/product.service";
import {ProductDTO} from "@/model/product/product.model";
import {ApiErrors, handleApiError, isApiError} from "@/utils/error/error";
import {findUserById} from "@/service/user/user.api";
import {UserModel} from "@/model/user/user.model";


export async function fetchAuction(auctionId: string):Promise<AuctionModel> {
    try {
        const options = {
            params: {
                auctionId: auctionId,
            },
        };

        return await auctionAPI.findById(options);
    } catch (error) {
        if (isApiError(error)) {
            if (error.status === 404) {
                return {} as AuctionModel;
            } else {
                handleApiError(error.status);
                throw new Error();
            }
        }
        console.log(error);
        throw new Error();
    }
}

export async function fetchAuctionWithImages(auctionId: string): Promise<AuctionWithImageModel> {

    try {
        const auction = await fetchAuction(auctionId);

        if (!auction) {
            console.error("auction 값이 undefined");
            throw new Error("");
        }

        const images = await fetchImage(ImageType.AUCTION, auctionId) || [defaultImage, defaultImage, defaultImage];

        return {
            auction,
            images: images as ImageModel[],
        };
    } catch (error) {
        console.error("fetchAuctionWithImages 중 오류 발생");
        throw new Error("fetchAuctionWithImages 중 오류 발생");
    }

}

export async function saveAuction(auction: SaveAuctionModel):Promise<AuctionDTO> {
    const userToken = Cookies.get("userToken");

    if (!userToken) {
        throw new Error("유저토큰 찾을 수 없음");
        //TODO error enum
    }

    console.log("전달된 auction", auction);

    const options = {
        userToken: userToken,
        data: auction,
    };
    try {
        return await auctionAPI.save(options);
    } catch (error) {
        console.error("saveAuction 도중 오류 발생", error);
        throw new Error("saveAuction 도중 오류 발생");
    }
}

export async function deleteAuction(id: number): Promise<void> {
    const userToken = Cookies.get("userToken");

    if (!userToken) {
        throw new Error("유저토큰 찾을 수 없음");
        //TODO error enum
    }

    console.log("전달된 auction id", id);

    const options = {
        userToken: userToken,
        params: {auctionId: id.toString()},
    };

    try {
        return await auctionAPI.delete_(options);
    } catch (error) {
        console.error("deleteAuction 도중 오류 발생", error);
        throw new Error("deleteAuction 도중 오류 발생");
    }
}

export async function fetchAuctionsBySize(sizeId: number): Promise<AuctionDTO[]> {
    try {
        console.log("fetchAuctionBySize");
        const options = {
            params: {sizeId: sizeId},
        };

        console.log("options", options);

        const result = await auctionAPI.findAllBySize(options);
        console.log("result", result);
        return result || [];

    } catch (error) {
        if (isApiError(error) && error.status === 404) {
            console.log("404에러");
            return [] as AuctionDTO[];
        } else {
            return [] as AuctionDTO[];
        }
    }
}


export async function fetchAuctionsBySizes(sizeIds: number[]): Promise<AuctionDTO[]> {
    try {
        return (await Promise.all(sizeIds.map(size => fetchAuctionsBySize(size)))).flat();

    } catch (error) {
        throw new Error("오류")
    }
}

// product 상세페이지에서 사용하는 함수, sizeId[] 을 가지고 auction[]과 유저 이름을 함께 반환
export async function fetchAuctionBySizesWithUser(sizeIds: number[]): Promise<AuctionDTO[]> {
    const auctions = await fetchAuctionsBySizes(sizeIds);
    console.log("auctions in service", auctions)
    const users = await Promise.all(auctions.map(auction => findUserById(auction.userId)));


    return auctions.map((auction) => {
        const user = users.find(user => user!.id === auction.userId) || {};
        return {
            ...auction,
            userId: user.name || "",
        }
    });

}
// findByUserAuction 함수 수정
export async function findByUserAuction(): Promise<AuctionDTO[]> {
    try {
        // 쿠키에서 userToken 가져오기
        const userToken = Cookies.get('userToken')

        if (!userToken) {
            throw new Error("userToken 갖고 올 수 없습니다.")
        }

        const options = {
            userToken : userToken, // 쿠키에서 가져온 userToken을 사용
            params: {}
        };

        // findByUser API 호출
        const auctionArray: AuctionDTO[] = await auctionAPI.findByUser(options);

        if (auctionArray.length === 0) {
            console.log("경매 내역을 찾을 수 없습니다.");
            return [];
        }
        return auctionArray;
    } catch (error) {
        console.error("findByUserAuction 에러 발생", error);
        throw new Error("경매 내역을 가져오는 중 에러가 발생했습니다.");
    }
}

type ProductDTOWithImage = {
    product: ProductDTO,
    image: ImageModel,
    size: string;
}

export async function fetchAuctionDetails(auctionId: string): Promise<{auction: AuctionWithImageModel, product: ProductDTOWithImage, user: UserModel}> {
    try {
        const auction = await fetchAuctionWithImages(auctionId);
        const product = await fetchProductWithImageBySizeId(auction.auction.size);
        console.log("auction", auction);
        // auction.user
        const user = await findUserById(auction.auction.user) || {};

        return {
            auction,
            product,
            user,
        };

    } catch (error) {
        if (isApiError(error)) {
            handleApiError(error.status);
            throw new Error();
        } else {
            throw new Error();
        }
    }
}

// 판매 도중 멈추기
export async function CancelAuction(auctionId: number): Promise<string> {
    try {
        const userToken = Cookies.get('userToken')
        console.log("userToken for cancel Auction", userToken)

        if (!userToken) {
            throw new Error("userToken 갖고 올 수 없습니다.")
        }

        const options = {
            userToken : userToken,
            params: {auctionId: auctionId},
        };
        return await auctionAPI.cancel(options);
    } catch (error) {
        console.error("CancelAuction 에러 발생", error)
        throw new Error("경매를 취소하는 중 에러가 발생했습니다.")
    }
}