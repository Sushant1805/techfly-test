'use client';
import React, { useMemo } from 'react';
import { 
  Users, LayoutGrid, Calendar, CreditCard, FileText, Send, 
  ArrowUpRight, ArrowDownRight, Minus, Info, TrendingUp, AlertTriangle, Lightbulb 
} from 'lucide-react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, ComposedChart, Cell, PieChart, Pie
} from 'recharts';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { 
  GlobalFilter, getKpiData, monthlyTrends, studentGrowthData, 
  subjectStats, instituteHealth, topBatches, getInsights 
} from '@/lib/analyticsData';

// --- Internal Helper Components ---

const Sparkline = ({ data, color }: { data: number[], color: string }) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const width = 100;
  const height = 30;
  
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
};

const RingProgress = ({ percent, color, size = 120 }: { percent: number, color: string, size?: number }) => {
  const radius = (size - 10) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          className="text-gray-100"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          style={{ strokeDashoffset: offset }}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-black text-gray-900">{percent}%</span>
      </div>
    </div>
  );
};

// --- Main Tab Component ---

export default function OverviewTab({ filters }: { filters: GlobalFilter }) {
  const kpis = useMemo(() => getKpiData(filters), [filters]);
  const insights = useMemo(() => getInsights(filters), [filters]);

  const FEE_STATUS_DATA = [
    { name: 'Paid', value: 78, color: '#10B981', amount: '₹1,47,420' },
    { name: 'Partial', value: 8, color: '#F59E0B', amount: '₹15,120' },
    { name: 'Pending', value: 10, color: '#EF4444', amount: '₹18,900' },
    { name: 'Waived', value: 4, color: '#94A3B8', amount: '₹7,560' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Row 1: KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.id} className="p-5 border-none shadow-sm group hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-3">
              <div className={`p-2.5 rounded-xl ${kpi.iconBgColor} group-hover:scale-110 transition-transform`}>
                {kpi.id === 'students' && <Users size={20} />}
                {kpi.id === 'batches' && <LayoutGrid size={20} />}
                {kpi.id === 'attendance' && <Calendar size={20} />}
                {kpi.id === 'revenue' && <CreditCard size={20} />}
                {kpi.id === 'tests' && <FileText size={20} />}
                {kpi.id === 'assignments' && <Send size={20} />}
              </div>
              <Sparkline data={kpi.sparklineData} color={kpi.changeType === 'increase' ? '#10B981' : kpi.changeType === 'decrease' ? '#EF4444' : '#94A3B8'} />
            </div>
            <div className="space-y-1">
              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{kpi.label}</div>
              <div className="text-2xl font-black text-gray-900">{kpi.value}</div>
              <div className="flex items-center gap-1.5">
                {kpi.changeType === 'increase' && <ArrowUpRight size={14} className="text-green-500" />}
                {kpi.changeType === 'decrease' && <ArrowDownRight size={14} className="text-red-500" />}
                {kpi.changeType === 'neutral' && <Minus size={14} className="text-gray-400" />}
                <span className={`text-[10px] font-bold uppercase ${
                  kpi.changeType === 'increase' ? 'text-green-500' : 
                  kpi.changeType === 'decrease' ? 'text-red-500' : 'text-gray-400'
                }`}>
                  {kpi.changeType !== 'neutral' ? `${kpi.change}%` : ''} {kpi.changeLabel}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Row 2: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 border-none shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-black text-gray-900">Student Enrollment Trend</h3>
            <div className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">MoM Growth: +10.1%</div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={studentGrowthData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fontWeight: 'bold', fill: '#94A3B8' }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-3 rounded-xl shadow-xl border border-gray-100 animate-in zoom-in-95">
                          <div className="text-xs font-black text-gray-400 uppercase mb-1">{payload[0].payload.month}</div>
                          <div className="text-lg font-black text-purple-600">{payload[0].value} Students</div>
                          <div className="text-[10px] font-bold text-green-500">+12 this month</div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="students" 
                  stroke="#5E4E99" 
                  strokeWidth={4} 
                  dot={{ r: 6, fill: '#5E4E99', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 8, strokeWidth: 0, fill: '#5E4E99' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 border-none shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-black text-gray-900">Monthly Fee Collection</h3>
            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-400">
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-purple-600 rounded-sm" /> Actual</div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-gray-200 rounded-sm border border-dashed border-gray-400" /> Target</div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis 
                  dataKey="shortMonth" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fontWeight: 'bold', fill: '#94A3B8' }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: '#F8FAFC' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      const pct = ((data.revenue / data.target) * 100).toFixed(1);
                      return (
                        <div className="bg-white p-3 rounded-xl shadow-xl border border-gray-100">
                          <div className="text-xs font-black text-gray-400 uppercase mb-1">{data.month}</div>
                          <div className="space-y-1">
                            <div className="flex justify-between gap-4">
                              <span className="text-xs font-medium text-gray-500">Collected:</span>
                              <span className="text-xs font-black text-gray-900">₹{data.revenue.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between gap-4">
                              <span className="text-xs font-medium text-gray-500">Target:</span>
                              <span className="text-xs font-black text-gray-400">₹{data.target.toLocaleString()}</span>
                            </div>
                            <div className="pt-1 mt-1 border-t border-gray-50 flex justify-between gap-4">
                              <span className="text-xs font-bold text-gray-900">Achievement:</span>
                              <span className="text-xs font-black text-purple-600">{pct}%</span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="revenue" fill="#5E4E99" radius={[4, 4, 0, 0]} barSize={40} />
                <Line 
                  type="stepAfter" 
                  dataKey="target" 
                  stroke="#94A3B8" 
                  strokeWidth={2} 
                  strokeDasharray="5 5"
                  dot={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Row 3: Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Attendance Snapshot */}
        <Card className="p-6 border-none shadow-sm flex flex-col items-center">
          <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6 self-start">Attendance Snapshot</h3>
          <RingProgress percent={88.4} color="#5E4E99" />
          <div className="mt-4 text-center">
            <div className="text-sm font-bold text-gray-900">302 students present avg.</div>
            <div className="text-[10px] font-black text-green-500 uppercase">+2.1% VS LAST MONTH</div>
          </div>
          <div className="mt-8 w-full flex justify-between gap-1 h-12 items-end">
            {[78, 82, 91, 85, 88, 74].map((v, i) => (
              <div key={i} className="flex-1 space-y-1 group">
                <div className="w-full bg-purple-50 group-hover:bg-purple-100 rounded-sm relative" style={{ height: `${v}%` }}>
                  {i === 2 && <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-purple-600 rounded-full" />}
                </div>
                <div className="text-[8px] font-bold text-gray-400 text-center">{'MTWTFS'[i]}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Fee Collection Status */}
        <Card className="p-6 border-none shadow-sm flex flex-col items-center">
          <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6 self-start">April Collection Status</h3>
          <div className="relative w-40 h-40">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={FEE_STATUS_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {FEE_STATUS_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs font-bold text-gray-400 uppercase">April</span>
              <span className="text-xl font-black text-gray-900">₹1.89L</span>
            </div>
          </div>
          <div className="mt-6 w-full space-y-2">
            {FEE_STATUS_DATA.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="font-bold text-gray-500 uppercase">{item.name}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-black text-gray-900">{item.amount}</span>
                  <span className="text-gray-400">({item.value}%)</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Academic Performance */}
        <Card className="p-6 border-none shadow-sm">
          <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-2">Avg. Test Score</h3>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-4xl font-black text-gray-900">74.2%</span>
            <span className="text-xs font-bold text-green-500 uppercase">↑ 1.4%</span>
          </div>
          <div className="text-xs font-medium text-gray-500 mb-6">Across 6 tests this month</div>
          
          <div className="space-y-4">
            {subjectStats.map((sub, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-wider">
                  <span className="text-gray-500">{sub.subject}</span>
                  <span className="text-gray-900">{sub.score}%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${sub.score}%`, backgroundColor: sub.color }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Row 4: Health Score */}
      <Card className="p-8 border-none shadow-sm bg-gradient-to-br from-white to-purple-50/30 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <TrendingUp size={200} />
        </div>
        
        <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-32 h-32 rounded-full bg-white shadow-xl flex flex-col items-center justify-center border-4 border-purple-100">
              <span className="text-4xl font-black text-purple-600">{instituteHealth.overall}</span>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">out of 100</span>
            </div>
            <div className="mt-2">
              <div className="text-xl font-black text-gray-900">{instituteHealth.grade}</div>
              <div className="text-[10px] font-black text-gray-400 bg-white px-3 py-1 rounded-full border border-gray-100 uppercase tracking-widest mt-1">Health Score</div>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 w-full">
            {instituteHealth.components.map((comp, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-gray-600 uppercase tracking-tight">{comp.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-black text-gray-900">{comp.value}</span>
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs ${
                      comp.score >= 80 ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'
                    }`}>
                      {comp.grade}
                    </span>
                  </div>
                </div>
                <div className="w-full h-2 bg-white rounded-full overflow-hidden border border-gray-100">
                  <div className="h-full bg-purple-600 rounded-full" style={{ width: `${comp.score}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-xs w-full bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white">
            <div className="flex items-center gap-2 text-purple-600 mb-3">
              <Lightbulb size={20} />
              <h4 className="text-sm font-black uppercase tracking-widest">Global Insight</h4>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed font-medium">
              "{instituteHealth.insight}"
            </p>
          </div>
        </div>
      </Card>

      {/* Row 5: Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12">
        {/* Top Performing Batches */}
        <Card className="border-none shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h3 className="font-black text-gray-900 uppercase tracking-widest text-sm">Top Performing Batches</h3>
            <button className="text-[10px] font-black text-purple-600 hover:underline uppercase tracking-widest">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] bg-gray-50/50">
                  <th className="px-6 py-4">Rank</th>
                  <th className="px-2 py-4">Batch</th>
                  <th className="px-4 py-4">Attendance</th>
                  <th className="px-4 py-4">Score</th>
                  <th className="px-4 py-4">Fee%</th>
                  <th className="px-6 py-4 text-right">Performance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {topBatches.map((batch, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center font-black text-xs ${i === 0 ? 'bg-amber-100 text-amber-600' : 'bg-gray-100 text-gray-500'}`}>
                        {i + 1}
                      </div>
                    </td>
                    <td className="px-2 py-4">
                      <div className="font-black text-gray-900">{batch.name}</div>
                      <div className="text-[10px] font-bold text-gray-400 uppercase">{batch.standard}</div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-xs font-black text-gray-700">{batch.attendance}%</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-xs font-black text-gray-700">{batch.avgScore}%</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-xs font-black text-gray-700">{batch.feeCollection}%</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {batch.insight ? (
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 border-yellow-200">⭐ {batch.insight}</Badge>
                      ) : (
                        <div className="flex justify-end gap-0.5">
                          {[1, 2, 3, 4].map(s => <div key={s} className="w-1.5 h-1.5 rounded-full bg-purple-500" />)}
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Quick Insights */}
        <Card className="border-none shadow-sm flex flex-col">
          <div className="p-6 border-b border-gray-50 flex items-center gap-2">
            <TrendingUp size={18} className="text-purple-600" />
            <h3 className="font-black text-gray-900 uppercase tracking-widest text-sm">Automated Insights</h3>
          </div>
          <div className="p-6 flex-1 space-y-4">
            {insights.map((insight, i) => (
              <div key={i} className={`flex items-start gap-4 p-4 rounded-xl transition-all hover:translate-x-1 ${
                insight.type === 'positive' ? 'bg-green-50/70' : 
                insight.type === 'warning' ? 'bg-red-50/70' : 'bg-blue-50/70'
              }`}>
                <div className={`mt-1 p-1.5 rounded-lg ${
                  insight.type === 'positive' ? 'bg-green-500 text-white' : 
                  insight.type === 'warning' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
                }`}>
                  {insight.type === 'positive' && <ArrowUpRight size={12} />}
                  {insight.type === 'warning' && <AlertTriangle size={12} />}
                  {insight.type === 'suggestion' && <Lightbulb size={12} />}
                </div>
                <div className={`text-sm font-bold ${
                  insight.type === 'positive' ? 'text-green-800' : 
                  insight.type === 'warning' ? 'text-red-800' : 'text-blue-800'
                }`}>
                  {insight.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-gray-50 border-t border-gray-100/50 flex justify-center">
            <button className="text-[11px] font-black text-gray-400 hover:text-purple-600 uppercase tracking-widest flex items-center gap-2">
              Refresh Insights <RotateCcwIcon size={12} />
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}

const RotateCcwIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rotate-ccw">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
  </svg>
);
