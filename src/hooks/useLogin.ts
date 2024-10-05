// src/hooks/useLogin.ts

import { useRouter } from 'next/navigation'; // next/navigation에서 useRouter 임포트
import { useDispatch } from 'react-redux';
import {saveUser, UserState} from '@/lib/features/user.slice';
import { handleLogin } from '@/service/user/login.api';
import {findUserById} from "@/service/user/user.api";
import {initialUser, UserModel} from "@/model/UserModel";  // API 호출을 임포트
import { extractUserInfoFromToken } from '@/utils/jwt.utils';
import {saveToken} from "@/utils/cookie/cookie.api";

export const useLogin = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const login = async (username: string, password: string) => {
        try {
            const response = await handleLogin(username, password);

            if (response) {
                // Authorization 헤더에서 토큰 추출
                const authorizationHeader = response.headers.get("Authorization");

                console.log("authorizationHeader 들어오는 확인 하는 코드 :  ", authorizationHeader)
                if (authorizationHeader) {
                    const token = authorizationHeader.split(" ")[1]; // Bearer {token} 형태이므로 토큰만 추출

                    // 토큰 저장 (쿠키 또는 로컬 스토리지)
                    saveToken(token);

                    // jwt.utils.ts에서 작성한 함수 사용
                    const { id, name, role } = extractUserInfoFromToken(token);
                    console.log("페이로드 한 유저 정보 저장 jwt.utils.ts: ", id, name, role);

                    // 토큰에서 유저 정보 추출 (userId,name,role)
                    const userId = extractUserIdFromToken(token);  // JWT 토큰에서 userId 추출
                    console.log("JWT 토큰에서 userId 쪼개기 : ", userId);

                    // 유저 ID로 유저 정보 가져오기
                    const user = await findUserById(userId);

                    if (user) {
                        // UserModel에 맞게 데이터 변환
                        const userData : UserModel = {
                                ...initialUser,  // 초기값을 기반으로
                                id: user.id, // 백엔드에서 받은 id
                                name: user.name,  // 백엔드에서 받은 name
                                email: user.email,  // 백엔드에서 받은 email
                                phoneNum: user.phoneNum,  // 백엔드에서 받은 phone
                                status: user.status ? String(user.status) : '',  // boolean인 status를 문자열로 변환
                        };

                        // Redux store에 유저 정보를 저장
                        dispatch(saveUser({ user: userData, token }));  // 유저 정보와 토큰을 Redux에 저장
                        console.log("유저 정보 Redux에 저장 완료:", userData);
                        console.log("유저 정보 토큰 리덕스에 저장 했는지 확인 : ", userData, token);
                        console.log("이메일 있는지 확인 ;  ", userData.email); // 개발자 모드 콘솔에 user4@naver.com 값이 나와
                    }

                    // 로그인 성공 후 메인 페이지로 리다이렉트
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

// extractUserIdFromToken 이 함수는
// JWT에서 유저 ID를 추출하는 기능입니다.

// 리덕스에 토큰과 쿠키, 개인정보,
// 유저 로컬스토리지 잘 털려여ㅛ. 로컬스토리지, 리덕스 스토리지는 전혀 반대이다.
// 로컬 스토리지는 종이에 전화 받으면서 몇시에 만날꺼야. 절대안없이지지 찌기전에,
// 리덕스는 이북같은거,

// 사람 에너지가 똑같이 있는데, 효율적이지가 않다.
// 뛰어야 할 때 뛰어야 한다. 쉴 때 쉬어야 한다.
// 가슴에 딱 얹고, 내 자신한테 열심히 한다는걸 증명하기 위해서 하는건지,
// 밤새서 하면 서사는 멋있는데 효율적이지가 않잖아요.
// 어쨋든 사람은 하룻밤 밤을 새고 하는데 삼일에

// 효율성이 낮다.
// 로그인 하는데 너무 시간이 오래 걸린다.
// 다른 팀원들은 저 친구 밤 새서 하는데 저 친구 한테 뭐라고 할 수 없잖아.
// 항상 제 시간에 왔잖아.
// 유정이도 그렇고,
// 같이 있어야한다.

// 아아티, 머리 좋고 나쁘고 하는게 아니라, 시험 머리 공부로 하는게 아니다.
// 이런 프로젝으 작업은, 두뇌로 하는게 맞아.
// 뒤로갈수록 어렵게 느껴진다.
// 규치적으로 사용을 해야 한다.

// 강조하고 싶은게 효율적이다.
// 시간을 추가를 하는거에 있어서 너무 늦게 나온다.
// 유즈 클라이언트 말하는거다. 이게 깨지면 안된다.
// 패턴이 깨지면 못참는다.


// 리덕스에서 유즈 이팩트
// 리덕스 흐름 CRUD 빠르게, 아는게 아니라. 알았다고 하는게 아니라,
// 무심하게 빠르게

// 주영씨거 API, Service

// 금욜날 프론트 되는거 합쳐서 테스트 해보자.

// 게이트웨이 서버, 여기서 8080 호출을 하면, 될꺼다.

// 자바스크립트 만든 사람이 객체지향 좆같아서 만든거다.
// 그래서 컴포넌트를 재사용을 안할꺼면, 굳이 안나눠도 된다.

// 단순작업