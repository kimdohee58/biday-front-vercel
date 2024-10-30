import { useRouter } from 'next/navigation';
import {clearToken, removeCookie} from '@/utils/cookie/cookie.api';
import { useDispatch } from 'react-redux';
import { clearUser } from '@/lib/features/user.slice';
import {logoutUser} from "@/service/user/user.api";
import { persistor } from '@/lib/store';

export const useLogout = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const handleLogout = async () => {
        try {

            clearToken();

            removeCookie();

            dispatch(clearUser());

            await persistor.purge();

            await logoutUser();

            alert("로그아웃 하셨습니다")

            router.push('/');


        } catch (error) {
            console.error("Logout error:", error);
        }
    };
    return { handleLogout};
};
