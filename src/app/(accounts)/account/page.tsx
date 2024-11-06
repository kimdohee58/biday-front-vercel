"use client"
import Label from "@/components/Label/Label";
import React, {useEffect, useState} from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import {RootState} from "@/lib/store";
import {useSelector} from "react-redux";
import {initialUser} from "@/model/user/user.model";
import {AddressModel} from "@/model/user/address.model";
import {insertAddress} from "@/service/user/address.api";
import Postcode from "@/components/Postcode";
import NcModal from "@/shared/NcModal/NcModal";
import {fetchAllAddressesByUserId, fetchDeleteAddress, fetchPickAddress} from "@/service/user/address.service";
import OrderList from "@/components/OrderList";
import {getAddresses} from "@/lib/features/user.slice";
import {saveUserTokenToCookie} from "@/utils/cookie/cookie.api";

const mapAddressType = (type: string) => {
    switch (type) {
        case "HOME":
            return "집";
        case "WORK":
            return "회사";
        case "OTHER":
            return "기본";
    }
};

export default function AccountPage() {
    const user = useSelector((state: RootState) => state.user.user || initialUser);
    const userToken = useSelector((state: RootState) => state.user.userInfo);
    const [addressId, setAddressId] = useState<string>("");
    const [selectedAddress, setSelectedAddress] = useState<string>("");
    const [addressDetail, setAddressDetail] = useState<string>("");
    const [addressType, setAddressType] = useState<string>("home");
    const [zipcode, setZipcode] = useState<string>("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [addresses, setAddresses] = useState<AddressModel[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const address = useSelector(getAddresses);
    saveUserTokenToCookie(userToken);

    const [formData, setFormData] = useState({
        addressId: "",
        selectedAddress: "",
        addressDetail: "",
        zipcode: "",
        addressType: "",
    });

    const handleAddressComplete = (data: any) => {
        setFormData({
            ...formData,
            selectedAddress: data.address,
            zipcode: data.zonecode,
        });
        setIsModalOpen(false);
    };

    const handleAddressTypeChange = (value: string) => {
        setFormData({...formData, addressType: value});
    };

    const handleUpdate = async () => {
        const newAddress: AddressModel = {
            id: "",
            userId: user.id || "",
            streetAddress: formData.selectedAddress || "",
            detailAddress: formData.addressDetail || "",
            zipcode: formData.zipcode || "",
            type: formData.addressType,
            pick: false,
            email: user.email || "",
        };

        try {
            if (userToken) {
                await insertAddress(userToken, newAddress);
                alert("주소가 성공적으로 추가되었습니다.");
                handleAddressComplete(newAddress);  // 주소 추가 후 모달 닫기
                loadAddresses();  // 주소 목록 새로고침
            } else {
                alert("유저 토큰이 없습니다.");
            }
        } catch (error) {
            console.error("주소 추가 실패: ", error);
            alert("주소 추가 중 오류가 발생했습니다.");
        }
    };

    const handlePickAddress = async (addressId: string) => {
        try {
            await fetchPickAddress(addressId);
            alert("주소가 기본 설정되었습니다.");
            loadAddresses();
        } catch (error) {
            console.error("pick 업데이트 중 오류가 발생했습니다:", error);
        }
    };

    const handleDeleteAddress = async (addressId: string) => {
        try {
            await fetchDeleteAddress(addressId);
            alert("주소가 삭제되었습니다.");
            loadAddresses();
        } catch (error) {
            console.error("주소 삭제 중 오류가 발생했습니다:", error);
            alert("주소 삭제 중 오류가 발생했습니다.");
        }
    };

    const loadAddresses = async () => {
        try {
            const addressList = await fetchAllAddressesByUserId();

            const sortedAddresses = addressList.sort((a, b) => (a.pick === b.pick) ? 0 : a.pick ? -1 : 1);
            setAddresses(sortedAddresses);

            if (sortedAddresses.length > 0) {
                const defaultAddress = sortedAddresses[0];
                setAddressId(defaultAddress.id);
                setSelectedAddress(defaultAddress.streetAddress);
                setAddressDetail(defaultAddress.detailAddress);
                setZipcode(defaultAddress.zipcode);
                setAddressType(defaultAddress.type);
            }
        } catch (err) {
            console.error("주소를 가져오는 중 에러가 발생했습니다:", err);
            setError("주소를 가져오는 중 에러가 발생했습니다.");
        }
    };

    useEffect(() => {
        loadAddresses();
    }, []);

    const [activeTab, setActiveTab] = useState<"order" | "bid" | "auction" | "win">("order");

    const renderContent = () => {
        switch (activeTab) {
            case "order":
                return <OrderList/>;

        }
    };


    return (
        <div className={`nc-AccountPage`}>
            <div className="space-y-10 sm:space-y-12">
                <h2 className="text-2xl sm:text-3xl font-semibold">회원정보</h2>
                <div className="flex flex-col md:flex-row">
                    <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <Label>이름</Label>
                                <div className="mt-1.5 flex">
                                    <span
                                        className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                                        <i className="text-2xl las la-user"></i> {/* 이름 아이콘 */}
                                    </span>
                                    <Input className="!rounded-l-none" defaultValue={user.name}
                                           disabled={true}/>
                                </div>
                            </div>
                            <div className="flex-1"> {/* 등급 입력 필드 */}
                                <Label>등급</Label>
                                <div className="mt-1.5 flex">
                                    <span
                                        className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                                        <i className="text-2xl las la-star"></i>
                                    </span>
                                    <Input
                                        className="!rounded-l-none"
                                        defaultValue={
                                            Array.isArray(user.role) && user.role.length > 0
                                                ? user.role[0] === 'ROLE_USER'
                                                    ? '회원'
                                                    : user.role[0] === 'ROLE_SELLER'
                                                        ? '판매자'
                                                        : user.role[0] === 'ROLE_ADMIN'
                                                            ? '관리자'
                                                            : '비회원'
                                                : '비회원'
                                        }
                                        disabled={true}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 이메일 */}
                        <div>
                            <Label>이메일</Label>
                            <div className="mt-1.5 flex">
                                <span
                                    className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                                    <i className="text-2xl las la-envelope"></i>
                                </span>
                                <Input className="!rounded-l-none" defaultValue={user.email}
                                       disabled={true}/>
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
                                <Input className="!rounded-l-none" defaultValue={user.phoneNum} disabled={true}/>
                            </div>
                        </div>

                        {/* 주소 목록 */}
                        <div>
                            {/* 주소와 우편번호를 수평으로 나란히 배치 */}
                            <div className="flex gap-4">
                                <div className="flex-1" style={{flex: "3 1 0%"}}>
                                    <Label>주소</Label>
                                    <div className="mt-1.5 flex">
                                        <span
                                            className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                                            <i className="text-2xl las la-map"></i> {/* 주소 아이콘 추가 */}
                                        </span>
                                        <Input
                                            className="!rounded-l-none"
                                            value={`${selectedAddress} ${addressDetail}`}
                                            placeholder="주소를 선택하세요"
                                            readOnly
                                            onClick={() => setShowDropdown(prev => !prev)} // 드롭다운 토글
                                        />
                                    </div>
                                </div>

                                <div className="flex-1" style={{flex: "1 1 0%"}}>
                                    <Label>우편번호</Label>
                                    <div className="mt-1.5 flex">
                                        <span
                                            className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                                            <i className="text-2xl las la-map-marker-alt"></i> {/* 아이콘 변경 가능 */}
                                        </span>
                                        <Input
                                            className="!rounded-l-none"
                                            value={zipcode}
                                            placeholder="우편번호"
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* 드롭다운 및 주소 선택 부분 */}
                            {showDropdown && (
                                <ul className="absolute z-10 bg-white border border-gray-300 rounded mt-1">
                                    {addresses.map((address, index) => (
                                        <li
                                            key={index}
                                            className="px-4 py-2 flex justify-between items-center cursor-pointer hover:bg-gray-100"
                                            onClick={() => {
                                                handlePickAddress(address.id);
                                                setSelectedAddress(address.streetAddress);
                                                setAddressDetail(address.detailAddress);
                                                setZipcode(address.zipcode);
                                                setAddressType(address.type);
                                                setShowDropdown(false);
                                            }}
                                        >
                                            <div>
                                            {/* streetAddress와 detailAddress를 합쳐서 표시하고, type을 매핑하여 표시 */}
                                                {`${address.streetAddress} ${address.detailAddress} (${mapAddressType(address.type)})`}
                                                <span
                                                    className="ml-2 text-gray-500">({address.zipcode})</span> {/* 우편번호 표시 */}
                                            </div>
                                            {/* 삭제 버튼 */}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation(); // 삭제 클릭 시 주소 선택되지 않도록 이벤트 전파 중지
                                                    handleDeleteAddress(address.id);
                                                }}
                                                className="text-red-600 hover:underline"
                                            >
                                                삭제
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>


                        {/* 주소 입력란 */}
                        <div className="flex justify-end w-full">
                            {/* 모달 트리거 버튼 */}
                            <NcModal
                                modalTitle="주소 검색"
                                triggerText={
                                    <ButtonPrimary
                                        className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-blue-700 transition duration-200 ease-in-out"
                                    >
                                        주소 추가하기
                                    </ButtonPrimary>
                                }
                                renderContent={() => (
                                    <div>
                                        <Postcode
                                            onComplete={handleAddressComplete}
                                            onClose={() => console.log("모달 닫기")}
                                        />

                                        {/* 주소 입력란 */}
                                        <div>
                                            <Label>주소</Label>
                                            <Input
                                                className="mt-1.5"
                                                value={formData.selectedAddress}
                                                placeholder="주소를 선택하세요"
                                                readOnly
                                            />
                                        </div>

                                        {/* 상세 주소 입력 */}
                                        <div>
                                            <Label>상세 주소</Label>
                                            <Input
                                                className="mt-1.5"
                                                value={formData.addressDetail}
                                                onChange={(e) =>
                                                    setFormData({...formData, addressDetail: e.target.value})
                                                }
                                            />
                                        </div>

                                        {/* 우편번호 */}
                                        <div>
                                            <Label>우편번호</Label>
                                            <Input
                                                className="mt-1.5"
                                                value={formData.zipcode}
                                                placeholder="우편번호"
                                                readOnly
                                            />
                                        </div>

                                        {/* 주소 유형 선택 */}
                                        <div>
                                            <Label>주소 유형</Label>
                                            <select
                                                value={formData.addressType}
                                                onChange={(e) => handleAddressTypeChange(e.target.value)}
                                                className="mt-2 px-4 py-2 border rounded-md"
                                            >
                                                <option value="HOME">집</option>
                                                <option value="WORK">회사</option>
                                                <option value="OTHER">기본</option>
                                            </select>
                                        </div>

                                        {/* 업데이트 버튼 */}
                                        <div className="pt-2">
                                            <ButtonPrimary onClick={handleUpdate}>주소 추가하기</ButtonPrimary>
                                        </div>
                                    </div>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
