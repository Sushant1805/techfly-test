'use client';
import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Subscription, plans } from '@/lib/subscriptions';
import { Badge } from '@/components/ui/Badge';
import { 
  CreditCard, Calendar, User, Info, Check, 
  ChevronRight, ArrowLeft, Send, AlertTriangle, Trash2 
} from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  subscription?: Subscription | null;
}

export const EditSubscriptionModal = ({ isOpen, onClose, subscription }: ModalProps) => {
  if (!subscription) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Edit Subscription — ${subscription.customerName}`} size="lg">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Plan</p>
            <div className="flex gap-2 p-1 bg-slate-soft rounded-2xl border border-gray-100">
               {['Free', 'Basic', 'Pro'].map(p => (
                 <button key={p} className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${subscription.plan === p ? 'bg-white text-brand-blue shadow-soft' : 'text-gray-400 hover:text-gray-600'}`}>{p}</button>
               ))}
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Billing Cycle</p>
            <div className="flex gap-2 p-1 bg-slate-soft rounded-2xl border border-gray-100">
               {['Monthly', 'Annual'].map(c => (
                 <button key={c} className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${subscription.billingCycle === c ? 'bg-white text-brand-blue shadow-soft' : 'text-gray-400 hover:text-gray-600'}`}>{c}</button>
               ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Period Start</p>
            <input type="date" defaultValue={subscription.currentPeriodStart} className="w-full h-12 bg-slate-soft border border-gray-100 rounded-2xl px-4 text-sm font-bold" />
          </div>
          <div className="space-y-2">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Period End</p>
            <input type="date" defaultValue={subscription.currentPeriodEnd} className="w-full h-12 bg-slate-soft border border-gray-100 rounded-2xl px-4 text-sm font-bold" />
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Status</p>
          <select defaultValue={subscription.planStatus} className="w-full h-12 bg-slate-soft border border-gray-100 rounded-2xl px-4 text-sm font-bold">
            <option>Active</option>
            <option>Trial</option>
            <option>Suspended</option>
            <option>Cancelled</option>
          </select>
        </div>

        <div className="flex items-center justify-between p-4 bg-slate-soft/50 rounded-2xl border border-gray-100">
          <div className="flex items-center gap-3">
             <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${subscription.autoRenew ? 'bg-green-500/10 text-green-600' : 'bg-gray-200 text-gray-400'}`}>
               <RotateCw className="w-5 h-5" />
             </div>
             <div>
               <p className="text-xs font-black text-text-slate uppercase tracking-tight">Auto Renew</p>
               <p className="text-[10px] font-bold text-gray-400 uppercase">{subscription.autoRenew ? 'Enabled for next period' : 'Manual renewal required'}</p>
             </div>
          </div>
          <button className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${subscription.autoRenew ? 'bg-green-500' : 'bg-gray-200'}`}>
            <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${subscription.autoRenew ? 'translate-x-5' : 'translate-x-0'}`} />
          </button>
        </div>

        <div className="flex gap-4 pt-4">
          <Button variant="outline" onClick={onClose} className="flex-1 h-14 rounded-2xl font-black uppercase text-[11px] border-gray-200">Cancel</Button>
          <Button onClick={onClose} className="flex-1 h-14 rounded-2xl font-black uppercase text-[11px] shadow-glow bg-brand-blue">Save Changes</Button>
        </div>
      </div>
    </Modal>
  );
};

