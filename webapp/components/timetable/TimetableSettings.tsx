'use client';
import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Plus, Edit2, Trash2, Clock, 
  Calendar, Zap, Archive, ShieldCheck,
  RefreshCw, Info, Settings2, Trash
} from 'lucide-react';

const INITIAL_SLOTS = [
  { id: "S1", label: "Morning Session 1", start: "08:00", end: "10:00", type: "Class" },
  { id: "S2", label: "Morning Session 2", start: "10:00", end: "12:00", type: "Class" },
  { id: "S10", label: "Short Break", start: "12:00", end: "12:15", type: "Break" },
  { id: "S3", label: "Afternoon Session 1", start: "12:15", end: "14:15", type: "Class" },
];

export const TimetableSettings: React.FC = () => {
  const [slots, setSlots] = useState(INITIAL_SLOTS);

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      {/* 1. Time Slot Configuration */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-2">
           <div>
              <h3 className="text-xl font-black text-text-slate tracking-tight leading-none mb-2">Time Slot Configuration</h3>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Define standard teaching periods and breaks for the institute</p>
           </div>
           <Button variant="outline" className="h-11 px-6 rounded-xl border-gray-100 font-black text-[10px] uppercase tracking-widest gap-2">
              <Plus className="w-4 h-4" /> Add Slot
           </Button>
        </div>

        <Card className="border-none shadow-soft rounded-[40px] overflow-hidden bg-white p-2">
           <table className="w-full text-left">
              <thead className="bg-bg-soft/10 h-14 border-b border-gray-50">
                 <tr>
                    <th className="pl-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">Slot Name</th>
                    <th className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Type</th>
                    <th className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Start Time</th>
                    <th className="text-[10px] font-black text-gray-400 uppercase tracking-widest">End Time</th>
                    <th className="pr-8 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                 {slots.map((slot) => (
                    <tr key={slot.id} className="h-20 group hover:bg-bg-soft/5 transition-colors">
                       <td className="pl-8">
                          <p className="font-black text-sm text-text-slate">{slot.label}</p>
                          <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{slot.id}</p>
                       </td>
                       <td>
                          <Badge variant={slot.type === 'Class' ? 'Active' : 'Inactive'} className={`bg-${slot.type === 'Class' ? 'brand-blue' : 'gray-200'} text-${slot.type === 'Class' ? 'white' : 'gray-400'} border-none px-3 font-black text-[9px] uppercase tracking-widest h-6`}>
                             {slot.type}
                          </Badge>
                       </td>
                       <td className="font-black text-xs text-text-slate">{slot.start}</td>
                       <td className="font-black text-xs text-text-slate">{slot.end}</td>
                       <td className="pr-8 text-right">
                          <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                             <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-xl hover:bg-white text-gray-300 hover:text-text-slate shadow-inner"><Edit2 className="w-4 h-4" /></Button>
                             <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-xl hover:bg-red-50 text-gray-300 hover:text-red-500 shadow-inner"><Trash2 className="w-4 h-4" /></Button>
                          </div>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </Card>
      </section>

      {/* 2. AI & Institute Preferences */}
      <section className="space-y-6">
         <h3 className="text-xl font-black text-text-slate tracking-tight px-2 leading-none">Institute Policies</h3>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 border-none shadow-soft rounded-[48px] bg-white space-y-6">
               <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-blue flex items-center justify-center text-white shadow-lg shadow-brand-blue/20">
                     <Settings2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-text-slate leading-tight">General Rules</h4>
                    <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Global Constraints</p>
                  </div>
               </div>
               <SettingToggle label="Allow Shared Rooms" sub="Different batches can use same room at different times" checked />
               <SettingToggle label="Teacher Buffer" sub="Minimum 15 min gap between consecutive slots" checked={false} />
               <SettingToggle label="Max Batches per Teacher" sub="Limit each teacher to 4 concurrent active batches" checked />
            </Card>

            <Card className="p-8 border-none shadow-soft rounded-[48px] bg-white space-y-6">
               <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
                     <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-text-slate leading-tight">AI Strategy</h4>
                    <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Generation Logic</p>
                  </div>
               </div>
               <SettingToggle label="Prioritize Preferences" sub="Value teacher availability over room optimization" checked />
               <SettingToggle label="Auto-detect Conflicts" sub="Run background validation in manual edit mode" checked />
               <SettingToggle label="Suggest Optimizations" sub="Show warnings for inefficient slot usage" checked />
            </Card>
         </div>
      </section>

      {/* 3. Archived Timetables */}
      <section className="space-y-6">
         <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-black text-text-slate tracking-tight leading-none">Schedule Archives</h3>
            <Badge variant="Inactive" className="px-3">3 Versions</Badge>
         </div>
         <Card className="border-none shadow-soft rounded-[48px] overflow-hidden bg-white">
            <table className="w-full text-left">
               <thead className="bg-bg-soft/10 h-14 border-b border-gray-50">
                  <tr>
                     <th className="pl-10 text-[10px] font-black text-gray-400 uppercase tracking-widest">Version</th>
                     <th className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Generated On</th>
                     <th className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                     <th className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Periods</th>
                     <th className="pr-10 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  <ArchiveRow version="v3.1" date="11 Apr 2026" status="Active" periods="34" />
                  <ArchiveRow version="v2.4" date="01 Mar 2026" status="Archived" periods="32" />
                  <ArchiveRow version="v1.0" date="01 Jan 2026" status="Archived" periods="28" />
               </tbody>
            </table>
         </Card>
      </section>
    </div>
  );
};

const SettingToggle = ({ label, sub, checked: initialChecked }: any) => {
  const [checked, setChecked] = useState(initialChecked);
  return (
    <div className="flex items-center justify-between group cursor-pointer" onClick={() => setChecked(!checked)}>
       <div className="space-y-0.5">
          <p className="text-sm font-black text-text-slate group-hover:text-brand-blue transition-colors leading-none">{label}</p>
          <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest leading-none">{sub}</p>
       </div>
       <div className={`w-12 h-6 rounded-full p-1 transition-all duration-300 ${checked ? 'bg-brand-blue' : 'bg-bg-soft shadow-inner'}`}>
          <div className={`w-4 h-4 rounded-full bg-white shadow-md transition-all duration-300 ${checked ? 'translate-x-6' : 'translate-x-0'}`} />
       </div>
    </div>
  );
};

const ArchiveRow = ({ version, date, status, periods }: any) => (
  <tr className="h-20 group hover:bg-bg-soft/5 transition-colors">
     <td className="pl-10 font-black text-sm text-text-slate">{version}</td>
     <td className="text-xs font-bold text-gray-400">{date}</td>
     <td>
        <Badge variant={status === 'Active' ? 'Active' : 'Inactive'} className="font-black text-[9px] uppercase tracking-widest border-none px-3">
           {status}
        </Badge>
     </td>
     <td className="font-black text-xs text-text-slate">{periods}</td>
     <td className="pr-10 text-right">
        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
           <Button variant="outline" size="sm" className="h-10 px-6 rounded-xl border-gray-100 font-black text-[9px] uppercase tracking-widest text-gray-400 hover:text-text-slate hover:bg-white shadow-soft">View</Button>
           {status !== 'Active' && <Button variant="outline" size="sm" className="h-10 px-6 rounded-xl border-gray-100 font-black text-[9px] uppercase tracking-widest text-brand-blue hover:bg-brand-blue/5 shadow-soft">Restore</Button>}
        </div>
     </td>
  </tr>
);
