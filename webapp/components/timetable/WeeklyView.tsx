'use client';
import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  ChevronLeft, ChevronRight, Grid, List as ListIcon, 
  Printer, FileDown, Edit3, Plus, Trash2, 
  MapPin, Clock, User, AlertCircle, Save, X
} from 'lucide-react';
import { activeTimetable, batches, GeneratedTimetable, TimetableEntry } from '@/lib/mockData';

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const SLOTS = [
  { id: "S1", label: "08:00 AM – 10:00 AM", start: "08:00", end: "10:00" },
  { id: "S2", label: "10:00 AM – 12:00 PM", start: "10:00", end: "12:00" },
  { id: "S3", label: "12:00 PM – 02:00 PM", start: "12:00", end: "14:00" },
  { id: "S4", label: "02:00 PM – 04:00 PM", start: "14:00", end: "16:00" },
  { id: "S5", label: "04:00 PM – 06:00 PM", start: "16:00", end: "18:00" },
  { id: "S6", label: "06:00 PM – 08:00 PM", start: "18:00", end: "20:00" },
];

export const WeeklyView: React.FC = () => {
  const [selectedBatchId, setSelectedBatchId] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'Grid' | 'List'>('Grid');
  const [isEditMode, setIsEditMode] = useState(false);
  const [timetable, setTimetable] = useState<GeneratedTimetable>(activeTimetable);

  const filteredEntries = useMemo(() => {
    if (selectedBatchId === 'All') return timetable.entries;
    return timetable.entries.filter(e => e.batchId === selectedBatchId);
  }, [selectedBatchId, timetable]);

  const handleDelete = (id: string) => {
    setTimetable(prev => ({
      ...prev,
      entries: prev.entries.filter(e => e.id !== id)
    }));
  };

  return (
    <div className="space-y-8 pb-20">
      {/* 1. Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-6 p-6 rounded-[32px] bg-white shadow-soft">
        <div className="flex flex-wrap items-center gap-6 flex-1">
          <div className="flex flex-col gap-1.5 min-w-[200px]">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Selected Batch</label>
            <select 
              className="h-12 px-6 rounded-2xl bg-bg-soft/20 border border-gray-100 text-sm font-black text-text-slate focus:outline-none focus:ring-4 focus:ring-brand-blue/10 transition-all cursor-pointer appearance-none"
              value={selectedBatchId}
              onChange={(e) => setSelectedBatchId(e.target.value)}
            >
              <option value="All">All Batches</option>
              {batches.map(b => <option key={b.id} value={b.id}>{b.name} ({b.standard})</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Viewing Week</label>
            <div className="flex items-center gap-2 bg-bg-soft/20 rounded-2xl p-1 border border-gray-100 h-12">
              <Button variant="ghost" className="h-10 w-10 p-0 rounded-xl hover:bg-white shadow-inner"><ChevronLeft className="w-4 h-4" /></Button>
              <span className="text-xs font-black text-text-slate px-4">07 Apr – 12 Apr 2026</span>
              <Button variant="ghost" className="h-10 w-10 p-0 rounded-xl hover:bg-white shadow-inner"><ChevronRight className="w-4 h-4" /></Button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex p-1 bg-bg-soft/20 rounded-2xl border border-gray-100 mr-4">
            <button onClick={() => setViewMode('Grid')} className={`h-10 px-6 rounded-xl text-xs font-bold transition-all ${viewMode === 'Grid' ? 'bg-white text-brand-blue shadow-soft' : 'text-gray-400 hover:text-text-slate'}`}>Grid</button>
            <button onClick={() => setViewMode('List')} className={`h-10 px-6 rounded-xl text-xs font-bold transition-all ${viewMode === 'List' ? 'bg-white text-brand-blue shadow-soft' : 'text-gray-400 hover:text-text-slate'}`}>List</button>
          </div>
          
          <Button variant="outline" className="h-12 px-6 rounded-2xl border-gray-100 text-gray-400 font-black uppercase text-[10px] tracking-widest gap-2">
            <Printer className="w-4 h-4" /> Print
          </Button>
          
          <Button 
            onClick={() => setIsEditMode(!isEditMode)}
            className={`h-12 px-8 rounded-2xl font-black uppercase text-[10px] tracking-widest gap-2 transition-all ${isEditMode ? 'bg-text-slate text-white' : 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20'}`}
          >
            {isEditMode ? <><Save className="w-4 h-4" /> Save Schedule</> : <><Edit3 className="w-4 h-4" /> Edit Timetable</>}
          </Button>
        </div>
      </div>

      {isEditMode && (
        <div className="animate-in slide-in-from-top-4 duration-500 bg-amber-500/10 border border-amber-500/20 p-4 rounded-3xl flex items-center justify-between gap-10">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-500">
                 <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                 <p className="text-sm font-black text-amber-900 leading-none">Draft Mode Active</p>
                 <p className="text-[10px] font-bold text-amber-700 uppercase tracking-widest">You are editing the schedule. Changes won't be visible to students until you save.</p>
              </div>
           </div>
           <Button variant="ghost" onClick={() => setIsEditMode(false)} className="text-amber-700 font-black uppercase text-[10px] tracking-widest hover:bg-amber-100">Cancel & Discard</Button>
        </div>
      )}

      {/* 2. Content View */}
      {viewMode === 'Grid' ? (
        <TimetableGrid 
          selectedBatchId={selectedBatchId} 
          entries={filteredEntries} 
          isEditMode={isEditMode}
          onDelete={handleDelete}
        />
      ) : (
        <TimetableList entries={filteredEntries} />
      )}
    </div>
  );
};

