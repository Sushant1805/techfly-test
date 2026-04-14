'use client';
import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Customer } from '@/lib/customers';
import { Check } from 'lucide-react';

interface ChangePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer;
}

export const ChangePlanModal = ({ isOpen, onClose, customer }: ChangePlanModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Change Plan — ${customer.instituteName}`} maxWidth="600px">
      <div className="space-y-8">
        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Current Plan</p>
          <p className="text-sm font-black text-text-slate">{customer.plan} {customer.billingCycle} (₹{customer.plan === 'Pro' ? '10,000' : '5,000'}/yr)</p>
        </div>

        <div className="space-y-4">
          <label className="text-[11px] font-black text-text-slate uppercase tracking-widest">Select New Plan</label>
          <div className="grid grid-cols-1 gap-3">
            {[
              { name: 'Free', price: '₹0/month', desc: 'Up to 50 students' },
              { name: 'Basic', price: '₹500/month', desc: 'Up to 200 students' },
              { name: 'Pro', price: '₹1,000/month', desc: 'Unlimited students' },
            ].map((p) => (
              <div 
                key={p.name} 
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${customer.plan === p.name ? 'border-brand-blue bg-brand-blue/5' : 'border-gray-100 hover:border-gray-200'}`}
              >
                <div>
                  <p className="text-xs font-black text-text-slate">{p.name}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{p.desc}</p>
                </div>
                <div className="text-right flex items-center gap-4">
                  <p className="text-xs font-black text-brand-blue">{p.price}</p>
                  {customer.plan === p.name && (
                    <div className="w-5 h-5 rounded-full bg-brand-blue flex items-center justify-center text-white">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Effective Date</p>
            <p className="text-xs font-bold text-text-slate">Immediately (Prorated)</p>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={onClose} className="rounded-2xl text-gray-400 font-black text-[11px] uppercase tracking-widest">Cancel</Button>
            <Button onClick={onClose} className="rounded-2xl h-12 px-8 shadow-glow font-black text-[11px] uppercase tracking-widest">Confirm Change</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
