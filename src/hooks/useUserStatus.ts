//src/hooks/useUserStatus.ts
import { useSelector } from "react-redux";
import {getUser} from "@/lib/features/user.slice";

export const useUserStatus=()=>{
    const {user} = useSelector(getUser); // 리덕스에서 유저 정보 가져오기
    return {user, isLoggedIn: !!user.email} // 이메일이 있으면 로그인된 것으로 간주.

}