//src/app/layout.tsx
"use client"
import {Poppins} from "next/font/google";
import "./globals.css";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";
import "rc-slider/assets/index.css";
import Footer from "@/shared/Footer/Footer";
import SiteHeader from "@/app/SiteHeader";
import CommonClient from "./CommonClient";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import {makeStore, persistor} from "@/lib/store";
import {Provider} from "react-redux"; // ReactQueryProvider 경로 확인
import Providers from "@/components/ReactQueryProvider"
import {PersistGate} from "redux-persist/integration/react";

const poppins = Poppins({
    subsets: ["latin"],
    display: "swap",
    weight: ["300", "400", "500", "600", "700"],
});

const store = makeStore();


export default function RootLayout({children,}: { children: React.ReactNode; }) {

    return (
        <html lang="en" dir="" className={poppins.className}>
        <body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
        <div>
            <SiteHeader/>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <ReactQueryProvider>
                        <Providers>
                            {children}
                        </Providers>
                    </ReactQueryProvider>
                </PersistGate>
            </Provider>
            <Footer/>
        </div>
        <CommonClient/>
        </body>
        </html>
    );
}

// layout.tsx 파일에 redux-persist를 추가하는 이유는
// 전역 상태 관리를 통해 어플리케이션의 모든 페이지에서 상태를 지속적으로 유지하기 위해서입니다.
// redux-persist를 설정하면 상태를 로컬 스토리지(localStorage)에 저장하여,
// 새로고침 또는 페이지 이동 시에도 상태가 초기화되지 않고 유지됩니다.

