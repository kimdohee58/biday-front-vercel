import rightImg from "@/images/hero-right1.png";
import React from "react";
import SectionFounder from "./SectionFounder";
import SectionStatistic from "./SectionStatistic";
import BgGlassmorphism from "@/components/BgGlassmorphism/BgGlassmorphism";
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection";
import SectionHero from "./SectionHero";
import SectionClientSay from "@/components/SectionClientSay/SectionClientSay";
import SectionPromo3 from "@/components/SectionPromo3";

export default function PageAbout  ({}){
  return (
    <div className={`nc-PageAbout overflow-hidden relative`}>
      {/* ======== BG GLASS ======== */}
      <BgGlassmorphism />

      <div className="container py-16 lg:py-28 space-y-16 lg:space-y-28">
        <SectionHero
          rightImg={rightImg}
          heading="👋 About Us."
          btnText=""
          subHeading="저희 플랫폼은 중고 및 리셀 상품을 대상으로 한 경매 시스템을 도입하여, C2C (Consumer-to-Consumer) 거래를 활성화하고 있습니다. 실시간 입찰과 낙찰을 통해 경쟁이 유도되며, 거래 성사 시 결제와 배송 관리가 원활히 이루어지도록 설계되었습니다. 이러한 모델은 경매 기반의 중고/리셀 거래에서 수수료를 통해 수익을 창출하는 것을 목표로 하며, 사용자 간의 활발한 상호작용을 통해 동적이고 효율적인 거래 환경을 제공합니다."
        />

        <SectionFounder />
        <div className="relative py-16">
          <BackgroundSection />
          <SectionClientSay />
        </div>

        <SectionStatistic />

        <SectionPromo3 />
      </div>
    </div>
  );
};

