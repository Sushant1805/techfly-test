'use client';
import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Search, Filter, Video, Calendar, Clock, 
  MapPin, Plus, ExternalLink, MoreVertical, 
  CheckCircle2, XCircle, LayoutGrid, List as ListIcon,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import { demos as initialDemos, Demo } from '@/lib/salesData';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_YEAR = "April 2026";

export default function DemosPage() {
  const [viewMode, setViewMode] = useState<'List' | 'Calendar'>('List');
  const [search, setSearch] = useState('');
  const [demos, setDemos] = useState<Demo[]>(initialDemos);

  const filteredDemos = useMemo(() => {
    return demos.filter(d => {
      const searchStr = `${d.leadName} ${d.contactPerson} ${d.assignedTo}`.toLowerCase();
      return searchStr.includes(search.toLowerCase());
    });
  }, [demos, search]);

  const stats = useMemo(() => {
    const totalMonth = 6;
    const completed = demos.filter(d => d.status === 'Completed').length;
    const conversion = 67;
    const noShows = demos.filter(d => d.status === 'No Show').length;
    return { totalMonth, completed, conversion, noShows };
  }, [demos]);

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-700 pb-20">
      
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
           <div className="flex items-center gap-3 mb-2">
             <div className="w-10 h-10 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
               <Video className="w-6 h-6" />
             </div>
             <h1 className="text-4xl font-black text-text-slate tracking-tight">Demo Schedule</h1>
          </div>
          <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">{stats.completed} demos completed this month</p>
        </div>
        <Button className="rounded-2xl px-6 py-6 font-black uppercase tracking-widest text-xs gap-3 shadow-glow h-14 bg-brand-blue">
          <Plus className="w-5 h-5" /> Schedule Demo
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPIMini label="Demos This Month" value={stats.totalMonth.toString()} color="bg-brand-blue/10 text-brand-blue" />
        <KPIMini label="Completed" value={stats.completed.toString()} color="bg-green-500/10 text-green-600" />
        <KPIMini label="Conversion Rate" value={`${stats.conversion}%`} color="bg-purple-500/10 text-purple-600" />
        <KPIMini label="No Shows" value={stats.noShows.toString()} color="bg-red-500/10 text-red-600" />
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex-1 min-w-[300px] relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-blue transition-colors" />
          <input 
            type="text"
            placeholder="Search by institute, agent..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-gray-100 h-16 pl-14 pr-6 rounded-[24px] text-sm font-bold shadow-soft transition-all focus:outline-none focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue/20"
          />
        </div>
        <div className="flex items-center gap-2">
           <div className="bg-white p-1.5 rounded-2xl shadow-soft border border-gray-100 flex items-center gap-1">
             <button 
               onClick={() => setViewMode('Calendar')}
               className={`p-3 rounded-xl transition-all ${viewMode === 'Calendar' ? 'bg-text-slate text-white shadow-soft' : 'text-gray-400 hover:text-text-slate'}`}
             >
               <Calendar className="w-5 h-5" />
             </button>
             <button 
               onClick={() => setViewMode('List')}
               className={`p-3 rounded-xl transition-all ${viewMode === 'List' ? 'bg-text-slate text-white shadow-soft' : 'text-gray-400 hover:text-text-slate'}`}
             >
               <ListIcon className="w-5 h-5" />
             </button>
          </div>
          <Button variant="outline" className="h-16 px-8 rounded-2xl border-gray-100 bg-white font-black uppercase tracking-widest text-[11px] gap-2 shadow-soft">
            <Filter className="w-4 h-4" /> Filters
          </Button>
        </div>
      </div>

      {viewMode === 'List' ? (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
           {/* Section: Upcoming */}
           <div className="space-y-6">
              <h2 className="text-xl font-black text-text-slate tracking-tight uppercase px-2">Upcoming Demos</h2>
              <div className="bg-white rounded-[32px] shadow-soft border border-gray-100 overflow-hidden">
                <table className="w-full text-left border-collapse min-w-[1000px]">
                  <thead>
                    <tr className="border-b border-gray-50 uppercase text-[10px] font-black text-gray-400 tracking-[0.2em] bg-slate-soft/30">
                      <th className="pl-10 py-6">Lead / Institute</th>
                      <th className="px-6 py-6">Date & Time</th>
                      <th className="px-6 py-6 text-center">Mode</th>
                      <th className="px-6 py-6 text-center">Duration</th>
                      <th className="px-6 py-6 text-center">Assigned</th>
                      <th className="px-6 py-6 text-center">Status</th>
                      <th className="px-10 py-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredDemos.filter(d => d.status === 'Scheduled').map((demo) => (
                      <tr key={demo.id} className="group hover:bg-slate-soft/40 transition-all h-20">
                        <td className="pl-10 py-4">
                           <p className="text-xs font-black text-text-slate uppercase leading-none">{demo.leadName}</p>
                           <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase">{demo.contactPerson}</p>
                        </td>
                        <td className="px-6 py-4">
                           <div className="flex items-center gap-2">
                             <Calendar className="w-3.5 h-3.5 text-brand-blue" />
                             <span className="text-xs font-black text-text-slate uppercase tracking-tight">{demo.scheduledDate} · {demo.scheduledTime}</span>
                           </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                           <Badge variant={demo.mode === 'Online' ? 'info' : 'warning'} className="text-[9px] px-2 py-0.5">{demo.mode}</Badge>
                        </td>
                        <td className="px-6 py-4 text-center">
                           <span className="text-xs font-bold text-gray-500">{demo.duration} min</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                           <span className="text-xs font-black text-text-slate uppercase">{demo.assignedTo}</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                           <Badge variant="purple" className="text-[9px] px-2 py-0.5">Scheduled</Badge>
                        </td>
                        <td className="px-10 py-4 text-right">
                           <div className="flex items-center justify-end gap-2">
                              {demo.mode === 'Online' && (
                                <Button size="sm" className="h-9 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest bg-brand-blue shadow-glow gap-2">
                                  <ExternalLink size={14} /> Join
                                </Button>
                              )}
                              <button className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-brand-blue transition-all"><MoreVertical className="w-4 h-4" /></button>
                           </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
           </div>

           {/* Section: Past */}
           <div className="space-y-6">
              <h2 className="text-xl font-black text-text-slate tracking-tight uppercase px-2">Past Demos & Outcomes</h2>
              <div className="bg-white rounded-[32px] shadow-soft border border-gray-100 overflow-hidden">
                <table className="w-full text-left border-collapse min-w-[1000px]">
                  <thead>
                    <tr className="border-b border-gray-50 uppercase text-[10px] font-black text-gray-400 tracking-[0.2em] bg-slate-soft/30">
                      <th className="pl-10 py-6">Lead / Institute</th>
                      <th className="px-6 py-6">Date</th>
                      <th className="px-6 py-6 text-center">Duration</th>
                      <th className="px-6 py-6 text-center">Assigned</th>
                      <th className="px-6 py-6 text-center">Status</th>
                      <th className="px-6 py-6">Outcome</th>
                      <th className="px-10 py-6 text-right">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredDemos.filter(d => d.status !== 'Scheduled').map((demo) => (
                      <tr key={demo.id} className="group hover:bg-slate-soft/40 transition-all h-20 opacity-70 hover:opacity-100">
                        <td className="pl-10 py-4">
                           <p className="text-xs font-black text-text-slate uppercase leading-none">{demo.leadName}</p>
                           <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase">{demo.contactPerson}</p>
                        </td>
                        <td className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">
                           {demo.scheduledDate}
                        </td>
                        <td className="px-6 py-4 text-center text-xs font-bold text-gray-500">
                           {demo.duration} min
                        </td>
                        <td className="px-6 py-4 text-center text-[11px] font-black text-text-slate uppercase">
                           {demo.assignedTo}
                        </td>
                        <td className="px-6 py-4 text-center">
                           <Badge variant={demo.status === 'Completed' ? 'success' : 'danger'} className="text-[9px] px-2 py-0.5">{demo.status}</Badge>
                        </td>
                        <td className="px-6 py-4">
                           {demo.outcome ? (
                             <span className={`text-[10px] font-black uppercase tracking-tight ${demo.outcome === 'Very Interested' ? 'text-green-500' : 'text-gray-400'}`}>{demo.outcome}</span>
                           ) : <span className="text-gray-200">—</span>}
                        </td>
                        <td className="px-10 py-4 text-right">
                           <Button variant="outline" size="sm" className="h-9 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest border-gray-100 bg-white">View</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
           </div>
        </div>
      ) : (
        <CalendarView demos={demos} />
      )}

    </div>
  );
}

const CalendarView = ({ demos }: { demos: Demo[] }) => {
  return (
    <div className="bg-white rounded-[40px] shadow-soft border border-gray-100 p-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex justify-between items-center mb-10">
         <div className="flex items-center gap-6">
            <h2 className="text-3xl font-black text-text-slate uppercase tracking-tight">{MONTH_YEAR}</h2>
            <div className="flex gap-2">
               <button className="w-10 h-10 rounded-xl bg-slate-soft flex items-center justify-center text-gray-400 hover:text-text-slate transition-all"><ChevronLeft size={20} /></button>
               <button className="w-10 h-10 rounded-xl bg-slate-soft flex items-center justify-center text-gray-400 hover:text-text-slate transition-all"><ChevronRight size={20} /></button>
            </div>
         </div>
         <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
               <div className="w-3 h-3 rounded-full bg-brand-blue shadow-glow-blue" />
               <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Online</span>
            </div>
            <div className="flex items-center gap-2">
               <div className="w-3 h-3 rounded-full bg-orange-400" />
               <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">In-Person</span>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-100 border border-gray-100 rounded-[24px] overflow-hidden">
        {DAYS.map(day => (
          <div key={day} className="bg-slate-soft/50 py-4 text-center">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{day}</span>
          </div>
        ))}
        {Array.from({ length: 35 }).map((_, i) => {
          const day = i - 2; // Offset for April starting on Wednesday (assuming dummy)
          const isToday = day === 11;
          const dayString = `2026-04-${day < 10 ? `0${day}` : day}`;
          const dayDemos = demos.filter(d => d.scheduledDate === dayString);

          return (
            <div key={i} className={`bg-white min-h-[140px] p-4 group transition-all hover:bg-slate-soft/20 ${day <= 0 ? 'opacity-20' : ''}`}>
              <div className="flex justify-between items-start mb-2">
                <span className={`text-xs font-black ${isToday ? 'w-7 h-7 bg-brand-blue text-white rounded-lg flex items-center justify-center shadow-glow' : 'text-gray-300'}`}>
                  {day > 0 && day < 31 ? day : ''}
                </span>
                {dayDemos.length > 0 && <span className="text-[9px] font-black text-brand-blue">{dayDemos.length}</span>}
              </div>
              <div className="space-y-1.5">
                {dayDemos.map(demo => (
                  <div key={demo.id} className={`p-1.5 rounded-lg border-l-2 ${demo.mode === 'Online' ? 'bg-brand-blue/5 border-l-brand-blue' : 'bg-orange-50/50 border-l-orange-400'} transition-all hover:translate-x-1 cursor-pointer`}>
                    <p className="text-[8px] font-black text-text-slate uppercase truncate leading-none">{demo.leadName}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                       <Clock size={8} className="text-gray-400" />
                       <span className="text-[7px] font-bold text-gray-400 uppercase tracking-tighter">{demo.scheduledTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const KPIMini = ({ label, value, color }: any) => (
  <Card className="p-6 border-none shadow-soft flex flex-col justify-between group hover:translate-y-[-2px] transition-all">
    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">{label}</p>
    <div className="flex items-end justify-between">
      <p className="text-4xl font-black text-text-slate tracking-tighter leading-none">{value}</p>
      <div className={`p-2 rounded-lg ${color}`}>
         <Video className="w-3.5 h-3.5" />
      </div>
    </div>
  </Card>
);
