'use client';
import React, { useState, useEffect, useMemo } from 'react';
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

const COLORS = ['#5E4E99', '#1D9E75', '#D85A30', '#378ADD', '#BA7517', '#9E1D6A'];

export default function Dashboard() {
  const [greeting, setGreeting] = useState('');
  const [todayDate, setTodayDate] = useState('');
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('teacher');
  const [loading, setLoading] = useState(true);

  // Real data states
  const [students, setStudents] = useState<any[]>([]);
  const [batches, setBatches] = useState<any[]>([]);
  const [tests, setTests] = useState<any[]>([]);
  const [institute, setInstitute] = useState<any>(null);
  
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
    setTodayDate(new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }));

    // Load User from Local Storage and fetch data
    const fetchData = async () => {
      try {
        const userStr = localStorage.getItem('user');
        if (userStr) {
          const u = JSON.parse(userStr);
          if (u && u.name) setUserName(u.name);
          if (u && u.role) setUserRole(u.role);

          const instituteSlug = u.instituteId;

          // Fetch real data
          const [studentsRes, batchesRes, testsRes] = await Promise.all([
            fetch(`/api/${instituteSlug}/students`),
            fetch(`/api/${instituteSlug}/batches`),
            fetch(`/api/${instituteSlug}/tests`)
          ]);

          const studentsData = await studentsRes.json();
          const batchesData = await batchesRes.json();
          const testsData = await testsRes.json();

          if (studentsData.success) setStudents(studentsData.students || []);
          if (batchesData.success) setBatches(batchesData.batches || []);
          if (testsData.success) setTests(testsData.tests || []);

          // Set institute info
          setInstitute({
            name: u.instituteName || 'Institute',
            plan: 'Pro' // Could be fetched from institute API
          });
        }
      } catch (e) {
        console.error('Error fetching dashboard data:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate metrics from real data
  const metrics = useMemo(() => {
    if (loading) return [];

    const totalStudents = students.length;
    const activeBatches = batches.length;
    const upcomingTests = tests.filter((t: any) => {
      const today = new Date().toISOString().split('T')[0];
      return t.date >= today;
    }).length;

    return [
      { title: "Total Students", value: totalStudents.toString(), sub: "Active students", icon: Users, color: "text-brand-blue", bg: "bg-brand-blue/10" },
      { title: "Active Batches", value: activeBatches.toString(), sub: "Running batches", icon: BookOpen, color: "text-orange-500", bg: "bg-orange-50" },
      { title: "Upcoming Tests", value: upcomingTests.toString(), sub: "Scheduled tests", icon: FileText, color: "text-cyan-600", bg: "bg-cyan-50" },
    ];
  }, [loading, students, batches, tests]);

  const batchSummaries = useMemo(() => {
    return batches.map((b: any) => ({
      id: b._id,
      name: b.name,
      standard: b.standard || 'N/A',
      strength: students.filter((s: any) => s.batchId?._id === b._id || s.batchId === b._id).length,
      capacity: b.capacity || 50,
      attendance: 85, // Would need to calculate from attendance data
      status: 'Healthy' as const,
    }));
  }, [batches, students]);

  const upcomingTestsList = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return tests
      .filter((t: any) => t.date >= today)
      .slice(0, 3)
      .map((t: any, i: number) => ({
        id: t._id,
        subject: t.subject,
        date: t.date,
        time: t.startTime || '10:00 AM',
        color: i === 0 ? 'bg-purple-600' : i === 1 ? 'bg-green-500' : 'bg-orange-400',
        urgency: 'high' as const,
      }));
  }, [tests]);

  return (
    <div className="space-y-10 pb-20 animate-in fade-in duration-700">
      
      {/* Row 1: Greeting */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-text-slate tracking-tight">
            {greeting}, <span className="text-brand-blue">{userName}</span> 👋
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
            {institute?.plan || 'Pro'} Plan
          </Badge>
        </div>
      </div>

      {/* Row 2: KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {metrics
          .filter((stat: any) => {
            if (userRole === 'teacher') return !['Total Revenue', 'Overdue Fees'].includes(stat.title);
            if (userRole === 'reception') return ['Total Students', 'Total Revenue', 'Overdue Fees'].includes(stat.title);
            return true;
          })
          .map((stat: any, i: number) => (
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
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-1">Classes Today</p>
            </div>
            <Button variant="ghost" size="sm" className="text-brand-blue hover:bg-brand-blue/5 rounded-xl font-black text-[10px] uppercase">
              Full Timetable <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <CardContent className="p-0">
            <div className="flex flex-col">
              <div className="p-8 text-center text-gray-400">
                <p className="text-sm font-bold">Schedule data coming soon</p>
                <p className="text-xs mt-2">Timetable integration in progress</p>
              </div>
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
              <div className="p-4 text-center text-gray-400">
                <p className="text-sm font-bold">Activity feed coming soon</p>
              </div>
            </div>
          </CardContent>
          <div className="p-4 bg-bg-soft/30 text-center border-t border-gray-50">
            <button className="text-[11px] font-black text-gray-400 uppercase tracking-widest hover:text-brand-blue transition-colors">Clear History</button>
          </div>
        </Card>
      </div>

      {/* Row 4: Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Attendance Trend - HIDDEN FOR RECEPTION */}
        {userRole !== 'reception' && (
          <Card className={`lg:col-span-1 border-none shadow-soft p-8 ${userRole === 'teacher' ? 'lg:col-span-2' : ''}`}>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-black text-text-slate tracking-tight">Week Attendance</h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Mon - Sat Trend</p>
              </div>
              <TrendingUp className="text-brand-blue w-6 h-6 opacity-30" />
            </div>
            <div className="h-64 w-full flex items-center justify-center text-gray-400">
              <p className="text-sm font-bold">Attendance data coming soon</p>
            </div>
          </Card>
        )}

        {/* Fee Snapshot - SHOWN FOR RECEPTION */}
        {(userRole !== 'teacher') && (
          <Card className={`lg:col-span-1 border-none shadow-soft p-8 flex flex-col items-center justify-center text-center ${userRole === 'reception' ? 'lg:col-span-2' : ''}`}>
            <h3 className="text-lg font-black text-text-slate tracking-tight w-full text-left mb-8">Fee Snapshot</h3>
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <p className="text-sm font-bold">Fee data coming soon</p>
            </div>
          </Card>
        )}

        {/* Quick Stats */}
        <Card className="lg:col-span-1 border-none shadow-soft p-8">
          <h3 className="text-lg font-black text-text-slate tracking-tight mb-8">Administrative Info</h3>
          <div className="space-y-6">
            {userRole !== 'reception' && <InfoBox icon={FileEdit} label="Active Assignments" value="—" color="text-orange-500" />}
            {userRole !== 'teacher' && <InfoBox icon={CreditCard} label="Pending Invoices" value="—" color="text-red-500" />}
            {userRole !== 'teacher' && <InfoBox icon={UserPlus} label="New Leads (24h)" value="—" color="text-brand-blue" />}
            {userRole !== 'reception' && <InfoBox icon={CheckCircle2} label="Tests Completed" value={tests.length.toString()} color="text-green-500" />}
            {userRole === 'reception' && <InfoBox icon={CheckCircle2} label="Today's Walk-ins" value="—" color="text-brand-blue" />}
          </div>
        </Card>
      </div>

      {/* Row 5: Batch Summary Table - HIDDEN FOR RECEPTION */}
      {userRole !== 'reception' && (
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
                {batchSummaries.map((batch: any, i: number) => (
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
      )}

      {/* Row 6: Tests & Tasks - HIDDEN FOR RECEPTION */}
      {userRole !== 'reception' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Next Tests */}
          <Card className="border-none shadow-soft p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-black text-text-slate tracking-tight">Upcoming Tests</h3>
              <Badge className="bg-red-50 text-red-500 border-none font-black text-[10px] uppercase">Urgent</Badge>
            </div>
            <div className="space-y-4">
              {upcomingTestsList.length > 0 ? (
                upcomingTestsList.map((test: any, i: number) => (
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
                ))
              ) : (
                <div className="text-center text-gray-400 py-8">
                  <p className="text-sm font-bold">No upcoming tests</p>
                </div>
              )}
            </div>
          </Card>

          {/* Pending Tasks */}
          <Card className="border-none shadow-soft p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-black text-text-slate tracking-tight">Admin Tasks</h3>
              <Button variant="ghost" size="sm" className="w-10 h-10 p-0 rounded-xl bg-bg-soft"><Plus size={18} /></Button>
            </div>
            <div className="space-y-4">
              <div className="text-center text-gray-400 py-8">
                <p className="text-sm font-bold">Task management coming soon</p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Row 7: Charts & Rankings - REVENUE HIDDEN FOR TEACHER, SHOWN FOR RECEPTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Performance */}
        {(userRole !== 'teacher') ? (
          <Card className="lg:col-span-2 border-none shadow-soft p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-black text-text-slate tracking-tight">{userRole === 'reception' ? "Today's Fee Collection" : "Revenue Performance"}</h3>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-1">{userRole === 'reception' ? "Collection timeline for all modes" : "Monthly Trends & Targets"}</p>
              </div>
              <div className="flex gap-4">
                <LegendItem color="#5E4E99" label="Collected" />
                <LegendItem color="#FBCFE8" label="Pending" />
              </div>
            </div>
            <div className="h-80 w-full flex items-center justify-center text-gray-400">
              <p className="text-sm font-bold">Revenue analytics coming soon</p>
            </div>
          </Card>
        ) : (
          <Card className="lg:col-span-2 border-none shadow-soft p-8">
             <div className="flex items-center justify-between mb-8">
                <div>
                   <h3 className="text-xl font-black text-text-slate tracking-tight">Student Success Trend</h3>
                   <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-1">Average Test Scores across your batches</p>
                </div>
             </div>
             <div className="h-80 w-full bg-bg-soft/20 rounded-3xl flex items-center justify-center">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">Academic Analytics Layer Loading...</p>
             </div>
          </Card>
        )}

        {/* Top Performers */}
        <Card className="lg:col-span-1 border-none shadow-soft p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-text-slate tracking-tight">Top Performers</h3>
            <Star className="text-orange-400 fill-orange-400 w-6 h-6" />
          </div>
          <div className="space-y-2">
            <div className="text-center text-gray-400 py-8">
              <p className="text-sm font-bold">Leaderboard coming soon</p>
              <p className="text-xs mt-2">Based on test results</p>
            </div>
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
            {userRole !== 'teacher' && <ActionButton icon={UserPlus} label="Add Student" color="bg-brand-blue" />}
            {userRole !== 'reception' && <ActionButton icon={CheckSquare} label="Attendance" color="bg-green-500" />}
            {userRole !== 'teacher' && <ActionButton icon={CreditCard} label="Collect Fee" color="bg-purple-600" />}
            {userRole !== 'reception' && userRole !== 'teacher' && <ActionButton icon={FileEdit} label="Add Test" color="bg-orange-500" />}
            {userRole === 'reception' && <ActionButton icon={FileText} label="Fee Receipt" color="bg-orange-500" />}
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
