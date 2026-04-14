'use client';
import React, { useState } from 'react';
import { StaffMember } from '@/lib/settingsData';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  X, User, BookOpen, Clock, Activity, 
  Mail, Phone, MapPin, Calendar, Briefcase, 
  GraduationCap, AlertCircle, Edit, Power, 
  Trash2, ChevronRight, CheckCircle, Info
} from 'lucide-react';

interface StaffDetailPanelProps {
  staff: StaffMember | null;
  onClose: () => void;
}

export default function StaffDetailPanel({ staff, onClose }: StaffDetailPanelProps) {
  const [activeTab, setActiveTab] = useState('Profile');

  if (!staff) return null;

  const tabs = ['Profile', 'Batches', 'Schedule', 'Activity'];

  return (
    <div 
      className={`fixed right-0 top-0 h-full w-[400px] bg-white shadow-soft-xxl border-l border-gray-100 z-30 transform transition-transform duration-500 ease-in-out ${
        staff ? 'translate-x-0' : 'translate-x-full'
      }`}
      style={{ top: '64px', height: 'calc(100vh - 64px)' }}
    >
      {/* Header */}
      <div className="px-6 py-6 border-b border-gray-50 bg-white sticky top-0 z-10 flex flex-col gap-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
             <div className="w-14 h-14 rounded-full bg-purple-600 text-white flex items-center justify-center font-black text-lg uppercase shadow-glow border-4 border-white">
                {staff.name.split(' ').map(n => n[0]).join('')}
             </div>
             <div className="flex flex-col">
                <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">{staff.name}</h3>
                <div className="flex gap-2 items-center mt-1">
                  <Badge className="bg-purple-100 text-purple-600 border-none text-[8px] font-black uppercase tracking-widest px-2 py-0.5">
                    {staff.role}
                  </Badge>
                  <Badge className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 ${
                    staff.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {staff.status}
                  </Badge>
                </div>
             </div>
          </div>
          <div className="flex gap-1.5">
             <button className="p-2 hover:bg-gray-100 text-gray-400 rounded-xl transition-all"><Edit size={16}/></button>
             <button onClick={onClose} className="p-2 hover:bg-gray-100 text-gray-400 rounded-xl transition-all"><X size={16}/></button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-gray-50 p-1 rounded-2xl border border-gray-100">
           {tabs.map(tab => (
             <button
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                 activeTab === tab 
                   ? 'bg-white text-purple-600 shadow-soft border border-purple-50' 
                   : 'text-gray-400 hover:text-gray-600'
               }`}
             >
               {tab}
             </button>
           ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 overflow-y-auto no-scrollbar" style={{ height: 'calc(100% - 170px)' }}>
          {activeTab === 'Profile' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
               <section className="space-y-4">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                     <User size={12} className="text-purple-600" /> Personal Details
                  </h4>
                  <div className="space-y-3 bg-gray-50/50 p-4 rounded-3xl border border-gray-100">
                     <DetailRow label="Gender" value={staff.gender} />
                     <DetailRow label="DOB" value={staff.dob || '—'} />
                     <DetailRow label="Phone" value={staff.phone} />
                     <DetailRow label="Email" value={staff.email} />
                     <DetailRow label="Address" value={staff.address || '—'} />
                  </div>
               </section>

               <section className="space-y-4">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                     <Briefcase size={12} className="text-purple-600" /> Professional Details
                  </h4>
                  <div className="space-y-3 bg-gray-50/50 p-4 rounded-3xl border border-gray-100">
                     <DetailRow label="Role" value={staff.role} />
                     <DetailRow label="Subjects" value={staff.subjects.join(', ') || '—'} />
                     <DetailRow label="Qualification" value={staff.qualification || '—'} />
                     <DetailRow label="Experience" value={`${staff.experienceYears} Years`} />
                     <DetailRow label="Joined" value={staff.joiningDate} />
                  </div>
               </section>

               <section className="space-y-4">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                     <AlertCircle size={12} className="text-purple-600" /> Emergency Contact
                  </h4>
                  <div className="bg-purple-50 p-4 rounded-3xl border border-purple-100 shadow-sm">
                     <p className="text-xs font-bold text-purple-900 uppercase italic leading-relaxed tracking-tighter">
                        {staff.emergencyContact || 'No emergency contact provided.'}
                     </p>
                  </div>
               </section>

               <div className="pt-6 grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-10 rounded-xl font-bold border-red-100 text-red-500 hover:bg-red-50 text-[10px] uppercase transition-all">
                     <Power size={14} className="mr-2" /> Deactivate
                  </Button>
                  <Button variant="outline" className="h-10 rounded-xl font-bold border-gray-100 text-gray-400 hover:bg-gray-50 text-[10px] uppercase transition-all">
                     <Trash2 size={14} className="mr-2" /> Delete
                  </Button>
               </div>
            </div>
          )}

          {activeTab === 'Batches' && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
               <p className="text-xs font-bold text-gray-400 italic">Batches assigned to {staff.name.split(' ')[0]}:</p>
               {staff.role === 'Teacher' ? (
                 <div className="space-y-3">
                   <BatchCard name="Maths Special" standard="Std 10" schedule="MWF 4PM - 6PM" students={42} />
                   <BatchCard name="Physics Pro" standard="Std 11" schedule="TTS 2PM - 4PM" students={35} />
                 </div>
               ) : (
                 <p className="text-xs font-bold text-gray-300 uppercase tracking-widest text-center py-10">No batches assigned</p>
               )}
            </div>
          )}

          {activeTab === 'Schedule' && (
             <div className="flex flex-col items-center justify-center h-full py-20 text-gray-300 animate-in fade-in slide-in-from-right-4 duration-300">
                <Clock size={48} className="mb-4 opacity-50" />
                <p className="text-xs font-black uppercase tracking-widest">Schedule view under construction</p>
             </div>
          )}

          {activeTab === 'Activity' && (
             <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <p className="text-xs font-bold text-gray-400 italic font-mono">Recent Activity Logs:</p>
                <div className="space-y-3 border-l-2 border-purple-200 ml-2">
                   <ActivityItem icon={CheckCircle} color="green" label="Marked Attendance" date="Yesterday, 10:30 AM" detail="Batch: Maths Special" />
                   <ActivityItem icon={Info} color="blue" label="Created New Test" date="2 days ago" detail="Subject: Physics" />
                   <ActivityItem icon={Calendar} color="purple" label="Rescheduled Class" date="4 days ago" detail="Moved to 28 Apr 2026" />
                </div>
             </div>
          )}
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between items-center group">
       <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">{label}</span>
       <span className="text-[10px] font-black text-gray-900 uppercase tracking-tight overflow-hidden text-ellipsis whitespace-nowrap min-w-0 flex-1 text-right ml-4 group-hover:text-purple-600 transition-colors">{value}</span>
    </div>
  );
}

function BatchCard({ name, standard, schedule, students }: { name: string, standard: string, schedule: string, students: number }) {
  return (
    <div className="p-4 bg-white border border-gray-100 rounded-[24px] shadow-sm hover:shadow-soft transition-all group flex flex-col gap-2">
       <div className="flex justify-between items-start">
          <div className="flex flex-col">
             <span className="text-xs font-black text-gray-900 group-hover:text-purple-600 transition-colors uppercase tracking-tight">{name}</span>
             <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">{standard}</span>
          </div>
          <Badge className="bg-purple-100 text-purple-600 text-[10px] font-black">{students} Students</Badge>
       </div>
       <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase">
          <Clock size={12} className="text-purple-600" />
          <span>{schedule}</span>
       </div>
    </div>
  );
}

function ActivityItem({ icon: Icon, color, label, date, detail }: { icon: any, color: string, label: string, date: string, detail: string }) {
  const colorMap: Record<string, string> = {
    green: 'text-green-600 bg-green-50 shadow-green-100',
    blue: 'text-blue-600 bg-blue-50 shadow-blue-100',
    purple: 'text-purple-600 bg-purple-50 shadow-purple-100'
  };

  return (
    <div className="pl-6 relative">
       <div className={`absolute -left-[14px] top-0 w-7 h-7 rounded-full flex items-center justify-center border-2 border-white shadow-soft ${colorMap[color]}`}>
          <Icon size={12} />
       </div>
       <div className="flex flex-col">
          <span className="text-[10px] font-black text-gray-900 uppercase tracking-tight">{label}</span>
          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{date}</span>
          <p className="text-[9px] font-black text-purple-600 uppercase mt-1 italic tracking-widest">{detail}</p>
       </div>
    </div>
  );
}
