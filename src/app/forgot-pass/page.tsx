'use client';

import React, {useState} from 'react';
import Input from '@/shared/Input/Input';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import {randomPassword} from "@/service/user/user.serivce";
import {setLoading} from "@/lib/features/products.slice";
import Link from "next/link";

export default function PageForgotPass() {
    const [phoneNum, setPhoneNum] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const phoneValue = e.target.value.replace(/\D/g, '');

        let formattedValue = '';
        if (phoneValue.length <= 3) {
            formattedValue = phoneValue;
        } else if (phoneValue.length <= 7) {
            formattedValue = `${phoneValue.slice(0, 3)}-${phoneValue.slice(3)}`;
        } else {
            formattedValue = `${phoneValue.slice(0, 3)}-${phoneValue.slice(3, 7)}-${phoneValue.slice(7, 11)}`;
        }

        setPhoneNum(formattedValue);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null); // 오류 상태 초기화
        setLoading(true); // 로딩 상태 시작

        // 이메일과 전화번호가 모두 입력되었는지 확인
        if (!email || !phoneNum) {
            setError("이메일과 전화번호를 모두 입력해 주세요.");
            setLoading(false);
            return;
        }

        try {
            // 이메일과 전화번호를 사용하여 비밀번호 초기화 함수 호출
            const response = await randomPassword(email, phoneNum);
            console.log("비밀번호 초기화 응답: ", response);
            alert("비밀번호가 초기화되었습니다. 이메일을 확인해 주세요.");
        } catch (error) {
            console.error("비밀번호 초기화 실패: ", error);
            setError("비밀번호 초기화에 실패했습니다. 다시 시도해 주세요.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mb-24 lg:mb-32">
            <header className="text-center max-w-2xl mx-auto - mb-14 sm:mb-16 lg:mb-20">
                <h2 className="mt-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
                    Forgot Password
                </h2>
                <span className="block text-sm mt-4 text-neutral-700 sm:text-base dark:text-neutral-200">
                    Welcome to BiDay
                </span>
            </header>

            <div className="max-w-md mx-auto space-y-6">
                {/* FORM */}
                <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
                    {/* 이메일 입력 필드 */}
                    <label className="block">
                        <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                            이메일 입력
                                <Link href="/forgot-email" className="text-sm text-green-600">
                                    forgot email?
                                </Link>
                        </span>
                        <Input
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="example@domain.com"
                            className="mt-1"
                        />
                    </label>

                    {/* 핸드폰 번호 입력 필드 */}
                    <label className="block">
                        <span className="text-neutral-800 dark:text-neutral-200">
                            전화번호 입력
                        </span>
                        <Input
                            type="text"
                            name="phoneNum"
                            value={phoneNum}
                            onChange={handlePhoneChange}
                            placeholder="010-1234-5678"
                            className="mt-1"
                        />
                    </label>
                    <ButtonPrimary type="submit">Continue</ButtonPrimary>
                </form>

                {/* 오류 메시지 출력 */}
                {error && <p className="text-red-500 text-center">{error}</p>}

                {/* ==== */}
                <span className="block text-center text-neutral-700 dark:text-neutral-300">
                    Go back for {` `}
                    <Link href="/login" className="text-green-600">
                        Sign in
                    </Link>
                    {` / `}
                    <Link href="/signup" className="text-green-600">
                        Sign up
                    </Link>
                </span>
            </div>
        </div>
    );
}