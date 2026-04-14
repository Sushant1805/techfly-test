'use client';
import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Search, Filter, Bell, Phone, Mail, 
  MessageSquare, Video, Clock, CheckCircle2, 
  Calendar, MoreVertical, AlertCircle, Undo2, Users
} from 'lucide-react';
import { followUps as initialFollowUps, FollowUp } from '@/lib/salesData';
import { CustomerAvatar } from '@/components/ui/CustomerAvatar';

const toDateStr = (d: Date) => d.toISOString().split('T')[0];

export default function FollowUpsPage() {
  const [search, setSearch] = useState('');
  const todayStr = toDateStr(new Date());
  const upcomingDays = Array.from({ length: 4 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return toDateStr(d);
  });
  const [tasks, setTasks] = useState<FollowUp[]>(initialFollowUps);

  const filteredTasks = useMemo(() => {
    return tasks.filter(t => {
      const searchStr = `${t.leadName} ${t.contactPerson} ${t.notes}`.toLowerCase();
      return searchStr.includes(search.toLowerCase());
    });
  }, [tasks, search]);

  const stats = useMemo(() => {
    const today = filteredTasks.filter(t => t.scheduledDate === todayStr && t.status !== 'Done').length;
    const overdue = filteredTasks.filter(t => t.status === 'Overdue').length;
    const week = filteredTasks.filter(t => t.status !== 'Done').length;
    const completed = tasks.filter(t => t.status === 'Done').length;
    return { today, overdue, week, completed };
  }, [filteredTasks, tasks, todayStr]);

  const handleComplete = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: 'Done', completedAt: new Date().toISOString() } : t));
  };

  const handleUndo = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: 'Pending', completedAt: null } : t));
  };

  const todayTasks = filteredTasks.filter(t => t.scheduledDate === todayStr);
  const overdueTasks = filteredTasks.filter(t => t.status === 'Overdue');
  const upcomingTasks = filteredTasks.filter(t => t.scheduledDate > todayStr && t.status !== 'Done');

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-700 pb-20">
      
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
           <div className="flex items-center gap-3 mb-2">
             <div className="w-10 h-10 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
               <Bell className="w-6 h-6" />
             </div>
             <h1 className="text-4xl font-black text-text-slate tracking-tight">Follow-ups & Tasks</h1>
          </div>
          <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Manage your sales outreach and scheduled activities</p>
        </div>
        <Button className="rounded-2xl px-6 py-6 font-black uppercase tracking-widest text-xs gap-3 shadow-glow h-14 bg-brand-blue">
          <Calendar className="w-5 h-5" /> Schedule Follow-up
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPIMini label="Due Today" value={stats.today.toString()} color="bg-brand-blue/10 text-brand-blue" />
        <KPIMini label="Overdue" value={stats.overdue.toString()} color={stats.overdue > 0 ? 'bg-red-500 text-white shadow-glow-red animate-pulse' : 'bg-slate-soft text-gray-400'} />
        <KPIMini label="This Week" value={stats.week.toString()} color="bg-purple-500/10 text-purple-600" />
        <KPIMini label="Completed (Mo)" value={stats.completed.toString()} color="bg-green-500/10 text-green-600" />
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex-1 min-w-[300px] relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-blue transition-colors" />
          <input 
            type="text"
            placeholder="Search by lead name, contact, notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-gray-100 h-16 pl-14 pr-6 rounded-[24px] text-sm font-bold shadow-soft transition-all focus:outline-none focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue/20"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-16 px-8 rounded-2xl border-gray-100 bg-white font-black uppercase tracking-widest text-[11px] gap-2 shadow-soft">
            <Filter className="w-4 h-4" /> Filters
          </Button>
        </div>
      </div>

      {/* Section: Overdue */}
      {overdueTasks.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-4 px-2">
             <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
             <h2 className="text-xl font-black text-red-500 tracking-tight uppercase">⚠ Overdue Tasks</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
             {overdueTasks.map(task => (
               <TaskCard key={task.id} task={task} onComplete={() => handleComplete(task.id)} isOverdue />
             ))}
          </div>
        </div>
      )}

      {/* Section: Today */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
           <h2 className="text-xl font-black text-text-slate tracking-tight uppercase">Today — {new Date().toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</h2>
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{todayTasks.length} tasks</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
           {todayTasks.map(task => (
             <TaskCard 
              key={task.id} 
              task={task} 
              onComplete={() => handleComplete(task.id)} 
              onUndo={() => handleUndo(task.id)}
             />
           ))}
        </div>
      </div>

      {/* Section: Upcoming This Week */}
      <div className="space-y-6">
        <h2 className="text-xl font-black text-text-slate tracking-tight uppercase px-2">Upcoming This Week</h2>
        <div className="bg-white rounded-[32px] shadow-soft border border-gray-100 overflow-hidden divide-y divide-gray-50">
           {upcomingDays.map(date => {
              const dayTasks = upcomingTasks.filter(t => t.scheduledDate === date);
              if (dayTasks.length === 0) return null;
              return (
                <div key={date} className="p-8">
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-6">{new Date(date).toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'short' })}</p>
                   <div className="space-y-4">
                      {dayTasks.map(t => (
                        <div key={t.id} className="flex flex-wrap items-center gap-6 group hover:translate-x-1 transition-all">
                           <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${t.priority === 'High' ? 'bg-red-50 text-red-500' : 'bg-slate-soft text-gray-400'}`}>
                             {t.type === 'Call' ? <Phone size={16} /> : t.type === 'Meeting' ? <Users size={16} /> : t.type === 'Demo' ? <Video size={16} /> : <MessageSquare size={16} />}
                           </div>
                           <div className="flex-1">
                              <div className="flex items-center gap-3">
                                <span className="text-sm font-black text-text-slate uppercase tracking-tight">{t.leadName}</span>
                                <Badge variant={t.priority === 'High' ? 'danger' : 'info'} className="text-[8px] px-2 py-0">● {t.priority}</Badge>
                              </div>
                              <p className="text-xs font-bold text-gray-400 mt-1 italic leading-tight">"{t.notes}"</p>
                           </div>
                           <div className="text-right flex items-center gap-10">
                              <div className="text-right min-w-[100px]">
                                 <p className="text-xs font-black text-text-slate">{t.scheduledTime || 'ALL DAY'}</p>
                                 <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Assigned: {t.assignedTo}</p>
                              </div>
                              <button className="p-2 hover:bg-slate-soft rounded-lg text-gray-300 hover:text-brand-blue opacity-0 group-hover:opacity-100 transition-all">
                                 <MoreVertical className="w-4 h-4" />
                              </button>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
              );
           })}
        </div>
      </div>

    </div>
  );
}

const TaskCard = ({ task, onComplete, onUndo, isOverdue }: { task: FollowUp, onComplete: () => void, onUndo?: () => void, isOverdue?: boolean }) => (
  <Card className={`p-6 border-none shadow-soft flex flex-col gap-6 relative overflow-hidden transition-all hover:shadow-glow-blue ${task.status === 'Done' ? 'bg-green-50/30' : ''}`}>
     {task.status === 'Done' && <div className="absolute top-0 left-0 w-1 h-full bg-green-500" />}
     {isOverdue && <div className="absolute top-0 left-0 w-1 h-full bg-red-500" />}
     
     <div className="flex justify-between items-start relative z-10">
        <div className="flex gap-4 items-center">
           <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${task.status === 'Done' ? 'bg-green-500 text-white' : isOverdue ? 'bg-red-500 text-white shadow-glow-red' : 'bg-slate-soft text-text-slate'}`}>
              {task.type === 'Call' ? <Phone size={20} /> : task.type === 'WhatsApp' ? <MessageSquare size={20} /> : <Mail size={20} />}
           </div>
           <div>
              <div className="flex items-center gap-3">
                 <h4 className="text-base font-black text-text-slate racking-tight uppercase leading-none">{task.leadName}</h4>
                 {isOverdue && <Badge variant="danger" className="text-[8px] px-2 py-0.5 animate-pulse">OVERDUE</Badge>}
                 {task.status === 'Done' && <Badge variant="success" className="text-[8px] px-2 py-0.5">DONE ✓</Badge>}
              </div>
              <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">{task.contactPerson} · {task.phone}</p>
           </div>
        </div>
        <div className="text-right">
           <p className={`text-xs font-black uppercase ${isOverdue ? 'text-red-500' : 'text-text-slate'}`}>{task.scheduledTime || 'ALL DAY'}</p>
           <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Priority: {task.priority}</p>
        </div>
     </div>

     <div className="bg-white/50 p-4 rounded-xl border border-gray-50 italic">
        <p className="text-sm font-bold text-gray-500 leading-relaxed">"{task.notes}"</p>
     </div>

     <div className="flex justify-between items-center pt-2">
        <div className="flex items-center gap-3">
           <CustomerAvatar name="Vikram Shah" initials={task.assignedTo.charAt(0)} size="xs" />
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Assigned: {task.assignedTo}</p>
        </div>
        <div className="flex gap-2">
           {task.status === 'Done' ? (
             <Button variant="outline" size="sm" onClick={onUndo} className="h-10 px-4 rounded-xl border-gray-100 bg-white text-[10px] font-black uppercase tracking-widest gap-2">
               <Undo2 className="w-3.5 h-3.5" /> Undo
             </Button>
           ) : (
             <>
               <Button variant="outline" size="sm" className="h-10 px-4 rounded-xl border-gray-100 bg-white text-[10px] font-black uppercase tracking-widest">Snooze</Button>
               <Button size="sm" onClick={onComplete} className="h-10 px-4 rounded-xl bg-brand-blue text-white shadow-glow text-[10px] font-black uppercase tracking-widest gap-2">
                 <CheckCircle2 className="w-3.5 h-3.5" /> Complete
               </Button>
             </>
           )}
        </div>
     </div>
  </Card>
);

const KPIMini = ({ label, value, color }: any) => (
  <Card className="p-6 border-none shadow-soft flex flex-col justify-between group hover:translate-y-[-2px] transition-all">
    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">{label}</p>
    <div className="flex items-end justify-between">
      <p className="text-4xl font-black text-text-slate tracking-tighter leading-none">{value}</p>
      <div className={`p-2 rounded-lg ${color}`}>
         <CheckCircle2 className="w-3.5 h-3.5" />
      </div>
    </div>
  </Card>
);
