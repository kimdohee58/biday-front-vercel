import React from "react";
import SectionHowItWork from "@/components/SectionHowItWork/SectionHowItWork";
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection";
import SectionSliderLargeProduct from "@/components/SectionSliderLargeProduct";
import SectionSliderProductCard from "@/components/SectionSliderProductCard";
import SectionGridMoreExplore from "@/components/SectionGridMoreExplore/SectionGridMoreExplore";
import { DEMO_MORE_EXPLORE_DATA_2 } from "@/components/SectionGridMoreExplore/data";
import SectionPromo2 from "@/components/SectionPromo2";
import SectionHero3 from "@/components/SectionHero/SectionHero3";
import SectionPromo1 from "@/components/SectionPromo1";
import { SPORT_PRODUCTS } from "@/data/data";
import SectionGridFeatureItems from "@/components/SectionGridFeatureItems";
import { RootState } from "@/lib/store";

export default function PageHome2() {

  return (
    <div className="nc-PageHome2 relative overflow-hidden">
      {/*<div className="container px-4">*/}
      {/*  <SectionHero3 />*/}
      {/*</div>*/}

      <div className="container relative space-y-24 my-24 lg:space-y-32 lg:my-32">
        {/*<SectionHowItWork />*/}

        {/*<SectionSliderProductCard*/}
        {/*  data={SPORT_PRODUCTS.filter((_, i) => i < 8)}*/}
        {/*  subHeading="New Sports equipment"*/}
        {/*/>*/}

        {/*<SectionPromo2 />*/}

        {/*<div className="relative py-24 lg:py-32">*/}
        {/*  <BackgroundSection />*/}
        {/*  <SectionGridMoreExplore data={DEMO_MORE_EXPLORE_DATA_2} />*/}
        {/*</div>*/}

        {/* SECTION */}
        <SectionGridFeatureItems data={SPORT_PRODUCTS} />

        <SectionPromo1 />

        <SectionSliderLargeProduct />
      </div>
    </div>
  );
}