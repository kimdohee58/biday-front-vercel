//src/app/login/page.tsx
"use client";

import React, { useState, useEffect, FormEvent } from 'react';
import facebookSvg from "@/images/Facebook.svg";
import twitterSvg from "@/images/Twitter.svg";
import googleSvg from "@/images/Google.svg";
import Input from "@/shared/Input/Input";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Image from "next/image";
import Link from "next/link";
import { useLogin } from "@/hooks/useLogin";
import btnG_official from "@/images/btnG_official.png";
import axiosInstance from "@/app/api/axiosInstance/axiosInstance";
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";
import {AuthorizationToken, saveToken, saveUserTokenToCookie} from "@/utils/cookie/cookie.api";
import { extractUserInfoFromToken } from "@/utils/jwt.utils";
import { findUserById } from "@/service/user/user.api";
import {saveUser, saveUserToken} from "@/lib/features/user.slice";
import { useDispatch } from 'react-redux';
import {UserToken} from "@/model/user/userToken";

const PageLogin = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const { login } = useLogin();
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        const redirectHandler = async () => {
            await handleRedirect();
        };
        redirectHandler();
    }, []);

    const handleRedirect = async () => {
        const authToken = Cookies.get("Authorization");
        console.log('handleRedirect token!!!!!!', authToken);

        if (authToken) {
            try {
                saveToken(authToken);
                console.log("token 처리 완료");
                const { id } = extractUserInfoFromToken(authToken);
                const user = await findUserById(id);

                if (user) {
                    const userData = {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        phoneNum: user.phoneNum,
                        status: user.status ? String(user.status) : "",
                        newPassword: user.newPassword || "",
                    };

                    dispatch(saveUser({ user: userData, token: authToken }));

                    localStorage.setItem("userToken", JSON.stringify(userData));

                    if(user) {
                        const userInfo: UserToken = {
                            userId: user.id !!,
                            userName: user.name !!,
                            userRole: user.role !!,
                        };
                        dispatch(saveUserToken({userInfo}))

                        localStorage.setItem("userToken", JSON.stringify(userInfo));

                        saveUserTokenToCookie(userInfo);
                    }
                    router.push('/');
                }
            } catch (error) {
                console.error("토큰 로그인 실패: ", error);
            }
            console.log("handleRedirect 처리후");
            AuthorizationToken();
        } else {
            console.log("Authorization 토큰을 찾을 수 없습니다.");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await login(email, password);
        } catch (err) {
            setError("Login failed. Please check your email or password.");
            console.log("실패다.", err);
        }
    };

    const handleSocialLogin = async (href: string) => {
        window.location.href = href;
    };

    const loginSocials = [
        {
            name: "NaverLogin",
            href: `${axiosInstance.defaults.baseURL}/oauth2/authorization/naver`,
            icon: btnG_official,
        },
        {
            name: "Continue with Facebook",
            href: "#",
            icon: facebookSvg,
        },
        {
            name: "Continue with Twitter",
            href: "#",
            icon: twitterSvg,
        },
        {
            name: "Continue with Google",
            href: "#",
            icon: googleSvg,
        },
    ];

    return (
        <div className={`nc-PageLogin`} data-nc-id="PageLogin">
            <div className="container mb-24 lg:mb-32">
                <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
                    Login
                </h2>

                <div className="max-w-md mx-auto space-y-6">
                    <div className="grid gap-3">
                        {loginSocials.map((item, index) => (
                            <a
                                key={index}
                                onClick={() => handleSocialLogin(item.href)}
                                className="flex w-full rounded-lg bg-primary-50 dark:bg-neutral-700 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
                            >
                                <Image
                                    className="flex-shrink-0"
                                    src={item.icon}
                                    alt={item.name}
                                    width={24}
                                    height={24}
                                    sizes="40px"
                                />
                                <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                                    {item.name}
                                </h3>
                            </a>
                        ))}
                    </div>

                    <div className="relative text-center">
                        <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
                            OR
                        </span>
                        <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
                    </div>

                    <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
                        <label className="block">
                            <span className="text-neutral-800 dark:text-neutral-200">Email address</span>
                            <Input
                                type="email"
                                name="email"
                                value={email}
                                onChange={handleChange}
                                placeholder="example@example.com"
                                className="mt-1"
                            />
                        </label>

                        <label className="block">
                            <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                                Password
                                <Link href="/forgot-pass" className="text-sm text-green-600">
                                    Forgot password?
                                </Link>
                            </span>
                            <Input
                                type="password"
                                name="password"
                                value={password}
                                onChange={handleChange}
                                className="mt-1"
                            />
                        </label>

                        <ButtonPrimary type="submit">Continue</ButtonPrimary>
                    </form>

                    {error && <p className="text-red-500">{error}</p>}

                    <span className="block text-center text-neutral-700 dark:text-neutral-300">
                        New user? {` `}
                        <Link className="text-green-600" href="/signup">
                            Create an account
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default PageLogin;