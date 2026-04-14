'use client';
import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Invoice } from '@/lib/subscriptions';
import { Printer, Download, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

interface InvoiceDetailModalProps {
  invoice: Invoice | null;
  isOpen: boolean;
  onClose: () => void;
}

export const InvoiceDetailModal = ({ invoice, isOpen, onClose }: InvoiceDetailModalProps) => {
  if (!invoice) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Invoice Details" size="xl">
      <div className="flex flex-col h-full bg-slate-soft -m-6 p-6">
        {/* Actions Bar */}
        <div className="flex justify-between items-center mb-6 no-print">
          <Badge variant={invoice.status === 'Paid' ? 'success' : invoice.status === 'Overdue' ? 'danger' : 'warning'} icon={invoice.status === 'Paid' ? '✓' : '⚠'} className="px-4 py-2 text-xs">
            {invoice.status.toUpperCase()}
          </Badge>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => window.print()} className="rounded-xl gap-2 font-black border-gray-100 bg-white">
              <Printer className="w-4 h-4" /> Print
            </Button>
            <Button variant="outline" size="sm" className="rounded-xl gap-2 font-black border-gray-100 bg-white">
              <Download className="w-4 h-4" /> Download
            </Button>
            <Button size="sm" className="rounded-xl gap-2 font-black shadow-glow bg-brand-blue">
              <Send className="w-4 h-4" /> Send Email
            </Button>
          </div>
        </div>

        {/* Invoice Paper */}
        <div id="printable-invoice" className="bg-white p-12 shadow-soft-xl rounded-3xl border border-gray-50 flex flex-col gap-10 print:shadow-none print:border-none print:m-0 print:p-0">
          
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-brand-blue flex items-center justify-center text-white font-black text-xs">TF</div>
                <h1 className="text-xl font-black text-text-slate tracking-tighter uppercase">TechFly Technologies</h1>
              </div>
              <p className="text-xs font-bold text-gray-400 uppercase leading-relaxed">
                Plot 24, Cyber City Phase II<br />
                Gurugram, Haryana – 122002<br />
                GST: 06AABCT1234M1Z5
              </p>
            </div>
            <div className="text-right">
              <h2 className="text-4xl font-black text-brand-blue tracking-tighter uppercase mb-2">Invoice</h2>
              <p className="text-sm font-black text-text-slate uppercase tracking-widest">{invoice.invoiceNumber}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 pt-10 border-t border-gray-50">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Bill To:</p>
              <h3 className="text-sm font-black text-text-slate mb-1">{invoice.customerName}</h3>
              <p className="text-xs font-bold text-gray-400 mb-1">{invoice.ownerName}</p>
              <p className="text-xs font-bold text-gray-400 leading-relaxed max-w-xs">{invoice.customerAddress}</p>
              {invoice.customerGst && (
                <p className="text-xs font-black text-brand-blue mt-2 uppercase tracking-tight">GST: {invoice.customerGst}</p>
              )}
            </div>
            <div className="text-right flex flex-col items-end">
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-right">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Invoice Date:</p>
                <p className="text-xs font-black text-text-slate">{new Date(invoice.date).toLocaleDateString()}</p>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Due Date:</p>
                <p className="text-xs font-black text-text-slate">{new Date(invoice.dueDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 bg-slate-soft/50">
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Description</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Period</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Rate</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr>
                  <td className="px-6 py-6">
                    <p className="text-sm font-black text-text-slate leading-tight">{invoice.description}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{invoice.plan} · {invoice.billingCycle}</p>
                  </td>
                  <td className="px-6 py-6 text-center text-xs font-bold text-gray-500">
                    {invoice.periodFrom} – {invoice.periodTo}
                  </td>
                  <td className="px-6 py-6 text-right text-sm font-bold text-text-slate">
                    ₹{invoice.baseAmount.toLocaleString()}
                  </td>
                  <td className="px-6 py-6 text-right text-sm font-black text-text-slate">
                    ₹{invoice.baseAmount.toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex justify-end pt-8 border-t border-gray-50">
            <div className="w-72 space-y-3">
              <div className="flex justify-between items-center">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Subtotal</p>
                <p className="text-sm font-bold text-text-slate">₹{invoice.baseAmount.toLocaleString()}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">CGST (9%)</p>
                <p className="text-sm font-bold text-text-slate">₹{invoice.cgst.toLocaleString()}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">SGST (9%)</p>
                <p className="text-sm font-bold text-text-slate">₹{invoice.sgst.toLocaleString()}</p>
              </div>
              <div className="h-px bg-gray-100 my-4" />
              <div className="flex justify-between items-center">
                <p className="text-xs font-black text-brand-blue uppercase tracking-widest">Total (INR)</p>
                <p className="text-2xl font-black text-brand-blue tracking-tighter leading-none">₹{invoice.totalAmount.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="mt-10 p-6 rounded-2xl bg-slate-soft/50 border border-gray-50 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Payment Details</p>
              <p className="text-sm font-black text-text-slate uppercase tracking-tight">
                {invoice.status === 'Paid' ? `✓ Paid via ${invoice.paymentMode} on ${invoice.paymentDate}` : `⚠ Payment Pending — Due on ${invoice.dueDate}`}
              </p>
              {invoice.transactionId && (
                <p className="text-[10px] font-bold text-brand-blue uppercase mt-1 tracking-widest">Ref: {invoice.transactionId}</p>
              )}
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${invoice.status === 'Paid' ? 'bg-green-500/10 text-green-600' : 'bg-orange-500/10 text-orange-600'}`}>
              {invoice.status === 'Paid' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
            </div>
          </div>

          <div className="text-center mt-6">
            <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em]">Thank you for your business!</p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          body * { visibility: hidden; }
          #printable-invoice, #printable-invoice * { visibility: visible; }
          #printable-invoice { position: absolute; left: 0; top: 0; width: 100%; border: none !important; shadow: none !important; margin: 0; padding: 0; }
          .no-print { display: none !important; }
        }
      `}</style>
    </Modal>
  );
};

export const GenerateInvoiceModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Generate Invoice" size="lg">
      <div className="space-y-8">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Customer *</p>
            <select className="w-full h-14 bg-slate-soft border border-gray-100 rounded-2xl px-6 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-brand-blue/20">
              <option>Search existing customer...</option>
              <option>Raj Science Classes</option>
              <option>Mentor IIT Academy</option>
            </select>
          </div>
          <div className="space-y-2">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Plan</p>
            <div className="h-14 bg-gray-50 border border-gray-100 rounded-2xl px-6 flex items-center text-sm font-bold text-gray-400">
              Auto-filled from customer...
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Description *</p>
          <input 
            type="text" 
            placeholder="e.g. EzzyCoach Pro Plan — Annual Subscription"
            className="w-full h-14 bg-slate-soft border border-gray-100 rounded-2xl px-6 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Period From *</p>
            <input type="date" className="w-full h-14 bg-slate-soft border border-gray-100 rounded-2xl px-6 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-brand-blue/20" />
          </div>
          <div className="space-y-2">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Period To *</p>
            <input type="date" className="w-full h-14 bg-slate-soft border border-gray-100 rounded-2xl px-6 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-brand-blue/20" />
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-slate-soft/50 border border-gray-50 space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Base Amount (₹) *</p>
            <input type="number" defaultValue={10000} className="w-32 bg-white border border-gray-100 rounded-xl px-3 py-2 text-sm font-black text-right" />
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">GST (18%)</p>
            <p className="text-sm font-black text-text-slate">₹1,800</p>
          </div>
          <div className="h-px bg-gray-200" />
          <div className="flex justify-between items-end text-brand-blue">
            <p className="text-[11px] font-black uppercase tracking-widest mb-1">Total</p>
            <p className="text-3xl font-black tracking-tighter leading-none">₹11,800</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-brand-blue/5 rounded-2xl border border-brand-blue/10">
          <input type="checkbox" id="sendEmail" className="w-4 h-4 rounded text-brand-blue" defaultChecked />
          <label htmlFor="sendEmail" className="text-xs font-black text-text-slate uppercase tracking-tight">Send invoice copy to customer email automatically</label>
        </div>

        <div className="flex gap-4 pt-4">
          <Button variant="outline" onClick={onClose} className="flex-1 h-14 rounded-2xl font-black uppercase tracking-widest text-[11px] border-gray-200">Cancel</Button>
          <Button onClick={onClose} className="flex-1 h-14 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-glow bg-brand-blue">Generate Invoice</Button>
        </div>
      </div>
    </Modal>
  );
};
