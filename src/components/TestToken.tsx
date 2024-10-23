// src/components/TestToken.tsx (클라이언트 컴포넌트)

'use client';  // 이 부분이 클라이언트 컴포넌트임을 명시함
import { useEffect } from 'react';
import { handleReissueToken } from "@/utils/reissue/reissueToken";
import { getTokenRemainingTime } from "@/utils/cookie/cookie.api";
import Cookies from 'js-cookie';

const TokenManager = () => {
    useEffect(() => {
        const checkTokenExpiry = () => {
            const accessToken = Cookies.get('token') || null;
            const remainingTime = getTokenRemainingTime(accessToken!);

            if (remainingTime !== null && remainingTime <= 60) {
                handleReissueToken();  // 리프레시 토큰을 사용해 액세스 토큰 재발급
            }
        };

        // 5초마다 토큰 만료 시간 체크
        const intervalId = setInterval(checkTokenExpiry, 5000);

        return () => clearInterval(intervalId);  // 컴포넌트가 언마운트될 때 인터벌 해제
    }, []);

    return null;  // 렌더링할 UI가 없으므로 null 반환
};

export default TokenManager;
