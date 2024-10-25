import {useQuery} from "@tanstack/react-query";
import Cookies from "js-cookie";
import {fetchWishes} from "@/service/product/wish.service";

export const useWishlist = () => {
    const userToken = Cookies.get("userToken");
    return useQuery({
            queryKey: ["wishlist", userToken],
            queryFn: () => fetchWishes(),
            enabled: !!userToken,
        }
    );
};