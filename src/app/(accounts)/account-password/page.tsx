import Label from "@/components/Label/Label";
import React from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import { RootState } from "@/lib/store";

export default function AccountPass()  {
  return (
    <div className="space-y-10 sm:space-y-12">
      {/* HEADING */}
      <h2 className="text-2xl sm:text-3xl font-semibold">
        비밀번호변경
      </h2>
      <div className=" max-w-xl space-y-6">
        <div>
          <Label>현재 비밀번호 </Label>
          <Input type="password" className="mt-1.5" />
        </div>
        <div>
          <Label>새로운 비밀번호 </Label>
          <Input type="password" className="mt-1.5" />
        </div>
        <div>
          <Label>다시한번만확인해주세요.</Label>
          <Input type="password" className="mt-1.5" />
        </div>
        <div className="pt-2">
          <ButtonPrimary>비밀번호 수정</ButtonPrimary>
        </div>
      </div>
    </div>
  );
};

