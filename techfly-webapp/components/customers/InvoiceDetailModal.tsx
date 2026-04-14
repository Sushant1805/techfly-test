'use client';
import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Printer, Download, Send, Check } from 'lucide-react';

interface InvoiceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: any;
}

export const InvoiceDetailModal = ({ isOpen, onClose, invoice }: InvoiceDetailModalProps) => {
  if (!invoice) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Invoice ${invoice.id}`} maxWidth="700px">
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-soft-xl print:shadow-none print:border-none">
        {/* Invoice Header */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <div className="w-12 h-12 bg-text-slate text-white rounded-[14px] flex items-center justify-center font-black text-xl mb-4">TF</div>
            <h2 className="text-xl font-black text-text-slate tracking-tight">TechFly Technologies</h2>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">SaaS Solutions for Coaching</p>
          </div>
          <div className="text-right">
            <h1 className="text-4xl font-black text-text-slate tracking-tighter uppercase mb-2">Invoice</h1>
            <p className="text-xs font-black text-brand-blue">{invoice.id}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-12 mb-12">
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Bill To</p>
            <p className="text-sm font-black text-text-slate leading-none mb-1">Raj Science Classes</p>
            <p className="text-xs font-bold text-gray-500">Rajesh Mehta</p>
            <p className="text-xs font-bold text-gray-500">Pune, Maharashtra</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Details</p>
            <p className="text-xs font-bold text-gray-500 mb-1"><span className="text-text-slate font-black">Date:</span> {invoice.date}</p>
            <p className="text-xs font-bold text-gray-500 mb-1"><span className="text-text-slate font-black">Due:</span> 10 Jan 2026</p>
            <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-500 rounded-full border border-emerald-100">
              <Check className="w-3 h-3" />
              <span className="text-[10px] font-black uppercase tracking-widest">Paid</span>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="w-full mb-12">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-slate-900 border-dashed">
                <th className="text-left py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Description</th>
                <th className="text-center py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Qty</th>
                <th className="text-right py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Rate</th>
                <th className="text-right py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-6">
                  <p className="text-xs font-black text-text-slate mb-1">EzzyCoach Pro Plan</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Annual Subscription · Jan 2026 – Dec 2026</p>
                </td>
                <td className="text-center py-6 text-xs font-black text-text-slate">1</td>
                <td className="text-right py-6 text-xs font-black text-text-slate">₹10,000</td>
                <td className="text-right py-6 text-xs font-black text-text-slate">₹10,000</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end mb-12">
          <div className="w-64 space-y-4">
            <div className="flex justify-between items-center text-xs font-bold text-gray-500">
              <span>Subtotal</span>
              <span className="text-text-slate">₹10,000</span>
            </div>
            <div className="flex justify-between items-center text-xs font-bold text-gray-500">
              <span>GST @18%</span>
              <span className="text-text-slate">₹1,800</span>
            </div>
            <div className="h-px bg-slate-900 border-dashed border-b" />
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total</span>
              <span className="text-xl font-black text-brand-blue">₹11,800</span>
            </div>
          </div>
        </div>

        {/* Actions - Hidden on print */}
        <div className="flex items-center gap-3 print:hidden">
          <Button variant="ghost" className="rounded-2xl border-gray-100 text-gray-400 font-black text-[10px] uppercase tracking-widest hover:border-brand-blue hover:text-brand-blue">
            <Printer className="w-4 h-4 mr-2" /> Print
          </Button>
          <Button variant="ghost" className="rounded-2xl border-gray-100 text-gray-400 font-black text-[10px] uppercase tracking-widest hover:border-brand-blue hover:text-brand-blue">
            <Download className="w-4 h-4 mr-2" /> Download
          </Button>
          <div className="flex-1" />
          <Button className="rounded-2xl h-11 px-6 shadow-glow font-black text-[10px] uppercase tracking-widest">
            <Send className="w-4 h-4 mr-2" /> Send to Customer
          </Button>
        </div>
      </div>
    </Modal>
  );
};
