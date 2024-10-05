"use client"
import {Poppins, Noto_Sans_KR} from "next/font/google";
import "./globals.css";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";
import "rc-slider/assets/index.css";
import Footer from "@/shared/Footer/Footer";
import SiteHeader from "@/app/SiteHeader";
import CommonClient from "./CommonClient";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import {Provider} from "react-redux"; // ReactQueryProvider 경로 확인
import Providers from "@/components/ReactQueryProvider"
import {PersistGate} from "redux-persist/integration/react";
import "./globals.css";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";
import "rc-slider/assets/index.css";
import {QueryClient} from "@tanstack/react-query";
import {makeStore, persistor} from "@/lib/store";
import {useEffect, useState} from "react";
import isClient from "beautiful-react-hooks/shared/isClient";  // store와 persistor 임포트

const poppins = Poppins({
    subsets: ["latin"],
    display: "swap",
    weight: ["300", "400", "500", "600", "700"],
});

const notoSans = Noto_Sans_KR({
    display: "swap",
    weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
    preload: false,
});

const store = makeStore();

const store = makeStore();

export default function RootLayout({
                                       children,
                                       params,
                                   }: {
    children: React.ReactNode;
    params: any;
}) {
    const [isClient, setIsClient] = useState(false);

    // 클라이언트 사이드에서만 Redux Persist 활성화
    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <html lang="ko" className={`${poppins.className}`}>
        <body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
        <Provider store={store}>
            {isClient ? (
                <PersistGate loading={null} persistor={persistor as any}>
                    <ReactQueryProvider>
                        <SiteHeader />
                        <main>{children}</main>
                        <Footer />
                    </ReactQueryProvider>
                </PersistGate>
            ) : (
                // 서버 사이드 렌더링 시 PersistGate를 제외
                <ReactQueryProvider>
                    <SiteHeader />
                    <main>{children}</main>
                    <Footer />
                </ReactQueryProvider>
            )}
        </Provider>
        <CommonClient />
        </body>
        </html>
    );
}