'use client';
import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  X, Calendar, Clock, MapPin, 
  BookOpen, Info, AlertCircle, 
  Send, Smartphone, Plus, Zap,
  CheckCircle2, Trash2
} from 'lucide-react';
import { subjectsMock, batches } from '@/lib/mockData';

/**
 * Create Test Modal
 */
export const CreateTestModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 backdrop-blur-md bg-text-slate/40 animate-in fade-in duration-300">
      <Card className="w-full max-w-2xl bg-white rounded-[48px] shadow-2xl border-none overflow-hidden relative animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
        {/* Header */}
        <div className="p-10 pb-6 flex items-center justify-between border-b border-gray-50 bg-gradient-to-r from-bg-soft/10 to-transparent">
          <div className="space-y-1">
             <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-xl bg-brand-blue flex items-center justify-center text-white">
                  <BookOpen className="w-4 h-4" />
               </div>
               <h3 className="text-2xl font-black text-text-slate tracking-tight leading-none">Create New Test</h3>
             </div>
             <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest pl-11">Configure academic assessment parameters</p>
          </div>
          <button onClick={onClose} className="h-12 w-12 rounded-2xl bg-gray-50 text-gray-400 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-10 space-y-8 max-h-[70vh] overflow-y-auto scrollbar-hide">
          <div className="grid grid-cols-2 gap-8">
            <InputField label="Test Title *" placeholder="e.g. Algebra Unit 3" />
            <SelectField label="Subject *" options={subjectsMock.map(s => s.name)} />
          </div>

          <div className="grid grid-cols-2 gap-8">
            <SelectField label="Target Batch *" options={batches.map(b => b.name)} />
            <SelectField label="Test Type *" options={["Chapter Test", "Unit Test", "Mid-term", "Final Exam", "Quiz"]} />
          </div>

          <div className="grid grid-cols-3 gap-8 pt-4 border-t border-gray-50">
             <InputField label="Total Marks *" placeholder="100" type="number" />
             <InputField label="Passing Marks *" placeholder="40" type="number" />
             <InputField label="Duration (min) *" placeholder="60" type="number" />
          </div>

          <div className="grid grid-cols-3 gap-6 pt-4">
             <InputField label="Date *" type="date" value="2026-04-16" />
             <InputField label="Starting Time *" type="time" value="09:00" />
             <InputField label="Venue *" placeholder="Room 101" />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Syllabus / Topics to cover</label>
            <textarea 
              className="w-full h-24 rounded-2xl bg-bg-soft/20 border border-gray-100 p-6 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-brand-blue/10 transition-all resize-none"
              placeholder="e.g. Chapter 3: Laws of Motion, Chapter 4: Static Friction..."
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-10 pt-6 bg-bg-soft/10 border-t border-gray-50 flex items-center justify-between">
           <div className="flex items-center gap-3">
              <div className={`w-10 h-6 rounded-full p-1 bg-brand-blue`}>
                 <div className={`w-4 h-4 rounded-full bg-white translate-x-6`} />
              </div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Notify Students via SMS</span>
           </div>
           <div className="flex items-center gap-4">
             <Button variant="ghost" className="h-14 px-8 rounded-2xl text-gray-400 font-black uppercase text-[10px] tracking-widest" onClick={onClose}>Discard</Button>
             <Button className="h-14 px-10 rounded-2xl bg-brand-blue shadow-xl shadow-brand-blue/30 font-black text-xs uppercase tracking-[0.2em] gap-3">
                <Plus className="w-5 h-5" /> Schedule Test
             </Button>
           </div>
        </div>
      </Card>
    </div>
  );
};

/**
 * Improvement Notice Modal
 */
