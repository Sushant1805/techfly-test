'use client';
import React, { useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend, LineChart, Line 
} from 'recharts';
import { FileText, Users, Star, Clock, Download, ChevronDown, Filter, AlertCircle } from 'lucide-react';
import { assignmentsMock, studentSubmissions } from '@/lib/mockData';

export default function AnalyticsView() {
  const stats = useMemo(() => {
    const total = assignmentsMock.length;
    const graded = assignmentsMock.filter(a => a.status === 'Graded');
    const avgScore = graded.length > 0 
      ? (graded.reduce((acc, a) => acc + (a.averageScore || 0), 0) / graded.length).toFixed(1) 
      : '0';
    
    const submissionRate = (assignmentsMock.reduce((acc, a) => acc + (a.submittedCount / a.totalStudents), 0) / total * 100).toFixed(0);
    const onTimeRate = (studentSubmissions.filter(s => s.status !== 'Missing' && !s.isLate).length / studentSubmissions.filter(s => s.status !== 'Missing').length * 100).toFixed(0);

    return { total, avgSubRate: submissionRate, avgScore, onTimeRate };
  }, []);

  const submissionData = useMemo(() => {
    return assignmentsMock.map(a => ({
      name: a.title,
      rate: Math.round((a.submittedCount / a.totalStudents) * 100),
      batch: a.batchName,
      count: `${a.submittedCount}/${a.totalStudents}`
    })).sort((a, b) => b.rate - a.rate);
  }, []);

  const typeData = useMemo(() => {
    const counts: Record<string, number> = {};
    assignmentsMock.forEach(a => {
      counts[a.type] = (counts[a.type] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, []);

  const scoreDistribution = [
    { range: '0-24%', count: 2, color: '#ef4444' },
    { range: '25-49%', count: 5, color: '#f97316' },
    { range: '50-74%', count: 12, color: '#f59e0b' },
    { range: '75-89%', count: 25, color: '#84cc16' },
    { range: '90-100%', count: 8, color: '#22c55e' },
  ];

  const TYPE_COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#f97316', '#06b6d4'];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-4">
          <select className="text-sm border-gray-200 rounded-lg h-10 px-3 focus:ring-purple-500">
            <option>All Assignments</option>
            {assignmentsMock.map(a => <option key={a.id}>{a.title}</option>)}
          </select>
          <select className="text-sm border-gray-200 rounded-lg h-10 px-3 focus:ring-purple-500">
            <option>All Batches</option>
            <option>Batch A</option>
            <option>Batch B</option>
            <option>Batch C</option>
          </select>
        </div>
        <Button variant="outline" className="h-10 font-bold gap-2">
          <Download size={18} />
          Export Report
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Assignments Created', value: stats.total, icon: <FileText size={24} />, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Avg Submission Rate', value: `${stats.avgSubRate}%`, icon: <Users size={24} />, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Avg Score (Graded)', value: stats.avgScore, icon: <Star size={24} />, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'On-Time Rate', value: `${stats.onTimeRate}%`, icon: <Clock size={24} />, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((stat, i) => (
          <Card key={i} className="p-6 border-none shadow-sm group hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</div>
                <div className="text-3xl font-black text-gray-900">{stat.value}</div>
              </div>
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Submission Rate by Assignment */}
        <Card className="lg:col-span-2 p-6 border-none shadow-sm">
          <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-2">
            Submission Rate by Assignment
            <Badge variant="secondary" className="text-[10px] ml-2 font-bold uppercase tracking-tighter">ALL ACTIVE</Badge>
          </h3>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={submissionData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  width={150} 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fontWeight: 'bold', fill: '#64748b' }}
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white p-3 rounded-xl shadow-xl border border-gray-100">
                          <div className="text-xs font-black text-gray-900 mb-1">{data.name}</div>
                          <div className="text-[10px] font-bold text-purple-600 uppercase mb-2">{data.batch}</div>
                          <div className="flex items-center justify-between gap-6">
                            <span className="text-xs font-medium text-gray-500">Submitted:</span>
                            <span className="text-xs font-black text-gray-900">{data.count}</span>
                          </div>
                          <div className="flex items-center justify-between gap-6 mt-1">
                            <span className="text-xs font-medium text-gray-500">Rate:</span>
                            <span className="text-xs font-black text-green-600">{data.rate}%</span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar 
                  dataKey="rate" 
                  radius={[0, 4, 4, 0]} 
                  barSize={24}
                >
                  {submissionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.rate >= 80 ? '#22c55e' : entry.rate >= 50 ? '#f59e0b' : '#ef4444'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Type Breakdown */}
        <Card className="p-6 border-none shadow-sm">
          <h3 className="text-lg font-black text-gray-900 mb-6">Type Breakdown</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={typeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {typeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={TYPE_COLORS[index % TYPE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend 
                  verticalAlign="bottom" 
                  iconType="circle"
                  formatter={(value) => <span className="text-xs font-bold text-gray-600 uppercase tracking-tighter ml-1">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 space-y-3 pt-4 border-t border-gray-50">
            {typeData.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: TYPE_COLORS[i % TYPE_COLORS.length] }} />
                  <span className="text-xs font-bold text-gray-500 uppercase">{item.name}</span>
                </div>
                <span className="text-xs font-black text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Score Distribution */}
        <Card className="p-6 border-none shadow-sm">
          <h3 className="text-lg font-black text-gray-900 mb-6">Score Distribution (Graded Assignments)</h3>
          <div className="h-[300px] w-full font-mono">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scoreDistribution}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="range" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 'bold', fill: '#94a3b8' }} 
                />
                <YAxis hide />
                <Tooltip cursor={{ fill: '#f8fafc' }} />
                <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={40}>
                  {scoreDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Load Analysis Table */}
        <Card className="p-6 border-none shadow-sm overflow-hidden">
          <h3 className="text-lg font-black text-gray-900 mb-6">Subject Load Analysis</h3>
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-50 text-gray-400 font-black uppercase tracking-widest text-[10px]">
                <th className="px-4 py-3 text-left">Subject</th>
                <th className="px-4 py-3 text-center">Batch A</th>
                <th className="px-4 py-3 text-center">Batch B</th>
                <th className="px-4 py-3 text-center">Batch C</th>
                <th className="px-4 py-3 text-center">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[
                { s: 'Maths', a: 3, b: 2, c: 2 },
                { s: 'Physics', a: 1, b: 2, c: 2 },
                { s: 'Chemistry', a: 1, b: 1, c: 2 },
                { s: 'Biology', a: 0, b: 1, c: 1 },
                { s: 'English', a: 1, b: 1, c: 0 },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors capitalize">
                  <td className="px-4 py-4 font-black text-gray-900">{row.s}</td>
                  <td className={`px-4 py-4 text-center font-bold ${row.a > 2 ? 'text-red-500 bg-red-50' : 'text-gray-500'}`}>{row.a}</td>
                  <td className={`px-4 py-4 text-center font-bold ${row.b > 2 ? 'text-red-500 bg-red-50' : 'text-gray-500'}`}>{row.b}</td>
                  <td className={`px-4 py-4 text-center font-bold ${row.c > 2 ? 'text-red-500 bg-red-50' : 'text-gray-500'}`}>{row.c}</td>
                  <td className="px-4 py-4 text-center font-black text-purple-600">{row.a + row.b + row.c}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-tight italic">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            Heavy load indicator ( &gt; 2 assignments/month )
          </div>
        </Card>
      </div>

      {/* Engagement Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 border-none shadow-sm h-fit">
          <h3 className="text-lg font-black text-gray-900 mb-6">Most Consistent Students</h3>
          <div className="space-y-4">
            {[
              { name: 'Pooja Sharma', batch: 'Batch D', rate: '100%', rank: '🥇' },
              { name: 'Ananya Singh', batch: 'Batch B', rate: '96%', rank: '🥈' },
              { name: 'Nisha Rao', batch: 'Batch B', rate: '94%', rank: '🥉' },
            ].map((stu, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="text-xl">{stu.rank}</div>
                  <div>
                    <div className="text-sm font-black text-gray-900">{stu.name}</div>
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{stu.batch}</div>
                  </div>
                </div>
                <div className="text-sm font-black text-green-600 bg-green-50 px-3 py-1 rounded-lg border border-green-100">{stu.rate}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 border-none shadow-sm h-fit">
          <h3 className="text-lg font-black text-red-600 mb-6">Students with Most Missing</h3>
          <div className="space-y-4">
            {[
              { name: 'Karan Verma', batch: 'Batch A', missing: 5 },
              { name: 'Rahul Joshi', batch: 'Batch A', missing: 5 },
              { name: 'Aman Dubey', batch: 'Batch C', missing: 4 },
            ].map((stu, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-red-50/50 border border-red-100">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-red-100 text-red-600 rounded flex items-center justify-center">
                    <AlertCircle size={16} />
                  </div>
                  <div>
                    <div className="text-sm font-black text-gray-900">{stu.name}</div>
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{stu.batch}</div>
                  </div>
                </div>
                <div className="text-sm font-black text-red-600 underline cursor-pointer">{stu.missing} Assignments Missing</div>
              </div>
            ))}
          </div>
          <Button className="w-full mt-6 bg-red-600 hover:bg-red-700 h-11 font-black text-xs uppercase tracking-widest shadow-red-100 shadow-xl">
            Send Reminder to All
          </Button>
        </Card>
      </div>
    </div>
  );
}
