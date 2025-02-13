'use client';

import React from 'react';

import Button from './button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = React.memo(
  ({ title, isOpen, onClose, children, className }) => {
    if (!isOpen) return null;

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
        onClick={onClose}
      >
        <div
          className={`${className} relative flex max-h-[80vh] min-h-[20vh] min-w-[20%] max-w-[90%] animate-fadeIn flex-col justify-center rounded-lg bg-customBackground p-2.5 text-center text-gray-300`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="m-3">
            <p className="text-base">{title}</p>
            <Button onClick={onClose} className="absolute right-2 top-2 px-2 py-0.5">
              X
            </Button>
          </div>
          <div className="flex max-h-[70vh] max-w-full flex-col items-center overflow-auto">
            {children}
          </div>
        </div>
      </div>
    );
  },
);

Modal.displayName = 'Modal';
export default Modal;
