//src/app/layout.tsx
import {Poppins, Noto_Sans_KR} from "next/font/google";
import "./globals.css";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";
import "rc-slider/assets/index.css";
import Footer from "@/shared/Footer/Footer";
import SiteHeader from "@/app/SiteHeader";
import CommonClient from "./CommonClient";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import "./globals.css";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";
import "rc-slider/assets/index.css";
import {AuthProvider} from "@/context/AuthContext";
import ClientReduxProvider from "@/features/auth/ClientReduxProvider";
import {UserProvider} from "@/utils/userContext";

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


export default function RootLayout({children, params,}: {
    children: React.ReactNode; params: any;
}) {

  // 입찰정보, 낙찰정보, 결제정보,마이페이지에서 네비게이션이 5개로 늘려야 한다. / 비밀번호 변경을,모달로 해서 하던가,

    return (
        <html lang="ko" className={`${poppins.className}`}>
        <body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
        <ClientReduxProvider>
            <ReactQueryProvider>
                <UserProvider>
                    <SiteHeader/>
                    <main>{children}</main>
                    <Footer/>
                </UserProvider>
            </ReactQueryProvider>
            <CommonClient/>
        </ClientReduxProvider>
        </body>
        </html>
    );
}