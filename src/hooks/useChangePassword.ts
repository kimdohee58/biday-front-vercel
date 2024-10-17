import { useState } from "react";
import {changePasswordService} from "@/service/user/user.serivce";

export const useChangePassword = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const changePassword = async (
        currentPassword: string,
        newPassword: string,
        confirmPassword: string
    ) => {
        if (newPassword !== confirmPassword) {
            setError("새 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
            return;
        }
        setIsLoading(true);
        setError(null);

        try {

            const response = await changePasswordService(currentPassword,newPassword);
            console.log("비밀번호 변경 service, ", response)

            setIsLoading(false);

            return response;
        } catch (err) {
            setIsLoading(false);
            setError("비밀번호 변경에 실패했습니다.");
            console.error(err);
            throw err;
        }
    };

    return { changePassword, isLoading, error };
};
