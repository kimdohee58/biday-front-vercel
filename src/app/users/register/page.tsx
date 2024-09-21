'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { insertUser } from '@/app/service/users/user.api';
import { Button, useDisclosure, Input, FormControl, FormLabel, Text, RadioGroup, Stack, Radio } from '@chakra-ui/react';
import AddressModal from '@/app/api/address/AddressModal'; // Import the AddressModal

interface UsersModel {
    zipcode: string;
    streetaddress: string;
    detailaddress: string;
    name: string;
    email: string;
    password: string;
    phoneNum: string;
    addressType: string; // Added addressType field
}

export default function RegisterPage() {
    const [formData, setFormData] = useState<UsersModel>({
        zipcode: '',
        streetaddress: '',
        detailaddress: '',
        email: '',
        password: '',
        name: '',
        phoneNum: '',
        addressType: '', // 기본값을 빈 문자열로 설정
    });
    const [isEmailChecked, setIsEmailChecked] = useState(false); // 이메일 중복 체크 상태 추가
    const [error, setError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [phoneNumError, setPhoneNumError] = useState<string | null>(null);
    const [isCertifying, setIsCertifying] = useState(false);
    const [address, setAddress] = useState<string | null>(null);
    const [zonecode, setZonecode] = useState<string | null>(null);
    const [addressError, setAddressError] = useState<string | null>(null);
    const [showDetailAddressInput, setShowDetailAddressInput] = useState<boolean>(false);
    const { isOpen: isSearchAddressOpen, onOpen: openSearchAddressModal, onClose: closeSearchAddressModal } = useDisclosure();
    const { isOpen: isModalOpen, onOpen: openAddressModal, onClose: closeAddressModal } = useDisclosure();
    const router = useRouter();
    const API_BASE_URL = 'localhost:8080';

    const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
    const [phoneTypingTimeout, setPhoneTypingTimeout] = useState<NodeJS.Timeout | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        if (name === 'password') {
            validatePassword(value);
        }

        if (name === 'phoneNum') {
            if (phoneTypingTimeout) {
                clearTimeout(phoneTypingTimeout);
            }

            const newPhoneTimeout = setTimeout(() => {
                validatePhoneNumber(value);
            }, 1500);

            setPhoneTypingTimeout(newPhoneTimeout);
        }
    };

    /** 송준한 - 비밀번호 유효성 검사 중복환인 버튼. */
    const checkEmailDuplicate = async () => {
        if (!formData.email) {
            setEmailError('이메일을 입력해 주세요.');
            return;
        }

        try {
            const response = await fetch(`http://${API_BASE_URL}/api/users/validate?email=${encodeURIComponent(formData.email)}`);
            if (response.ok) {
                const isEmailTaken = await response.json();
                if (isEmailTaken) {
                    setEmailError('이메일이 이미 등록되어 있습니다.');
                } else {
                    setEmailError('사용 가능한 이메일입니다.');
                    setIsEmailChecked(true); // 중복 확인 완료 상태
                }
            } else {
                setEmailError('이메일 확인 중 오류가 발생했습니다.');
            }
        } catch (error) {
            setEmailError('서버 오류로 이메일 중복 확인에 실패했습니다.');
        }
    };



    const handleAddressTypeChange = (value: string) => {
        setFormData(prevState => ({
            ...prevState,
            addressType: value
        }));
    };

    const validateEmail = async (email: string) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setEmailError('이메일 형식이 올바르지 않습니다.');
            console.log("이메일 인증",email)
            return;
        }

        try {
            const response = await fetch(`http://${API_BASE_URL}/api/users/validate?email=${encodeURIComponent(email)}`);
            if (response.ok) {
                const isEmailTaken = await response.json();
                if (isEmailTaken) {
                    setEmailError('이메일이 이미 등록되어 있습니다.');
                } else {
                    setEmailError('사용가능한 이메일 입니다.');
                }
            } else {
                setEmailError('이메일 검증에 실패했습니다.');
            }
        } catch (error) {
            setEmailError('이메일 검증 요청 중 오류가 발생했습니다.');
        }
    };

    const validatePhoneNumber = async (phoneNum: string) => {
        const formattedPhoneNum = phoneNum.replace(/\D/g, '');

        if (formattedPhoneNum.length !== 11) {
            setPhoneNumError('전화번호는 11자리 숫자여야 합니다.');
            return;
        }

        const formattedForDisplay = `${formattedPhoneNum.slice(0, 3)}-${formattedPhoneNum.slice(3, 7)}-${formattedPhoneNum.slice(7)}`;

        try {
            const response = await fetch(`http://${API_BASE_URL}/api/users/phoneNum?phoneNum=${encodeURIComponent(formattedForDisplay)}`);
            if (response.ok) {
                const isPhoneTaken = await response.json();
                if (isPhoneTaken) {
                    setPhoneNumError('전화번호가 이미 등록되어 있습니다.');
                } else {
                    setIsCertifying(true);
                    setPhoneNumError('사용가능한 전화번호 입니다.');
                }
            } else {
                setPhoneNumError('전화번호 검증에 실패했습니다.');
            }
        } catch (error) {
            setPhoneNumError('전화번호 검증 요청 중 오류가 발생했습니다.');
        }
    };

    const validatePassword = (password: string) => {
        const lengthValid = password.length >= 8 && password.length <= 16;
        const hasSpecialChar = /[!?@#^~$*]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasRepeatedChars = /(.)\1\1/.test(password);

        if (!lengthValid) {
            setPasswordError('비밀번호는 8~16자 사이여야 합니다.');
            return;
        }
        if (!hasSpecialChar || !hasNumber || !hasUpperCase || !hasLowerCase) {
            setPasswordError('비밀번호는 특수문자, 숫자, 대소문자를 포함해야 합니다.');
            return;
        }
        if (hasRepeatedChars) {
            setPasswordError('비밀번호에 같은 문자가 3자 이상 포함될 수 없습니다.');
            return;
        }

        setPasswordError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isCertifying) {
            setError('Please complete certification first.');
            return;
        }
        if (emailError && !emailError.startsWith('사용가능한 이메일 입니다.')) {
            setError('Please correct email errors before submitting.');
            return;
        }
        if (passwordError && !passwordError.startsWith('사용가능한 비밀번호 입니다.')) {
            setError('Please correct password errors before submitting.');
            return;
        }
        if (phoneNumError && !phoneNumError.startsWith('사용가능한 전화번호 입니다.')) {
            setError('Please correct phoneNum before submitting.');
            return;
        }
        try {
            const result = await insertUser(formData);
            console.log("users/register/page.tsx handleSubmit result.status " , result )
            console.log("users/register/page.tsx handleSubmit result.status " , result.status)

            if (result.status === true) {
                router.push('/');
            } else {
                setError(result.message || 'Failed to register');  // 실패 시 메시지 출력
            }
        } catch (error) {
            console.error('Registration Error:', error);  // 에러 로그 출력
            setError('Failed to register');
        }
    };

    const onCompletePost = (data: any) => {
        setAddress(data.address);
        setZonecode(data.zonecode);
        closeSearchAddressModal();
        setShowDetailAddressInput(true);
        setFormData(prevState => ({
            ...prevState,
            streetaddress: data.address,
            zipcode: data.zonecode
        }));
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <form onSubmit={handleSubmit} className="w-full max-w-sm">
                <FormControl mb={4}>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {emailError && <Text color="red.500" mt={2}>{emailError}</Text>}
                </FormControl>
                <FormControl mb={4}>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    {passwordError && <Text color="red.500" mt={2}>{passwordError}</Text>}
                </FormControl>
                <FormControl mb={4}>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </FormControl>
                <FormControl mb={4}>
                    <FormLabel htmlFor="phoneNum">Phone Number</FormLabel>
                    <Input
                        type="text"
                        id="phoneNum"
                        name="phoneNum"
                        value={formData.phoneNum}
                        onChange={handleChange}
                        required
                        placeholder="000-0000-0000"
                    />
                    {phoneNumError && <Text color="red.500" mt={2}>{phoneNumError}</Text>}
                </FormControl>
                {/* Address Button */}
                <FormControl mb={4}>
                    <Button
                        ml="10px"
                        fontSize="sm"
                        color="#F8bbd0"
                        onClick={openSearchAddressModal}
                    >
                        주소찾기
                    </Button>
                    {formData.streetaddress && <Text mt={2}>주소: {formData.streetaddress}</Text>}
                    {formData.zipcode && <Text mt={2}>우편번호: {formData.zipcode}</Text>}
                </FormControl>

                {showDetailAddressInput && (
                    <FormControl mb={4}>
                        <FormLabel htmlFor="addressDetail">상세주소</FormLabel>
                        <Input
                            type="text"
                            id="addressDetail"
                            name="detailaddress"
                            value={formData.detailaddress || ''}
                            onChange={handleChange}
                        />
                        <FormLabel htmlFor="addressType">주소 유형</FormLabel>
                        <RadioGroup
                            id="addressType"
                            name="addressType"
                            value={formData.addressType}
                            onChange={handleAddressTypeChange}
                        >
                            <Stack spacing={4}>
                                <Radio value="HOME">집</Radio>
                                <Radio value="WORK">회사</Radio>
                                <Radio value="OTHER">기타</Radio>
                            </Stack>
                        </RadioGroup>
                    </FormControl>
                )}

                <Button
                    type="submit"
                    colorScheme="blue"
                    mt={4}
                >
                    Register
                </Button>
                {error && <Text color="red.500" mt={2}>{error}</Text>}
            </form>

            {/* Search Address Modal */}
            {AddressModal && (
                <AddressModal
                    isOpen={isSearchAddressOpen}
                    onClose={closeSearchAddressModal}
                    onCompletePost={onCompletePost}
                />
            )}
        </main>
    );
}
