// src/app/components/ReactQueryProvider.tsx
"use client"
import React, {useState} from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';


function Providers({ children }: React.PropsWithChildren) {
    const [client] = useState(
        new QueryClient({
            defaultOptions: {
                queries: {
                    refetchOnWindowFocus: false,
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