export const RenewModal = ({ isOpen, onClose, subscription }: ModalProps) => {
  if (!subscription) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Renew Subscription" size="md">
      <div className="space-y-6">
        <div className="bg-slate-soft p-6 rounded-3xl border border-gray-100 space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Current Plan</p>
            <Badge variant="purple">{subscription.plan} Annual</Badge>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Current Expiry</p>
            <p className="text-sm font-black text-text-slate uppercase">{new Date(subscription.currentPeriodEnd).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Renew For</p>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 rounded-2xl border-2 border-brand-blue bg-brand-blue/5 text-left transition-all">
              <div className="flex justify-between items-center mb-1">
                <p className="text-xs font-black text-brand-blue uppercase">1 Year</p>
                <div className="w-4 h-4 rounded-full bg-brand-blue flex items-center justify-center text-white"><Check className="w-3 h-3" /></div>
              </div>
              <p className="text-sm font-black text-text-slate tracking-tight">₹10,000 + GST</p>
              <p className="text-[10px] font-bold text-green-600 uppercase mt-1">Save 17%</p>
            </button>
            <button className="p-4 rounded-2xl border-2 border-gray-100 bg-white hover:border-brand-blue/30 text-left transition-all">
              <p className="text-xs font-black text-gray-400 uppercase mb-1">1 Month</p>
              <p className="text-sm font-black text-text-slate tracking-tight">₹1,000 + GST</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase mt-1">Standard Rate</p>
            </button>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-brand-blue/5 border border-brand-blue/10 flex justify-between items-center">
           <div>
             <p className="text-[10px] font-black text-brand-blue uppercase tracking-widest mb-1">New Expiry Date</p>
             <p className="text-xl font-black text-text-slate">31 Dec 2027</p>
           </div>
           <div className="text-right">
             <p className="text-[10px] font-black text-brand-blue uppercase tracking-widest mb-1">Total Due</p>
             <p className="text-xl font-black text-text-slate">₹11,800</p>
           </div>
        </div>

        <Button onClick={onClose} className="w-full h-16 rounded-2xl font-black uppercase tracking-widest text-xs shadow-glow bg-brand-blue h-14">
          Renew Now & Generate Invoice
        </Button>
      </div>
    </Modal>
  );
};

export const CancelModal = ({ isOpen, onClose, subscription }: ModalProps) => {
  if (!subscription) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Cancel Subscription" size="md">
      <div className="space-y-6">
        <div className="p-6 rounded-2xl bg-red-50 border border-red-100 flex gap-4">
          <AlertTriangle className="w-6 h-6 text-red-500 shrink-0" />
          <p className="text-xs font-bold text-red-800 leading-relaxed">
            Cancelling will revoke access for <strong>{subscription.customerName}</strong> immediately or at the end of the period. This action cannot be undone.
          </p>
        </div>

        <div className="space-y-4">
           <div className="space-y-2">
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Cancellation Type</p>
             <div className="grid grid-cols-2 gap-3">
                <button className="p-3 rounded-xl border-2 border-red-500 bg-red-50 text-[10px] font-black uppercase text-red-600">Immediate</button>
                <button className="p-3 rounded-xl border border-gray-100 hover:border-gray-200 text-[10px] font-black uppercase text-gray-400">At period end</button>
             </div>
           </div>

           <div className="space-y-2">
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Reason *</p>
             <select className="w-full h-12 bg-slate-soft border border-gray-100 rounded-2xl px-4 text-sm font-bold">
                <option>Select a reason...</option>
                <option>Non-payment</option>
                <option>Customer request</option>
                <option>Switching competitor</option>
             </select>
           </div>
        </div>

        <div className="p-6 rounded-3xl bg-slate-soft/50 border border-gray-100 flex justify-between items-center">
           <div>
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Prorated Refund</p>
             <p className="text-xl font-black text-green-600">₹3,904</p>
           </div>
           <div className="flex items-center gap-2">
             <span className="text-[10px] font-black text-gray-400 uppercase">Issue Refund?</span>
             <button className="h-6 w-11 rounded-full bg-gray-200"><div className="w-5 h-5 bg-white rounded-full m-0.5" /></button>
           </div>
        </div>

        <div className="flex gap-4">
          <Button variant="outline" onClick={onClose} className="flex-1 h-14 rounded-2xl font-black uppercase text-[11px] border-gray-200">Keep Subscription</Button>
          <Button onClick={onClose} className="flex-1 h-14 rounded-2xl font-black uppercase text-[11px] bg-red-500 shadow-none text-white hover:bg-red-600">Confirm Cancellation</Button>
        </div>
      </div>
    </Modal>
  );
};

