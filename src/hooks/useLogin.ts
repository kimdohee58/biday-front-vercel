//src/hooks/useLogin.ts
import {useRouter} from 'next/navigation';
import {useDispatch} from 'react-redux';
import {addAddress, saveUser, saveUserToken,} from '@/lib/features/user.slice';
import {handleLogin} from '@/service/user/login.api';
import {findUserById} from "@/service/user/user.api";
import {initialUser, UserModel} from "@/model/user/user.model";
import {extractUserInfoFromToken} from '@/utils/jwt.utils';
import {saveToken, saveUserTokenToCookie} from "@/utils/cookie/cookie.api";
import {UserToken} from "@/model/user/userToken";
import {useUserContext} from "@/utils/userContext"
import {fetchAllAddressesByUserId} from '@/service/user/address.service';

export const useLogin = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { setUser } = useUserContext(); // Context 컴포넌트

    const login = async (username: string, password: string): Promise<boolean> => {
        try {
            // axiosInstance를 사용하여 로그인 요청 보내기
            const response = await handleLogin(username, password);

            if (response) {
                const authorizationHeader = response.headers["authorization"];

                if (authorizationHeader) {
                    const accessToken = authorizationHeader.split(" ")[1];
                    saveToken(accessToken);

                    const { id, name, role } = extractUserInfoFromToken(accessToken);

                    const user = await findUserById(id);

                    if (user) {
                        const userData: UserModel = {
                            ...initialUser,
                            id: user.id !!,
                            name: user.name,
                            email: user.email,
                            phoneNum: user.phoneNum,
                            status: user.status ? String(user.status) : '',
                            role: user.role,
                        };

                        dispatch(saveUser({ user: userData, token: accessToken }));

                        // 백엔드 헤더에 보낼 유저 객체 userToken
                        const userInfo: UserToken = {
                            userId: user.id !!,
                            userName: user.name !!,
                            userRole: user.role !!,
                        };
                        dispatch(saveUserToken({ userInfo }));

                        localStorage.setItem("userToken", JSON.stringify(userInfo));

                        saveUserTokenToCookie(userInfo);
                        setUser(userData);  // 유저 정보를 Context에 저장

                        // 유저 ID로 주소 불러오기
                        const addresses = await fetchAllAddressesByUserId();
                        if (addresses) {
                            addresses.forEach((address) => {
                                dispatch(addAddress(address));  // 불러온 주소를 Redux에 저장
                            });
                        }

                        return true; // 로그인 성공
                    } else {
                        throw new Error("유저 정보를 찾을 수 없습니다.");
                    }
                } else {
                    throw new Error("Authorization 헤더가 없습니다.");
                }
            } else {
                window.alert('로그인 실패! 이메일이나 비밀번호를 확인해 주세요.');
                return false; // 로그인 실패
            }
        } catch (error) {
            console.error("서버랑 연결이 안됨. userLogin.ts:", error);
            window.alert('로그인 실패! 서버와 연결할 수 없습니다.');
            return false; // 서버와의 연결 실패
        }
    };
    return { login };
};

// JWT 토큰에서 유저 ID 추출 함수
const extractUserIdFromToken = (token: string): string => {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.id;
};