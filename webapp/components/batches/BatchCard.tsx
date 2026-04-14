import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Calendar, Clock, DoorOpen, MoreVertical, Phone } from 'lucide-react';
import { Batch, StatusType } from '@/lib/mockData';

interface BatchCardProps {
  batch: Batch;
  onView: (batch: Batch) => void;
  onAction: (batch: Batch, action: string) => void;
}

export const BatchCard: React.FC<BatchCardProps> = ({ batch, onView, onAction }) => {
  const fillPercent = Math.round((batch.totalStudents / batch.capacity) * 100);
  
  const getProgressColor = (percent: number) => {
    if (percent >= 100) return 'bg-red-500';
    if (percent >= 80) return 'bg-amber-500';
    return 'bg-green-500';
  };

  const getStatusVariant = (status: string): StatusType => {
    switch (status) {
      case 'Active': return 'Active';
      case 'Full': return 'Partial'; // Using Partial as orange
      case 'Upcoming': return 'Pending'; // Using Pending as blue
      default: return 'Inactive';
    }
  };

  return (
    <Card 
      className="border-none shadow-soft hover:shadow-soft-lg transition-all duration-300 overflow-hidden group rounded-[32px] bg-white ring-1 ring-gray-100/50"
      style={{ borderLeft: `6px solid ${batch.color}` }}
    >
      <CardContent className="p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-xl font-black text-text-slate tracking-tight group-hover:text-brand-blue transition-colors">{batch.name}</h3>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">ID: {batch.id}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={getStatusVariant(batch.status)} className="font-bold">{batch.status}</Badge>
            <button 
              onClick={(e) => { e.stopPropagation(); onAction(batch, 'menu'); }}
              className="p-2 rounded-xl text-gray-400 hover:bg-bg-soft hover:text-text-slate transition-all"
            >
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          <Badge variant="default" className="bg-brand-blue/10 text-brand-blue border-none font-bold text-[10px] uppercase tracking-wider">{batch.standard}</Badge>
          {batch.subjects.map(s => (
            <span key={s} className="px-3 py-1 rounded-lg bg-bg-soft text-[10px] font-bold text-gray-500 uppercase tracking-tight">{s}</span>
          ))}
        </div>

        <div className="flex items-center gap-4 py-5 border-y border-gray-50 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-bg-soft flex items-center justify-center font-black text-brand-blue shadow-sm">
            {batch.teacher.name.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-bold text-text-slate leading-none mb-1.5">{batch.teacher.name}</p>
            <a 
              href={`tel:${batch.teacher.phone}`} 
              className="flex items-center gap-1.5 text-xs text-gray-400 font-bold hover:text-brand-blue"
              onClick={(e) => e.stopPropagation()}
            >
              <Phone className="w-3.5 h-3.5" />
              {batch.teacher.phone}
            </a>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3 text-sm font-bold text-gray-400 group-hover:text-text-slate transition-colors">
            <Calendar className="w-4 h-4 text-brand-blue" />
            <span>{batch.schedule.map(s => s.day.substring(0, 3)).join(' / ')}</span>
          </div>
          <div className="flex items-center gap-3 text-sm font-bold text-gray-400 group-hover:text-text-slate transition-colors">
            <Clock className="w-4 h-4 text-brand-blue" />
            <span>{batch.schedule[0].startTime} – {batch.schedule[0].endTime} AM</span>
          </div>
          <div className="flex items-center gap-3 text-sm font-bold text-gray-400 group-hover:text-text-slate transition-colors">
            <DoorOpen className="w-4 h-4 text-brand-blue" />
            <span>{batch.room}</span>
          </div>
        </div>

        <div className="mb-10">
          <div className="flex justify-between items-end mb-2.5">
            <span className="text-xs font-black text-gray-400 uppercase tracking-widest">{batch.totalStudents} / {batch.capacity} Students</span>
            <span className={`text-xs font-black ${fillPercent >= 100 ? 'text-red-500' : 'text-text-slate'}`}>{fillPercent}% Full</span>
          </div>
          <div className="h-2.5 w-full bg-bg-soft rounded-full overflow-hidden shadow-inner font-bold">
            <div 
              className={`h-full ${getProgressColor(fillPercent)} transition-all duration-1000`} 
              style={{ width: `${fillPercent}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 py-5 border-t border-gray-50 mb-8">
          <div className="text-center">
            <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Attendance</p>
            <p className="font-bold text-sm text-green-500">{batch.averageAttendance}%</p>
          </div>
          <div className="text-center border-x border-gray-50">
            <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Fees</p>
            <p className="font-bold text-sm text-text-slate">₹{batch.fees.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Next Class</p>
            <p className="font-bold text-sm text-brand-blue">{batch.schedule[0].day.substring(0, 3)}</p>
          </div>
        </div>

        <Button 
          variant="outline" 
          className="w-full h-12 rounded-2xl border-gray-100 font-black text-xs uppercase tracking-[0.2em] group-hover:bg-brand-blue group-hover:text-white group-hover:border-brand-blue transition-all"
          onClick={() => onView(batch)}
        >
          View Batch
        </Button>
      </CardContent>
    </Card>
  );
};
