'use client';
import React, { useState, useMemo } from 'react';
import { X, Edit, Calendar, Users, Send, CheckCircle2, FileText, Paperclip, Download, User, Clock, AlertCircle, Search, Star, DownloadCloud, Check, Lock, ChevronDown, ListTodo, Activity as ActivityIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Tabs } from '@/components/ui/Tabs';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Assignment, studentSubmissions } from '@/lib/mockData';

interface AssignmentDetailPanelProps {
  assignment: Assignment;
  onClose: () => void;
}

export default function AssignmentDetailPanel({ assignment, onClose }: AssignmentDetailPanelProps) {
  const [activeTab, setActiveTab] = useState('details');

  const panelTabs = [
    { id: 'details', label: 'Details', icon: <FileText size={16} /> },
    { id: 'submissions', label: 'Submissions', icon: <Send size={16} /> },
    { id: 'grade', label: 'Grade', icon: <Star size={16} /> },
    { id: 'activity', label: 'Activity', icon: <ActivityIcon size={16} /> },
  ];

  const submissions = useMemo(() => {
    return studentSubmissions.filter(s => s.assignmentId === assignment.id);
  }, [assignment.id]);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="absolute inset-y-0 right-0 max-w-[550px] w-full bg-white shadow-2xl flex flex-col transform transition-transform duration-300 animate-in slide-in-from-right overflow-hidden">
        {/* Header */}
        <div className="relative border-t-8 h-fit bg-white" style={{ borderTopColor: assignment.subjectColor }}>
          <div className="p-6 pb-4 flex justify-between items-start">
            <div className="space-y-1 pr-8">
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge variant="secondary" className="text-[10px] uppercase font-bold tracking-wider">{assignment.subject}</Badge>
                <Badge variant="secondary" className="text-[10px] uppercase font-bold tracking-wider">{assignment.batchName}</Badge>
                <div className="px-2 py-0.5 bg-purple-50 text-purple-700 text-[10px] font-bold uppercase rounded border border-purple-100">{assignment.type}</div>
              </div>
              <h2 className="text-xl font-bold text-gray-900 leading-tight">{assignment.title}</h2>
              <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                <Calendar size={14} />
                <span className={new Date(assignment.dueDate) < new Date() && assignment.status === 'Active' ? 'text-red-500 font-bold' : ''}>
                  Due: {assignment.dueDate}, {assignment.dueTime}
                </span>
                {new Date(assignment.dueDate) < new Date() && assignment.status === 'Active' && (
                  <Badge variant="destructive" className="ml-2 text-[10px]">OVERDUE</Badge>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2 absolute top-6 right-6">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-600" onClick={onClose}>
                <X size={24} />
              </button>
            </div>

            <Badge variant={assignment.status === 'Active' ? 'Active' : assignment.status === 'Graded' ? 'default' : 'Pending'} className="absolute top-2 right-12 text-[10px]">
              {assignment.status}
            </Badge>
          </div>

          <Tabs 
            tabs={panelTabs} 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
            className="px-6 border-t border-gray-100" 
          />
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-6">
            {activeTab === 'details' && (
              <DetailsTab assignment={assignment} submissions={submissions} />
            )}
            {activeTab === 'submissions' && (
              <SubmissionsTab assignment={assignment} submissions={submissions} />
            )}
            {activeTab === 'grade' && (
              <GradeTab assignment={assignment} submissions={submissions} />
            )}
            {activeTab === 'activity' && (
              <ActivityTab assignment={assignment} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-components for Tabs
function DetailsTab({ assignment, submissions }: { assignment: Assignment, submissions: any[] }) {
  const missingCount = assignment.totalStudents - assignment.submittedCount;
  
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: 'Total Students', value: assignment.totalStudents, icon: <Users size={16} className="text-purple-600" /> },
          { label: 'Submitted', value: assignment.submittedCount, icon: <Send size={16} className="text-blue-600" /> },
          { label: 'Missing', value: missingCount, icon: <AlertCircle size={16} className="text-red-600" /> },
          { label: 'Late Penalty', value: `${assignment.latePenaltyPercent}%`, icon: <Clock size={16} className="text-amber-600" /> },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
            <div className="p-2 bg-gray-50 rounded-lg">{stat.icon}</div>
            <div>
              <div className="text-xs text-gray-500 font-medium">{stat.label}</div>
              <div className="text-lg font-bold text-gray-900">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      <Card className="p-5 space-y-4">
        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-2">Description</h3>
          <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">{assignment.description}</p>
        </div>
        
        {assignment.instructions.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-2">Instructions</h3>
            <ul className="space-y-2">
              {assignment.instructions.map((inst, i) => (
                <li key={i} className="flex gap-3 text-sm text-gray-600 leading-relaxed capitalize">
                  <span className="font-bold text-purple-600">{i + 1}.</span>
                  {inst}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Card>

      <div className="space-y-3">
        <h3 className="text-sm font-bold text-gray-900">Attachments</h3>
        {assignment.attachments.length > 0 ? (
          <div className="space-y-2">
            {assignment.attachments.map(att => (
              <div key={att.id} className="bg-white p-3 rounded-lg border border-gray-100 flex items-center justify-between hover:border-purple-200 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-50 rounded text-purple-600">
                    <Paperclip size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900 line-clamp-1">{att.fileName}</div>
                    <div className="text-[10px] text-gray-400">{att.fileSize} • {att.fileType.toUpperCase()}</div>
                  </div>
                </div>
                <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors opacity-0 group-hover:opacity-100">
                  <Download size={18} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-gray-400 italic bg-gray-100 py-3 text-center rounded-lg">No files attached</div>
        )}
      </div>

      <div className="flex gap-3 pt-4 border-t border-gray-200">
        <Button className="flex-1 bg-purple-600 hover:bg-purple-700 gap-2">
          <Clock size={16} />
          Send Reminder to Missing
        </Button>
        <Button variant="outline" className="flex-1 bg-white">Close Assignment</Button>
      </div>
    </div>
  );
}

function SubmissionsTab({ assignment, submissions }: { assignment: Assignment, submissions: any[] }) {
  const [filter, setFilter] = useState('All');
  
  const filtered = useMemo(() => {
    if (filter === 'All') return submissions;
    if (filter === 'Late') return submissions.filter(s => s.isLate);
    if (filter === 'Missing') return submissions.filter(s => s.status === 'Missing');
    if (filter === 'Graded') return submissions.filter(s => s.status === 'Graded');
    return submissions.filter(s => s.status === 'Submitted');
  }, [submissions, filter]);

  const stats = useMemo(() => ({
    count: submissions.filter(s => s.status !== 'Missing').length,
    late: submissions.filter(s => s.isLate).length,
    missing: submissions.filter(s => s.status === 'Missing').length,
    onTime: submissions.filter(s => s.status !== 'Missing' && !s.isLate).length,
    graded: submissions.filter(s => s.status === 'Graded').length
  }), [submissions]);

  return (
    <div className="space-y-4 animate-in fade-in duration-300 h-full flex flex-col">
      <div className="flex flex-wrap gap-4 text-[11px] font-bold text-gray-500 bg-white p-3 rounded-xl border border-gray-100 uppercase tracking-wider">
        <div className="flex gap-1.5"><span className="text-blue-600">Submitted:</span> {stats.count}</div>
        <div className="flex gap-1.5"><span className="text-green-600">On Time:</span> {stats.onTime}</div>
        <div className="flex gap-1.5"><span className="text-amber-600">Late:</span> {stats.late}</div>
        <div className="flex gap-1.5"><span className="text-red-600">Missing:</span> {stats.missing}</div>
        <div className="flex gap-1.5"><span className="text-purple-600">Graded:</span> {stats.graded}</div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {['All', 'Submitted', 'Missing', 'Late', 'Graded'].map(f => (
          <button 
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
              filter === f ? 'bg-purple-600 border-purple-600 text-white shadow-md' : 'bg-white border-gray-200 text-gray-500 hover:border-purple-200'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-2 flex-1 overflow-y-auto">
        {filtered.map(sub => (
          <div key={sub.id} className="bg-white p-4 rounded-xl border border-gray-100 flex items-center justify-between group hover:border-purple-100 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500 border border-gray-200 uppercase">
                {sub.studentName.split(' ').map((n: string) => n[0]).join('')}
              </div>
              <div>
                <div className="text-sm font-bold text-gray-900 pr-2">{sub.studentName} <span className="text-xs text-gray-400 font-medium ml-1">({sub.rollNumber})</span></div>
                <div className="text-[10px] text-gray-500 mt-0.5 flex items-center gap-2">
                  {sub.status === 'Missing' ? (
                    <span className="text-red-500 font-bold uppercase tracking-tight">Not Submitted Yet</span>
                  ) : (
                    <>
                      <span>{sub.submittedAt}</span>
                      {sub.isLate && <span className="px-1.5 py-0.5 bg-amber-50 text-amber-600 rounded font-bold uppercase text-[9px]">LATE (-{sub.latePenaltyApplied}%)</span>}
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {sub.status === 'Missing' ? (
                <Button size="sm" variant="outline" className="text-[10px] h-8 font-bold border-purple-100 text-purple-600 hover:bg-purple-50">REMIND</Button>
              ) : (
                <>
                  <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors" title="View Files"><Paperclip size={18} /></button>
                  <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors" title="Grade"><Star size={18} /></button>
                </>
              )}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="py-10 text-center text-gray-400 text-sm">No submissions found matching this filter</div>
        )}
      </div>
    </div>
  );
}

function GradeTab({ assignment, submissions }: { assignment: Assignment, submissions: any[] }) {
  const eligibleSubmissions = submissions.filter(s => s.status !== 'Missing');
  const [gradedCount, setGradedCount] = useState(submissions.filter(s => s.status === 'Graded').length);

  return (
    <div className="space-y-5 animate-in fade-in duration-300 flex flex-col h-full">
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-3">
        <div className="flex justify-between items-center text-xs font-bold text-gray-500 uppercase">
          <span>Grading Progress</span>
          <span>{gradedCount} / {eligibleSubmissions.length} graded</span>
        </div>
        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-purple-600 transition-all duration-500" 
            style={{ width: `${(gradedCount / (eligibleSubmissions.length || 1)) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-[11px] font-bold">
          <span className="text-gray-400 uppercase tracking-tighter">Avg: {assignment.averageScore || '—'} / {assignment.totalMarks}</span>
          <div className="flex gap-2">
            <button className="text-purple-600 hover:underline">Export CSV</button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4">
        {eligibleSubmissions.map(sub => (
          <div key={sub.id} className="bg-white p-5 rounded-2xl border border-gray-100 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center font-bold text-purple-700">
                  {sub.studentName.split(' ').map((n: string) => n[0]).join('')}
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900">{sub.studentName} <span className="text-xs text-gray-400 ml-1">({sub.rollNumber})</span></div>
                  <div className="text-[10px] text-gray-500 uppercase font-black tracking-wide mt-0.5">
                    {sub.isLate ? <span className="text-amber-600">Submitted Late</span> : <span className="text-green-600">Submitted On Time</span>}
                  </div>
                </div>
              </div>
              <button className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:underline bg-blue-50 px-2.5 py-1.5 rounded-lg border border-blue-100">
                <Paperclip size={14} /> See Files
              </button>
            </div>

            <div className="grid grid-cols-5 gap-3">
              <div className="col-span-2 space-y-1.5">
                <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest pl-1">Marks</label>
                <div className="flex items-center gap-2">
                  <Input 
                    type="number" 
                    placeholder="—" 
                    className="h-11 font-bold text-lg text-center" 
                    defaultValue={sub.marksObtained || ''}
                    disabled={sub.status === 'Graded'}
                  />
                  <span className="text-gray-400 font-bold text-sm">/ {assignment.totalMarks}</span>
                </div>
              </div>
              <div className="col-span-3 space-y-1.5">
                <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest pl-1">Feedback</label>
                <Input 
                  placeholder="Private feedback..." 
                  className="h-11 text-sm italic" 
                  defaultValue={sub.feedback || ''}
                  disabled={sub.status === 'Graded'}
                />
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="w-4 h-4 border border-gray-300 rounded flex items-center justify-center group-hover:border-purple-400 transition-colors">
                    <Check size={10} className="text-white bg-purple-600 rounded-sm opacity-0 group-hover:opacity-100" />
                  </div>
                  <span className="text-[11px] font-bold text-gray-500 uppercase">Absent</span>
                </label>
              </div>
              
              {sub.status === 'Graded' ? (
                <div className="flex items-center gap-2 text-green-600 text-xs font-bold bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
                  <CheckCircle2 size={16} /> Graded
                  <button className="ml-2 text-gray-400 hover:text-blue-600"><Lock size={14} /></button>
                </div>
              ) : (
                <Button className="bg-purple-600 hover:bg-purple-700 h-9 px-6 font-bold text-xs uppercase shadow-purple-100 shadow-lg" onClick={() => setGradedCount(prev => prev + 1)}>
                  Save Grade
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2">
        <Button className="w-full h-12 bg-gray-900 hover:bg-black text-white font-black text-sm uppercase tracking-widest shadow-xl transition-all">
          Save All & Publish Grades
        </Button>
      </div>
    </div>
  );
}

function ActivityTab({ assignment }: { assignment: Assignment }) {
  const events = [
    { type: 'published', author: assignment.teacherName, text: 'Assignment published — notified 42 students', date: assignment.publishedAt || '1 Apr 2026', time: '9:05 AM', color: 'bg-blue-500' },
    { type: 'created', author: assignment.teacherName, text: `Assignment created by ${assignment.teacherName}`, date: assignment.createdAt, time: '9:00 AM', color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300 py-4 px-2">
      <div className="relative space-y-8">
        <div className="absolute left-2.5 top-0 bottom-0 w-0.5 bg-gray-100" />
        
        {events.map((event, i) => (
          <div key={i} className="relative pl-10">
            <div className={`absolute left-0 top-1 w-5 h-5 rounded-full border-4 border-white shadow-sm ring-2 ring-gray-100 ${event.color}`} />
            <div className="space-y-1">
              <div className="text-sm font-bold text-gray-900 leading-none">{event.text}</div>
              <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">
                {event.date} • {event.time}
              </div>
            </div>
          </div>
        ))}

        {/* Mock future events if Active */}
        {assignment.status === 'Active' && (
          <div className="relative pl-10 opacity-40 grayscale translate-y-4">
            <div className="absolute left-0 top-1 w-5 h-5 rounded-full border-4 border-white shadow-sm ring-2 ring-gray-100 bg-gray-300" />
            <div className="space-y-1">
              <div className="text-sm font-bold text-gray-400 leading-none">Grading scheduled after due date</div>
              <div className="text-[10px] text-gray-300 font-bold uppercase tracking-wide">
                {assignment.dueDate} • After 23:59
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
