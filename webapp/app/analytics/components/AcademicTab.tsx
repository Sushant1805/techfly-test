'use client';
import React, { useMemo, useState } from 'react';
import { 
  FileText, Star, CheckCircle, Send, Activity, TrendingUp, 
  HelpCircle, User, AlertTriangle, ArrowUp, ArrowDown, Download
} from 'lucide-react';
import { 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, AreaChart, Area, Cell, Legend
} from 'recharts';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { GlobalFilter, academicAnalytics, subjectStats, subjectDifficultyData } from '@/lib/analyticsData';

// --- Internal components ---

const AssignmentHeatmap = () => {
  // Mock data for 20 students x 16 assignments
  const students = Array.from({ length: 15 });
  const assignments = Array.from({ length: 16 });

  return (
    <div className="overflow-x-auto pb-4 scrollbar-hide">
      <div className="min-w-[600px] space-y-2">
        <div className="flex gap-1 ml-24">
           {assignments.map((_, j) => (
             <div key={j} className="w-5 h-5 flex items-center justify-center text-[8px] font-black text-gray-400">{j+1}</div>
           ))}
        </div>
        {students.map((_, i) => (
          <div key={i} className="flex gap-1 items-center">
            <div className="w-24 text-[9px] font-black text-gray-400 uppercase truncate">Student {i+1}</div>
            {assignments.map((_, j) => {
              const rand = Math.random() * 100;
              const color = rand > 40 ? 'bg-green-600' : rand > 20 ? 'bg-green-300' : rand > 5 ? 'bg-red-500' : 'bg-gray-100';
              return (
                <div 
                  key={j} 
                  className={`w-5 h-5 rounded-[2px] ${color} transition-all hover:scale-125 cursor-help group relative`}
                >
                   <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-20">
                      <div className="bg-gray-900 text-white text-[8px] font-black px-2 py-1 rounded shadow-xl whitespace-nowrap">
                        ASN {j+1}: {rand > 20 ? 'Submitted' : 'Missing'}
                      </div>
                   </div>
                </div>
              );
            })}
          </div>
        ))}
        <div className="flex items-center gap-4 pt-4 border-t border-gray-50 text-[9px] font-black text-gray-400 uppercase tracking-widest">
           <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 bg-green-600 rounded-sm" /> On Time</div>
           <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 bg-green-300 rounded-sm" /> Late</div>
           <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 bg-red-500 rounded-sm" /> Missing</div>
           <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 bg-gray-100 rounded-sm" /> Not Assigned</div>
        </div>
      </div>
    </div>
  );
};

