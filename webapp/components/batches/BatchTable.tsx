import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Eye, Edit2, MoreVertical } from 'lucide-react';
import { Batch, StatusType } from '@/lib/mockData';

interface BatchTableProps {
  batches: Batch[];
  onView: (batch: Batch) => void;
  onEdit: (batch: Batch) => void;
  onAction: (batch: Batch, action: string) => void;
}

export const BatchTable: React.FC<BatchTableProps> = ({ batches, onView, onEdit, onAction }) => {
  const getStatusVariant = (status: string): StatusType => {
    switch (status) {
      case 'Active': return 'Active';
      case 'Full': return 'Partial'; 
      case 'Upcoming': return 'Pending';
      default: return 'Inactive';
    }
  };

  const getAttendanceColor = (percent: number) => {
    if (percent >= 85) return 'text-green-500';
    if (percent >= 70) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-b border-gray-100/50 h-16">
            <TableHead className="pl-8 font-bold text-[10px] text-gray-400 uppercase tracking-widest">Batch Name</TableHead>
            <TableHead className="font-bold text-[10px] text-gray-400 uppercase tracking-widest">Standard</TableHead>
            <TableHead className="font-bold text-[10px] text-gray-400 uppercase tracking-widest">Teacher</TableHead>
            <TableHead className="font-bold text-[10px] text-gray-400 uppercase tracking-widest">Students</TableHead>
            <TableHead className="font-bold text-[10px] text-gray-400 uppercase tracking-widest">Schedule</TableHead>
            <TableHead className="font-bold text-[10px] text-gray-400 uppercase tracking-widest">Avg Attendance</TableHead>
            <TableHead className="font-bold text-[10px] text-gray-400 uppercase tracking-widest">Fees</TableHead>
            <TableHead className="font-bold text-[10px] text-gray-400 uppercase tracking-widest">Status</TableHead>
            <TableHead className="text-right pr-8 font-bold text-[10px] text-gray-400 uppercase tracking-widest">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {batches.map((batch) => {
            const fillPercent = Math.round((batch.totalStudents / batch.capacity) * 100);
            return (
              <TableRow 
                key={batch.id} 
                className="hover:bg-bg-soft/50 group transition-colors cursor-pointer"
                onClick={() => onView(batch)}
              >
                <TableCell className="pl-8">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: batch.color }} />
                    <span className="font-bold text-text-slate">{batch.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="default" className="bg-bg-soft text-text-slate border-gray-100 font-bold text-[10px]">{batch.standard}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-bg-soft flex items-center justify-center font-black text-brand-blue text-xs">
                      {batch.teacher.name.charAt(0)}
                    </div>
                    <span className="font-bold text-text-slate text-sm">{batch.teacher.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="w-32">
                    <div className="flex justify-between items-end mb-1">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{batch.totalStudents} / {batch.capacity}</span>
                    </div>
                    <div className="h-1 w-full bg-bg-soft rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${fillPercent >= 100 ? 'bg-red-500' : 'bg-brand-blue'} transition-all`} 
                        style={{ width: `${fillPercent}%` }}
                      />
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold text-text-slate leading-none">{batch.schedule.map(s => s.day.substring(0, 3)).join('/')}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{batch.schedule[0].startTime}–{batch.schedule[0].endTime} AM</p>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`font-black text-sm ${getAttendanceColor(batch.averageAttendance)}`}>
                    {batch.averageAttendance}%
                  </span>
                </TableCell>
                <TableCell>
                  <span className="font-bold text-sm text-text-slate whitespace-nowrap">₹{batch.fees.toLocaleString()}</span>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(batch.status)}>{batch.status}</Badge>
                </TableCell>
                <TableCell className="text-right pr-8" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-end gap-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-10 w-10 p-0 text-gray-400 hover:text-brand-blue hover:bg-brand-blue/10 rounded-xl"
                      onClick={() => onView(batch)}
                    >
                      <Eye className="w-5 h-5" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-10 w-10 p-0 text-gray-400 hover:text-brand-blue hover:bg-brand-blue/10 rounded-xl"
                      onClick={() => onEdit(batch)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-10 w-10 p-0 text-gray-400 hover:text-brand-blue hover:bg-brand-blue/10 rounded-xl"
                      onClick={() => onAction(batch, 'menu')}
                    >
                      <MoreVertical className="w-5 h-5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
