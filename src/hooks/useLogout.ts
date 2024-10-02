// src/hooks/useLogout.ts
import { useRouter } from 'next/router';
import { clearToken } from '@/utils/cookie/cookie.api';
import { useDispatch } from 'react-redux';
import { clearUser } from '@/lib/features/user.slice';

export const useLogout = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            // 로컬 스토리지 및 쿠키에서 토큰 제거
            clearToken();

            // 리덕스 스토어에서 유저 정보 초기화
            dispatch(clearUser());

            // 서버에 로그아웃 요청
            const response = await fetch("http://localhost:8080/logout", {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Error logging out: ${response.statusText}`);
            }

            // 로그아웃 후 홈 페이지로 이동
            router.push('/');
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return { handleLogout };
};
