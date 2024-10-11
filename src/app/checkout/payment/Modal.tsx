/*
import {ReactNode} from "react";
import {createPortal} from "react-dom";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal = ({isOpen, onClose, children}: ModalProps) => {
    if (!isOpen) {
        return null;
    }
    return createPortal(
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50"/>
            <div
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 z-50 bg-white rounded-lg shadow-lg">
                <button
                    className="mb-4 text-gray-700"
                    onClick={onClose}>모달 닫기
                </button>
                {children}
            </div>
        </>,
        document.getElementById("portal-root") as HTMLElement
    );
};

export default Modal;*/

import {ReactNode} from "react";
import Modal from "react-modal";

interface ModalProps {
    isModalOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

Modal.setAppElement("#_next");

const CustomModal: React.FC<ModalProps> = ({isModalOpen, onClose, children}) => {
    return (
        <Modal
            isOpen={isModalOpen}
            onRequestClose={onClose}
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mx-auto">
            <button className="text-gray-500 hover:text-gray-700" onClick={onClose}> 닫기</button>
            {children}
        </Modal>
    );
};
