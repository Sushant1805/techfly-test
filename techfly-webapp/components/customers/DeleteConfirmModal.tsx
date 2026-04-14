'use client';
import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { AlertTriangle, Trash2 } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  customerName: string;
}

export const DeleteConfirmModal = ({ isOpen, onClose, customerName }: DeleteConfirmModalProps) => {
  const [confirmText, setConfirmText] = useState('');

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Delete ${customerName}?`} maxWidth="500px">
      <div className="space-y-8">
        <div className="p-6 bg-red-50 rounded-3xl border border-red-100 flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-red-500 shadow-sm shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-black text-red-900 mb-1">Critical Action Warning</h4>
            <p className="text-xs font-bold text-red-700/70 leading-relaxed">
              This will permanently delete all customer data, invoices, and history. This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[11px] font-black text-text-slate uppercase tracking-widest pl-1">
            Type <span className="text-red-500 font-black">DELETE</span> to confirm
          </label>
          <input 
            type="text" 
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-black focus:outline-none focus:ring-4 focus:ring-red-500/5 focus:border-red-500/20 transition-all uppercase tracking-widest"
            placeholder="TYPE DELETE HERE"
          />
        </div>

        <div className="flex items-center gap-3 pt-6 border-t border-gray-50">
          <Button variant="ghost" onClick={onClose} className="flex-1 rounded-2xl text-gray-400 font-black text-[11px] uppercase tracking-widest">
            Cancel
          </Button>
          <Button 
            disabled={confirmText !== 'DELETE'}
            className="flex-1 rounded-2xl h-12 bg-red-500 hover:bg-red-600 shadow-none disabled:opacity-30 font-black text-[11px] uppercase tracking-widest"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Permanently
          </Button>
        </div>
      </div>
    </Modal>
  );
};
