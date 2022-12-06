import React, { FC } from "react";
import ReactDOM from "react-dom";
import { ModalProps } from "./types";

import "./Modal.css";

const Modal: FC<React.PropsWithChildren<ModalProps>> = ({
  children,
  isOpen,
  onClose,
}) => {
  if (isOpen) {
    return ReactDOM.createPortal(
      <div
        className="modal-overlay"
        onClick={(event) => {
          const target = event.target as HTMLDivElement;
          target.classList.contains("modal-overlay") && onClose();
        }}
      >
        <div className="modal-content">
          <button
            onClick={() => onClose()}
            className="modal-close-button link-button"
          >
            <span className="material-icons">close</span>
          </button>
          {children}
        </div>
      </div>,
      document.body
    );
  }
  return null;
};

export default Modal;
