'use client';
import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Plus, Edit2, Check, X, Info, HelpCircle, 
  ChevronRight, Calculator, Star, Zap, Building2
} from 'lucide-react';
import { plans, PlanConfig } from '@/lib/subscriptions';

export default function PlansPage() {
  const [billingCycle, setBillingCycle] = useState<'Monthly' | 'Annual'>('Annual');
  const [calcPlan, setCalcPlan] = useState<PlanConfig>(plans[2]); // Default Pro
  const [calcBilling, setCalcBilling] = useState<'Monthly' | 'Annual'>('Annual');

  const calcResults = useMemo(() => {
    const price = calcBilling === 'Annual' ? calcPlan.annualPrice : calcPlan.monthlyPrice;
    const gst = Math.round(price * 0.18);
    const total = price + gst;
    const monthlyEquiv = calcBilling === 'Annual' ? Math.round(price / 12) : price;
    const savings = calcBilling === 'Annual' ? (calcPlan.monthlyPrice * 12) - calcPlan.annualPrice : 0;
    
    return { price, gst, total, monthlyEquiv, savings };
  }, [calcPlan, calcBilling]);

  return (
    <div className="flex flex-col gap-10 animate-in fade-in duration-700 pb-20">
      
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-text-slate tracking-tight mb-2">Plans & Pricing</h1>
          <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Configure subscription plans for EzzyCoach</p>
        </div>
        <Button className="rounded-2xl px-6 py-6 font-black uppercase tracking-widest text-xs gap-3 shadow-glow h-14">
          <Plus className="w-5 h-5" /> Add Plan
        </Button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((p) => (
          <Card key={p.id} className="p-6 border-none shadow-soft hover:shadow-soft-lg transition-all flex items-center gap-6 group">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-6 text-white font-black text-xl shadow-sm" style={{ backgroundColor: p.color }}>
              {p.name.charAt(0)}
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{p.name} Plan</p>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-black text-text-slate tracking-tight">{p.customersCount} Customers</span>
                <span className="text-xs font-black text-brand-blue uppercase tracking-tighter">₹{p.mrr.toLocaleString()} mrr</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Billing Toggle */}
      <div className="flex flex-col items-center gap-4">
        <div className="bg-white p-1.5 rounded-2xl shadow-soft border border-gray-100 flex items-center gap-2">
          <button 
            onClick={() => setBillingCycle('Monthly')}
            className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${billingCycle === 'Monthly' ? 'bg-text-slate text-white shadow-soft' : 'text-gray-400 hover:text-text-slate'}`}
          >
            Monthly
          </button>
          <button 
            onClick={() => setBillingCycle('Annual')}
            className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${billingCycle === 'Annual' ? 'bg-brand-blue text-white shadow-glow' : 'text-gray-400 hover:text-brand-blue'}`}
          >
            Annual
          </button>
        </div>
        <p className="text-[10px] font-black text-brand-blue uppercase tracking-[0.2em] animate-pulse">Save up to 17% with annual billing ✦</p>
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div key={plan.id} className="relative group">
            {plan.isPopular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 px-6 py-2 bg-brand-blue rounded-full text-white text-[10px] font-black uppercase tracking-widest shadow-glow animate-bounce">
                Most Popular ★
              </div>
            )}
            <Card className={`p-8 h-full flex flex-col border-none shadow-soft transition-all duration-500 hover:shadow-glow-blue relative overflow-hidden ${plan.isPopular ? 'ring-2 ring-brand-blue' : ''}`}>
              {/* Highlight Background */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150" style={{ backgroundColor: plan.color }} />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: plan.color }}>
                    {plan.name === 'Free' ? <Zap className="w-6 h-6" /> : plan.name === 'Basic' ? <Building2 className="w-6 h-6" /> : <Star className="w-6 h-6" />}
                  </div>
                  <button className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-brand-blue transition-colors flex items-center gap-1">
                    <Edit2 className="w-3.5 h-3.5" /> Edit
                  </button>
                </div>
                
                <h3 className="text-3xl font-black text-text-slate tracking-tight mb-4 uppercase">{plan.name}</h3>
                
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-text-slate tracking-tight">₹{billingCycle === 'Annual' ? plan.annualPrice.toLocaleString() : plan.monthlyPrice.toLocaleString()}</span>
                    <span className="text-sm font-black text-gray-400 uppercase tracking-widest">/ {billingCycle === 'Annual' ? 'year' : 'month'}</span>
                  </div>
                  {billingCycle === 'Annual' && plan.annualDiscount > 0 && (
                    <p className="text-xs font-bold text-green-500 mt-1">Save {plan.annualDiscount}% vs monthly billing</p>
                  )}
                </div>

                <div className="space-y-4 mb-10 pt-8 border-t border-gray-100">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Plan Limits</p>
                  <LimitItem label="Students" value={plan.maxStudents.toString()} />
                  <LimitItem label="Batches" value={plan.maxBatches.toString()} />
                  <LimitItem label="Teachers" value={plan.maxTeachers.toString()} />
                </div>

                <div className="space-y-4 mb-10">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Core Features</p>
                  {plan.features.slice(0, 6).map((feat, i) => (
                    <div key={i} className="flex items-center gap-3">
                      {feat.included ? (
                        <Check className="w-4 h-4 text-green-500 shrink-0" />
                      ) : (
                        <X className="w-4 h-4 text-gray-200 shrink-0" />
                      )}
                      <span className={`text-xs font-bold transition-all ${feat.included ? 'text-gray-600' : 'text-gray-300 italic'}`}>{feat.name}</span>
                    </div>
                  ))}
                  <button className="text-[10px] font-black text-brand-blue hover:underline tracking-widest uppercase mt-4">View All Features</button>
                </div>
                
                <Button className={`w-full h-14 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${plan.name === 'Pro' ? 'bg-brand-blue text-white shadow-glow' : 'bg-slate-soft text-text-slate hover:bg-gray-100 shadow-none border border-gray-100'}`}>
                  Manage Plan
                </Button>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Feature Comparison Table */}
      <div className="space-y-6">
        <h2 className="text-xl font-black text-text-slate tracking-tight uppercase">Feature Comparison</h2>
        <div className="bg-white rounded-[32px] shadow-soft border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-50 bg-slate-soft/30 uppercase text-[10px] font-black text-gray-400 tracking-[0.2em]">
                <th className="px-10 py-8">Feature Name</th>
                {plans.map(p => (
                  <th key={p.id} className="px-6 py-8 text-center">{p.name}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {['Students', 'Batches', 'Teachers'].map((limit) => (
                <tr key={limit} className="group hover:bg-slate-soft/40 transition-all">
                  <td className="px-10 py-6 text-sm font-black text-text-slate">{limit} Limit</td>
                  {plans.map(p => (
                    <td key={p.id} className="px-6 py-6 text-center text-sm font-bold text-gray-600">
                      {p[`max${limit as 'Students'|'Batches'|'Teachers'}`]}
                    </td>
                  ))}
                </tr>
              ))}
              {plans[2].features.map((feat, idx) => (
                <tr key={idx} className="group hover:bg-slate-soft/40 transition-all">
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-gray-600">{feat.name}</span>
                      <HelpCircle className="w-3 h-3 text-gray-300 cursor-help" />
                    </div>
                  </td>
                  {plans.map(p => (
                    <td key={p.id} className="px-6 py-6 text-center">
                      <div className="inline-flex">
                        {p.features.find(f => f.name === feat.name)?.included ? (
                          <div className="w-6 h-6 rounded-lg bg-green-50 flex items-center justify-center text-green-500">
                            <Check className="w-4 h-4" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-lg bg-gray-50 flex items-center justify-center text-gray-200">
                            <X className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pricing Calculator Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <Card className="p-10 border-none shadow-soft bg-white rounded-[40px] flex gap-10">
          <div className="flex-1 space-y-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-brand-blue/10 rounded-2xl flex items-center justify-center text-brand-blue">
                <Calculator className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-text-slate tracking-tight uppercase">Pricing Calculator</h3>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Select Plan</p>
                <div className="grid grid-cols-3 gap-3">
                  {plans.map(p => (
                    <button 
                      key={p.id}
                      onClick={() => setCalcPlan(p)}
                      className={`py-3 rounded-xl text-xs font-black uppercase tracking-widest border transition-all ${calcPlan.id === p.id ? 'bg-brand-blue text-white border-brand-blue shadow-glow' : 'bg-white text-gray-400 border-gray-100 hover:border-brand-blue/20'}`}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Billing Cycle</p>
                <div className="flex gap-3">
                  {['Monthly', 'Annual'].map(period => (
                    <button 
                      key={period}
                      onClick={() => setCalcBilling(period as any)}
                      className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest border transition-all ${calcBilling === period ? 'bg-text-slate text-white border-text-slate shadow-soft' : 'bg-white text-gray-400 border-gray-100 hover:border-text-slate/20'}`}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest pl-2 pr-2">
                  <p className="text-gray-400">Student Capacity</p>
                  <p className="text-brand-blue">{calcPlan.maxStudents} Limit</p>
                </div>
                <div className="p-4 bg-bg-soft/50 rounded-2xl border border-gray-100 flex items-center justify-between">
                  <span className="text-sm font-black text-text-slate">Recommended for:</span>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-tighter">Large Institutes</span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-px bg-gray-100" />

          <div className="flex-1 flex flex-col justify-center gap-6">
            <div className="p-8 rounded-[32px] bg-slate-soft/50 border border-gray-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-blue/5 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-110" />
              
              <div className="space-y-4 relative z-10">
                <div className="flex justify-between items-center">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Base Price</p>
                  <p className="text-sm font-black text-text-slate">₹{calcResults.price.toLocaleString()}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">GST (18%)</p>
                  <p className="text-sm font-black text-text-slate">₹{calcResults.gst.toLocaleString()}</p>
                </div>
                {calcResults.savings > 0 && (
                  <div className="flex justify-between items-center p-2 rounded-lg bg-green-50 border border-green-100">
                    <p className="text-[10px] font-black text-green-600 uppercase tracking-widest">Annual Savings</p>
                    <p className="text-[10px] font-black text-green-600">₹{calcResults.savings.toLocaleString()}</p>
                  </div>
                )}
                <div className="h-px bg-brand-blue/10 my-2" />
                <div className="flex justify-between items-end">
                  <p className="text-[11px] font-black text-brand-blue uppercase tracking-widest mb-1">Total Amount</p>
                  <p className="text-4xl font-black text-brand-blue tracking-tighter leading-none">₹{calcResults.total.toLocaleString()}</p>
                </div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right mt-2">
                  ≈ ₹{calcResults.monthlyEquiv.toLocaleString()} / month
                </p>
              </div>
            </div>
            
            <Button className="w-full py-6 rounded-2xl font-black uppercase tracking-widest text-xs h-16 shadow-glow">
              Send Proposal Preview
            </Button>
          </div>
        </Card>

        <div className="space-y-6 flex flex-col">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-600 font-black">
              <Info className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-text-slate tracking-tight uppercase">Pricing Policy</h3>
          </div>
          <p className="text-sm font-bold text-gray-400 leading-relaxed px-2">
            All prices mentioned above are exclusive of Taxes. GST (18%) is applied at the time of invoice generation. Multi-year discounts are available upon request through the Custom Plan option.
          </p>
          <div className="flex-1 grid grid-cols-2 gap-4">
             <PolicyItem icon={<Check className="w-4 h-4" />} text="100% Secure Payments" />
             <PolicyItem icon={<Check className="w-4 h-4" />} text="Instant Activation" />
             <PolicyItem icon={<Check className="w-4 h-4" />} text="24/7 Support for Pro" />
             <PolicyItem icon={<Check className="w-4 h-4" />} text="Zero Hidden Charges" />
          </div>
        </div>
      </div>

    </div>
  );
}

const LimitItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-center group/item">
    <div className="flex items-center gap-3">
      <div className="w-1.5 h-1.5 rounded-full bg-brand-blue/30 group-hover/item:scale-150 transition-transform" />
      <span className="text-sm font-bold text-gray-500">{label}</span>
    </div>
    <span className="text-sm font-black text-text-slate leading-none">{value === 'Unlimited' ? '∞' : value}</span>
  </div>
);

const PolicyItem = ({ icon, text }: any) => (
  <div className="bg-white p-6 rounded-[24px] border border-gray-100 flex items-center gap-4 transition-all hover:translate-y-[-2px] hover:shadow-soft">
    <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-600">
      {icon}
    </div>
    <span className="text-xs font-black text-text-slate uppercase tracking-tight">{text}</span>
  </div>
);
