// src/app/page.tsx (서버 컴포넌트)
import ClientComponent from './client-component'; // 클라이언트 컴포넌트 import
import {cookies, headers} from 'next/headers';

export default function PageHome() {
    // 서버 사이드에서 Authorization 헤더 가져오기
    const cookieStore = cookies();
    const authorizationToken = cookieStore.get('Authorization')?.value || '';
    console.log("한국어", authorizationToken);
    console.log("한국어",authorizationToken)

    // 서버 컴포넌트에서 받은 토큰을 클라이언트 컴포넌트로 전달
    return (
        <div>
            <ClientComponent authorizationToken={authorizationToken} />
        </div>
    );
}
