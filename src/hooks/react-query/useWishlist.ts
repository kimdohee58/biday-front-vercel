import {useQuery} from "@tanstack/react-query";
import Cookies from "js-cookie";
import {fetchWishes, fetchWishesWithImages} from "@/service/product/wish.service";

export const useWishlist = () => {
    const userToken = Cookies.get("userToken");
    return useQuery({
        queryKey: ["wishlist", userToken],
        queryFn: () => fetchWishes(),
        enabled: !!userToken,
    });
};

export const useWishlistWithImages = () => {
    const userToken = Cookies.get("userToken");
    return useQuery({
        queryKey: ["wishlistWithImages", userToken],
        queryFn: () => fetchWishesWithImages(),
        enabled: !!userToken,
    });
};