export default function AcademicTab({ filters }: { filters: GlobalFilter }) {
  const summaryCards = [
    { label: 'Tests Conducted', value: academicAnalytics.testsConducted, icon: FileText, color: 'bg-indigo-100 text-indigo-600' },
    { label: 'Avg Score', value: academicAnalytics.avgScore + '%', icon: Star, color: 'bg-amber-100 text-amber-600' },
    { label: 'Pass Rate', value: academicAnalytics.passRate + '%', icon: CheckCircle, color: 'bg-green-100 text-green-600' },
    { label: 'Assignments', value: academicAnalytics.assignmentsCount, icon: Send, color: 'bg-purple-100 text-purple-600' },
    { label: 'Submission Rate', value: academicAnalytics.submissionRate + '%', icon: Activity, color: 'bg-blue-100 text-blue-600' },
  ];

  const radarData = subjectStats.map(s => ({
    subject: s.subject,
    score: s.score,
    full: 100
  }));

  const trendData = [
    { name: '15 Jan', Maths: 65, Physics: 70, Chem: 55, Bio: 75, Eng: 80 },
    { name: '01 Feb', Maths: 68, Physics: 72, Chem: 58, Bio: 79, Eng: 84 },
    { name: '20 Feb', Maths: 72, Physics: 68, Chem: 62, Bio: 77, Eng: 82 },
    { name: '10 Mar', Maths: 70, Physics: 74, Chem: 60, Bio: 81, Eng: 85 },
    { name: '25 Mar', Maths: 75, Physics: 71, Chem: 63, Bio: 78, Eng: 87 },
    { name: '11 Apr', Maths: 72, Physics: 68, Chem: 61, Bio: 77, Eng: 84 },
  ];

  const batchAcademicData = [
    { batch: 'Batch A', Maths: 76, Physics: 74, Chem: 62, Bio: null, Eng: 85, overall: 74.3 },
    { batch: 'Batch B', Maths: 68, Physics: 72, Chem: 56, Bio: 79, Eng: 83, overall: 71.6 },
    { batch: 'Batch C', Maths: null, Physics: 69, Chem: 63, Bio: 71, Eng: null, overall: 67.7 },
    { batch: 'Batch D', Maths: null, Physics: null, Chem: null, Bio: null, Eng: 82, overall: 82.0 },
    { batch: 'Batch E', Maths: 70, Physics: null, Chem: null, Bio: null, Eng: null, overall: 70.0 },
  ];

  const bellCurveData = [
    { score: '0%', count: 2 },
    { score: '10%', count: 5 },
    { score: '20%', count: 12 },
    { score: '30%', count: 18 },
    { score: '40%', count: 26 },
    { score: 'Pass', count: 48 }, // 50%
    { score: '60%', count: 72 },
    { score: '70%', count: 72 },
    { score: '80%', count: 48 },
    { score: '90%', count: 22 },
    { score: '100%', count: 10 },
  ];

  const topStudents = [
    { rank: 1, name: 'Pooja Sharma', batch: 'Batch D', avg: 86, tests: 5, trend: 'up' },
    { rank: 2, name: 'Ananya Singh', batch: 'Batch B', avg: 84, tests: 6, trend: 'stable' },
    { rank: 3, name: 'Nisha Rao', batch: 'Batch B', avg: 83, tests: 5, trend: 'up' },
    { rank: 4, name: 'Simran Kaur', batch: 'Batch B', avg: 82, tests: 6, trend: 'stable' },
    { rank: 5, name: 'Tanya Mishra', batch: 'Batch D', avg: 80, tests: 4, trend: 'up' },
  ];

  const bottomStudents = [
    { name: 'Karan Verma', batch: 'Batch A', avg: 44, tests: 3, trend: 'down' },
    { name: 'Rahul Joshi', batch: 'Batch A', avg: 40, tests: 3, trend: 'down' },
    { name: 'Aman Dubey', batch: 'Batch C', avg: 52, tests: 4, trend: 'down' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
      {/* Summary Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {summaryCards.map((card, i) => (
          <Card key={i} className="p-5 border-none shadow-sm flex items-center gap-4">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section A: Subject Performance Radar */}
        <Card className="p-6 border-none shadow-sm flex flex-col items-center">
          <div className="flex justify-between items-center w-full mb-6">
             <h3 className="text-lg font-black text-gray-900">Subject Strength Radar</h3>
             <button className="text-[10px] font-black text-purple-600 hover:scale-110 transition-transform"><TrendingUp size={16}/></button>
          </div>
          <div className="h-[340px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#F1F5F9" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fontWeight: 'black', fill: '#94A3B8' }} />
                <Radar name="Average Score" dataKey="score" stroke="#5E4E99" fill="#5E4E99" fillOpacity={0.6} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
             {subjectStats.map((s, i) => (
               <div key={i} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                  <span className="text-[10px] font-black text-gray-500 uppercase">{s.subject}: {s.score}%</span>
               </div>
             ))}
          </div>
        </Card>

        {/* Section B: Test Score Trend */}
        <Card className="p-6 border-none shadow-sm flex flex-col">
          <h3 className="text-lg font-black text-gray-900 mb-8 lowercase tracking-tighter italic">Score Trends Over Time</h3>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold' }} dy={10} />
                <YAxis hide domain={[0, 100]} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Legend iconType="circle" />
                <Line type="monotone" dataKey="Maths" stroke="#5E4E99" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="Physics" stroke="#1D9E75" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="Chem" stroke="#D85A30" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="Bio" stroke="#378ADD" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Section C: Batch Academic Comparison */}
      <Card className="border-none shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 bg-gray-50/30 flex justify-between items-center">
           <div className="flex items-center gap-3 font-black text-gray-900 uppercase tracking-widest text-sm">
              <TrendingUp size={18} className="text-purple-600" />
              Batch Performance Ledger
           </div>
           <Button variant="outline" size="sm" className="h-8 font-black text-[10px] uppercase tracking-widest gap-2 bg-white border-gray-200">
              <Download size={14} /> Full Export
           </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] bg-white">
                <th className="px-6 py-4">Batch Cluster</th>
                <th className="px-4 py-4">Maths</th>
                <th className="px-4 py-4">Physics</th>
                <th className="px-4 py-4">Chem</th>
                <th className="px-4 py-4">Bio</th>
                <th className="px-4 py-4">Eng</th>
                <th className="px-6 py-4 text-right">Overall Avg</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {batchAcademicData.map((row, i) => (
                <tr key={i} className="hover:bg-purple-50/30 transition-colors">
                  <td className="px-6 py-4 font-black text-gray-900 uppercase text-xs tracking-tight">{row.batch}</td>
                  {[row.Maths, row.Physics, row.Chem, row.Bio, row.Eng].map((val, idx) => (
                    <td key={idx} className="px-4 py-4">
                      {val ? (
                        <div className="flex flex-col gap-1">
                           <span className={`text-xs font-black ${val > 75 ? 'text-green-600' : val > 65 ? 'text-gray-900' : 'text-red-500'}`}>{val}%</span>
                           <div className="w-8 h-1 bg-gray-100 rounded-full overflow-hidden">
                              <div className={`h-full ${val > 75 ? 'bg-green-500' : 'bg-gray-300'}`} style={{ width: `${val}%` }} />
                           </div>
                        </div>
                      ) : <span className="text-gray-200">—</span>}
                    </td>
                  ))}
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm font-black text-purple-600">{row.overall}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section D: Performance Bell Curve */}
        <Card className="p-6 border-none shadow-sm flex flex-col">
           <h3 className="text-lg font-black text-gray-900 mb-6">Score Distribution (Bell Curve)</h3>
           <div className="flex-1 min-h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={bellCurveData}>
                    <defs>
                       <linearGradient id="colorCurve" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                       </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                    <XAxis dataKey="score" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 'bold' }} />
                    <YAxis hide />
                    <Tooltip />
                    <Area type="monotone" dataKey="count" stroke="#8B5CF6" strokeWidth={4} fillOpacity={1} fill="url(#colorCurve)" />
                 </AreaChart>
              </ResponsiveContainer>
           </div>
           <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-100 text-center">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Performance Insight:</span>
              <p className="text-xs font-bold text-gray-600 mt-1 italic">"Most students (72%) fall within the 60–80% scoring range, indicating a healthy normal distribution."</p>
           </div>
        </Card>

        {/* Section G: Subject Difficulty Analysis */}
        <Card className="p-6 border-none shadow-sm">
           <h3 className="text-lg font-black text-gray-900 mb-6">Subject Difficulty Analysis</h3>
           <div className="space-y-4">
              {subjectDifficultyData.map((sub, i) => (
                <div key={i} className="space-y-2">
                   <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                      <span className="text-gray-500">{sub.subject}</span>
                      <div className="flex gap-2">
                         <span className="text-red-500">{sub.failRate}% Fail Rate</span>
                         {sub.label && <Badge className="bg-red-500 text-white border-none font-black text-[8px] h-4">{sub.label}</Badge>}
                      </div>
                   </div>
                   <div className="w-full h-3 bg-gray-50 rounded-full overflow-hidden border border-gray-100 flex shadow-inner">
                      <div 
                        className={`h-full transition-all duration-1000 ${i === 0 ? 'bg-red-500' : i < 3 ? 'bg-orange-400' : 'bg-green-500'}`} 
                        style={{ width: `${sub.failRate}%` }} 
                      />
                   </div>
                </div>
              ))}
           </div>
           <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="p-4 bg-red-50 rounded-xl border border-red-100 text-center">
                 <div className="text-[9px] font-black text-red-400 uppercase tracking-widest mb-1">Pass Threshold</div>
                 <div className="text-xl font-black text-red-600">40%</div>
              </div>
              <div className="p-4 bg-green-50 rounded-xl border border-green-100 text-center">
                 <div className="text-[9px] font-black text-green-400 uppercase tracking-widest mb-1">Highest Pass Rate</div>
                 <div className="text-xl font-black text-green-600">92%</div>
              </div>
           </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top 5 Students List */}
        <Card className="border-none shadow-sm overflow-hidden flex flex-col">
           <div className="p-6 border-b border-gray-50 flex items-center justify-between">
              <h3 className="font-black text-gray-900 uppercase tracking-widest text-sm flex items-center gap-2">
                 <Star className="text-amber-500 fill-amber-500" size={18} /> Elite Performers
              </h3>
              <Badge className="bg-amber-100 text-amber-700 border-none font-black text-[9px] uppercase tracking-widest">Top 5 Students</Badge>
           </div>
           <div className="divide-y divide-gray-50">
              {topStudents.map((st, i) => (
                <div key={i} className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs ${i === 0 ? 'bg-amber-100 text-amber-600' : 'bg-gray-100 text-gray-500'}`}>{st.rank}</div>
                   <div className="flex-1">
                      <div className="text-sm font-black text-gray-900 uppercase tracking-tight">{st.name}</div>
                      <div className="text-[10px] font-bold text-gray-400 uppercase">{st.batch}</div>
                   </div>
                   <div className="text-right">
                      <div className="text-lg font-black text-gray-900">{st.avg}%</div>
                      <div className="text-[9px] font-black text-green-500 uppercase flex items-center justify-end gap-1">
                         {st.trend === 'up' && <ArrowUp size={10} />} IMPROVING
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </Card>

        {/* Needs Attention List */}
        <Card className="border-none shadow-sm overflow-hidden flex flex-col">
           <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-red-50/30">
              <h3 className="font-black text-gray-900 uppercase tracking-widest text-sm flex items-center gap-2">
                 <AlertTriangle className="text-red-500" size={18} /> Critical Intervention
              </h3>
              <Badge className="bg-red-500 text-white border-none font-black text-[9px] uppercase tracking-widest">Bottom 3 Students</Badge>
           </div>
           <div className="divide-y divide-gray-50 flex-1">
              {bottomStudents.map((st, i) => (
                <div key={i} className="p-4 flex items-center gap-4 group">
                   <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-black group-hover:bg-red-500 group-hover:text-white transition-colors">
                      <User size={20} />
                   </div>
                   <div className="flex-1">
                      <div className="text-sm font-black text-gray-900 uppercase tracking-tight">{st.name}</div>
                      <div className="text-[10px] font-bold text-gray-400 uppercase">{st.batch}</div>
                   </div>
                   <div className="text-right flex flex-col items-end gap-1">
                      <div className="text-lg font-black text-red-600">{st.avg}%</div>
                      <Button variant="outline" size="sm" className="h-7 text-[9px] font-black uppercase tracking-widest border-red-200 text-red-600 hover:bg-red-50">Notify Parent</Button>
                   </div>
                </div>
              ))}
           </div>
           <div className="p-4 bg-white border-t border-gray-50 text-center">
              <p className="text-[10px] font-bold text-gray-400 leading-snug">Interventions are flagged for students scoring below the 50% percentile across multiple tests.</p>
           </div>
        </Card>
      </div>

      {/* Assignment Heatmap Section */}
      <Card className="p-8 border-none shadow-sm">
         <div className="flex justify-between items-center mb-10">
            <div>
               <h3 className="text-lg font-black text-gray-900 font-serif">Submission Heatmap</h3>
               <p className="text-[11px] font-black text-gray-400 uppercase tracking-tighter mt-1">Assignments tracking logic applied for all batches</p>
            </div>
            <div className="flex gap-3">
               <button className="flex flex-col items-center group">
                  <div className="text-2xl font-black text-gray-900 group-hover:text-purple-600 transition-colors">74%</div>
                  <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Global Submission</div>
               </button>
               <div className="w-px h-10 bg-gray-100" />
               <button className="flex flex-col items-center group">
                  <div className="text-2xl font-black text-gray-900 group-hover:text-green-600 transition-colors">9.2%</div>
                  <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Late Rate</div>
               </button>
            </div>
         </div>
         <AssignmentHeatmap />
      </Card>
    </div>
  );
}