const TimetableGrid = ({ selectedBatchId, entries, isEditMode, onDelete }: any) => {
  return (
    <Card className="p-1 border-none shadow-soft rounded-[48px] overflow-hidden bg-white">
      <div className="grid grid-cols-[140px_repeat(6,1fr)] bg-bg-soft/10 overflow-x-auto min-w-[1000px]">
        {/* Header Row */}
        <div className="h-20 bg-white" />
        {DAYS.map((day) => {
          const isToday = day === "Monday"; // Simulating today
          return (
            <div key={day} className={`h-20 flex flex-col items-center justify-center gap-1 border-l border-gray-50 bg-white relative ${isToday ? 'after:absolute after:bottom-0 after:left-4 after:right-4 after:h-1 after:bg-brand-blue after:rounded-full' : ''}`}>
               <span className={`text-[10px] font-black uppercase tracking-widest ${isToday ? 'text-brand-blue' : 'text-gray-300'}`}>{day}</span>
               {isToday && <span className="text-[10px] font-black text-brand-blue bg-brand-blue/10 px-3 py-0.5 rounded-full uppercase tracking-widest scale-75">Today</span>}
            </div>
          );
        })}

        {/* Dynamic Slots */}
        {SLOTS.map((slot) => (
          <React.Fragment key={slot.id}>
            {/* Time Label */}
            <div className="h-40 flex flex-col items-center justify-center border-t border-gray-50 bg-bg-soft/5">
               <span className="text-xs font-black text-text-slate leading-none">{slot.start}</span>
               <div className="w-px h-6 bg-gray-200 my-2" />
               <span className="text-xs font-black text-gray-300 leading-none">{slot.end}</span>
            </div>

            {/* Day Slots */}
            {DAYS.map((day) => {
              const slotEntries = entries.filter((e: any) => e.day === day && e.slotId === slot.id);
              const isTodayColumn = day === "Monday";

              return (
                <div key={`${day}-${slot.id}`} className={`relative h-40 border-l border-t border-gray-50 p-3 group ${isTodayColumn ? 'bg-brand-blue/5' : 'bg-bg-soft/10'}`}>
                   {slotEntries.map((e: any) => (
                     <ClassBlock key={e.id} entry={e} showBatch={selectedBatchId === 'All'} isEditMode={isEditMode} onDelete={onDelete} />
                   ))}
                   
                   {isEditMode && slotEntries.length === 0 && (
                     <button className="w-full h-full rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 text-gray-300 hover:border-brand-blue hover:text-brand-blue hover:bg-white transition-all opacity-0 group-hover:opacity-100">
                        <Plus className="w-5 h-5" />
                        <span className="text-[9px] font-black uppercase tracking-widest">Add Class</span>
                     </button>
                   )}

                   {!isEditMode && slotEntries.length === 0 && (
                     <div className="w-full h-full flex items-center justify-center">
                        <div className="w-1 h-1 rounded-full bg-gray-200" />
                     </div>
                   )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </Card>
  );
};

const ClassBlock = ({ entry, showBatch, isEditMode, onDelete }: { entry: TimetableEntry, showBatch: boolean, isEditMode: boolean, onDelete: (id: string) => void }) => {
  return (
    <div className="absolute inset-2 animate-in zoom-in-95 duration-300 group/block">
      <Card 
        className="h-full w-full p-4 rounded-2xl border-none shadow-sm flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1"
        style={{ background: `${entry.subjectColor}15`, borderLeft: `4px solid ${entry.subjectColor}` }}
      >
        <div className="space-y-1.5 relative z-10">
          <div className="flex items-center justify-between">
            {showBatch && (
              <Badge className="bg-white/80 text-[8px] font-black uppercase tracking-widest border-none px-2 h-5 shadow-sm" style={{ color: entry.subjectColor }}>
                {entry.batchName}
              </Badge>
            )}
            {isEditMode && (
              <button 
                onClick={(e) => { e.stopPropagation(); onDelete(entry.id); }}
                className="h-6 w-6 rounded-lg bg-red-50 text-red-500 flex items-center justify-center opacity-0 group-hover/block:opacity-100 transition-opacity hover:bg-red-500 hover:text-white shadow-sm"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <h5 className="font-black text-xs leading-tight" style={{ color: entry.subjectColor }}>{entry.subject}</h5>
          <div className="flex items-center gap-1.5 opacity-60">
            <User className="w-3 h-3" style={{ color: entry.subjectColor }} />
            <span className="text-[9px] font-black uppercase tracking-widest whitespace-nowrap overflow-hidden text-ellipsis">{entry.teacherName}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 mt-auto relative z-10">
           <div className="flex items-center gap-1 opacity-50">
              <MapPin className="w-3 h-3" />
              <span className="text-[9px] font-black uppercase">{entry.roomName}</span>
           </div>
           {entry.type !== 'Regular' && (
             <Badge variant="Inactive" className="text-[7px] p-0 px-1.5 h-4 font-black uppercase tracking-widest border-none bg-black/5 text-black/40">
                {entry.type}
             </Badge>
           )}
        </div>
      </Card>
    </div>
  );
};

const TimetableList = ({ entries }: { entries: TimetableEntry[] }) => {
  const grouped = DAYS.reduce((acc: any, day) => {
    const dayEntries = entries.filter(e => e.day === day).sort((a, b) => a.startTime.localeCompare(b.startTime));
    if (dayEntries.length > 0) acc.push({ day, items: dayEntries });
    return acc;
  }, []);

  return (
    <div className="space-y-6">
      {grouped.map((group: any) => (
        <Card key={group.day} className="p-0 border-none shadow-soft rounded-[40px] overflow-hidden bg-white">
          <div className="px-10 h-16 bg-bg-soft/10 flex items-center justify-between border-b border-gray-50">
             <h4 className="text-sm font-black text-text-slate uppercase tracking-widest">{group.day}</h4>
             <Badge variant="Inactive" className="px-3">{group.items.length} Slots</Badge>
          </div>
          <div className="p-4 space-y-2">
            {group.items.map((e: any) => (
              <div key={e.id} className="flex items-center gap-10 p-6 rounded-3xl hover:bg-bg-soft/20 transition-all group">
                 <div className="w-32 flex flex-col items-center justify-center py-2 px-4 rounded-2xl bg-bg-soft group-hover:bg-white border border-transparent group-hover:border-gray-100 transition-all">
                    <span className="text-xs font-black text-text-slate">{e.startTime}</span>
                    <div className="w-4 h-0.5 bg-gray-200 my-1" />
                    <span className="text-[10px] font-bold text-gray-400">{e.endTime}</span>
                 </div>
                 <div className="flex-1 flex items-center gap-8">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg text-white shadow-soft" style={{ backgroundColor: e.subjectColor }}>
                       {e.subject.charAt(0)}
                    </div>
                    <div>
                       <h5 className="font-black text-sm text-text-slate mb-0.5">{e.subject}</h5>
                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                          <User className="w-3 h-3" /> {e.teacherName} \u2022 <MapPin className="w-3 h-3" /> {e.roomName}
                       </p>
                    </div>
                 </div>
                 <div className="flex flex-col items-end gap-2">
                    <Badge className="bg-bg-soft text-gray-400 font-black text-[9px] uppercase tracking-widest border-none px-4 py-1.5 h-fit">{e.batchName}</Badge>
                    <span className="text-[9px] font-black text-brand-blue uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Regular Session</span>
                 </div>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};
