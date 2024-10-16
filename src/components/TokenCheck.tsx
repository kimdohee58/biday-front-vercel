// src/components/TokenCheck.tsx
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie"; // 쿠키 사용을 위해 추가
import axiosInstance from "@/app/api/axiosInstance/axiosInstance"; // Axios 인스턴스 추가

// TokenCheck 컴포넌트가 매 페이지 전환 시 유즈이팩으로 통해 토큰 유효성을 확인을 하고,
// token이 없거나, 유효하지 않으면 로그인 페이지로 리다이렉트 시킨다.
// 만약 토큰이 유효하지 않다면, 엑시오스 인스턴스에서 401 에러가 발생을 하고 이를 처리하기 위한 인터셉터가 작동하게 된다.

// 엑시오스 인스턴스의 응답 인터셉터에서 401에러 토큰이 만료가 발생을 하면 핸들리이슈 토큰을 호출하여 리프레시 토큰을 사용해서
// 새로운 엑세스 토큰을 재발급 하고, handleReissuteToken 함수에서 refreshToken을 서버로 보내고, 새로 받은 accessToken 쿠키에 저장한다.
// 그리고 인터셉터가 재발급이 된 함수에서 새롤운 엑세스 토큰을 사용하여 이전 실패한 요청을 다시 시도한다.

// handleReissueToken 함수
// 리프레시 토큰을 사용해 서버로부터 새로운 엑세스 토큰을 받아오고,
// 패치 요청을 통해, /리이슈 엔드포인트로 리프레시 토큰을 보내며, 서버에서 유효한 리프레시 토큰을 확인한 뒤,
// 새로운 엑세스 토큰을 반환하면, 이를 쿠키에 저장한다.
const TokenCheck = () => {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);


    // 유정 이거 언디파인드로 하지 말라고 함.
    // 윈도우를 유즈이팩트안에서 사용하지 말고, 따로 빼내서 하라고 함.
    useEffect(() => {
        // 브라우저에서만 실행되도록 하는 코드.
        if (typeof window !== "undefined") {
            setIsClient(true);

            const checkToken = async () => {
                const refreshToken = Cookies.get("refresh");

                // 토큰이 없으면 로그인 페이지로 이동
                if (!refreshToken) {
                  //  router.push("/login");
                    return;
                }

                try {
                    // 서버에 액세스 토큰 유효성 확인을 위해 간단한 API 호출
                    await axiosInstance.get("/check-token");
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