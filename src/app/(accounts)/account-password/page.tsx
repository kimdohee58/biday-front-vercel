"use client";
import React, {useState} from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import {useLogout} from "@/hooks/useLogout";
import {useRouter} from "next/navigation";
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
      const response = await changePasswordService(currentPassword, newPassword);

      if (response === "비밀번호 변경이 완료했습니다.") {
        setSuccessMessage("비밀번호가 성공적으로 변경되었습니다.");
        alert("비밀번호 변경이 됐습니다. 다시 로그인 해주세요.")
        await handleLogout();
        router.push('/login');
        return;
      } else if (response === "예전 비밀번호가 틀렸습니다.") {
        setError("현재 비밀번호가 틀립니다.");
      }
      else {

        setError("비밀번호 변경 중 오류가 발생했습니다.");
      }
    } catch (err) {
      setError("비밀번호 변경에 실패했습니다.");
      console.error("비밀번호 변경 실패: ", err);
    }
  }


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