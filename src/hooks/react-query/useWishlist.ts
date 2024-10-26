import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import Cookies from "js-cookie";
import {fetchDeleteWish, fetchWishes, fetchWishesWithImages} from "@/service/product/wish.service";

const userToken = Cookies.get("userToken");

export const useWishlist = () => {
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

export const useWishDelete = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: fetchDeleteWish,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['wishList', userToken]});
        },
    });
};