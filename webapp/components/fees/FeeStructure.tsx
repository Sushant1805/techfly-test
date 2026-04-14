'use client';
import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Settings2, Plus, Edit2, Trash2, 
  HelpCircle, Info, Target, Calculator,
  UserPlus, Gift, ShieldCheck, History
} from 'lucide-react';
import { feeStructures, concessions } from '@/lib/mockData';

export const FeeStructure: React.FC = () => {
  return (
    <div className="space-y-12 pb-20">
      {/* 1. Batch-wise Fee Structure */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <div>
            <h3 className="text-xl font-black text-text-slate tracking-tight">Standard Fee Configuration</h3>
            <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">Defined charges per batch for 2026 session</p>
          </div>
          <Button variant="outline" className="h-11 px-6 rounded-xl border-gray-100 font-black text-[10px] uppercase tracking-widest gap-2">
            <Settings2 className="w-4 h-4" /> Global Settings
          </Button>
        </div>

        <Card className="border-none shadow-soft rounded-[40px] overflow-hidden bg-white">
          <table className="w-full text-left font-bold">
            <thead className="bg-bg-soft/30 h-16 border-b border-gray-50">
              <tr>
                <th className="pl-10 text-[10px] font-black text-gray-400 uppercase tracking-widest">Batch Group</th>
                <th className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Standard</th>
                <th className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Monthly Fee</th>
                <th className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Admission Fee</th>
                <th className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Exam Fee</th>
                <th className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Annual</th>
                <th className="pr-10 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {feeStructures.map(f => (
                <tr key={f.batchId} className="h-20 hover:bg-bg-soft/10 transition-colors group">
                  <td className="pl-10">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-brand-blue/5 flex items-center justify-center font-black text-brand-blue text-xs shadow-inner">
                        {f.batchName.charAt(f.batchName.length - 1)}
                      </div>
                      <span className="text-text-slate text-sm">{f.batchName}</span>
                    </div>
                  </td>
                  <td><Badge variant="default" className="bg-white border-gray-100 text-gray-500">{f.standard}</Badge></td>
                  <td className="text-text-slate">₹{f.monthlyFee.toLocaleString()}</td>
                  <td className="text-gray-400 italic">₹{f.admissionFee.toLocaleString()}</td>
                  <td className="text-gray-400 italic">₹{f.examFee.toLocaleString()}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <span className="text-text-slate font-black">₹{(f.monthlyFee * 12 + f.admissionFee + f.examFee).toLocaleString()}</span>
                      <div className="w-6 h-6 rounded-lg bg-green-50 flex items-center justify-center text-green-500">
                        <Calculator className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </td>
                  <td className="pr-10 text-right">
                    <Button variant="ghost" size="sm" className="h-9 px-4 rounded-xl text-[10px] font-black uppercase text-brand-blue hover:bg-brand-blue/5 border-none shadow-none">
                      <Edit2 className="w-3.5 h-3.5 mr-2" /> Edit Structure
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </section>

      {/* 2. Concession Management */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <div>
            <h3 className="text-xl font-black text-text-slate tracking-tight">Scholarships & Concessions</h3>
            <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">Special discounts applied to student installments</p>
          </div>
          <Button className="h-11 px-8 rounded-xl bg-brand-blue shadow-lg shadow-brand-blue/20 font-black text-[10px] uppercase tracking-widest gap-2 group">
            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" /> Grant Concession
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <Card className="lg:col-span-2 border-none shadow-soft rounded-[40px] overflow-hidden bg-white">
            <table className="w-full text-left">
              <thead className="bg-bg-soft/30 h-16 border-b border-gray-50">
                <tr>
                  <th className="pl-10 text-[10px] font-black text-gray-400 uppercase tracking-widest">Student</th>
                  <th className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Concession</th>
                  <th className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Discount</th>
                  <th className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Reason</th>
                  <th className="pr-10 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {concessions.map(c => (
                  <tr key={c.id} className="h-20 hover:bg-bg-soft/5 transition-colors group">
                    <td className="pl-10">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-brand-blue flex items-center justify-center font-black text-white text-[10px] shadow-lg shadow-brand-blue/20">
                          {c.studentName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-text-slate leading-none mb-1 text-sm">{c.studentName}</p>
                          <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest">{c.batchId}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <Badge variant="Active" className="bg-green-50 text-green-600 border-none gap-2 px-3 py-1.5 font-black text-[9px] uppercase">
                        <Gift className="w-3 h-3" /> {c.type}
                      </Badge>
                    </td>
                    <td><span className="font-black text-text-slate">{c.value}{c.type === 'Percentage' ? '%' : ' ₹'} off</span></td>
                    <td><span className="text-xs font-bold text-gray-400">{c.reason}</span></td>
                    <td className="pr-10 text-right font-black">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-gray-300 hover:text-brand-blue hover:bg-brand-blue/5 rounded-lg"><Edit2 className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          {/* Quick Config Card */}
          <div className="space-y-6">
            <Card className="p-8 border-none shadow-soft rounded-[40px] bg-gradient-to-br from-brand-blue to-[#4D3F87] text-white">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-black tracking-tight leading-none">Security Policy</h4>
              </div>
              <ul className="space-y-4">
                <PolicyItem icon={Target} label="Lock Structure" sub="Prevents editing for past invoices" checked />
                <PolicyItem icon={Calculator} label="Rounding Rule" sub="Auto-round fees to nearest ₹10" checked />
                <PolicyItem icon={History} label="Audit Logs" sub="Track all fee-related changes" checked />
              </ul>
              <button className="w-full mt-10 h-14 rounded-2xl bg-white text-brand-blue font-black uppercase tracking-widest text-xs shadow-xl shadow-brand-blue/30 hover:bg-white/90 transition-all">
                Update Policies
              </button>
            </Card>

            <Card className="p-8 border-none shadow-soft rounded-[40px] bg-amber-50 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100 rounded-full flex items-center justify-center -translate-y-12 translate-x-12 opacity-50">
                <HelpCircle className="w-16 h-16 text-amber-500" />
               </div>
               <h4 className="text-lg font-black text-amber-900 tracking-tight leading-none mb-2">Need Help?</h4>
               <p className="text-xs font-bold text-amber-700/70 mb-6 leading-relaxed">Changes to fee structures only affect new invoices. To update existing dues, please use the Bulk Edit tool.</p>
               <Button variant="ghost" className="h-10 px-0 text-amber-900 font-black uppercase tracking-widest text-[9px] hover:bg-transparent hover:underline underline-offset-4">Read Documentation</Button>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

const PolicyItem = ({ icon: Icon, label, sub, checked }: any) => (
  <li className="flex items-center justify-between group cursor-pointer">
    <div className="flex items-center gap-4">
      <Icon className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity" />
      <div>
        <p className="text-xs font-black tracking-tight leading-none mb-1">{label}</p>
        <p className="text-[9px] font-bold opacity-40 uppercase tracking-widest">{sub}</p>
      </div>
    </div>
    <div className={`w-10 h-5 rounded-full p-1 transition-all ${checked ? 'bg-white' : 'bg-white/10'}`}>
      <div className={`w-3 h-3 rounded-full transition-all ${checked ? 'ml-5 bg-brand-blue' : 'ml-0 bg-white/30'}`} />
    </div>
  </li>
);
