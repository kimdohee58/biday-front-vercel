import React, {FC} from "react";
import Heading from "@/components/Heading/Heading";

export interface Statistic {
  id: string;
  heading: string;
  subHeading: string;
}

const FOUNDER_DEMO: Statistic[] = [
  {
    id: "1",
    heading: "1,000,000",
    subHeading:
      "전 세계에서 공개된 기사 수 (2021년 9월 30일 기준)",
  },
  {
    id: "2",
    heading: "100,000",
    subHeading: "등록된 사용자 계정 수 (2021년 9월 30일 기준)",
  },
  {
    id: "3",
    heading: "220+",
    subHeading:
      "진출한 국가 및 지역 수 (2021년 9월 30일 기준)",
  },
];

export interface SectionStatisticProps {
  className?: string;
}

const SectionStatistic: FC<SectionStatisticProps> = ({ className = "" }) => {
  return (
    <div className={`nc-SectionStatistic relative ${className}`}>
      <Heading
        desc="우리는 독창적이고 뛰어난 프로그램과 콘텐츠를 통해 새로운 경험을 제공합니다."
      >
        🚀 Fast Facts
      </Heading>
      <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-3 xl:gap-8">
        {FOUNDER_DEMO.map((item) => (
          <div
            key={item.id}
            className="p-6 bg-neutral-50 dark:bg-neutral-800 rounded-2xl dark:border-neutral-800"
          >
            <h3 className="text-2xl font-semibold leading-none text-neutral-900 md:text-3xl dark:text-neutral-200">
              {item.heading}
            </h3>
            <span className="block text-sm text-neutral-500 mt-3 sm:text-base dark:text-neutral-400">
              {item.subHeading}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionStatistic;
