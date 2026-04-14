'use client';
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Zap, Settings2, Users, Home, Clock, 
  Calendar, CheckCircle2, ChevronRight,
  AlertCircle, RefreshCw, Eye, Sparkles,
  Info, ArrowRight, ShieldCheck, X
} from 'lucide-react';
import { 
  batches, rooms, teacherAvailability, 
  subjectsPerBatch, TimetableConstraints, 
  GeneratedTimetable 
} from '@/lib/mockData';

export const AiGenerator: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [result, setResult] = useState<GeneratedTimetable | null>(null);
  const [error, setError] = useState<string | null>(null);

  const steps = [
    "Analyzing batches and teachers availability...",
    "Mapping subject requirements and periods...",
    "Checking teacher availability windows...",
    "Resolving scheduling conflicts...",
    "Optimizing room assignments...",
    "Final validation pass...",
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    setCurrentStep(0);
    setError(null);
    setResult(null);

    // Simulate progress while calling API
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 2500);

    try {
      const constraints: TimetableConstraints = {
        batches: batches.map(b => ({
          id: b.id,
          name: b.name,
          standard: b.standard,
          preferredDays: ["Monday", "Wednesday", "Friday"],
          preferredTimeStart: "08:00",
          preferredTimeEnd: "14:00",
          roomId: rooms[0].id
        })),
        teachers: teacherAvailability,
        rooms: rooms,
        subjectsPerBatch: subjectsPerBatch,
        rules: {
          slotDuration: 120,
          breakAfterSlots: 2,
          breakDuration: 15,
          maxConsecutivePeriodsPerBatch: 3,
          maxConsecutivePeriodsPerTeacher: 2,
          avoidSubjectRepeatSameDay: true,
          workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          holidayDates: ["2026-04-14"]
        }
      };

      const response = await fetch('/api/generate-timetable', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ constraints })
      });

      const data = await response.json();
      
      if (response.ok) {
        setResult(data);
      } else {
        setError(data.error || "Failed to generate timetable");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      clearInterval(interval);
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex gap-10 min-h-[800px] animate-in fade-in duration-700">
      {/* 1. Configuration Panel (Left) */}
      <div className="w-[400px] shrink-0 space-y-8">
        <Card className="p-8 border-none shadow-soft rounded-[48px] bg-white h-fit sticky top-10 overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-full translate-x-12 -translate-y-12 transition-transform group-hover:scale-110" />
          
          <div className="flex items-center gap-4 mb-10 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-brand-blue flex items-center justify-center text-white shadow-lg shadow-brand-blue/20">
               <Settings2 className="w-6 h-6" />
            </div>
            <div>
               <h3 className="text-xl font-black text-text-slate tracking-tight leading-none mb-1">Constraints</h3>
               <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Configure AI Parameters</p>
            </div>
          </div>

          <div className="space-y-8 relative z-10">
            <ConfigSection icon={Calendar} title="Working Days">
               <div className="flex flex-wrap gap-2">
                 {["M", "T", "W", "T", "F", "S"].map((d, idx) => (
                   <div key={idx} className="w-9 h-9 rounded-xl bg-brand-blue/10 flex items-center justify-center font-black text-[10px] text-brand-blue border border-brand-blue/10">
                      {d}
                   </div>
                 ))}
                 <div className="w-9 h-9 rounded-xl bg-bg-soft flex items-center justify-center font-black text-[10px] text-gray-300 border border-gray-100 italic">S</div>
               </div>
            </ConfigSection>

            <ConfigSection icon={Users} title="Batches to Schedule">
               <div className="space-y-2">
                 {batches.slice(0, 5).map(b => (
                    <div key={b.id} className="flex items-center justify-between p-3 rounded-2xl bg-bg-soft/10 border border-transparent hover:border-gray-100 transition-all">
                       <span className="text-[11px] font-black text-text-slate">{b.name} <span className="text-gray-300 font-bold ml-1">{b.standard}</span></span>
                       <div className="w-5 h-5 rounded-md bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                       </div>
                    </div>
                 ))}
               </div>
            </ConfigSection>

            <ConfigSection icon={Clock} title="Period Settings">
               <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-3xl bg-bg-soft/20 border border-gray-100 text-center">
                     <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-2">Duration</p>
                     <p className="text-sm font-black text-text-slate">120 min</p>
                  </div>
                  <div className="p-4 rounded-3xl bg-bg-soft/20 border border-gray-100 text-center">
                     <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-2">Break</p>
                     <p className="text-sm font-black text-text-slate">15 min</p>
                  </div>
               </div>
            </ConfigSection>

            <div className="pt-6 relative">
               <Button 
                 onClick={handleGenerate}
                 disabled={isGenerating}
                 className="w-full h-16 rounded-[24px] bg-brand-blue shadow-2xl shadow-brand-blue/30 font-black text-xs uppercase tracking-[0.2em] gap-4 relative overflow-hidden group"
               >
                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                 {isGenerating ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5 fill-white/20" />}
                 {isGenerating ? "Analyzing..." : "Generate with AI"}
               </Button>
               {!isGenerating && <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest text-center mt-3 animate-pulse">Takes 10–20 seconds</p>}
            </div>
          </div>
        </Card>
      </div>

      {/* 2. Output Panel (Right) */}
      <div className="flex-1">
        {!isGenerating && !result && !error && (
          <div className="h-full flex flex-col items-center justify-center p-20 space-y-10 rounded-[56px] border-4 border-dashed border-gray-100 bg-white shadow-inner relative overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-to-br from-bg-soft/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
             <div className="w-24 h-24 rounded-[40px] bg-brand-blue/5 flex items-center justify-center text-brand-blue/20 rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-700">
                <Zap className="w-12 h-12" />
             </div>
             <div className="text-center space-y-4 max-w-md relative z-10">
                <h3 className="text-3xl font-black text-text-slate tracking-tight leading-none">AI Timetable Generator</h3>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest leading-relaxed">
                   Configure your constraints on the left, then click Generate to automatically create a conflict-free schedule.
                </p>
             </div>
             <Button variant="ghost" className="text-brand-blue font-black tracking-widest uppercase text-[10px] gap-2 hover:bg-brand-blue/5 h-12 px-8 rounded-2xl relative z-10">
                View Sample Output <ArrowRight className="w-4 h-4" />
             </Button>
          </div>
        )}

        {isGenerating && (
          <div className="h-full flex flex-col items-center justify-center p-20 space-y-16 rounded-[56px] bg-white shadow-soft relative overflow-hidden">
             <div className="w-80 space-y-6">
                <div className="flex items-center justify-between mb-2">
                   <p className="text-[10px] font-black text-brand-blue uppercase tracking-[0.2em] flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Claude is working
                   </p>
                   <p className="text-[10px] font-black text-gray-300 uppercase">{Math.round(((currentStep + 1) / steps.length) * 100)}%</p>
                </div>
                <div className="h-3 w-full bg-bg-soft rounded-full p-1 shadow-inner relative overflow-hidden">
                   <div className="h-full bg-brand-blue rounded-full transition-all duration-500 shadow-lg shadow-brand-blue/30" style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }} />
                </div>
             </div>

             <div className="w-full max-w-lg space-y-4">
               {steps.map((step, idx) => (
                 <div key={idx} className={`flex items-center gap-4 transition-all duration-500 ${idx === currentStep ? 'translate-x-4 opacity-100 scale-105' : (idx < currentStep ? 'opacity-40' : 'opacity-20 grayscale scale-95')}`}>
                   {idx < currentStep ? (
                     <CheckCircle2 className="w-5 h-5 text-green-500" />
                   ) : (
                     <div className={`w-5 h-5 rounded-full border-2 border-dashed flex items-center justify-center ${idx === currentStep ? 'border-brand-blue animate-spin' : 'border-gray-200'}`}>
                        {idx === currentStep && <div className="w-1.5 h-1.5 bg-brand-blue rounded-full shadow-lg" />}
                     </div>
                   )}
                   <span className={`text-xs font-black uppercase tracking-widest ${idx === currentStep ? 'text-text-slate' : 'text-gray-400'}`}>
                      {step}
                   </span>
                 </div>
               ))}
             </div>
             
             <div className="absolute bottom-10 left-10 right-10 flex items-center justify-center gap-6 p-4 rounded-3xl bg-bg-soft/10">
                <Info className="w-4 h-4 text-gray-300" />
                <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">Model: Claude 3.7 Sonnet (May 2025 Edition)</p>
             </div>
          </div>
        )}

        {result && (
          <div className="space-y-8 animate-in zoom-in-95 duration-700">
             {/* Success Banner */}
             <div className="p-8 rounded-[40px] bg-green-500 text-white shadow-2xl shadow-green-100 flex items-center justify-between gap-10 overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-20 -translate-y-20 transition-transform group-hover:scale-110" />
                <div className="flex items-center gap-6 relative z-10">
                   <div className="w-16 h-16 rounded-[28px] bg-white flex items-center justify-center text-green-500 shadow-soft">
                      <CheckCircle2 className="w-8 h-8" />
                   </div>
                   <div>
                      <h3 className="text-2xl font-black tracking-tight leading-none mb-2">Timetable Generated!</h3>
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-80">
                         {result.stats.totalPeriodsScheduled} Periods Scheduled \u2022 0 Conflicts \u2022 {result.warnings.length} Warnings
                      </p>
                   </div>
                </div>
                <div className="flex items-center gap-3 relative z-10">
                   <Button variant="ghost" className="h-14 px-8 rounded-2xl text-white font-black uppercase text-[10px] tracking-widest hover:bg-white/10">Regenerate</Button>
                   <Button className="h-14 px-10 rounded-2xl bg-white text-green-500 shadow-xl font-black uppercase text-xs tracking-widest gap-2">
                     <ShieldCheck className="w-5 h-5" /> Publish Now
                   </Button>
                </div>
             </div>

             {/* Warnings & Conflicts */}
             {result.warnings.length > 0 && (
               <div className="flex flex-col gap-3">
                 {result.warnings.map((w, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 rounded-3xl bg-amber-500/10 border border-amber-500/20">
                       <AlertCircle className="w-4 h-4 text-amber-500" />
                       <span className="text-xs font-black text-amber-900 uppercase tracking-widest leading-none">{w}</span>
                    </div>
                 ))}
               </div>
             )}

             {/* Preview Grid */}
             <section className="space-y-6">
                <div className="flex items-center justify-between">
                   <h4 className="text-lg font-black text-text-slate tracking-tight flex items-center gap-3">
                      Generation Preview <Badge variant="Inactive" className="px-3">Batch A</Badge>
                   </h4>
                   <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="h-9 px-4 rounded-xl border-gray-100 font-black text-[9px] uppercase tracking-widest">Show All Batches</Button>
                      <Button variant="outline" size="sm" className="h-9 w-9 p-0 rounded-xl border-gray-100"><Eye className="w-4 h-4" /></Button>
                   </div>
                </div>
                {/* Simplified Grid Placeholder */}
                <Card className="min-h-[400px] border-none shadow-soft rounded-[48px] bg-white overflow-hidden flex items-center justify-center">
                   <div className="text-center space-y-4 opacity-50 grayscale scale-75 blur-sm select-none pointer-events-none">
                      <Calendar className="w-16 h-16 mx-auto text-gray-200" />
                      <p className="text-[10px] font-black uppercase tracking-widest">Timetable Preview Layer Loading...</p>
                   </div>
                   <div className="absolute inset-0 flex items-center justify-center">
                      <Button variant="outline" className="bg-white shadow-soft font-black uppercase text-[10px] tracking-widest h-12 px-8 rounded-2xl gap-2 border-gray-100">
                         Expand Full Grid View <ChevronRight className="w-4 h-4" />
                      </Button>
                   </div>
                </Card>
             </section>
          </div>
        )}

        {error && (
          <div className="h-full flex flex-col items-center justify-center p-20 space-y-10 rounded-[56px] border-2 border-red-100 bg-red-50 relative overflow-hidden">
             <div className="w-24 h-24 rounded-[40px] bg-red-500/10 flex items-center justify-center text-red-500">
                <AlertCircle className="w-12 h-12" />
             </div>
             <div className="text-center space-y-4 max-w-md">
                <h3 className="text-3xl font-black text-red-900 tracking-tight leading-none">Generation Failed</h3>
                <p className="text-sm font-bold text-red-700/60 uppercase tracking-widest leading-relaxed">
                   Claude couldn't create a conflict-free timetable with the current constraints.
                </p>
                <div className="p-6 rounded-3xl bg-white/50 border border-red-100 text-[11px] font-bold text-red-900 italic">
                   "Reason: {error}. Potential teacher unavailability for Batch B on Wednesdays."
                </div>
             </div>
             <div className="flex items-center gap-4">
                <Button variant="outline" className="h-12 px-8 rounded-2xl border-red-200 text-red-500 font-black uppercase text-[10px] tracking-widest">Detailed Logs</Button>
                <Button onClick={handleGenerate} className="h-12 px-10 rounded-2xl bg-red-500 text-white shadow-xl shadow-red-200 font-black uppercase text-xs tracking-widest gap-2">
                   <RefreshCw className="w-5 h-5" /> Retry Generation
                </Button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ConfigSection = ({ icon: Icon, title, children }: any) => (
  <div className="space-y-4">
    <div className="flex items-center gap-3">
      <Icon className="w-4 h-4 text-brand-blue/40" />
      <span className="text-[11px] font-black text-text-slate uppercase tracking-widest">{title}</span>
    </div>
    {children}
  </div>
);
