"use client";
import React, { useState } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import { useLogout } from "@/hooks/useLogout";
import { useRouter } from "next/navigation";
import {changePasswordService} from "@/service/user/user.serivce";

export default function AccountPass() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { handleLogout } = useLogout();
  const router = useRouter();

  const handlePasswordChange = async () => {
    setError(null);
    setSuccessMessage(null);

    // 비밀번호 유효성 검사
    if (newPassword !== confirmPassword) {
      setError("새 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
      return;
    }

    if (newPassword.length < 8) {
      setError("비밀번호는 최소 8글자 이상이어야 합니다.");
      return;
    }
    if (!/[A-Z]/.test(newPassword)) {
      setError("비밀번호에는 최소 1개 이상의 대문자가 포함되어야 합니다.");
      return;
    }
    if (!/[^A-Za-z0-9]/.test(newPassword)) {
      setError("비밀번호에는 최소 1개 이상의 특수문자가 포함되어야 합니다.");
      return;
    }
    if (!/[0-9]/.test(newPassword)) {
      setError("비밀번호에는 최소 1개 이상의 숫자가 포함되어야 합니다.");
      return;
    }

    try {
      // 비밀번호 변경 API 호출
      await changePasswordService(currentPassword, newPassword);

      // 비밀번호 변경 성공 시
      setSuccessMessage("비밀번호가 성공적으로 변경되었습니다.");
      await handleLogout(); // 로그아웃
      router.push('/login'); // 로그인 페이지로 이동
    } catch (err) {
      // 비밀번호 변경 실패 시
      setError("현재 비밀번호가 틀립니다.");
      console.error("비밀번호 변경 실패: ", err);
    }
  };

  return (
      <div className="space-y-10 sm:space-y-12">
        <h2 className="text-2xl sm:text-3xl font-semibold">비밀번호 변경</h2>
        <div className="max-w-xl space-y-6">
          <div>
            <label>현재 비밀번호</label>
            <Input
                type="password"
                className="mt-1.5"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>

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
          {successMessage && <p className="text-green-500">{successMessage}</p>}

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
