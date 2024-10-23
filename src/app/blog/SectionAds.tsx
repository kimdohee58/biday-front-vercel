import React, { FC } from "react";
import imgAds from "@/images/ads.png";
import Image from "next/image";
import Link from "next/link";

export interface SectionAdsProps {
  className?: string;
}

const SectionAds: FC<SectionAdsProps> = ({ className = "" }) => {
  return (
    <Link href="/#" className={`nc-SectionAds block w-full ${className}`}>
      <Image alt="ads" className="w-full" src={imgAds} />
    </Link>
  );
};

export default SectionAds;
