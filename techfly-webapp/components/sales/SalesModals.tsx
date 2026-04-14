'use client';
import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Lead, LeadStage, FollowUp, Demo } from '@/lib/salesData';
import { Plus, Edit2, Check, X, Info, HelpCircle, ChevronRight, ArrowLeft, Send, AlertTriangle, Trash2, Phone, Mail, Calendar, Clock, MapPin, Video, Smile } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead?: Lead | null;
}

export const AddLeadModal = ({ isOpen, onClose }: ModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Lead" size="lg">
      <div className="space-y-8 max-h-[70vh] overflow-y-auto pr-2 no-scrollbar">
        {/* Section 1: Contact */}
        <div className="space-y-4">
          <p className="text-[10px] font-black text-brand-blue uppercase tracking-[0.2em]">Section 1 — Contact</p>
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Institute Name *" placeholder="e.g. Star Coaching Centre" />
            <InputField label="Contact Person *" placeholder="e.g. Ramesh Patil" />
            <InputField label="Phone *" placeholder="987123XXXX" />
            <InputField label="Email" placeholder="contact@institute.com" />
            <InputField label="City *" placeholder="e.g. Kolhapur" />
            <div className="space-y-2">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">State</p>
              <select className="w-full h-12 bg-slate-soft border border-gray-100 rounded-2xl px-4 text-sm font-bold">
                <option>Maharashtra (MH)</option>
                <option>Telangana (TS)</option>
                <option>Karnataka (KA)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Lead Details */}
        <div className="space-y-4 pt-4 border-t border-gray-100">
          <p className="text-[10px] font-black text-brand-blue uppercase tracking-[0.2em]">Section 2 — Lead Details</p>
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Interested Plan *</p>
                <div className="flex gap-2 p-1 bg-slate-soft rounded-2xl border border-gray-100">
                  {['Free', 'Basic', 'Pro'].map(p => (
                    <button key={p} className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${p === 'Pro' ? 'bg-white text-brand-blue shadow-soft' : 'text-gray-400'}`}>{p}</button>
                  ))}
                </div>
             </div>
             <InputField label="Expected MRR" value="₹1,000" disabled />
             <div className="space-y-2">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Priority *</p>
                <div className="flex gap-2 p-1 bg-slate-soft rounded-2xl border border-gray-100">
                  {['High', 'Medium', 'Low'].map(p => (
                    <button key={p} className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${p === 'Medium' ? 'bg-white text-text-slate shadow-soft' : 'text-gray-400'}`}>{p}</button>
                  ))}
                </div>
             </div>
             <div className="space-y-2">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Source *</p>
              <select className="w-full h-12 bg-slate-soft border border-gray-100 rounded-2xl px-4 text-sm font-bold">
                <option>Google Ad</option>
                <option>Referral</option>
                <option>Website</option>
                <option>Social Media</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: Assignment */}
        <div className="space-y-4 pt-4 border-t border-gray-100">
          <p className="text-[10px] font-black text-brand-blue uppercase tracking-[0.2em]">Section 3 — Assignment</p>
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Assigned To *</p>
              <select className="w-full h-12 bg-slate-soft border border-gray-100 rounded-2xl px-4 text-sm font-bold">
                <option>Ravi Tiwari</option>
                <option>Neha Gupta</option>
                <option>Pooja Mehta</option>
              </select>
            </div>
            <div className="space-y-2">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Initial Stage *</p>
              <select className="w-full h-12 bg-slate-soft border border-gray-100 rounded-2xl px-4 text-sm font-bold">
                <option>New Lead</option>
                <option>Contacted</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Initial Note</p>
            <textarea className="w-full h-24 bg-slate-soft border border-gray-100 rounded-2xl p-4 text-sm font-bold focus:outline-none" placeholder="Add any initial context..." />
          </div>
        </div>

        <div className="flex gap-4 pt-4 sticky bottom-0 bg-white">
          <Button variant="outline" onClick={onClose} className="flex-1 h-14 rounded-2xl font-black uppercase text-[11px] border-gray-200">Cancel</Button>
          <Button onClick={onClose} className="flex-1 h-14 rounded-2xl font-black uppercase text-[11px] shadow-glow bg-brand-blue">Add Lead</Button>
        </div>
      </div>
    </Modal>
  );
};

