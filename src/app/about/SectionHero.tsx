import React, {FC, ReactNode} from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Image, {StaticImageData} from "next/image";

export interface SectionHeroProps {
  className?: string;
  rightImg: string | StaticImageData;
  heading: ReactNode;
  subHeading: string;
  btnText: string;
}

const SectionHero: FC<SectionHeroProps> = ({
  className = "",
  rightImg,
  heading,
  subHeading,
  btnText,
}) => {
  return (
    <div
      className={`nc-SectionHero relative ${className}`}
      data-nc-id="SectionHero"
    >
      <div className="flex flex-col lg:flex-row space-y-14 lg:space-y-0 lg:space-x-10 items-center relative text-center lg:text-left">
        <div className="w-screen max-w-full xl:max-w-lg space-y-5 lg:space-y-7">
          <h2 className="text-3xl !leading-tight font-semibold text-neutral-900 md:text-4xl xl:text-5xl dark:text-neutral-100">
            {heading}
          </h2>
          <span
              className="block text-base xl:text-lg text-neutral-6000 dark:text-neutral-400"
              style={{
                whiteSpace: 'normal', // 줄바꿈을 자동으로 처리
                overflowWrap: 'break-word',
                lineHeight: '1.5', // 줄 간격을 더 넓게 설정
                marginBottom: '1rem', // 각 단락 간의 간격 설정
              }}
          >
  저희 플랫폼은 중고 및 리셀 상품을 대상으로 한 경매 시스템을 도입하여, C2C (Consumer-to-Consumer) 거래를 활성화하고 있습니다.
  실시간 입찰과 낙찰을 통해 경쟁이 유도되며, 거래 성사 시 결제와 배송 관리가 원활히 이루어지도록 설계되었습니다.

  이러한 모델은 경매 기반의 중고/리셀 거래에서 수수료를 통해 수익을 창출하는 것을 목표로 하며,
  사용자 간의 활발한 상호작용을 통해 동적이고 효율적인 거래 환경을 제공합니다.
</span>

          {!!btnText && <ButtonPrimary href="/login">{btnText}</ButtonPrimary>}
        </div>
        <div className="flex-grow">
          <Image className="w-full" src={rightImg} alt="" priority/>
        </div>
      </div>
    </div>
  );
};

export default SectionHero;
