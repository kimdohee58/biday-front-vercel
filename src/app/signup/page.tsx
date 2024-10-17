"use client";
// src/app/signup/page.tsx

import React, { useState } from "react";
import facebookSvg from "@/images/Facebook.svg";
import twitterSvg from "@/images/Twitter.svg";
import googleSvg from "@/images/Google.svg";
import Input from "@/shared/Input/Input";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Image from "next/image";
import Link from "next/link";
import { signUpSchema } from "@/schema/userValidationSchema";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { UserModel } from "@/model/user/user.model";
import { useRouter } from "next/navigation";
import btnG_official from "@/images/btnG_official.png";
import useSignInUser from "@/hooks/useSignInUser";
import {checkEmailDuplication, checkPhoneDuplication} from "@/service/user/user.api";

const loginSocials = [
  {
    name: "onNaverLogin",
    href: `${process.env.NEXT_PUBLIC_API_SERVER_URL}/oauth2/authorization/naver`,
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

export default function PageSignUp() {
  const { status, handleSignUp, errorMessage, fieldErrors, fieldSuccess, setFieldError, setFieldSuccessMessage } = useSignInUser(); // 커스텀 훅 사용
  const router = useRouter(); // useRouter 훅 선언

  const [formData, setFormData] = useState<Partial<UserModel & { confirmPassword: string }>>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNum: '',
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // 실시간 유효성 검사
    const validation = signUpSchema.safeParse({ ...formData, [name]: value });

    if (!validation.success) {
      const errorMessages = validation.error.issues.map((issue) => issue.message).join(", ");
      setFieldError(name, errorMessages);
    } else {
      setFieldError(name, "");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Zod 스키마를 이용한 유효성 검사
    const validation = signUpSchema.safeParse(formData);
    if (!validation.success) {
      const errorMessages = validation.error.issues.map((issue) => issue.message).join(", ");
      alert(errorMessages);
      return;
    }

    // 유효성 검사를 통과하고 데이터를 커스텀 훅의 handleSignUp 함수에 전달
    const isSignUpSuccessful = await handleSignUp(validation.data as UserModel);
    if (isSignUpSuccessful) {
      alert("회원가입 성공");
      // 회원가입 성공 후 인덱스 페이지 이동.
      router.push('/');
    } else {
      alert(`회원가입 실패: ${errorMessage}`);
    }
  };

  return (
      <div className={`nc-PageSignUp`} data-nc-id="PageSignUp">
        <div className="container mb-24 lg:mb-32">
          <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
            Signup
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

            {/* OR */}
            <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
              <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
            </div>

            {/* 회원가입 폼 */}
            <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
              {/* 이름 입력 필드 */}
              <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">이름</span>
                <Input
                    type="text"
                    placeholder="이름 입력"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1"
                />
                <span className="text-sm text-gray-500">이름은 6글자 이하로 입력해주세요.</span>
              </label>

              {/* 이메일 입력 필드 */}
              <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">Email address</span>
                <div className="flex">
                  <Input
                      type="email"
                      placeholder="example@example.com"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 flex-grow"
                  />
                  <button
                      type="button"
                      onClick={async () => {
                        if (!formData.email) {
                          setFieldError("email", "이메일을 입력해주세요.");
                          return;
                        }
                        const isAvailable = await checkEmailDuplication(formData.email!);
                        if (isAvailable) {  // true -> 이미 사용 중
                          setFieldError("email", "이메일이 이미 사용중입니다.");
                        } else {  // false -> 사용 가능
                          setFieldError("email", "");
                          setFieldSuccessMessage("email", "사용이 가능한 이메일입니다.");
                        }
                      }}
                      className="ml-2 px-4 py-2 bg-green-600 text-white rounded-md whitespace-nowrap"
                  >
                    중복확인
                  </button>
                </div>
                {fieldErrors.email && <span className="text-sm text-red-400">{fieldErrors.email}</span>}
                {!fieldErrors.email && fieldSuccess.email && (
                    <span className="text-sm text-green-400">{fieldSuccess.email}</span>
                )}
              </label>

              {/* 비밀번호 입력 필드 */}
              <label className="block">
              <span
                  className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">Password</span>
                <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="mt-1"
                    placeholder="비밀번호 입력"
                />
                <span className="text-sm text-gray-500">
                비밀번호는 최소 8글자 이상이어야 하며, 대문자와 특수문자를 포함해야 합니다.
              </span>
              </label>

              {/* 비밀번호 재확인 필드 */}
              <label className="block">
                <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">Confirm Password</span>
                <Input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="mt-1"
                    placeholder="비밀번호 재입력"
                />
                {fieldErrors.confirmPassword && (
                    <span className="text-sm text-red-500">{fieldErrors.confirmPassword}</span>
                )}
              </label>

              {/* 핸드폰 번호 입력 필드 */}
              <FormControl mb={4} isInvalid={!!fieldErrors.phoneNum}>
                <FormLabel htmlFor="phoneNum">전화번호</FormLabel>
                <div className="flex">
                  <Input
                      type="tel"
                      id="phoneNum"
                      name="phoneNum"
                      value={formData.phoneNum}
                      onChange={handleChange}
                      placeholder="010-1234-5678"
                      required
                      className="flex-grow"
                  />
                  <button
                      type="button"
                      onClick={async () => {
                        if (!formData.phoneNum) {
                          setFieldError("phoneNum", "전화번호를 입력해주세요.");
                          return;
                        }
                        const isAvailable = await checkPhoneDuplication(formData.phoneNum!);
                        if (isAvailable) {  // true -> 이미 사용 중
                          setFieldError("phoneNum", "핸드폰 번호가 이미 사용 중입니다.");
                        } else {  // false -> 사용 가능
                          setFieldError("phoneNum", "");
                          setFieldSuccessMessage("phoneNum", "사용 가능한 번호입니다.");
                        }
                      }}
                      className="ml-2 px-4 py-2 bg-green-600 text-white rounded-md whitespace-nowrap"
                  >
                    중복확인
                  </button>
                </div>
                {fieldErrors.phoneNum && <span className="text-sm text-red-500">{fieldErrors.phoneNum}</span>}
                {!fieldErrors.phoneNum && fieldSuccess.phoneNum && (
                    <span className="text-sm text-green-400">{fieldSuccess.phoneNum}</span>
                )}
              </FormControl>

              {/* 제출 버튼 */}
              <ButtonPrimary type="submit">Continue</ButtonPrimary>
            </form>

            {/* 이미 계정이 있는 경우 로그인 링크 */}
            <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Already have an account?{' '}
              <Link className="text-green-600" href="/login">
              Sign in
            </Link>
          </span>
          </div>
        </div>
      </div>
  );
}
