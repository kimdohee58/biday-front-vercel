"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Next.js 13의 app router 사용
import { saveToken } from "@/utils/cookie/cookie.api";

export const handleNaverCallback = () => {
    const router = useRouter(); // useRouter를 클라이언트에서만 실행하도록 설정

    useEffect(() => {
        // 클라이언트에서만 실행되도록 보장
        if (typeof window === 'undefined') return;

        const code = new URL(window.location.href).searchParams.get('code');

        const login = async () => {
            if (code !== null) {
                try {
                    const body = { code };

                    // 백엔드로 인증 코드 전송
                    const result = await fetch('/api/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(body),
                        credentials: 'include', // 리프레시 토큰은 쿠키에 포함
                    });

                    if (result.ok) {
                        const accessToken = result.headers.get('Authorization')?.split(' ')[1];
                        if (accessToken) {
                            saveToken(accessToken);
                            console.log("Access Token 저장:", accessToken);
                        }
                        // 홈 페이지로 이동
                        router.push('/');
                    } else {
                        alert('로그인 실패');
                    }
                } catch (error) {
                    console.error('로그인 에러:', error);
                    alert('로그인 과정에서 문제가 발생했습니다. 다시 시도해주세요.');
                    router.push('/login');
                }
            }
        };

        login();
    }, [router]); // useEffect 내에서 라우터 사용

    return null;
};
