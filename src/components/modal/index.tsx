import React, { FC, ReactNode } from "react";

type ModalProps = {
  children: ReactNode;
  onClose: () => void;
};

export const Modal: FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"
      onClick={onClose}
      style={{ zIndex: 100 }}
    >
      <div
        className="relative p-5 border shadow-lg rounded-md bg-white"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "80%",
          height: "80%",
        }}
      >
        <div className="flex justify-between items-center">
          <button onClick={onClose} className="text-black">
            &times;
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
