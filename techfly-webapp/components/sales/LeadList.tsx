'use client';
import React from 'react';
import { Lead } from '@/lib/salesData';
import { Badge } from '@/components/ui/Badge';
import { MoreVertical, Phone, Mail, Clock, Calendar } from 'lucide-react';
import { CustomerAvatar } from '@/components/ui/CustomerAvatar';

interface LeadListProps {
  leads: Lead[];
  onSelectLead: (lead: Lead) => void;
}

export const LeadList = ({ leads, onSelectLead }: LeadListProps) => {
  return (
    <div className="bg-white rounded-[32px] shadow-soft border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead>
            <tr className="border-b border-gray-50 uppercase text-[10px] font-black text-gray-400 tracking-[0.2em] bg-slate-soft/30">
              <th className="pl-10 py-6">
                <input type="checkbox" className="rounded-md border-gray-200" />
              </th>
              <th className="px-6 py-6">Lead / Institute</th>
              <th className="px-6 py-6">Stage</th>
              <th className="px-6 py-6 text-center">Plan</th>
              <th className="px-6 py-6 text-center">Priority</th>
              <th className="px-6 py-6 text-right">Expected MRR</th>
              <th className="px-6 py-6 text-center">Assigned</th>
              <th className="px-6 py-6 text-center">In Stage</th>
              <th className="px-6 py-6 text-center">Next Follow-up</th>
              <th className="px-10 py-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {leads.map((lead) => (
              <tr 
                key={lead.id} 
                onClick={() => onSelectLead(lead)}
                className="group hover:bg-slate-soft/40 transition-all cursor-pointer h-20"
              >
                <td className="pl-10 py-4" onClick={(e) => e.stopPropagation()}>
                   <input type="checkbox" className="rounded-md border-gray-200" />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <CustomerAvatar name={lead.instituteName} initials={lead.contactAvatar} size="xs" />
                    <div>
                      <p className="text-xs font-black text-text-slate leading-none uppercase tracking-tight">{lead.instituteName}</p>
                      <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase truncate max-w-[150px]">{lead.contactPerson} · {lead.city}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                   <Badge 
                    variant={lead.stage === 'Converted' ? 'success' : lead.stage === 'Lost' ? 'danger' : 'purple'} 
                    className="text-[9px] px-3 py-1 uppercase"
                   >
                     {lead.stage}
                   </Badge>
                </td>
                <td className="px-6 py-4 text-center">
                   <span className="text-xs font-black text-text-slate uppercase tracking-widest">{lead.interestedPlan}</span>
                </td>
                <td className="px-6 py-4 text-center">
                   <div className="flex justify-center">
                      <div className={`w-2 h-2 rounded-full ${lead.priority === 'High' ? 'bg-red-500' : lead.priority === 'Medium' ? 'bg-amber-400' : 'bg-gray-200'}`} />
                   </div>
                </td>
                <td className="px-6 py-4 text-right">
                   <p className="text-sm font-black text-text-slate tracking-tighter leading-none">₹{lead.expectedMRR.toLocaleString()}</p>
                </td>
                <td className="px-6 py-4">
                   <div className="flex flex-col items-center gap-1">
                      <div className="w-6 h-6 rounded-lg bg-brand-blue text-white text-[8px] flex items-center justify-center font-black shadow-sm">{lead.assignedTo.charAt(0)}</div>
                      <span className="text-[8px] font-black text-gray-400 uppercase tracking-tighter">{lead.assignedTo}</span>
                   </div>
                </td>
                <td className="px-6 py-4 text-center">
                   <p className={`text-xs font-black uppercase tracking-tighter ${lead.daysInCurrentStage > 14 ? 'text-red-500' : lead.daysInCurrentStage > 7 ? 'text-amber-500' : 'text-gray-400'}`}>
                     {lead.daysInCurrentStage} days
                   </p>
                </td>
                <td className="px-6 py-4 text-center">
                   {lead.nextFollowupDate ? (
                      <div className="flex flex-col items-center gap-1">
                        <span className={`text-[9px] font-black uppercase tracking-tight ${new Date(lead.nextFollowupDate).toLocaleDateString() === new Date().toLocaleDateString() ? 'text-green-500' : 'text-text-slate'}`}>
                          {lead.nextFollowupDate}
                        </span>
                        <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">{lead.nextFollowupType}</span>
                      </div>
                   ) : (
                      <span className="text-gray-200 font-black">—</span>
                   )}
                </td>
                <td className="px-10 py-4 text-right">
                   <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                      <button className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-brand-blue transition-all"><Phone className="w-4 h-4" /></button>
                      <button className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-brand-blue transition-all"><Mail className="w-4 h-4" /></button>
                      <button className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-brand-blue transition-all"><MoreVertical className="w-4 h-4" /></button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
