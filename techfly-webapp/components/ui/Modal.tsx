import React from 'react';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeToMaxWidth: Record<string, string> = {
  sm: '400px',
  md: '560px',
  lg: '720px',
  xl: '900px',
};

export const Modal = ({ isOpen, onClose, title, children, maxWidth, size }: ModalProps) => {
  if (!isOpen) return null;

  const resolvedMaxWidth = maxWidth ?? (size ? sizeToMaxWidth[size] : '500px');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-[2px] transition-opacity"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div
        className="relative bg-white rounded-xl shadow-xl w-full flex flex-col animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-hidden"
        style={{ maxWidth: resolvedMaxWidth }}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};
