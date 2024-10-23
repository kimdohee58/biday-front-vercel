// src/hooks/useSignUpUser.ts
import { useState } from "react";
import { UserModel } from "@/model/user/user.model";
import { checkEmailDuplication, checkPhoneDuplication, insertUser } from "@/service/user/user.api";

const useSignUpUser = () => {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
    const [fieldSuccess, setFieldSuccess] = useState<{ [key: string]: string }>({});

    // 에러 메시지 설정
    const setFieldError = (name: string, errorMessage: string) => {
        setFieldErrors((prevErrors) => ({
            ...prevErrors,
            [name]: errorMessage,
        }));

        // 에러 발생 시 해당 필드의 성공 메시지 초기화.
        setFieldSuccess((prevSuccess) => ({
            ...prevSuccess,
            [name]: '',
        }));
    };

    // 성공 메시지 설정
    const setFieldSuccessMessage = (name: string, successMessage: string) => {
        setFieldSuccess((prevSuccess) => ({
            ...prevSuccess,
            [name]: successMessage,
        }));

        // 성공 시 에러 메시지 초기화
        setFieldErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
    };

    // 회원가입 처리 함수
    const handleSignUp = async (user: UserModel) => {
        setStatus('loading'); // 상태를 로딩 중으로 처리

        try {
            // 1. 이메일 중복 확인
            const emailAvailable = await checkEmailDuplication(user.email!);
            if (emailAvailable) {
                setFieldError("email", "이미 사용중인 이메일입니다.");
                setStatus('error');
                return false;
            }

            // 2. 핸드폰 중복 확인
            const phoneAvailable = await checkPhoneDuplication(user.phoneNum!);
            if (phoneAvailable) {
                setFieldError("phoneNum", "이미 사용중인 번호입니다.");
                setStatus('error');
                return false;
            }

            // 3. 회원가입 요청
            const response = await insertUser(user);
            if (response.status === true) {
                setStatus('success');
                return true;
            } else {
                throw new Error('회원가입 실패');
            }
        } catch (error) {
            const err = error as Error;
            setStatus('error'); // 실패 시 상태를 'error'로 변경
            setErrorMessage(err.message || '회원가입 중 오류가 발생했습니다.');
            return false;
        }
    };

    return {
        status,
        handleSignUp,
        errorMessage,
        fieldErrors,
        fieldSuccess,
        setFieldError,
        setFieldSuccessMessage,
    };
};

export default useSignUpUser;
