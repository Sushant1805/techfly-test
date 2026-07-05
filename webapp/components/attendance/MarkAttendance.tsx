'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Users, CheckCircle, XCircle, Clock, Calendar, 
  Search, MessageSquare, ChevronRight, ChevronLeft,
  AlertTriangle, Filter, Save, Trash2, Edit2
} from 'lucide-react';
import { AttendanceStatus, AttendanceRecord } from '@/lib/mockData';

export const MarkAttendance: React.FC = () => {
  const [batches, setBatches] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [selectedBatchId, setSelectedBatchId] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userStr = localStorage.getItem('user');
        if (!userStr) return;
        const user = JSON.parse(userStr);
        const instituteSlug = user.instituteId;

        const [batchesRes, studentsRes] = await Promise.all([
          fetch(`/api/${instituteSlug}/batches`),
          fetch(`/api/${instituteSlug}/students`)
        ]);
        
        const batchesData = await batchesRes.json();
        const studentsData = await studentsRes.json();
        
        if (batchesData.success) {
          setBatches(batchesData.batches);
          if (batchesData.batches.length > 0) setSelectedBatchId(batchesData.batches[0]._id);
        }
        if (studentsData.success) {
          const mapped = studentsData.students.map((s: any) => ({
            id: s._id,
            name: s.name,
            rollNumber: s.rollNumber || 'N/A',
            batchId: s.batchId?._id || ''
          }));
          setStudents(mapped);
        }
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };
    fetchData();
  }, []);

  // Local state for current attendance session
  const [currentAttendance, setCurrentAttendance] = useState<Record<string, { status: AttendanceStatus; note?: string; time?: string }>>({});
  
  const selectedBatch = useMemo(() => batches.find(b => b._id === selectedBatchId), [selectedBatchId, batches]);
  
  const batchStudents = useMemo(() => {
    return students.filter(s => s.batchId === selectedBatchId)
      .filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [selectedBatchId, searchTerm, students]);



  const stats = useMemo(() => {
    const values = Object.values(currentAttendance);
    return {
      total: batchStudents.length,
      present: values.filter(v => v.status === 'Present').length,
      absent: values.filter(v => v.status === 'Absent').length,
      late: values.filter(v => v.status === 'Late').length,
      leave: values.filter(v => v.status === 'Leave').length,
      unmarked: batchStudents.length - values.filter(v => v.status !== 'Unmarked').length
    };
  }, [currentAttendance, batchStudents]);

  const handleLoad = async () => {
    try {
      setIsLoaded(true);
      const userStr = localStorage.getItem('user');
      if (!userStr) return;
      const user = JSON.parse(userStr);
      const instituteSlug = user.instituteId;

      // Check if attendance already exists for this batch and date
      const res = await fetch(`/api/${instituteSlug}/attendance?batchId=${selectedBatchId}&date=${selectedDate}`);
      const data = await res.json();

      const init: Record<string, { status: AttendanceStatus }> = {};
      
      if (data.success && data.attendance.length > 0) {
        // Attendance exists
        const existing = data.attendance[0]; // Assuming one record per day/batch
        existing.records.forEach((r: any) => {
          init[r.studentId] = { status: r.status };
        });
        // Fill in students who might be in the batch but not in the saved record
        batchStudents.forEach(s => {
          if (!init[s.id]) init[s.id] = { status: 'Unmarked' };
        });
        setCurrentAttendance(init);
        setIsEditing(false); // View only if already saved
      } else {
        // Fresh attendance
        batchStudents.forEach(s => {
          init[s.id] = { status: 'Unmarked' };
        });
        setCurrentAttendance(init);
        setIsEditing(true);
      }
    } catch (error) {
      console.error('Error loading attendance:', error);
    }
  };


  const updateStatus = (studentId: string, status: AttendanceStatus) => {
    if (!isEditing) return;
    setCurrentAttendance(prev => {
      const current = prev[studentId]?.status;
      return {
        ...prev,
        [studentId]: { 
          ...prev[studentId], 
          status: current === status ? 'Unmarked' : status 
        }
      };
    });
  };

  const markAll = (status: AttendanceStatus) => {
    if (!isEditing) return;
    setCurrentAttendance(prev => {
      const next = { ...prev };
      batchStudents.forEach(s => {
        next[s.id] = { ...next[s.id], status };
      });
      return next;
    });
  };

  const clearAll = () => {
    if (!isEditing) return;
    setCurrentAttendance(prev => {
      const next = { ...prev };
      batchStudents.forEach(s => {
        next[s.id] = { ...next[s.id], status: 'Unmarked' };
      });
      return next;
    });
  };


  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const userStr = localStorage.getItem('user');
      if (!userStr) return;
      const user = JSON.parse(userStr);
      const instituteSlug = user.instituteId;

      const markedRecords = Object.entries(currentAttendance)
        .filter(([_, data]) => data.status !== 'Unmarked')
        .map(([studentId, data]) => ({
          studentId,
          status: data.status
        }));

      const res = await fetch(`/api/${instituteSlug}/attendance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          batchId: selectedBatchId,
          date: selectedDate,
          records: markedRecords
        })
      });

      const result = await res.json();
      if (result.success) {
        alert('Attendance Saved Successfully!');
        setIsEditing(false);
      } else {
        alert('Error: ' + result.message);
      }
    } catch (error) {
      console.error('Error saving attendance:', error);
      alert('An error occurred while saving attendance.');
    } finally {
      setIsSaving(false);
    }
  };

  return (

    <div className="space-y-6 pb-24">
      {/* Step 1: Selection Bar */}
      <Card className="p-6 border-none shadow-soft rounded-[28px] bg-white">
        <div className="flex flex-wrap items-end gap-6">
          <div className="flex-1 min-w-[300px] space-y-2">
            <label className="text-[10px] font-black text-brand-blue uppercase tracking-widest ml-1">Select Batch</label>
            <select 
              className="w-full h-14 rounded-2xl border border-gray-100 bg-bg-soft/20 px-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-brand-blue/10 transition-all"
              value={selectedBatchId}
              onChange={(e) => {
                setSelectedBatchId(e.target.value);
                setIsLoaded(false);
              }}
            >
              {batches.map(b => (
                <option key={b._id} value={b._id}>
                  {b.name} — {b.standard} {b.schedule && Array.isArray(b.schedule) ? `(${b.schedule.map((s: any) => s.day.substring(0,3)).join('/')})` : ''}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full sm:w-48 space-y-2">
            <label className="text-[10px] font-black text-brand-blue uppercase tracking-widest ml-1">Date</label>
            <input 
              type="date" 
              className="w-full h-14 rounded-2xl border border-gray-100 bg-bg-soft/20 px-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-brand-blue/10 transition-all"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setIsLoaded(false);
              }}
              max={new Date().toISOString().split('T')[0]}
            />
          </div>
          <Button 
            onClick={handleLoad} 
            className="h-14 px-8 rounded-2xl shadow-brand-blue/20 gap-2 font-black uppercase tracking-widest text-xs"
          >
            Load Students <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </Card>

      {isLoaded && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Step 2: Attendance Summary Bar (Sticky) */}
          <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md p-4 rounded-3xl border border-gray-100 shadow-soft-lg flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-6 divide-x divide-gray-100">
              <div className="px-2">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Total</p>
                <p className="text-lg font-black text-text-slate">{stats.total}</p>
              </div>
              <div className="px-6 text-green-500">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Present</p>
                <p className="text-lg font-black">{stats.present}</p>
              </div>
              <div className="px-6 text-red-500">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Absent</p>
                <p className="text-lg font-black">{stats.absent}</p>
              </div>
              <div className="px-6 text-amber-500">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Late</p>
                <p className="text-lg font-black">{stats.late}</p>
              </div>
              <div className="px-6 text-brand-blue">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Leave</p>
                <p className="text-lg font-black">{stats.leave}</p>
              </div>
              <div className="px-6 text-gray-400 font-bold">
                <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-0.5">Unmarked</p>
                <p className="text-lg font-black">{stats.unmarked}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {!isEditing && (
                <Button 
                  onClick={() => setIsEditing(true)}
                  variant="outline"
                  className="h-11 px-6 rounded-xl border-brand-blue text-brand-blue font-black uppercase tracking-widest text-[10px] gap-2 hover:bg-brand-blue hover:text-white transition-all"
                >
                  <Edit2 className="w-3.5 h-3.5" /> Edit Attendance
                </Button>
              )}
              <div className="flex-1 max-w-[200px] space-y-2 min-w-[150px]">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stats.total - stats.unmarked} / {stats.total} Marked</span>
                  <span className="text-[10px] font-black text-brand-blue">{Math.round(((stats.total - stats.unmarked) / stats.total) * 100)}%</span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-brand-blue transition-all duration-500" 
                    style={{ width: `${((stats.total - stats.unmarked) / stats.total) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>


          {/* Step 3: Bulk Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 px-2">
            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={() => markAll('Present')} className="text-[10px] font-black uppercase text-green-600 hover:bg-green-50 rounded-xl h-10 px-4">Mark All Present</Button>
              <Button variant="ghost" onClick={() => markAll('Absent')} className="text-[10px] font-black uppercase text-red-600 hover:bg-red-50 rounded-xl h-10 px-4">Mark All Absent</Button>
              <Button variant="ghost" onClick={clearAll} className="text-[10px] font-black uppercase text-gray-400 hover:bg-gray-100 rounded-xl h-10 px-4">Clear All</Button>
            </div>
            <div className="relative group min-w-[300px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-blue" />
              <input 
                placeholder="Search students in list..."
                className="w-full h-11 pl-11 pr-4 rounded-xl border border-gray-100 bg-white text-xs font-bold focus:outline-none focus:ring-4 focus:ring-brand-blue/10 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Step 4: Student Attendance List */}
          <Card className="border-none shadow-soft rounded-[40px] overflow-hidden bg-white">
            <div className="divide-y divide-gray-50">
              {batchStudents.map(student => (
                <AttendanceRow 
                  key={student.id} 
                  student={student} 
                  data={currentAttendance[student.id] || { status: 'Unmarked' }}
                  onUpdate={(status) => updateStatus(student.id, status)}
                  onUpdateNote={(note) => setCurrentAttendance(prev => ({ ...prev, [student.id]: { ...prev[student.id], note } }))}
                  onUpdateTime={(time) => setCurrentAttendance(prev => ({ ...prev, [student.id]: { ...prev[student.id], time } }))}
                  isEditable={isEditing}
                />
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Step 5: Save Attendance Button (Sticky Footer) */}
      {isLoaded && isEditing && (
        <div className="fixed bottom-8 left-[280px] right-10 z-[40] animate-in slide-in-from-bottom-full duration-700">
          <div className="p-4 rounded-[32px] bg-text-slate/90 backdrop-blur-xl border border-white/10 shadow-soft-lg flex items-center justify-between gap-6 px-10">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-white font-black text-sm tracking-tight">{selectedBatch?.name} — {new Date(selectedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest">{stats.total - stats.unmarked} of {stats.total} students marked</p>
              </div>
            </div>
            <Button 
              className="h-14 px-12 rounded-2xl shadow-brand-blue/20 bg-brand-blue hover:bg-brand-blue/90 text-white font-black uppercase tracking-widest text-xs"
              onClick={handleSave}
              disabled={stats.total - stats.unmarked === 0 || isSaving}
            >
              {isSaving ? 'Saving...' : <><Save className="w-4 h-4 mr-2" /> Save Attendance</>}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};


interface RowProps {
  student: any;
  data: { status: AttendanceStatus; note?: string; time?: string };
  onUpdate: (status: AttendanceStatus) => void;
  onUpdateNote: (note: string) => void;
  onUpdateTime: (time: string) => void;
  isEditable: boolean;
}

const AttendanceRow: React.FC<RowProps> = ({ student, data, onUpdate, onUpdateNote, onUpdateTime, isEditable }) => {
  const [showNote, setShowNote] = useState(!!data.note);

  const StatusButton = ({ status, label, activeClass }: { status: AttendanceStatus; label: string; activeClass: string }) => (
    <button
      onClick={() => onUpdate(status)}
      disabled={!isEditable}
      className={`w-10 h-10 rounded-xl font-black text-xs transition-all flex items-center justify-center border-2 border-transparent ${
        data.status === status 
          ? activeClass 
          : 'bg-bg-soft/30 text-gray-400 hover:bg-bg-soft hover:text-gray-500'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="group relative p-6 hover:bg-bg-soft/10 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="w-12 h-12 rounded-2xl bg-bg-soft flex items-center justify-center font-black text-brand-blue shadow-sm">
            {student.name.charAt(0)}
          </div>
          <div>
            <h4 className="font-black text-text-slate tracking-tight leading-none mb-1.5">{student.name}</h4>
            <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em]">{student.rollNumber}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 p-1 bg-white rounded-2xl shadow-inner border border-gray-100">
            <StatusButton status="Present" label="P" activeClass="bg-green-500 text-white shadow-green-500/20" />
            <StatusButton status="Absent" label="A" activeClass="bg-red-500 text-white shadow-red-500/20" />
            <StatusButton status="Late" label="L" activeClass="bg-amber-500 text-white shadow-amber-500/20" />
            <StatusButton status="Leave" label="Leave" activeClass="bg-brand-blue text-white shadow-brand-blue/20 w-auto px-4" />
          </div>

          {data.status === 'Late' && (
            <input 
              type="time" 
              className="h-10 w-24 rounded-xl border border-gray-100 bg-bg-soft/20 px-3 text-[10px] font-black text-text-slate animate-in slide-in-from-right-2"
              defaultValue={data.time || "08:15"}
              onChange={(e) => onUpdateTime(e.target.value)}
            />
          )}

          <button 
            onClick={() => setShowNote(!showNote)}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              data.note ? 'text-brand-blue bg-brand-blue/5' : 'text-gray-300 hover:text-gray-400 opacity-0 group-hover:opacity-100'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            {data.note && <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-brand-blue animate-pulse" />}
          </button>
          
          <div className={`w-24 text-right transition-all ${data.status === 'Unmarked' ? 'opacity-30' : 'opacity-100'}`}>
            <span className={`text-[10px] font-black uppercase tracking-widest ${
              data.status === 'Present' ? 'text-green-500' :
              data.status === 'Absent' ? 'text-red-500' :
              data.status === 'Late' ? 'text-amber-500' :
              data.status === 'Leave' ? 'text-brand-blue' : 'text-gray-400'
            }`}>
              {data.status === 'Unmarked' ? '—' : data.status}
            </span>
          </div>
        </div>
      </div>

      {showNote && (
        <div className="mt-6 animate-in slide-in-from-top-2">
          <textarea 
            placeholder="Add a reason or note for this student..."
            className="w-full h-20 rounded-2xl border border-gray-100 bg-bg-soft/20 p-4 text-xs font-bold focus:outline-none focus:ring-4 focus:ring-brand-blue/10 transition-all resize-none"
            defaultValue={data.note}
            onBlur={(e) => onUpdateNote(e.target.value)}
          />
        </div>
      )}
    </div>
  );
};
