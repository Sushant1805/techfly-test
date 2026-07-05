import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { X, Phone, Mail, MapPin, Calendar, User, BookOpen, Clock, FileText, CheckCircle, TrendingUp, AlertCircle, Plus, Trash2, Edit } from 'lucide-react';
import { Student, attendanceHistory, paymentHistory, studentMarks, studentNotes, tests, StatusType } from '@/lib/mockData';

interface StudentSidePanelProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (student: Student) => void;
  userRole?: string;
  hideFinancials?: boolean;
}

export const StudentSidePanel: React.FC<StudentSidePanelProps> = ({ student, isOpen, onClose, onEdit, userRole = 'teacher', hideFinancials = false }) => {

  const [activeTab, setActiveTab] = useState<'Overview' | 'Attendance' | 'Fees' | 'Tests' | 'Notes'>('Overview');

  if (!student) return null;

  const tabs = [
    { id: 'Overview', icon: User },
    { id: 'Attendance', icon: Clock },
    { id: 'Fees', icon: CreditCardIcon },
    { id: 'Tests', icon: BookOpen },
    { id: 'Notes', icon: FileText },
  ];

  return (
    <>
      {/* Overlay - visible on small screens or when treated as a modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/30 backdrop-blur-sm z-[80] lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Side Panel Container */}
      <div 
        className={`fixed top-0 right-0 bottom-0 z-[90] w-full max-w-[520px] bg-white shadow-soft-lg transform transition-transform duration-500 ease-in-out border-l border-gray-100 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-10 border-b border-gray-50 bg-gradient-to-br from-white to-bg-soft/50 relative overflow-hidden group">
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center text-gray-400 hover:text-brand-blue transition-all z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-start gap-8 relative z-10">
            <div className="w-24 h-24 rounded-[32px] bg-brand-blue/10 text-brand-blue flex items-center justify-center font-black text-3xl shadow-soft group-hover:scale-110 transition-transform duration-500 ring-4 ring-white">
              {student.name.charAt(0)}
            </div>
            <div className="pt-2">
              <h2 className="text-3xl font-black text-text-slate tracking-tight leading-none mb-4">{student.name}</h2>
              <div className="flex flex-wrap gap-2 items-center">
                <Badge variant="default" className="bg-brand-blue text-white shadow-soft border-none font-bold">{student.standard}</Badge>
                <Badge variant="default" className="bg-white text-text-slate border-gray-100 font-bold">{student.batch}</Badge>
                <Badge variant={student.status as StatusType}>{student.status}</Badge>
              </div>
              <p className="text-sm font-bold text-gray-400 mt-4 tracking-widest uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                Roll: {student.rollNumber}
              </p>
            </div>
          </div>
          
          {(userRole === 'owner' || userRole === 'manager') && (
            <Button 
              variant="ghost" 
              className="absolute bottom-8 right-10 gap-2 h-11 px-5 rounded-2xl bg-white hover:bg-brand-blue hover:text-white shadow-soft transition-all"
              onClick={() => onEdit(student)}
            >
              <Edit className="w-4 h-4" /> Edit Profile
            </Button>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-2 border-b border-gray-50 flex items-center gap-2 bg-white sticky top-0">
          {tabs
            .filter(tab => {
              if (userRole === 'teacher') return tab.id !== 'Fees';
              if (userRole === 'reception') return ['Overview', 'Fees'].includes(tab.id);
              return true;
            })
            .map(tab => (

            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all ${
                activeTab === tab.id 
                  ? 'text-brand-blue bg-brand-blue/10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]' 
                  : 'text-gray-400 hover:text-brand-blue hover:bg-bg-soft'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.id === 'Tests' ? 'Tests & Marks' : tab.id}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-white">
          <div className="p-10 pb-20 animate-in fade-in slide-in-from-right-10 duration-500">
            {activeTab === 'Overview' && <OverviewTab student={student} />}
            {activeTab === 'Attendance' && <AttendanceTab studentId={student.id} overall={student.attendancePercent} />}
            {activeTab === 'Fees' && <FeesTab student={student} />}
            {activeTab === 'Tests' && <TestsTab studentId={student.id} />}
            {activeTab === 'Notes' && <NotesTab studentId={student.id} />}
          </div>
        </div>
      </div>
    </>
  );
};

// --- Sub-components (Tabs) ---

const OverviewTab = ({ student }: { student: Student }) => (
  <div className="space-y-10">
    <div className="space-y-6">
      <h4 className="text-xs font-black text-brand-blue uppercase tracking-[0.3em] flex items-center gap-3">Personal Information</h4>
      <div className="grid grid-cols-1 gap-4">
        <InfoItem icon={User} label="Full Name" value={student.name} />
        <InfoItem icon={Calendar} label="Gender" value={student.gender} />
        <InfoItem icon={Calendar} label="Date of Birth" value={`${student.dob} (17 years)`} />
        <InfoItem icon={MapPin} label="Student ID" value={student.id} />
        <InfoItem icon={Clock} label="Joining Date" value={student.joiningDate} />
      </div>
    </div>

    <div className="space-y-6">
      <h4 className="text-xs font-black text-brand-blue uppercase tracking-[0.3em] flex items-center gap-3">Parent Information</h4>
      <div className="grid grid-cols-1 gap-4">
        <InfoItem icon={User} label="Parent Name" value={student.parentName} />
        <InfoItem icon={Phone} label="Phone" value={student.parentPhone} isLink={`tel:${student.parentPhone}`} />
        <InfoItem icon={Mail} label="Email" value={student.email} isLink={`mailto:${student.email}`} />
        <InfoItem icon={MapPin} label="Address" value={student.address} />
      </div>
    </div>

    <div className="space-y-6">
      <h4 className="text-xs font-black text-brand-blue uppercase tracking-[0.3em] flex items-center gap-3">Academic Subjects</h4>
      <div className="flex flex-wrap gap-2">
        {student.subjects.map(s => (
          <Badge key={s} className="bg-bg-soft text-text-slate border-gray-100 py-2 px-5 rounded-2xl font-bold">{s}</Badge>
        ))}
      </div>
    </div>
  </div>
);

const AttendanceTab = ({ studentId, overall }: { studentId: string; overall: number }) => {
  const history = attendanceHistory.filter(h => h.studentId === studentId);
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Present" value="82 days" color="text-green-500" />
        <StatCard label="Absent" value="8 days" color="text-red-500" />
        <StatCard label="Overall" value={`${overall}%`} color="text-brand-blue" />
      </div>

      <div className="space-y-6">
        <h4 className="text-xs font-black text-brand-blue uppercase tracking-[0.3em]">Monthly Breakdown</h4>
        <div className="rounded-[32px] border border-gray-100 overflow-hidden shadow-soft">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-bg-soft border-b border-gray-100">
                <th className="p-4 text-left pl-6 font-bold text-[10px] text-gray-400 uppercase tracking-widest">Month</th>
                <th className="p-4 text-center font-bold text-[10px] text-gray-400 uppercase tracking-widest">Present</th>
                <th className="p-4 text-center font-bold text-[10px] text-gray-400 uppercase tracking-widest">Absent</th>
                <th className="p-4 text-right pr-6 font-bold text-[10px] text-gray-400 uppercase tracking-widest">%</th>
              </tr>
            </thead>
            <tbody>
              {history.map(row => (
                <tr key={row.month} className="border-b border-gray-50 last:border-0">
                  <td className="p-4 pl-6 font-bold text-text-slate">{row.month}</td>
                  <td className="p-4 text-center font-medium text-gray-500">{row.present}</td>
                  <td className="p-4 text-center font-medium text-gray-500">{row.absent}</td>
                  <td className={`p-4 text-right pr-6 font-black ${row.percent >= 80 ? 'text-green-500' : 'text-orange-500'}`}>{row.percent}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const FeesTab = ({ student }: { student: Student }) => {
  const history = paymentHistory.filter(p => p.studentId === student.id);
  const isPending = student.feesStatus !== 'Paid';
  const totalFeesDue = student.totalFeesDue ?? 0;
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Total Annual" value="₹48,000" color="text-text-slate" />
        <StatCard label="Total Paid" value={`₹${(48000 - totalFeesDue).toLocaleString()}`} color="text-green-500" />
        <StatCard label="Balance Due" value={`₹${totalFeesDue.toLocaleString()}`} color={isPending ? "text-red-500" : "text-green-500"} />
      </div>

      {isPending && (
        <div className="p-8 rounded-[32px] bg-red-50 border border-red-100 flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-4">
            <AlertCircle className="text-red-500 w-8 h-8" />
            <div>
              <p className="font-bold text-red-500">₹{totalFeesDue.toLocaleString()} Pending</p>
              <p className="text-xs text-red-400 font-medium">Due since 1 Apr 2026</p>
            </div>
          </div>
          <Button className="bg-red-500 hover:bg-red-600 border-none px-6">Remind Parent</Button>
        </div>
      )}

      <div className="space-y-6">
        <h4 className="text-xs font-black text-brand-blue uppercase tracking-[0.3em]">Payment History</h4>
        <div className="space-y-4">
          {history.map((record, i) => (
            <div key={i} className="p-6 rounded-3xl border border-gray-50 bg-white hover:shadow-soft transition-all flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl ${record.status === 'Paid' ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'} flex items-center justify-center`}>
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-text-slate">{record.month}</p>
                  <p className="text-xs text-gray-400 font-medium">{record.paidOn || '—'}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-black text-text-slate">₹{record.amount}</p>
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-tighter">{record.mode || 'Pending'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TestsTab = ({ studentId }: { studentId: string }) => {
  const results = studentMarks.filter(t => t.studentId === studentId);
  const validPercentages = results.map(r => r.percentage ?? 0);
  const average = validPercentages.length > 0
    ? Math.round(validPercentages.reduce((acc, v) => acc + v, 0) / validPercentages.length)
    : 0;

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Tests Taken" value={results.length.toString()} color="text-text-slate" />
        <StatCard label="Average Score" value={`${average}%`} color="text-brand-blue" />
        <StatCard label="Best Subject" value="English" color="text-green-500" />
      </div>

      <div className="space-y-6">
        <h4 className="text-xs font-black text-brand-blue uppercase tracking-[0.3em]">Test Results</h4>
        <div className="space-y-4">
          {results.map((res, i) => {
            const test = tests.find(t => t.id === res.testId);
            const pct = res.percentage ?? 0;
            return (
              <div key={i} className="p-8 rounded-[32px] border border-gray-100 bg-white hover:shadow-soft-lg transition-all group flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="text-center bg-bg-soft py-2 px-4 rounded-2xl group-hover:bg-brand-blue/10 transition-colors">
                    <p className="text-[10px] font-black text-gray-400 uppercase leading-none mb-1">Batch</p>
                    <p className="font-black text-brand-blue text-sm leading-none">{res.batchId}</p>
                  </div>
                  <div>
                    <h5 className="font-bold text-lg text-text-slate leading-none mb-2">{test?.title ?? 'Test'}</h5>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-gray-400 flex items-center gap-1"><BookOpen className="w-3 h-3" /> {test?.subject ?? '—'}</span>
                      <span className="text-xs font-bold text-gray-400 flex items-center gap-1"><Calendar className="w-3 h-3" /> {test?.scheduledDate ?? '—'}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-baseline gap-1 justify-end">
                    <span className="text-2xl font-black text-text-slate tracking-tighter">{res.marksObtained ?? '—'}</span>
                    <span className="text-xs font-bold text-gray-300">/ {test?.totalMarks ?? '—'}</span>
                  </div>
                  <Badge variant="default" className={`bg-transparent p-0 ${pct >= 80 ? 'text-green-500' : 'text-brand-blue'} font-black text-[10px] uppercase`}>{pct >= 80 ? 'Grade A+' : 'Grade B'}</Badge>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const NotesTab = ({ studentId }: { studentId: string }) => {
  const notes = studentNotes.filter(n => n.studentId === studentId);
  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h4 className="text-xs font-black text-brand-blue uppercase tracking-[0.3em]">Add New Note</h4>
        <textarea 
          placeholder="Type something important about this student..."
          className="w-full h-32 rounded-3xl border border-gray-100 bg-bg-soft/30 p-6 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-brand-blue/10 focus:border-brand-blue/30 transition-all resize-none"
        />
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {['Academic', 'Behaviour', 'Fee'].map(c => (
              <button key={c} className="px-5 py-2 rounded-2xl border border-gray-100 text-[10px] font-black uppercase text-gray-400 hover:border-brand-blue/30 hover:text-brand-blue transition-all">{c}</button>
            ))}
          </div>
          <Button className="rounded-2xl gap-2 h-11"><Plus className="w-4 h-4" /> Add Note</Button>
        </div>
      </div>

      <div className="space-y-8">
        <h4 className="text-xs font-black text-brand-blue uppercase tracking-[0.3em]">Timeline</h4>
        <div className="space-y-6 relative before:content-[''] before:absolute before:left-5 before:top-2 before:bottom-2 before:w-[2px] before:bg-bg-soft">
          {notes.map(note => (
            <div key={note.id} className="relative pl-12">
              <div className="absolute left-3 top-2 w-4 h-4 rounded-full bg-white border-4 border-brand-blue z-10" />
              <Card className="border-none shadow-soft p-6 group hover:shadow-soft-lg transition-all rounded-[32px]">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="default" className="bg-brand-blue/10 text-brand-blue border-none font-black text-[10px]">{note.category}</Badge>
                  <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{note.timestamp}</p>
                </div>
                <p className="text-sm font-medium text-gray-600 leading-relaxed italic">&quot;{note.text}&quot;</p>
                <div className="mt-6 flex items-center justify-between border-t border-gray-50 pt-4">
                  <p className="text-[10px] font-bold text-gray-400">— {note.author}</p>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-300 hover:text-brand-blue"><Edit className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-300 hover:text-red-500"><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Helper Components ---

const InfoItem = ({ icon: Icon, label, value, isLink }: { icon: any; label: string; value: string; isLink?: string }) => (
  <div className="flex items-start gap-4 p-4 rounded-2xl bg-bg-soft/30 hover:bg-white hover:shadow-soft hover:scale-[1.02] transition-all border border-transparent hover:border-gray-50 group">
    <div className="w-10 h-10 rounded-xl bg-white text-gray-400 group-hover:text-brand-blue flex items-center justify-center transition-colors shadow-sm">
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1.5">{label}</p>
      {isLink ? (
        <a href={isLink} className="font-bold text-brand-blue hover:underline leading-none">{value}</a>
      ) : (
        <p className="font-bold text-text-slate leading-none">{value}</p>
      )}
    </div>
  </div>
);

const StatCard = ({ label, value, color }: { label: string; value: string; color: string }) => (
  <div className="p-6 rounded-[32px] bg-bg-soft/30 border border-gray-50 text-center hover:bg-white hover:shadow-soft transition-all">
    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3 leading-none">{label}</p>
    <p className={`text-xl font-black ${color} tracking-tight leading-none`}>{value}</p>
  </div>
);

const CreditCardIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);