export const ImprovementNoticeModal: React.FC<{ isOpen: boolean; onClose: () => void; student: any; test: any }> = ({ isOpen, onClose, student, test }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 backdrop-blur-md bg-text-slate/40 animate-in fade-in duration-300">
      <Card className="w-full max-w-md bg-white rounded-[40px] shadow-2xl border-none overflow-hidden animate-in zoom-in-95 duration-500">
        <div className="p-10 pb-6 border-b border-gray-50 flex items-center justify-between">
           <h3 className="text-xl font-black text-text-slate tracking-tight">Send Notice</h3>
           <button onClick={onClose} className="text-gray-300 hover:text-text-slate"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-10 space-y-8">
           <div className="flex items-center gap-4 p-4 rounded-2xl bg-red-50 border border-red-100">
              <div className="w-12 h-12 rounded-xl bg-white border border-red-100 flex items-center justify-center font-black text-red-500 shadow-sm">
                 {student?.name?.charAt(0)}
              </div>
              <div>
                 <p className="font-black text-sm text-red-900 leading-none mb-1">{student?.name}</p>
                 <p className="text-[10px] font-black text-red-400 uppercase tracking-widest leading-none">Score: {student?.marks}/{test?.totalMarks} ({student?.grade} Grade)</p>
              </div>
           </div>

           <div className="space-y-4">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-2">Message Preview</p>
              <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100 text-xs font-bold text-gray-400 leading-relaxed italic relative">
                 <div className="absolute top-4 right-4 text-[8px] font-black opacity-30">PREVIEW</div>
                 "Dear Parent, <br/> {student?.name} scored {student?.marks}/{test?.totalMarks} in the {test?.title} conducted on {test?.date}. We recommend personal attention to improve their performance. <br/> \u2014 Raj Science Classes"
              </div>
           </div>

           <div className="grid grid-cols-2 gap-4">
              <button className="h-14 rounded-2xl bg-bg-soft/30 border border-gray-100 flex flex-col items-center justify-center gap-1 group hover:border-brand-blue/50 transition-all">
                 <Smartphone className="w-4 h-4 text-gray-400 group-hover:text-brand-blue" />
                 <span className="text-[9px] font-black uppercase text-gray-300 group-hover:text-brand-blue">Via SMS</span>
              </button>
              <button className="h-14 rounded-2xl bg-green-50 border border-green-100 flex flex-col items-center justify-center gap-1 group hover:bg-green-500 hover:text-white transition-all">
                 <Zap className="w-4 h-4 text-green-500 group-hover:text-white" />
                 <span className="text-[9px] font-black uppercase text-green-600 group-hover:text-white">WhatsApp</span>
              </button>
           </div>
        </div>
        <div className="px-10 pb-10">
           <Button className="w-full h-14 rounded-2xl bg-brand-blue shadow-xl shadow-brand-blue/20 font-black uppercase text-[10px] tracking-widest gap-2">
              <Send className="w-4 h-4" /> Send Notice Now
           </Button>
        </div>
      </Card>
    </div>
  );
};

/**
 * Cancel Test Modal
 */
export const CancelTestModal: React.FC<{ isOpen: boolean; onClose: () => void; test: any }> = ({ isOpen, onClose, test }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 backdrop-blur-md bg-text-slate/40 animate-in fade-in duration-300">
      <Card className="w-full max-w-md bg-white rounded-[40px] shadow-2xl border-none overflow-hidden animate-in zoom-in-95 duration-500">
        <div className="p-10 pb-4 text-center">
           <div className="w-20 h-20 rounded-[32px] bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-6 shadow-inner">
              <AlertCircle className="w-10 h-10" />
           </div>
           <h3 className="text-2xl font-black text-text-slate tracking-tight leading-none mb-3">Cancel this test?</h3>
           <p className="text-sm font-bold text-gray-400 leading-relaxed uppercase tracking-wider">{test?.title} \u2014 {test?.batchName}</p>
        </div>
        <div className="p-10 pt-0 space-y-6">
           <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Cancellation Reason</label>
              <select className="w-full h-12 rounded-2xl bg-bg-soft/20 border border-gray-100 px-6 text-sm font-bold focus:outline-none">
                 <option>Teacher Absent</option>
                 <option>Schedule Conflict</option>
                 <option>Postponed</option>
                 <option>Holiday Announced</option>
                 <option>Other</option>
              </select>
           </div>
           <textarea className="w-full h-24 rounded-2xl bg-bg-soft/10 border border-gray-100 p-6 text-xs font-bold focus:outline-none resize-none" placeholder="Add specific notes if any..." />
           
           <div className="grid grid-cols-2 gap-4">
              <Button variant="ghost" className="h-14 rounded-2xl font-black uppercase text-[10px] tracking-widest text-gray-400" onClick={onClose}>Keep Test</Button>
              <Button className="h-14 rounded-2xl bg-red-500 shadow-xl shadow-red-200 font-black uppercase text-[10px] tracking-widest gap-2">
                 <Trash2 className="w-4 h-4" /> Cancel Test
              </Button>
           </div>
        </div>
      </Card>
    </div>
  );
};

const InputField = ({ label, placeholder, type = 'text', value }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{label}</label>
    <input 
      type={type}
      className="w-full h-12 rounded-2xl bg-bg-soft/20 border border-gray-100 px-6 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-brand-blue/10 transition-all"
      placeholder={placeholder}
      defaultValue={value}
    />
  </div>
);

const SelectField = ({ label, options }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{label}</label>
    <select className="w-full h-12 rounded-2xl bg-bg-soft/20 border border-gray-100 px-6 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-brand-blue/10 transition-all appearance-none cursor-pointer">
      {options.map((opt: string) => <option key={opt}>{opt}</option>)}
    </select>
  </div>
);
