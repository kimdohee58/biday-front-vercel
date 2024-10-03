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
import {makeStore, persistor} from "@/lib/store";
import {Provider} from "react-redux"; // ReactQueryProvider 경로 확인
import Providers from "@/components/ReactQueryProvider"
import {PersistGate} from "redux-persist/integration/react";
import "./globals.css";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";
import "rc-slider/assets/index.css";
import {QueryClient} from "@tanstack/react-query";

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
