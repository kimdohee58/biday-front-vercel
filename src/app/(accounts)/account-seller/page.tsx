import React from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import { RootState } from "@/lib/store";

export default function AccountBilling  (){

  return (
    <div className="space-y-10 sm:space-y-12">
      {/* HEADING */}
      <h2 className="text-2xl sm:text-3xl font-semibold">계좌 등록</h2>
      <div className="max-w-2xl prose prose-slate dark:prose-invert">
        <span className="">

          <br />
          <br />
          설유정 소스 코드 .{``}
        </span>
        <div className="pt-10">
          <ButtonPrimary>판매자 등록</ButtonPrimary>
        </div>
      </div>
    </div>
  );
};

