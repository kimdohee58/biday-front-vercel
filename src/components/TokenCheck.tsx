// src/components/TokenCheck.tsx
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie"; // 쿠키 사용을 위해 추가
import axiosInstance from "@/app/api/axiosInstance/axiosInstance"; // Axios 인스턴스 추가

const TokenCheck = () => {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        // 브라우저에서만 실행되도록 하는 코드.
        if (typeof window !== "undefined") {
            setIsClient(true);

            const checkToken = async () => {
                const access = Cookies.get("token");

                // 토큰이 없으면 로그인 페이지로 이동
                if (!access) {
                    router.push("/");
                    return;
                }

                try {
                    // 서버에 액세스 토큰 유효성 확인을 위해 간단한 API 호출
                    await axiosInstance.get("/check-token", {
                        headers: {
                            Authorization: `Bearer ${access}`  // 리프레시 토큰을 헤더에 추가하여 요청
                        }
                    });
                } catch (error) {
                    console.error("토큰 만료로 재발급 시도 중:", error);
                    // Axios 인터셉터가 자동으로 401을 처리하고 토큰을 재발급하므로, 별도 처리 없이 여기서는 대기
                }
            };
            checkToken();
        }
    }, [router]);

    return null; // 이 컴포넌트는 렌더링을 하지 않음, 단순히 토큰 유효성 검사를 수행
};

export default TokenCheck;

// 여기 코드는 페이지 전환 시 토큰을 자동으로 체크하고 재발급 받을 수 있다.