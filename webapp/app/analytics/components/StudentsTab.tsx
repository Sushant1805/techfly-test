'use client';
import React, { useMemo } from 'react';
import { 
  Users, UserPlus, UserMinus, UserX, Venus, Mars, 
  ArrowUpRight, Info, Download, Filter, ChevronDown 
} from 'lucide-react';
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Cell, PieChart, Pie, Legend
} from 'recharts';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { 
  GlobalFilter, studentGrowthData, studentSummaryStats, studentFunnelData 
} from '@/lib/analyticsData';

export default function StudentsTab({ filters }: { filters: GlobalFilter }) {
  const summaryCards = [
    { label: 'Total Students', value: studentSummaryStats.total, icon: Users, color: 'bg-purple-100 text-purple-600', sub: '+12 this month' },
    { label: 'New This Month', value: studentSummaryStats.newThisMonth, icon: UserPlus, color: 'bg-green-100 text-green-600', sub: 'Highest in Q1' },
    { label: 'Inactive', value: studentSummaryStats.inactive, icon: UserX, color: 'bg-gray-100 text-gray-600', sub: 'Needs follow-up' },
    { label: 'Left Institute', value: studentSummaryStats.left, icon: UserMinus, color: 'bg-red-100 text-red-600', sub: '0.8% churn rate' },
    { label: 'Gender Ratio', value: studentSummaryStats.genderRatio, icon: Mars, color: 'bg-blue-100 text-blue-600', sub: 'M : F' },
  ];

  const enrollmentTable = [
    { month: 'Jan', new: 35, left: 0, net: '+35' },
    { month: 'Feb', new: 24, left: 0, net: '+24' },
    { month: 'Mar', new: 29, left: 1, net: '+28' },
    { month: 'Apr', new: 12, left: 2, net: '+10' },
  ];

  const batchDistributionData = [
    { name: 'Batch A', active: 38, inactive: 4, leave: 2 },
    { name: 'Batch B', active: 42, inactive: 2, leave: 1 },
    { name: 'Batch C', active: 35, inactive: 5, leave: 3 },
    { name: 'Batch D', active: 30, inactive: 1, leave: 1 },
    { name: 'Batch E', active: 28, inactive: 8, leave: 4 },
  ];

  const genderData = [
    { name: 'Male', value: 58, color: '#3B82F6' },
    { name: 'Female', value: 42, color: '#EC4899' },
  ];

  const statusGradeData = [
    { grade: 'A+ (90%+)', count: 22, color: 'bg-indigo-600' },
    { grade: 'A (80–89%)', count: 48, color: 'bg-indigo-500' },
    { grade: 'B+ (70–79%)', count: 72, color: 'bg-indigo-400' },
    { grade: 'B (60–69%)', count: 72, color: 'bg-indigo-300' },
    { grade: 'C (50–59%)', count: 48, color: 'bg-gray-400' },
    { grade: 'D (40–49%)', count: 26, color: 'bg-amber-400' },
    { grade: 'F (<40%)', count: 16, color: 'bg-red-500' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {summaryCards.map((card, i) => (
          <Card key={i} className="p-6 border-none shadow-sm flex flex-col gap-4">
            <div className={`w-12 h-12 rounded-2xl ${card.color} flex items-center justify-center`}>
              <card.icon size={24} />
            </div>
            <div>
              <div className="text-xs font-black text-gray-400 uppercase tracking-widest">{card.label}</div>
              <div className="text-3xl font-black text-gray-900 mt-1">{card.value}</div>
              <div className="text-[10px] font-bold text-gray-500 mt-1 uppercase tracking-tight">{card.sub}</div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Section A: Enrollment Trend */}
        <Card className="lg:col-span-2 p-6 border-none shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-black text-gray-900">Enrollment Growth Trend</h3>
            <div className="flex gap-2">
              <button className="p-2 bg-gray-50 rounded-lg text-gray-400 hover:text-purple-600 transition-colors">
                <Download size={16} />
              </button>
            </div>
          </div>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={studentGrowthData}>
                <defs>
                  <linearGradient id="colorEnroll" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis 
                   dataKey="month" 
                   axisLine={false} 
                   tickLine={false} 
                   tick={{ fontSize: 11, fontWeight: 'bold', fill: '#94A3B8' }}
                   dy={10}
                />
                <YAxis hide domain={['dataMin - 20', 'dataMax + 20']} />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-3 rounded-xl shadow-xl border border-gray-100">
                          <div className="text-[10px] font-black text-gray-400 uppercase mb-1">{payload[0].payload.month}</div>
                          <div className="text-lg font-black text-purple-600">{payload[0].value} Students</div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="students" 
                  stroke="#8B5CF6" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorEnroll)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">
                  <th className="py-2">Month</th>
                  <th className="py-2">New Joins</th>
                  <th className="py-2 text-red-500">Left</th>
                  <th className="py-2 text-green-500">Net Change</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {enrollmentTable.map((row, i) => (
                  <tr key={i} className="text-sm font-bold text-gray-700 hover:bg-gray-50/50 transition-colors">
                    <td className="py-3">{row.month} 2026</td>
                    <td className="py-3">{row.new}</td>
                    <td className="py-3">{row.left}</td>
                    <td className="py-3 text-purple-600">{row.net}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Section B: New vs Leaving (Monthly) */}
        <Card className="p-6 border-none shadow-sm flex flex-col">
          <h3 className="text-lg font-black text-gray-900 mb-6">New vs Leaving</h3>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={enrollmentTable}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fontWeight: 'bold', fill: '#94A3B8' }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip cursor={{ fill: '#F8FAFC' }} />
                <Bar dataKey="new" fill="#10B981" radius={[4, 4, 0, 0]} barSize={12} />
                <Bar dataKey="left" fill="#EF4444" radius={[4, 4, 0, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-50">
             <div className="text-xs font-black text-gray-400 uppercase mb-4 tracking-tighter">Overall Retention Rate</div>
             <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-gray-900">98.6%</span>
                <Badge className="bg-green-100 text-green-700 border-none px-2 py-0.5 font-bold uppercase text-[9px]">Excellent</Badge>
             </div>
             <div className="mt-4 flex gap-1 h-2 rounded-full overflow-hidden w-full bg-gray-100">
                <div className="bg-green-500 h-full" style={{ width: '98.6%' }} />
                <div className="bg-red-400 h-full flex-1" />
             </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section C: Batch-wise Distribution */}
        <Card className="p-6 border-none shadow-sm">
          <h3 className="text-lg font-black text-gray-900 mb-6">Batch Distribution</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={batchDistributionData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fontWeight: 'black', fill: '#94A3B8' }}
                />
                <Tooltip cursor={{ fill: '#F8FAFC' }} />
                <Bar dataKey="active" stackId="a" fill="#5E4E99" radius={[4, 0, 0, 4]} barSize={20} />
                <Bar dataKey="inactive" stackId="a" fill="#94A3B8" barSize={20} />
                <Bar dataKey="leave" stackId="a" fill="#F59E0B" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex justify-center gap-6 text-[10px] font-black uppercase tracking-widest text-gray-400">
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#5E4E99] rounded" /> Active</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#94A3B8] rounded" /> Inactive</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#F59E0B] rounded" /> Leave</div>
          </div>
        </Card>

        {/* Section D: Student Status Funnel */}
        <Card className="p-6 border-none shadow-sm">
          <h3 className="text-lg font-black text-gray-900 mb-8 lowercase tracking-tighter">Student Status Funnel</h3>
          <div className="space-y-4">
            {studentFunnelData.map((stage, i) => (
              <div key={i} className="space-y-1.5 group">
                <div className="flex justify-between items-center px-1">
                  <span className="text-[11px] font-black text-gray-500 uppercase tracking-widest">{stage.name}</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-black text-gray-900">{stage.count}</span>
                    <span className="text-[10px] font-bold text-gray-400">{stage.percent}%</span>
                  </div>
                </div>
                <div className="w-full h-10 flex">
                  <div 
                    className={`h-full ${stage.color} rounded-lg flex items-center justify-end px-3 transition-all duration-700 group-hover:brightness-110 shadow-sm`}
                    style={{ width: `${stage.percent}%`, borderTopRightRadius: i < 4 ? '4px' : '8px', borderBottomRightRadius: i < 4 ? '4px' : '8px' }}
                  >
                    {stage.percent > 20 && <div className="hidden md:block w-0.5 h-4 bg-white/30 rounded-full" />}
                  </div>
                  <div className="flex-1 h-full bg-gray-50 border-y border-r border-gray-100/50 rounded-r-lg" />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section G: Student Performance Distribution */}
        <Card className="p-6 border-none shadow-sm h-fit">
          <h3 className="text-lg font-black text-gray-900 mb-6">Academic Standing Distribution</h3>
          <div className="space-y-4">
            {statusGradeData.map((grade, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-24 text-[11px] font-black text-gray-400 uppercase">{grade.grade}</div>
                <div className="flex-1 h-4 bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                  <div className={`h-full ${grade.color} transition-all duration-1000`} style={{ width: `${(grade.count / 348) * 100 * 4}%` }} />
                </div>
                <div className="w-12 text-right text-xs font-black text-gray-900">{grade.count}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-4">
             <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                <Info size={20} />
             </div>
             <p className="text-xs font-bold text-gray-500 leading-relaxed italic">
               "41% of students are in the A or B+ bracket. There are 16 students in the F bracket requiring immediate intervention."
             </p>
          </div>
        </Card>

        {/* Gender Breakdown Row */}
        <div className="flex flex-col gap-6">
          <Card className="p-6 border-none shadow-sm flex-1 flex flex-col items-center justify-center">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4 self-start">Gender Distribution</h3>
            <div className="relative w-48 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                  >
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <div className="flex gap-2 mb-1">
                   <Mars size={20} className="text-blue-500" />
                   <Venus size={20} className="text-pink-500" />
                </div>
                <span className="text-2xl font-black text-gray-900">58:42</span>
              </div>
            </div>
            <div className="mt-6 flex gap-12">
               <div className="text-center">
                 <div className="text-2xl font-black text-blue-600">202</div>
                 <div className="text-[10px] font-black text-gray-400 uppercase">MALE</div>
               </div>
               <div className="text-center border-l border-gray-100 pl-12">
                 <div className="text-2xl font-black text-pink-600">146</div>
                 <div className="text-[10px] font-black text-gray-400 uppercase">FEMALE</div>
               </div>
            </div>
          </Card>
          
          <Card className="p-6 border-none shadow-sm bg-purple-600 text-white relative overflow-hidden group">
             <div className="flex justify-between items-start relative z-10">
                <h3 className="text-sm font-black uppercase tracking-widest text-purple-200">New Enrollments</h3>
                <TrendingUp size={24} className="opacity-40 group-hover:scale-125 transition-transform" />
             </div>
             <div className="text-4xl font-black mt-4 relative z-10">+11.4%</div>
             <p className="text-xs font-bold text-purple-200 mt-2 relative z-10 leading-relaxed uppercase tracking-tighter">Growth in new signups compared to previous quarter (Q4 2025)</p>
             <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-2xl transition-all group-hover:scale-150" />
          </Card>
        </div>
      </div>
    </div>
  );
}

const TrendingUp = ({ className, size }: { className?: string, size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);
