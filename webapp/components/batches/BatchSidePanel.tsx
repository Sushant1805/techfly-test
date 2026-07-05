import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  X, User, Clock, CreditCard, BookOpen, FileText, Calendar, 
  DoorOpen, Phone, Mail, Plus, Trash2, Edit, AlertCircle, 
  CheckCircle, ChevronLeft, ChevronRight, Send, Download, Search
} from 'lucide-react';
import { Batch, Teacher, teachers, students, StatusType, subjectColors, studentNotes } from '@/lib/mockData';

interface BatchSidePanelProps {
  batch: Batch | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (batch: Batch) => void;
  onAddStudent: (batch: Batch) => void;
  onCreateTest: (batch: Batch) => void;
}

type TabType = 'Overview' | 'Students' | 'Attendance' | 'Schedule' | 'Tests' | 'Notes';

export const BatchSidePanel: React.FC<BatchSidePanelProps> = ({ 
  batch, 
  isOpen, 
  onClose, 
  onEdit, 
  onAddStudent,
  onCreateTest
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('Overview');

  if (!batch) return null;

  const tabs: { id: TabType; icon: any }[] = [
    { id: 'Overview', icon: User },
    { id: 'Students', icon: UsersIcon },
    { id: 'Attendance', icon: Clock },
    { id: 'Schedule', icon: Calendar },
    { id: 'Tests', icon: BookOpen },
    { id: 'Notes', icon: FileText },
  ];

  return (
    <>
      {/* Overlay - visible on small screens */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/30 backdrop-blur-sm z-[80] lg:hidden animate-in fade-in duration-300"
          onClick={onClose}
        />
      )}

      {/* Side Panel Container */}
      <div 
        className={`fixed top-0 right-0 bottom-0 z-[90] w-full max-w-[500px] bg-white shadow-soft-lg transform transition-transform duration-500 ease-in-out border-l border-gray-100 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* colored accent bar at very top */}
        <div className="h-1 w-full flex-shrink-0" style={{ backgroundColor: batch.color }} />

        {/* Header */}
        <div className="p-10 border-b border-gray-50 bg-gradient-to-br from-white to-bg-soft/30 relative overflow-hidden group">
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center text-gray-400 hover:text-brand-blue transition-all z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-4 relative z-10">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-black text-text-slate tracking-tight leading-none">{batch.name}</h2>
              <div className="flex items-center gap-2">
                <Badge variant="default" className="bg-brand-blue/10 text-brand-blue border-none font-bold text-[10px]">{batch.standard}</Badge>
                <Badge variant={batch.status === 'Active' ? 'Active' : 'Partial'} className="font-bold text-[10px]">{batch.status}</Badge>
              </div>
            </div>
            
            <p className="text-sm font-bold text-gray-400 flex flex-wrap items-center gap-2 tracking-tight">
              <span>{batch.standard}</span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span>{(batch.schedule || []).map(s => (s.day || '').substring(0, 3)).join('/')}</span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span>{batch.schedule?.[0]?.startTime || '10:00'}–{batch.schedule?.[0]?.endTime || '12:00'} AM</span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span>{batch.room || 'Room 101'}</span>
            </p>
          </div>
          
          <Button 
            variant="ghost" 
            className="absolute bottom-8 right-10 h-10 px-4 rounded-xl bg-white hover:bg-brand-blue hover:text-white shadow-soft transition-all text-xs font-black uppercase tracking-widest"
            onClick={() => onEdit(batch)}
          >
            <Edit className="w-3.5 h-3.5 mr-2" /> Edit Batch
          </Button>
        </div>

        {/* Tab Navigation */}
        <div className="px-4 border-b border-gray-50 flex items-center justify-between bg-white z-10 overflow-x-auto no-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex flex-col items-center gap-2 py-4 px-2 min-w-[70px] transition-all relative group ${
                activeTab === tab.id 
                  ? 'text-brand-blue' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <tab.icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${activeTab === tab.id ? 'scale-110' : ''}`} />
              <span className="text-[9px] font-black uppercase tracking-tighter">{tab.id === 'Tests' ? 'Tests & Assig.' : tab.id}</span>
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-blue animate-in fade-in zoom-in-y" />
              )}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-white">
          <div className="p-8 animate-in fade-in slide-in-from-right-5 duration-500">
            {activeTab === 'Overview' && <OverviewTab batch={batch} />}
            {activeTab === 'Students' && <StudentsTab batch={batch} onAddStudent={() => onAddStudent(batch)} />}
            {activeTab === 'Attendance' && <AttendanceTab batch={batch} />}
            {activeTab === 'Schedule' && <ScheduleTab batch={batch} />}
            {activeTab === 'Tests' && <TestsTab batch={batch} onCreateTest={() => onCreateTest(batch)} />}
            {activeTab === 'Notes' && <NotesTab batch={batch} />}
          </div>
        </div>
      </div>
    </>
  );
};

