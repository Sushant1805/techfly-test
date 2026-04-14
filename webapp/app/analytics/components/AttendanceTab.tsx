'use client';
import React, { useMemo, useState } from 'react';
import { 
  Calendar, CheckCircle, XCircle, Users, Bell, Download, 
  Search, ChevronRight, AlertCircle, Filter, TrendingUp,
  Activity, Star
} from 'lucide-react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, ScatterChart, Scatter, ZAxis, RadarChart, 
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Cell
} from 'recharts';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { GlobalFilter, attendanceAnalytics, dayPatternData } from '@/lib/analyticsData';

// --- Internal components ---

const HeatmapCalendar = () => {
  // Mock data for Jan-Apr calendar squares
  const months = ['Jan', 'Feb', 'Mar', 'Apr'];
  const getIntensity = (val: number) => {
    if (val >= 90) return 'bg-green-600';
    if (val >= 80) return 'bg-green-400';
    if (val >= 70) return 'bg-amber-400';
    if (val >= 60) return 'bg-orange-400';
    return 'bg-red-500';
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {months.map(month => (
          <div key={month} className="space-y-2">
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{month} 2026</div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 28 }).map((_, i) => {
                const val = 60 + Math.random() * 40;
                return (
                  <div 
                    key={i} 
                    className={`w-full aspect-square rounded-sm ${getIntensity(val)} opacity-80 hover:opacity-100 hover:scale-110 transition-all cursor-crosshair group relative`}
                  >
                     <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-20">
                        <div className="bg-gray-900 text-white text-[9px] font-black px-2 py-1 rounded shadow-xl whitespace-nowrap">
                          {Math.floor(val)}% Attendance
                        </div>
                     </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-4 pt-2 border-t border-gray-50">
        <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Rate Intensity:</div>
        <div className="flex gap-1 items-center">
           <div className="w-2.5 h-2.5 bg-red-500 rounded-sm" />
           <div className="w-2.5 h-2.5 bg-orange-400 rounded-sm" />
           <div className="w-2.5 h-2.5 bg-amber-400 rounded-sm" />
           <div className="w-2.5 h-2.5 bg-green-400 rounded-sm" />
           <div className="w-2.5 h-2.5 bg-green-600 rounded-sm" />
        </div>
        <div className="text-[9px] font-bold text-gray-400 uppercase ml-auto">Total: 96 Classes marked</div>
      </div>
    </div>
  );
};

export default function AttendanceTab({ filters }: { filters: GlobalFilter }) {
  const [selectedBatches, setSelectedBatches] = useState(['Batch A', 'Batch B', 'Batch C']);

  const summaryCards = [
    { label: 'Overall Rate', value: attendanceAnalytics.overallRate + '%', icon: Activity, color: 'bg-purple-100 text-purple-600' },
    { label: 'Best Day', value: attendanceAnalytics.bestDay, icon: Star, color: 'bg-amber-100 text-amber-600' },
    { label: 'Worst Day', value: attendanceAnalytics.worstDay, icon: AlertCircle, color: 'bg-red-100 text-red-600' },
    { label: 'Best Batch', value: attendanceAnalytics.bestBatch, icon: Users, color: 'bg-green-100 text-green-600' },
    { label: 'Below 75%', value: attendanceAnalytics.belowThresholdCount, icon: Bell, color: 'bg-pink-100 text-pink-600' },
  ];

  const weeklyTrendData = [
    { name: 'W1', overall: 85, batchA: 91, batchB: 82, batchC: 78 },
    { name: 'W2', overall: 87, batchA: 89, batchB: 84, batchC: 80 },
    { name: 'W3', overall: 84, batchA: 88, batchB: 81, batchC: 75 },
    { name: 'W4', overall: 88, batchA: 92, batchB: 86, batchC: 82 },
    { name: 'W5', overall: 86, batchA: 90, batchB: 83, batchC: 79 },
    { name: 'W6', overall: 90, batchA: 94, batchB: 88, batchC: 85 },
    { name: 'W7', overall: 88, batchA: 91, batchB: 85, batchC: 82 },
    { name: 'W8', overall: 89, batchA: 93, batchB: 87, batchC: 84 },
  ];

  const scatterData = Array.from({ length: 40 }).map((_, i) => ({
    attendance: 50 + Math.random() * 50,
    score: 40 + Math.random() * 60,
    id: i
  }));

  const radarData = [
    { subject: 'Mon', A: 91, B: 82, full: 100 },
    { subject: 'Tue', A: 86, B: 88, full: 100 },
    { subject: 'Wed', A: 89, B: 84, full: 100 },
    { subject: 'Thu', A: 84, B: 82, full: 100 },
    { subject: 'Fri', A: 88, B: 86, full: 100 },
    { subject: 'Sat', A: 74, B: 72, full: 100 },
  ];

  const absentees = [
    { name: 'Karan Verma', batch: 'Batch A', std: 'Std 10', rate: 42, missed: 29, last: '28 Mar 2026' },
    { name: 'Rahul Joshi', batch: 'Batch A', std: 'Std 10', rate: 38, missed: 31, last: '20 Mar 2026' },
    { name: 'Aman Dubey', batch: 'Batch C', std: 'Std 12', rate: 63, missed: 18, last: '5 Apr 2026' },
    { name: 'Vivek Nair', batch: 'Batch C', std: 'Std 12', rate: 73, missed: 12, last: '8 Apr 2026' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-700">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {summaryCards.map((card, i) => (
          <Card key={i} className="p-5 border-none shadow-sm flex items-center gap-4 hover:shadow-md transition-all">
            <div className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center`}>
              <card.icon size={22} />
            </div>
            <div>
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{card.label}</div>
              <div className="text-xl font-black text-gray-900">{card.value}</div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Section A: Monthly Attendance Trend */}
        <Card className="lg:col-span-2 p-6 border-none shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
            <h3 className="text-lg font-black text-gray-900">Weekly Attendance Trends</h3>
            <div className="flex items-center gap-3">
               {['Batch A', 'Batch B', 'Batch C'].map(batch => (
                 <label key={batch} className="flex items-center gap-1.5 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="accent-purple-600" 
                      checked={selectedBatches.includes(batch)}
                      onChange={(e) => {
                        if (e.target.checked) setSelectedBatches([...selectedBatches, batch]);
                        else setSelectedBatches(selectedBatches.filter(b => b !== batch));
                      }}
                    />
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">{batch}</span>
                 </label>
               ))}
            </div>
          </div>
          <div className="flex-1 h-[340px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyTrendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fontWeight: 'bold', fill: '#94A3B8' }}
                  dy={10}
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 'bold', fill: '#94A3B8' }} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="overall" stroke="#111827" strokeWidth={3} strokeDasharray="5 5" dot={false} name="Overall Average" />
                {selectedBatches.includes('Batch A') && <Line type="monotone" dataKey="batchA" stroke="#5E4E99" strokeWidth={3} dot={{ r: 4, fill: '#5E4E99' }} name="Batch A" />}
                {selectedBatches.includes('Batch B') && <Line type="monotone" dataKey="batchB" stroke="#10B981" strokeWidth={3} dot={{ r: 4, fill: '#10B981' }} name="Batch B" />}
                {selectedBatches.includes('Batch C') && <Line type="monotone" dataKey="batchC" stroke="#378ADD" strokeWidth={3} dot={{ r: 4, fill: '#378ADD' }} name="Batch C" />}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Section B: Day-wise Pattern */}
        <Card className="p-6 border-none shadow-sm">
          <h3 className="text-lg font-black text-gray-900 mb-6 font-mono lowercase tracking-tighter italic">Day-wise Distribution</h3>
          <div className="h-[340px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dayPatternData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fontWeight: 'black', fill: '#94A3B8' }}
                  dy={10}
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 'black', fill: '#94A3B8' }} domain={[0, 100]} hide />
                <Tooltip cursor={{ fill: '#F8FAFC' }} />
                <Bar dataKey="rate" radius={[4, 4, 0, 0]} barSize={28}>
                  {dayPatternData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.day === 'Sat' ? '#EF4444' : '#5E4E99'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-4 bg-red-50 rounded-xl border border-red-100 flex items-center gap-3">
            <AlertCircle className="text-red-500" size={18} />
            <p className="text-[11px] font-bold text-red-800 leading-snug">
              Saturday attendance is 14.4% lower than the weekly average. Consider shifting sessions.
            </p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section C: Attendance Heatmap Calendar */}
        <Card className="p-6 border-none shadow-sm">
          <div className="flex justify-between items-center mb-6">
             <h3 className="text-lg font-black text-gray-900">Attendance Intensity Map</h3>
             <Badge className="bg-purple-600 text-white font-black uppercase text-[9px] tracking-widest px-3 border-none">4 Months View</Badge>
          </div>
          <HeatmapCalendar />
        </Card>

        {/* Section E: Attendance vs Performance Correlation */}
        <Card className="p-6 border-none shadow-sm">
           <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-black text-gray-900 text-right w-full">Attendance vs Score Correlation</h3>
           </div>
           <div className="h-[280px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis type="number" dataKey="attendance" name="Attendance" unit="%" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold' }} />
                  <YAxis type="number" dataKey="score" name="Score" unit="%" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold' }} />
                  <ZAxis type="number" range={[60, 60]} />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter name="Students" data={scatterData} fill="#5E4E99" />
                </ScatterChart>
              </ResponsiveContainer>
              {/* Trend line drawn with absolute SVG */}
              <svg className="absolute inset-0 pointer-events-none w-full h-full p-[20px]" style={{ margin: '20px' }}>
                 <line x1="20%" y1="80%" x2="90%" y2="20%" stroke="#10B981" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />
              </svg>
           </div>
           <p className="mt-4 text-[10px] font-black uppercase tracking-widest text-center text-gray-400">
             Students with &gt;85% attendance score <span className="text-green-600">18.4% higher</span> on average
           </p>
        </Card>
      </div>

      {/* Section D: Chronic Absentees */}
      <Card className="border-none shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <h3 className="font-black text-gray-900 uppercase tracking-widest text-sm">Chronic Absentees</h3>
             <Badge variant="destructive" className="bg-red-500 text-white border-none font-black text-[9px] px-2">{absentees.length} Students</Badge>
          </div>
          <Button variant="outline" size="sm" className="h-8 gap-2 font-black text-[10px] uppercase tracking-wider text-purple-600 border-purple-200 hover:bg-purple-50">
             <Bell size={14} /> Notify All Parents
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Batch</th>
                <th className="px-6 py-4">Attendance</th>
                <th className="px-6 py-4">Missed</th>
                <th className="px-6 py-4">Last Present</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {absentees.map((st, i) => (
                <tr key={i} className="hover:bg-gray-50/70 transition-colors">
                  <td className="px-6 py-4 font-black">
                     <div className="text-sm text-gray-900">{st.name}</div>
                     <div className="text-[10px] text-gray-400 font-bold uppercase">{st.std}</div>
                  </td>
                  <td className="px-6 py-4">
                     <Badge className="bg-gray-100 text-gray-700 border-none font-bold text-[10px] px-2">{st.batch}</Badge>
                  </td>
                  <td className="px-6 py-4">
                     <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                           <div className="h-full bg-red-500" style={{ width: `${st.rate}%` }} />
                        </div>
                        <span className="text-xs font-black text-red-600">{st.rate}%</span>
                     </div>
                  </td>
                  <td className="px-6 py-4 font-black text-xs text-gray-900">{st.missed} days</td>
                  <td className="px-6 py-4 text-xs font-bold text-gray-500 italic">{st.last}</td>
                  <td className="px-6 py-4 text-right">
                     <Button variant="ghost" className="h-7 w-7 p-0 flex items-center justify-center rounded-lg hover:bg-purple-100 text-purple-600">
                        <Bell size={14} />
                     </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Section F: Batch Attendance Comparison (Radar) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 border-none shadow-sm flex flex-col items-center">
           <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6 self-start">Batch Strength Radar</h3>
           <div className="h-[300px] w-full">
             <ResponsiveContainer width="100%" height="100%">
               <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="#F1F5F9" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fontWeight: 'bold' }} />
                  <Radar name="Batch A" dataKey="A" stroke="#5E4E99" fill="#5E4E99" fillOpacity={0.6} />
                  <Radar name="Batch B" dataKey="B" stroke="#10B981" fill="#10B981" fillOpacity={0.4} />
                  <Legend />
               </RadarChart>
             </ResponsiveContainer>
           </div>
        </Card>
        
        <Card className="md:col-span-2 p-8 border-none shadow-sm bg-indigo-600 text-white flex flex-col justify-center relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-700">
              <Calendar size={180} />
           </div>
           <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                 <div className="p-2 bg-white/20 rounded-lg backdrop-blur-md">
                    <TrendingUp size={20} />
                 </div>
                 <h4 className="font-black uppercase tracking-widest text-indigo-100">Attendance Insight</h4>
              </div>
              <h2 className="text-3xl font-black mb-4 leading-tight">Retention in Batch A remains <br/>above 90% for 4 consecutive months.</h2>
              <p className="text-sm font-bold text-indigo-100/70 max-w-lg mb-8 uppercase tracking-tighter italic">"Consistent attendance directly correlates with the 12% higher test scores observed in Batch A compared to Batch E."</p>
              <Button className="bg-white text-indigo-600 hover:bg-indigo-50 font-black uppercase text-[11px] tracking-widest h-10 px-8 shadow-xl">
                 Download Detailed Log
              </Button>
           </div>
        </Card>
      </div>
    </div>
  );
}
