// src/hooks/useLogout.ts
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
            // 로컬 스토리지 및 쿠키에서 토큰 제거
            clearToken();

            removeCookie();

            // 리덕스 스토어에서 유저 정보 초기화
            dispatch(clearUser());

            await persistor.purge();

            await logoutUser(); // user.api

            // 로그아웃 후 홈 페이지로 이동
            router.push('/');
        } catch (error) {
            console.error("Logout error:", error);
        }
    };
    return { handleLogout };
};