export const NewSubscriptionModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [step, setStep] = useState(1);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={step === 1 ? "New Subscription — Step 1" : "New Subscription — Step 2"} size="lg">
      <div className="space-y-8">
        {step === 1 ? (
          <div className="space-y-8">
             <div className="space-y-2">
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Select Customer *</p>
               <input type="text" placeholder="Search by name, institute or phone..." className="w-full h-14 bg-slate-soft border border-gray-100 rounded-2xl px-6 text-sm font-bold" />
             </div>

             <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Select Plan</p>
                  <div className="grid grid-cols-3 gap-2">
                    {['Free', 'Basic', 'Pro'].map(p => (
                      <button key={p} className={`py-3 rounded-xl text-[10px] font-black uppercase border transition-all ${p === 'Pro' ? 'bg-brand-blue text-white shadow-glow border-brand-blue' : 'bg-white border-gray-100 text-gray-400'}`}>{p}</button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Billing Cycle</p>
                  <div className="grid grid-cols-2 gap-2">
                    {['Monthly', 'Annual'].map(c => (
                      <button key={c} className={`py-3 rounded-xl text-[10px] font-black uppercase border transition-all ${c === 'Annual' ? 'bg-text-slate text-white shadow-soft border-text-slate' : 'bg-white border-gray-100 text-gray-400'}`}>{c}</button>
                    ))}
                  </div>
                </div>
             </div>

             <div className="p-6 rounded-3xl bg-brand-blue/5 border border-brand-blue/10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue"><Info className="w-5 h-5" /></div>
                   <div>
                     <p className="text-xs font-black text-text-slate uppercase tracking-tight">Offer 14-day Free Trial?</p>
                     <p className="text-[10px] font-bold text-gray-400 uppercase">Customer will not be charged until trial ends</p>
                   </div>
                </div>
                <button className="h-6 w-11 rounded-full bg-brand-blue flex justify-end items-center px-0.5"><div className="w-5 h-5 bg-white rounded-full shadow-sm" /></button>
             </div>

             <Button onClick={() => setStep(2)} className="w-full h-16 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-glow bg-brand-blue group">
                Continue to Payment <ChevronRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
             </Button>
          </div>
        ) : (
          <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
             <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Start Date *</p>
                  <input type="date" className="w-full h-14 bg-slate-soft border border-gray-100 rounded-2xl px-6 text-sm font-bold" defaultValue="2026-04-11" />
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Payment Mode</p>
                  <select className="w-full h-14 bg-slate-soft border border-gray-100 rounded-2xl px-6 text-sm font-bold">
                    <option>Bank Transfer</option>
                    <option>UPI</option>
                    <option>Cheque</option>
                    <option>Card</option>
                  </select>
                </div>
             </div>

             <div className="p-8 rounded-3xl bg-text-slate text-white shadow-soft-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
                <div className="relative z-10 space-y-4">
                   <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
                     <span>Estimated Total</span>
                     <span>Pro Annual</span>
                   </div>
                   <div className="flex justify-between items-end">
                     <div>
                       <p className="text-4xl font-black tracking-tighter">₹11,800</p>
                       <p className="text-[10px] font-black text-brand-blue uppercase mt-2 tracking-[0.2em]">Including 18% GST (₹1,800)</p>
                     </div>
                     <div className="text-right">
                       <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1 italic">Renews next year at</p>
                       <p className="text-lg font-black text-white/80">₹10,000</p>
                     </div>
                   </div>
                </div>
             </div>

             <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="w-4 h-4 rounded text-brand-blue" defaultChecked />
                  <span className="text-xs font-black text-text-slate uppercase tracking-tight">Generate invoice & send payment receipt</span>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="w-4 h-4 rounded text-brand-blue" defaultChecked />
                  <span className="text-xs font-black text-text-slate uppercase tracking-tight">Send welcome kit via WhatsApp and Email</span>
                </div>
             </div>

             <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1 h-14 rounded-2xl font-black uppercase text-[11px] border-gray-200">
                   <ArrowLeft className="mr-2 w-4 h-4" /> Back
                </Button>
                <Button onClick={onClose} className="flex-1 h-14 rounded-2xl font-black uppercase text-[11px] shadow-glow bg-brand-blue">
                   Create Subscription
                </Button>
             </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

const RotateCw = (props: any) => (
  <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rotate-cw"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
);