export const ConvertLeadModal = ({ isOpen, onClose, lead }: ModalProps) => {
  const [step, setStep] = useState(1);
  if (!lead) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={step === 1 ? `Convert Lead — ${lead.instituteName}! 🎉` : "Payment & Billing"} size="lg">
      <div className="space-y-8 animate-in fade-in duration-300">
        {step === 1 ? (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-brand-blue/5 border border-brand-blue/10 flex gap-4">
              <div className="w-12 h-12 bg-brand-blue text-white rounded-2xl flex items-center justify-center font-black">🎉</div>
              <div>
                <p className="text-sm font-black text-text-slate">Congratulations! Create their account:</p>
                <p className="text-xs font-bold text-gray-400 mt-1">This will create a new Customer and Subscription record.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Plan</p>
                <select defaultValue={lead.interestedPlan} className="w-full h-12 bg-slate-soft border border-gray-100 rounded-2xl px-4 text-sm font-bold">
                  <option>Free</option>
                  <option>Basic</option>
                  <option>Pro</option>
                </select>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Billing Cycle</p>
                <select defaultValue="Annual" className="w-full h-12 bg-slate-soft border border-gray-100 rounded-2xl px-4 text-sm font-bold">
                  <option>Monthly</option>
                  <option>Annual</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-[10px] font-black text-brand-blue uppercase tracking-[0.2em]">Customer Profile</p>
              <div className="grid grid-cols-2 gap-4">
                <InputField label="Institute Name" defaultValue={lead.instituteName} />
                <InputField label="Owner Name" defaultValue={lead.contactPerson} />
                <InputField label="Email" defaultValue={lead.email} />
                <InputField label="City" defaultValue={lead.city} />
              </div>
            </div>

            <Button onClick={() => setStep(2)} className="w-full h-14 rounded-2xl font-black uppercase text-[11px] shadow-glow bg-brand-blue group">
              Next: Payment Details <ChevronRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
             <div className="p-8 rounded-[32px] bg-text-slate text-white shadow-soft-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
                <div className="relative z-10 space-y-4">
                   <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
                     <span>Payment Preview</span>
                     <span>Pro Annual</span>
                   </div>
                   <div className="flex justify-between items-end">
                     <div>
                       <p className="text-4xl font-black tracking-tighter">₹11,800</p>
                       <p className="text-[10px] font-black text-brand-blue uppercase mt-2 tracking-[0.2em]">Including 18% GST (₹1,800)</p>
                     </div>
                     <div className="text-right">
                       <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1 italic">Renewal Date</p>
                       <p className="text-lg font-black text-white/80">12 Apr 2027</p>
                     </div>
                   </div>
                </div>
             </div>

             <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Payment Mode</p>
                  <select className="w-full h-12 bg-slate-soft border border-gray-100 rounded-2xl px-4 text-sm font-bold">
                    <option>Bank Transfer</option>
                    <option>UPI</option>
                    <option>Check</option>
                  </select>
                </div>
                <div className="flex items-center gap-3 p-4 bg-brand-blue/5 rounded-2xl border border-brand-blue/10">
                  <input type="checkbox" className="w-4 h-4 rounded text-brand-blue" defaultChecked />
                  <span className="text-[10px] font-black text-text-slate uppercase tracking-tight">Generate invoice & Send Welcome Kit</span>
                </div>
             </div>

             <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1 h-14 rounded-2xl font-black uppercase text-[11px] border-gray-200">Back</Button>
                <Button onClick={onClose} className="flex-1 h-14 rounded-2xl font-black uppercase text-[11px] shadow-glow bg-brand-blue">Convert & Activate</Button>
             </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export const MarkLostModal = ({ isOpen, onClose, lead }: ModalProps) => {
  if (!lead) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Mark Lead as Lost" size="md">
      <div className="space-y-6">
        <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 flex gap-4">
          <AlertTriangle className="w-6 h-6 text-gray-400 shrink-0" />
          <p className="text-xs font-bold text-gray-500 leading-relaxed">
            Marking <strong>{lead.instituteName}</strong> as lost. You can still reach out to them later from the Lost column.
          </p>
        </div>

        <div className="space-y-4">
           <div className="space-y-2">
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Loss Reason *</p>
             <select className="w-full h-12 bg-slate-soft border border-gray-100 rounded-2xl px-4 text-sm font-bold">
                <option>Select a reason...</option>
                <option>Went to competitor</option>
                <option>Price concern</option>
                <option>No budget right now</option>
                <option>No response (ghosted)</option>
             </select>
           </div>
           <div className="space-y-2">
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Additional Notes</p>
             <textarea className="w-full h-24 bg-slate-soft border border-gray-100 rounded-2xl p-4 text-sm font-bold" placeholder="Context on why the deal was lost..." />
           </div>
        </div>

        <div className="flex gap-4">
          <Button variant="outline" onClick={onClose} className="flex-1 h-14 rounded-2xl font-black uppercase text-[11px] border-gray-100">Cancel</Button>
          <Button onClick={onClose} className="flex-1 h-14 rounded-2xl font-black uppercase text-[11px] bg-red-500 text-white hover:bg-red-600 shadow-none">Save & Mark Lost</Button>
        </div>
      </div>
    </Modal>
  );
};

export const FollowUpModal = ({ isOpen, onClose, lead }: ModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Schedule Follow-up" size="md">
      <div className="space-y-6">
        <div className="space-y-2">
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Lead *</p>
           <div className="h-12 bg-slate-soft border border-gray-100 rounded-2xl px-4 flex items-center text-sm font-black text-text-slate">
             {lead ? lead.instituteName : "Search leads..."}
           </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Type *</p>
             <select className="w-full h-12 bg-slate-soft border border-gray-100 rounded-2xl px-4 text-sm font-bold">
                <option>Call</option>
                <option>WhatsApp</option>
                <option>Email</option>
                <option>Meeting</option>
             </select>
          </div>
          <div className="space-y-2">
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Priority *</p>
             <select className="w-full h-12 bg-slate-soft border border-gray-100 rounded-2xl px-4 text-sm font-bold">
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
             </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Date *</p>
             <input type="date" className="w-full h-12 bg-slate-soft border border-gray-100 rounded-2xl px-4 text-sm font-bold" />
          </div>
          <div className="space-y-2">
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Time</p>
             <input type="time" className="w-full h-12 bg-slate-soft border border-gray-100 rounded-2xl px-4 text-sm font-bold" />
          </div>
        </div>

        <div className="space-y-2">
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Notes</p>
           <textarea className="w-full h-24 bg-slate-soft border border-gray-100 rounded-2xl p-4 text-sm font-bold" placeholder="What to discuss?" />
        </div>

        <Button onClick={onClose} className="w-full h-14 rounded-2xl font-black uppercase text-[11px] shadow-glow bg-brand-blue">
          Schedule Follow-up
        </Button>
      </div>
    </Modal>
  );
};

export const DemoModal = ({ isOpen, onClose, lead }: ModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Schedule Demo" size="md">
      <div className="space-y-6">
        <div className="space-y-2">
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Lead *</p>
           <div className="h-12 bg-slate-soft border border-gray-100 rounded-2xl px-4 flex items-center text-sm font-black text-text-slate">
             {lead ? lead.instituteName : "Search leads..."}
           </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Date *</p>
             <input type="date" className="w-full h-12 bg-slate-soft border border-gray-100 rounded-2xl px-4 text-sm font-bold" />
          </div>
          <div className="space-y-2">
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Time *</p>
             <input type="time" className="w-full h-12 bg-slate-soft border border-gray-100 rounded-2xl px-4 text-sm font-bold" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Duration</p>
             <select className="w-full h-12 bg-slate-soft border border-gray-100 rounded-2xl px-4 text-sm font-bold">
                <option>30 min</option>
                <option>45 min</option>
                <option>60 min</option>
                <option>90 min</option>
             </select>
          </div>
          <div className="space-y-2">
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Mode *</p>
             <select className="w-full h-12 bg-slate-soft border border-gray-100 rounded-2xl px-4 text-sm font-bold">
                <option>Online (GMeet)</option>
                <option>In-Person</option>
             </select>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-soft/50 border border-gray-100 flex items-center justify-between">
           <span className="text-[10px] font-black text-gray-400 uppercase">Meet Link</span>
           <span className="text-xs font-black text-brand-blue">meet.google.com/xxx-xxxx-xxx</span>
        </div>

        <Button onClick={onClose} className="w-full h-14 rounded-2xl font-black uppercase text-[11px] shadow-glow bg-brand-blue">
          Schedule Demo
        </Button>
      </div>
    </Modal>
  );
};

const InputField = ({ label, ...props }: any) => (
  <div className="space-y-2">
    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">{label}</p>
    <input {...props} className="w-full h-12 bg-slate-soft border border-gray-100 rounded-2xl px-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all disabled:opacity-50" />
  </div>
);
