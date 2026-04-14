'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { 
  AlertTriangle, Trash2, RotateCcw, Archive, 
  ShieldAlert, Info, Power, Mail, Building2, 
  Lock, ArrowRight, CheckCircle, RefreshCcw 
} from 'lucide-react';

export default function DangerZonePanel() {
  const [confirmModal, setConfirmModal] = useState<{ type: string; title: string; requiredText: string } | null>(null);
  const [confirmInput, setConfirmInput] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    if (confirmInput !== confirmModal?.requiredText) return;
    
    setIsDeleting(true);
    setTimeout(() => {
      setIsDeleting(false);
      setConfirmModal(null);
      setConfirmInput('');
      alert('Action performed successfully.');
    }, 2000);
  };

  return (
    <div className="space-y-10 pb-10">
      {/* Header Info */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-red-600">
          <AlertTriangle size={20} />
          <h2 className="text-sm font-black uppercase tracking-widest">Danger Zone</h2>
        </div>
        
        <div className="p-8 bg-red-50 rounded-[40px] border border-red-100 flex items-start gap-5 shadow-sm">
           <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-red-600 shrink-0 shadow-soft">
              <ShieldAlert size={32} />
           </div>
           <div className="space-y-1">
              <h4 className="text-xs font-black text-red-900 uppercase tracking-tight">Critical Actions</h4>
              <p className="text-[11px] font-bold text-red-700 leading-relaxed uppercase tracking-tighter italic">
                 The actions below are irreversible and could lead to permanent data loss. Please proceed with extreme caution and follow the verification steps carefully.
              </p>
           </div>
        </div>
      </section>

      {/* Danger Cards */}
      <div className="grid grid-cols-1 gap-6">
         <DangerCard 
            title="Reset All Attendance Data" 
            description="Permanently delete all attendance records for the current academic year. This cannot be undone."
            actionLabel="Reset Attendance Data"
            variant="amber"
            icon={RotateCcw}
            onClick={() => setConfirmModal({ type: 'reset-attendance', title: 'Reset All Attendance?', requiredText: 'Raj Science Classes' })}
         />
         <DangerCard 
            title="Clear Fee Records" 
            description="Permanently delete all fee collection records. Students and batches will remain. This cannot be undone."
            actionLabel="Clear Fee Records"
            variant="red-outline"
            icon={Trash2}
            onClick={() => setConfirmModal({ type: 'clear-fees', title: 'Clear All Fee Records?', requiredText: 'Raj Science Classes' })}
         />
         <DangerCard 
            title="Archive Academic Year" 
            description="Move all 2025–2026 data to archives and start fresh for 2026–2027. Students and active batches remain."
            actionLabel="Archive & Start New Year"
            variant="purple-outline"
            icon={Archive}
            onClick={() => setConfirmModal({ type: 'archive', title: 'Archive Academic Year?', requiredText: 'ARCHIVE' })}
         />
         <DangerCard 
            title="Delete All Institute Data" 
            description="Permanently delete ALL data including students, batches, attendance, fees, and tests. Your account will remain but be empty."
            actionLabel="Delete Everything"
            variant="red"
            icon={AlertTriangle}
            onClick={() => setConfirmModal({ type: 'delete-all', title: 'Delete ALL Records?', requiredText: 'DELETE' })}
         />
         <DangerCard 
            title="Delete EzzyCoach Account" 
            description="Permanently delete your entire EzzyCoach account and all associated data. This action is final."
            actionLabel="Delete Account Permanently"
            variant="red-dark"
            icon={Power}
            onClick={() => setConfirmModal({ type: 'delete-account', title: 'Delete Entire Account?', requiredText: 'raj@rajscienceclasses.in' })}
         />
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={!!confirmModal}
        onClose={() => { setConfirmModal(null); setConfirmInput(''); }}
        title={confirmModal?.title || 'Are you sure?'}
        width="max-w-md"
        footer={(
          <>
            <Button variant="outline" onClick={() => { setConfirmModal(null); setConfirmInput(''); }}>Cancel</Button>
            <Button 
              className={`font-black uppercase tracking-widest text-[10px] h-11 px-8 rounded-2xl transition-all ${
                confirmInput === confirmModal?.requiredText 
                ? 'bg-red-600 text-white hover:bg-red-700 shadow-glow' 
                : 'bg-gray-100 text-gray-300 cursor-not-allowed'
              }`}
              onClick={handleDelete}
              disabled={isDeleting || confirmInput !== confirmModal?.requiredText}
            >
              {isDeleting ? <RefreshCcw className="animate-spin mr-2" size={16} /> : <CheckCircle className="mr-2" size={16} />}
              {isDeleting ? 'Processing...' : 'Confirm Action'}
            </Button>
          </>
        )}
      >
        <div className="space-y-8 py-2">
           <div className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-[24px] bg-red-50 text-red-600 flex items-center justify-center shadow-soft">
                 <AlertTriangle size={36} />
              </div>
              <div className="space-y-2">
                 <p className="text-xs font-bold text-gray-500 uppercase tracking-widest leading-relaxed">
                    This action is <span className="text-red-600 font-black">irreversible</span>. To proceed, please type the following exactly:
                 </p>
                 <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 select-all cursor-copy group relative">
                    <span className="font-mono text-lg font-black text-gray-900 uppercase">{confirmModal?.requiredText}</span>
                    <Lock size={12} className="absolute top-2 right-2 text-gray-300 group-hover:text-purple-600" />
                 </div>
              </div>
           </div>

           <div className="space-y-4">
              <Input 
                placeholder="Type confirmation here..."
                value={confirmInput}
                onChange={(e) => setConfirmInput(e.target.value)}
                className="rounded-2xl h-12 border-gray-100 bg-gray-50/50 px-5 font-black uppercase tracking-widest placeholder:normal-case placeholder:font-bold focus:ring-red-500/10 focus:border-red-500"
              />
              <div className="flex items-start gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-tighter px-1">
                 <Info size={14} className="text-red-400 mt-0.5" />
                 <p>I understand the consequences of this action and wish to continue.</p>
              </div>
           </div>
        </div>
      </Modal>
    </div>
  );
}

