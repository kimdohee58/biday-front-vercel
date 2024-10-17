//src/utils/jwt.utils.ts
import { JwtPayload } from '@/model/api/JwtPayload';

// 철자 수정: base64Encode로 수정
const base64Encode = (data: string) => {
    return btoa(unescape(encodeURIComponent(data)));
}

export const extractUserInfoFromToken = (token: string): { id: string, name: string, role: string } => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
            .join('')
    );

    const payload = JSON.parse(jsonPayload);
    return {
        id: payload.id,
        name: payload.name,
        role: payload.role
    };
};

export const createUserToken = (payload: { id: string; name: string; role: string;  }) => {
    // 헤더
    const header = {
        alg: "HS256",
        typ: "JWT",
    };

    // 베이스64로 인코딩 된 헤더와 페이로드
    const encodedHeader = base64Encode(JSON.stringify(header));
    const encodedPayload = base64Encode(JSON.stringify(payload));

    // 서명은 클라이언트에서 보안이 불가능해서 빈 값으로 처리
    const signature = '';

    return `${encodedHeader}.${encodedPayload}.${signature}`;
}

