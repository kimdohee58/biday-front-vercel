import {StaticImageData} from "next/image";
import {Route} from "@/routers/types";
import imageRightPng from "@/images/hero-right.png";
import imageRightPng2 from "@/images/hero-right-2.png";
import imageRightPng3 from "@/images/hero-right-3.png";

interface Hero2DataType {
  image: StaticImageData | string;
  heading: string;
  subHeading: string;
  btnText: string;
  btnLink: Route;
}

export const HERO2_DEMO_DATA: Hero2DataType[] = [
  {
    image: "/banner_waifu2x_art_noise1.png",
    heading: "Exclusive collection <br /> for everyone",
    subHeading: "마감 임박 경매 🔥",
    btnText: "Earn product now",
    btnLink: "/auction/last-chance",
  },
  {
    image: "/esfai_waifu2x_art_noise1.png",
    heading: "Exclusive collection <br /> for everyone",
    subHeading: "In this season, find the best 🔥",
    btnText: "Explore now",
    btnLink: "/search?keyword=esfai",
  },
  {
    image: "/espionage.png",
    heading: "Exclusive collection <br /> for everyone",
    subHeading: "In this season, find the best 🔥",
    btnText: "Explore now",
    btnLink: "/",
  },
];
