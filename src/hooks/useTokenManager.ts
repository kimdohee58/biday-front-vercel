// 2024년 10월 12일
// 10시 40분, 쓰이는 곳이 없어서 주석처리를 하고, 확실해지면 삭제를 하겠습니다.
// 유정이랑 같이 확인함. 이 파일에서 함수가 지들끼리 사용을 하고,
// 맨 위에 있는 useTOkenManager 라는 함수는 사용이 안되어 있음.

/*
// src/hooks/useTokenManager.ts

import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const baseUrl = `${process.env.NEXT_PUBLIC_API_SERVER_URL}`


export const useTokenManager = () => {
    const router = useRouter();

    // accessToken으로 API 요청
    const fetchUsers = async () => {
        try {
            const accessToken = Cookies.get('accessToken');
            if (!accessToken) {
                throw new Error('Access token is missing');
            }

            const response = await fetch(`${baseUrl}/users/UsersList`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                credentials: 'include', // 쿠키 자동 전송
            });

            if (response.status === 401) {
                // accessToken 만료 시 refreshToken을 사용해 새로 발급받음
                fetchUsers(); // 토큰 재발급 후 다시 요청
            } else if (!response.ok) {
                throw new Error('Failed to fetch users');
            }

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    // refreshToken으로 accessToken 재발급
    const handleReissueToken = async () => {
        try {
            const response = await fetch("http://localhost:8000/reissue", {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                Cookies.set('accessToken', data.accessToken, { expires: 1, sameSite: 'strict' });
                console.log('Token reissued successfully!');
            } else {
                console.error('Failed to reissue token');
            }
        } catch (error) {
            console.error('Error reissuing token:', error);
        }
    };

    // 로그아웃 처리
    const handleLogout = async () => {
        try {
            const response = await fetch("http://localhost:8000/logout", {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                Cookies.remove('accessToken');
                console.log('Logged out successfully');
                router.push('/login');
            } else {
                console.error('Failed to log out');
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };


};
*/
