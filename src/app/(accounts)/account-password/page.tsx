"use client"
import React, { useState } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import {changePasswordService} from "@/service/user/user.serivce";

export default function AccountPass() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null); // 오류 상태 관리


  const handlePasswordChange = async () => {
    // 비밀번호 확인 로직
    if (newPassword !== confirmPassword) {
      setError("새 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
      return;
    }

    await changePasswordService(currentPassword, newPassword);

  };


  return (
      <div className="space-y-10 sm:space-y-12">
        <h2 className="text-2xl sm:text-3xl font-semibold">비밀번호 변경</h2>
        <div className="max-w-xl space-y-6">
          {/* 현재 비밀번호 입력 */}
          <div>
            <label>현재 비밀번호</label>
            <Input
                type="password"
                className="mt-1.5"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>

          {/* 새 비밀번호 입력 */}
          <div>
            <label>새 비밀번호</label>
            <Input
                type="password"
                className="mt-1.5"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <span className="text-sm text-gray-500">
                비밀번호는 최소 8글자 이상이어야 하며, 대문자와 특수문자를 포함해야 합니다.
              </span>
          </div>

          {/* 새 비밀번호 확인 입력 */}
          <div>
            <label>새 비밀번호 확인</label>
            <Input
                type="password"
                className="mt-1.5"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* 오류 메시지 출력 */}
          {error && <p className="text-red-500">{error}</p>}

          {/* 비밀번호 수정 버튼 */}
          <div className="pt-2">
            <ButtonPrimary onClick={handlePasswordChange}>
              비밀번호 수정
            </ButtonPrimary>
          </div>
        </div>
      </div>
  );
}
