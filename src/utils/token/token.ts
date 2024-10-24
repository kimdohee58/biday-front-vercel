//src/utils/token/token.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import {getTokenRemainingTime} from "@/utils/cookie/cookie.api";
import {handleReissueToken} from "@/utils/reissue/reissueToken";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { returnUrl } = req.query;
        // Your logic to generate token data
        res.status(200).json({
            enc_data: 'example_enc_data',
            token_version_id: 'example_token_version_id',
            integrity_value: 'example_integrity_value'
        });
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

// userToken 배열, 인코딩 껴놓은거 유정이가 ㅁ나든걸로 껴 놓으면 된다.

// Authorization 헤더에서 Bearer 토큰을 추출하는 함수
const extractAccessTokenFromHeader = (authorizationHeader: string | null): string | null => {
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        console.error('Authorization 헤더가 잘못되었습니다.');
        return null;
    }

    // "Bearer " 다음의 실제 토큰 값을 추출
    return authorizationHeader.split(' ')[1];
};

// JWT 토큰 남은 시간 기반으로 토큰 재발급을 체크하는 함수
export const checkTokenAndReissueIfNeeded = async (authorizationHeader: string | null) => {

    console.log("authorizationHeader",authorizationHeader)
    console.log("authorizationHeader 있는지 확인하는 코드 : " , authorizationHeader)
    // const token = extractAccessTokenFromHeader(authorizationHeader);
    const token = authorizationHeader

    if (!token) {
        console.error('액세스 토큰을 찾을 수 없습니다.');
        return;
    }

    const timeRemaining = getTokenRemainingTime(token);
    console.log(timeRemaining)

    // 남은 시간이 5분 이하인 경우 (300초)
    if (timeRemaining !== null && timeRemaining <= 600) {
        console.log(`토큰 만료까지 ${timeRemaining}초 남았습니다. 토큰을 재발급합니다.`);
        await handleReissueToken();
    } else {
        console.log(`토큰이 아직 유효합니다. 남은 시간: ${timeRemaining}초`);
    }
};
