'use client';
import React, { useMemo } from 'react';
import { 
  CreditCard, TrendingUp, AlertCircle, Clock, Gift, 
  Download, ArrowUpRight, DollarSign, Wallet, Smartphone,
  BarChart3, Calendar, Lock
} from 'lucide-react';
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, ComposedChart, Line, Cell, PieChart, Pie, Legend
} from 'recharts';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { GlobalFilter, feeAnalytics, monthlyTrends } from '@/lib/analyticsData';

export default function FeesTab({ filters }: { filters: GlobalFilter }) {
  const summaryCards = [
    { label: 'Total Revenue', value: '₹' + feeAnalytics.totalRevenue.toLocaleString(), sub: 'Jan–Apr 2026', icon: DollarSign, color: 'bg-green-100 text-green-600' },
    { label: 'MRR (April)', value: '₹' + feeAnalytics.mrr.toLocaleString(), sub: 'Monthly Recurring', icon: CreditCard, color: 'bg-purple-100 text-purple-600' },
    { label: 'Collection Rate', value: feeAnalytics.collectionRate + '%', sub: 'Target: 85%', icon: TrendingUp, color: 'bg-blue-100 text-blue-600' },
    { label: 'Pending', value: '₹' + feeAnalytics.pending.toLocaleString(), sub: 'Total unpaid', icon: Clock, color: 'bg-amber-100 text-amber-600' },
    { label: 'Overdue', value: '₹' + feeAnalytics.overdue.toLocaleString(), sub: '30+ Days', icon: AlertCircle, color: 'bg-red-100 text-red-600' },
    { label: 'Concessions', value: '₹' + feeAnalytics.concessions.toLocaleString(), sub: 'Merit/Other', icon: Gift, color: 'bg-gray-100 text-gray-600' },
  ];

  const revenueTrendData = [
    { month: 'Jan', collected: 162000, pending: 18000, rate: 90 },
    { month: 'Feb', collected: 174000, pending: 12000, rate: 93 },
    { month: 'Mar', collected: 186000, pending: 8000, rate: 96 },
    { month: 'Apr', collected: 189000, pending: 30750, rate: 86 },
  ];

  const batchCollectionData = [
    { name: 'Batch A', rate: 94, collected: 76500, total: 81000 },
    { name: 'Batch B', rate: 94, collected: 85000, total: 90000 },
    { name: 'Batch C', rate: 78, collected: 77000, total: 99000 },
    { name: 'Batch D', rate: 87, collected: 49000, total: 56000 },
    { name: 'Batch E', rate: 63, collected: 22500, total: 36000 },
  ];

  const paymentModeData = [
    { month: 'Jan', Cash: 50, UPI: 30, Bank: 15, Cheque: 5 },
    { month: 'Feb', Cash: 45, UPI: 35, Bank: 12, Cheque: 8 },
    { month: 'Mar', Cash: 40, UPI: 38, Bank: 14, Cheque: 8 },
    { month: 'Apr', Cash: 38, UPI: 42, Bank: 12, Cheque: 8 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in fill-mode-backwards duration-700">
      {/* Summary Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {summaryCards.map((card, i) => (
          <Card key={i} className="p-5 border-none shadow-sm group hover:scale-[1.02] transition-all">
            <div className={`w-10 h-10 rounded-lg ${card.color} flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform`}>
              <card.icon size={20} />
            </div>
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{card.label}</div>
            <div className="text-xl font-black text-gray-900 mt-0.5">{card.value}</div>
            <div className="text-[9px] font-bold text-gray-400 mt-1 uppercase tracking-tighter">{card.sub}</div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Section A: Revenue Trend */}
        <Card className="lg:col-span-2 p-6 border-none shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-black text-gray-900">Revenue Collection Trend</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-purple-600 rounded-sm" /> <span className="text-[10px] font-black text-gray-400 uppercase">Collected</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-400 rounded-sm" /> <span className="text-[10px] font-black text-gray-400 uppercase">Pending</span></div>
            </div>
          </div>
          <div className="h-[340px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueTrendData}>
                <defs>
                  <linearGradient id="colorColl" x1="0" y1="0" x2="0" y2="1">
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
                <YAxis hide domain={[0, 'auto']} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                  formatter={(val) => `₹${Number(val).toLocaleString()}`}
                />
                <Area type="monotone" dataKey="collected" stroke="#8B5CF6" strokeWidth={3} fillOpacity={1} fill="url(#colorColl)" stackId="1" />
                <Area type="monotone" dataKey="pending" stroke="#EF4444" strokeWidth={2} strokeDasharray="5 5" fill="transparent" stackId="2" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Section B: Collection Rate by Batch */}
        <Card className="p-6 border-none shadow-sm">
          <h3 className="text-lg font-black text-gray-900 mb-8 whitespace-nowrap">Collection by Batch</h3>
          <div className="space-y-6">
            {batchCollectionData.map((batch, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                  <span className="text-gray-400">{batch.name}</span>
                  <div className="flex gap-2">
                    <span className="text-gray-900">₹{batch.collected.toLocaleString()}</span>
                    <span className="text-gray-300">/ ₹{batch.total.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2.5 bg-gray-50 rounded-full overflow-hidden border border-gray-100 flex shadow-inner">
                    <div 
                      className={`h-full transition-all duration-1000 ease-out rounded-full ${
                        batch.rate >= 90 ? 'bg-green-500' : batch.rate >= 75 ? 'bg-amber-400' : 'bg-red-500'
                      }`} 
                      style={{ width: `${batch.rate}%` }} 
                    />
                  </div>
                  <span className={`text-xs font-black min-w-[32px] ${
                    batch.rate >= 90 ? 'text-green-600' : batch.rate >= 75 ? 'text-amber-600' : 'text-red-600'
                  }`}>
                    {batch.rate}%
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 p-5 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl text-white relative overflow-hidden group">
             <BarChart3 className="absolute -bottom-4 -right-4 w-24 h-24 opacity-10 group-hover:scale-125 transition-transform duration-700" />
             <div className="relative z-10 flex flex-col gap-1">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Total Outstanding</div>
                <div className="text-2xl font-black">₹{feeAnalytics.pending.toLocaleString()}</div>
                <Button className="mt-4 bg-purple-600 hover:bg-purple-700 h-9 font-black uppercase text-[10px] tracking-widest border-none w-full shadow-lg">
                   Send All Reminders
                </Button>
             </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section C: Payment Mode Trend */}
        <Card className="p-6 border-none shadow-sm">
           <div className="flex justify-between items-center mb-8">
              <h3 className="text-lg font-black text-gray-900 lowercase tracking-tighter italic">Payment Mode Shift</h3>
              <div className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase">UPI growing ↗︎</div>
           </div>
           <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={paymentModeData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 'bold' }} dy={10} />
                  <YAxis hide />
                  <Tooltip cursor={{ fill: '#F8FAFC' }} />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }} />
                  <Bar dataKey="Cash" stackId="a" fill="#94A3B8" barSize={35} />
                  <Bar dataKey="UPI" stackId="a" fill="#5E4E99" barSize={35} />
                  <Bar dataKey="Bank" stackId="a" fill="#10B981" barSize={35} />
                  <Bar dataKey="Cheque" stackId="a" fill="#F59E0B" radius={[4, 4, 0, 0]} barSize={35} />
                </BarChart>
              </ResponsiveContainer>
           </div>
        </Card>

        {/* Section D: Overdue Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <Card className="p-6 border-none shadow-sm bg-red-50/30 border-l-4 border-l-red-500">
              <h4 className="text-xs font-black text-red-600 uppercase tracking-widest mb-6 flex items-center gap-2">
                 <AlertCircle size={14} /> Overdue by Duration
              </h4>
              <div className="space-y-4">
                 {[
                   { label: '0–15 days', count: 8, val: '₹18,000', color: 'bg-amber-400' },
                   { label: '16–30 days', count: 6, val: '₹15,000', color: 'bg-orange-400' },
                   { label: '31–60 days', count: 4, val: '₹11,000', color: 'bg-red-500' },
                   { label: '60+ days', count: 0, val: '₹0', color: 'bg-red-900' },
                 ].map((row, i) => (
                   <div key={i} className="flex flex-col gap-1.5">
                      <div className="flex justify-between items-center text-[10px] font-black uppercase">
                         <span className="text-gray-500">{row.label}</span>
                         <span className="text-gray-900">{row.val}</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <div className="flex-1 h-1.5 bg-white rounded-full overflow-hidden">
                            <div className={`h-full ${row.color}`} style={{ width: `${(row.count / 18) * 100}%` }} />
                         </div>
                         <span className="text-[10px] font-black text-gray-400 w-4">{row.count}</span>
                      </div>
                   </div>
                 ))}
              </div>
           </Card>

           <Card className="p-6 border-none shadow-sm flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mb-4">
                 <SendIcon size={32} />
              </div>
              <h4 className="text-[11px] font-black uppercase tracking-widest text-gray-900 mb-1">Reminder Efficacy</h4>
              <div className="text-3xl font-black text-purple-600">57%</div>
              <p className="text-[10px] font-bold text-gray-400 uppercase mt-2 italic">Parents pay within 4.2 days of receiving a reminder</p>
           </Card>

           <Card className="p-6 border-none shadow-sm md:col-span-2 relative overflow-hidden bg-white">
              <div className="absolute right-0 top-0 p-4 opacity-5 translate-x-4 -translate-y-4">
                 <Calendar size={120} />
              </div>
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Revenue Projection (May 2026)</h3>
              <div className="flex flex-wrap gap-12 items-end">
                 <div>
                    <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Expected Total</div>
                    <div className="text-3xl font-black text-gray-900">₹2,33,335</div>
                 </div>
                 <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div>
                       <div className="text-[9px] font-bold text-gray-400 uppercase">From Current</div>
                       <div className="text-sm font-black text-purple-600">₹2,10,000</div>
                    </div>
                    <div>
                       <div className="text-[9px] font-bold text-gray-400 uppercase">From New Enrolls</div>
                       <div className="text-sm font-black text-green-600">₹23,335</div>
                    </div>
                    <div className="hidden md:block">
                       <div className="text-[9px] font-bold text-gray-400 uppercase">Confidence</div>
                       <div className="text-sm font-black text-gray-700">High (85%)</div>
                    </div>
                 </div>
              </div>
              <div className="mt-8 pt-6 border-t border-gray-50 flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                 {[
                   { icon: Wallet, label: 'UPI Preference', val: '42%' },
                   { icon: Smartphone, label: 'Digital Invoicing', val: '100%' },
                   { icon: Lock, label: 'Payment Security', val: 'Bank Verified' },
                 ].map((item, i) => (
                   <div key={i} className="flex-1 min-w-[140px] flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100/50">
                      <div className="p-2 bg-white rounded-lg text-purple-600 shadow-sm"><item.icon size={16} /></div>
                      <div>
                         <div className="text-[8px] font-black text-gray-400 uppercase">{item.label}</div>
                         <div className="text-xs font-black text-gray-900">{item.val}</div>
                      </div>
                   </div>
                 ))}
              </div>
           </Card>
        </div>
      </div>
      
      {/* Footer Section: Heatmap */}
      <Card className="p-8 border-none shadow-sm relative overflow-hidden group">
         <div className="flex justify-between items-center mb-8 relative z-10">
            <div>
               <h3 className="text-lg font-black text-gray-900">Collection Heatmap</h3>
               <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Daily revenue intensity over the last 4 months</p>
            </div>
            <Button variant="outline" size="sm" className="h-9 font-black uppercase text-[10px] tracking-widest gap-2 bg-white border-gray-200">
               <Download size={14} /> Export CSV
            </Button>
         </div>
         
         <div className="grid grid-cols-7 md:grid-cols-14 lg:grid-cols-28 gap-1 relative z-10">
            {Array.from({ length: 90 }).map((_, i) => {
               const val = Math.random() * 15000;
               const opacity = val > 12000 ? 'bg-green-600' : val > 8000 ? 'bg-green-400' : val > 3000 ? 'bg-amber-400' : 'bg-gray-100';
               return (
                 <div key={i} className={`w-full aspect-square rounded-[2px] ${opacity} transition-all hover:scale-125 cursor-pointer relative group-2`}>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-20">
                    </div>
                 </div>
               );
            })}
         </div>
         <div className="mt-8 flex items-center justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest border-t border-gray-50 pt-4 relative z-10">
            <div className="flex items-center gap-3">
               <div className="flex items-center gap-1"><div className="w-2 h-2 bg-gray-100 border border-gray-200" /> ₹0</div>
               <div className="flex items-center gap-1"><div className="w-2 h-2 bg-green-600" /> ₹15,000+</div>
            </div>
            <div className="italic">Data synchronized: 12 April 2026, 11:24 AM</div>
         </div>
      </Card>
    </div>
  );
}

const SendIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </svg>
);
