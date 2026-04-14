'use client';
import React, { useState } from 'react';
import { initialBilling, BillingInfo } from '@/lib/settingsData';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Receipt, CreditCard, CheckCircle, ArrowUpRight, 
  Download, History, Target, ShieldCheck, 
  Plus, Zap, Crown, ChevronRight
} from 'lucide-react';

export default function BillingPanel() {
  const [billing, setBilling] = useState<BillingInfo>(initialBilling);

  return (
    <div className="space-y-12 pb-10">
      {/* Current Plan Card */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-purple-600">
          <CreditCard size={20} />
          <h2 className="text-sm font-black uppercase tracking-widest">Subscription Status</h2>
        </div>
        
        <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-[48px] p-10 text-white shadow-soft-xxl relative overflow-hidden group">
           <div className="flex flex-col md:flex-row justify-between gap-10 relative z-10">
              <div className="space-y-6">
                 <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                       <Crown size={28} className="text-white" />
                    </div>
                    <div>
                       <h3 className="text-3xl font-black uppercase tracking-tight">Pro Plan</h3>
                       <p className="text-purple-100 text-[10px] font-bold uppercase tracking-widest italic opacity-80">Renewed annually • Active until Dec 2026</p>
                    </div>
                 </div>
                 <div className="flex flex-wrap gap-4">
                    <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-3xl border border-white/20">
                       <span className="text-[10px] font-black uppercase tracking-widest opacity-60 block mb-1">Total Fee Paid</span>
                       <span className="text-2xl font-black tracking-tight leading-none">₹10,000 /yr</span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-3xl border border-white/20">
                       <span className="text-[10px] font-black uppercase tracking-widest opacity-60 block mb-1">Time Remaining</span>
                       <span className="text-2xl font-black tracking-tight leading-none">264 Days</span>
                    </div>
                 </div>
              </div>

              <div className="flex flex-col gap-3 justify-end items-end">
                 <Button className="h-12 px-10 rounded-2xl bg-white text-purple-700 font-black hover:bg-gray-100 shadow-soft-lg group-hover:scale-105 transition-all text-xs gap-2">
                    <ArrowUpRight size={18} /> Upgrade Plan
                 </Button>
                 <button className="text-[10px] font-black uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity underline decoration-2">Cancel Subscription</button>
              </div>
           </div>
           
           {/* Abstract Background Elements */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
           <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2" />
        </div>
      </section>

      <hr className="border-gray-50 shrink-0" />

      {/* Plan Comparison */}
      <section className="space-y-8">
        <div className="flex items-center gap-2 text-purple-600">
          <Target size={20} />
          <h2 className="text-sm font-black uppercase tracking-widest">Compare Plans</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           <PlanCard tier="Basic" price="₹500" cycle="month" features={['Up to 50 Students', 'Core Management', 'Basic Reports', 'Email Support']} />
           <PlanCard tier="Pro" price="₹1,000" cycle="month" active={true} features={['Unlimited Students', 'Full Analytics', 'AI Timetable Gen', 'WhatsApp Automation', 'Priority Support']} />
           <PlanCard tier="Ultimate" price="₹2,500" cycle="month" features={['Everything in Pro', 'White-labeled App', 'Multi-center Access', 'Dedicated Manager', 'Custom Integrations']} />
        </div>
      </section>

      <hr className="border-gray-50 shrink-0" />

      {/* Invoice History */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-purple-600">
            <History size={20} />
            <h2 className="text-sm font-black uppercase tracking-widest">Billing History</h2>
          </div>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic font-mono">Total Spent: ₹25,000</span>
        </div>

        <div className="bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-soft">
           <table className="w-full text-left">
              <thead>
                 <tr className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest px-8">
                    <th className="px-8 py-5">Invoice #</th>
                    <th className="px-8 py-5">Date</th>
                    <th className="px-8 py-5">Amount</th>
                    <th className="px-8 py-5">Plan</th>
                    <th className="px-8 py-5">Status</th>
                    <th className="px-8 py-4 text-right">Download</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                 {billing.invoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-purple-50/20 transition-all group">
                       <td className="px-8 py-5">
                          <span className="text-xs font-black text-gray-900 group-hover:text-purple-600 transition-colors uppercase font-mono tracking-tight">{inv.invoiceNumber}</span>
                       </td>
                       <td className="px-8 py-5 font-bold text-gray-500 text-xs">{inv.date}</td>
                       <td className="px-8 py-5 font-black text-gray-900 text-xs tracking-tight">₹{inv.amount.toLocaleString()}</td>
                       <td className="px-8 py-5">
                          <Badge className="bg-gray-100 text-gray-600 text-[10px] font-black border-none uppercase px-3 py-1">{inv.plan}</Badge>
                       </td>
                       <td className="px-8 py-5">
                          <div className="flex items-center gap-1.5 text-green-600">
                             <CheckCircle size={14} />
                             <span className="text-[10px] font-black uppercase tracking-widest">{inv.status}</span>
                          </div>
                       </td>
                       <td className="px-8 py-4 text-right">
                          <button className="p-2 hover:bg-purple-100 text-purple-600 rounded-xl transition-all shadow-sm opacity-0 group-hover:opacity-100">
                             <Download size={16} />
                          </button>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </section>
    </div>
  );
}

function PlanCard({ tier, price, cycle, features, active }: { tier: string, price: string, cycle: string, features: string[], active?: boolean }) {
  return (
    <div className={`p-8 rounded-[40px] border-2 transition-all group relative overflow-hidden flex flex-col gap-8 ${
      active ? 'border-purple-600 bg-white shadow-soft-lg ring-8 ring-purple-600/5' : 'border-gray-50 bg-gray-50/20 grayscale hover:grayscale-0 hover:border-purple-200 hover:bg-white'
    }`}>
       {active && (
         <div className="absolute top-6 right-6">
            <Badge className="bg-purple-600 text-white font-black text-[9px] uppercase px-3 py-1 shadow-glow ring-4 ring-white">Current Plan</Badge>
         </div>
       )}
       
       <div className="space-y-4">
          <div className="flex items-center gap-2">
             <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${active ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-400 group-hover:bg-purple-50 group-hover:text-purple-600'} transition-all`}>
                {tier === 'Basic' ? <Zap size={20} /> : tier === 'Pro' ? <Crown size={20} /> : <ShieldCheck size={20} />}
             </div>
             <h4 className="text-lg font-black text-gray-900 group-hover:text-purple-600 transition-colors uppercase tracking-tight">{tier}</h4>
          </div>
          <div className="flex items-baseline gap-1">
             <span className="text-4xl font-black tracking-tighter text-gray-900">{price}</span>
             <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">/ {cycle}</span>
          </div>
       </div>

       <hr className="border-gray-100" />

       <div className="space-y-4 flex-1">
          {features.map((f, i) => (
             <div key={i} className="flex items-center gap-3">
                <CheckCircle size={14} className={active ? 'text-purple-600' : 'text-gray-300 group-hover:text-purple-400'} />
                <span className="text-[11px] font-bold text-gray-600 uppercase tracking-tight">{f}</span>
             </div>
          ))}
       </div>

       <Button className={`w-full h-12 rounded-2xl font-black uppercase tracking-widest text-[10px] gap-2 transition-all ${
         active ? 'bg-purple-50 text-purple-600 shadow-none' : 'bg-white border-2 border-gray-100 text-gray-700 hover:bg-purple-600 hover:text-white hover:border-purple-600'
       }`}>
          {active ? 'Manage Subscription' : `Upgrade to ${tier}`}
          {!active && <ChevronRight size={14} />}
       </Button>
    </div>
  );
}
