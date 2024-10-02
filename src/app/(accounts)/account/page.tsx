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
import {getUser} from "@/lib/features/user.slice";
import {initialUser} from "@/model/UserModel";

export default function AccountPage() {
    // const user = useSelector(getUser); // Redux에 저장된 유저 정보 가져오기
    const user = useSelector((state: RootState) => state.user.user || initialUser);  // Redux에서 유저 정보 가져오기
    const dispatch = useDispatch(); // 그러면 여기에서 유즈이팩을 사용을 해서, 새로고침을 하더라도 정보가 안날아가게.

    // 유즈이팩트 내부의 코드를 특정한ㅇ 객체, 특정 페이지가 렌더링이 될 때 사용하는거다. 마운트 주기를 맞출려고 하는거다.
    // 데이터랑 컴포넌트의 마운팅을 맞추기 위해서 유즈이팩트를 사용을 하는거다.
    useEffect(() => {
        if (user && user.name) {
            console.log("유저 정보가 없습니다. 로그인 필요 또는 redux-persist 설정 확인");
        } else {
            console.log("유저 정보:", user);
        }
    }, [user]);

    const [showPostcode, setShowPostcode] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState<string>("");

    // 주소 선택 완료 후 처리하는 함수
    const handleAddressComplete = (data: any) => {
        setSelectedAddress(data.address); // 주소 검색 결과에서 주소 선택
        setShowPostcode(false); // 주소 검색 창 닫기

        dispatch(addAddress({ // 주소 추가 액션 호출
            address1: data.address,
            zipcode: data.zonecode,
            type: 'home',
            pick: false,
            userId: user?.id || ''
        }));
    };




    return (
        <div className={`nc-AccountPage`}>
            <div className="space-y-10 sm:space-y-12">
                <h2 className="text-2xl sm:text-3xl font-semibold">회원정보</h2>
                <div className="flex flex-col md:flex-row">
                    <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">
                        {/* 이름 */}
                        <div>
                            <Label>이름</Label>
                            <Input className="mt-1.5" defaultValue={user.name} />
                        </div>

                        {/* 이메일 */}
                        <div>
                            <Label>이메일</Label>
                            <div className="mt-1.5 flex">
                                <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                                    <i className="text-2xl las la-envelope"></i>
                                </span>
                                <Input className="!rounded-l-none" defaultValue={user.email} />
                            </div>
                        </div>

                        {/* 핸드폰 번호 */}
                        <div>
                            <Label>전화번호</Label>
                            <div className="mt-1.5 flex">
                                <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                                    <i className="text-2xl las la-phone-volume"></i>
                                </span>
                                <Input className="!rounded-l-none" defaultValue={user.phoneNum} />
                            </div>
                        </div>

                        {/* 주소 입력란 */}
                        <div>
                            <Label>주소</Label>
                            <Input className="mt-1.5" value={selectedAddress} placeholder="주소를 선택하세요" readOnly />
                            <ButtonPrimary onClick={() => setShowPostcode(true)}>주소 추가하기</ButtonPrimary>
                        </div>

                        {/* 주소 검색 창 표시 */}
                        {showPostcode && (
                            <Postcode onComplete={handleAddressComplete} onClose={() => setShowPostcode(false)} />
                        )}

                        {/* 등급 */}
                        <div>
                            <Label>등급</Label>
                            <Textarea className="mt-1.5" defaultValue="..." />
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