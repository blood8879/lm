import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom";

interface IProps {
    children: React.ReactNode;
}

const useModal = () => {
    const [modalOpened, setModalOpened] = useState(false);

    const openModal = () => {
        setModalOpened(true);
    }

    const closeModal = () => {
        setModalOpened(false);
    }

    const router = useRouter();

    useEffect(() => {
        return() => {
            closeModal();
        }
    }, [router]);

    const ModalPortal: React.FC<IProps> = ({ children }) => {
        const ref = useRef<Element | null>();
        const [mounted, setMounted] = useState(false);

        useEffect(() => {
            setMounted(true);
            if(document) {
                const dom = document.querySelector("#root-modal");
                ref.current = dom;
            }
        }, []);

        if(ref.current && mounted && modalOpened) {
            return createPortal(
                <>
                    <div 
                        role="presentation"
                        onClick={closeModal}
                    />
                    <div>
                        {children}
                    </div>
                </>,
                ref.current

            );
        }
        return null;
    };

    return {
        openModal,
        closeModal,
        ModalPortal: React.memo(ModalPortal),
    }
};

export default useModal;