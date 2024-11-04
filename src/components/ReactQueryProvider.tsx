// src/app/components/ReactQueryProvider.tsx
"use client"
import React, {useState} from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';


function Providers({ children }: React.PropsWithChildren) {
    const [client] = useState(
        new QueryClient({
            defaultOptions: {
                queries: {
                    refetchOnWindowFocus: false,
                    refetchOnReconnect: false,
                    retryOnMount: true,
                    retry: false,
                }
            }
        })
    )

    return (
        <QueryClientProvider client={client}>
            <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
            <ReactQueryDevtools initialIsOpen={process.env.NEXT_PUBLIC_MODE === 'local'}/>
        </QueryClientProvider>
    );
}

export default Providers;
