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
export const CreateTestModal: React.FC<{ isOpen: boolean; onClose: () => void; onSuccess?: (msg: string) => void; onError?: (msg: string) => void; initialBatchId?: string }> = ({ isOpen, onClose, onSuccess, onError, initialBatchId }) => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState(subjectsMock[0]?.name || 'Maths');
  const [batchId, setBatchId] = useState('');
  const [testType, setTestType] = useState('Chapter Test');
  const [maxMarks, setMaxMarks] = useState('100');
  const [passingMarks, setPassingMarks] = useState('40');
  const [duration, setDuration] = useState('60');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState('09:00');
  const [venue, setVenue] = useState('Room 101');
  const [syllabus, setSyllabus] = useState('');
  const [notifySMS, setNotifySMS] = useState(true);
  const [batchesList, setBatchesList] = useState<any[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  React.useEffect(() => {
    if (isOpen) {
      setTitle('');
      setSubject(subjectsMock[0]?.name || 'Maths');
      setBatchId('');
      setTestType('Chapter Test');
      setMaxMarks('100');
      setPassingMarks('40');
      setDuration('60');
      setDate(new Date().toISOString().split('T')[0]);
      setStartTime('09:00');
      setVenue('Room 101');
      setSyllabus('');
      setErrorMsg('');
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (!isOpen) return;
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        const instituteSlug = user.instituteId;
        console.log('User object:', user);
        console.log('Fetching batches for instituteSlug:', instituteSlug);
        if (instituteSlug) {
          fetch(`/api/${instituteSlug}/batches`)
            .then(res => {
              console.log('Batches API response status:', res.status);
              return res.json();
            })
            .then(data => {
              console.log('Batches API response data:', data);
              if (data.success) {
                console.log('Setting batchesList with', data.batches.length, 'batches');
                setBatchesList(data.batches);
                if (initialBatchId && data.batches.some((batch: any) => batch._id === initialBatchId)) {
                  setBatchId(initialBatchId);
                } else if (data.batches.length > 0) {
                  setBatchId(data.batches[0]._id);
                }
              } else {
                console.error('Batches API returned success:false:', data.message);
              }
            })
            .catch(err => console.error('Error fetching batches:', err));
        } else {
          console.error('No instituteSlug found in user object');
        }
      } catch (err) {
        console.error('Error loading batches:', err);
      }
    } else {
      console.error('No user found in localStorage');
    }
  }, [isOpen]);

  const handleSave = async () => {
    if (!title.trim()) {
      setErrorMsg('Test Title is required');
      return;
    }
    if (!batchId) {
      setErrorMsg('Target Batch is required');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) {
        setErrorMsg('User session not found');
        setSubmitting(false);
        return;
      }
      const user = JSON.parse(userStr);
      const instituteSlug = user.instituteId;
      if (!instituteSlug) {
        setErrorMsg('Institute details not found');
        setSubmitting(false);
        return;
      }

      const bodyData = {
        title,
        subject,
        batchId,
        testType,
        maxMarks: Number(maxMarks),
        passingMarks: Number(passingMarks),
        duration: Number(duration),
        date,
        startTime,
        venue,
        syllabus,
        teacher: user._id || user.id || undefined
      };

      console.log('Creating test with data:', bodyData);

      const res = await fetch(`/api/${instituteSlug}/tests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user.id,
        },
        body: JSON.stringify(bodyData),
      });

      const result = await res.json();
      console.log('Test creation response:', result);
      if (result.success) {
        if (onSuccess) {
          onSuccess('Test created successfully!');
        } else {
          onClose();
        }
      } else {
        const errorMsg = result.message || result.error || 'Failed to create test';
        setErrorMsg(errorMsg);
        if (onError) {
          onError(errorMsg);
        }
      }
    } catch (err: any) {
      console.error('Error saving test:', err);
      const errorMsg = err.message || 'An error occurred while saving test';
      setErrorMsg(errorMsg);
      if (onError) {
        onError(errorMsg);
      }
    } finally {
      setSubmitting(false);
    }
  };

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
          {errorMsg && (
            <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-semibold">
              {errorMsg}
            </div>
          )}

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Test Title *</label>
              <input 
                className="w-full h-12 rounded-2xl bg-bg-soft/20 border border-gray-100 px-6 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-brand-blue/10 transition-all"
                placeholder="e.g. Algebra Unit 3"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Subject *</label>
              <select 
                className="w-full h-12 rounded-2xl bg-bg-soft/20 border border-gray-100 px-6 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-brand-blue/10 transition-all appearance-none cursor-pointer"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              >
                {subjectsMock.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Target Batch *</label>
              <select 
                className="w-full h-12 rounded-2xl bg-bg-soft/20 border border-gray-100 px-6 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-brand-blue/10 transition-all appearance-none cursor-pointer"
                value={batchId}
                onChange={(e) => setBatchId(e.target.value)}
              >
                {batchesList.length === 0 ? (
                  <option value="">No batches available</option>
                ) : (
                  batchesList.map(b => <option key={b._id} value={b._id}>{b.name} ({b.standard})</option>)
                )}
              </select>
              {batchesList.length === 0 && (
                <p className="text-[9px] font-bold text-red-400 uppercase tracking-widest mt-1">Please create batches first</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Test Type *</label>
              <select 
                className="w-full h-12 rounded-2xl bg-bg-soft/20 border border-gray-100 px-6 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-brand-blue/10 transition-all appearance-none cursor-pointer"
                value={testType}
                onChange={(e) => setTestType(e.target.value)}
              >
                {["Chapter Test", "Unit Test", "Mid-term", "Final Exam", "Quiz"].map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-4 border-t border-gray-50">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Total Marks *</label>
              <input 
                type="number"
                className="w-full h-12 rounded-2xl bg-bg-soft/20 border border-gray-100 px-6 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-brand-blue/10 transition-all"
                placeholder="100"
                value={maxMarks}
                onChange={(e) => setMaxMarks(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Passing Marks *</label>
              <input 
                type="number"
                className="w-full h-12 rounded-2xl bg-bg-soft/20 border border-gray-100 px-6 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-brand-blue/10 transition-all"
                placeholder="40"
                value={passingMarks}
                onChange={(e) => setPassingMarks(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Duration (min) *</label>
              <input 
                type="number"
                className="w-full h-12 rounded-2xl bg-bg-soft/20 border border-gray-100 px-6 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-brand-blue/10 transition-all"
                placeholder="60"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Date *</label>
              <input 
                type="date"
                className="w-full h-12 rounded-2xl bg-bg-soft/20 border border-gray-100 px-6 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-brand-blue/10 transition-all"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Starting Time *</label>
              <input 
                type="time"
                className="w-full h-12 rounded-2xl bg-bg-soft/20 border border-gray-100 px-6 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-brand-blue/10 transition-all"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Venue *</label>
              <input 
                className="w-full h-12 rounded-2xl bg-bg-soft/20 border border-gray-100 px-6 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-brand-blue/10 transition-all"
                placeholder="Room 101"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Syllabus / Topics to cover</label>
            <textarea 
              className="w-full h-24 rounded-2xl bg-bg-soft/20 border border-gray-100 p-6 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-brand-blue/10 transition-all resize-none"
              placeholder="e.g. Chapter 3: Laws of Motion, Chapter 4: Static Friction..."
              value={syllabus}
              onChange={(e) => setSyllabus(e.target.value)}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-10 pt-6 bg-bg-soft/10 border-t border-gray-50 flex items-center justify-between">
           <div className="flex items-center gap-3">
              <button 
                type="button"
                onClick={() => setNotifySMS(!notifySMS)}
                className={`w-10 h-6 rounded-full p-1 transition-all ${notifySMS ? 'bg-brand-blue' : 'bg-gray-200'}`}
              >
                 <div className={`w-4 h-4 rounded-full bg-white transition-all ${notifySMS ? 'translate-x-4' : 'translate-x-0'}`} />
              </button>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest cursor-pointer" onClick={() => setNotifySMS(!notifySMS)}>Notify Students via SMS</span>
           </div>
           <div className="flex items-center gap-4">
             <Button variant="ghost" className="h-14 px-8 rounded-2xl text-gray-400 font-black uppercase text-[10px] tracking-widest" onClick={onClose} disabled={submitting}>Discard</Button>
             <Button 
               onClick={handleSave}
               disabled={submitting}
               className="h-14 px-10 rounded-2xl bg-brand-blue shadow-xl shadow-brand-blue/30 font-black text-xs uppercase tracking-[0.2em] gap-3"
             >
                {submitting ? 'Scheduling...' : <><Plus className="w-5 h-5" /> Schedule Test</>}
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
