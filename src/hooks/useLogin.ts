// src/hooks/useLogin.ts

import { useRouter } from 'next/navigation'; // next/navigation에서 useRouter 임포트
import { useDispatch } from 'react-redux';
import {addAddress, saveUser, saveUserToken, UserState} from '@/lib/features/user.slice';
import { handleLogin } from '@/service/user/login.api';
import {findUserById} from "@/service/user/user.api";
import {initialUser, UserModel} from "@/model/user/user.model";  // API 호출을 임포트
import {createUserToken, extractUserInfoFromToken} from '@/utils/jwt.utils';
import {saveToken, saveUserTokenToCookie} from "@/utils/cookie/cookie.api";
import {UserToken} from "@/model/user/userToken";
import {useUserContext} from "@/utils/userContext"
import { fetchAllAddressesByUserId } from '@/service/user/address.service';

export const useLogin = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const {setUser} = useUserContext(); // Context 컴포넌트

    const login = async (username: string, password: string) => {

        try {
            const response = await handleLogin(username, password);

            if (response) {
                const authorizationHeader = response.headers["authorization"];

                if (authorizationHeader) {
                    const accessToken = authorizationHeader.split(" ")[1]; // Bearer {token} 형태이므로 토큰만 추출

                    // accessToken을 클라이언트 쿠키에 저장
                    saveToken(accessToken);


                    // jwt.utils.ts에서 함수 사용 유저 객체 추출
                    const { id, name, role } = extractUserInfoFromToken(accessToken);

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

                        // 유저 정보를 JWT로 만들어 userToken으로 js 쿠키에 저장.
                        const userPayload = {id: userData.id !!, name: userData.name !!,role};
                        //const userToken = createUserToken(userPayload);

                        // 백엔드 헤더에 보낼 유저객체 userToken
                        if(user) {
                            const userInfo: UserToken = {
                                userId: user.id !!,
                                userName: user.name !! ,
                                userRole: user.role !! ,
                            };
                            dispatch(saveUserToken({userInfo }))

                            localStorage.setItem("userToken", JSON.stringify(userInfo));

                            saveUserTokenToCookie(userInfo); // 유저인포 === 유저토큰

                            setUser(userData);  // 유저 정보를 Context에 저장

                            // 유저 ID로 주소 불러오기
                            const addresses = await fetchAllAddressesByUserId();
                            if (addresses) {
                                addresses.forEach((address) => {
                                    dispatch(addAddress(address));  // 불러온 주소를 Redux에 저장
                                    console.log("주소 저장 함수 탔음",address);
                                });
                                console.log("주소 정보 확인하는 코드 : " ,addresses)
                            }
                        }
                    }
                    // 로그인을 할 때 넣고,
                    // 주소 추가, 변동이 있을 때 리덕스에 또 넣으면 된다.
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
    return payload.id;  // 백엔드에서 JWT에 포함한 userId에 맞춰 변경
};
