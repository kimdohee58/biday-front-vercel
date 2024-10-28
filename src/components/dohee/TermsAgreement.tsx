// import React, { useState } from 'react';
// import { TermsModalContent } from './TermsModalContent';
// import { PrivacyOptionModelContent } from "@/components/dohee/PrivacyOptionModelContent";
// import { PrivacyModelContent } from "@/components/dohee/PrivacyModelContent";
//
// const Modal = ({ title, content, onClose }) => (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
//         <div className="bg-white p-6 rounded-2xl shadow-xl w-11/12 sm:w-3/4 md:max-w-lg h-3/4 overflow-hidden">
//             <div className="flex justify-between items-center border-b border-gray-200 pb-2">
//                 <h2 className="text-xl font-semibold">{title}</h2>
//                 <button onClick={onClose} className="text-red-600 font-bold hover:text-red-800 transition duration-200">
//                     닫기
//                 </button>
//             </div>
//             <div className="mt-4 text-gray-700 h-full overflow-y-auto rounded-b-2xl">
//                 {content}
//             </div>
//         </div>
//     </div>
// );
//
// const CheckboxWithModal = ({ checked, onChange, label, ModalContent }) => {
//     const [showModal, setShowModal] = useState(false);
//
//     return (
//         <div className="flex items-center mt-2 justify-between">
//             <div className="flex items-center">
//                 <input type="checkbox" checked={checked} onChange={onChange}
//                        className="mr-2 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"/>
//                 <span>{label}</span>
//             </div>
//             <button onClick={() => setShowModal(true)} className="text-blue-500 hover:underline">
//                 내용 보기
//             </button>
//             {showModal && (
//                 <Modal
//                     title={label}
//                     content={<ModalContent />}
//                     onClose={() => setShowModal(false)}
//                 />
//             )}
//         </div>
//     );
// };
//
// const TermsAgreement = () => {
//     const [allChecked, setAllChecked] = useState(false);
//     const [checkedStates, setCheckedStates] = useState({
//         age: false,
//         terms: false,
//         privacy: false,
//         privacyOption: false,
//         ads: false,
//     });
//     const [showAdsOptions, setShowAdsOptions] = useState(false);
//
//     const handleAllChecked = () => {
//         const newState = !allChecked;
//         setAllChecked(newState);
//         setCheckedStates((prev) => ({
//             ...prev,
//             age: newState,
//             terms: newState,
//             privacy: newState,
//             privacyOption: newState,
//             ads: newState,
//         }));
//
//         // 광고 관련 체크박스 상태 업데이트
//         if (newState) {
//             setCheckedStates((prev) => ({
//                 ...prev,
//                 '이메일 수신': true,
//                 '앱 푸시 수신': true,
//                 '문자 메시지 수신': true,
//             }));
//         } else {
//             setCheckedStates((prev) => ({
//                 ...prev,
//                 '이메일 수신': false,
//                 '앱 푸시 수신': false,
//                 '문자 메시지 수신': false,
//             }));
//         }
//     };
//
//     const handleAdsChecked = () => {
//         const newState = !checkedStates.ads;
//         setCheckedStates((prev) => ({
//             ...prev,
//             ads: newState,
//         }));
//
//         // 광고 관련 체크박스 상태 업데이트
//         if (newState) {
//             setCheckedStates((prev) => ({
//                 ...prev,
//                 '이메일 수신': true,
//                 '앱 푸시 수신': true,
//                 '문자 메시지 수신': true,
//             }));
//         } else {
//             setCheckedStates((prev) => ({
//                 ...prev,
//                 '이메일 수신': false,
//                 '앱 푸시 수신': false,
//                 '문자 메시지 수신': false,
//             }));
//         }
//     };
//
//     const renderAdsOptions = () => (
//         <>
//             {['이메일 수신', '앱 푸시 수신', '문자 메시지 수신'].map((label, index) => (
//                 <div className="flex items-center mt-1" key={index}>
//                     <input
//                         type="checkbox"
//                         checked={checkedStates[label]} // 각 항목에 대해 체크 상태를 관리
//                         onChange={() => setCheckedStates((prev) => ({ ...prev, [label]: !prev[label] }))}
//                         className="mr-2"
//                     />
//                     <span>{label}</span>
//                 </div>
//             ))}
//         </>
//     );
//
//     return (
//         <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
//             <div className="flex items-center mb-4">
//                 <input type="checkbox" checked={allChecked} onChange={handleAllChecked}
//                        className="mr-2 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"/>
//                 <span>모두 동의합니다 (선택 동의 항목 포함)</span>
//             </div>
//
//             <div className="flex items-center mb-4">
//                 <input type="checkbox" checked={checkedStates.age}
//                        onChange={() => setCheckedStates((prev) => ({...prev, age: !prev.age}))}
//                        className="mr-2 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"/>
//                 <span>[필수] 만 18세 이상입니다</span>
//             </div>
//
//             <CheckboxWithModal
//                 checked={checkedStates.terms}
//                 onChange={() => setCheckedStates((prev) => ({...prev, terms: !prev.terms}))}
//                 label="[필수] 이용약관 동의"
//                 ModalContent={TermsModalContent}
//             />
//
//             <CheckboxWithModal
//                 checked={checkedStates.privacy}
//                 onChange={() => setCheckedStates((prev) => ({...prev, privacy: !prev.privacy}))}
//                 label="[필수] 개인정보 수집 및 이용 동의"
//                 ModalContent={PrivacyModelContent}
//             />
//
//             <CheckboxWithModal
//                 checked={checkedStates.privacyOption}
//                 onChange={() => setCheckedStates((prev) => ({...prev, privacyOption: !prev.privacyOption}))}
//                 label="[선택] 개인정보 수집 및 이용 동의"
//                 ModalContent={PrivacyOptionModelContent}
//             />
//
//             <div className="flex items-center mt-2 justify-between">
//                 <div className="flex items-center">
//                     <input
//                         type="checkbox"
//                         checked={checkedStates.ads}
//                         onChange={handleAdsChecked}
//                         className="mr-2 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                     />
//                     <span>[선택] 광고성 정보 수신 모두 동의</span>
//                 </div>
//                 <button
//                     onClick={() => setShowAdsOptions(!showAdsOptions)} // 펼치기/접기 기능
//                     className="text-blue-500 hover:underline"
//                 >
//                     {showAdsOptions ? '접기' : '펼치기'}
//                 </button>
//             </div>
//
//             {showAdsOptions && (
//                 <div className="ml-4 mt-2">
//                     {renderAdsOptions()}
//                 </div>
//             )}
//         </div>
//     );
// };
//
// export default TermsAgreement;


