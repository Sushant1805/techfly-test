'use client';
import React, { useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { 
  TrendingUp, TrendingDown, Users, Wallet, 
  AlertCircle, ArrowUpRight, ArrowDownRight,
  HandCoins, Banknote, CreditCard, Receipt
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { feeRecords, batches, subjectColors } from '@/lib/mockData';

export const FeeOverview: React.FC = () => {
  const stats = useMemo(() => {
    const totalCollected = feeRecords.reduce((acc, r) => acc + r.amountPaid, 0);
    const pendingAmount = feeRecords.filter(r => r.status === 'Pending' || r.status === 'Partial').reduce((acc, r) => acc + r.balance, 0);
    const overdueAmount = feeRecords.filter(r => r.status === 'Overdue').reduce((acc, r) => acc + r.balance, 0);
    const thisMonth = feeRecords.filter(r => r.month === 'April 2026').reduce((acc, r) => acc + r.amountPaid, 0);
    const studentsDue = new Set(feeRecords.filter(r => r.status !== 'Paid' && r.status !== 'Waived').map(r => r.studentId)).size;

    return { totalCollected, pendingAmount, overdueAmount, thisMonth, studentsDue };
  }, []);

  const chartData = [
    { name: 'Jan', collected: 185000, pending: 15000 },
    { name: 'Feb', collected: 210000, pending: 25000 },
    { name: 'Mar', collected: 220000, pending: 35000 },
    { name: 'Apr', collected: 246000, pending: 37750 },
  ];

  const pieData = [
    { name: 'Cash', value: 362000, color: '#5E4E99' },
    { name: 'UPI', value: 301000, color: '#1D9E75' },
    { name: 'Transfer', value: 129000, color: '#D85A30' },
    { name: 'Cheque', value: 69000, color: '#BA7517' },
  ];

  const overdueStudents = feeRecords.filter(r => r.status === 'Overdue' && r.month === 'April 2026').slice(0, 4);

  return (
    <div className="space-y-10">
      {/* 1. Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <StatCard label="Total Collected" value={`₹${stats.totalCollected.toLocaleString()}`} sub="All time" color="text-brand-blue" icon={HandCoins} />
        <StatCard label="Pending Amount" value={`₹${stats.pendingAmount.toLocaleString()}`} sub="Current dues" color="text-amber-500" icon={Banknote} />
        <StatCard label="Overdue Amount" value={`₹${stats.overdueAmount.toLocaleString()}`} sub="Past due dates" color="text-red-500" icon={ShieldAlert} />
        <StatCard label="This Month" value={`₹${stats.thisMonth.toLocaleString()}`} sub="April 2026" color="text-green-500" icon={CreditCard} />
        <StatCard label="Students Due" value={stats.studentsDue} sub="Action required" color="text-text-slate" icon={Users} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* 2. Collection Trend */}
        <Card className="lg:col-span-2 p-10 border-none shadow-soft rounded-[40px] bg-white">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-black text-text-slate tracking-tight">Monthly Fee Collection</h3>
              <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">Jan – Apr 2026 Stacked Analysis</p>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900, fill: '#94A3B8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900, fill: '#94A3B8'}} />
                <Tooltip cursor={{fill: '#F8FAFC'}} contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '10px', fontWeight: 'bold' }} />
                <Bar dataKey="collected" name="Collected" fill="#5E4E99" radius={[6, 6, 0, 0]} />
                <Bar dataKey="pending" name="Pending" fill="#E2E8F0" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* 3. Payment Modes */}
        <Card className="p-10 border-none shadow-soft rounded-[40px] bg-white flex flex-col items-center">
          <div className="w-full mb-8">
            <h3 className="text-xl font-black text-text-slate tracking-tight">Payment Modes</h3>
            <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">Share of collection</p>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                  {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full mt-4">
            {pieData.map(item => (
              <div key={item.name} className="flex flex-col">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[10px] font-black text-gray-400 uppercase">{item.name}</span>
                </div>
                <span className="font-black text-text-slate ml-4">₹{(item.value / 1000).toFixed(0)}K</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* 4. Batch Progress */}
        <Card className="p-10 border-none shadow-soft rounded-[40px] bg-white">
          <h3 className="text-xl font-black text-text-slate tracking-tight mb-8">Collection by Batch</h3>
          <div className="space-y-6">
            <BatchProgress label="Batch A" current={76500} total={81000} color="#5E4E99" />
            <BatchProgress label="Batch B" current={85000} total={90000} color="#1D9E75" />
            <BatchProgress label="Batch C" current={77000} total={99000} color="#D85A30" />
            <BatchProgress label="Batch D" current={49000} total={56000} color="#BA7517" />
            <BatchProgress label="Batch E" current={22500} total={36000} color="#BA7517" />
          </div>
        </Card>

        {/* 5. Overdue Alerts */}
        <Card className="p-10 border-2 border-red-50 shadow-soft rounded-[40px] bg-white">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-red-500 tracking-tight flex items-center gap-3">
              <AlertCircle className="w-6 h-6" /> Overdue Payments
            </h3>
            <Badge variant="Inactive" className="px-3">4 Students</Badge>
          </div>
          <div className="space-y-4">
            {overdueStudents.map(student => (
              <div key={student.id} className="flex items-center justify-between p-4 rounded-2xl bg-red-50/30 group hover:bg-red-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-red-100 flex items-center justify-center font-black text-red-500 text-xs shadow-sm">
                    {student.studentName.charAt(0)}
                  </div>
                  <div>
                    <h5 className="text-sm font-black text-text-slate">{student.studentName}</h5>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{student.batchName} • {student.month}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-red-500">₹{student.balance.toLocaleString()}</p>
                  <p className="text-[9px] font-black text-gray-300 uppercase">70 Days Late</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 h-12 rounded-xl bg-red-500 text-white font-black uppercase tracking-widest text-[10px] shadow-lg shadow-red-200 hover:bg-red-600 transition-all">
            Send All Reminders
          </button>
        </Card>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, sub, color, icon: Icon }: any) => (
  <Card className="p-6 border-none shadow-soft rounded-[32px] bg-white group hover:shadow-soft-lg transition-all duration-300">
    <div className="w-12 h-12 rounded-2xl bg-bg-soft flex items-center justify-center text-brand-blue mb-4 group-hover:bg-brand-blue group-hover:text-white transition-all duration-500">
      <Icon className="w-6 h-6" />
    </div>
    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">{label}</p>
    <h3 className={`text-2xl font-black tracking-tight ${color}`}>{value}</h3>
    <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mt-1">{sub}</p>
  </Card>
);

const BatchProgress = ({ label, current, total, color }: any) => {
  const percent = Math.round((current / total) * 100);
  const barColor = percent >= 85 ? 'bg-green-500' : percent >= 70 ? 'bg-amber-400' : 'bg-red-500';

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-end">
        <span className="text-xs font-black text-text-slate">{label}</span>
        <span className="text-[10px] font-black text-gray-400">₹{current.toLocaleString()} / ₹{total.toLocaleString()} ({percent}%)</span>
      </div>
      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full transition-all duration-1000 ${barColor}`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
};

const ShieldAlert = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
);
