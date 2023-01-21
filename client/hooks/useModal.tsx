import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom";

const useModal = () => {
    const [modalOpened, setModalOpened] = useState(false);

    const openModal = () => {
        setModalOpened(true);
    }

    const closeModal = () => {
        setModalOpened(false);
    }

    interface IProps {
        children: React.ReactNode;
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
                <div className="flex items-center justify-center h-full fixed top-0 left-0 w-full z-20">
                    <div 
                        className="absolute w-full h-full z-10 bg-tr-gray"
                        role="presentation"
                        onClick={closeModal}
                    />
                    <div className="w-[568px] min-h-[614px] z-30 bg-white">
                        {children}
                    </div>
                </div>,
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