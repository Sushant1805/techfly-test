'use client';
import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  TrendingUp, TrendingDown, Users, AlertCircle, 
  Download, Filter, ChevronLeft, ChevronRight,
  Target, Info, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { attendanceRecords, batches, students, subjectColors } from '@/lib/mockData';

export const AttendanceReports: React.FC = () => {
  const [selectedBatchId, setSelectedBatchId] = useState<string>('all');
  const [dateRange, setDateRange] = useState('This Month');

  // Aggregated Stats
  const stats = useMemo(() => {
    const total = attendanceRecords.length;
    const present = attendanceRecords.filter(r => r.status === 'Present').length;
    const late = attendanceRecords.filter(r => r.status === 'Late').length;
    const rate = Math.round(((present + late) / total) * 100);

    return {
      rate: rate || 0,
      bestBatch: "Batch A (91%)",
      worstBatch: "Batch H (62%)",
      atRisk: 14
    };
  }, []);

  // Trend Data for Chart
  const trendData = useMemo(() => {
    const dates = Array.from(new Set(attendanceRecords.map(r => r.date))).sort().slice(-14);
    return dates.map(date => {
      const dayRecords = attendanceRecords.filter(r => r.date === date);
      const row: any = { date: new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) };
      
      batches.forEach(b => {
        const batchDayRecords = dayRecords.filter(r => r.batchName === b.name);
        if (batchDayRecords.length > 0) {
          const p = batchDayRecords.filter(r => r.status === 'Present' || r.status === 'Late').length;
          row[b.name] = Math.round((p / batchDayRecords.length) * 100);
        }
      });
      return row;
    });
  }, []);

  return (
    <div className="space-y-10">
      {/* 1. Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ReportStatCard label="Overall Attendance" value={`${stats.rate}%`} trend="+2.4%" isUp icon={Target} color="text-brand-blue" />
        <ReportStatCard label="Best Batch" value={stats.bestBatch} trend="Stable" isUp icon={TrendingUp} color="text-green-500" />
        <ReportStatCard label="Worst Batch" value={stats.worstBatch} trend="-4.1%" isUp={false} icon={TrendingDown} color="text-red-500" />
        <ReportStatCard label="Students < 75%" value={stats.atRisk} trend="Alert" isUp={false} icon={AlertCircle} color="text-amber-600" />
      </div>

      {/* 2. Controls Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-6 p-6 rounded-[28px] bg-white shadow-soft">
        <div className="flex items-center gap-4">
          <select 
            className="h-12 px-4 rounded-xl border border-gray-100 bg-bg-soft/20 text-xs font-black uppercase tracking-widest focus:outline-none focus:ring-4 focus:ring-brand-blue/10"
            value={selectedBatchId}
            onChange={(e) => setSelectedBatchId(e.target.value)}
          >
            <option value="all">All Batches</option>
            {batches.map(b => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
          <div className="flex items-center gap-1 bg-bg-soft/20 p-1 rounded-xl">
            {['Weekly', 'Monthly', 'Custom'].map(t => (
              <button 
                key={t}
                onClick={() => setDateRange(t)}
                className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                  dateRange === t ? 'bg-white text-brand-blue shadow-sm' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-12 px-6 rounded-xl border-gray-100 font-black text-[10px] uppercase tracking-widest gap-2">
            <Filter className="w-3.5 h-3.5" /> More Filters
          </Button>
          <Button variant="outline" className="h-12 px-6 rounded-xl border-gray-100 font-black text-[10px] uppercase tracking-widest gap-2 bg-brand-blue/5 border-brand-blue/10 text-brand-blue">
            <Download className="w-3.5 h-3.5" /> Export Report
          </Button>
        </div>
      </div>

      {/* 3. Trend Chart & Heatmap Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <Card className="lg:col-span-2 p-10 border-none shadow-soft rounded-[40px] bg-white">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-black text-text-slate tracking-tight">Attendance Trend</h3>
              <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">Average daily attendance rate per batch</p>
            </div>
            <div className="flex gap-2">
              <Badge variant="Active" className="bg-brand-blue/10 text-brand-blue px-3 py-1.5 h-auto">Active</Badge>
            </div>
          </div>
          <div className="h-[350px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 900, fill: '#94A3B8' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 900, fill: '#94A3B8' }} 
                  domain={[0, 100]}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontWeight: 'bold' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }} />
                <Line type="monotone" dataKey="Batch A" stroke="#5E4E99" strokeWidth={4} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Batch B" stroke="#1D9E75" strokeWidth={4} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} />
                <Line type="monotone" dataKey="Batch C" stroke="#D85A30" strokeWidth={4} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-10 border-none shadow-soft rounded-[40px] bg-white">
          <div className="flex flex-col h-full">
            <div className="mb-10">
              <h3 className="text-xl font-black text-text-slate tracking-tight">Active Days</h3>
              <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">April Heatmap (Batch A)</p>
            </div>
            
            <div className="grid grid-cols-7 gap-3 mb-2">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(d => (
                <div key={d} className="text-[10px] font-black text-gray-300 text-center uppercase tracking-widest">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-3 flex-1">
              {Array.from({ length: 30 }).map((_, i) => {
                const day = i + 1;
                const isSun = (day + 2) % 7 === 0; // rough demo alignment
                const rate = Math.random() * 100;
                let color = 'bg-bg-soft/30 hover:bg-bg-soft/50';
                if (!isSun) {
                  if (rate > 90) color = 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:scale-110';
                  else if (rate > 80) color = 'bg-green-200 hover:scale-110';
                  else if (rate > 60) color = 'bg-amber-300 hover:scale-110';
                  else color = 'bg-red-400 hover:scale-110';
                }
                return (
                  <div key={i} className={`aspect-square rounded-xl transition-all duration-300 flex items-center justify-center text-[9px] font-black ${isSun ? 'text-gray-200' : 'text-white'} ${color}`}>
                    {day}
                  </div>
                );
              })}
            </div>

            <div className="mt-8 pt-8 border-t border-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Low</span>
              </div>
              <div className="flex items-center gap-1.5 font-bold text-gray-400">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-300" />
                <span className="text-[8px] font-black uppercase tracking-widest">Fair</span>
              </div>
              <div className="flex items-center gap-1.5 font-bold text-gray-400">
                <div className="w-2.5 h-2.5 rounded-full bg-green-200" />
                <span className="text-[8px] font-black uppercase tracking-widest">Good</span>
              </div>
              <div className="flex items-center gap-1.5 font-bold text-gray-400">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <span className="text-[8px] font-black uppercase tracking-widest">High</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* 4. Student Report Table */}
      <Card className="border-none shadow-soft rounded-[40px] overflow-hidden bg-white">
        <div className="p-10 border-b border-gray-50 flex items-center justify-between bg-bg-soft/5">
          <div>
            <h3 className="text-xl font-black text-text-slate tracking-tight font-bold">Student Performance Analysis</h3>
            <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">Monthly attendance breakdown per student</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Show Only Below 75%</span>
              <div className="w-12 h-6 rounded-full bg-red-100 p-1 cursor-pointer">
                <div className="w-4 h-4 rounded-full bg-red-500 shadow-sm transition-all ml-0" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-bg-soft/30 h-16">
                <th className="pl-10 text-left font-black text-[10px] text-gray-400 uppercase tracking-widest">Student</th>
                <th className="text-left font-black text-[10px] text-gray-400 uppercase tracking-widest">Batch</th>
                <th className="text-center font-black text-[10px] text-gray-400 uppercase tracking-widest">Total Classes</th>
                <th className="text-center font-black text-[10px] text-gray-400 uppercase tracking-widest text-green-500">Present</th>
                <th className="text-center font-black text-[10px] text-gray-400 uppercase tracking-widest text-red-500">Absent</th>
                <th className="text-center font-black text-[10px] text-gray-400 uppercase tracking-widest text-amber-500">Late</th>
                <th className="text-center font-black text-[10px] text-gray-400 uppercase tracking-widest">Rate %</th>
                <th className="pr-10 text-right font-black text-[10px] text-gray-400 uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {students.slice(0, 10).map((s, idx) => {
                const rate = s.attendancePercent;
                const status = rate >= 80 ? 'Good' : rate >= 60 ? 'Average' : 'Poor';
                return (
                  <tr key={s.id} className="h-16 hover:bg-bg-soft/10 transition-colors group cursor-pointer">
                    <td className="pl-10">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-bg-soft flex items-center justify-center font-black text-brand-blue text-[10px] shadow-sm">
                          {s.name.charAt(0)}
                        </div>
                        <span className="font-bold text-text-slate text-sm">{s.name}</span>
                      </div>
                    </td>
                    <td><Badge variant="default" className="bg-white border-gray-100 text-gray-500 text-[10px] font-bold">{s.batch}</Badge></td>
                    <td className="text-center font-bold text-gray-500">42</td>
                    <td className="text-center font-black text-sm text-green-500">{Math.round(42 * (rate/100))}</td>
                    <td className="text-center font-black text-sm text-red-500">{Math.floor(42 * (1 - rate/100) * 0.7)}</td>
                    <td className="text-center font-black text-sm text-amber-500">{Math.floor(Math.random() * 5)}</td>
                    <td className="text-center">
                      <span className={`font-black ${rate < 75 ? 'text-red-500' : 'text-text-slate'}`}>{rate}%</span>
                    </td>
                    <td className="pr-10 text-right">
                      <Badge variant={status === 'Good' ? 'Active' : status === 'Average' ? 'Partial' : 'Inactive'} className="font-black text-[9px] uppercase tracking-widest px-3">
                        {status === 'Poor' && <AlertCircle className="w-3 h-3 mr-1" />} {status}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="p-8 text-center bg-bg-soft/10 border-t border-gray-50">
          <button className="text-[10px] font-black uppercase text-brand-blue hover:underline tracking-widest">Load More Tracking History</button>
        </div>
      </Card>
      
      {/* 5. Below-75 Alert Bar */}
      <div className="p-10 rounded-[40px] bg-gradient-to-r from-red-500 to-red-600 shadow-red-200 shadow-2xl flex items-center justify-between text-white animate-in zoom-in duration-500">
        <div className="flex items-center gap-8">
          <div className="w-20 h-20 rounded-[32px] bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
            <AlertCircle className="w-10 h-10 text-white" />
          </div>
          <div>
            <h4 className="text-2xl font-black tracking-tight leading-none mb-2">14 Students At Risk</h4>
            <p className="text-red-50 text-sm font-bold opacity-80">Attendance for these students has dropped below the threshold of 75%.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <Button className="h-14 px-10 rounded-2xl bg-white text-red-600 hover:bg-red-50 font-black uppercase tracking-widest text-xs shadow-soft border-none">
            Send Reminders All
          </Button>
          <Button variant="ghost" className="h-14 px-8 rounded-2xl text-white hover:bg-white/10 font-black uppercase tracking-widest text-xs border border-white/20">
            Export Risk List
          </Button>
        </div>
      </div>
    </div>
  );
};

const ReportStatCard = ({ label, value, trend, isUp, icon: Icon, color }: any) => (
  <Card className="p-8 border-none shadow-soft rounded-[32px] bg-white group hover:shadow-soft-lg transition-all duration-300">
    <div className="flex items-start justify-between mb-8">
      <div className="w-14 h-14 rounded-[22px] bg-bg-soft/50 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all duration-500 shadow-inner">
        <Icon className="w-6 h-6" />
      </div>
      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-[10px] shadow-sm ${isUp ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
        {isUp ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
        {trend}
      </div>
    </div>
    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">{label}</p>
    <h3 className={`text-2xl font-black tracking-tight leading-none ${color}`}>{value}</h3>
  </Card>
);
