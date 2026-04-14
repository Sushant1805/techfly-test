'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { 
  CreditCard, IndianRupee, Clock, CheckCircle, 
  Plus, Edit, Trash2, Info, AlertCircle 
} from 'lucide-react';

export default function FeeStructurePanel() {
  const [lateFeeEnabled, setLateFeeEnabled] = useState(true);
  const [lateFeeAmount, setLateFeeAmount] = useState(50);
  const [concessions, setConcessions] = useState([
    { id: '1', name: 'Merit Concession', description: 'For top performers', enabled: true },
    { id: '2', name: 'Financial Hardship', description: 'Case by case', enabled: true },
    { id: '3', name: 'Staff Ward', description: '50% discount', enabled: true },
    { id: '4', name: 'Sibling Discount', description: '10% on second child', enabled: true }
  ]);

  const toggleConcession = (id: string) => {
    setConcessions(prev => prev.map(c => c.id === id ? { ...c, enabled: !c.enabled } : c));
  };

  const batches = [
    { id: '1', name: 'Batch A', standard: 'Std 10', monthly: 4500, admission: 2000, exam: 500, annual: 56000 },
    { id: '2', name: 'Batch B', standard: 'Std 10', monthly: 4500, admission: 2000, exam: 500, annual: 56000 },
    { id: '3', name: 'Batch C', standard: 'Std 12', monthly: 6000, admission: 3000, exam: 1000, annual: 75000 },
    { id: '4', name: 'NEET Special', standard: 'Std 12', monthly: 7500, admission: 5000, exam: 1500, annual: 95000 }
  ];

  return (
    <div className="space-y-10 pb-10">
      {/* Batch Fees Table */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-purple-600">
            <CreditCard size={20} />
            <h2 className="text-sm font-black uppercase tracking-widest">Batch Fee Structure</h2>
          </div>
          <Button variant="outline" className="h-10 px-6 rounded-xl font-bold gap-2 text-xs border-dashed border-2 text-gray-400 hover:text-purple-600 transition-all">
            <Plus size={16} /> Add Batch Fee
          </Button>
        </div>

        <div className="bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-soft">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest px-8">
                <th className="px-8 py-5">Batch</th>
                <th className="px-8 py-5">Monthly Fee</th>
                <th className="px-8 py-5">Admission</th>
                <th className="px-8 py-5">Exam Fee</th>
                <th className="px-8 py-5">Total Annual</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {batches.map((b) => (
                <tr key={b.id} className="hover:bg-purple-50/20 transition-all group">
                  <td className="px-8 py-5">
                     <div className="flex flex-col">
                        <span className="text-xs font-black text-gray-900 group-hover:text-purple-600 transition-colors uppercase tracking-tight">{b.name}</span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">{b.standard}</span>
                     </div>
                  </td>
                  <td className="px-8 py-5 text-xs font-black text-gray-900 tracking-tight">₹{b.monthly.toLocaleString()}</td>
                  <td className="px-8 py-5 text-xs font-bold text-gray-500 tracking-tight">₹{b.admission.toLocaleString()}</td>
                  <td className="px-8 py-5 text-xs font-bold text-gray-500 tracking-tight">₹{b.exam.toLocaleString()}</td>
                  <td className="px-8 py-5">
                     <Badge className="bg-green-100 text-green-700 font-black text-[10px] tracking-tight">₹{b.annual.toLocaleString()}</Badge>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-purple-100 text-purple-600 rounded-lg transition-colors"><Edit size={14}/></button>
                      <button className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors"><Trash2 size={14}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <hr className="border-gray-50" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Late Fee Configuration */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-purple-600">
            <Clock size={20} />
            <h2 className="text-sm font-black uppercase tracking-widest">Late Fee Configuration</h2>
          </div>
          
          <div className="p-8 bg-gray-50/50 rounded-[32px] border border-gray-100 space-y-8">
             <div className="flex items-center justify-between">
                <div className="flex flex-col">
                   <span className="text-xs font-black text-gray-900 uppercase tracking-tight">Charge Late Fee</span>
                   <span className="text-[10px] font-bold text-gray-400 uppercase italic">Enable daily penalty for late payments</span>
                </div>
                <button 
                   onClick={() => setLateFeeEnabled(!lateFeeEnabled)}
                   className={`w-12 h-6 rounded-full transition-all duration-300 relative ${lateFeeEnabled ? 'bg-purple-600 shadow-glow' : 'bg-gray-200'}`}
                >
                   <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${lateFeeEnabled ? 'left-7 shadow-lg' : 'left-1'}`} />
                </button>
             </div>

             <div className={`space-y-6 transition-all duration-500 ${lateFeeEnabled ? 'opacity-100 scale-100' : 'opacity-30 scale-95 pointer-events-none grayscale'}`}>
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-gray-400 ml-1 uppercase">Late Fee Amount (₹)</label>
                   <div className="relative">
                      <IndianRupee size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <Input 
                         type="number"
                         value={lateFeeAmount}
                         onChange={(e) => setLateFeeAmount(parseInt(e.target.value))}
                         className="rounded-2xl border-gray-100 bg-white h-12 pl-12 pr-5 font-bold"
                      />
                      <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] font-black text-purple-600 uppercase">per day</span>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 ml-1 uppercase">Max Fee Cap</label>
                      <Input value="₹500" readOnly className="rounded-2xl border-gray-100 bg-white h-12 px-5 font-bold text-gray-500" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 ml-1 uppercase">Grace Period</label>
                      <div className="relative">
                         <Input value="5" readOnly className="rounded-2xl border-gray-100 bg-white h-12 px-5 font-bold text-gray-500" />
                         <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-400 uppercase">days</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>
          <div className="p-6 bg-amber-50 rounded-3xl border border-amber-100 flex items-start gap-4">
             <AlertCircle className="text-amber-600 shrink-0" size={20} />
             <p className="text-[10px] font-bold text-amber-800 leading-relaxed uppercase tracking-widest italic">
                Late fees are automatically added to the student's pending balance once the grace period expires.
             </p>
          </div>
        </section>

        {/* Concession Types */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-purple-600">
            <CheckCircle size={20} />
            <h2 className="text-sm font-black uppercase tracking-widest">Concession Types</h2>
          </div>
          
          <div className="space-y-3">
             {concessions.map(c => (
               <div key={c.id} className="p-4 bg-white border border-gray-100 rounded-3xl hover:border-purple-200 hover:bg-purple-50/20 transition-all flex items-center justify-between group">
                  <div className="flex flex-col">
                     <span className="text-xs font-black text-gray-900 group-hover:text-purple-600 transition-colors uppercase tracking-tight">{c.name}</span>
                     <span className="text-[10px] font-bold text-gray-400 uppercase italic">{c.description}</span>
                  </div>
                  <button 
                   onClick={() => toggleConcession(c.id)}
                   className={`w-10 h-5 rounded-full transition-all duration-300 relative ${c.enabled ? 'bg-purple-600' : 'bg-gray-200'}`}
                  >
                     <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all duration-300 ${c.enabled ? 'left-5.5 shadow-sm' : 'left-0.5'}`} />
                  </button>
               </div>
             ))}
             <button className="w-full h-14 border-2 border-dashed border-gray-100 rounded-3xl flex items-center justify-center gap-2 text-gray-300 hover:border-purple-200 hover:text-purple-400 transition-all text-xs font-black uppercase">
                <Plus size={16} /> Add Concession Type
             </button>
          </div>
        </section>
      </div>
    </div>
  );
}
