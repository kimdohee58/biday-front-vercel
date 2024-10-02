import {Poppins, Noto_Sans_KR} from "next/font/google";
import "./globals.css";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";
import "rc-slider/assets/index.css";
import Footer from "@/shared/Footer/Footer";
import SiteHeader from "@/app/SiteHeader";
import CommonClient from "./CommonClient";
import {QueryClient} from "@tanstack/react-query";
import Providers from "@/utils/providers";

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

export default function RootLayout({
                                       children,
                                       params,
                                   }: {
    children: React.ReactNode;
    params: any;
}) {
    return (
        <html lang="ko" dir="" className={`${poppins.className}`}>
        <body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
        <Providers>
            <div className="font-noto-sans-kr">
                <SiteHeader/>
                {children}
                <Footer/>
            </div>
            <CommonClient/>
        </Providers>
        </body>
        </html>
    );
}
