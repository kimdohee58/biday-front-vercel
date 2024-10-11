// src/hooks/useLogin.ts

import { useRouter } from 'next/navigation'; // next/navigation에서 useRouter 임포트
import { useDispatch } from 'react-redux';
import {saveUser, saveUserToken, UserState} from '@/lib/features/user.slice';
import { handleLogin } from '@/service/user/login.api';
import {findUserById} from "@/service/user/user.api";
import {initialUser, UserModel} from "@/model/UserModel";  // API 호출을 임포트
import {createUserToken, extractUserInfoFromToken} from '@/utils/jwt.utils';
import {saveToken} from "@/utils/cookie/cookie.api";
import Cookies from "js-cookie";
import {UserToken} from "@/model/user/userToken";

export const useLogin = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const login = async (username: string, password: string) => {
        try {
            const response = await handleLogin(username, password);

            if (response) {
                // Authorization 헤더에서 토큰 추출
                const authorizationHeader = response.headers["authorization"];

                if (authorizationHeader) {
                    const accessToken = authorizationHeader.split(" ")[1]; // Bearer {token} 형태이므로 토큰만 추출
                    saveToken(accessToken); // 쿠키에 토큰을 저장.


                    // jwt.utils.ts에서 함수 사용 유저 객체 추출
                    const { id, name, role } = extractUserInfoFromToken(accessToken);
                    console.log("페이로드 한 유저 정보 저장 jwt.utils.ts: ", id, name, role);

                    // 서버에서 유저 ID로 유저 정보 가져오기
                    const user = await findUserById(id);

                    if (user) {
                        // UserModel에 맞게 데이터 변환
                        const userData : UserModel = {
                                ...initialUser,  // 초기값을 기반으로
                                id: user.id !!, // 백엔드에서 받은 id
                                name: user.name,  // 백엔드에서 받은 name
                                email: user.email,  // 백엔드에서 받은 email
                                phoneNum: user.phoneNum,  // 백엔드에서 받은 phone
                                status: user.status ? String(user.status) : '',  // boolean인 status를 문자열로 변환
                        };

                        // Redux store에 유저 정보를 저장
                        dispatch(saveUser({ user: userData, token:accessToken }));  // 유저 정보와 토큰을 Redux에 저장
                        console.log("유저 정보 Redux에 저장 완료:", saveUser);

                        // 유저 정보를 JWT로 만들어 userToken으로 js 쿠키에 저장.
                        const userPayload = {id: userData.id, name: userData.name ?? '',role};
                        const userToken = createUserToken(userPayload);


                        if(user) {
                            const userInfo: UserToken = {
                                userId: user.id !!,
                                userName: user.name !! ,
                                userRole: user.role !! ,
                            };
                            //localStorage.setItem('userToken', JSON.stringify(userData));

                            dispatch(saveUserToken({userInfo }))
                            console.log("세이브유저토큰 : " , userInfo)
                            console.log("userInfo의 아이디 객체를 확인하기 " , userInfo.userId)
                            console.log("userInfo의 이름 객체를 확인하기 " , userInfo.userName)
                            console.log("userInfo의 등급 객체를 확인하기 " , userInfo.userRole)

                            localStorage.setItem("userInfo", JSON.stringify(userInfo));
                            console.log("로컬스토리지 밑에 있는 로그  : " , userInfo)

                        }
                    }
                    router.push("/");
                } else {
                    throw new Error("Authorization 헤더가 없습니다.");
                }
            }
        } catch (error) {
            console.error("서버랑 연결이 안됨. userLogin.ts:", error);
        }
    };

    return { login };
};

// JWT 토큰에서 유저 ID 추출 함수
const extractUserIdFromToken = (token: string): string => {
    // JWT 토큰을 디코딩하여 payload에서 유저 ID를 추출하는 코드
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log("페이로드 , : 확인 ", payload);
    return payload.id;  // 백엔드에서 JWT에 포함한 userId에 맞춰 변경
};
