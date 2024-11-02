import React, {ReactNode, useEffect, useState} from 'react';
import {TermsModalContent} from './TermsModalContent';
import {PrivacyOptionModelContent} from "@/components/dohee/PrivacyOptionModelContent";
import {PrivacyModelContent} from "@/components/SignUp/PrivacyModelContent";

//TODO 체크 하나라도 누락될 시 모두 동의 되지 않도록 변경

interface ModalProps {
    title: string;
    content: ReactNode;
    onClose: () => void
}

const Modal = ({title, content, onClose} : ModalProps) => {
    const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
             onClick={handleClickOutside}>
            <div className="bg-white p-6 rounded-2xl shadow-lg w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 h-auto max-h-[80vh] overflow-hidden"
                 onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center border-b border-gray-300 pb-4">
                    <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
                    <button onClick={onClose}
                            className="text-red-600 font-bold hover:text-red-800 transition duration-200">
                        닫기
                    </button>
                </div>
                <div className="mt-4 h-full overflow-y-auto max-h-[60vh]">
                    {content}
                </div>
            </div>
        </div>
    );

};

interface CheckBoxWithModalProps {
    checked: boolean,
    onChange: () => void,
    label: string,
    ModalContent: React.ComponentType;
}

const CheckboxWithModal = ({checked, onChange, label, ModalContent}: CheckBoxWithModalProps) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="flex items-center mt-2 justify-between">
            <div className="flex items-center">
                <input type="checkbox" checked={checked} onChange={onChange} className="mr-2"/>
                <span>{label}</span>
            </div>
            <button onClick={(event) => {
                event.stopPropagation(); // 이벤트 전파를 막음
                setShowModal(true);
            }} className="text-blue-500 hover:underline">
                내용 보기
            </button>
            {showModal && (
                <Modal
                    title={label}
                    content={<ModalContent/>}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
};

interface TermsAgreementProps {
    onTermsChange: (checkedTerms: string[]) => void;
}

function TermsAgreement({onTermsChange}: TermsAgreementProps) {
    const [allChecked, setAllChecked] = useState(false);
    const [checkedStates, setCheckedStates] = useState<Record<string, boolean>>({
        age: false,
        terms: false,
        privacy: false,
        privacyOption: false,
        ads: false,
    });
    const [showAdsOptions, setShowAdsOptions] = useState(false);

    useEffect(() => {
        // 부모 컴포넌트에서 전달받은 이벤트가 발생할 때 체크된 항목 전달
        const checkedTerms = Object.keys(checkedStates).filter((key) => checkedStates[key]);
        onTermsChange(checkedTerms);
    }, [checkedStates]);

    const handleAllChecked = () => {
        const newState = !allChecked;
        setAllChecked(newState);
        setCheckedStates((prev) => ({
            ...prev,
            age: newState,
            terms: newState,
            privacy: newState,
            privacyOption: newState,
            ads: newState,
        }));

        // 광고 관련 체크박스 상태 업데이트
        if (newState) {
            setCheckedStates((prev) => ({
                ...prev,
                '이메일 수신': true,
                '앱 푸시 수신': true,
                '문자 메시지 수신': true,
            }));
        } else {
            setCheckedStates((prev) => ({
                ...prev,
                '이메일 수신': false,
                '앱 푸시 수신': false,
                '문자 메시지 수신': false,
            }));
        }
    };

    const handleAdsChecked = () => {
        const newState = !checkedStates.ads;
        setCheckedStates((prev) => ({
            ...prev,
            ads: newState,
        }));

        // 광고 관련 체크박스 상태 업데이트
        if (newState) {
            setCheckedStates((prev) => ({
                ...prev,
                '이메일 수신': true,
                '앱 푸시 수신': true,
                '문자 메시지 수신': true,
            }));
        } else {
            setCheckedStates((prev) => ({
                ...prev,
                '이메일 수신': false,
                '앱 푸시 수신': false,
                '문자 메시지 수신': false,
            }));
        }
    };

    const renderAdsOptions = () => (
        <>
            {['이메일 수신', '앱 푸시 수신', '문자 메시지 수신'].map((label, index) => (
                <div className="flex items-center mt-1" key={index}>
                    <input
                        type="checkbox"
                        checked={checkedStates[label]} // 각 항목에 대해 체크 상태를 관리
                        onChange={() => setCheckedStates((prev) => ({...prev, [label]: !prev[label]}))}
                        className="mr-2"
                    />
                    <span>{label}</span>
                </div>
            ))}
        </>
    );

    return (
        <div className="terms-agreement-section p-4 bg-gray-100 rounded-md shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">이용약관 동의</h2>

            <div className="flex items-center mb-4">
                <input
                    type="checkbox"
                    checked={allChecked}
                    onChange={handleAllChecked}
                    className="mr-3 h-6 w-6 accent-green-500"
                />
                <span className="text-base font-semibold text-gray-700">모두 동의합니다 (선택 동의 항목 포함)</span>
            </div>

            <hr className="mt-2 mb-4"/>

            <div className="flex items-center mt-2 justify-between">
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        checked={checkedStates.age}
                        onChange={() => setCheckedStates((prev) => ({...prev, age: !prev.age}))}
                        className="mr-2"
                    />
                    <span>[필수] 만 18세 이상입니다</span>
                </div>
            </div>

            <CheckboxWithModal
                checked={checkedStates.terms}
                onChange={() => setCheckedStates((prev) => ({...prev, terms: !prev.terms}))}
                label="[필수] 이용약관 동의"
                ModalContent={TermsModalContent}
            />

            <CheckboxWithModal
                checked={checkedStates.privacy}
                onChange={() => setCheckedStates((prev) => ({...prev, privacy: !prev.privacy}))}
                label="[필수] 개인정보 수집 및 이용 동의"
                ModalContent={PrivacyModelContent}
            />

            <CheckboxWithModal
                checked={checkedStates.privacyOption}
                onChange={() => setCheckedStates((prev) => ({...prev, privacyOption: !prev.privacyOption}))}
                label="[선택] 개인정보 수집 및 이용 동의"
                ModalContent={PrivacyOptionModelContent}
            />

            <div className="flex items-center mt-2 justify-between">
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        checked={checkedStates.ads}
                        onChange={handleAdsChecked}
                        className="mr-2"
                    />
                    <span>[선택] 광고성 정보 수신 모두 동의</span>
                </div>
                <button
                    onClick={(event) => {
                        event.stopPropagation(); // 이벤트 전파를 막음
                        setShowAdsOptions(!showAdsOptions); // 펼치기/접기 기능
                    }}
                    className="text-blue-600 hover:underline"
                >
                    {showAdsOptions ? '접기' : '펼치기'}
                </button>
            </div>

            {showAdsOptions && (
                <div className="ml-4 mt-2">
                    {renderAdsOptions()}
                </div>
            )}
        </div>
    );

}

export default TermsAgreement;