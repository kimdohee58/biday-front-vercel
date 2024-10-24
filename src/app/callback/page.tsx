"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { saveAccount } from "@/service/user/account.service";
import { AccountModel } from "@/model/user/account.model";
import { Spinner } from "@/shared/Spinner/Spinner";

export default function AccountSuccessPage() {
    const mutation = useMutation({
        mutationFn: saveAccount,
        onSuccess: () => {
            sessionStorage.clear();
            router.push('/account-seller');
        },
        onError: () => {
            router.push('/account-seller/fail');
        }
    });

    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "F5") {
                e.preventDefault();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        if (searchParams.get('code')) {
            const sessionData = sessionStorage.getItem("account");

            if (!sessionData) {
                router.push('/account-seller/fail');
            } else {
                const account = JSON.parse(sessionData) as AccountModel;
                mutation.mutate(account);
            }
        } else {
            router.push('/account-seller/fail');
        }
    }, []);

    return <Spinner />;
};