function DangerCard({ title, description, actionLabel, variant, icon: Icon, onClick }: { title: string, description: string, actionLabel: string, variant: string, icon: any, onClick: () => void }) {
  const variantStyles: Record<string, string> = {
    'amber': 'border-amber-100 bg-white hover:border-amber-300 text-amber-600 hover:bg-amber-50',
    'red-outline': 'border-red-100 bg-white hover:border-red-300 text-red-600 hover:bg-red-50',
    'purple-outline': 'border-purple-100 bg-white hover:border-purple-300 text-purple-600 hover:bg-purple-50',
    'red': 'border-red-100 bg-red-50 hover:border-red-300 text-red-600 hover:bg-red-600 hover:text-white',
    'red-dark': 'border-red-200 bg-red-100 text-red-700 hover:bg-red-700 hover:text-white hover:border-red-700'
  };

  return (
    <div className={`p-8 rounded-[40px] border-2 transition-all flex flex-col md:flex-row items-center gap-8 group ${variantStyles[variant]}`}>
       <div className={`w-14 h-14 rounded-[24px] flex items-center justify-center shrink-0 shadow-soft group-hover:rotate-12 transition-transform ${
         variant.includes('red') ? 'bg-red-50 text-red-600' : 'bg-white'
       }`}>
          <Icon size={28} />
       </div>
       <div className="flex-1 flex flex-col gap-1 text-center md:text-left">
          <h4 className="text-lg font-black uppercase tracking-tight text-gray-900 group-hover:text-inherit">{title}</h4>
          <p className="text-[11px] font-bold uppercase tracking-widest leading-relaxed opacity-60 italic">{description}</p>
       </div>
       <Button 
        onClick={onClick}
        variant="outline" 
        className="h-12 px-8 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all group-hover:shadow-glow shrink-0 bg-white"
       >
          {actionLabel} <ArrowRight size={16} className="ml-2" />
       </Button>
    </div>
  );
}
