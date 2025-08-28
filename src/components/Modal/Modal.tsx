import { useEffect } from "react";
import { createPortal } from "react-dom";

import styled from "./Modal.module.css";

interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
}

const modalRoot =
    document.getElementById("modal-root") || document.createElement("div");
if (!document.getElementById("modal-root")) {
    modalRoot.setAttribute("id", "modal-root");
    document.body.appendChild(modalRoot);
}

export default function Modal({ onClose, children }: ModalProps) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === "Escape") {
                onClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "visible";
        };
    }, [onClose]);

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return createPortal(
        <div
            className={styled.backdrop}
            role="dialog"
            aria-modal="true"
            onClick={handleBackdropClick}
        >
            <div className={styled.modal}>
                <button
                    className={styled.closeButton}
                    aria-label="Close modal"
                    onClick={onClose}
                >
                    &times;
                </button>
                {children}
            </div>
        </div>,
        modalRoot
    );
}
