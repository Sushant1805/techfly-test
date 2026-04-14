'use client';
import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Search, Filter, Download, FileText, 
  ArrowUpRight, ArrowDownRight, Printer, Share2, MoreVertical, Eye
} from 'lucide-react';
import { invoices, Invoice } from '@/lib/subscriptions';
import { 
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { InvoiceDetailModal, GenerateInvoiceModal } from '@/components/subscriptions/InvoiceModals';
import { CustomerAvatar } from '@/components/ui/CustomerAvatar';

const chartData = [
  { name: 'Jan', base: 28000, gst: 5040, total: 33040, cumulative: 33040 },
  { name: 'Feb', base: 18000, gst: 3240, total: 21240, cumulative: 54280 },
  { name: 'Mar', base: 28000, gst: 5040, total: 33040, cumulative: 87320 },
  { name: 'Apr', base: 10000, gst: 1800, total: 11800, cumulative: 99120 },
];

export default function InvoicesPage() {
  const [search, setSearch] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);

  const filteredInvoices = useMemo(() => {
    return invoices.filter(inv => {
      const searchStr = `${inv.invoiceNumber} ${inv.customerName} ${inv.plan}`.toLowerCase();
      return searchStr.includes(search.toLowerCase());
    });
  }, [search]);

  const stats = useMemo(() => {
    const total = 358800;
    const collected = 333800;
    const pending = total - collected;
    return { total, collected, pending, collectedRate: 93 };
  }, []);

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-700 pb-20">
      
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-black text-text-slate tracking-tight mb-2">Invoices</h1>
          <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">All invoices across all customers</p>
        </div>
        <Button 
          onClick={() => setIsGenerateModalOpen(true)}
          className="rounded-2xl px-6 py-6 font-black uppercase tracking-widest text-xs gap-3 shadow-glow h-14 bg-brand-blue"
        >
          <FileText className="w-5 h-5" /> Generate Invoice
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          label="Total Invoiced" 
          value={`₹${stats.total.toLocaleString()}`} 
          subValue="(all time)" 
          icon={<FileText className="text-brand-blue" />}
          color="bg-brand-blue/10"
        />
        <KPICard 
          label="Collected" 
          value={`₹${stats.collected.toLocaleString()}`} 
          subValue={`${stats.collectedRate}% rate`} 
          icon={<div className="text-green-500 text-xl font-black">✓</div>}
          color="bg-green-500/10"
        />
        <KPICard 
          label="Pending" 
          value="₹18,000" 
          subValue="2 invoices" 
          icon={<div className="text-orange-500 text-xl font-black">!</div>}
          color="bg-orange-500/10"
        />
        <KPICard 
          label="Overdue" 
          value="₹7,000" 
          subValue="1 invoice" 
          icon={<div className="text-red-500 text-xl font-black">✗</div>}
          color="bg-red-500/10"
        />
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex-1 min-w-[300px] relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-blue transition-colors" />
          <input 
            type="text"
            placeholder="Search by invoice #, customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-gray-100 h-16 pl-14 pr-6 rounded-[24px] text-sm font-bold shadow-soft transition-all focus:outline-none focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue/20"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-16 px-8 rounded-[22px] border-gray-100 bg-white font-black uppercase tracking-widest text-[11px] gap-2 shadow-soft">
            <Filter className="w-4 h-4" /> Filters
          </Button>
          <Button variant="outline" className="h-16 px-8 rounded-[22px] border-gray-100 bg-white font-black uppercase tracking-widest text-[11px] gap-2 shadow-soft">
            <Download className="w-4 h-4" /> Export CSV
          </Button>
        </div>
      </div>

      {/* Summary Strip */}
      <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-2">
        <p>Showing <span className="text-brand-blue font-black">{filteredInvoices.length} invoices</span></p>
        <div className="w-1 h-1 rounded-full bg-gray-200" />
        <p>Filtered Total: <span className="text-brand-blue font-black">₹{filteredInvoices.reduce((acc, i) => acc + i.totalAmount, 0).toLocaleString()}</span></p>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-[32px] shadow-soft border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-b border-gray-50 uppercase text-[10px] font-black text-gray-400 tracking-[0.2em] bg-slate-soft/30">
                <th className="pl-10 py-6">Invoice #</th>
                <th className="px-6 py-6">Customer</th>
                <th className="px-6 py-6 text-center">Date</th>
                <th className="px-6 py-6 text-center">Due Date</th>
                <th className="px-6 py-6">Plan</th>
                <th className="px-6 py-6 text-right">Amount</th>
                <th className="px-6 py-6 text-center">Status</th>
                <th className="px-10 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="group hover:bg-slate-soft/40 transition-all h-20">
                  <td className="pl-10 py-4">
                    <button 
                      onClick={() => { setSelectedInvoice(inv); setIsDetailOpen(true); }}
                      className="text-sm font-black text-brand-blue hover:underline tracking-tight"
                    >
                      {inv.invoiceNumber}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <CustomerAvatar name={inv.customerName} initials={inv.ownerName.charAt(0)} size="xs" />
                      <div>
                        <p className="text-xs font-black text-text-slate leading-none">{inv.customerName}</p>
                        <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase">Rajesh Mehta</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <p className="text-xs font-bold text-gray-500 uppercase">{inv.date}</p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <p className="text-xs font-bold text-gray-500 uppercase">{inv.dueDate}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1 items-start">
                      <Badge variant={inv.plan === 'Pro' ? 'purple' : 'info'} className="text-[9px] px-2 py-0.5">{inv.plan}</Badge>
                      <span className="text-[9px] font-black text-gray-300 uppercase tracking-tighter">{inv.billingCycle}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="text-sm font-black text-text-slate leading-none">₹{inv.totalAmount.toLocaleString()}</p>
                    <p className="text-[10px] font-bold text-gray-300 mt-1 uppercase tracking-tighter">₹{inv.cgst + inv.sgst} gst</p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Badge variant={inv.status === 'Paid' ? 'success' : 'warning'} className="text-[10px]">{inv.status}</Badge>
                    {inv.status === 'Paid' && <p className="text-[8px] font-bold text-gray-400 mt-1 uppercase">On 02 Jan</p>}
                  </td>
                  <td className="px-10 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button 
                        onClick={() => { setSelectedInvoice(inv); setIsDetailOpen(true); }}
                        className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-brand-blue transition-all"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-brand-blue transition-all">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-brand-blue transition-all">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Monthly Revenue Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 p-10 border-none shadow-soft h-[500px] flex flex-col">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-xl font-black text-text-slate tracking-tight uppercase mb-1">Revenue Breakdown by Month</h2>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Invoiced Amount vs GST Component</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-brand-blue" />
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Base</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-gray-200" />
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">GST</span>
              </div>
            </div>
          </div>
          
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 900, fill: '#94A3B8' }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 900, fill: '#94A3B8' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
                    padding: '16px' 
                  }}
                  itemStyle={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase' }}
                />
                <Bar dataKey="base" fill="#0052FF" radius={[4, 4, 0, 0]} barSize={40} stackId="a" />
                <Bar dataKey="gst" fill="#E2E8F0" radius={[4, 4, 0, 0]} barSize={40} stackId="a" />
                <Line 
                  type="monotone" 
                  dataKey="cumulative" 
                  stroke="#5E4E99" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#5E4E99', strokeWidth: 2, stroke: '#fff' }} 
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-8 border-none shadow-soft flex flex-col justify-center gap-6 group hover:translate-y-[-4px] transition-all bg-brand-blue text-white shadow-glow">
             <p className="text-[10px] font-black text-white/60 uppercase tracking-[0.2em]">Total Grand Total</p>
             <h3 className="text-4xl font-black tracking-tighter leading-none">₹99,120</h3>
             <div className="flex items-center gap-2 text-[10px] font-black uppercase bg-white/10 p-3 rounded-xl">
               <ArrowUpRight className="w-4 h-4" /> +12% growth vs last qtr
             </div>
          </Card>
          
          <Card className="p-8 border-none shadow-soft flex flex-col gap-6">
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Quick Summary</p>
             <div className="space-y-4">
                <SummaryItem label="Net Base" value="₹84,000" />
                <SummaryItem label="Total GST" value="₹15,120" />
                <SummaryItem label="Avg Per Inv" value="₹5,506" />
             </div>
          </Card>

          <Button variant="outline" className="w-full h-16 rounded-2xl border-dashed font-black uppercase tracking-widest text-[11px] gap-2">
            <Share2 className="w-4 h-4" /> Share Revenue Report
          </Button>
        </div>
      </div>

      <InvoiceDetailModal 
        invoice={selectedInvoice}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />

      <GenerateInvoiceModal 
        isOpen={isGenerateModalOpen}
        onClose={() => setIsGenerateModalOpen(false)}
      />

    </div>
  );
}

const KPICard = ({ label, value, subValue, icon, color }: any) => (
  <Card className="p-6 border-none shadow-soft flex flex-col justify-between group cursor-pointer hover:shadow-soft-lg transition-all relative overflow-hidden">
    <div className="flex items-center gap-4 mb-4">
      <div className={`p-3 rounded-xl ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</p>
        <p className="text-[11px] font-black text-text-slate mt-0.5">{subValue}</p>
      </div>
    </div>
    <p className="text-3xl font-black text-text-slate tracking-tighter">{value}</p>
  </Card>
);

const SummaryItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-center group/item">
    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</span>
    <span className="text-sm font-black text-text-slate">{value}</span>
  </div>
);
