'use client';
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  ChevronDown, Search, Check, Info, 
  User, CheckSquare, Trash2, Zap,
  Save, AlertCircle
} from 'lucide-react';
import { tests, students, Test, gradeScale } from '@/lib/mockData';

export const EnterMarks: React.FC<{ selectedTestId?: string }> = ({ selectedTestId: initialTestId }) => {
  const [selectedTestId, setSelectedTestId] = useState<string | null>(initialTestId || null);
  const [searchTerm, setSearchTerm] = useState('');
  const [marks, setMarks] = useState<Record<string, { marks: string; isAbsent: boolean; remarks: string }>>({});
  const [isSaved, setIsSaved] = useState(false);

  // Available tests for marks entry
  const marksPendingTests = useMemo(() => tests.filter(t => t.status === 'Completed'), []);
  const selectedTest = useMemo(() => tests.find(t => t.id === selectedTestId), [selectedTestId]);
  
  // Batch students
  const batchStudents = useMemo(() => {
    if (!selectedTest) return [];
    return students.filter(s => s.batch === selectedTest.batchName);
  }, [selectedTest]);

  // Derived Marks Analysis
  const analysis = useMemo(() => {
    const list = Object.values(marks);
    const entered = list.filter(m => m.marks !== '' || m.isAbsent).length;
    const absentsResult = list.filter(m => m.isAbsent).length;
    const numericMarks = list.filter(m => !m.isAbsent && m.marks !== '').map(m => Number(m.marks));
    
    const avg = numericMarks.length > 0 ? Math.round(numericMarks.reduce((a, b) => a + b, 0) / numericMarks.length) : 0;
    const high = numericMarks.length > 0 ? Math.max(...numericMarks) : 0;
    const low = numericMarks.length > 0 ? Math.min(...numericMarks) : 0;

    return { 
      total: batchStudents.length,
      entered, 
      pending: batchStudents.length - entered,
      absents: absentsResult,
      avg, 
      high, 
      low 
    };
  }, [marks, batchStudents]);

  // Initialize marks structure when test changes
  useEffect(() => {
    if (selectedTest) {
      const initial: any = {};
      batchStudents.forEach(s => {
        initial[s.id] = { marks: '', isAbsent: false, remarks: '' };
      });
      setMarks(initial);
      setIsSaved(false);
    }
  }, [selectedTestId, batchStudents, selectedTest]);

  const handleMarkChange = (studentId: string, value: string) => {
    if (selectedTest && Number(value) > selectedTest.totalMarks) return;
    setMarks(prev => ({
      ...prev,
      [studentId]: { ...prev[studentId], marks: value, isAbsent: false }
    }));
  };

  const toggleAbsent = (studentId: string) => {
    setMarks(prev => ({
      ...prev,
      [studentId]: { ...prev[studentId], isAbsent: !prev[studentId].isAbsent, marks: prev[studentId].isAbsent ? '' : '' }
    }));
  };

  const handleAutoFill = () => {
    if (!selectedTest) return;
    const filled: any = {};
    batchStudents.forEach(s => {
      const isAbs = Math.random() < 0.05;
      filled[s.id] = {
        marks: isAbs ? '' : String(Math.floor(Math.random() * (selectedTest.totalMarks - 10) + 10)),
        isAbsent: isAbs,
        remarks: ''
      };
    });
    setMarks(filled);
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  // Keyboard Navigation: Tab/Enter focus next row
  const inputRefs = useRef<any>({});

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-40">
      {/* 1. Test Selector */}
      <section className="space-y-4">
        <label className="text-[10px] font-black text-brand-blue uppercase tracking-widest ml-4 block border-l-2 border-brand-blue pl-2">Test Selection</label>
        <div className="flex items-center gap-6">
          <div className="relative flex-1">
            <select 
              className="w-full h-16 rounded-[28px] bg-white border border-gray-100 shadow-soft pl-8 pr-12 text-sm font-black text-text-slate appearance-none focus:outline-none focus:ring-4 focus:ring-brand-blue/10 transition-all cursor-pointer"
              value={selectedTestId || ''}
              onChange={(e) => setSelectedTestId(e.target.value)}
            >
              <option value="" disabled>Select a completed test to enter marks...</option>
              {marksPendingTests.map(t => (
                <option key={t.id} value={t.id}>{t.title} \u2014 {t.subject} \u2014 {t.batchName} ({t.scheduledDate})</option>
              ))}
            </select>
            <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
          <Button 
            variant="outline"
            onClick={handleAutoFill}
            disabled={!selectedTest}
            className="h-16 px-8 rounded-2xl border-gray-100 font-black text-[10px] uppercase tracking-widest gap-2 text-brand-blue hover:bg-brand-blue/5 shadow-soft border-none"
          >
            <Zap className="w-4 h-4" /> Auto-fill Sample Data
          </Button>
        </div>
      </section>

      {selectedTest ? (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-500">
           {/* 2. Test Info Strip */}
           <div className="flex items-center gap-8 px-10 py-6 rounded-[32px] bg-brand-blue/5 border border-brand-blue/10 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-full -translate-y-12 translate-x-12" />
              <div className="space-y-1">
                <p className="text-[9px] font-black text-brand-blue uppercase tracking-widest leading-none">Selected Test</p>
                <h3 className="text-xl font-black text-text-slate tracking-tight">{selectedTest.title}</h3>
              </div>
              <div className="w-px h-8 bg-brand-blue/10" />
              <DetailItem label="Subject" value={selectedTest.subject} color={selectedTest.subjectColor} />
              <DetailItem label="Batch" value={`${selectedTest.batchName} (${selectedTest.standard})`} />
              <DetailItem label="Max Marks" value={selectedTest.totalMarks} />
              <DetailItem label="Duration" value={`${selectedTest.duration} min`} />
           </div>

           {/* 3. Live Summary Bar */}
           <div className="flex items-center justify-between gap-6 p-6 rounded-[28px] bg-white shadow-soft-lg sticky top-20 z-20 border border-gray-50/50 backdrop-blur-xl">
              <div className="flex items-center gap-8">
                <SummaryStat label="Entered" value={`${analysis.entered}/${analysis.total}`} color="text-brand-blue" />
                <SummaryStat label="Absents" value={analysis.absents} color="text-red-500" />
                <SummaryStat label="Pending" value={analysis.pending} color={analysis.pending > 0 ? 'text-amber-500' : 'text-green-500'} />
              </div>
              <div className="w-px h-8 bg-gray-100" />
              <div className="flex items-center gap-8">
                <SummaryStat label="Calculated Avg" value={analysis.avg > 0 ? `${analysis.avg}/${selectedTest.totalMarks}` : "\u2014"} />
                <SummaryStat label="Highest" value={analysis.high > 0 ? analysis.high : "\u2014"} color="text-green-500" />
                <SummaryStat label="Lowest" value={analysis.low > 0 ? analysis.low : "\u2014"} color="text-red-400" />
              </div>
              <div className="relative w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  placeholder="Find student..."
                  className="w-full h-10 pl-10 pr-4 rounded-xl border border-gray-100 bg-bg-soft/20 text-xs font-bold focus:outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
           </div>

           {/* 4. Marks Table */}
           <Card className="border-none shadow-soft rounded-[40px] overflow-hidden bg-white">
              <table className="w-full text-left">
                <thead className="bg-bg-soft/30 h-16 border-b border-gray-50">
                  <tr>
                    <th className="pl-10 text-[10px] font-black text-gray-400 uppercase tracking-widest w-12 text-center">#</th>
                    <th className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Student</th>
                    <th className="text-[10px] font-black text-gray-400 uppercase tracking-widest w-40">Marks Obtained</th>
                    <th className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Analysis</th>
                    <th className="text-[10px] font-black text-gray-400 uppercase tracking-widest w-32 text-center">Absent</th>
                    <th className="pr-10 text-[10px] font-black text-gray-400 uppercase tracking-widest">Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {batchStudents.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase())).map((student, idx) => {
                    const studentMark = marks[student.id] || { marks: '', isAbsent: false, remarks: '' };
                    const percent = studentMark.marks !== '' ? Math.round((Number(studentMark.marks) / selectedTest.totalMarks) * 100) : null;
                    const grade = percent !== null ? gradeScale.find(g => percent >= g.minPercent && percent <= g.maxPercent)?.grade : '\u2014';
                    const gradeColor = percent !== null ? gradeScale.find(g => percent >= g.minPercent && percent <= g.maxPercent)?.color : '#CBD5E1';

                    return (
                      <tr key={student.id} className={`h-20 group transition-colors ${studentMark.isAbsent ? 'bg-red-50/20' : 'hover:bg-bg-soft/5'}`}>
                        <td className="pl-10 text-center font-black text-xs text-gray-300">
                          {idx + 1}
                        </td>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs shadow-sm transition-all duration-300 ${studentMark.isAbsent ? 'bg-gray-100 text-gray-400' : 'bg-brand-blue/5 text-brand-blue group-hover:scale-110'}`}>
                              {student.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-black text-sm text-text-slate leading-none mb-1">{student.name}</p>
                              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{student.rollNumber}</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center gap-2">
                            <div className="relative">
                              <input 
                                type="number"
                                ref={el => { inputRefs.current[student.id] = el; }}
                                value={studentMark.marks}
                                disabled={studentMark.isAbsent}
                                onChange={(e) => handleMarkChange(student.id, e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' || e.key === 'Tab') {
                                    e.preventDefault();
                                    const nextIdx = batchStudents.findIndex(s => s.id === student.id) + 1;
                                    const nextStudent = batchStudents[nextIdx];
                                    if (nextStudent) inputRefs.current[nextStudent.id]?.focus();
                                  }
                                }}
                                className={`w-20 h-12 rounded-xl text-center font-black text-lg focus:outline-none focus:ring-4 transition-all duration-300 ${
                                  studentMark.isAbsent 
                                  ? 'bg-gray-50 text-gray-300 border-none' 
                                  : 'bg-white border-2 border-gray-100 text-text-slate focus:border-brand-blue focus:ring-brand-blue/10'
                                }`}
                              />
                            </div>
                            <span className="text-gray-300 font-bold">/ {selectedTest.totalMarks}</span>
                          </div>
                        </td>
                        <td>
                          <div className={`flex items-center gap-4 transition-all duration-500 overflow-hidden ${studentMark.marks !== '' ? 'w-40 opacity-100' : 'w-0 opacity-0'}`}>
                             <div className="flex-1 space-y-1">
                                <div className="flex justify-between text-[8px] font-black uppercase">
                                  <span style={{ color: gradeColor }}>{grade} Grade</span>
                                  <span>{percent}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-gray-100 rounded-full">
                                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${percent}%`, backgroundColor: gradeColor }} />
                                </div>
                             </div>
                             <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs" style={{ backgroundColor: `${gradeColor}10`, color: gradeColor }}>
                                {grade}
                             </div>
                          </div>
                          {studentMark.isAbsent && <Badge className="bg-red-500 text-white border-none text-[9px] font-black uppercase tracking-widest px-3">Absent</Badge>}
                        </td>
                        <td className="text-center">
                          <button 
                            onClick={() => toggleAbsent(student.id)}
                            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                              studentMark.isAbsent 
                              ? 'bg-red-500 text-white shadow-lg shadow-red-200 scale-105' 
                              : 'bg-gray-50 text-gray-300 hover:bg-red-50 hover:text-red-400'
                            }`}
                          >
                             <CheckSquare className="w-5 h-5" />
                          </button>
                        </td>
                        <td className="pr-10">
                          <input 
                            placeholder="Add remarks..."
                            className="w-full h-10 bg-transparent border-none text-xs font-bold text-gray-400 focus:text-text-slate focus:outline-none transition-colors"
                            value={studentMark.remarks}
                            onChange={(e) => setMarks(prev => ({ ...prev, [student.id]: { ...prev[student.id], remarks: e.target.value } }))}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
           </Card>

           {/* 5. Sticky Save Footer */}
           <div className="fixed bottom-10 left-[280px] right-10 z-[100] animate-in slide-in-from-bottom-full duration-700">
              <div className="p-4 rounded-[32px] bg-text-slate/90 backdrop-blur-xl border border-white/10 shadow-2xl flex items-center justify-between gap-10 px-10">
                 <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-brand-blue/20 flex items-center justify-center text-brand-blue border border-brand-blue/30 shadow-inner">
                       <CheckSquare className="w-6 h-6" />
                    </div>
                    <div>
                       <p className="text-white font-black text-sm">{selectedTest.title}</p>
                       <p className="text-white/40 text-[9px] font-bold uppercase tracking-widest">
                          {analysis.entered} Students Marked \u2022 {analysis.absents} Absents
                       </p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <Button variant="ghost" className="h-14 px-8 rounded-2xl text-white/50 hover:text-white hover:bg-white/10 font-black uppercase text-[10px] tracking-widest">Discard Changes</Button>
                    <Button 
                       onClick={handleSave}
                       className="h-14 px-10 rounded-2xl bg-brand-blue border-none shadow-xl shadow-brand-blue/30 font-black text-[11px] uppercase tracking-[0.2em] gap-4 group"
                    >
                       {isSaved ? <Check className="w-5 h-5 animate-in zoom-in" /> : <Save className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />}
                       {isSaved ? "Results Published!" : "Save & Publish Results"}
                    </Button>
                 </div>
              </div>
           </div>
        </div>
      ) : (
        <NoSelectionPlaceholder tests={marksPendingTests} onSelect={setSelectedTestId} />
      )}
    </div>
  );
};

const NoSelectionPlaceholder = ({ tests, onSelect }: any) => (
  <Card className="flex flex-col items-center justify-center min-h-[500px] rounded-[40px] border-none bg-white shadow-soft relative overflow-hidden">
    <div className="absolute top-0 right-0 w-64 h-64 bg-bg-soft/20 rounded-full translate-x-20 -translate-y-20 flex items-center justify-center">
      <Zap className="w-32 h-32 text-gray-100" />
    </div>
    <div className="w-24 h-24 rounded-[40px] border-4 border-dashed border-gray-100 flex items-center justify-center mb-8">
      <User className="w-10 h-10 text-gray-200" />
    </div>
    <h3 className="text-2xl font-black text-text-slate tracking-tight mb-2">No Test Selected</h3>
    <p className="text-sm font-bold text-gray-300 uppercase tracking-widest max-w-sm text-center leading-relaxed">Select a completed test from the dropdown or pick from recently conducted tests below to start entering marks.</p>
    
    <div className="mt-12 grid grid-cols-3 gap-6 w-full max-w-4xl px-10">
      {tests.slice(0, 3).map((t: any) => (
        <button 
          key={t.id} 
          onClick={() => onSelect(t.id)}
          className="p-6 rounded-[28px] bg-bg-soft/10 border border-gray-50 flex flex-col hover:border-brand-blue/30 hover:bg-white transition-all group group-hover:shadow-soft"
        >
          <p className="text-[9px] font-black text-brand-blue uppercase tracking-widest mb-2">{t.subject}</p>
          <p className="text-sm font-black text-text-slate leading-tight mb-4 group-hover:text-brand-blue transition-colors">{t.title}</p>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-[10px] font-bold text-gray-400 capitalize">{t.batchName}</span>
            <ChevronRightIcon className="w-4 h-4 text-gray-300 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      ))}
    </div>
  </Card>
);

const DetailItem = ({ label, value, color }: any) => (
  <div className="flex flex-col">
    <p className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em] mb-0.5">{label}</p>
    <p className="text-xs font-black text-text-slate" style={color ? { color } : {}}>{value}</p>
  </div>
);

const SummaryStat = ({ label, value, color = 'text-text-slate' }: any) => (
  <div className="flex flex-col">
    <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-0.5">{label}</p>
    <p className={`text-lg font-black tracking-tight ${color}`}>{value}</p>
  </div>
);

const ChevronRightIcon = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
