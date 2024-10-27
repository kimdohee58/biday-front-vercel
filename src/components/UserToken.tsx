"use client"

import { getUserToken } from "@/lib/features/user.slice";
import {useSelector} from "react-redux";

export default function UserToken() {
    const userToken = useSelector(getUserToken);


    console.log(" 컴포넌트 디렉토리에 있는 유저토큰 값 확인하는 코드 :", userToken);
    return (
        <div>
            {userToken ? (
                <div>
                    <p>로그인된 사용자: {userToken.userName}</p>
                    <p>역할: {userToken.userRole}</p>
                    <p>아이디: {userToken.userId}</p>
                </div>
            ) : (
                <p>로그인하지 않았습니다.</p>
            )}
        </div>
    );
}