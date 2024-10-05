"use client"
import React, { useState } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import { changepass } from "@/service/user/user.api";
import {getUser} from "@/lib/features/user.slice";
import {useSelector} from "react-redux"; // 비밀번호 변경 API 임포트

export default function AccountPass() {
  const user = useSelector(getUser); // Redux에서 유저 정보 가져오기
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  console.log("유저 정보 이메일 있는지 확인 : ", user);
  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      alert("새 비밀번호와 확인 비밀번호가 일치₩하지 않습니다.");
      return;
    }

    try {
      // Redux 상태에서 가져온 유저 정보 사용 (email 포함)
      const userModel = {
        id: user.user.id,  // 유저 ID
        email: user.user.email,  // 유저 이메일
        currentPassword: currentPassword, // 현재 비밀번호
        password: newPassword,  // 새 비밀번호
      };

      const response = await changepass(userModel); // 비밀번호 변경 API 호출
      console.log("response: ", response);
      console.log("유저 정보가 있는지 이메일이 있는지 확인 하는 로그 : " , user)
      console.log(localStorage.getItem('persist:root'));
      console.log("useSelector 이메일 확인 : ", user.user.email);
      alert("비밀번호가 성공적으로 변경되었습니다.");
    } catch (error) {
      alert("비밀번호 변경에 실패했습니다.");
      console.error(error);
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
          <div className="pt-2">
            <ButtonPrimary onClick={handlePasswordChange}>
              비밀번호 수정
            </ButtonPrimary>
          </div>
        </div>
      </div>
  );
}
