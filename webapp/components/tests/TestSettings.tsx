'use client';
import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Palette, Save, RefreshCw, Plus, 
  Trash2, Edit2, Info, Settings2,
  Lock, Bell, Eye, BarChart
} from 'lucide-react';
import { gradeScale as initialGradeScale } from '@/lib/mockData';

export const TestSettings: React.FC = () => {
  const [scale, setScale] = useState(initialGradeScale);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      {/* 1. Grade Scale Configuration */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <div>
            <h3 className="text-xl font-black text-text-slate tracking-tight leading-none mb-2">Grade Scale Configuration</h3>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Define percentage ranges and labels for automated grading</p>
          </div>
          <Button variant="outline" className="h-11 px-6 rounded-xl border-gray-100 font-black text-[10px] uppercase tracking-widest gap-2">
            <RefreshCw className="w-4 h-4" /> Reset Defaults
          </Button>
        </div>

        <Card className="border-none shadow-soft rounded-[40px] overflow-hidden bg-white p-2">
          <table className="w-full text-left">
            <thead className="bg-bg-soft/10 h-14 border-b border-gray-50">
              <tr>
                <th className="pl-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">Grade Label</th>
                <th className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Min %</th>
                <th className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Max %</th>
                <th className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Color Theme</th>
                <th className="pr-8 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {scale.map((row, idx) => (
                <tr key={row.grade} className="h-16 group hover:bg-bg-soft/5 transition-colors">
                  <td className="pl-8">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs shadow-inner" style={{ backgroundColor: `${row.color}15`, color: row.color }}>
                        {row.grade}
                      </div>
                      <span className="font-black text-text-slate">{row.grade}</span>
                    </div>
                  </td>
                  <td>
                    <input 
                      type="number" 
                      className="w-16 h-10 rounded-xl bg-bg-soft/20 border-none text-center font-black text-sm focus:ring-4 focus:ring-brand-blue/10"
                      value={row.minPercent}
                      onChange={(e) => {
                         const next = [...scale];
                         next[idx].minPercent = Number(e.target.value);
                         setScale(next);
                      }}
                    />
                  </td>
                  <td>
                    <input 
                      type="number" 
                      className="w-16 h-10 rounded-xl bg-bg-soft/20 border-none text-center font-black text-sm focus:ring-4 focus:ring-brand-blue/10"
                      value={row.maxPercent}
                      onChange={(e) => {
                         const next = [...scale];
                         next[idx].maxPercent = Number(e.target.value);
                         setScale(next);
                      }}
                    />
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full border-2 border-white shadow-soft" style={{ backgroundColor: row.color }} />
                      <span className="text-[10px] font-bold text-gray-400 uppercase">{row.color}</span>
                    </div>
                  </td>
                  <td className="pr-8 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-gray-300 hover:text-brand-blue hover:bg-brand-blue/5 rounded-lg"><Edit2 className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-6 bg-bg-soft/5 border-t border-gray-50 flex items-center justify-between">
             <Button variant="ghost" className="h-11 px-6 rounded-xl text-brand-blue font-black text-[10px] uppercase tracking-widest gap-2 bg-brand-blue/5 hover:bg-brand-blue hover:text-white transition-all">
                <Plus className="w-4 h-4" /> Add New Grade
             </Button>
             <Button 
                onClick={handleSave}
                className="h-11 px-10 rounded-xl bg-brand-blue shadow-lg shadow-brand-blue/30 font-black text-[10px] uppercase tracking-widest gap-3"
             >
                {isSaved ? <Save className="w-4 h-4 animate-in zoom-in" /> : <Palette className="w-4 h-4" />}
                {isSaved ? "Grade Scale Saved!" : "Save Grade Scale"}
             </Button>
          </div>
        </Card>
      </section>

      {/* 2. Global Test Defaults */}
      <section className="space-y-6">
        <h3 className="text-xl font-black text-text-slate tracking-tight px-2 leading-none">Global Test Defaults</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <Card className="p-8 border-none shadow-soft rounded-[40px] bg-white space-y-6">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                   <Settings2 className="w-6 h-6" />
                </div>
                <h4 className="font-black text-text-slate tracking-tight">System Policies</h4>
              </div>
              <DefaultToggle id="lock" label="Lock Marks Entry" sub="Disable editing after results are published" checked />
              <DefaultToggle id="notify" label="Auto-Notify Parents" sub="Send summary via SMS/WhatsApp on publish" checked={false} />
              <DefaultToggle id="rank" label="Show Class Rank" sub="Allow students to see their percentile/rank" checked />
           </Card>

           <Card className="p-8 border-none shadow-soft rounded-[40px] bg-white space-y-6">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                   <BarChart className="w-6 h-6" />
                </div>
                <h4 className="font-black text-text-slate tracking-tight">Reporting Defaults</h4>
              </div>
              <DefaultToggle id="avg" label="Show Class Average" sub="Include batch median in student reports" checked />
              <DefaultToggle id="high" label="Highlight Top Performers" sub="Publicly celebrate scores > 90% in notice board" checked={false} />
              <DefaultToggle id="remarks" label="Force Remarks" sub="Require comments for scores below passing mark" checked />
           </Card>
        </div>
      </section>

      {/* 3. Help Card */}
      <Card className="p-10 border-none shadow-soft rounded-[40px] bg-bg-soft relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-48 h-48 bg-white/50 rounded-full flex items-center justify-center translate-x-12 -translate-y-12 transition-transform group-hover:scale-110 duration-500">
            <Info className="w-20 h-20 text-brand-blue/10" />
         </div>
         <div className="max-w-2xl space-y-4">
            <h4 className="text-xl font-black text-text-slate tracking-tight">About Academic Cycles</h4>
            <p className="text-sm font-bold text-gray-400 leading-relaxed uppercase tracking-wider">
               Changing grade scales mid-session will not affect previously generated results. 
               Only new marks entries will follow the updated grading logic. 
               For recalculating past results, please contact system support.
            </p>
            <Button variant="ghost" className="h-10 px-0 text-brand-blue font-black uppercase text-[10px] tracking-widest hover:bg-transparent hover:underline underline-offset-4">Learn more about grading systems</Button>
         </div>
      </Card>
    </div>
  );
};

const DefaultToggle = ({ label, sub, checked: initialChecked }: any) => {
  const [checked, setChecked] = useState(initialChecked);
  return (
    <div className="flex items-center justify-between group cursor-pointer" onClick={() => setChecked(!checked)}>
      <div className="space-y-1">
        <p className="text-sm font-black text-text-slate group-hover:text-brand-blue transition-colors leading-none">{label}</p>
        <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none">{sub}</p>
      </div>
      <div className={`w-12 h-6 rounded-full p-1 transition-all duration-300 ${checked ? 'bg-brand-blue' : 'bg-gray-100 shadow-inner'}`}>
        <div className={`w-4 h-4 rounded-full bg-white shadow-md transition-all duration-300 ${checked ? 'translate-x-6' : 'translate-x-0'}`} />
      </div>
    </div>
  );
};
