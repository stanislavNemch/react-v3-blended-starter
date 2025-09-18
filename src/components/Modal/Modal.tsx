import { useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

const modalRoot = document.querySelector("#modal-root");

export default function Modal({ onClose, children }: ModalProps) {
  useEffect(() => {
    // Блокируем скролл страницы при открытии модального окна
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Функция очистки: выполняется при размонтировании компонента
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto"; // Возвращаем скролл
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Закрываем окно только при клике на сам фон (backdrop), а не на его содержимое
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  // Если #modal-root не найден, ничего не рендерим
  if (!modalRoot) {
    return null;
  }

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>{children}</div>
    </div>,
    modalRoot
  );
}
