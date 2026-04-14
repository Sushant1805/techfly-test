'use client';
import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Home, Users, Activity, BarChart2, 
  MapPin, Clock, Calendar, PieChart
} from 'lucide-react';
import { activeTimetable, rooms, Room, TimetableEntry } from '@/lib/mockData';

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const SLOTS = [
  { id: "S1", label: "08:00 AM – 10:00 AM", start: "08:00", end: "10:00" },
  { id: "S2", label: "10:00 AM – 12:00 PM", start: "10:00", end: "12:00" },
  { id: "S3", label: "12:00 PM – 02:00 PM", start: "12:00", end: "14:00" },
  { id: "S4", label: "02:00 PM – 04:00 PM", start: "14:00", end: "16:00" },
  { id: "S5", label: "04:00 PM – 06:00 PM", start: "16:00", end: "18:00" },
  { id: "S6", label: "06:00 PM – 08:00 PM", start: "18:00", end: "20:00" },
];

export const RoomView: React.FC = () => {
  const [selectedRoomId, setSelectedRoomId] = useState<string>(rooms[0].id);

  const selectedRoom = useMemo(() => rooms.find(r => r.id === selectedRoomId), [selectedRoomId]);
  const roomEntries = useMemo(() => activeTimetable.entries.filter(e => e.roomId === selectedRoomId), [selectedRoomId]);

  const utilization = useMemo(() => {
    return rooms.map(room => {
      const entries = activeTimetable.entries.filter(e => e.roomId === room.id);
      const totalPossibleSlots = DAYS.length * SLOTS.length;
      const occupied = entries.length;
      return { 
        id: room.id, 
        name: room.name, 
        percent: Math.round((occupied / totalPossibleSlots) * 100),
        capacity: room.capacity
      };
    });
  }, []);

  return (
    <div className="space-y-12 pb-20">
      {/* 1. Room Occupancy Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {utilization.map((room) => (
          <button 
            key={room.id}
            onClick={() => setSelectedRoomId(room.id)}
            className={`p-6 rounded-[32px] border-none shadow-soft transition-all text-left relative overflow-hidden group ${selectedRoomId === room.id ? 'bg-brand-blue text-white ring-4 ring-brand-blue/10 scale-105 z-10' : 'bg-white hover:bg-bg-soft/40'}`}
          >
             <div className="flex items-center justify-between mb-6 relative z-10">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedRoomId === room.id ? 'bg-white/20' : 'bg-brand-blue/10 text-brand-blue'}`}>
                   <Home className="w-5 h-5" />
                </div>
                {selectedRoomId === room.id && <Activity className="w-4 h-4 animate-pulse opacity-50" />}
             </div>
             <div className="space-y-1 relative z-10">
                <h4 className="font-black text-lg tracking-tight mb-1">{room.name}</h4>
                <div className="flex items-center justify-between text-[10px] font-black uppercase opacity-60">
                   <span>Capacity: {room.capacity}</span>
                   <span>{room.percent}% Full</span>
                </div>
                <div className={`h-1.5 w-full rounded-full mt-2 ${selectedRoomId === room.id ? 'bg-white/20' : 'bg-bg-soft'}`}>
                   <div className={`h-full rounded-full transition-all duration-1000 ${selectedRoomId === room.id ? 'bg-white shadow-lg' : 'bg-brand-blue'}`} style={{ width: `${room.percent}%` }} />
                </div>
             </div>
             <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full translate-x-12 -translate-y-12" />
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         {/* 2. Room Specific Timetable */}
         <Card className="lg:col-span-2 p-1 border-none shadow-soft rounded-[48px] overflow-hidden bg-white">
            <div className="px-10 h-20 bg-white flex items-center justify-between border-b border-gray-50/50">
               <div>
                  <h3 className="text-xl font-black text-text-slate tracking-tight">{selectedRoom?.name} Usage</h3>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mt-1">Weekly reservation status</p>
               </div>
               <Badge className="bg-brand-blue/5 text-brand-blue border-none px-4 py-1.5 font-black uppercase text-[10px] tracking-widest">
                  Capacity: {selectedRoom?.capacity} Students
               </Badge>
            </div>
            <div className="grid grid-cols-[120px_repeat(6,1fr)] bg-bg-soft/10 overflow-x-auto min-w-[900px]">
               <div className="h-16 bg-white border-b border-gray-50" />
               {DAYS.map((day) => (
                  <div key={day} className="h-16 flex flex-col items-center justify-center gap-1 border-l border-b border-gray-50 bg-white">
                     <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">{day}</span>
                  </div>
               ))}

               {SLOTS.map((slot) => (
                  <React.Fragment key={slot.id}>
                     <div className="h-32 flex flex-col items-center justify-center border-t border-gray-50 bg-bg-soft/5">
                        <span className="text-[10px] font-black text-text-slate leading-none">{slot.start}</span>
                        <div className="w-px h-4 bg-gray-200 my-1" />
                        <span className="text-[10px] font-black text-gray-300 leading-none">{slot.end}</span>
                     </div>
                     {DAYS.map((day) => {
                        const entry = roomEntries.find(e => e.day === day && e.slotId === slot.id);
                        return (
                           <div key={`${day}-${slot.id}`} className={`relative h-32 border-l border-t border-gray-50 p-2 ${entry ? 'bg-white' : 'bg-bg-soft/10 opacity-30'}`}>
                              {entry && (
                                 <div className="h-full w-full p-3 rounded-xl border-2 border-gray-50 shadow-sm flex flex-col justify-between hover:border-brand-blue/20 transition-all cursor-pointer group">
                                    <div className="space-y-1">
                                       <p className="font-black text-[10px] text-text-slate leading-tight">{entry.batchName}</p>
                                       <p className="text-[8px] font-black uppercase text-gray-400 leading-none" style={{ color: entry.subjectColor }}>{entry.subject}</p>
                                    </div>
                                    <div className="flex items-center gap-1.5 pt-1 mt-auto border-t border-gray-50">
                                       <div className="w-5 h-5 rounded-md bg-gray-100 flex items-center justify-center text-[8px] font-black">{entry.teacherName.charAt(0)}</div>
                                       <span className="text-[7px] font-black uppercase text-gray-400 whitespace-nowrap overflow-hidden text-ellipsis">{entry.teacherName}</span>
                                    </div>
                                 </div>
                              )}
                           </div>
                        );
                     })}
                  </React.Fragment>
               ))}
            </div>
         </Card>

         {/* 3. Analytics Panel */}
         <div className="space-y-8">
            <Card className="p-10 border-none shadow-soft rounded-[48px] bg-white group hover:shadow-soft-lg transition-all duration-500">
               <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-black text-text-slate tracking-tight flex items-center gap-3"><PieChart className="w-5 h-5 text-brand-blue" /> Utilization</h3>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Activity className="w-4 h-4 text-gray-200" /></Button>
               </div>
               <div className="space-y-6">
                  {utilization.map((room) => (
                    <div key={room.id} className="space-y-2">
                       <div className="flex justify-between items-end">
                          <p className="text-xs font-black text-text-slate leading-none">{room.name}</p>
                          <p className="text-[10px] font-black text-gray-300 uppercase leading-none">{room.percent}%</p>
                       </div>
                       <div className="h-2 w-full bg-bg-soft rounded-full overflow-hidden">
                          <div className={`h-full rounded-full transition-all duration-1000 ${room.percent > 70 ? 'bg-amber-500' : 'bg-brand-blue'}`} style={{ width: `${room.percent}%` }} />
                       </div>
                    </div>
                  ))}
               </div>
            </Card>

            <Card className="p-10 border-none shadow-soft rounded-[48px] bg-gradient-to-br from-brand-blue to-text-slate text-white h-fit relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full translate-x-20 -translate-y-20 transition-transform group-hover:scale-110 duration-700" />
               <div className="space-y-6 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white">
                     <Users className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                     <h4 className="text-xl font-black tracking-tight leading-loose">Capacity Optimization</h4>
                     <p className="text-sm font-bold text-white/50 leading-relaxed uppercase tracking-wider">
                        All regular sessions are currently fitting within room capacities. 
                        No upgrades needed for the CURRENT active enrollments.
                     </p>
                  </div>
                  <Button variant="ghost" className="h-12 px-0 text-white font-black uppercase text-[10px] tracking-widest hover:bg-transparent hover:underline underline-offset-8">Download Utilization Report</Button>
               </div>
            </Card>
         </div>
      </div>
    </div>
  );
};
