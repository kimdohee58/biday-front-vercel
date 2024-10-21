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

    return null;
};

export default CallbackPage;
