// src/app/callback/page.tsx
"use client";

import {useRouter, useSearchParams} from "next/navigation";
import {useEffect} from "react";

const CallbackPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (searchParams.get('code')) {
            router.push('/account-seller');
        }
    }, [searchParams, router]);

    return <div>로그인 처리 중...</div>;
};

export default CallbackPage;
