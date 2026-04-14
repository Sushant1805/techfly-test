'use client';
import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Printer, Download, Mail, MessageSquare, 
  X, Check, AlertCircle, Trash2,
  Calendar, CreditCard, Banknote, Landmark,
  Smartphone, Share2, FileText
} from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const BaseModal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 sm:p-10">
      <div className="absolute inset-0 bg-text-slate/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose} />
      <div className="relative w-full max-w-[500px] bg-white rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col">
        <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-bg-soft/10">
          <h3 className="text-xl font-black text-text-slate tracking-tight uppercase tracking-widest text-xs">{title}</h3>
          <button onClick={onClose} className="h-10 w-10 rounded-xl bg-white text-gray-400 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all shadow-sm">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export const ReceiptModal: React.FC<{ isOpen: boolean; onClose: () => void; record: any }> = ({ isOpen, onClose, record }) => {
  if (!record) return null;
  
  const handlePrint = () => {
    window.print();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Payment Receipt">
      <div className="space-y-8" id="receipt-content">
        <style>{`
          @media print {
            body * { visibility: hidden; }
            #receipt-content, #receipt-content * { visibility: visible; }
            #receipt-content { position: absolute; left: 0; top: 0; width: 100%; }
            #receipt-actions { display: none; }
          }
        `}</style>
        
        {/* Receipt Layout */}
        <div className="text-center space-y-2 border-b-2 border-dashed border-gray-100 pb-8">
          <h2 className="text-3xl font-black text-brand-blue tracking-tighter">EZZYCOACH</h2>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Fee Receipt • {record.receiptNumber || 'RCP-TEMP'}</p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Student</p>
              <p className="text-sm font-black text-text-slate">{record.studentName}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Roll Number</p>
              <p className="text-sm font-black text-text-slate">{record.rollNumber}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Batch Group</p>
              <p className="text-sm font-black text-text-slate">{record.batchName}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Installment</p>
              <p className="text-sm font-black text-text-slate">{record.month}</p>
            </div>
          </div>
        </div>

        <Card className="p-6 bg-bg-soft/20 border-gray-50 flex flex-col gap-4">
          <div className="flex justify-between items-center text-xs font-black uppercase text-gray-400 tracking-widest">
            <span>Description</span>
            <span>Sub-Total</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold text-text-slate">{record.feeType} Fee</span>
            <span className="font-black text-text-slate">₹{record.amount.toLocaleString()}</span>
          </div>
          <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
            <span className="font-black text-brand-blue uppercase text-[10px] tracking-widest">Total Paid</span>
            <span className="text-2xl font-black text-brand-blue">₹{record.amountPaid.toLocaleString()}</span>
          </div>
        </Card>

        <div className="space-y-4">
           <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-gray-400 px-2 line-clamp-1">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" /> {record.paidDate || 'N/A'}
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-3.5 h-3.5" /> {record.paymentMode}
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5" /> Collected By: {record.collectedBy}
            </div>
          </div>
          {record.transactionId && (
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between">
               <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Transaction ID</span>
               <span className="text-[9px] font-black text-text-slate uppercase tracking-widest">{record.transactionId}</span>
            </div>
          )}
        </div>

        <div className="pt-6 border-t border-gray-50 text-center">
          <Badge variant="Active" className="bg-green-500 text-white border-none py-2 px-6 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-green-100">Paid ✓</Badge>
        </div>

        <div className="flex gap-4 pt-4" id="receipt-actions">
          <Button onClick={handlePrint} className="flex-1 h-12 rounded-2xl bg-brand-blue font-black uppercase tracking-widest text-[10px] gap-2 shadow-lg shadow-brand-blue/20">
            <Printer className="w-4 h-4" /> Print Receipt
          </Button>
          <Button variant="outline" className="h-12 w-12 rounded-2xl border-gray-100 flex items-center justify-center p-0">
            <Download className="w-4 h-4" />
          </Button>
          <Button variant="outline" className="h-12 w-12 rounded-2xl border-gray-100 flex items-center justify-center p-0">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};

export const ReminderModal: React.FC<{ isOpen: boolean; onClose: () => void; studentName: string; amount: number; month: string }> = ({ isOpen, onClose, studentName, amount, month }) => (
  <BaseModal isOpen={isOpen} onClose={onClose} title="Send Fee Reminder">
    <div className="space-y-8">
      <div className="flex flex-col items-center text-center p-8 rounded-[32px] bg-amber-50 group border border-amber-100">
        <div className="w-16 h-16 rounded-[24px] bg-white flex items-center justify-center text-amber-500 mb-6 shadow-xl shadow-amber-200/50 group-hover:scale-110 transition-all">
          <Mail className="w-8 h-8" />
        </div>
        <h4 className="text-xl font-black text-amber-900 tracking-tight leading-none mb-2">Message Preview</h4>
        <p className="text-xs font-bold text-amber-700/60 uppercase tracking-widest">Sending to {studentName}'s Parent</p>
      </div>

      <div className="p-6 rounded-2xl bg-text-slate text-white/90 text-sm font-medium leading-relaxed shadow-soft relative italic">
        <div className="absolute -top-3 left-6 w-6 h-6 bg-text-slate rotate-45" />
        "Dear Parent, this is a reminder that the monthly fee of <span className="text-brand-blue-lite font-black">₹{amount.toLocaleString()}</span> for {studentName} ({month}) is pending. Please pay by 15 Apr 2026. — Raj Science Classes"
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button className="h-14 rounded-2xl border-2 border-brand-blue/10 flex items-center justify-center gap-3 hover:bg-brand-blue/5 transition-all outline-none">
          <Smartphone className="w-5 h-5 text-brand-blue" />
          <span className="text-[10px] font-black uppercase tracking-widest text-text-slate">Via SMS</span>
        </button>
        <button className="h-14 rounded-2xl border-2 border-green-500/10 flex items-center justify-center gap-3 hover:bg-green-50 transition-all outline-none">
          <MessageSquare className="w-5 h-5 text-green-500" />
          <span className="text-[10px] font-black uppercase tracking-widest text-text-slate">Via WhatsApp</span>
        </button>
      </div>

      <Button className="w-full h-14 rounded-2xl bg-brand-blue font-black uppercase tracking-widest text-xs shadow-lg shadow-brand-blue/20">
        Send Reminder All
      </Button>
    </div>
  </BaseModal>
);

export const WaiveModal: React.FC<{ isOpen: boolean; onClose: () => void; record: any }> = ({ isOpen, onClose, record }) => (
  <BaseModal isOpen={isOpen} onClose={onClose} title="Confirm Waive Fee">
    <div className="space-y-8">
      <div className="p-8 rounded-[32px] bg-red-50 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-500 mb-4 animate-bounce">
          <X className="w-8 h-8 stroke-[4]" />
        </div>
        <h4 className="text-2xl font-black text-red-600 tracking-tight">Warning!</h4>
        <p className="text-xs font-bold text-red-400 mt-2 uppercase tracking-widest">Permanently waiving ₹{record?.amount.toLocaleString()} for {record?.studentName}</p>
      </div>

      <div className="space-y-4">
        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Reason for Waiving</label>
        <select className="w-full h-14 rounded-2xl border border-gray-100 bg-bg-soft/20 px-4 text-sm font-bold focus:outline-none">
          <option>Financial Hardship</option>
          <option>Merit Scholarship</option>
          <option>Billing Error</option>
          <option>Student Withdrawal</option>
        </select>
        <textarea 
          placeholder="Additional notes for auditing..."
          className="w-full h-24 rounded-2xl border border-gray-100 bg-bg-soft/20 p-4 text-sm font-bold focus:outline-none resize-none"
        />
      </div>

      <div className="flex gap-4">
        <Button variant="ghost" onClick={onClose} className="flex-1 h-14 rounded-2xl font-black uppercase tracking-widest text-xs">Cancel</Button>
        <Button className="flex-1 h-14 rounded-2xl bg-red-500 hover:bg-red-600 font-black uppercase tracking-widest text-xs shadow-lg shadow-red-100 gap-2">
          <Trash2 className="w-4 h-4" /> Confirm Waive
        </Button>
      </div>
    </div>
  </BaseModal>
);
