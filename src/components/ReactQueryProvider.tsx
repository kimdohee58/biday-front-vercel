// src/app/components/ReactQueryProvider.tsx
'use client'; // 클라이언트 컴포넌트임을 명시

import React, { ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface ReactQueryProviderProps {
    children: ReactNode;
}

const ReactQueryProvider: React.FC<ReactQueryProviderProps> = ({ children }) => {
    // QueryClient을 상태로 관리하여 핫 리로딩 시 동일한 인스턴스를 유지
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {/* 개발 환경에서만 DevTools 표시 */}
        </QueryClientProvider>
    );
};

export default ReactQueryProvider;
