'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  Building2, Users, CreditCard, TrendingUp, 
  Calendar, ChevronRight, ArrowUpRight, 
  UserPlus, Bell, Activity, Star, 
  MapPin, Clock, ExternalLink
} from 'lucide-react';
import { customers, revenueTrend } from '@/lib/mockData';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip as RechartsTooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';

export default function Dashboard() {
  const [greeting, setGreeting] = useState('');
  
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  const statCards = [
    { title: "Total Customers", value: "124", change: "+8% YoY", icon: Building2, color: "text-brand-blue", bg: "bg-brand-blue/10", trend: "+12", sub: "Active institutes" },
    { title: "Subscriptions", value: "109", change: "88% rate", icon: Users, color: "text-green-600", bg: "bg-green-100/50", trend: "+5", sub: "Paid subscribers" },
    { title: "MRR Growth", value: "₹2.8L", change: "+14% MoM", icon: CreditCard, color: "text-purple-600", bg: "bg-purple-100/50", trend: "+14%", sub: "Recurring revenue" },
    { title: "Conversions", value: "34%", change: "+5% MoM", icon: TrendingUp, color: "text-orange-500", bg: "bg-orange-100/50", trend: "+2.4%", sub: "Trial to Paid" },
  ];

  const pieData = [
    { name: 'Pro', value: 48, color: '#0052FF' }, 
    { name: 'Basic', value: 41, color: '#5E4E99' }, 
    { name: 'Free', value: 20, color: '#94A3B8' },
    { name: 'Expired', value: 15, color: '#F43F5E' },
  ];

  const recentSignups = customers.slice(0, 5);
  const regionPerformance = [
    { name: 'Maharashtra', val: 78, color: '#0052FF' },
    { name: 'Karnataka', val: 45, color: '#5E4E99' },
    { name: 'Telangana', val: 32, color: '#1D9E75' },
    { name: 'Gujarat', val: 28, color: '#D85A30' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      
      {/* Row 1: Header & Greeting */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-text-slate tracking-tighter">
            {greeting}, <span className="text-brand-blue">Vikram</span> 👋
          </h1>
          <p className="text-sm font-bold text-gray-400 mt-2 uppercase tracking-[0.2em] flex items-center gap-2">
            <Calendar className="w-4 h-4 text-brand-blue" />
            11 April 2026 • Bangalore Headquarters
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-5 py-3 rounded-2xl bg-white border border-gray-100/50 shadow-soft flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-text-slate">All Systems Live</span>
          </div>
          <Button variant="primary" size="md" className="shadow-glow">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Customer
          </Button>
        </div>
      </div>

      {/* Row 2: KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <div key={i} className={`animate-in slide-in-from-bottom duration-700 delay-[${i * 100}ms]`}>
            <Card className="group hover:-translate-y-2 transition-all duration-500 border-none shadow-soft overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-500`}>
                    <stat.icon className="w-6 h-6 shrink-0" />
                  </div>
                  {stat.trend && (
                    <Badge variant="Active" className="px-2 py-0.5 rounded-full border-none bg-green-50 text-green-500 text-[10px] font-black">
                      {stat.trend}
                    </Badge>
                  )}
                </div>
                <div>
                  <h3 className="text-4xl font-black text-text-slate tracking-tighter mb-1">{stat.value}</h3>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] leading-tight">{stat.title}</p>
                  <div className="h-1 w-12 bg-gray-100 rounded-full mt-5 group-hover:w-full group-hover:bg-brand-blue transition-all duration-700" />
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Row 3: Main Analytics */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Revenue Area Chart */}
        <Card className="xl:col-span-2 border-none shadow-soft">
          <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gradient-to-r from-white to-bg-soft/10">
            <div>
              <h3 className="text-xl font-black text-text-slate tracking-tight">Revenue Trajectory</h3>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-1">Growth Forecast vs Actuals</p>
            </div>
            <div className="flex gap-2">
              <Badge variant="default" className="bg-brand-blue text-white shadow-soft">Actual MRR</Badge>
              <Badge variant="default" className="font-black">Forecasted</Badge>
            </div>
          </div>
          <CardContent className="p-8 h-[380px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorMRR" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0052FF" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#0052FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 900 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 900 }} tickFormatter={(val) => `₹${val/1000}k`} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', padding: '20px', fontWeight: 900 }}
                />
                <Area type="monotone" dataKey="val" stroke="#0052FF" strokeWidth={5} fillOpacity={1} fill="url(#colorMRR)" dot={{ r: 5, fill: '#0052FF', strokeWidth: 3, stroke: '#fff' }} activeDot={{ r: 8, stroke: '#fff', strokeWidth: 4, fill: '#0052FF' }} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Subscription Distribution */}
        <Card className="border-none shadow-soft flex flex-col">
          <div className="p-8 border-b border-gray-50 bg-gradient-to-r from-white to-bg-soft/10">
            <h3 className="text-xl font-black text-text-slate tracking-tight">Subscription Mix</h3>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-1">Market Share by Plan</p>
          </div>
          <CardContent className="flex-1 p-8">
            <div className="flex flex-col h-full bg-slate-soft/30 rounded-[32px] p-6">
              <div className="h-[200px] w-full relative mb-10">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      innerRadius={65}
                      outerRadius={85}
                      paddingAngle={10}
                      dataKey="value"
                      stroke="none"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Active<br/>Users</span>
                  <span className="text-3xl font-black text-text-slate">124</span>
                </div>
              </div>
              <div className="space-y-4">
                {pieData.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-soft hover:scale-[1.02] transition-all cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: item.color }} />
                      <span className="text-xs font-black text-text-slate tracking-tight">{item.name} Plan</span>
                    </div>
                    <span className="text-xs font-black text-brand-blue">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 4: Recent Activity & Regions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Customer Lists */}
        <Card className="border-none shadow-soft overflow-hidden animate-in slide-in-from-left duration-700 delay-300">
          <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gradient-to-r from-white to-bg-soft/20">
            <div>
              <h3 className="text-xl font-black text-text-slate tracking-tight">Recent Signups</h3>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-1">Newest Platform Additions</p>
            </div>
            <Button variant="ghost" className="text-brand-blue rounded-xl p-2 hover:bg-brand-blue/5 text-[10px] font-black uppercase tracking-widest">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="divide-y divide-gray-50">
            {recentSignups.map((c, i) => (
              <div key={i} className="p-6 px-8 flex items-center justify-between hover:bg-bg-soft/70 transition-all group cursor-pointer">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-soft flex items-center justify-center font-black text-brand-blue border border-gray-100 group-hover:rotate-6 transition-transform">
                    {c.name.substring(0,1)}
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-text-slate leading-none mb-1 group-hover:text-brand-blue transition-colors">{c.name}</h4>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{c.city} • {c.contact}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={c.plan as any} className="mb-1 font-black shadow-sm">{c.plan}</Badge>
                  <p className="text-[9px] font-black text-gray-300 uppercase leading-none tracking-tighter">Joined {c.startDate}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Regional Performance */}
        <Card className="border-none shadow-soft p-8 animate-in slide-in-from-right duration-700 delay-300">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-black text-text-slate tracking-tight">Market Distribution</h3>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-1">Top Performing States</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-brand-blue text-white shadow-glow">
              <MapPin className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-8">
            {regionPerformance.map((region, i) => (
              <div key={i} className="group">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-black text-text-slate tracking-tight group-hover:text-brand-blue transition-colors">{region.name}</span>
                  <span className="text-sm font-black text-brand-blue">{region.val}%</span>
                </div>
                <div className="h-2.5 w-full bg-slate-soft rounded-full overflow-hidden shadow-inner">
                  <div 
                    className="h-full rounded-full transition-all duration-1000 delay-700 shadow-sm" 
                    style={{ 
                      width: `${region.val}%`, 
                      backgroundColor: region.color 
                    }} 
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 p-6 rounded-[32px] bg-brand-blue/5 border border-brand-blue/5 flex items-center justify-between group cursor-pointer hover:bg-brand-blue/10 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-blue flex items-center justify-center text-white shadow-glow group-hover:scale-110 transition-transform">
                <Star className="w-6 h-6 fill-current" />
              </div>
              <div>
                <p className="text-sm font-black text-text-slate leading-none mb-1">Regional Insight</p>
                <p className="text-xs font-bold text-gray-500">Tier 2 cities growing +40% faster this quarter.</p>
              </div>
            </div>
            <ExternalLink className="w-5 h-5 text-brand-blue opacity-30 group-hover:opacity-100 transition-opacity" />
          </div>
        </Card>
      </div>

      {/* Row 5: Action Banner */}
      <Card className="border-none shadow-soft-xl p-14 bg-gradient-to-br from-text-slate to-slate-900 overflow-hidden relative group">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-blue/20 rounded-full blur-[140px] -mr-48 -mt-48 transition-all duration-1000 group-hover:bg-brand-blue/30" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-[120px] -ml-24 -mb-24" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-xl text-center lg:text-left">
            <h3 className="text-5xl font-black text-white tracking-tighter mb-6 italic transform -rotate-1">NextGen Super Admin</h3>
            <p className="text-lg font-bold text-slate-400 leading-relaxed uppercase tracking-wide opacity-80">
              Forging the future of coaching operations with a single source of truth.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <ActionButton icon={Activity} label="System Health" color="bg-emerald-500 shadow-emerald-500/40" />
            <ActionButton icon={ArrowUpRight} label="Revenue Hub" color="bg-brand-blue shadow-brand-blue/40" />
            <ActionButton icon={Bell} label="Crisis Center" color="bg-rose-500 shadow-rose-500/40" />
            <ActionButton icon={Settings} label="Governance" color="bg-amber-500 shadow-amber-500/40" />
          </div>
        </div>
      </Card>
      
      {/* Footer Branding */}
      <div className="flex items-center justify-between pb-12 border-t border-gray-100 mt-12 pt-10 group opacity-60 hover:opacity-100 transition-all duration-700">
        <div className="flex items-center gap-5">
          <div className="w-12 h-12 border-2 border-text-slate rounded-[14px] transform -rotate-12 flex items-center justify-center font-black text-lg shadow-sm group-hover:rotate-0 transition-transform">TF</div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] leading-none mb-1">Platform Powered By</p>
            <p className="text-lg font-black text-text-slate leading-none">TechFly Core <span className="text-brand-blue">v4.0</span></p>
          </div>
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">© 2026 TechFly Technologies • All Rights Reserved</p>
      </div>

    </div>
  );
}

// --- Helper Components ---

const ActionButton = ({ icon: Icon, label, color }: any) => (
  <button className="flex flex-col items-center gap-4 p-8 rounded-[32px] bg-white/5 hover:bg-white/10 transition-all border border-white/5 group min-w-[140px] backdrop-blur-sm">
    <div className={`p-4 rounded-2xl ${color} text-white shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
      <Icon className="w-6 h-6" />
    </div>
    <span className="text-[11px] font-black text-slate-300 uppercase tracking-widest leading-none text-center">{label}</span>
  </button>
);

const Settings = (props: any) => (
  <svg 
    {...props}
    xmlns="http://www.w3.org/2000/svg" 
    width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
  >
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2a2 2 0 0 1-2 2a2 2 0 0 0-2 2a2 2 0 0 1-2 2a2 2 0 0 0-2 2v.44a2 2 0 0 0 2 2a2 2 0 0 1 2 2a2 2 0 0 0 2 2a2 2 0 0 1 2 2a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2a2 2 0 0 1 2-2a2 2 0 0 0 2-2a2 2 0 0 1 2-2a2 2 0 0 0 2-2v-.44a2 2 0 0 0-2-2a2 2 0 0 1-2-2a2 2 0 0 0-2-2a2 2 0 0 1-2-2a2 2 0 0 0-2-2z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);
