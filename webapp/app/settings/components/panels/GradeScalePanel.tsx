'use client';
import React, { useState, useEffect } from 'react';
import { initialGradeScale, GradeScale } from '@/lib/settingsData';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { 
  Ruler, Plus, Save, AlertCircle, 
  CheckCircle, RotateCcw, Info, Hash 
} from 'lucide-react';

export default function GradeScalePanel() {
  const [grades, setGrades] = useState<GradeScale[]>(initialGradeScale);
  const [testScore, setTestScore] = useState<number>(72);
  const [errors, setErrors] = useState<string[]>([]);

  // Validation logic for gaps and overlaps
  useEffect(() => {
    const newErrors: string[] = [];
    const sortedGrades = [...grades].sort((a, b) => b.minPercent - a.minPercent);

    for (let i = 0; i < sortedGrades.length - 1; i++) {
      const current = sortedGrades[i];
      const next = sortedGrades[i + 1];

      if (current.minPercent <= next.maxPercent) {
        newErrors.push(`Overlap detected between ${current.grade} (${current.minPercent}-${current.maxPercent}) and ${next.grade} (${next.minPercent}-${next.maxPercent}).`);
      } else if (current.minPercent > next.maxPercent + 1) {
        newErrors.push(`Gap detected between ${next.grade} and ${current.grade}. Please ensure ranges are contiguous.`);
      }
    }

    // Check bounds
    const highest = Math.max(...grades.map(g => g.maxPercent));
    const lowest = Math.min(...grades.map(g => g.minPercent));
    if (highest < 100) newErrors.push("Maximum percentage should be 100%.");
    if (lowest > 0) newErrors.push("Minimum percentage should be 0%.");

    setErrors(newErrors);
  }, [grades]);

  const updateGrade = (id: string, field: keyof GradeScale, value: any) => {
    setGrades(prev => prev.map(g => g.id === id ? { ...g, [field]: value } : g));
  };

  const getGradeForScore = (score: number) => {
    return grades.find(g => score >= g.minPercent && score <= g.maxPercent);
  };

  const previewGrade = getGradeForScore(testScore);

  return (
    <div className="space-y-10 pb-10">
      {/* Table Header & Info */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-purple-600">
            <Ruler size={20} />
            <h2 className="text-sm font-black uppercase tracking-widest">Grade Scale Configuration</h2>
          </div>
          <Button variant="outline" className="h-10 px-6 rounded-xl font-bold gap-2 text-xs border-dashed border-2 text-gray-400 hover:text-purple-600 transition-all">
            <Plus size={16} /> Add Grade
          </Button>
        </div>

        <div className="p-6 bg-purple-50 rounded-[32px] border border-purple-100 flex items-start gap-4 shadow-sm">
           <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-purple-600 shrink-0 shadow-soft">
              <Info size={24} />
           </div>
           <div className="space-y-1">
              <h4 className="text-xs font-black text-purple-900 uppercase tracking-tight">Grade Logic</h4>
              <p className="text-[11px] font-bold text-purple-700 leading-relaxed uppercase tracking-tighter">
                 Define how percentage scores are converted into letter grades. Ensure there are no gaps or overlaps between ranges for accurate automated grading.
              </p>
           </div>
        </div>
      </section>

      {/* Editable Table */}
      <section className="bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-soft-lg">
        <div className="overflow-x-auto">
           <table className="w-full text-left">
             <thead>
               <tr className="bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                 <th className="px-8 py-5">Grade</th>
                 <th className="px-8 py-5">Min %</th>
                 <th className="px-8 py-5">Max %</th>
                 <th className="px-8 py-5">Label</th>
                 <th className="px-8 py-5">Pass/Fail</th>
                 <th className="px-8 py-5">Color</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-50">
               {grades.sort((a,b) => b.minPercent - a.minPercent).map((g) => (
                 <tr key={g.id} className="hover:bg-purple-50/20 transition-all group">
                   <td className="px-8 py-5">
                      <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100 group-hover:bg-white group-hover:shadow-soft transition-all">
                         <span className="text-sm font-black text-gray-900 uppercase" style={{ color: g.color }}>{g.grade}</span>
                      </div>
                   </td>
                   <td className="px-8 py-5">
                      <input 
                        type="number" 
                        value={g.minPercent} 
                        onChange={(e) => updateGrade(g.id, 'minPercent', parseInt(e.target.value))}
                        className="w-16 h-10 bg-gray-50 border-none rounded-xl text-center font-black text-xs text-gray-700 focus:ring-4 focus:ring-purple-500/10 transition-all"
                      />
                   </td>
                   <td className="px-8 py-5">
                      <input 
                        type="number" 
                        value={g.maxPercent} 
                        onChange={(e) => updateGrade(g.id, 'maxPercent', parseInt(e.target.value))}
                        className="w-16 h-10 bg-gray-50 border-none rounded-xl text-center font-black text-xs text-gray-700 focus:ring-4 focus:ring-purple-500/10 transition-all"
                      />
                   </td>
                   <td className="px-8 py-5">
                      <input 
                        type="text" 
                        value={g.label} 
                        onChange={(e) => updateGrade(g.id, 'label', e.target.value)}
                        className="w-full min-w-[150px] h-10 bg-gray-50/50 border-none rounded-xl px-4 font-bold text-xs text-gray-700 focus:ring-4 focus:ring-purple-500/10 transition-all"
                      />
                   </td>
                   <td className="px-8 py-5">
                      <button 
                        onClick={() => updateGrade(g.id, 'isPass', !g.isPass)}
                        className={`text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-tighter transition-all ${
                          g.isPass ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {g.isPass ? 'PASS' : 'FAIL'}
                      </button>
                   </td>
                   <td className="px-8 py-5">
                      <input 
                        type="color" 
                        value={g.color} 
                        onChange={(e) => updateGrade(g.id, 'color', e.target.value)}
                        className="w-8 h-8 rounded-lg border-none cursor-pointer p-0 bg-transparent ring-2 ring-white shadow-soft"
                      />
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
        </div>
      </section>

      {/* Validation Errors */}
      {errors.length > 0 && (
        <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
          {errors.map((err, i) => (
             <div key={i} className="p-4 bg-red-50 rounded-2xl border border-red-100 flex items-center gap-3 text-red-700">
                <AlertCircle size={18} />
                <span className="text-[10px] font-black uppercase tracking-tight">{err}</span>
             </div>
          ))}
        </div>
      )}

      {/* Live Preview Card */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-gray-400 ml-1">
           <Hash size={16} />
           <h3 className="text-[11px] font-black uppercase tracking-widest italic">Live Grade Preview</h3>
        </div>

        <div className="bg-white rounded-[40px] border-4 border-gray-50 shadow-soft-lg p-10 flex flex-col md:flex-row items-center gap-10 overflow-hidden relative group">
           <div className="space-y-4 min-w-[200px]">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Type Score (%)</label>
              <div className="relative">
                 <input 
                   type="number" 
                   value={testScore} 
                   onChange={(e) => setTestScore(parseInt(e.target.value))}
                   className="w-full h-24 bg-gray-50 border-none rounded-[32px] text-center text-4xl font-black text-purple-600 focus:ring-8 focus:ring-purple-500/10 transition-all outline-none"
                   max={100}
                   min={0}
                 />
                 <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xl font-black text-gray-300">%</span>
              </div>
           </div>

           <div className="h-20 w-px bg-gray-100 hidden md:block" />

           <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-4">
              {previewGrade ? (
                <div className="space-y-2 animate-in fade-in zoom-in duration-300">
                   <div className="flex items-baseline gap-4">
                      <span className="text-7xl font-black tracking-tighter" style={{ color: previewGrade.color }}>{previewGrade.grade}</span>
                      <span className="text-xl font-black text-gray-400 uppercase tracking-widest">{previewGrade.label}</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <Badge className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        previewGrade.isPass ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                         {previewGrade.isPass ? 'RESULT: PASS ✓' : 'RESULT: FAIL ✗'}
                      </Badge>
                      <div className="w-4 h-4 rounded-full shadow-inner" style={{ backgroundColor: previewGrade.color }} />
                   </div>
                </div>
              ) : (
                <p className="text-xs font-bold text-gray-300 uppercase tracking-widest">Score out of range or gap detected</p>
              )}
           </div>

           <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-50 rounded-full blur-3xl opacity-50 group-hover:scale-150 transition-transform duration-700" />
        </div>
      </section>

      {/* Action Bar */}
      <div className="flex justify-center pt-4">
         <Button 
           disabled={errors.length > 0}
           className={`h-12 px-10 rounded-2xl font-black uppercase tracking-widest text-xs gap-3 shadow-glow transition-all ${
             errors.length > 0 ? 'bg-gray-100 text-gray-300 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700 text-white'
           }`}
         >
            <CheckCircle size={18} />
            Save Grade Scale
         </Button>
      </div>
    </div>
  );
}
