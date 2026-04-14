'use client';
import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line
} from 'recharts';
import { 
  TrendingUp, Users, Target, Zap, Clock, 
  ArrowUpRight, ArrowDownRight, Filter, Download, Info
} from 'lucide-react';
import { leads } from '@/lib/salesData';

const COLORS = ['#0052FF', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#EC4899', '#6366F1'];

const funnelData = [
  { stage: 'New Lead', count: 16, percentage: 100, color: 'bg-indigo-400' },
  { stage: 'Contacted', count: 8, percentage: 50, color: 'bg-blue-400' },
  { stage: 'Demo Scheduled', count: 4, percentage: 25, color: 'bg-purple-400' },
  { stage: 'Demo Done', count: 3, percentage: 19, color: 'bg-teal-400' },
  { stage: 'Proposal Sent', count: 2, percentage: 13, color: 'bg-amber-400' },
  { stage: 'Negotiation', count: 2, percentage: 13, color: 'bg-orange-400' },
];

const sourceData = [
  { name: 'Google Ad', value: 30 },
  { name: 'Referral', value: 25 },
  { name: 'Website', value: 20 },
  { name: 'Cold Call', value: 15 },
  { name: 'Exhibition', value: 5 },
  { name: 'Others', value: 5 },
];

const teamPerformance = [
  { name: 'Ravi Tiwari', new: 8, demos: 4, conv: 2, lost: 1, rate: 50, value: 8000, days: 10 },
  { name: 'Neha Gupta', new: 6, demos: 2, conv: 0, lost: 1, rate: 0, value: 3000, days: 14 },
  { name: 'Pooja Mehta', new: 6, demos: 2, conv: 0, lost: 1, rate: 0, value: 3500, days: 16 },
  { name: 'Vikram Shah', new: 0, demos: 0, conv: 0, lost: 0, rate: 0, value: 0, days: 0 },
];

export default function SalesAnalyticsPage() {
  return (
    <div className="flex flex-col gap-10 animate-in fade-in duration-700 pb-20">
      
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
           <div className="flex items-center gap-3 mb-2">
             <div className="w-10 h-10 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
               <TrendingUp className="w-6 h-6" />
             </div>
             <h1 className="text-4xl font-black text-text-slate tracking-tight">Sales Analytics</h1>
          </div>
          <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Performance insights for the TechFly sales team</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white p-2 rounded-2xl shadow-soft border border-gray-100 flex items-center gap-2">
             <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">This Month</span>
             <Filter className="w-4 h-4 text-gray-400 mr-2" />
          </div>
          <Button variant="outline" className="rounded-2xl px-6 py-6 font-black uppercase tracking-widest text-xs gap-3 shadow-soft h-14 bg-white border-gray-100">
            <Download className="w-5 h-5" /> Export Data
          </Button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <KPIAnalytics label="Total Leads" value="20" trend="+12%" up />
        <KPIAnalytics label="New (Mo)" value="6" trend="+5%" up />
        <KPIAnalytics label="Converted" value="2" trend="0%" />
        <KPIAnalytics label="Lost" value="2" trend="-10%" up={false} />
        <KPIAnalytics label="Win Rate" value="22%" trend="+4%" up />
        <KPIAnalytics label="Avg Cycle" value="12d" trend="-2d" up />
      </div>

      {/* Funnel & Velocity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 p-10 border-none shadow-soft">
           <h2 className="text-xl font-black text-text-slate tracking-tight uppercase mb-8">Pipeline Funnel</h2>
           <div className="space-y-4">
              {funnelData.map((stage, i) => (
                <div key={i} className="space-y-2 group">
                   <div className="flex justify-between items-end text-[10px] font-black uppercase tracking-widest">
                      <span className="text-text-slate">{stage.stage}</span>
                      <span className="text-gray-400">{stage.count} leads ({stage.percentage}%)</span>
                   </div>
                   <div className="h-10 w-full bg-slate-soft rounded-xl overflow-hidden relative">
                      <div className={`h-full ${stage.color} transition-all duration-1000 shadow-sm`} style={{ width: `${stage.percentage}%` }} />
                      {i < funnelData.length - 1 && (
                        <div className="absolute right-0 top-full mt-[-8px] z-10 w-full text-center">
                           <span className="bg-white px-2 py-0.5 rounded-md text-[8px] font-black text-gray-300 border border-gray-50 uppercase tracking-tighter">
                             {Math.round((funnelData[i+1].count / stage.count) * 100)}% Conversion
                           </span>
                        </div>
                      )}
                   </div>
                </div>
              ))}
           </div>
        </Card>

        <Card className="p-10 border-none shadow-soft bg-brand-blue text-white shadow-glow relative overflow-hidden">
           <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mt-20" />
           <div className="relative z-10 h-full flex flex-col">
              <p className="text-[10px] font-black text-white/60 uppercase tracking-[0.2em] mb-8">Pipeline Velocity</p>
              <div className="flex-1 space-y-8">
                 <div className="space-y-1">
                    <p className="text-4xl font-black tracking-tighter leading-none">₹220<span className="text-lg opacity-50">/day</span></p>
                    <p className="text-xs font-bold text-white/70">Generated in new MRR</p>
                 </div>
                 <div className="p-6 bg-white/10 rounded-3xl border border-white/10 space-y-4">
                    <VelocityMetric label="Active Leads" value="16" />
                    <VelocityMetric label="Win Rate" value="22%" />
                    <VelocityMetric label="Avg Ticket" value="₹750" />
                    <div className="h-px bg-white/5" />
                    <VelocityMetric label="Cycle Length" value="12d" />
                 </div>
              </div>
              <p className="text-[10px] font-black text-white/40 uppercase tracking-tighter mt-8 leading-relaxed italic">
                * To hit ₹10k objective: Need 24 leads or shorten cycle to 8 days.
              </p>
           </div>
        </Card>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <Card className="p-10 border-none shadow-soft h-[500px] flex flex-col">
            <h2 className="text-xl font-black text-text-slate tracking-tight uppercase mb-8">Monthly lead Volume</h2>
            <div className="flex-1 w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { name: 'Nov', new: 4, conv: 1, lost: 0 },
                    { name: 'Dec', new: 3, conv: 1, lost: 1 },
                    { name: 'Jan', new: 5, conv: 2, lost: 1 },
                    { name: 'Feb', new: 4, conv: 1, lost: 0 },
                    { name: 'Mar', new: 4, conv: 2, lost: 2 },
                    { name: 'Apr', new: 6, conv: 2, lost: 2 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#94A3B8' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#94A3B8' }} />
                    <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }} />
                    <Bar dataKey="new" fill="#0052FF" radius={[4, 4, 0, 0]} barSize={20} />
                    <Bar dataKey="conv" fill="#10B981" radius={[4, 4, 0, 0]} barSize={20} />
                    <Bar dataKey="lost" fill="#F43F5E" radius={[4, 4, 0, 0]} barSize={20} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', paddingTop: '20px' }} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </Card>

         <Card className="p-10 border-none shadow-soft h-[500px] flex flex-col">
            <h2 className="text-xl font-black text-text-slate tracking-tight uppercase mb-8">Lead Source Breakdown</h2>
            <div className="flex-1 w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sourceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={120}
                      paddingAngle={8}
                      dataKey="value"
                    >
                      {sourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase' }} />
                  </PieChart>
               </ResponsiveContainer>
            </div>
            <div className="pt-6 border-t border-gray-50 text-center">
               <p className="text-[10px] font-black text-brand-blue uppercase tracking-widest leading-none animate-pulse">Referral leads have 40% conversion rate ✦</p>
            </div>
         </Card>
      </div>

      {/* Team Performance Table */}
      <div className="space-y-6">
        <h2 className="text-xl font-black text-text-slate tracking-tight uppercase px-2">Sales Team Performance</h2>
        <div className="bg-white rounded-[32px] shadow-soft border border-gray-100 overflow-hidden">
           <table className="w-full text-left border-collapse">
             <thead>
               <tr className="border-b border-gray-50 uppercase text-[10px] font-black text-gray-400 tracking-[0.2em] bg-slate-soft/30">
                 <th className="pl-10 py-6">Member</th>
                 <th className="px-6 py-6 text-center">New Leads</th>
                 <th className="px-6 py-6 text-center">Demos</th>
                 <th className="px-6 py-6 text-center">Converted</th>
                 <th className="px-6 py-6 text-center">Win Rate</th>
                 <th className="px-6 py-6 text-right">Pipe Value</th>
                 <th className="px-10 py-6 text-right">Avg Days</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-50">
                {teamPerformance.map((rep, idx) => (
                  <tr key={rep.name} className={`group hover:bg-slate-soft/40 transition-all ${idx === 0 ? 'bg-brand-blue/5' : ''}`}>
                    <td className="pl-10 py-4 flex items-center gap-3">
                       <div className="w-10 h-10 rounded-xl bg-slate-soft flex items-center justify-center font-black text-xs text-text-slate">{rep.name.split(' ').map(n => n[0]).join('')}</div>
                       <span className="text-sm font-black text-text-slate">{rep.name}</span>
                       {idx === 0 && <span className="ml-2 text-[8px] font-black text-brand-blue border border-brand-blue/30 px-2 py-0.5 rounded-md uppercase">Top Performer</span>}
                    </td>
                    <td className="px-6 py-4 text-center text-xs font-bold text-gray-500">{rep.new}</td>
                    <td className="px-6 py-4 text-center text-xs font-bold text-gray-500">{rep.demos}</td>
                    <td className="px-6 py-4 text-center text-xs font-black text-green-600">{rep.conv}</td>
                    <td className="px-6 py-4 text-center">
                       <div className="w-24 h-2 bg-gray-100 rounded-full mx-auto relative overflow-hidden">
                          <div className="h-full bg-brand-blue" style={{ width: `${rep.rate}%` }} />
                       </div>
                       <span className="text-[9px] font-black text-text-slate mt-1 block">{rep.rate}%</span>
                    </td>
                    <td className="px-6 py-4 text-right text-xs font-black text-text-slate">₹{rep.value.toLocaleString()}</td>
                    <td className="px-10 py-4 text-right text-xs font-bold text-gray-500">{rep.days ? `${rep.days} days` : '—'}</td>
                  </tr>
                ))}
             </tbody>
           </table>
        </div>
      </div>

    </div>
  );
}

const KPIAnalytics = ({ label, value, trend, up }: any) => (
  <Card className="p-6 border-none shadow-soft flex flex-col justify-between group hover:shadow-soft-lg transition-all relative">
    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-4 group-hover:text-brand-blue transition-colors">{label}</p>
    <div className="flex items-end justify-between">
       <p className="text-2xl font-black text-text-slate tracking-tighter leading-none">{value}</p>
       <div className={`flex items-center gap-1 text-[9px] font-black px-2 py-1 rounded-lg ${up === undefined ? 'bg-gray-50 text-gray-400' : up ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
          {up === undefined ? null : up ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
          {trend}
       </div>
    </div>
  </Card>
);

const VelocityMetric = ({ label, value }: { label: string, value: string }) => (
  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
     <span className="opacity-60">{label}</span>
     <span className="text-white">{value}</span>
  </div>
);
