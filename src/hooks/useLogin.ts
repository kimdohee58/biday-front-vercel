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
    const {setUser} = useUserContext(); // Context 컴포넌트

    const login = async (username: string, password: string) => {

        try {
            const response = await handleLogin(username, password);

            if (response) {
                const authorizationHeader = response.headers["authorization"];

                if (authorizationHeader) {
                    const accessToken = authorizationHeader.split(" ")[1];

                    saveToken(accessToken);

                    const {id, name, role} = extractUserInfoFromToken(accessToken);

                    const user = await findUserById(id);

                    if (user) {
                        const userData: UserModel = {
                            ...initialUser,
                            id: user.id !!,
                            name: user.name,
                            email: user.email,
                            phoneNum: user.phoneNum,
                            status: user.status ? String(user.status) : '',
                        };

                        dispatch(saveUser({user: userData, token: accessToken}));

                        // 백엔드 헤더에 보낼 유저객체 userToken
                        if (user) {
                            const userInfo: UserToken = {
                                userId: user.id !!,
                                userName: user.name !!,
                                userRole: user.role !!,
                            };
                            dispatch(saveUserToken({userInfo}))

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
    return {login};
};

// JWT 토큰에서 유저 ID 추출 함수
const extractUserIdFromToken = (token: string): string => {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.id;
};