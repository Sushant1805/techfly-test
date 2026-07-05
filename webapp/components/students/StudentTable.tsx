import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Eye, Edit2, MoreVertical, Phone } from 'lucide-react';
import { Student, StatusType } from '@/lib/mockData';

interface StudentTableProps {
  students: Student[];
  selectedIds: string[];
  onSelectAll: (checked: boolean) => void;
  onSelectRow: (id: string, checked: boolean) => void;
  onView: (student: Student) => void;
  onEdit: (student: Student) => void;
  onAction: (student: Student, action: string) => void;
}

export const StudentTable: React.FC<StudentTableProps> = ({ 
  students, 
  selectedIds, 
  onSelectAll, 
  onSelectRow, 
  onView, 
  onEdit,
  onAction
}) => {
  const getAvatarColor = (name: string) => {
    const firstChar = name.charAt(0).toUpperCase();
    if (firstChar >= 'A' && firstChar <= 'E') return 'bg-purple-100 text-purple-600';
    if (firstChar >= 'F' && firstChar <= 'J') return 'bg-blue-100 text-blue-600';
    if (firstChar >= 'K' && firstChar <= 'O') return 'bg-green-100 text-green-600';
    if (firstChar >= 'P' && firstChar <= 'T') return 'bg-orange-100 text-orange-600';
    return 'bg-teal-100 text-teal-600';
  };

  const getAttendanceColor = (percent: number) => {
    if (percent >= 80) return 'text-green-500';
    if (percent >= 60) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-b border-gray-100/50">
            <TableHead className="w-12 pl-8">
              <input 
                type="checkbox" 
                className="w-5 h-5 rounded-lg border-gray-200 text-brand-blue focus:ring-brand-blue/20 transition-all cursor-pointer"
                checked={students.length > 0 && selectedIds.length === students.length}
                onChange={(e) => onSelectAll(e.target.checked)}
              />
            </TableHead>
            <TableHead className="w-20 font-bold text-[10px] text-gray-400 uppercase tracking-widest pl-4"># Roll</TableHead>
            <TableHead className="font-bold text-[10px] text-gray-400 uppercase tracking-widest">Student</TableHead>
            <TableHead className="font-bold text-[10px] text-gray-400 uppercase tracking-widest">Class & Batch</TableHead>
            <TableHead className="font-bold text-[10px] text-gray-400 uppercase tracking-widest">Contact</TableHead>
            <TableHead className="font-bold text-[10px] text-gray-400 uppercase tracking-widest">Attendance</TableHead>
            <TableHead className="font-bold text-[10px] text-gray-400 uppercase tracking-widest">Fees Status</TableHead>
            <TableHead className="font-bold text-[10px] text-gray-400 uppercase tracking-widest">Status</TableHead>
            <TableHead className="text-right pr-8 font-bold text-[10px] text-gray-400 uppercase tracking-widest">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => {
            const isSelected = selectedIds.includes(student.id);
            return (
              <TableRow 
                key={student.id} 
                className={`${isSelected ? 'bg-brand-blue/[0.02]' : ''} hover:bg-bg-soft/50 group transition-colors cursor-pointer`}
                onClick={() => onView(student)}
              >
                <TableCell className="pl-8" onClick={(e) => e.stopPropagation()}>
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 rounded-lg border-gray-200 text-brand-blue focus:ring-brand-blue/20 transition-all cursor-pointer"
                    checked={isSelected}
                    onChange={(e) => onSelectRow(student.id, e.target.checked)}
                  />
                </TableCell>
                <TableCell className="pl-4 font-bold text-gray-400 text-xs">{student.rollNumber}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-[20px] ${getAvatarColor(student.name)} flex items-center justify-center font-black text-sm shadow-sm group-hover:scale-105 transition-transform`}>
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-text-slate leading-none mb-1">{student.name}</p>
                      <p className="text-[11px] font-bold text-gray-400 tracking-tight leading-none uppercase">{student.id}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <Badge variant="default" className="bg-bg-soft text-text-slate border-gray-100 font-bold text-[10px]">{student.standard}</Badge>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">{student.batch}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <a 
                      href={`tel:${student.phone}`} 
                      className="flex items-center gap-1.5 text-[11px] font-bold text-brand-blue hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Phone className="w-3 h-3" />
                      {student.phone}
                    </a>
                  </div>
                </TableCell>
                <TableCell>
                  {student.attendancePercent && student.attendancePercent > 0 ? (
                    <div className="w-24">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`text-[13px] font-black ${getAttendanceColor(student.attendancePercent)}`}>
                          {student.attendancePercent}%
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-bg-soft rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${getAttendanceColor(student.attendancePercent).replace('text', 'bg')} transition-all duration-1000`} 
                          style={{ width: `${student.attendancePercent}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <span className="text-gray-300 text-xs font-bold">—</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <Badge variant={student.feesStatus as StatusType}>{student.feesStatus}</Badge>
                    {student.feesStatus !== 'Paid' && (
                      <p className="text-[10px] font-black text-red-500 uppercase tracking-tighter ml-1">₹{(student.totalFeesDue ?? 0).toLocaleString()} Due</p>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={student.status as StatusType}>{student.status}</Badge>
                </TableCell>
                <TableCell className="text-right pr-8" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-end gap-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-10 w-10 p-0 text-gray-400 hover:text-brand-blue hover:bg-brand-blue/10 rounded-xl"
                      onClick={() => onView(student)}
                    >
                      <Eye className="w-5 h-5" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-10 w-10 p-0 text-gray-400 hover:text-brand-blue hover:bg-brand-blue/10 rounded-xl"
                      onClick={() => onEdit(student)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-10 w-10 p-0 text-gray-400 hover:text-brand-blue hover:bg-brand-blue/10 rounded-xl"
                      onClick={() => onAction(student, 'More')}
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
