'use client';
import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { teamMembers } from '@/lib/customers';

interface AddCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddCustomerModal = ({ isOpen, onClose }: AddCustomerModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Customer" maxWidth="600px">
      <div className="space-y-8 max-h-[70vh] overflow-y-auto px-1 pr-4 no-scrollbar">
        {/* Section 1: Institute Details */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Institute Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Institute Name" placeholder="e.g. Raj Science Classes" required />
            <InputField label="Owner Name" placeholder="e.g. Rajesh Mehta" required />
            <InputField label="Phone" placeholder="10-digit number" required />
            <InputField label="Email" placeholder="raj@example.com" required type="email" />
            <InputField label="City" placeholder="e.g. Pune" required />
            <InputField label="State" placeholder="e.g. MH" required />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-black text-text-slate uppercase tracking-widest pl-1">Address</label>
            <textarea 
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-bold focus:outline-none focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue/20 transition-all resize-none h-24"
              placeholder="Full address..."
            />
          </div>
        </div>

        {/* Section 2: Plan & Subscription */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Plan & Subscription</h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-black text-text-slate uppercase tracking-widest pl-1">Select Plan</label>
              <div className="flex p-1 bg-gray-100 rounded-xl">
                {['Free', 'Basic', 'Pro'].map((p) => (
                  <button key={p} className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${p === 'Pro' ? 'bg-white text-brand-blue shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-black text-text-slate uppercase tracking-widest pl-1">Billing Cycle</label>
              <div className="flex p-1 bg-gray-100 rounded-xl">
                {['Monthly', 'Annual'].map((p) => (
                  <button key={p} className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${p === 'Annual' ? 'bg-white text-brand-blue shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Assignment */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Assignment & Source</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-black text-text-slate uppercase tracking-widest pl-1">Assigned To</label>
              <select className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-bold focus:outline-none cursor-pointer">
                {teamMembers.map(tm => <option key={tm.id} value={tm.name}>{tm.name} ({tm.role})</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-black text-text-slate uppercase tracking-widest pl-1">Source</label>
              <select className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-bold focus:outline-none cursor-pointer">
                <option>Google Ad</option>
                <option>Referral</option>
                <option>Website</option>
                <option>Cold Call</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 mt-10 pt-6 border-t border-gray-50">
        <Button variant="ghost" onClick={onClose} className="rounded-2xl text-gray-400 font-black text-[11px] uppercase tracking-widest">Cancel</Button>
        <Button onClick={onClose} className="rounded-2xl h-12 px-8 shadow-glow font-black text-[11px] uppercase tracking-widest">Add Customer</Button>
      </div>
    </Modal>
  );
};

const InputField = ({ label, placeholder, required = false, type = "text" }: any) => (
  <div className="flex flex-col gap-2">
    <label className="text-[11px] font-black text-text-slate uppercase tracking-widest pl-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input 
      type={type}
      placeholder={placeholder}
      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-bold focus:outline-none focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue/20 transition-all"
    />
  </div>
);
