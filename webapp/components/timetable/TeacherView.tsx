'use client';
import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  User, Mail, Phone, Clock, 
  TrendingUp, Calendar, MapPin, 
  ChevronLeft, ChevronRight, BarChart2
} from 'lucide-react';
import { activeTimetable, teacherAvailability, TeacherAvailability, TimetableEntry } from '@/lib/mockData';

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const SLOTS = [
  { id: "S1", label: "08:00 AM – 10:00 AM", start: "08:00", end: "10:00" },
  { id: "S2", label: "10:00 AM – 12:00 PM", start: "10:00", end: "12:00" },
  { id: "S3", label: "12:00 PM – 02:00 PM", start: "12:00", end: "14:00" },
  { id: "S4", label: "02:00 PM – 04:00 PM", start: "14:00", end: "16:00" },
  { id: "S5", label: "04:00 PM – 06:00 PM", start: "16:00", end: "18:00" },
  { id: "S6", label: "06:00 PM – 08:00 PM", start: "18:00", end: "20:00" },
];

export const TeacherView: React.FC = () => {
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>(teacherAvailability[0].teacherId);

  const selectedTeacher = useMemo(() => 
    teacherAvailability.find(t => t.teacherId === selectedTeacherId), 
  [selectedTeacherId]);

  const teacherEntries = useMemo(() => 
    activeTimetable.entries.filter(e => e.teacherId === selectedTeacherId), 
  [selectedTeacherId]);

  const workload = useMemo(() => {
    const total = teacherEntries.length;
    const hours = total * 2; // assuming 2 hours per slot
    const batches = new Set(teacherEntries.map(e => e.batchId)).size;
    const max = selectedTeacher?.maxPeriodsPerWeek || 14;
    return { total, hours, batches, max, percent: Math.round((total / max) * 100) };
  }, [teacherEntries, selectedTeacher]);

  return (
    <div className="space-y-10 pb-20">
      {/* 1. Teacher Selector & Profile */}
      <div className="flex flex-wrap items-stretch gap-8">
        <Card className="flex-1 min-w-[300px] p-10 border-none shadow-soft rounded-[48px] bg-white relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-full translate-x-12 -translate-y-12" />
           <div className="flex items-center gap-8 relative z-10">
              <div className="w-24 h-24 rounded-[40px] bg-brand-blue/10 flex items-center justify-center font-black text-3xl text-brand-blue shadow-inner group-hover:scale-105 transition-transform duration-500">
                 {selectedTeacher?.teacherName.charAt(0)}
              </div>
              <div className="space-y-2">
                 <h3 className="text-2xl font-black text-text-slate tracking-tight leading-none">{selectedTeacher?.teacherName}</h3>
                 <div className="flex flex-wrap gap-2">
                    {selectedTeacher?.subjects.map(s => (
                       <Badge key={s} className="bg-bg-soft text-gray-400 font-bold text-[9px] uppercase tracking-widest border-none px-3">
                          {s}
                       </Badge>
                    ))}
                 </div>
                 <div className="flex items-center gap-4 pt-2">
                    <button className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-300 hover:text-brand-blue transition-colors">
                       <Mail className="w-3.5 h-3.5" /> Email
                    </button>
                    <button className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-300 hover:text-brand-blue transition-colors">
                       <Phone className="w-3.5 h-3.5" /> Call
                    </button>
                 </div>
              </div>
           </div>
        </Card>

        <Card className="min-w-[320px] p-10 border-none shadow-soft rounded-[48px] bg-text-slate text-white relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-12 -translate-y-12" />
           <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between">
                 <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Weekly Workload</p>
                 <TrendingUp className="w-5 h-5 text-brand-blue" />
              </div>
              <div className="space-y-2">
                 <h4 className="text-4xl font-black tracking-tight leading-none">{workload.percent}%</h4>
                 <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-blue rounded-full transition-all duration-1000" style={{ width: `${workload.percent}%` }} />
                 </div>
                 <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest p-1">{workload.total} / {workload.max} Periods Scheduled</p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/10">
                 <div className="space-y-1">
                    <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest leading-none">Total Hours</p>
                    <p className="text-sm font-black">{workload.hours} hrs</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest leading-none">Batches</p>
                    <p className="text-sm font-black">{workload.batches} Batches</p>
                 </div>
              </div>
           </div>
        </Card>
      </div>

      <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide">
         {teacherAvailability.map(t => (
            <button 
              key={t.teacherId}
              onClick={() => setSelectedTeacherId(t.teacherId)}
              className={`h-12 px-8 rounded-2xl flex items-center gap-3 font-black text-[10px] uppercase tracking-widest transition-all ${selectedTeacherId === t.teacherId ? 'bg-brand-blue text-white shadow-soft-lg' : 'bg-white text-gray-400 hover:bg-bg-soft/50 group'}`}
            >
               <span className={`w-2 h-2 rounded-full ${selectedTeacherId === t.teacherId ? 'bg-white' : 'bg-gray-200 group-hover:bg-brand-blue'}`} />
               {t.teacherName}
            </button>
         ))}
      </div>

      {/* 2. Teacher specific grid */}
      <section className="space-y-6">
         <div className="flex items-center justify-between px-2">
            <h3 className="text-lg font-black text-text-slate tracking-tight flex items-center gap-3">
               Weekly Schedule <Badge variant="Inactive" className="px-3">07 – 12 Apr</Badge>
            </h3>
            <div className="flex gap-2">
               <Button variant="outline" size="sm" className="h-9 px-4 rounded-xl border-gray-100 font-black text-[9px] uppercase tracking-widest gap-2"><Calendar className="w-3.5 h-3.5" /> Availability Heatmap</Button>
               <Button variant="outline" size="sm" className="h-9 w-9 p-0 rounded-xl border-gray-100"><BarChart2 className="w-4 h-4" /></Button>
            </div>
         </div>
         
         <Card className="p-1 border-none shadow-soft rounded-[48px] overflow-hidden bg-white">
            <div className="grid grid-cols-[140px_repeat(6,1fr)] bg-bg-soft/10 overflow-x-auto min-w-[1000px]">
               <div className="h-20 bg-white" />
               {DAYS.map((day) => (
                  <div key={day} className="h-20 flex flex-col items-center justify-center gap-1 border-l border-gray-50 bg-white">
                     <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{day}</span>
                  </div>
               ))}

               {SLOTS.map((slot) => (
                  <React.Fragment key={slot.id}>
                     <div className="h-40 flex flex-col items-center justify-center border-t border-gray-50 bg-bg-soft/5">
                        <span className="text-xs font-black text-text-slate leading-none">{slot.start}</span>
                        <div className="w-px h-6 bg-gray-200 my-2" />
                        <span className="text-xs font-black text-gray-300 leading-none">{slot.end}</span>
                     </div>
                     {DAYS.map((day) => {
                        const entry = teacherEntries.find(e => e.day === day && e.slotId === slot.id);
                        const isAvailable = selectedTeacher?.availableDays.includes(day);

                        return (
                           <div key={`${day}-${slot.id}`} className={`relative h-40 border-l border-t border-gray-50 p-3 ${isAvailable ? 'bg-white' : 'bg-gray-50/50 grayscale opacity-40'}`}>
                              {entry && (
                                 <Card 
                                    className="h-full w-full p-4 rounded-2xl border-none shadow-sm flex flex-col justify-between"
                                    style={{ background: `${entry.subjectColor}15`, borderLeft: `4px solid ${entry.subjectColor}` }}
                                 >
                                    <div className="space-y-1">
                                       <Badge className="bg-white/80 text-[8px] font-black uppercase tracking-widest border-none px-2 h-5 shadow-sm mb-1" style={{ color: entry.subjectColor }}>
                                          {entry.batchName}
                                       </Badge>
                                       <h5 className="font-black text-xs leading-tight" style={{ color: entry.subjectColor }}>{entry.subject}</h5>
                                    </div>
                                    <div className="flex items-center gap-1.5 opacity-50 mt-auto">
                                       <MapPin className="w-3 h-3" />
                                       <span className="text-[9px] font-black uppercase">{entry.roomName}</span>
                                    </div>
                                 </Card>
                              )}
                              {!entry && isAvailable && (
                                 <div className="w-full h-full flex items-center justify-center">
                                    <span className="text-[9px] font-black uppercase text-gray-200 tracking-widest italic opacity-40">Available</span>
                                 </div>
                              )}
                           </div>
                        );
                     })}
                  </React.Fragment>
               ))}
            </div>
         </Card>
      </section>
    </div>
  );
};
