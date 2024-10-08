// src/app/callback/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const CallbackPage = () => {
    const router = useRouter();

    useEffect(() => {
        // URL에서 쿼리 파라미터로 전달된 토큰을 추출
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get("accessToken");
        const refreshToken = urlParams.get("refreshToken");


        // 응답 헤더에서 액세스 토큰과 리프레시 토큰 추출
        //const accessToken = response.headers["authorization"];
        //const refreshToken = response.headers["x-refresh-token"];

        // 토큰이 있다면 쿠키에 저장
        if (accessToken && refreshToken) {
            Cookies.set("accessToken", accessToken, {
                expires: 7, // 7일 후 만료
                secure: true,
                sameSite: "strict",
            });
            Cookies.set("refreshToken", refreshToken, {
                expires: 7, // 7일 후 만료
                secure: true,
                sameSite: "strict",
            });

            // 토큰 저장 후 메인 페이지로 리다이렉트
            router.push("/");
        } else {
            console.error("토큰이 전달되지 않았습니다.");
            console.log("adfkja;sldfjdak;fjadlskfjalskdjf;lakjd")
            // 오류가 발생하면 로그인 페이지로 리다이렉트
            router.push("/login");
        }
    }, [router]);

    return <div>로그인 처리 중...</div>;
};

export default CallbackPage;
