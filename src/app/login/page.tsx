"use client";

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie'; // js-cookie import
import { handleLogin } from '@/app/service/users/login.api'; // 로그인 API
import facebookSvg from "@/images/Facebook.svg";
import twitterSvg from "@/images/Twitter.svg";
import naverSvg from "@/images/naver.svg";
import googleSvg from "@/images/Google.svg";
import Input from "@/shared/Input/Input";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Image from "next/image";
import Link from "next/link";

// 소셜 로그인 버튼 데이터

const loginSocials = [
  {
    name: "Continue with Naver",
    href: "#",
    icon: naverSvg,
  },
  {
    name: "Continue with Facebook src/app/login/page.tsx",
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

const PageLogin = () => {
  // 상태 관리
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // 입력 값 변경 처리 함수
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  // 폼 제출 처리 함수
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // 로그인 API 호출
    handleLogin(email, password)
        .then(token => {
          // 로그인 성공 시 쿠키에 토큰 저장
          Cookies.set('token', token, { expires: 7 });

          // 홈 페이지로 리다이렉트
          router.push('/');
        })
        .catch(err => {
          setError('Failed to login');
        });
  };

  return (
      <div className={`nc-PageLogin`} data-nc-id="PageLogin">
        <div className="container mb-24 lg:mb-32">
          <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
            Login
          </h2>

          <div className="max-w-md mx-auto space-y-6">
            {/* 소셜 로그인 버튼 */}
            <div className="grid gap-3">
              {loginSocials.map((item, index) => (
                  <a
                      key={index}
                      href={item.href}
                      className="flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
                  >
                    <Image
                        className="flex-shrink-0"
                        src={item.icon}
                        alt={item.name}
                        sizes="40px"
                    />
                    <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                      {item.name}
                    </h3>
                  </a>
              ))}
            </div>

            {/* OR */}
            <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
              <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
            </div>

            {/* 로그인 폼 */}
            <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
              <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email address
              </span>
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

            {/* 에러 메시지 */}
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