import React, { useState } from 'react';
import { TermsModalContent } from './TermsModalContent';
import { PrivacyOptionModelContent } from "@/components/dohee/PrivacyOptionModelContent";
import { PrivacyModelContent } from "@/components/dohee/PrivacyModelContent";

const Modal = ({ title, content, onClose }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
        <div className="bg-white p-6 rounded-2xl shadow-xl w-11/12 sm:w-3/4 md:max-w-lg h-3/4 overflow-hidden">
            <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                <h2 className="text-xl font-semibold">{title}</h2>
                <button onClick={onClose} className="text-red-600 font-bold hover:text-red-800 transition duration-200">
                    닫기
                </button>
            </div>
            <div className="mt-4 text-gray-700 h-full overflow-y-auto rounded-b-2xl">
                {content}
            </div>
        </div>
    </div>
);

const CheckboxWithModal = ({ checked, onChange, label, ModalContent }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="flex items-center mt-2 justify-between">
            <div className="flex items-center">
                <input type="checkbox" checked={checked} onChange={onChange} className="mr-2" />
                <span>{label}</span>
            </div>
            <button onClick={() => setShowModal(true)} className="text-blue-500 hover:underline">
                내용 보기
            </button>
            {showModal && (
                <Modal
                    title={label}
                    content={<ModalContent />}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
};

const TermsAgreement = () => {
    const [allChecked, setAllChecked] = useState(false);
    const [checkedStates, setCheckedStates] = useState({
        age: false,
        terms: false,
        privacy: false,
        privacyOption: false,
        ads: false,
    });
    const [showAdsOptions, setShowAdsOptions] = useState(false);

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
                        onChange={() => setCheckedStates((prev) => ({ ...prev, [label]: !prev[label] }))}
                        className="mr-2"
                    />
                    <span>{label}</span>
                </div>
            ))}
        </>
    );

    return (
        <div className="terms-agreement-section">
            <div className="flex items-center">
                <input type="checkbox" checked={allChecked} onChange={handleAllChecked} className="mr-2"/>
                <span className="text-base font-bold">모두 동의합니다 (선택 동의 항목 포함)</span>
            </div>
            <hr className="mt-2"/>
            <div className="flex mt-2 items-center">
                <input type="checkbox" checked={checkedStates.age} onChange={() => setCheckedStates((prev) => ({ ...prev, age: !prev.age }))} className="mr-2" />
                <span>[필수] 만 18세 이상입니다</span>
            </div>

            <CheckboxWithModal
                checked={checkedStates.terms}
                onChange={() => setCheckedStates((prev) => ({ ...prev, terms: !prev.terms }))}
                label="[필수] 이용약관 동의"
                ModalContent={TermsModalContent}
            />

            <CheckboxWithModal
                checked={checkedStates.privacy}
                onChange={() => setCheckedStates((prev) => ({ ...prev, privacy: !prev.privacy }))}
                label="[필수] 개인정보 수집 및 이용 동의"
                ModalContent={PrivacyModelContent}
            />

            <CheckboxWithModal
                checked={checkedStates.privacyOption}
                onChange={() => setCheckedStates((prev) => ({ ...prev, privacyOption: !prev.privacyOption }))}
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
                    onClick={() => setShowAdsOptions(!showAdsOptions)} // 펼치기/접기 기능
                    className="text-blue-500 hover:underline"
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
};

export default TermsAgreement;