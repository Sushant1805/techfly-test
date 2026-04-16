'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  Users, CheckSquare, IndianRupee, FileText, 
  BookOpen, Clock, AlertCircle, CheckCircle2, 
  TrendingUp, Star, Calendar, ArrowRight,
  Plus, UserPlus, FileEdit, CreditCard,
  Bell, ChevronRight, MoreHorizontal, ExternalLink
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, ComposedChart, Line, Area, Cell,
  PieChart, Pie
} from 'recharts';
import { dashboardData } from '@/lib/dashboardData';

const COLORS = ['#5E4E99', '#1D9E75', '#D85A30', '#378ADD', '#BA7517', '#9E1D6A'];

export default function Dashboard() {
  const [greeting, setGreeting] = useState('');
  const [todayDate, setTodayDate] = useState('');
  
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
    setTodayDate(new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }));
  }, []);

  return (
    <div className="space-y-10 pb-20 animate-in fade-in duration-700">
      
      {/* Row 1: Greeting */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-text-slate tracking-tight">
            {greeting}, <span className="text-brand-blue">{dashboardData.institute.ownerName}</span> 👋
          </h1>
          <p className="text-sm font-bold text-gray-400 mt-2 uppercase tracking-[0.2em] flex items-center gap-2">
            <Calendar className="w-4 h-4 text-brand-blue" />
            {todayDate}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-5 py-3 rounded-2xl bg-white border border-gray-100 shadow-soft flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-widest text-text-slate">System Active</span>
          </div>
          <Badge className="bg-brand-blue/10 text-brand-blue border-none px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-soft">
            {dashboardData.institute.plan} Plan
          </Badge>
        </div>
      </div>

      {/* Row 2: KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {dashboardData.metrics.map((stat, i) => (
          <Card key={i} className="group hover:-translate-y-2 hover:shadow-soft-xl transition-all duration-500 border-none shadow-soft overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className={`p-3.5 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-500`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                {stat.trend && (
                  <span className="text-[10px] font-black text-green-500 bg-green-50 px-2 py-0.5 rounded-full">
                    {stat.trend}
                  </span>
                )}
              </div>
              <div>
                <h3 className="text-3xl font-black text-text-slate tracking-tighter mb-1">{stat.value}</h3>
                <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest leading-tight">{stat.title}</p>
                <p className="text-[10px] font-bold text-gray-400 mt-3 italic">{stat.sub}</p>
              </div>
              {stat.isProgress && (
                <div className="mt-4 h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 rounded-full transition-all duration-1000 delay-300" 
                    style={{ width: `${stat.progressValue}%` }}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Row 3: Schedule & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Today's Schedule */}
        <Card className="lg:col-span-3 border-none shadow-soft overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gradient-to-r from-white to-bg-soft/20">
            <div>
              <h3 className="text-xl font-black text-text-slate tracking-tight">Today&apos;s Schedule</h3>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-1">Saturday Classes</p>
            </div>
            <Button variant="ghost" size="sm" className="text-brand-blue hover:bg-brand-blue/5 rounded-xl font-black text-[10px] uppercase">
              Full Timetable <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <CardContent className="p-0">
            <div className="flex flex-col">
              {dashboardData.schedule.map((cls, i) => (
                <div key={i} className={`flex items-center gap-6 p-8 hover:bg-bg-soft/30 transition-all border-b border-gray-50 last:border-0 relative group cursor-pointer ${cls.isOngoing ? 'bg-brand-blue/[0.02]' : ''}`}>
                  <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${cls.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                  
                  <div className="min-w-[100px] text-center">
                    <p className={`text-sm font-black tracking-tight ${cls.isOngoing ? 'text-brand-blue' : 'text-gray-400'}`}>
                      {cls.time}
                    </p>
                    {cls.isOngoing && (
                      <span className="text-[9px] font-black text-brand-blue uppercase bg-brand-blue/10 px-2 py-0.5 rounded-full mt-1.5 inline-block animate-pulse">
                        Ongoing
                      </span>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="text-lg font-black text-text-slate leading-none">{cls.subject}</h4>
                      <Badge className="bg-bg-soft text-gray-400 border-none font-bold text-[10px] uppercase">{cls.batch}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                      <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> 2 Hours</span>
                      <span className="flex items-center gap-1.5"><UserPlus className="w-3 h-3" /> {cls.teacher}</span>
                      <span className="flex items-center gap-1.5 truncate"><BookOpen className="w-3 h-3" /> {cls.room}</span>
                    </div>
                  </div>

                  <button className="w-10 h-10 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-400 hover:text-brand-blue transition-all group-hover:scale-110">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2 border-none shadow-soft flex flex-col">
          <div className="p-8 border-b border-gray-50 bg-gradient-to-r from-white to-bg-soft/20">
            <h3 className="text-xl font-black text-text-slate tracking-tight">Live Activity</h3>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-1">Real-time updates</p>
          </div>
          <CardContent className="p-4 flex-1 overflow-y-auto custom-scrollbar max-h-[480px]">
            <div className="space-y-2">
              {dashboardData.activity.map((activity, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-bg-soft/50 transition-colors group cursor-pointer">
                  <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${
                    activity.type === 'attendance' ? 'bg-green-500' :
                    activity.type === 'fee' ? 'bg-purple-600' :
                    activity.type === 'test' ? 'bg-red-500' :
                    activity.type === 'assignment' ? 'bg-orange-400' :
                    'bg-gray-300'
                  }`} />
                  <div className="flex-1">
                    <p className="text-[13px] font-bold text-text-slate leading-tight group-hover:text-brand-blue transition-colors">
                      {activity.desc}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <p className="text-[10px] font-black text-gray-400 tracking-tighter uppercase">{activity.time}</p>
                      <span className="w-1 h-1 rounded-full bg-gray-200" />
                      <p className="text-[10px] font-black text-brand-blue tracking-tighter uppercase">{activity.user}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <div className="p-4 bg-bg-soft/30 text-center border-t border-gray-50">
            <button className="text-[11px] font-black text-gray-400 uppercase tracking-widest hover:text-brand-blue transition-colors">Clear History</button>
          </div>
        </Card>
      </div>

      {/* Row 4: Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Attendance Trend */}
        <Card className="lg:col-span-1 border-none shadow-soft p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-black text-text-slate tracking-tight">Week Attendance</h3>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Mon - Sat Trend</p>
            </div>
            <TrendingUp className="text-brand-blue w-6 h-6 opacity-30" />
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dashboardData.attendanceTrend} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 700 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 700 }} />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)', fontWeight: 800 }}
                />
                <Bar dataKey="percentage" radius={[6, 6, 0, 0]} barSize={32}>
                  {dashboardData.attendanceTrend.map((entry, index) => (
                    <Cell key={index} fill={entry.percentage >= 90 ? '#1D9E75' : entry.percentage >= 85 ? '#5E4E99' : '#D85A30'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Fee Snapshot */}
        <Card className="lg:col-span-1 border-none shadow-soft p-8 flex flex-col items-center justify-center text-center">
          <h3 className="text-lg font-black text-text-slate tracking-tight w-full text-left mb-8">Fee Snapshot</h3>
          <div className="relative w-48 h-48 mb-8">
            <svg className="w-full h-full -rotate-90 transform">
              <circle cx="96" cy="96" r="88" stroke="#f0f0f0" strokeWidth="12" fill="transparent" />
              <circle 
                cx="96" cy="96" r="88" stroke="url(#gradient-purple)" strokeWidth="16" fill="transparent" 
                strokeDasharray="552.9" 
                strokeDashoffset={552.9 * (1 - dashboardData.feeSnapshot.collectedPercent / 100)}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out delay-500"
              />
              <defs>
                <linearGradient id="gradient-purple" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#5E4E99" />
                  <stop offset="100%" stopColor="#9E1D6A" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-4xl font-black text-text-slate tracking-tighter">{dashboardData.feeSnapshot.collectedPercent}%</p>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Collected</p>
            </div>
          </div>
          <div className="grid grid-cols-2 w-full gap-4">
            <div className="p-4 rounded-3xl bg-bg-soft/50 flex flex-col items-center gap-1">
              <p className="text-xs font-black text-gray-400 uppercase tracking-tighter">Collected</p>
              <p className="text-lg font-black text-brand-blue">{dashboardData.feeSnapshot.collected}</p>
            </div>
            <div className="p-4 rounded-3xl bg-red-50 flex flex-col items-center gap-1">
              <p className="text-xs font-black text-red-300 uppercase tracking-tighter">Pending</p>
              <p className="text-lg font-black text-red-500">{dashboardData.feeSnapshot.overdue}</p>
            </div>
          </div>
        </Card>

        {/* Quick Stats */}
        <Card className="lg:col-span-1 border-none shadow-soft p-8">
          <h3 className="text-lg font-black text-text-slate tracking-tight mb-8">Administrative Info</h3>
          <div className="space-y-6">
            <InfoBox icon={FileEdit} label="Active Assignments" value="18" color="text-orange-500" />
            <InfoBox icon={CreditCard} label="Pending Invoices" value="4" color="text-red-500" />
            <InfoBox icon={UserPlus} label="New Leads (24h)" value="7" color="text-brand-blue" />
            <InfoBox icon={CheckCircle2} label="Tests Completed" value="156" color="text-green-500" />
          </div>
        </Card>
      </div>

      {/* Row 5: Batch Summary Table */}
      <Card className="border-none shadow-soft overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex items-center justify-between">
          <h3 className="text-xl font-black text-text-slate tracking-tight">Batch Performance Summary</h3>
          <Button variant="outline" className="rounded-2xl border-gray-100 font-bold text-xs uppercase px-6">Export Report</Button>
        </div>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-bg-soft/50 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50">
                <th className="px-8 py-4 text-left">Batch Name</th>
                <th className="px-8 py-4 text-left">Standard</th>
                <th className="px-8 py-4 text-left">Capacity</th>
                <th className="px-8 py-4 text-left">Avg Attendance</th>
                <th className="px-8 py-4 text-left">Health Status</th>
                <th className="px-8 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.batchSummaries.map((batch, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-bg-soft/30 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${i % 2 === 0 ? 'bg-brand-blue' : 'bg-purple-600'}`} />
                      <span className="font-black text-text-slate text-sm">{batch.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <Badge className="bg-bg-soft text-text-slate border-none font-bold text-[10px]">{batch.standard}</Badge>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-brand-blue rounded-full" style={{ width: `${(batch.strength / batch.capacity) * 100}%` }} />
                      </div>
                      <span className="text-[11px] font-black text-gray-400">{batch.strength}/{batch.capacity}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`text-sm font-black ${batch.attendance >= 90 ? 'text-green-500' : 'text-orange-500'}`}>{batch.attendance}%</span>
                  </td>
                  <td className="px-8 py-6">
                    <Badge className={`border-none font-black text-[9px] uppercase px-3 py-1 rounded-full ${
                      batch.status === 'Healthy' ? 'bg-green-100 text-green-600' :
                      batch.status === 'Moderate' ? 'bg-orange-100 text-orange-600' :
                      'bg-red-100 text-red-600'
                    }`}>
                      {batch.status}
                    </Badge>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="text-gray-300 hover:text-brand-blue transition-colors">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Row 6: Tests & Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Next Tests */}
        <Card className="border-none shadow-soft p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-black text-text-slate tracking-tight">Upcoming Tests</h3>
            <Badge className="bg-red-50 text-red-500 border-none font-black text-[10px] uppercase">Urgent</Badge>
          </div>
          <div className="space-y-4">
            {dashboardData.upcomingTests.map((test, i) => (
              <div key={i} className="p-6 rounded-[32px] border border-gray-100 bg-white hover:shadow-soft-lg transition-all flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-6">
                  <div className={`w-14 h-14 rounded-2xl ${test.color} text-white flex items-center justify-center font-black text-xl shadow-lg group-hover:rotate-6 transition-transform`}>
                    {test.subject.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-black text-text-slate text-base leading-none mb-2">{test.subject} Unit Test</h4>
                    <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {test.date}</span>
                      <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {test.time}</span>
                    </div>
                  </div>
                </div>
                <button className="w-10 h-10 rounded-full border border-gray-50 flex items-center justify-center text-gray-300 hover:border-brand-blue hover:text-brand-blue transition-all">
                  <ChevronRight size={18} />
                </button>
              </div>
            ))}
          </div>
        </Card>

        {/* Pending Tasks */}
        <Card className="border-none shadow-soft p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-black text-text-slate tracking-tight">Admin Tasks</h3>
            <Button variant="ghost" size="sm" className="w-10 h-10 p-0 rounded-xl bg-bg-soft"><Plus size={18} /></Button>
          </div>
          <div className="space-y-4">
            {dashboardData.pendingTasks.map((task, i) => (
              <div key={i} className="flex items-center gap-5 p-5 rounded-3xl hover:bg-bg-soft/50 transition-colors group cursor-pointer">
                <div className={`w-2 h-2 rounded-full shrink-0 ${
                  task.priority === 'High' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' :
                  task.priority === 'Medium' ? 'bg-orange-400' : 'bg-gray-300'
                }`} />
                <div className="flex-1">
                  <p className="text-[13px] font-bold text-text-slate">{task.task}</p>
                  <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-tighter shrink-0">Due: {task.due}</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                  <button className="w-8 h-8 rounded-lg bg-green-50 text-green-500 flex items-center justify-center hover:bg-green-500 hover:text-white transition-all"><CheckCircle2 size={14} /></button>
                  <button className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"><AlertCircle size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Row 7: Charts & Rankings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Performance */}
        <Card className="lg:col-span-2 border-none shadow-soft p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-black text-text-slate tracking-tight">Revenue Performance</h3>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-1">Monthly Trends & Targets</p>
            </div>
            <div className="flex gap-4">
              <LegendItem color="#5E4E99" label="Collected" />
              <LegendItem color="#FBCFE8" label="Pending" />
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={dashboardData.revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 700 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 700 }} tickFormatter={(val) => `₹${val/1000}k`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', padding: '20px' }}
                />
                <Bar dataKey="collected" fill="#5E4E99" radius={[10, 10, 0, 0]} barSize={40} />
                <Bar dataKey="pending" fill="#FBCFE8" radius={[10, 10, 0, 0]} barSize={40} />
                <Line type="monotone" dataKey="target" stroke="#F43F5E" strokeWidth={3} dot={{ r: 4, fill: '#F43F5E', strokeWidth: 2, stroke: '#fff' }} />
                <Area type="monotone" dataKey="collected" fill="#5E4E99" stroke="none" fillOpacity={0.05} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Top Performers */}
        <Card className="lg:col-span-1 border-none shadow-soft p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-text-slate tracking-tight">Top Performers</h3>
            <Star className="text-orange-400 fill-orange-400 w-6 h-6" />
          </div>
          <div className="space-y-2">
            {dashboardData.topStudents.map((stu, i) => (
              <div key={i} className={`flex items-center gap-4 p-4 rounded-3xl transition-all ${i === 0 ? 'bg-gradient-to-r from-brand-blue/10 to-transparent border border-brand-blue/5' : 'hover:bg-bg-soft'}`}>
                <div className={`relative w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg ${
                  i === 0 ? 'bg-brand-blue text-white shadow-soft-lg' :
                  i === 1 ? 'bg-purple-600 text-white shadow-soft-lg' :
                  i === 2 ? 'bg-green-500 text-white shadow-soft-lg' :
                  'bg-bg-soft text-gray-400'
                }`}>
                  {stu.avatar}
                  {i < 3 && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center text-[10px] font-black text-text-slate">
                      {i + 1}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-black text-text-slate">{stu.name}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Rank #{stu.rank}</p>
                </div>
                <div className="text-right">
                  <p className="text-base font-black text-brand-blue">{stu.score}</p>
                  <p className="text-[9px] font-bold text-gray-400 uppercase">Avg Score</p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-6 rounded-2xl border-gray-100 font-black text-[10px] uppercase tracking-widest py-6 h-auto">View Leaderboard</Button>
        </Card>
      </div>

      {/* Row 8: Action Grid */}
      <Card className="border-none shadow-soft p-8 bg-gradient-to-br from-text-slate to-slate-900 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/10 rounded-full blur-[100px] -mr-48 -mt-48" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl font-black text-white tracking-tight">Quick Operations</h3>
            <p className="text-sm font-medium text-slate-400 mt-2">Most frequent administrative actions</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full md:w-auto">
            <ActionButton icon={UserPlus} label="Add Student" color="bg-brand-blue" />
            <ActionButton icon={CheckSquare} label="Attendance" color="bg-green-500" />
            <ActionButton icon={CreditCard} label="Collect Fee" color="bg-purple-600" />
            <ActionButton icon={FileEdit} label="Add Test" color="bg-orange-500" />
          </div>
        </div>
      </Card>

      {/* Global Pulsing Dot Animation */}
      <style jsx global>{`
        @keyframes custom-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        .animate-custom-pulse {
          animation: custom-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}

// --- Helper Components ---

const InfoBox = ({ icon: Icon, label, value, color }: any) => (
  <div className="flex items-center justify-between p-5 rounded-3xl bg-bg-soft/30 border border-transparent hover:border-gray-50 hover:bg-white hover:shadow-soft transition-all group cursor-pointer">
    <div className="flex items-center gap-4">
      <div className={`p-2.5 rounded-xl bg-white shadow-sm ${color} group-hover:scale-110 transition-transform`}>
        <Icon className="w-4 h-4" />
      </div>
      <p className="text-[13px] font-bold text-text-slate">{label}</p>
    </div>
    <span className={`text-lg font-black ${color}`}>{value}</span>
  </div>
);

const LegendItem = ({ color, label }: any) => (
  <div className="flex items-center gap-2">
    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</span>
  </div>
);

const ActionButton = ({ icon: Icon, label, color }: any) => (
  <button className="flex flex-col items-center gap-3 p-6 rounded-3xl bg-white/5 hover:bg-white/10 transition-all border border-white/5 group min-w-[120px]">
    <div className={`p-3 rounded-2xl ${color} text-white shadow-lg group-hover:scale-110 transition-transform`}>
      <Icon className="w-5 h-5" />
    </div>
    <span className="text-[11px] font-black text-slate-300 uppercase tracking-widest leading-none text-center">{label}</span>
  </button>
);
