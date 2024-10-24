// src/service/user/login.api.ts

import axiosInstance from "@/app/api/axiosInstance/axiosInstance";
import {AxiosResponse} from "axios";

export const handleLogin = async (username: string, password: string): Promise<AxiosResponse | null> => {
    try {
        const response: AxiosResponse = await axiosInstance.post("/login", {
            username,
            password,
        }, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });

        if (response.status === 200) {
            return response;
        } else {
            throw new Error(response.statusText);
            // TODO error enum
        }
    } catch (error) {
        console.error('Login Error:', error);
        throw error;
        // TODO error enum
    }
};
