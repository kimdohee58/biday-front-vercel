"use client";

import {useRouter, useSearchParams} from "next/navigation";
import React, {useEffect} from "react";
import {useMutation} from "@tanstack/react-query";
import {saveAccount} from "@/service/user/account.service";
import {AccountModel} from "@/model/user/account.model";
import {Spinner} from "@/shared/Spinner/Spinner";
import {useDispatch} from "react-redux";
import {updateRole} from "@/lib/features/user.slice";
import {UserRole} from "@/model/user/user.model";

export default function AccountSuccessPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const searchParams = useSearchParams();

    const mutation = useMutation({
        mutationFn: saveAccount,
        onSuccess: () => {
            sessionStorage.clear();
            dispatch(updateRole(UserRole.SELLER));
            router.push('/account-seller');
        },
        onError: () => {
            router.push('/account-seller/fail');
        }
    });

    const code = searchParams.get("code");

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
        if (code) {
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
    }, [code, router, mutation]);

    return <Spinner />;
};
