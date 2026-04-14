'use client';
import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Send, FileText } from 'lucide-react';

interface SendEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  customerEmail: string;
}

export const SendEmailModal = ({ isOpen, onClose, customerEmail }: SendEmailModalProps) => {
  const [template, setTemplate] = useState('Renewal Reminder');

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Send Email" maxWidth="600px">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-black text-text-slate uppercase tracking-widest pl-1">To</label>
            <input 
              type="text" 
              readOnly
              value={customerEmail}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-bold text-gray-400 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-black text-text-slate uppercase tracking-widest pl-1">From</label>
            <input 
              type="text" 
              readOnly
              value="support@techfly.in"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-bold text-gray-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-black text-text-slate uppercase tracking-widest pl-1">Subject</label>
          <input 
            type="text" 
            defaultValue="[Action Required] EzzyCoach Subscription Renewal"
            className="w-full px-4 py-3 bg-white border border-gray-100 rounded-2xl text-xs font-bold shadow-soft focus:outline-none focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue/20 transition-all font-black tracking-tight"
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between px-1">
            <label className="text-[11px] font-black text-text-slate uppercase tracking-widest">Message Body</label>
            <div className="flex items-center gap-2 group cursor-pointer">
              <FileText className="w-3.5 h-3.5 text-brand-blue" />
              <select 
                value={template}
                onChange={(e) => setTemplate(e.target.value)}
                className="bg-transparent text-[10px] font-black text-brand-blue uppercase tracking-widest focus:outline-none cursor-pointer"
              >
                <option>Renewal Reminder</option>
                <option>Welcome Email</option>
                <option>Custom Template</option>
              </select>
            </div>
          </div>
          <textarea 
            className="w-full px-5 py-4 bg-white border border-gray-100 rounded-[24px] text-xs font-bold shadow-soft focus:outline-none focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue/20 transition-all resize-none h-48 leading-relaxed"
            defaultValue={`Dear Rajesh,\n\nI hope you're doing well. Your EzzyCoach Pro Subscription is scheduled for auto-renewal on 1st May 2026.\n\nPlease ensure your bank details are up to date.\n\nRegards,\nSupport Team`}
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-50">
          <Button variant="ghost" onClick={onClose} className="rounded-2xl text-gray-400 font-black text-[11px] uppercase tracking-widest">
            Cancel
          </Button>
          <Button onClick={onClose} className="rounded-2xl h-11 px-8 shadow-glow font-black text-[11px] uppercase tracking-widest">
            <Send className="w-4 h-4 mr-2" />
            Send Email
          </Button>
        </div>
      </div>
    </Modal>
  );
};
