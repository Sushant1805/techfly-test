'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Search, Plus, MapPin, Calendar,
  Clock, User, ChevronRight, Edit2,
  Trash2, Eye, MoreVertical, AlertCircle,
  CheckCircle2, Filter, CheckCircle, XCircle
} from 'lucide-react';
import { subjectsMock, Test } from '@/lib/mockData';
import { CreateTestModal } from '@/components/tests/TestModals';

export const AllTests: React.FC<{ onEnterMarks: (testId: string) => void }> = ({ onEnterMarks }) => {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateTestOpen, setIsCreateTestOpen] = useState(false);
  const [userRole, setUserRole] = useState('teacher');
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({ show: false, message: '', type: 'success' });

  const allowedCreateRoles = ['owner', 'manager', 'teacher', 'techfly_admin'];
  const canCreateTests = allowedCreateRoles.includes(userRole);

  const fetchTests = async () => {
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) return;

      const user = JSON.parse(userStr);
      const instituteSlug = user.instituteId;
      setUserRole(user.role || 'teacher');

      const res = await fetch(`/api/${instituteSlug}/tests`);
      const data = await res.json();

      if (data.success) {
        const today = new Date();
        const todayStr = today.toISOString().split('T')[0];
        const mapped = data.tests.map((t: any) => {
          const testDateStr = t.date;
          const isCompleted = testDateStr < todayStr;

          return {
            id: t._id,
            title: t.title,
            subject: t.subject,
            subjectColor: '#5E4E99',
            batchId: t.batchId?._id || '',
            batchName: t.batchId?.name || 'Unassigned',
            standard: t.batchId?.standard || '10th',
            teacherId: t.teacher?._id || '',
            teacherName: t.teacher?.name || 'TBA',
            testType: t.testType || 'Chapter Test',
            totalMarks: t.maxMarks || 100,
            passingMarks: t.passingMarks || 40,
            duration: t.duration || 60,
            scheduledDate: t.date,
            scheduledTime: t.startTime || '10:00 AM',
            venue: t.venue || 'Main Building',
            status: isCompleted ? 'Completed' : 'Upcoming',
            instructions: t.instructions || '',
            syllabus: t.syllabus || '',
            createdAt: t.createdAt,
            marksEntryDone: false,
            averageScore: null,
            highestScore: null,
            lowestScore: null,
            passCount: null,
            failCount: null
          };
        });
        setTests(mapped);
      }
    } catch (error) {
      console.error('Error fetching tests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTestCreated = (message: string) => {
    setToast({ show: true, message, type: 'success' });
    setIsCreateTestOpen(false);
    fetchTests();
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const handleTestError = (message: string) => {
    setToast({ show: true, message, type: 'error' });
    setTimeout(() => setToast({ show: false, message: '', type: 'error' }), 5000);
  };

  useEffect(() => {
    fetchTests();
  }, []);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBatch, setFilterBatch] = useState('All');
  const [filterSubject, setFilterSubject] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  // Get unique batch names from tests
  const uniqueBatches = useMemo(() => {
    const batches = new Set(tests.map(t => t.batchName).filter(Boolean));
    return Array.from(batches);
  }, [tests]);

  const filteredTests = useMemo(() => {
    return tests.filter(t => {
      const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           t.subject.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBatch = filterBatch === 'All' || t.batchName === filterBatch;
      const matchesSubject = filterSubject === 'All' || t.subject === filterSubject;
      const matchesStatus = filterStatus === 'All' || t.status === filterStatus;
      return matchesSearch && matchesBatch && matchesSubject && matchesStatus;
    });
  }, [searchTerm, filterBatch, filterSubject, filterStatus, tests]);

  const stats = useMemo(() => {
    const total = tests.length;
    const upcoming = tests.filter(t => t.status === 'Upcoming').length;
    const completed = tests.filter(t => t.status === 'Completed').length;
    const pendingMarks = tests.filter(t => t.status === 'Completed' && !t.marksEntryDone).length;
    return { total, upcoming, completed, pendingMarks };
  }, [tests]);

  const upcomingTests = filteredTests.filter(t => t.status === 'Upcoming');
  const completedTests = filteredTests.filter(t => t.status === 'Completed');

  return (
    <div className="space-y-10 pb-20">
      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed top-6 right-6 z-[300] animate-in slide-in-from-right-8 duration-500`}>
          <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl ${
            toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white`}>
            {toast.type === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <XCircle className="w-5 h-5" />
            )}
            <span className="font-black text-sm tracking-tight">{toast.message}</span>
          </div>
        </div>
      )}

      {/* 1. Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-6 p-6 rounded-[28px] bg-white shadow-soft">
        <div className="flex flex-wrap items-center gap-4 flex-1">
          <div className="relative min-w-[300px] flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              placeholder="Search by test name, subject, batch..."
              className="w-full h-11 pl-11 pr-4 rounded-xl border border-gray-100 bg-bg-soft/10 text-xs font-bold focus:outline-none focus:ring-4 focus:ring-brand-blue/10 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="h-11 px-4 rounded-xl border border-gray-100 bg-bg-soft/10 text-[10px] font-black uppercase tracking-widest focus:outline-none"
            value={filterBatch}
            onChange={(e) => setFilterBatch(e.target.value)}
          >
            <option value="All">All Batches</option>
            {uniqueBatches.map(batch => (
              <option key={batch} value={batch}>{batch}</option>
            ))}
          </select>
          <select 
            className="h-11 px-4 rounded-xl border border-gray-100 bg-bg-soft/10 text-[10px] font-black uppercase tracking-widest focus:outline-none"
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
          >
            <option>All Subjects</option>
            {subjectsMock.map(s => <option key={s.id}>{s.name}</option>)}
          </select>
        </div>
        <Button
          onClick={() => canCreateTests && setIsCreateTestOpen(true)}
          disabled={!canCreateTests}
          className="h-11 px-6 rounded-xl bg-brand-blue shadow-lg shadow-brand-blue/20 font-black text-[10px] uppercase tracking-widest gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" /> Create Test
        </Button>
      </div>

      {/* 2. Summary Strip */}
      <div className="flex flex-wrap items-center gap-8 px-10 py-5 rounded-[32px] bg-bg-soft/20 border border-white shadow-inner">
        <SummaryItem label="Total Tests" value={stats.total} />
        <SummaryItem label="Upcoming" value={stats.upcoming} color="text-brand-blue" />
        <SummaryItem label="Completed" value={stats.completed} color="text-green-500" />
        <button 
          onClick={() => setFilterStatus('Completed')}
          className="group flex flex-col"
        >
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 group-hover:text-amber-500 transition-colors">Marks Pending</p>
          <p className="text-xl font-black text-amber-500 flex items-center gap-2">
            {stats.pendingMarks}
            {stats.pendingMarks > 0 && <AlertCircle className="w-4 h-4 animate-pulse" />}
          </p>
        </button>
      </div>

      {/* 3. Upcoming Tests Grid/Scroll */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-lg font-black text-text-slate tracking-tight flex items-center gap-3">
            Upcoming Tests <Badge variant="Inactive" className="px-2.5">{upcomingTests.length}</Badge>
          </h3>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg"><ChevronLeftIcon className="w-4 h-4" /></Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg"><ChevronRightIcon className="w-4 h-4" /></Button>
          </div>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x">
          {upcomingTests.map(test => (
            <UpcomingCard key={test.id} test={test} />
          ))}
          {upcomingTests.length === 0 && (
            <div className="w-full h-40 flex items-center justify-center rounded-[32px] bg-bg-soft/5 border-2 border-dashed border-gray-100">
              <p className="text-xs font-bold text-gray-300 uppercase tracking-widest">No upcoming tests found</p>
            </div>
          )}
        </div>
      </section>

      {/* 4. Completed Tests Ledger */}
      <section className="space-y-6">
        <h3 className="text-lg font-black text-text-slate tracking-tight px-2 flex items-center gap-3">
          Completed Tests <Badge variant="Inactive" className="px-2.5">{completedTests.length}</Badge>
        </h3>
        <Card className="border-none shadow-soft rounded-[40px] overflow-hidden bg-white">
          <table className="w-full text-left">
            <thead className="bg-bg-soft/30 h-16 border-b border-gray-50">
              <tr>
                <th className="pl-10 text-[10px] font-black text-gray-400 uppercase tracking-widest">Test Name</th>
                <th className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Subject</th>
                <th className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Batch</th>
                <th className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Avg Score</th>
                <th className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Pass %</th>
                <th className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="pr-10 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {completedTests.map(test => (
                <tr key={test.id} className="h-20 hover:bg-bg-soft/5 transition-colors group">
                  <td className="pl-10">
                    <div>
                      <h5 className="font-black text-sm text-text-slate cursor-pointer hover:text-brand-blue transition-colors">{test.title}</h5>
                      <p className="text-[10px] font-bold text-gray-300 uppercase leading-none mt-1">{test.scheduledDate}</p>
                    </div>
                  </td>
                  <td>
                    <Badge style={{ backgroundColor: `${test.subjectColor}15`, color: test.subjectColor }} className="border-none font-black text-[9px] uppercase tracking-widest">
                      {test.subject}
                    </Badge>
                  </td>
                  <td>
                    <p className="text-xs font-bold text-text-slate mb-1">{test.batchName}</p>
                    <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest">{test.standard}</p>
                  </td>
                  <td>
                    <span className="font-black text-text-slate">
                      {test.averageScore ? `${test.averageScore}/${test.totalMarks}` : "\u2014"}
                    </span>
                  </td>
                  <td>
                    {test.averageScore ? (
                      <span className={`font-black ${Math.round((test.averageScore / test.totalMarks) * 100) >= 70 ? 'text-green-500' : 'text-amber-500'}`}>
                        {Math.round((test.averageScore / test.totalMarks) * 100)}%
                      </span>
                    ) : "\u2014"}
                  </td>
                  <td>
                    {test.marksEntryDone ? (
                      <Badge variant="Active" className="bg-green-50 text-green-600 gap-1.5 border-none font-black text-[9px] uppercase"><CheckCircle2 className="w-3 h-3" /> Entered</Badge>
                    ) : (
                      <Button 
                        onClick={() => onEnterMarks(test.id)}
                        className="h-8 px-4 rounded-xl bg-amber-500 text-white text-[9px] font-black uppercase tracking-widest shadow-lg shadow-amber-200"
                      >
                        Enter Marks
                      </Button>
                    )}
                  </td>
                  <td className="pr-10 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all">
                      <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-gray-300 hover:text-brand-blue"><Eye className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-gray-300 hover:text-text-slate"><Edit2 className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-gray-300 hover:text-text-slate"><MoreVertical className="w-4 h-4" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </section>

      <CreateTestModal
        isOpen={isCreateTestOpen}
        onClose={() => setIsCreateTestOpen(false)}
        onSuccess={handleTestCreated}
        onError={handleTestError}
      />
    </div>
  );
};

