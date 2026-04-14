import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Users, UserCheck, AlertCircle, TrendingDown } from 'lucide-react';

interface SummaryStripProps {
  total: number;
  active: number;
  pendingFees: number;
  lowAttendance: number;
}

export const SummaryStrip: React.FC<SummaryStripProps> = ({ total, active, pendingFees, lowAttendance }) => {
  const stats = [
    { label: 'Total Students', value: total, icon: Users, color: 'text-brand-blue', bg: 'bg-brand-blue/10' },
    { label: 'Active', value: active, icon: UserCheck, color: 'text-green-500', bg: 'bg-green-50' },
    { label: 'Pending Fees', value: pendingFees, icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50' },
    { label: 'Low Attendance', value: lowAttendance, icon: TrendingDown, color: 'text-orange-500', bg: 'bg-orange-50' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="border-none shadow-soft hover:shadow-soft-lg transition-all duration-300 overflow-hidden group">
          <CardContent className="p-0">
            <div className="flex items-center gap-4 p-5">
              <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center transition-transform group-hover:scale-110 duration-300`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1.5">{stat.label}</p>
                <p className="text-2xl font-black text-text-slate tracking-tight leading-none">{stat.value}</p>
              </div>
            </div>
            <div className={`h-1 w-full ${stat.bg}`}>
              <div className={`h-full ${stat.color.replace('text', 'bg')} w-2/3 opacity-30`} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
