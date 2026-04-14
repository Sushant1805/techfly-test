'use client';
import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { PauseCircle, AlertCircle } from 'lucide-react';

interface SuspendAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  customerName: string;
}

export const SuspendAccountModal = ({ isOpen, onClose, customerName }: SuspendAccountModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Suspend Account — ${customerName}`} maxWidth="500px">
      <div className="space-y-8">
        <div className="p-6 bg-amber-50 rounded-3xl border border-amber-100 flex items-start gap-4 text-amber-900">
          <PauseCircle className="w-10 h-10 shrink-0" />
          <div className="space-y-1">
            <h4 className="text-sm font-black">Suspension Impact</h4>
            <p className="text-xs font-bold leading-relaxed opacity-70">
              The customer will immediately lose access to the platform. No charges will be made. Data is preserved.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-black text-text-slate uppercase tracking-widest pl-1">Reason for Suspension *</label>
            <select className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-bold focus:outline-none cursor-pointer">
              <option>Non-payment of dues</option>
              <option>Policy violation</option>
              <option>Customer request</option>
              <option>Investigation</option>
              <option>Other</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-black text-text-slate uppercase tracking-widest pl-1">Internal Note</label>
            <textarea 
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-bold focus:outline-none h-24 resize-none"
              placeholder="Detailed reason for suspension..."
            />
          </div>
        </div>

        <div className="flex items-center gap-3 pt-6 border-t border-gray-50">
          <Button variant="ghost" onClick={onClose} className="flex-1 rounded-2xl text-gray-400 font-black text-[11px] uppercase tracking-widest">
            Cancel
          </Button>
          <Button className="flex-1 rounded-2xl h-12 bg-amber-500 hover:bg-amber-600 shadow-none font-black text-[11px] uppercase tracking-widest text-white">
            Suspend Account
          </Button>
        </div>
      </div>
    </Modal>
  );
};
