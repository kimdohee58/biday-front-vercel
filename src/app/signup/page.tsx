// TODO 이용약관 하나라도 체크 해제되면 모두 동의합니다 체크 해제되기
"use client";

import React, {useState} from "react";
import Input from "@/shared/Input/Input";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Link from "next/link";
import {UserModel} from "@/model/user/user.model";
import {useRouter} from "next/navigation";
import useSignInUser from "@/hooks/useSignInUser";
import {checkEmailDuplication, checkPhoneDuplication} from "@/service/user/user.api";
import TermsAgreement from "@/components/dohee/TermsAgreement";

export default function PageSignUp() {
    const {
        handleSignUp,
        errorMessage,
        fieldErrors,
        fieldSuccess,
        setFieldError,
        setFieldSuccessMessage
    } = useSignInUser();
    const router = useRouter();

    const [formData, setFormData] = useState<Partial<UserModel & { confirmPassword: string }>>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNum: '',
    });

    const [emailLocalPart, setEmailLocalPart] = useState<string>("");
    const [emailDomain, setEmailDomain] = useState<string>("naver.com");
    const [customEmailDomain, setCustomEmailDomain] = useState<string>("");
    const [isCustomDomain, setIsCustomDomain] = useState<boolean>(false);
    const [isEmailChecked, setIsEmailChecked] = useState(false);
    const [isPhoneChecked, setIsPhoneChecked] = useState(false);
    const [termsChecked, setTermsChecked] = useState<string[]>([]);

    const emailDomains = [
        "naver.com",
        "gmail.com",
        "hanmail.net",
        "hotmail.com",
        "yahoo.co.kr",
        "직접 입력"
    ];

    const handleChangeLocalPart = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailLocalPart(e.target.value);
    };

    const handleChangeDomain = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === "직접 입력") {
            setIsCustomDomain(true);
            setEmailDomain("");
        } else {
            setIsCustomDomain(false);
            setEmailDomain(e.target.value);
        }
    };

    const handleCustomDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomEmailDomain(e.target.value);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        let newValue = value;

        if (name === "phoneNum") {

            const cleanedValue = value.replace(/\D/g, '');

            if (cleanedValue.length <= 3) {
                newValue = cleanedValue;
            } else if (cleanedValue.length <= 7) {
                newValue = `${cleanedValue.slice(0, 3)}-${cleanedValue.slice(3)}`;
            } else {
                newValue = `${cleanedValue.slice(0, 3)}-${cleanedValue.slice(3, 7)}-${cleanedValue.slice(7, 11)}`;
            }
        }

        setFormData({...formData, [name]: newValue});

        switch (name) {
            case "name":
                if (value.length > 6) {
                    setFieldError(name, "이름은 6글자 이하로 입력해야 합니다.");
                } else {
                    setFieldError(name, "");
                }
                break;
            case "email":
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    setFieldError(name, "유효하지 않은 이메일 형식입니다.");
                } else {
                    setFieldError(name, "");
                }
                break;
            case "password":
                if (value.length < 8) {
                    setFieldError(name, "비밀번호는 최소 8글자 이상이어야 합니다.");
                } else if (!/[A-Z]/.test(value)) {
                    setFieldError(name, "비밀번호에는 최소 1개 이상의 대문자가 포함되어야 합니다.");
                } else if (!/[^A-Za-z0-9]/.test(value)) {
                    setFieldError(name, "비밀번호에는 최소 1개 이상의 특수문자가 포함되어야 합니다.");
                } else if (!/[0-9]/.test(value)) {
                    setFieldError(name, "비밀번호에는 최소 1개 이상의 숫자가 포함되어야 합니다.");
                } else {
                    setFieldError(name, "");
                }
                break;
            case "confirmPassword":
                if (value !== formData.password) {
                    setFieldError(name, "비밀번호가 일치하지 않습니다.");
                } else {
                    setFieldError(name, "");
                }
                break;
            case "phoneNum":
                const phoneRegex = /^010-\d{4}-\d{4}$/;
                if (!phoneRegex.test(newValue)) {
                    setFieldError(name, "전화번호는 010-1234-5678 형식으로 입력해야 합니다.");
                } else {
                    setFieldError(name, "");
                }
                break;
            default:
                break;
        }
    };

    const handleTermsChange = (checkedTerms:string[]) => {
        setTermsChecked(checkedTerms);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const fullEmail = isCustomDomain
            ? `${emailLocalPart}@${customEmailDomain}`
            : `${emailLocalPart}@${emailDomain}`;

        if (!formData.name || formData.name.length > 6) {
            alert("이름은 6글자 이하로 입력해주세요.");
            return;
        }

        if (!isEmailChecked) {
            alert("이메일 중복 확인을 해주세요.");
            return;
        }

        if (!isPhoneChecked) {
            alert("핸드폰 중복 확인을 해주세요.");
            return;
        }

        // 유효성 검사
        if (!emailLocalPart || !fullEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fullEmail)) {
            alert("유효하지 않은 이메일 형식입니다.");
            return;
        }

        formData.email = fullEmail;  // 이메일에 도메인까지 합쳐서 formData에 저장

        if (
            !formData.password ||
            formData.password.length < 8 ||
            !/[A-Z]/.test(formData.password) ||
            !/[^A-Za-z0-9]/.test(formData.password) ||
            !/[0-9]/.test(formData.password)
        ) {
            alert("비밀번호를 확인해주세요.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        if (!formData.phoneNum || !/^010-\d{4}-\d{4}$/.test(formData.phoneNum)) {
            alert("전화번호 형식이 잘못되었습니다.");
            return;
        }

        // 이용 약관 체크 여부 확인
        const requiredTerms = ['age', 'terms', 'privacy'];
        handleTermsChange(requiredTerms);

        const allRequiredChecked = requiredTerms.every((term) => termsChecked.includes(term));
        if (!allRequiredChecked) {
            alert('모든 필수 약관에 동의해야 합니다.');
            return;
        }

        // 유효성 검사를 통과한 후 회원가입 처리
        const isSignUpSuccessful = await handleSignUp(formData as UserModel);
        if (isSignUpSuccessful) {
            alert("회원가입 성공");
            router.push('/login');
        } else {
            alert(`회원가입 실패: ${errorMessage}`);
        }
    };

    const handleEmailDuplicationCheck = async () => {
        const fullEmail = isCustomDomain
            ? `${emailLocalPart}@${customEmailDomain}`
            : `${emailLocalPart}@${emailDomain}`;

        if (!fullEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fullEmail)) {
            setFieldError("email", "유효한 이메일을 입력해주세요.");
            setIsEmailChecked(false); // 중복 확인 실패
            return;
        }

        try {
            const isAvailable = await checkEmailDuplication(fullEmail);
            if (isAvailable) {
                setFieldError("email", "이메일이 이미 사용중입니다.");
                setIsEmailChecked(false); // 중복 확인 실패
            } else {
                setFieldError("email", "");
                setFieldSuccessMessage("email", "사용 가능한 이메일입니다.");
                setIsEmailChecked(true); // 중복 확인 성공
            }
        } catch (error) {
            console.error("중복 확인 중 오류 발생:", error);
            alert("중복 확인 중 문제가 발생했습니다. 다시 시도해주세요.");
            setIsEmailChecked(false);
        }
    };

    const handlePhoneDuplicationCheck = async () => {
        if (!formData.phoneNum || !/^010-\d{4}-\d{4}$/.test(formData.phoneNum)) {
            setFieldError("phoneNum", "전화번호 형식이 잘못되었습니다.");
            setIsPhoneChecked(false); // 중복 확인 실패
            return;
        }

        try {
            const isAvailable = await checkPhoneDuplication(formData.phoneNum);
            if (isAvailable) {
                setFieldError("phoneNum", "핸드폰 번호가 이미 사용 중입니다.");
                setIsPhoneChecked(false); // 중복 확인 실패
            } else {
                setFieldError("phoneNum", "");
                setFieldSuccessMessage("phoneNum", "사용 가능한 번호입니다.");
                setIsPhoneChecked(true); // 중복 확인 성공
            }
        } catch (error) {
            console.error("중복 확인 중 오류 발생:", error);
            alert("중복 확인 중 문제가 발생했습니다. 다시 시도해주세요.");
            setIsPhoneChecked(false);
        }
    }

    return (
        <div className={`nc-PageSignUp`} data-nc-id="PageSignUp">
            <div className="container mb-24 lg:mb-32">
                <h2 className="my-12 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
                    Signup
                </h2>
                <div className="max-w-md mx-auto space-y-2">
                    <TermsAgreement onTermsChange={handleTermsChange}/>
                    <div className="relative text-center">
                            <span
                                className="relative z-10 inline-block px-6 font-medium text-base bg-white dark:text-neutral-400 dark:bg-neutral-900"> {/* text-sm에서 text-base로 변경 및 px를 4에서 6으로 증가 */}
                                AND
                            </span>
                        <div
                            className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border-2 border-neutral-100 dark:border-neutral-800"></div>
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
                            {/* 기본 안내 메시지 */}
                            {!fieldErrors.name && (
                                <span className="text-sm text-gray-500">이름은 6글자 이하로 입력해주세요.</span>
                            )}
                            {/* 오류 메시지 */}
                            {fieldErrors.name && (
                                <span className="text-sm text-red-500">{fieldErrors.name}</span>
                            )}
                        </label>

                        {/* 이메일 입력 필드 */}
                        <label className="block">
                            <span className="text-neutral-800 dark:text-neutral-200 mb-2">Email address</span>
                            <div className="flex items-center gap-2">
                                {/* 이메일 입력 필드 */}
                                <div className="flex-grow">
                                    <Input
                                        type="text"
                                        placeholder="이메일 입력"
                                        value={emailLocalPart}
                                        onChange={handleChangeLocalPart}
                                        className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:focus:ring-blue-400"
                                    />
                                </div>

                                {/* @ 기호 */}
                                <span className="text-lg font-semibold"> @ </span>

                                {/* 도메인 선택 필드 */}
                                <div className="flex-grow">
                                    {!isCustomDomain ? (
                                        <select
                                            value={emailDomain}
                                            onChange={handleChangeDomain}
                                            className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:focus:ring-blue-400"
                                        >
                                            {emailDomains.map((domain, index) => (
                                                <option key={index} value={domain}>
                                                    {domain}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <Input
                                            type="text"
                                            value={customEmailDomain}
                                            onChange={handleCustomDomainChange}
                                            placeholder="도메인 입력"
                                            className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:focus:ring-blue-400"
                                        />
                                    )}
                                </div>
                            </div>
                        </label>

                        {/* 중복확인 버튼 */}
                        <button
                            type="button"
                            onClick={handleEmailDuplicationCheck}
                            className="ml-2 px-4 py-2 bg-green-600 text-white rounded-md whitespace-nowrap"
                        >
                            중복확인
                        </button>
                        {fieldErrors.email && <span className="text-sm text-red-400">{fieldErrors.email}</span>}
                        {!fieldErrors.email && fieldSuccess.email && (
                            <span className="text-sm text-green-400">{fieldSuccess.email}</span>
                        )}

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
                            {/* 기본 안내 메시지 */}
                            {!fieldErrors.password && (
                                <span className="text-sm text-gray-500">
            비밀번호는 최소 8글자 이상이어야 하며, 대문자와 특수문자를 포함해야 합니다.
        </span>
                            )}
                            {/* 오류 메시지 */}
                            {fieldErrors.password && (
                                <span className="text-sm text-red-500">{fieldErrors.password}</span>
                            )}
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
                            {/* 오류 메시지 */}
                            {fieldErrors.confirmPassword && (
                                <span className="text-sm text-red-500">{fieldErrors.confirmPassword}</span>
                            )}
                        </label>

                        {/* 핸드폰 번호 입력 필드 */}
                        <label htmlFor="phoneNum">전화번호</label>
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
                                onClick={handlePhoneDuplicationCheck}
                                className="ml-2 px-4 py-2 bg-green-600 text-white rounded-md whitespace-nowrap"
                            >
                                중복확인
                            </button>
                        </div>
                        {fieldErrors.phoneNum && <span className="text-sm text-red-500">{fieldErrors.phoneNum}</span>}
                        {!fieldErrors.phoneNum && fieldSuccess.phoneNum && (
                            <span className="text-sm text-green-400">{fieldSuccess.phoneNum}</span>
                        )}

                        <ButtonPrimary type="submit" className="w-full">Continue</ButtonPrimary>
                    </form>

                    <div className="max-w-md mx-auto space-y-2">
                        <div className="flex justify-center mt-4">
                        </div>
                    </div>

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