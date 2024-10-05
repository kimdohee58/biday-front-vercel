//src/model/naverLogin.ts
interface NaverLoginOptions {
    clientId: string;
    callbackUrl: string;
    isPopup?: boolean;
    loginButton?: {
        color?: string;
        type?: number;
        height?: number;
    };
}

interface NaverLogin {
    new(options: NaverLoginOptions): {
        init: () => void;
    }
}

interface Window{
    naver:{
        LoginWithNaverId: NaverLogin; // 네이버 로그인 인스턴스
    }
}