// --- Tab: Overview ---
const OverviewTab = ({ batch }: { batch: Batch }) => {
  const fillPercent = Math.round((batch.totalStudents / batch.capacity) * 100);
  return (
    <div className="space-y-10">
      {/* Batch Info Card */}
      <section className="space-y-4">
        <h4 className="text-xs font-black text-brand-blue uppercase tracking-[0.2em] px-2">Batch Information</h4>
        <div className="grid grid-cols-2 gap-3">
          <DetailItem label="Batch ID" value={batch.id} />
          <DetailItem label="Standard" value={batch.standard} />
          <DetailItem label="Room" value={batch.room} />
          <DetailItem label="Start Date" value={batch.startDate} />
          <DetailItem label="Monthly Fees" value={`₹${(batch.fees || 0).toLocaleString()}`} />
          <DetailItem label="Status" value={batch.status} />
        </div>
      </section>

      {/* Teacher Card */}
      <section className="space-y-4">
        <h4 className="text-xs font-black text-brand-blue uppercase tracking-[0.2em] px-2">Assigned Teacher</h4>
        <div className="p-6 rounded-[28px] border border-gray-100 bg-white shadow-soft flex items-start gap-6 group hover:shadow-soft-lg transition-all">
          <div className="w-16 h-16 rounded-[20px] bg-brand-blue/10 text-brand-blue flex items-center justify-center font-black text-2xl group-hover:scale-105 transition-transform">
            {(batch.teacher?.name || 'U').charAt(0)}
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <p className="text-lg font-black text-text-slate leading-none mb-2">{batch.teacher?.name || 'Unassigned'}</p>
              <div className="flex flex-wrap gap-1.5">
                {(batch.teacher?.subjects || []).map(s => (
                  <span key={s} className="px-2 py-0.5 rounded-lg bg-bg-soft text-[9px] font-black text-gray-500 uppercase tracking-tighter">{s}</span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-6 pt-2 border-t border-gray-50">
              {batch.teacher?.phone && (
                <a href={`tel:${batch.teacher.phone}`} className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-brand-blue transition-colors">
                  <Phone className="w-3.5 h-3.5" /> {batch.teacher.phone}
                </a>
              )}
              {batch.teacher?.email && (
                <a href={`mailto:${batch.teacher.email}`} className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-brand-blue transition-colors">
                  <Mail className="w-3.5 h-3.5" /> {batch.teacher.email}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard label="Total Students" value={batch.totalStudents} color="text-text-slate" />
        <StatCard label="Avg Attendance" value={`${batch.averageAttendance}%`} color="text-brand-blue" />
        <StatCard label="Fees Collected" value={`₹${((batch.fees || 0) * (batch.totalStudents || 0) * 0.95).toLocaleString()}`} color="text-green-500" />
        <StatCard label="Upcoming Test" value={batch.upcomingTest?.date ? batch.upcomingTest.date.split('-').slice(1).reverse().join('/') : 'N/A'} color="text-amber-500" />
      </div>

      {/* Capacity Gauge */}
      <section className="space-y-4">
        <h4 className="text-xs font-black text-brand-blue uppercase tracking-[0.2em] px-2">Capacity Utilization</h4>
        <div className="p-8 rounded-[32px] bg-bg-soft/20 border border-gray-50 space-y-6">
          <div className="flex justify-between items-end">
            <p className="text-sm font-black text-text-slate tracking-tight">{batch.totalStudents} of {batch.capacity} seats filled</p>
            <p className={`text-xl font-black ${fillPercent >= 100 ? 'text-red-500' : fillPercent >= 80 ? 'text-amber-500' : 'text-green-500'}`}>{fillPercent}%</p>
          </div>
          <div className="h-4 w-full bg-white rounded-full overflow-hidden shadow-inner ring-1 ring-gray-100/50">
            <div 
              className={`h-full ring-1 ring-white/20 transition-all duration-1000 ${fillPercent >= 100 ? 'bg-red-500' : fillPercent >= 80 ? 'bg-amber-500' : 'bg-green-500'}`} 
              style={{ width: `${fillPercent}%` }}
            />
          </div>
          <p className="text-xs font-bold text-gray-400 text-center tracking-wide">{batch.capacity - batch.totalStudents} seats remaining</p>
        </div>
      </section>

      {/* Subjects Tag Clouds */}
      <section className="space-y-4">
        <h4 className="text-xs font-black text-brand-blue uppercase tracking-[0.2em] px-2">Subjects Covered</h4>
        <div className="flex flex-wrap gap-2">
          {(batch.subjects || []).map(s => {
            const colors = subjectColors[s] || { bg: '#f3f4f6', text: '#4b5563', border: '#e5e7eb' };
            return (
              <span 
                key={s} 
                className="px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-transform hover:scale-105 cursor-default"
                style={{ backgroundColor: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
              >
                {s}
              </span>
            );
          })}
        </div>
      </section>
    </div>
  );
};

// --- Tab: Students ---
const StudentsTab = ({ batch, onAddStudent }: { batch: Batch, onAddStudent: () => void }) => {
  const [studentSearch, setStudentSearch] = useState('');
  // For demo, we filter students whose batch ID matches this batch's ID component
  const batchStudents = students.filter(s => s.batch === batch.name && s.name.toLowerCase().includes(studentSearch.toLowerCase()));

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-blue" />
          <input 
            placeholder="Search students..."
            className="w-full h-12 pl-11 pr-4 rounded-xl border border-gray-100 bg-bg-soft/30 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-brand-blue/10 focus:border-brand-blue/30 transition-all"
            value={studentSearch}
            onChange={(e) => setStudentSearch(e.target.value)}
          />
        </div>
        <Button onClick={onAddStudent} className="w-12 h-12 p-0 rounded-xl shadow-soft">
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      <div className="space-y-4 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
        {batchStudents.map(student => (
          <div key={student.id} className="p-4 rounded-[24px] bg-white border border-gray-50 hover:shadow-soft flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-[14px] bg-bg-soft flex items-center justify-center font-black text-brand-blue text-xs uppercase group-hover:bg-brand-blue/10">
                {student.name.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-text-slate text-sm leading-none mb-1.5">{student.name}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{student.rollNumber}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className={`text-[11px] font-black ${student.attendancePercent >= 80 ? 'text-green-500' : 'text-orange-500'}`}>{student.attendancePercent}%</p>
                <p className={`text-[9px] font-bold uppercase tracking-tighter ${student.feesStatus === 'Paid' ? 'text-green-400' : 'text-red-400'}`}>{student.feesStatus}</p>
              </div>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Button variant="ghost" className="w-full text-xs font-black uppercase text-brand-blue tracking-[0.2em] py-6 rounded-2xl border-2 border-dashed border-gray-100 hover:bg-brand-blue/5 hover:border-brand-blue/20">
        View All 42 Students in List
      </Button>
    </div>
  );
};

// --- Tab: Attendance ---
const AttendanceTab = ({ batch }: { batch: Batch }) => {
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weekDates = [13, 14, 15, 16, 17, 18];
  const demoStudents = students.slice(0, 10);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between bg-brand-blue/5 p-6 rounded-[28px] border border-brand-blue/10">
        <div className="text-center flex-1 border-r border-brand-blue/10">
          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Today</p>
          <p className="text-lg font-black text-brand-blue">38/42</p>
        </div>
        <div className="text-center flex-1 border-r border-brand-blue/10">
          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Weekly</p>
          <p className="text-lg font-black text-green-500">89%</p>
        </div>
        <div className="text-center flex-1">
          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Monthly</p>
          <p className="text-lg font-black text-brand-blue">91%</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-[10px] font-black text-text-slate uppercase tracking-widest">Attendance Grid — Apr Week 3</h4>
          <div className="flex gap-1">
            <button className="p-1 text-gray-400 hover:text-brand-blue"><ChevronLeft className="w-4 h-4" /></button>
            <button className="p-1 text-gray-400 hover:text-brand-blue"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>

        <div className="rounded-3xl border border-gray-100 overflow-hidden shadow-soft-lg">
          <div className="grid grid-cols-8 bg-bg-soft/50 border-b border-gray-100 h-12 items-center text-center">
            <div className="col-span-2 text-left pl-6 text-[9px] font-black uppercase text-gray-400">Student</div>
            {weekDays.map((d, i) => (
              <div key={d} className="flex flex-col items-center">
                <span className="text-[9px] font-black uppercase text-gray-400 leading-none mb-1">{d}</span>
                <span className="text-[10px] font-black text-text-slate leading-none">{weekDates[i]}</span>
              </div>
            ))}
          </div>
          <div className="divide-y divide-gray-50 h-[300px] overflow-y-auto no-scrollbar">
            {demoStudents.map(s => {
              const scheduleDays = (batch.schedule || []).map(slot => (slot.day || '').substring(0, 3));
              return (
                <div key={s.id} className="grid grid-cols-8 h-12 items-center text-center hover:bg-bg-soft/30 transition-colors">
                  <div className="col-span-2 text-left pl-6">
                    <p className="text-xs font-bold text-text-slate truncate pr-2">{s.name}</p>
                  </div>
                  {weekDays.map(day => {
                    const hasClass = scheduleDays.includes(day);
                    if (!hasClass) return <div key={day} className="text-gray-200">—</div>;
                    const isPresent = Math.random() > 0.1;
                    return (
                      <div key={day} className="flex justify-center">
                        <div className={`w-2 h-2 rounded-full ${isPresent ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : 'bg-red-500 animate-pulse'}`} />
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Button variant="outline" className="w-full gap-2 font-black text-[10px] uppercase tracking-widest text-brand-blue border-brand-blue/30 h-12 rounded-2xl hover:bg-brand-blue/5">
        <Download className="w-4 h-4" /> Export Attendance Sheet
      </Button>
    </div>
  );
};

// --- Tab: Schedule ---
const ScheduleTab = ({ batch }: { batch: Batch }) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h4 className="text-xs font-black text-brand-blue uppercase tracking-[0.2em]">Weekly Timetable</h4>
          <Button variant="ghost" size="sm" className="h-8 rounded-lg text-[10px] font-black uppercase tracking-widest">Edit Grid</Button>
        </div>
        <div className="space-y-3">
          {days.map(day => {
            const slot = (batch.schedule || []).find(s => s.day === day);
            return (
              <div key={day} className={`p-5 rounded-2xl border transition-all flex items-center justify-between ${slot ? 'bg-white border-brand-blue/10 shadow-soft' : 'bg-bg-soft/20 border-transparent opacity-40'}`}>
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-[10px] uppercase ${slot ? 'bg-brand-blue text-white shadow-brand-blue/20' : 'bg-gray-100 text-gray-400'}`}>
                    {day.substring(0, 3)}
                  </div>
                  <span className={`text-sm font-black ${slot ? 'text-text-slate' : 'text-gray-400'}`}>{day}</span>
                </div>
                {slot ? (
                  <div className="text-right">
                    <p className="text-sm font-black text-brand-blue">{slot.startTime} – {slot.endTime} AM</p>
                    <p className="text-[10px] font-bold text-gray-400 flex items-center justify-end gap-1 uppercase tracking-tighter"><DoorOpen className="w-3 h-3" /> {batch.room}</p>
                  </div>
                ) : (
                  <span className="text-xs font-bold text-gray-300 italic uppercase">No Class</span>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-4">
        <h4 className="text-xs font-black text-brand-blue uppercase tracking-[0.2em] px-2">Upcoming Classes</h4>
        <div className="space-y-3">
          <UpcomingClassCard date="Mon 14 Apr" subject="Maths" time="08:00–10:00 AM" room="Room 101" />
          <UpcomingClassCard date="Wed 16 Apr" subject="Physics" time="08:00–10:00 AM" room="Room 101" />
        </div>
      </section>
    </div>
  );
};

const UpcomingClassCard = ({ date, subject, time, room }: { date: string; subject: string; time: string; room: string }) => (
  <div className="p-5 rounded-2xl bg-bg-soft/30 border border-transparent hover:bg-white hover:border-gray-50 hover:shadow-soft transition-all flex items-center justify-between">
    <div className="flex items-center gap-4">
      <p className="text-xs font-black text-text-slate uppercase tracking-wider">{date}</p>
      <div className="w-1.5 h-1.5 rounded-full bg-brand-blue/30" />
      <p className="text-sm font-black text-brand-blue">{subject}</p>
    </div>
    <div className="text-right">
      <p className="text-sm font-bold text-text-slate tracking-tight">{time}</p>
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{room}</p>
    </div>
  </div>
);

// --- Tab: Tests ---
const TestsTab = ({ batch, onCreateTest }: { batch: Batch, onCreateTest: () => void }) => (
  <div className="space-y-12">
    <section className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <h4 className="text-xs font-black text-brand-blue uppercase tracking-[0.2em]">Tests & Marks</h4>
        <Button
          variant="default"
          size="sm"
          onClick={onCreateTest}
          className="h-9 rounded-xl text-[10px] font-black uppercase tracking-widest gap-2 shadow-brand-blue/10"
        >
          <Plus className="w-3.5 h-3.5" /> Create Test
        </Button>
      </div>
      <div className="rounded-3xl border border-gray-100 overflow-hidden shadow-soft">
        <table className="w-full text-sm">
          <thead className="bg-bg-soft/50 border-b border-gray-100 h-12">
            <tr>
              <th className="pl-6 text-left font-black text-[9px] uppercase text-gray-400 tracking-widest">Test Name</th>
              <th className="text-center font-black text-[9px] uppercase text-gray-400 tracking-widest">Date</th>
              <th className="text-center font-black text-[9px] uppercase text-gray-400 tracking-widest">Status</th>
              <th className="pr-6 text-right font-black text-[9px] uppercase text-gray-400 tracking-widest">Avg Sc.</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {batch.upcomingTest && (
              <tr className="h-14">
                <td className="pl-6 font-bold text-text-slate">{batch.upcomingTest.name}</td>
                <td className="text-center text-xs font-bold text-gray-500">16 Apr</td>
                <td className="text-center"><Badge variant="Pending">Upcoming</Badge></td>
                <td className="pr-6 text-right text-xs font-black text-gray-300">—</td>
              </tr>
            )}
            <tr className="h-14 bg-bg-soft/20">
              <td className="pl-6 font-bold text-text-slate">Chapter 4 Review</td>
              <td className="text-center text-xs font-bold text-gray-500">05 Apr</td>
              <td className="text-center"><Badge variant="Active">Completed</Badge></td>
              <td className="pr-6 text-right font-black text-green-500">74%</td>
            </tr>
            <tr className="h-14">
              <td className="pl-6 font-bold text-text-slate">Monthly Mock</td>
              <td className="text-center text-xs font-bold text-gray-500">15 Mar</td>
              <td className="text-center"><Badge variant="Active">Completed</Badge></td>
              <td className="pr-6 text-right font-black text-orange-500">68%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <h4 className="text-xs font-black text-brand-blue uppercase tracking-[0.2em]">Assignments</h4>
        <Button variant="outline" size="sm" className="h-9 rounded-xl text-[10px] font-black uppercase tracking-widest gap-2 bg-white border-gray-100 shadow-soft">
          <Plus className="w-3.5 h-3.5" /> Create Assignment
        </Button>
      </div>
      <div className="space-y-4">
        <AssignmentRow title="Quadratic Equations" subject="Maths" due="15 Apr" stats="38/42" isActive />
        <AssignmentRow title="Newton's Laws" subject="Physics" due="16 Apr" stats="22/42" isActive />
      </div>
    </section>
  </div>
);

const AssignmentRow = ({ title, subject, due, stats, isActive }: { title: string; subject: string; due: string; stats: string; isActive: boolean }) => (
  <div className="p-6 rounded-[28px] bg-white border border-gray-100 shadow-soft hover:shadow-soft-lg transition-all group flex items-center justify-between">
    <div>
      <h5 className="font-bold text-text-slate leading-none mb-2">{title}</h5>
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-black text-brand-blue uppercase tracking-widest">{subject}</span>
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Due: {due}</span>
      </div>
    </div>
    <div className="text-right">
      <p className="text-xs font-black text-text-slate mb-1">{stats} Sub.</p>
      <Badge variant={isActive ? 'Active' : 'Inactive'} className="text-[8px] h-4">Active</Badge>
    </div>
  </div>
);

// --- Tab: Notes ---
const NotesTab = ({ batch }: { batch: Batch }) => {
  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h4 className="text-xs font-black text-brand-blue uppercase tracking-[0.3em] px-2">Add New Note</h4>
        <textarea 
          placeholder="New batch update..."
          className="w-full h-32 rounded-[28px] border border-gray-100 bg-bg-soft/30 p-6 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-brand-blue/10 focus:border-brand-blue/30 transition-all resize-none shadow-inner"
        />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2">
            {['Academic', 'Schedule', 'Fee', 'General'].map(c => (
              <button key={c} className="px-4 py-2 rounded-xl border border-gray-100 text-[9px] font-black uppercase text-gray-400 hover:border-brand-blue hover:text-brand-blue bg-white transition-all">{c}</button>
            ))}
          </div>
          <Button className="rounded-xl gap-2 h-11 px-8"><Plus className="w-4 h-4" /> Add Note</Button>
        </div>
      </div>

      <div className="space-y-8">
        <h4 className="text-xs font-black text-brand-blue uppercase tracking-[0.3em] px-2">Timeline</h4>
        <div className="space-y-6 relative before:content-[''] before:absolute before:left-5 before:top-2 before:bottom-2 before:w-[2px] before:bg-bg-soft">
          <NoteEntry category="Academic" text={batch.notes} author="Admin" timestamp="11 Apr 2026" color="bg-brand-blue" />
          <NoteEntry category="Schedule" text="Class shifted to Room 102 on 15 Apr due to maintenance." author="Admin" timestamp="05 Apr 2026" color="bg-amber-500" />
          <NoteEntry category="General" text="Best performing batch overall. Attendance consistently above 90%." author="Admin" timestamp="01 Mar 2026" color="bg-green-500" />
        </div>
      </div>
    </div>
  );
};

const NoteEntry = ({ category, text, author, timestamp, color }: { category: string; text: string; author: string; timestamp: string; color: string }) => (
  <div className="relative pl-12">
    <div className={`absolute left-4 top-2 w-2.5 h-2.5 rounded-full ${color} z-10 ring-4 ring-white ring-offset-0`} />
    <Card className="border-none shadow-soft p-6 group hover:shadow-soft-lg hover:scale-[1.01] transition-all rounded-[28px] bg-white ring-1 ring-gray-100/50">
      <div className="flex items-center justify-between mb-4">
        <Badge variant="default" className={`bg-transparent p-0 ${color.replace('bg-', 'text-')} font-black text-[10px] uppercase tracking-widest`}>{category}</Badge>
        <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">{timestamp}</p>
      </div>
      <p className="text-sm font-medium text-gray-600 leading-relaxed italic">&quot;{text}&quot;</p>
      <div className="mt-6 flex items-center justify-between border-t border-gray-50 pt-4 opacity-70 group-hover:opacity-100 transition-opacity">
        <p className="text-[10px] font-black text-gray-400 uppercase">— {author}</p>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-300 hover:text-brand-blue"><Edit className="w-3.5 h-3.5" /></Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-300 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></Button>
        </div>
      </div>
    </Card>
  </div>
);

// --- Helpers ---

const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <div className="p-4 rounded-2xl bg-bg-soft/20 border border-transparent hover:bg-white hover:border-gray-50 hover:shadow-soft transition-all">
    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
    <p className="text-sm font-black text-text-slate tracking-tight">{value}</p>
  </div>
);

const StatCard = ({ label, value, color }: { label: string; value: any; color: string }) => (
  <div className="p-6 rounded-[28px] bg-bg-soft/10 border border-transparent hover:bg-white hover:border-gray-50 hover:shadow-soft transition-all text-center">
    <p className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 leading-none">{label}</p>
    <p className={`text-lg font-black ${color} tracking-tight leading-none`}>{value}</p>
  </div>
);

const UsersIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);
