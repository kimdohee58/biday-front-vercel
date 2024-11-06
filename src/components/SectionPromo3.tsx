import React, {FC} from "react";
import NcImage from "@/shared/NcImage/NcImage";
import rightImgDemo from "@/images/promo3.png";
import backgroundLineSvg from "@/images/BackgroundLine.svg";
import Badge from "@/shared/Badge/Badge";
import Input from "@/shared/Input/Input";
import ButtonCircle from "@/shared/Button/ButtonCircle";
import {ArrowSmallRightIcon} from "@heroicons/react/24/solid";
import Image from "next/image";

export interface SectionPromo3Props {
    className?: string;
}

const SectionPromo3: FC<SectionPromo3Props> = ({className = "lg:pt-10"}) => {
    return (
        <div className={`nc-SectionPromo3 ${className}`}>
            <div
                className="relative flex flex-col lg:flex-row bg-slate-50 dark:bg-slate-800 rounded-2xl sm:rounded-[40px] p-4 pb-0 sm:p-5 sm:pb-0 lg:p-24">
                <div className="absolute inset-0">
                    <Image
                        fill
                        className="absolute w-full h-full object-contain object-bottom dark:opacity-5"
                        src={backgroundLineSvg}
                        alt="backgroundLineSvg"
                    />
                </div>

                <div className="lg:w-[50%] max-w-lg relative">
                    <h2 className="font-semibold text-4xl md:text-5xl">
                        {`특별한 혜택을 놓치지 마세요`}
                    </h2>
                    <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
            최신 뉴스, 할인 조합, 할인 코드에 대한 정보를 받으려면 등록하세요
          </span>
                    <ul className="space-y-4 mt-10">
                        <li className="flex items-center space-x-4">
                            <Badge color="purple" name="01"/>
                            <span className="font-medium text-neutral-700 dark:text-neutral-300">
                할인 조합
              </span>
                        </li>
                        <li className="flex items-center space-x-4">
                            <Badge name="02"/>
                            <span className="font-medium text-neutral-700 dark:text-neutral-300">
                무료 배송
              </span>
                        </li>
                        <li className="flex items-center space-x-4">
                            <Badge color="red" name="03"/>
                            <span className="font-medium text-neutral-700 dark:text-neutral-300">
                프리미엄 잡지
              </span>
                        </li>
                    </ul>
                    <form className="mt-10 relative max-w-sm">
                        <Input
                            required
                            aria-required
                            placeholder="Enter your email"
                            type="email"
                            rounded="rounded-full"
                        />
                        <ButtonCircle
                            type="submit"
                            className="absolute transform top-1/2 -translate-y-1/2 right-1"
                        >
                            <ArrowSmallRightIcon className="w-6 h-6"/>
                        </ButtonCircle>
                    </form>
                </div>

                <NcImage
                    alt=""
                    width={1200} // 원하는 너비
                    height={1500}
                    containerClassName="relative block lg:absolute lg:right-0 lg:bottom-0 mt-20 md:mt-10 lg:mt-0 max-w-lg lg:max-w-[calc(50%-40px)]"
                    src="/dohee_handshaking-removebg-preview_waifu2x_art_noise3_scale_waifu2x_art_noise3_scale.png"
                    sizes="(max-width: 768px) 120vw, 70vw"
                    className="mx-auto"
                />
            </div>
        </div>
    );
};

export default SectionPromo3;
