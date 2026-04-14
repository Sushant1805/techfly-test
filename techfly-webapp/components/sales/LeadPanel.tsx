'use client';
import React, { useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Lead, activities } from '@/lib/salesData';
import { 
  X, Edit2, Phone, Mail, MapPin, Calendar, Clock, 
  MessageSquare, Video, Trash2, ChevronRight, Info,
  Plus, MoreHorizontal, CheckCircle2, AlertTriangle
} from 'lucide-react';
import { CustomerAvatar } from '@/components/ui/CustomerAvatar';

interface LeadPanelProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onAction?: (type: string, lead: Lead) => void;
}

export const LeadPanel = ({ lead, isOpen, onClose, onAction }: LeadPanelProps) => {
  const [activeTab, setActiveTab] = useState<'Details' | 'Activities' | 'Follow-ups' | 'Notes'>('Details');

  if (!lead) return null;

  const stages = ["New Lead", "Contacted", "Demo Scheduled", "Demo Done", "Proposal Sent", "Negotiation", "Converted"];
  const currentStageIdx = stages.indexOf(lead.stage);

  return (
    <div className={`fixed top-0 right-0 h-full w-[500px] bg-white shadow-2xl z-40 transform transition-transform duration-500 ease-in-out border-l border-gray-100 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex flex-col h-full">
        
        {/* Header */}
        <div className="p-8 border-b border-gray-50 bg-slate-soft/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 z-10">
             <button onClick={onClose} className="p-2 hover:bg-white rounded-xl text-gray-400 transition-all hover:rotate-90">
               <X className="w-5 h-5" />
             </button>
          </div>

          <div className="flex gap-6 items-start relative z-10">
            <CustomerAvatar name={lead.instituteName} initials={lead.contactAvatar} size="lg" />
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-black text-text-slate tracking-tight uppercase leading-tight max-w-[200px]">{lead.instituteName}</h2>
                <div className="flex gap-2">
                   <Badge variant={lead.interestedPlan === 'Pro' ? 'purple' : 'info'} className="text-[10px] uppercase font-black px-3">{lead.interestedPlan}</Badge>
                   <Badge variant={lead.priority === 'High' ? 'danger' : lead.priority === 'Medium' ? 'warning' : 'info'} className="text-[10px] uppercase font-black px-3">{lead.priority}</Badge>
                </div>
              </div>
              <p className="text-xs font-bold text-gray-500 mb-4">{lead.contactPerson} · {lead.city}, {lead.state}</p>
              
              <div className="flex gap-2">
                 <Button variant="outline" size="sm" className="h-9 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest border-gray-100 bg-white hover:text-brand-blue">
                   <Edit2 className="w-3.5 h-3.5 mr-2" /> Edit
                 </Button>
                 {lead.tags.map(t => (
                   <span key={t} className="px-3 py-2 rounded-xl bg-brand-blue/10 text-brand-blue text-[10px] font-black uppercase tracking-tight">{t}</span>
                 ))}
              </div>
            </div>
          </div>

          {/* KPI Strip */}
          <div className="grid grid-cols-3 gap-4 mt-8">
             <KPIMini label="Expected MRR" value={`₹${lead.expectedMRR}`} />
             <KPIMini label="Pipeline" value={`${lead.totalDaysInPipeline} days`} />
             <KPIMini label="Stage" value={lead.stage} />
          </div>

          {/* Stage Progress */}
          <div className="mt-8 pt-6 border-t border-gray-100">
             <div className="flex justify-between items-center mb-4">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Pipeline Progress</p>
                <p className="text-[10px] font-black text-brand-blue uppercase tracking-widest leading-none">{lead.stage}</p>
             </div>
             <div className="flex items-center gap-1">
                {stages.map((s, idx) => (
                  <div key={s} className="flex-1 flex flex-col gap-2">
                    <div className={`h-1.5 rounded-full transition-all duration-700 ${idx <= currentStageIdx ? (lead.stage === 'Lost' ? 'bg-red-400' : 'bg-brand-blue shadow-glow-blue') : 'bg-gray-100'}`} />
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex p-4 gap-2 bg-white border-b border-gray-50 flex-wrap justify-center">
           <ActionBtn icon={<Phone className="w-4 h-4" />} label="Call" onClick={() => onAction?.('call', lead)} />
           <ActionBtn icon={<Mail className="w-4 h-4" />} label="Email" onClick={() => onAction?.('email', lead)} />
           <ActionBtn icon={<MessageSquare className="w-4 h-4" />} label="WhatsApp" onClick={() => onAction?.('whatsapp', lead)} />
           <ActionBtn icon={<Calendar className="w-4 h-4" />} label="Schedule" onClick={() => onAction?.('schedule', lead)} />
           <ActionBtn icon={<ChevronRight className="w-4 h-4" />} label="Stage" onClick={() => onAction?.('stage', lead)} color="bg-brand-blue text-white shadow-glow hover:bg-brand-blue/90" />
           <button className="p-3 bg-slate-soft rounded-xl text-gray-400 hover:text-text-slate"><MoreHorizontal className="w-4 h-4" /></button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-50 px-4">
          {['Details', 'Activities', 'Follow-ups', 'Notes'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-all relative ${activeTab === tab ? 'text-brand-blue' : 'text-gray-400 hover:text-gray-600'}`}
            >
              {tab}
              {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-blue animate-in fade-in duration-300" />}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-8">
           {activeTab === 'Details' && (
             <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                <DetailSection title="Contact Information">
                   <DetailRow label="Institute" value={lead.instituteName} />
                   <DetailRow label="Contact" value={lead.contactPerson} />
                   <DetailRow label="Phone" value={lead.phone} showsCopy />
                   <DetailRow label="Email" value={lead.email} showsCopy />
                   <DetailRow label="Location" value={`${lead.city}, ${lead.state}`} />
                </DetailSection>

                <DetailSection title="Lead Information">
                   <DetailRow label="Lead ID" value={lead.id} />
                   <DetailRow label="Source" value={lead.source} />
                   <DetailRow label="Expected Close" value={lead.expectedCloseDate || 'Not set'} />
                   <DetailRow label="Est. Students" value={lead.estimatedStudents.toString()} />
                   <DetailRow label="Created" value={new Date(lead.createdAt).toLocaleDateString()} />
                </DetailSection>

                <Card className="p-6 border-none shadow-soft bg-slate-soft/50 space-y-4">
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Team Assignment</p>
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-xl bg-brand-blue text-white flex items-center justify-center font-black text-xs">RT</div>
                         <div>
                            <p className="text-xs font-black text-text-slate">{lead.assignedTo}</p>
                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Primary Sales Rep</p>
                         </div>
                      </div>
                      <button className="text-[10px] font-black text-brand-blue uppercase tracking-widest hover:underline">Reassign</button>
                   </div>
                </Card>
             </div>
           )}

           {activeTab === 'Activities' && (
             <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-between items-center mb-2">
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Activity Timeline</p>
                   <Button variant="outline" size="sm" className="h-8 rounded-lg text-[10px] font-black uppercase tracking-widest border-gray-100 bg-white">Log Activity</Button>
                </div>
                <div className="space-y-8 relative">
                   <div className="absolute left-2.5 top-2 bottom-2 w-px bg-gray-100" />
                   {activities.filter(a => a.leadId === lead.id || a.leadId === 'LEAD001').map((act, i) => (
                      <div key={act.id} className="relative pl-10 flex flex-col gap-1">
                         <div className={`absolute left-0 top-1 w-5 h-5 rounded-full border-4 border-white shadow-sm ${act.type === 'call' ? 'bg-orange-500' : act.type === 'demo' ? 'bg-teal-500' : 'bg-gray-400'}`} />
                         <div className="flex justify-between items-start">
                             <h4 className="text-sm font-black text-text-slate tracking-tight leading-none mb-1">{act.title}</h4>
                             <p className="text-[9px] font-bold text-gray-400 uppercase">{new Date(act.completedAt || lead.createdAt).toLocaleDateString()}</p>
                         </div>
                         <p className="text-xs font-bold text-gray-500 leading-relaxed max-w-[340px]">{act.description}</p>
                         {act.outcome && (
                           <div className="mt-2">
                              <span className={`px-2 py-1 rounded-md text-[8px] font-black uppercase tracking-tighter ${act.outcome === 'Positive' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                Outcome: {act.outcome}
                              </span>
                           </div>
                         )}
                         <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mt-2">{act.performedBy} · {act.duration ? `${act.duration} min` : 'System'}</p>
                      </div>
                   ))}
                </div>
             </div>
           )}

           {activeTab === 'Follow-ups' && (
             <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-between items-center mb-2">
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Scheduled Tasks</p>
                   <Button variant="outline" size="sm" className="h-8 rounded-lg text-[10px] font-black uppercase tracking-widest border-gray-100 bg-white">+ New</Button>
                </div>
                
                {lead.nextFollowupDate ? (
                  <Card className="p-6 border-none shadow-soft group hover:shadow-glow-blue transition-all border-l-4 border-l-brand-blue">
                     <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue shadow-sm">
                             {lead.nextFollowupType === 'Call' ? <Phone className="w-4 h-4" /> : <Calendar className="w-4 h-4" />}
                           </div>
                           <div>
                              <p className="text-[10px] font-black text-brand-blue uppercase tracking-widest">{lead.nextFollowupType || 'Task'}</p>
                              <p className="text-sm font-black text-text-slate">TODAY · 11:30 AM</p>
                           </div>
                        </div>
                        <Badge variant="danger" className="text-[8px] px-2 py-0.5 uppercase font-black">HIGH</Badge>
                     </div>
                     <p className="text-xs font-bold text-gray-500 leading-relaxed mb-6 italic">"Follow up re: {lead.notes}"</p>
                     <div className="flex gap-2">
                        <Button size="sm" className="flex-1 h-10 rounded-xl text-[10px] font-black uppercase tracking-widest bg-brand-blue shadow-glow">Complete</Button>
                        <Button variant="outline" size="sm" className="flex-1 h-10 rounded-xl text-[10px] font-black uppercase tracking-widest border-gray-100 bg-white">Snooze</Button>
                     </div>
                  </Card>
                ) : (
                  <div className="text-center py-10 opacity-30">
                     <AlertTriangle className="w-10 h-10 mx-auto mb-4 text-gray-400" />
                     <p className="text-xs font-black uppercase tracking-[0.2em]">No follow-ups scheduled</p>
                  </div>
                )}
             </div>
           )}

           {activeTab === 'Notes' && (
             <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
               <div className="flex justify-between items-center mb-2">
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Internal Notes</p>
                   <Button variant="outline" size="sm" className="h-8 rounded-lg text-[10px] font-black uppercase tracking-widest border-gray-100 bg-white">Add Note</Button>
                </div>
                <Card className="p-6 border-none shadow-soft bg-yellow-50/50">
                   <div className="flex justify-between items-center mb-3">
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-[8px] font-black uppercase tracking-widest">Pricing Objection</span>
                      <span className="text-[9px] font-bold text-gray-400 uppercase">10 Apr 2026</span>
                   </div>
                   <p className="text-xs font-bold text-gray-700 leading-relaxed italic">
                     "Customer is extremely satisfied with the features but find the Pro plan slightly over their budget. Considering a 15-20% inaugural discount to close by end of month."
                   </p>
                   <div className="mt-4 pt-4 border-t border-yellow-100/50 flex items-center gap-2">
                      <div className="w-5 h-5 rounded-md bg-brand-blue text-white text-[8px] flex items-center justify-center font-black">RT</div>
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">Added by Ravi Tiwari</span>
                   </div>
                </Card>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

const KPIMini = ({ label, value }: { label: string; value: string }) => (
  <div className="p-4 rounded-[20px] bg-white border border-gray-50 shadow-soft">
    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
    <p className="text-sm font-black text-text-slate tracking-tight truncate leading-none">{value}</p>
  </div>
);

const ActionBtn = ({ icon, label, onClick, color }: any) => (
  <button 
    onClick={onClick}
    className={`px-4 py-3 rounded-xl flex items-center gap-2 transition-all hover:translate-y-[-2px] ${color || 'bg-slate-soft text-text-slate hover:bg-gray-100'}`}
  >
    {icon}
    <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
  </button>
);

const DetailSection = ({ title, children }: any) => (
  <div className="space-y-4">
    <p className="text-[10px] font-black text-brand-blue uppercase tracking-[0.2em]">{title}</p>
    <div className="space-y-3">
      {children}
    </div>
  </div>
);

const DetailRow = ({ label, value, showsCopy }: { label: string; value: string; showsCopy?: boolean }) => (
  <div className="flex justify-between items-center group cursor-pointer" onClick={() => showsCopy && alert('Copied to clipboard!')}>
    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</span>
    <span className={`text-xs font-bold transition-all ${showsCopy ? 'text-brand-blue group-hover:underline' : 'text-text-slate'}`}>{value}</span>
  </div>
);
