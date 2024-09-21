"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CertifyPage() {
    const router = useRouter();

    useEffect(() => {
        if (window.opener) {
            // @ts-ignore
            const { reqNo } = new URL(window.location.href).searchParams;
            window.opener.location.href = `${window.location.origin}?request_no=${reqNo}`;
            window.close();
        } else {
            router.back();
        }
    }, [router]);

    return <></>;
}