const SummaryItem = ({ label, value, color = 'text-text-slate' }: any) => (
  <div className="flex flex-col pr-8 border-r border-gray-100 last:border-none last:pr-0">
    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
    <p className={`text-xl font-black ${color}`}>{value}</p>
  </div>
);

const UpcomingCard = ({ test }: { test: Test }) => {
  const isToday = test.scheduledDate === new Date().toISOString().split('T')[0];

  return (
    <Card className="min-w-[320px] max-w-[320px] p-0 border-none shadow-soft rounded-[32px] overflow-hidden bg-white snap-center group hover:-translate-y-2 transition-all duration-300">
      <div className="h-1" style={{ backgroundColor: test.subjectColor }} />
      <div className="p-8 space-y-6">
        <div className="flex items-center justify-between">
          <Badge className="bg-bg-soft text-gray-400 font-bold text-[9px] uppercase tracking-widest border-none">
            {test.testType}
          </Badge>
          {isToday ? (
            <Badge className="bg-green-500 text-white text-[9px] font-black uppercase tracking-[0.2em] border-none shadow-lg shadow-green-100 px-3">Today</Badge>
          ) : (
            <Badge className="bg-brand-blue/10 text-brand-blue text-[9px] font-black uppercase tracking-widest border-none px-3">Upcoming</Badge>
          )}
        </div>

        <div>
          <h4 className="text-lg font-black text-text-slate tracking-tight mb-1 group-hover:text-brand-blue transition-colors">
            {test.title}
          </h4>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: test.subjectColor }}>{test.subject}</span>
            <div className="w-1 h-1 rounded-full bg-gray-200" />
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{test.batchName}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 py-6 border-y border-gray-50">
          <DetailItem icon={Calendar} label="Date" value={test.scheduledDate} />
          <DetailItem icon={Clock} label="Time" value={test.scheduledTime} />
          <DetailItem icon={Clock} label="Duration" value={`${test.duration} min`} />
          <DetailItem icon={MapPin} label="Venue" value={test.venue} />
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-bg-soft flex items-center justify-center">
              <User className="w-4 h-4 text-gray-400" />
            </div>
            <div>
              <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest leading-none mb-1">Teacher</p>
              <p className="text-[10px] font-black text-text-slate leading-none">{test.teacherName}</p>
            </div>
          </div>
          <p className="text-[10px] font-black text-text-slate">
            {test.totalMarks} <span className="text-gray-300">marks</span>
          </p>
        </div>

        <div className="pt-2 flex items-center gap-3">
          <Button variant="outline" className="flex-1 h-10 rounded-xl border-gray-100 font-black text-[9px] uppercase tracking-widest">Edit Test</Button>
          <Button variant="ghost" className="h-10 w-10 p-0 text-red-300 hover:bg-red-50 hover:text-red-500 transition-all rounded-xl">
             <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

const DetailItem = ({ icon: Icon, label, value }: any) => (
  <div className="flex items-center gap-2.5">
    <Icon className="w-3.5 h-3.5 text-gray-300" />
    <div>
      <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest leading-none mb-0.5">{label}</p>
      <p className="text-[10px] font-black text-text-slate leading-none">{value}</p>
    </div>
  </div>
);

const ChevronLeftIcon = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
const ChevronRightIcon = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
