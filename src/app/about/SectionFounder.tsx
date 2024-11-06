import Heading from "@/components/Heading/Heading";
import React from "react";
import NcImage from "@/shared/NcImage/NcImage";

export interface People {
  id: string;
  name: string;
  job: string;
  avatar: string;
}

const FOUNDER_DEMO: People[] = [
  {
    id: "1",
    name: `Gabriel (김영우)`,
    job: "Co-founder and Chief Executive",
    avatar:
        "/woo.jpg",
  },
  {
    id: "2",
    name: `Raphael (정휘재)`,
    job: "Co-founder, Chairman",
    avatar:
        "/hwi.jpg",
  },
  {
    id: "3",
    name: `Celestia (송준한)`,
    job: "Co-Founder, Chief Strategy Officer",
    avatar:
        "/song.jpg",
  },
  {
    id: "4",
    name: `Seraphina (설유정)`,
    job: "Co-founder, Chief Technology Officer",
    avatar:
        "/shull.jpg",
  },
  {
    id: "5",
    name: `Michael (김도희)`,
    job: "Co-Founder, Chief Operating Officer",
    avatar:
        "/hee.jpg",
  },
];

const SectionFounder = () => {
  return (
    <div className="nc-SectionFounder relative">
      <Heading
        desc="특별한 이야기를 만들어가는 BiDay 팀원을 소개합니다."
      >
        ⛱ Founder
      </Heading>
      <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-5 xl:gap-x-8">
        {FOUNDER_DEMO.map((item) => (
            <div key={item.id} className="max-w-sm">
              <NcImage
                  alt=""
                  fill
                  sizes="300px"
                  // width={500} // 원하는 너비
                  // height={500} // 원하는 높이
                  containerClassName="relative h-0 aspect-h-1 aspect-w-1 rounded-xl overflow-hidden"
                  className="absolute inset-0 object-cover"
                  // className="absolute inset-0 object-contain"
                  src={item.avatar}
              />
              <h3 className="text-lg font-semibold text-neutral-900 mt-4 md:text-xl dark:text-neutral-200">
                {item.name}
              </h3>
              <span className="block text-sm text-neutral-500 sm:text-base dark:text-neutral-400">
        {item.job}
      </span>
            </div>
        ))}
      </div>
    </div>
  );
};

export default SectionFounder;
