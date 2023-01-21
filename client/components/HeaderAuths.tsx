import React from "react";
import { useDispatch } from "react-redux";
import useModal from "../hooks/useModal"
import { authActions } from "../store/auth";
import AuthModal from "./auth/AuthModal";

const HeaderAuths: React.FC = () => {
    const { openModal, closeModal, ModalPortal } = useModal();

    const dispatch = useDispatch();

    return (
        <>
            <div className="z-10">
                <button
                    className="py-2 px-4 mr-2 bg-white rounded-2xl rounded-full border-solid text-xs hover:bg-gray-100 cursor:pointer outline-0"
                    type="button"
                    onClick={() => {
                        dispatch(authActions.setAuthMode("signup"));
                        openModal();
                    }}
                >
                    회원가입
                </button>
                <button
                    className="py-2 px-4 bg-white rounded-2xl rounded-full border-solid text-xs shadow-xl cursor:pointer outline-0"
                    type="button"
                    onClick={() => {
                        dispatch(authActions.setAuthMode("login"));
                        openModal();
                    }}
                >
                    로그인
                </button>
            </div>
            <ModalPortal>
                <AuthModal closeModal={closeModal} />
            </ModalPortal>
        </>
    )
}

export default HeaderAuths;