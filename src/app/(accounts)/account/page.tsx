//src/app/(accounts)/account/page.tsx
"use client"
import Label from "@/components/Label/Label";
import React, {FC, useEffect, useState} from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import Textarea from "@/shared/Textarea/Textarea";
import {RootState} from "@/lib/store";
import {useDispatch, useSelector} from "react-redux";
import Postcode from "@/components/Postcode";
import {addAddress, setAddresses} from "@/lib/features/address.slice";
import {getToken, getUser, saveUser} from "@/lib/features/user.slice";
import {updateUser} from "@/service/user/user.api";
import {initialUser} from "@/model//user/user.model";
import { AddressModel } from "@/model/user/address.model";
import {insertAddress} from "@/service/user/address.api";

export default function AccountPage() {
    const user = useSelector((state: RootState) => state.user.user || initialUser);
    const userToken = useSelector((state: RootState) => state.user.userInfo);
    const dispatch = useDispatch();

    const [selectedAddress, setSelectedAddress] = useState<string>("");
    const [addressDetail, setAddressDetail] = useState<string>("");
    const [addressType, setAddressType] = useState<string>("home");
    const [zipcode, setZipcode] = useState<string>("");
    const [showPostcode, setShowPostcode] = useState(false);

    const handleUpdate = async () => {
        const newAddress: AddressModel = {
            id: 0,
            userId: user.id || "",  // 리덕스에서 가져오는 userId 사용
            streetAddress: selectedAddress || "",
            detailAddress: addressDetail || "",
            zipcode: zipcode || "",
            type: addressType,
            pick: false,
            email: user.email || "",  // 사용자 이메일 사용
            address1: selectedAddress || "",
            address2: addressDetail || ""
        };
        console.log("newAddress: "   , newAddress)

        try {
            if (userToken) {
                // JWT 토큰을 Authorization 헤더로 추가
                await insertAddress(userToken, newAddress);  // userToken은 유저 객체임
                alert('주소가 성공적으로 추가되었습니다.');
            } else {
                alert('유저 토큰이 없습니다.');
            }
        } catch (error) {
            console.error('주소 추가 실패: ', error);
            alert('주소 추가 중 오류가 발생했습니다.');
        }
    };

    // 주소 검색 완료 후 처리
    const handleAddressComplete = (data: any) => {
        setSelectedAddress(data.address); // 주소 검색 결과 저장
        setZipcode(data.zonecode); // 우편번호 저장
        setShowPostcode(false); // 주소 검색 창 닫기
    }

    return (
        <div className={`nc-AccountPage`}>
            <div className="space-y-10 sm:space-y-12">
                <h2 className="text-2xl sm:text-3xl font-semibold">회원정보</h2>
                <div className="flex flex-col md:flex-row">
                    <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">
                        {/* 이름 */}
                        <div>
                            <Label>이름</Label>
                            <Input className="mt-1.5" defaultValue={user.name}/>
                        </div>

                        {/* 이메일 */}
                        <div>
                            <Label>이메일</Label>
                            <div className="mt-1.5 flex">
                                <span
                                    className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                                    <i className="text-2xl las la-envelope"></i>
                                </span>
                                <Input className="!rounded-l-none" defaultValue={user.email}/>
                            </div>
                        </div>

                        {/* 핸드폰 번호 */}
                        <div>
                            <Label>전화번호</Label>
                            <div className="mt-1.5 flex">
                                <span
                                    className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                                    <i className="text-2xl las la-phone-volume"></i>
                                </span>
                                <Input className="!rounded-l-none" defaultValue={user.phoneNum}/>
                            </div>
                        </div>

                        {/* 주소 입력란 */}
                        <div>
                            <Label>주소</Label>
                            <Input className="mt-1.5" value={selectedAddress} placeholder="주소를 선택하세요" readOnly/>
                            <ButtonPrimary onClick={() => setShowPostcode(true)}>주소 추가하기</ButtonPrimary>
                        </div>

                        {/* 상세 주소 입력*/}
                        <div>
                            <Label>상세 주소</Label>
                            <Input className="mt-1.5" value={addressDetail}
                                   onChange={(e) => setAddressDetail(e.target.value)}/>
                        </div>

                        {/* 우편 번호*/}
                        <div>
                            <Label>우편번호</Label>
                            <Input className="mt-1.5" value={zipcode} placeholder="우편번호" readOnly/>
                        </div>

                        {/* 주소 유형 선택*/}
                        <div>
                            <Label>주소 유형</Label>
                            <select value={addressType} onChange={(e) => setAddressType(e.target.value)}>
                                <option value="home">집</option>
                                <option value="home">회사</option>
                                <option value="home">기타</option>
                            </select>
                        </div>

                        {/* 주소 검색 창 표시 */}
                        {showPostcode && (
                            <Postcode onComplete={handleAddressComplete} onClose={() => setShowPostcode(false)}/>
                        )}

                        {/* 업데이트 버튼*/}
                        <div className="pt-4">
                            <ButtonPrimary onClick={handleUpdate}>주소 추가하기</ButtonPrimary>
                        </div>
                        {/* 등급 */}
                        <div>
                            <Label>등급</Label>
                            <Textarea className="mt-1.5" defaultValue="..."/>
                        </div>

                        <div className="pt-2">
                            <ButtonPrimary>회원정보수정</ButtonPrimary>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );


}
