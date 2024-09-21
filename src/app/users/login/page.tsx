"use client";

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import {saveToken,clearToken} from "@/utils/cookie/cookie.api";
import {setItem,getItem,removeItem} from "@/utils/storage/storage.api";

export default function Login() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'username') {
            setUsername(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const result = await handleLogin(username, password);

            if (result.status === 200) {
                router.push('/');
            } else {
                setError('Failed to login');
            }
        } catch (error) {
            setError('Failed to login');
        }
    };


    // 로그인 요청 처리 함수 백엔드 API 통신
    const handleLogin = async (username: string, password: string): Promise<Response> => {
        try {
            const formData = new URLSearchParams();
            formData.append('username', username);
            formData.append('password', password);

            const response = await fetch("http://localhost:8080/login", {
                method: "POST",
                credentials : "include",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formData.toString()
                // credentials: 'include' // 쿠키를 포함한 요청 허용
            });

            //console.log(localStorage.getItem("accessToken")) 이거 널임.

            if (response.ok) {
                const accessToken = getCookie("accessToken");

                // 응답이 비어있지 않을 때만 JSON 파싱
                const data = response.headers.get('content-length') !== '0' ? await response.json() : {};

                // 데이터에 토큰이 있는 경우에만 저장
                if (data.token) {
                    const { token, refreshToken } = data;

                    // saveToken 함수를 이용해 로컬 스토리지와 쿠키에 토큰 저장
                    saveToken(token, refreshToken);
                    console.log("세비으 토큰 데이터 확인 : ", data.token, saveToken(token,refreshToken));
                }

                // JWT 토큰 및 refresh 토큰 가져오기
                const {token, refreshToken} = data;

                // 세이브토큰 함수를 이용해서 로컬 스토리지와 쿠키에 토큰을 저장.
                saveToken(token, refreshToken);

                //localStorage.setItem("accessToken", accessToken!);
                if (accessToken !== null && accessToken !== undefined) {
                    localStorage.setItem("accessToken", accessToken);
                }

                return response;
            } else {
                throw new Error(response.statusText);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    };




    // 쿠키 가져오기 함수
    const getCookie = (name: string) => {
        const cookie = `; ${document.cookie}`;
        const cookieParts = cookie.split(`; ${name}=`);
        if (cookieParts.length === 2) {
            return cookieParts.pop()?.split(';').shift();
        }
        return null;
    };

    const handleLogout = async () => {
        localStorage.removeItem('accessToken');
        const refreshToken = document.cookie.split('; ').find(row => row.startsWith('refresh='));
        const tokenValue = refreshToken ? refreshToken.split('=')[1] : '';

        try {
            const response = await fetch("http://localhost:8080/logout", {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ refreshToken: tokenValue }),
            });

            if (response.ok) {
                alert('Logged out successfully!');
                router.push("/");
            } else {
                alert(`Error logging out: ${response.statusText}`);
            }
        } catch (error) {
            if (error instanceof Error) {
                alert(`Fetch error: ${error.message}`);
            } else {
                alert('Unknown error occurred');
            }
        }
    };


    // 로컬스토리지 관리 함수들
    const [key, setKey] = useState<string>('exampleKey');
    const [value, setValue] = useState<string>('exampleValue');
    const [fetchedValue, setFetchedValue] = useState<string | null>(null);
    const [length, setLength] = useState<number>(0);
    const [fetchedKey, setFetchedKey] = useState<string | null>(null);

    const handleSetItem = () => {
        localStorage.setItem(key, value);
        console.log(`Set: ${key} = ${value} in localStorage`);
    };

    const handleGetItem = () => {
        const storedValue = localStorage.getItem(key);
        setFetchedValue(storedValue);
        console.log(`Get: ${key} from localStorage = ${storedValue}`);
    };

    const handleRemoveItem = () => {
        localStorage.removeItem(key);
        console.log(`Removed: ${key} from localStorage`);
    };

    const handleClearStorage = () => {
        localStorage.clear();
        console.log("Cleared all localStorage data");
    };

    const handleGetLength = () => {
        const storageLength = localStorage.length;
        setLength(storageLength);
        console.log(`LocalStorage length: ${storageLength}`);
    };

    const handleGetKeyAtIndex = (index: number) => {
        const storageKey = localStorage.key(index);
        setFetchedKey(storageKey);
        console.log(`Key at index ${index}: ${storageKey}`);
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {/* 로그아웃 버튼 */}
            <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded mb-4"
            >
                Logout
            </button>

            {/* 로그인 폼 */}
            <form onSubmit={handleSubmit} className="w-full max-w-sm mb-4">
                <div className="mb-4 w-full max-w-md">
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={handleChange}
                        placeholder="Email"
                        className="border border-gray-300 p-2 mb-2 w-full"
                    />
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="border border-gray-300 p-2 mb-4 w-full"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-purple-500 text-white rounded w-full"
                    >
                        Login
                    </button>
                </div>
            </form>

            {/* 에러 메시지 출력 */}
            {error && <p className="text-red-500">{error}</p>}

            {/* 로컬스토리지 관리 버튼 (크기 작게 조정) */}
            <div className="grid grid-cols-3 gap-2 mt-8">
                <button onClick={handleSetItem} className="px-2 py-1 bg-blue-600 text-white text-sm rounded">
                    Set Item
                </button>
                <button onClick={handleGetItem} className="px-2 py-1 bg-green-600 text-white text-sm rounded">
                    Get Item
                </button>
                <button onClick={handleRemoveItem} className="px-2 py-1 bg-red-600 text-white text-sm rounded">
                    Remove Item
                </button>
                <button onClick={handleClearStorage} className="px-2 py-1 bg-gray-600 text-white text-sm rounded">
                    Clear All
                </button>
                <button onClick={handleGetLength} className="px-2 py-1 bg-purple-600 text-white text-sm rounded">
                    Get Length
                </button>
                <button onClick={() => handleGetKeyAtIndex(0)} className="px-2 py-1 bg-yellow-600 text-white text-sm rounded">
                    Get Key at Index 0
                </button>
            </div>

            {/* 로컬스토리지 상태 출력 */}
            <div className="mt-4 text-center">
                {fetchedValue && <p>Fetched Value: {fetchedValue}</p>}
                <p>LocalStorage Length: {length}</p>
                {fetchedKey && <p>Key at index 0: {fetchedKey}</p>}
            </div>
        </main>
    );
}
