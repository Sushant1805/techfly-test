'use client';
import React, { useState } from 'react';
import { X, Edit, Phone, Mail, MessageSquare, Plus, ArrowUpRight, CheckCircle2, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CustomerAvatar } from '@/components/ui/CustomerAvatar';
import { Customer } from '@/lib/customers';

interface CustomerPanelProps {
  customer: Customer | null;
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'Overview' | 'Subscription' | 'Invoices' | 'Usage' | 'Support' | 'Activity' | 'Notes';

import { ChangePlanModal } from './ChangePlanModal';
import { InvoiceDetailModal } from './InvoiceDetailModal';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import { SendEmailModal } from './SendEmailModal';
import { SuspendAccountModal } from './SuspendAccountModal';

export const CustomerPanel = ({ customer, isOpen, onClose }: CustomerPanelProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('Overview');
  const [isChangePlanOpen, setIsChangePlanOpen] = useState(false);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const [isSuspendOpen, setIsSuspendOpen] = useState(false);

  if (!customer) return null;

  const tabs: TabType[] = ['Overview', 'Subscription', 'Invoices', 'Usage', 'Support', 'Activity', 'Notes'];

  const getStatusColor = (status: Customer['planStatus']) => {
    switch (status) {
      case 'Active': return 'bg-green-500';
      case 'Trial': return 'bg-orange-500';
      case 'Expired': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <>
      <aside 
        className={`
          h-full w-[500px] bg-white border-l border-gray-100 flex flex-col shadow-2xl relative transition-all duration-300 ease-in-out z-20
          ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 absolute right-0 pointer-events-none'}
        `}
      >
        {/* Top Accent Bar */}
        <div className={`h-1.5 w-full ${getStatusColor(customer.planStatus)}`} />

        {/* Header */}
        <div className="p-8 pb-6 shrink-0 relative">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-start gap-6 mb-8">
            <CustomerAvatar name={customer.instituteName} initials={customer.ownerAvatar} size="xl" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-xl font-black text-text-slate tracking-tight truncate">{customer.instituteName}</h2>
                <button className="p-1.5 text-gray-400 hover:text-brand-blue transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4">
                {customer.ownerName} · {customer.city}, {customer.state}
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant={customer.plan as any} className="font-black shadow-sm">{customer.plan}</Badge>
                <Badge variant={getStatusColor(customer.planStatus) === 'bg-green-500' ? 'Active' : 'Warning'} className="font-black shadow-sm">
                  {customer.planStatus}
                </Badge>
                {customer.tags.map(t => (
                  <span key={t} className="px-2 py-0.5 rounded-full bg-slate-100 text-[9px] font-black text-slate-500 uppercase tracking-tighter shadow-sm border border-slate-200">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8 border-y border-gray-50 py-6">
            <div className="text-center">
              <p className="text-sm font-black text-text-slate">₹{customer.mrr.toLocaleString()}</p>
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">MRR</p>
            </div>
            <div className="text-center border-x border-gray-50">
              <p className="text-sm font-black text-text-slate">{customer.startDate.split(' ').slice(1).join(' ')}</p>
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">Member Since</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-black text-orange-500">{customer.currentPeriodEnd.split(' ').slice(1).join(' ')}</p>
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">Expires</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <QuickAction icon={Phone} label="Call" color="bg-brand-blue" />
            <QuickAction 
              icon={Mail} 
              label="Email" 
              color="bg-emerald-500" 
              onClick={() => setIsEmailOpen(true)}
            />
            <QuickAction icon={MessageSquare} label="WhatsApp" color="bg-green-500" />
            <QuickAction icon={Plus} label="Note" color="bg-amber-500" />
            <button 
              onClick={() => setIsChangePlanOpen(true)}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-slate-900 hover:bg-black text-white rounded-2xl transition-all shadow-glow group"
            >
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-widest">Upgrade Plan</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-50 px-6 shrink-0 bg-gray-50/30 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                px-4 py-4 text-[10px] font-black uppercase tracking-widest border-b-4 transition-all whitespace-nowrap
                ${activeTab === tab ? 'border-brand-blue text-brand-blue bg-white' : 'border-transparent text-gray-400 hover:text-gray-600'}
              `}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-8 bg-gray-50/20">
          {activeTab === 'Overview' && <OverviewTab customer={customer} onDelete={() => setIsDeleteOpen(true)} />}
          {activeTab === 'Subscription' && <SubscriptionTab customer={customer} onSuspend={() => setIsSuspendOpen(true)} />}
          {activeTab === 'Invoices' && <InvoicesTab customer={customer} onInvoiceClick={(inv: any) => { setSelectedInvoice(inv); setIsInvoiceOpen(true); }} />}
          {activeTab === 'Usage' && <UsageTab customer={customer} />}
          {activeTab === 'Support' && <SupportTab customer={customer} />}
          {activeTab === 'Activity' && <ActivityTab customer={customer} />}
          {activeTab === 'Notes' && <NotesTab customer={customer} />}
        </div>
      </aside>

      <ChangePlanModal 
        isOpen={isChangePlanOpen}
        onClose={() => setIsChangePlanOpen(false)}
        customer={customer}
      />

      <InvoiceDetailModal 
        isOpen={isInvoiceOpen}
        onClose={() => setIsInvoiceOpen(false)}
        invoice={selectedInvoice}
      />

      <DeleteConfirmModal 
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        customerName={customer.instituteName}
      />

      <SendEmailModal 
        isOpen={isEmailOpen}
        onClose={() => setIsEmailOpen(false)}
        customerEmail={customer.email}
      />

      <SuspendAccountModal 
        isOpen={isSuspendOpen}
        onClose={() => setIsSuspendOpen(false)}
        customerName={customer.instituteName}
      />
    </>
  );
};

// --- Sub-components & Helpers ---
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const InvoicesTab = ({ customer, onInvoiceClick }: { customer: Customer, onInvoiceClick: (inv: any) => void }) => {
  const invoiceData = [
    { id: 'INV-2026-001', date: '01 Jan 2026', amount: 11800, status: 'Paid', plan: 'Pro Annual' },
    { id: 'INV-2025-002', date: '01 Mar 2025', amount: 11800, status: 'Paid', plan: 'Pro Annual' },
    { id: 'INV-2025-001', date: '05 Jan 2025', amount: 7080, status: 'Paid', plan: 'Basic Annual' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-4 px-2">
        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Billing History</h4>
        <Button variant="ghost" className="text-[10px] font-black text-brand-blue uppercase tracking-widest h-8 px-3 rounded-lg hover:bg-brand-blue/5">
          Generate Invoice
        </Button>
      </div>
      <div className="space-y-3">
        {invoiceData.map((inv) => (
          <div 
            key={inv.id} 
            onClick={() => onInvoiceClick(inv)}
            className="bg-white p-5 rounded-3xl shadow-soft border border-white/50 flex items-center justify-between group cursor-pointer hover:border-brand-blue/20 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-brand-blue group-hover:bg-brand-blue/5 transition-all">
                <ArrowUpRight className="w-5 h-5 -rotate-45" />
              </div>
              <div>
                <p className="text-xs font-black text-text-slate leading-none mb-1">{inv.id}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{inv.date} · {inv.plan}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-black text-text-slate leading-none mb-1">₹{inv.amount.toLocaleString()}</p>
              <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded-full">Paid</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const UsageTab = ({ customer }: { customer: Customer }) => {
  const features = [
    { name: 'Attendance', status: true, usage: 'High' },
    { name: 'Fees', status: true, usage: 'Medium' },
    { name: 'Tests', status: true, usage: 'High' },
    { name: 'Timetable', status: true, usage: 'Low' },
    { name: 'AI Generator', status: true, usage: 'Medium' },
    { name: 'Analytics', status: false, usage: 'None' },
  ];

  const chartData = [
    { month: 'Jan', logins: 18, active: 22 },
    { month: 'Feb', logins: 22, active: 20 },
    { month: 'Mar', logins: 28, active: 25 },
    { month: 'Apr', logins: 12, active: 11 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white rounded-3xl p-6 shadow-soft border border-white/50">
        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-50 pb-4">Monthly Activity</h4>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }} />
              <Tooltip 
                cursor={{ fill: '#f1f5f9', radius: 8 }}
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '10px', fontWeight: 'bold' }}
              />
              <Bar dataKey="logins" fill="#5e4e99" radius={[4, 4, 0, 0]} barSize={12} />
              <Bar dataKey="active" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={12} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Feature Adoption</h4>
        <div className="bg-white rounded-3xl border border-gray-100 shadow-soft overflow-hidden">
          {features.map((f, i) => (
            <div key={i} className="p-4 border-b border-gray-50 last:border-0 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${f.status ? 'bg-emerald-50 text-emerald-500' : 'bg-gray-50 text-gray-300'}`}>
                  {f.status ? <CheckCircle2 className="w-4 h-4" /> : <X className="w-4 h-4" />}
                </div>
                <p className={`text-xs font-black ${f.status ? 'text-text-slate' : 'text-gray-300'}`}>{f.name}</p>
              </div>
              <div className="text-right">
                <p className={`text-[9px] font-black uppercase tracking-widest ${f.usage === 'High' ? 'text-emerald-500' : f.usage === 'Medium' ? 'text-brand-blue' : 'text-gray-300'}`}>
                  {f.usage} Usage
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SupportTab = ({ customer }: { customer: Customer }) => (
  <div className="space-y-6 animate-in fade-in duration-500">
    <div className="flex items-center justify-between px-2">
      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Support History</h4>
      <Button variant="ghost" className="text-[10px] font-black text-brand-blue uppercase tracking-widest h-8 px-3 rounded-lg hover:bg-brand-blue/5">
        + New Ticket
      </Button>
    </div>
    <div className="space-y-4">
      <div className="bg-white p-6 rounded-3xl shadow-soft border-l-4 border-amber-500 relative">
        <Badge className="absolute top-6 right-6 bg-amber-50 text-amber-600 border-none font-black text-[9px] uppercase tracking-widest">In Progress</Badge>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">#105 · High Priority</p>
        <h5 className="text-sm font-black text-text-slate mb-3">WhatsApp Notification Bug</h5>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-500">SM</div>
          <p className="text-[10px] font-bold text-gray-500">Assigned to Sanjay More</p>
        </div>
      </div>
      {[1, 2].map((_, i) => (
        <div key={i} className="bg-white p-5 rounded-3xl border border-gray-50 opacity-60">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">#10{4-i} · Resolved</p>
          <h5 className="text-xs font-black text-text-slate">Attendance Report Export Error</h5>
        </div>
      ))}
    </div>
  </div>
);

const ActivityTab = ({ customer }: { customer: Customer }) => {
  const activities = [
    { type: 'Login', title: 'Admin logged in', date: '11 Apr 2026, 9:42 AM', by: 'System', color: 'bg-indigo-500' },
    { type: 'AI', title: 'AI Timetable Generated', date: '10 Apr 2026, 3:15 PM', by: 'Customer', color: 'bg-purple-500' },
    { type: 'Note', title: 'Note Added by Vikram Shah', date: '01 Apr 2026, 10:00 AM', by: 'Vikram Shah', color: 'bg-amber-500' },
    { type: 'Renewal', title: 'Subscription Renewed', date: '01 Jan 2026, 12:00 AM', by: 'System', color: 'bg-emerald-500' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="relative pl-8 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-0 before:w-0.5 before:bg-gray-100">
        {activities.map((act, i) => (
          <div key={i} className="relative">
            <div className={`absolute -left-[31px] top-1.5 w-6 h-6 rounded-full border-4 border-white shadow-sm flex items-center justify-center ${act.color}`}>
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">{act.type}</p>
              <h5 className="text-sm font-black text-text-slate leading-none mb-2">{act.title}</h5>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{act.by} · {act.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const NotesTab = ({ customer }: { customer: Customer }) => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Add Internal Note</label>
        <div className="relative">
          <textarea 
            className="w-full px-5 py-4 bg-white border border-gray-100 rounded-[24px] text-xs font-bold shadow-soft focus:outline-none focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue/20 transition-all resize-none h-32 pr-12"
            placeholder="Type your note here..."
          />
          <button className="absolute bottom-4 right-4 p-2 bg-brand-blue text-white rounded-xl shadow-glow active:scale-95 transition-all">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    <div className="space-y-4">
      <div className="bg-white p-6 rounded-[32px] shadow-soft border border-white/50 border-l-4 border-amber-500">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center font-black text-[10px]">VS</div>
            <div>
              <p className="text-xs font-black text-text-slate leading-none">Vikram Shah</p>
              <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest">1 Apr 2026 · General</p>
            </div>
          </div>
          <Badge className="bg-amber-50 text-amber-600 border-none text-[9px] uppercase tracking-widest font-black">Important</Badge>
        </div>
        <p className="text-xs font-bold text-gray-500 leading-relaxed">
          Owner very satisfied, upsell opportunity for multi-branch. Schedule a call next week.
        </p>
      </div>
    </div>
  </div>
);

const QuickAction = ({ icon: Icon, label, color, onClick }: any) => (
  <button 
    onClick={onClick}
    className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white border border-gray-100 shadow-soft text-gray-400 hover:text-white hover:bg-brand-blue transition-all group"
  >
    <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
  </button>
);

const OverviewTab = ({ customer, onDelete }: { customer: Customer, onDelete: () => void }) => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <div className="bg-white rounded-3xl p-6 shadow-soft border border-white/50 space-y-4">
      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Contact Information</h4>
      <div className="grid grid-cols-1 gap-4">
        <InfoItem label="Owner Name" value={customer.ownerName} />
        <InfoItem label="Phone" value={customer.phone} icon={Phone} />
        <InfoItem label="Email" value={customer.email} icon={Mail} />
        <InfoItem label="City" value={customer.city} />
        <InfoItem label="Website" value={customer.website || 'N/A'} />
        <InfoItem label="GST Number" value={customer.gstNumber || 'N/A'} />
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <StatBox label="Total Students" value={customer.totalStudents} />
      <StatBox label="Total Batches" value={customer.totalBatches} />
      <StatBox label="Total Teachers" value={customer.totalTeachers} />
      <StatBox label="NPS Score" value={customer.npsScore ? `${customer.npsScore}/10` : 'N/A'} />
    </div>

    <div className="bg-white rounded-3xl p-6 shadow-soft border border-white/50 space-y-4">
      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Subscription Health</h4>
      <div className="space-y-4">
        <div className="flex justify-between items-center text-[11px] font-bold">
          <span className="text-gray-400">Time Remaining</span>
          <span className="text-text-slate">264 Days</span>
        </div>
        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-brand-blue rounded-full" style={{ width: '70%' }} />
        </div>
        <div className="flex justify-between text-[9px] font-black text-gray-300 uppercase tracking-tighter">
          <span>{customer.currentPeriodStart}</span>
          <span>{customer.currentPeriodEnd}</span>
        </div>
      </div>
    </div>

    <div className="pt-4 text-center">
      <button 
        onClick={onDelete}
        className="text-[10px] font-black text-red-100 uppercase tracking-[0.2em] hover:text-red-500 transition-colors"
      >
        Danger: Delete Customer Record
      </button>
    </div>
  </div>
);

const SubscriptionTab = ({ customer, onSuspend }: { customer: Customer, onSuspend: () => void }) => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <div className="bg-text-slate rounded-3xl p-8 text-white relative overflow-hidden shadow-soft">
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Active Plan</p>
            <h3 className="text-3xl font-black text-white tracking-tighter">{customer.plan}</h3>
          </div>
          <Badge variant="Active" className="bg-emerald-500/20 text-emerald-400 border-none shadow-none font-black">{customer.planStatus}</Badge>
        </div>
        <div className="space-y-3 mb-8">
          <div className="flex justify-between text-xs font-bold text-slate-400">
            <span>Billing Cycle</span>
            <span className="text-white">{customer.billingCycle}</span>
          </div>
          <div className="flex justify-between text-xs font-bold text-slate-400">
            <span>Period Amount</span>
            <span className="text-white">₹{customer.plan === 'Pro' ? '10,000' : '5,000'} / year</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" className="flex-1 bg-white/10 hover:bg-white/20 text-white border-none rounded-2xl h-12 font-black text-[10px] uppercase tracking-widest">
            Extend Subscription
          </Button>
          <Button 
            variant="ghost" 
            onClick={onSuspend}
            className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 border-none rounded-2xl h-12 font-black text-[10px] uppercase tracking-widest"
          >
            Suspend Account
          </Button>
        </div>
      </div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/20 rounded-full blur-3xl -mr-16 -mt-16" />
    </div>

    <div className="space-y-4">
      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Subscription History</h4>
      <div className="bg-white rounded-3xl border border-gray-100 shadow-soft overflow-hidden">
        {[1, 2].map((_, i) => (
          <div key={i} className="p-4 border-b border-gray-50 last:border-0 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-500 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-black text-text-slate leading-none mb-1">Renewal Successful</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Jan 2026 · Annual Billing</p>
              </div>
            </div>
            <p className="text-xs font-black text-text-slate">₹10,000</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const InfoItem = ({ label, value, icon: Icon }: any) => (
  <div className="flex items-center justify-between group">
    <div className="flex items-center gap-3">
      {Icon && <Icon className="w-3.5 h-3.5 text-gray-300 group-hover:text-brand-blue transition-colors" />}
      <span className="text-xs font-bold text-gray-400">{label}</span>
    </div>
    <span className="text-xs font-black text-text-slate">{value}</span>
  </div>
);

const StatBox = ({ label, value }: any) => (
  <div className="bg-white rounded-3xl p-5 shadow-soft border border-white/50 space-y-2 text-center">
    <p className="text-lg font-black text-text-slate">{value}</p>
    <p className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">{label}</p>
  </div>
);
