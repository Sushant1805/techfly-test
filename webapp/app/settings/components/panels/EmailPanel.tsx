'use client';
import React, { useState } from 'react';
import { mockTemplates, MessageTemplate } from '@/lib/settingsData';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { 
  Mail, Server, CheckCircle, Plus, 
  Edit, Eye, Info, Send, RefreshCcw, 
  ChevronDown, Settings, Globe, Shield,
  AlertCircle 
} from 'lucide-react';

export default function EmailPanel() {
  const [templates, setTemplates] = useState<MessageTemplate[]>(mockTemplates);
  const [smtpStatus, setSmtpStatus] = useState<'connected' | 'not-setup'>('not-setup');

  const handleTestEmail = () => {
    alert('Test email sent to raj@rajclasses.in');
    setSmtpStatus('connected');
  };

  return (
    <div className="space-y-12 pb-10">
      {/* SMTP Provider Config */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-purple-600">
          <Server size={20} />
          <h2 className="text-sm font-black uppercase tracking-widest">Email Provider (SMTP)</h2>
        </div>
        
        <div className="bg-gray-50/30 rounded-[40px] border border-gray-100 p-8 space-y-8 relative overflow-hidden">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">SMTP Host</label>
                 <Input placeholder="smtp.gmail.com" className="rounded-2xl h-11 border-gray-100 bg-white px-5 font-bold" />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Port</label>
                 <select className="w-full rounded-2xl border border-gray-100 bg-white h-11 px-4 font-bold outline-none appearance-none">
                    <option>587 (TLS)</option>
                    <option>465 (SSL)</option>
                    <option>25</option>
                 </select>
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Encryption</label>
                 <div className="flex gap-2">
                    <Badge className="bg-purple-100 text-purple-600 px-4 py-1">TLS</Badge>
                    <Badge className="bg-gray-100 text-gray-400 px-4 py-1">SSL</Badge>
                 </div>
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Username</label>
                 <Input placeholder="user@gmail.com" className="rounded-2xl h-11 border-gray-100 bg-white px-5 font-bold" />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Password</label>
                 <Input type="password" placeholder="••••••••••••" className="rounded-2xl h-11 border-gray-100 bg-white px-5 font-bold" />
              </div>
              <div className="flex items-end pb-1 gap-2">
                 <Button onClick={handleTestEmail} className="flex-1 h-11 rounded-2xl bg-purple-600 text-white font-black uppercase tracking-widest text-[10px] gap-2 shadow-soft hover:bg-purple-700">
                    <Send size={14} /> Send Test Email
                 </Button>
                 <Button variant="outline" className="h-11 px-4 rounded-2xl border-gray-100 text-gray-400 hover:bg-gray-50">
                    <Settings size={18} />
                 </Button>
              </div>
           </div>

           <div className={`p-6 rounded-3xl border transition-all flex items-center gap-6 ${
             smtpStatus === 'connected' ? 'bg-green-50/50 border-green-100 ring-4 ring-green-100/20' : 'bg-amber-50/50 border-amber-100 ring-4 ring-amber-100/20'
           }`}>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-soft ${
                smtpStatus === 'connected' ? 'bg-white text-green-500' : 'bg-white text-amber-500 animate-pulse'
              }`}>
                 {smtpStatus === 'connected' ? <CheckCircle size={28} /> : <AlertCircle size={28} />}
              </div>
              <div className="flex flex-col">
                 <h4 className={`text-sm font-black uppercase tracking-tight ${smtpStatus === 'connected' ? 'text-green-900' : 'text-amber-900'}`}>
                    SMTP Connection: {smtpStatus === 'connected' ? 'Connected' : 'Not Configured'}
                 </h4>
                 <p className={`text-[10px] font-bold uppercase tracking-widest italic leading-relaxed ${smtpStatus === 'connected' ? 'text-green-700' : 'text-amber-700'}`}>
                    Your email service is {smtpStatus === 'connected' ? 'currently sending outgoing mail.' : 'ready for setup. Enter credentials above to begin.'}
                 </p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                 <div className={`w-2 h-2 rounded-full ${smtpStatus === 'connected' ? 'bg-green-500 animate-ping' : 'bg-amber-500'}`} />
                 <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">{smtpStatus === 'connected' ? 'Live' : 'Standby'}</span>
              </div>
           </div>
        </div>
      </section>

      <hr className="border-gray-50 shrink-0" />

      {/* Email Templates List */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-purple-600">
            <Mail size={20} />
            <h2 className="text-sm font-black uppercase tracking-widest">Email Templates</h2>
          </div>
          <Button className="h-10 px-6 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold gap-2 text-xs">
            <Plus size={16} /> New Email Template
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           <TemplateCard name="Student Welcome Email" lastEdited="2 days ago" type="System" />
           <TemplateCard name="Monthly Progress Report" lastEdited="5 days ago" type="Academic" />
           <TemplateCard name="Fee Payment Reciept" lastEdited="10 Apr 2026" type="Financial" />
           <TemplateCard name="Parent-Teacher Meeting" lastEdited="15 Apr 2026" type="Communication" />
        </div>
      </section>

      <div className="p-6 bg-purple-50 rounded-[32px] border border-purple-100 flex items-start gap-5 shadow-sm">
         <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-purple-600 shrink-0 shadow-soft">
            <Shield size={24} />
         </div>
         <div className="space-y-1">
            <h4 className="text-xs font-black text-purple-900 uppercase tracking-tight italic">Security Notification</h4>
            <p className="text-[11px] font-bold text-purple-700 leading-relaxed uppercase tracking-tighter">
               Using a professional SMTP provider (SendGrid, Mailgun) is highly recommended for higher delivery rates. Gmail SMTP might require an "App Password" to function correctly.
            </p>
         </div>
      </div>
    </div>
  );
}

function TemplateCard({ name, lastEdited, type }: { name: string, lastEdited: string, type: string }) {
  return (
    <div className="p-6 bg-white border-2 border-gray-50 rounded-[32px] hover:border-purple-100 hover:shadow-soft-lg transition-all group relative overflow-hidden">
       <div className="flex justify-between items-start relative z-10">
          <div className="flex flex-col gap-1">
             <div className="flex items-center gap-2">
                <span className="text-[9px] font-black text-purple-600 uppercase tracking-widest bg-purple-50 px-2 h-5 flex items-center rounded-lg">{type}</span>
                <span className="text-[9px] font-bold text-gray-400 uppercase italic">{lastEdited}</span>
             </div>
             <h4 className="text-sm font-black text-gray-900 uppercase tracking-tight group-hover:text-purple-600 transition-colors mt-2">{name}</h4>
          </div>
          <div className="flex flex-col gap-2">
             <button className="w-9 h-9 bg-gray-50 hover:bg-purple-600 hover:text-white rounded-xl flex items-center justify-center transition-all text-gray-400 group-hover:shadow-glow"><Edit size={16} /></button>
             <button className="w-9 h-9 bg-gray-50 hover:bg-gray-100 rounded-xl flex items-center justify-center transition-all text-gray-400"><Eye size={16} /></button>
          </div>
       </div>
       <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-purple-50 rounded-full blur-2xl opacity-10 group-hover:scale-150 transition-transform duration-700" />
    </div>
  );
}
