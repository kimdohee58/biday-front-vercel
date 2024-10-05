import {store} from "next/dist/build/output/store";
import {useSelector} from "react-redux";
import {getToken} from "@/lib/features/user.slice";

const fetchWithToken = async (url: string, options: RequestInit = {}) => {
    const token = useSelector(getToken);

    const headers = {
        ...options.headers,
        ...(token ? {'Authorization': `Bearer ${token}`} : {}),
    };

    const response = await fetch(url, {
        ...options,
        headers,
    });

    if (response.status === 401) {
        // const newToken =

        return fetchWithToken(url, options);
    }

    return response;
};

export default fetchWithToken;