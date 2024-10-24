//src/app/auth/callback.tsx

import React, { useEffect } from "react";
import { useRouter } from "next/router";
import axiosInstance from "@/app/api/axiosInstance/axiosInstance";
import Cookies from "js-cookie";

const OAuthCallback = () => {
    const router = useRouter();

    useEffect(() => {
        const handleOAuthCallback = async () => {
            const { code, state } = router.query; // 쿼리에서 code와 state 추출

            if (code) {
                try {
                    // 백엔드로 인증 코드를 보내어 액세스 토큰을 받아옴
                    const response = await axiosInstance.post("/oauth2/token/naver", { code, state });

                    // 응답 헤더에서 액세스 토큰과 리프레시 토큰 추출
                    const accessToken = response.headers["authorization"];
                    const refreshToken = response.headers["x-refresh-token"];


                    // 액세스 토큰을 쿠키에 저장
                    if (accessToken) {
                        Cookies.set("accessToken", accessToken.replace("Bearer ", ""), {
                            expires: 7, // 7일 동안 유지
                            secure: true,
                            sameSite: "strict",
                        });

                        // 리프레시 토큰도 저장 (필요 시)
                        if (refreshToken) {
                            Cookies.set("refreshToken", refreshToken, {
                                expires: 7, // 7일 동안 유지
                                secure: true,
                                sameSite: "strict",
                            });
                        }

                        // 메인 페이지로 리다이렉트
                        router.push("/");
                    }
                } catch (error) {
                    console.error("토큰 발급 중 오류 발생:", error);
                    // 오류 발생 시 로그인 페이지로 리다이렉트
                    router.push("/login");
                }
            }
        };

        if (router.isReady) {
            handleOAuthCallback();
        }
    }, [router.isReady, router.query]);

    return <div className="flex h-screen items-center justify-center">
        <div className="text-center">
            <svg
                className="animate-spin h-12 w-12 text-indigo-600 mx-auto mb-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                />
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                />
            </svg>
            <h2 className="text-2xl font-semibold text-indigo-600">Loading...</h2>
        </div>
    </div>;
};

export default OAuthCallback;
