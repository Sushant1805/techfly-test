import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { X, AlertTriangle, Search, Plus, Trash2, Calendar, Clock, DoorOpen, Users } from 'lucide-react';
import { Batch, Teacher, teachers, students } from '@/lib/mockData';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

// --- 1. Create/Edit Batch Modal ---
interface CreateEditBatchModalProps extends ModalProps {
  batch?: Batch | null;
  onSuccess?: (msg: string) => void;
}

export const CreateEditBatchModal: React.FC<CreateEditBatchModalProps> = ({ isOpen, onClose, title, batch, onSuccess }) => {
  const [name, setName] = useState('');
  const [standard, setStandard] = useState('Std 9');
  const [capacity, setCapacity] = useState('30');
  const [teacherId, setTeacherId] = useState('');
  const [teachersList, setTeachersList] = useState<any[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [scheduleSlots, setScheduleSlots] = useState(batch?.schedule || [{ day: 'Monday', startTime: '08:00', endTime: '10:00' }]);

  const addSlot = () => setScheduleSlots([...scheduleSlots, { day: 'Monday', startTime: '08:00', endTime: '10:00' }]);
  const removeSlot = (index: number) => setScheduleSlots(scheduleSlots.filter((_, i) => i !== index));

  React.useEffect(() => {
    if (isOpen) {
      setName(batch?.name || '');
      setStandard(batch?.standard || 'Std 9');
      setCapacity(batch?.capacity?.toString() || '30');
      setTeacherId(batch?.teacherId || '');
      setScheduleSlots(batch?.schedule || [{ day: 'Monday', startTime: '08:00', endTime: '10:00' }]);
      setErrorMsg('');
    }
  }, [isOpen, batch]);

  React.useEffect(() => {
    if (!isOpen) return;
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        const instituteSlug = user.instituteId;
        if (instituteSlug) {
          fetch(`/api/${instituteSlug}/staff?role=Teacher`)
            .then(res => res.json())
            .then(data => {
              if (data.success) {
                setTeachersList(data.staff);
              }
            })
            .catch(err => console.error('Error fetching teachers:', err));
        }
      } catch (err) {
        console.error('Error parsing user or fetching teachers:', err);
      }
    }
  }, [isOpen]);

  const handleSave = async () => {
    if (!name.trim()) {
      setErrorMsg('Batch Name is required');
      return;
    }
    if (!capacity.trim() || isNaN(Number(capacity))) {
      setErrorMsg('Valid Capacity is required');
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
        name,
        standard,
        capacity: Number(capacity),
        teacher: teacherId || undefined,
      };

      const url = batch 
        ? `/api/${instituteSlug}/batches/${batch.id}` 
        : `/api/${instituteSlug}/batches`;
      
      const method = batch ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
      });

      const result = await res.json();
      if (result.success) {
        if (onSuccess) {
          onSuccess(batch ? 'Batch updated successfully!' : 'Batch created successfully!');
        } else {
          onClose();
        }
      } else {
        setErrorMsg(result.message || 'Failed to save batch');
      }
    } catch (err: any) {
      console.error('Error saving batch:', err);
      setErrorMsg(err.message || 'An error occurred while saving batch');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/40 backdrop-blur-md px-4 animate-in fade-in duration-300">
      <Card className="w-full max-w-[640px] max-h-[90vh] overflow-y-auto shadow-soft-lg animate-in zoom-in-95 duration-300 border-white bg-white/95 backdrop-blur-3xl p-0 rounded-[40px] custom-scrollbar">
        <div className="sticky top-0 bg-white/80 backdrop-blur-md z-10 flex items-center justify-between px-10 py-8 border-b border-gray-50">
          <div>
            <h3 className="font-black text-2xl text-text-slate tracking-tight">{title}</h3>
            <p className="text-sm font-bold text-gray-400 mt-1">Configure batch details and schedule</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-bg-soft flex items-center justify-center text-gray-400 hover:text-brand-blue hover:bg-white hover:shadow-soft transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-10 space-y-12">
          {errorMsg && (
            <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-semibold">
              {errorMsg}
            </div>
          )}

          {/* Section 1: Basic Details */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-brand-blue uppercase tracking-[0.3em] px-2 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-brand-blue" /> Basic Information
            </h4>
            <div className="grid grid-cols-2 gap-6">
              <Input 
                label="Batch Name *" 
                placeholder="e.g. Batch F" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
              />
              <div className="space-y-2">
                <label className="text-xs font-black text-text-slate ml-1 uppercase tracking-widest">Standard / Class *</label>
                <select 
                  className="flex h-12 w-full rounded-2xl border border-gray-100 bg-white px-4 py-2 text-sm font-bold text-text-slate focus:outline-none focus:ring-4 focus:ring-brand-blue/10 focus:border-brand-blue/30 shadow-sm transition-all hover:border-brand-blue/20"
                  value={standard}
                  onChange={(e) => setStandard(e.target.value)}
                >
                  {['Std 9', 'Std 10', 'Std 11', 'Std 12'].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-text-slate ml-1 uppercase tracking-widest">Subjects *</label>
                <div className="flex flex-wrap gap-2 p-3 min-h-[48px] rounded-2xl border border-gray-100 bg-bg-soft/20">
                  {['Maths', 'Physics', 'Chemistry'].map(s => (
                    <Badge key={s} className="bg-brand-blue/10 text-brand-blue border-none font-bold py-1.5 px-3">
                      {s} <X className="w-3 h-3 ml-2 cursor-pointer" />
                    </Badge>
                  ))}
                  <button className="text-[10px] font-black text-gray-400 hover:text-brand-blue uppercase tracking-widest p-1">+ Add</button>
                </div>
              </div>
              <Input label="Room / Location" placeholder="e.g. Room 101" defaultValue={batch?.room} />
            </div>
            <div className="grid grid-cols-3 gap-6">
              <Input 
                label="Capacity *" 
                type="number" 
                placeholder="40" 
                value={capacity} 
                onChange={(e) => setCapacity(e.target.value)} 
              />
              <Input label="Monthly Fees (₹) *" type="number" placeholder="4500" defaultValue={batch?.fees} />
              <Input label="Start Date *" type="date" defaultValue={batch?.startDate} />
            </div>
          </div>

          {/* Section 2: Assign Teacher */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-brand-blue uppercase tracking-[0.3em] px-2 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-brand-blue" /> Assign Teacher
            </h4>
            <div className="space-y-3">
              <select 
                className="flex h-14 w-full rounded-2xl border border-gray-100 bg-white px-4 py-2 text-sm font-bold text-text-slate focus:outline-none focus:ring-4 focus:ring-brand-blue/10 focus:border-brand-blue/30 shadow-sm transition-all hover:border-brand-blue/20"
                value={teacherId}
                onChange={(e) => setTeacherId(e.target.value)}
              >
                <option value="">Select Teacher</option>
                {teachersList.map((t: any) => (
                  <option key={t._id} value={t._id}>{t.name}</option>
                ))}
              </select>
              <button className="text-[10px] font-black text-brand-blue uppercase tracking-widest ml-2 hover:underline">Can't find teacher? Add new teacher</button>
            </div>
          </div>

          {/* Section 3: Schedule */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h4 className="text-[10px] font-black text-brand-blue uppercase tracking-[0.3em] flex items-center gap-2">
                <span className="w-4 h-0.5 bg-brand-blue" /> Schedule Slots
              </h4>
              <button onClick={addSlot} className="text-[10px] font-black text-brand-blue uppercase tracking-widest hover:underline">+ Add Slot</button>
            </div>
            <div className="space-y-4">
              {scheduleSlots.map((slot, index) => (
                <div key={index} className="flex gap-4 items-end p-6 rounded-3xl bg-bg-soft/30 border border-gray-50 relative group">
                  <div className="flex-1 space-y-2">
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Day</label>
                    <select className="flex h-11 w-full rounded-xl border border-gray-100 bg-white px-3 text-xs font-bold focus:outline-none focus:ring-4 focus:ring-brand-blue/10">
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div className="flex-1 space-y-2">
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Start Time</label>
                    <input type="time" className="flex h-11 w-full rounded-xl border border-gray-100 bg-white px-3 text-xs font-bold focus:outline-none focus:ring-4 focus:ring-brand-blue/10" defaultValue={slot.startTime} />
                  </div>
                  <div className="flex-1 space-y-2">
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">End Time</label>
                    <input type="time" className="flex h-11 w-full rounded-xl border border-gray-100 bg-white px-3 text-xs font-bold focus:outline-none focus:ring-4 focus:ring-brand-blue/10" defaultValue={slot.endTime} />
                  </div>
                  <button onClick={() => removeSlot(index)} className="w-11 h-11 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-50 p-10 flex items-center justify-end gap-4">
          <Button variant="ghost" onClick={onClose} disabled={submitting} className="font-black uppercase tracking-widest text-xs h-14 px-10 rounded-2xl">Cancel</Button>
          <Button onClick={handleSave} disabled={submitting} className="font-black uppercase tracking-widest text-xs h-14 px-12 rounded-2xl shadow-brand-blue/20">
            {submitting ? 'Saving...' : batch ? 'Save Changes' : 'Create Batch'}
          </Button>
        </div>
      </Card>
    </div>
  );
};

// --- 2. Manage Students Modal ---
interface ManageStudentsModalProps extends ModalProps {
  batch: Batch;
}

export const ManageStudentsModal: React.FC<ManageStudentsModalProps> = ({ isOpen, onClose, batch }) => {
  const [currentStudents, setCurrentStudents] = useState(students.slice(0, 10)); // Mocking 10 students in batch
  const [unassignedSearch, setUnassignedSearch] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/40 backdrop-blur-md px-4 animate-in fade-in duration-300">
      <Card className="w-full max-w-[800px] shadow-soft-lg animate-in zoom-in-95 duration-300 border-white bg-white/95 backdrop-blur-3xl p-0 rounded-[40px] overflow-hidden">
        <div className="flex items-center justify-between px-10 py-8 border-b border-gray-50">
          <div>
            <h3 className="font-black text-2xl text-text-slate tracking-tight">Manage Students — {batch.name}</h3>
            <p className="text-sm font-bold text-gray-400 mt-1">Enroll or remove students from this batch</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-bg-soft flex items-center justify-center text-gray-400 hover:text-brand-blue hover:bg-white hover:shadow-soft transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="grid grid-cols-2 h-[500px]">
          {/* Left Column: Current Students */}
          <div className="border-r border-gray-50 flex flex-col">
            <div className="p-6 bg-bg-soft/30 border-b border-gray-50 flex items-center justify-between">
              <span className="text-[10px] font-black text-brand-blue uppercase tracking-widest">Enrolled Students ({currentStudents.length})</span>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-3 custom-scrollbar">
              {currentStudents.map(s => (
                <div key={s.id} className="p-4 rounded-2xl border border-gray-50 bg-white group hover:shadow-soft flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-bg-soft flex items-center justify-center text-[10px] font-black text-brand-blue">{s.name.charAt(0)}</div>
                    <div>
                      <p className="text-xs font-bold text-text-slate leading-none mb-1">{s.name}</p>
                      <p className="text-[9px] font-bold text-gray-400 uppercase">{s.rollNumber}</p>
                    </div>
                  </div>
                  <button className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Search & Add */}
          <div className="flex flex-col bg-bg-soft/10">
            <div className="p-6 border-b border-gray-50 space-y-4">
              <span className="text-[10px] font-black text-text-slate uppercase tracking-widest">Add New Students</span>
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-blue" />
                <input 
                  placeholder="Search students not in this batch..."
                  className="w-full h-11 pl-11 pr-4 rounded-xl border border-gray-100 bg-white text-xs font-bold focus:outline-none focus:ring-4 focus:ring-brand-blue/10 transition-all"
                  value={unassignedSearch}
                  onChange={(e) => setUnassignedSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-3 custom-scrollbar">
              {students.slice(10, 20).map(s => (
                <div key={s.id} className="p-4 rounded-2xl border border-transparent hover:border-gray-50 hover:bg-white hover:shadow-soft flex items-center justify-between group transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-bg-soft flex items-center justify-center text-[10px] font-black text-brand-blue">{s.name.charAt(0)}</div>
                    <div>
                      <p className="text-xs font-bold text-text-slate leading-none mb-1">{s.name}</p>
                      <p className="text-[9px] font-bold text-gray-400 uppercase">{s.standard}</p>
                    </div>
                  </div>
                  <Button variant="ghost" className="h-8 px-3 rounded-lg text-[10px] font-black uppercase text-brand-blue hover:bg-brand-blue/10">Add</Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-10 border-t border-gray-50 flex items-center justify-end gap-4 bg-white">
          <Button variant="ghost" onClick={onClose} className="font-black uppercase tracking-widest text-xs h-14 px-10 rounded-2xl">Cancel</Button>
          <Button onClick={onClose} className="font-black uppercase tracking-widest text-xs h-14 px-12 rounded-2xl shadow-brand-blue/20">Save Changes</Button>
        </div>
      </Card>
    </div>
  );
};

// --- 3. Delete Confirm Dialog ---
interface DeleteConfirmProps extends ModalProps {
  batchName: string;
}

export const DeleteConfirmDialog: React.FC<DeleteConfirmProps> = ({ isOpen, onClose, title, batchName }) => {
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-gray-900/60 backdrop-blur-lg px-4 animate-in fade-in duration-300">
      <Card className="w-full max-w-[400px] shadow-soft-lg animate-in zoom-in-95 duration-300 border-white bg-white p-0 rounded-[40px] overflow-hidden">
        <div className="p-10 text-center space-y-6">
          <div className="w-20 h-20 rounded-[30px] bg-red-50 text-red-500 flex items-center justify-center mx-auto shadow-inner">
            <AlertTriangle className="w-10 h-10" />
          </div>
          <div>
            <h3 className="font-black text-2xl text-text-slate tracking-tight">Delete {batchName}?</h3>
            <p className="text-sm font-bold text-gray-400 mt-2 leading-relaxed px-4">
              This batch has 42 students. Deleting it will remove all batch assignments. Students will not be deleted.
            </p>
          </div>
          
          <div className="flex items-center gap-3 p-4 bg-red-50/50 rounded-2xl border border-red-50">
            <input 
              type="checkbox" 
              id="confirm-delete" 
              className="w-5 h-5 rounded-lg border-red-200 text-red-500 focus:ring-red-500"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
            />
            <label htmlFor="confirm-delete" className="text-xs font-black text-red-600 uppercase tracking-widest cursor-pointer select-none">I understand, delete this batch</label>
          </div>
        </div>

        <div className="p-8 bg-bg-soft/30 border-t border-gray-50 flex flex-col gap-3">
          <Button 
            disabled={!confirmed} 
            className="w-full h-14 rounded-2xl bg-red-500 hover:bg-red-600 border-none font-black text-xs uppercase tracking-widest shadow-red-200"
          >
            Delete Batch
          </Button>
          <Button variant="ghost" onClick={onClose} className="w-full h-14 rounded-2xl font-black text-xs text-gray-400 uppercase tracking-widest">Cancel</Button>
        </div>
      </Card>
    </div>
  );
};

// --- 4. Mark as Full/Inactive Modal ---
interface BatchStatusModalProps extends ModalProps {
  batchName: string;
  type: 'Full' | 'Inactive';
}

export const BatchStatusModal: React.FC<BatchStatusModalProps> = ({ isOpen, onClose, title, batchName, type }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-gray-900/40 backdrop-blur-md px-4 animate-in fade-in duration-300">
      <Card className="w-full max-w-[400px] shadow-soft-lg animate-in zoom-in-95 duration-300 bg-white p-0 rounded-[40px] overflow-hidden ring-1 ring-gray-100">
        <div className="p-10 text-center space-y-6">
          <div className={`w-20 h-20 rounded-[30px] ${type === 'Full' ? 'bg-amber-50 text-amber-500' : 'bg-gray-50 text-gray-500'} flex items-center justify-center mx-auto`}>
            {type === 'Full' ? <Users className="w-10 h-10" /> : <AlertTriangle className="w-10 h-10" />}
          </div>
          <div>
            <h4 className="font-black text-xl text-text-slate tracking-tight">Mark {batchName} as {type}?</h4>
            <p className="text-sm font-bold text-gray-400 mt-2 leading-relaxed">
              {type === 'Full' 
                ? "Marking as Full will prevent new student enrollments." 
                : "Inactive batches won't appear in attendance or timetable."}
            </p>
          </div>
          {type === 'Inactive' && (
            <textarea 
              placeholder="Reason for making inactive..."
              className="w-full h-24 rounded-2xl border border-gray-100 bg-bg-soft/30 p-4 text-xs font-bold focus:outline-none focus:ring-4 focus:ring-gray-100 resize-none"
            />
          )}
        </div>
        <div className="p-8 border-t border-gray-50 flex gap-3">
          <Button variant="ghost" onClick={onClose} className="flex-1 font-black text-xs uppercase tracking-widest">Cancel</Button>
          <Button className={`flex-1 font-black text-xs uppercase tracking-widest shadow-soft ${type === 'Full' ? 'bg-amber-500 hover:bg-amber-600' : ''}`}>
            Confirm
          </Button>
        </div>
      </Card>
    </div>
  );
};

// --- 5. Edit Schedule Modal (Simple) ---
export const EditScheduleModal: React.FC<{ isOpen: boolean; onClose: () => void; batch: Batch }> = ({ isOpen, onClose, batch }) => {
  const [slots, setSlots] = useState(batch.schedule);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-gray-900/40 backdrop-blur-md px-4 animate-in fade-in duration-300">
      <Card className="w-full max-w-[500px] shadow-soft-lg animate-in zoom-in-95 duration-300 bg-white p-0 rounded-[40px] overflow-hidden">
        <div className="px-10 py-8 border-b border-gray-50 flex items-center justify-between">
          <h3 className="font-black text-xl text-text-slate tracking-tight font-bold">Edit Schedule — {batch.name}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-text-slate"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-10 space-y-6 max-h-[400px] overflow-y-auto custom-scrollbar">
          {slots.map((slot, i) => (
            <div key={i} className="flex gap-4 items-end p-4 rounded-2xl bg-bg-soft/30 animate-in slide-in-from-bottom-2">
              <div className="flex-1 space-y-1">
                <span className="text-[9px] font-black uppercase text-gray-400">Day</span>
                <select className="w-full h-10 rounded-xl border border-gray-100 bg-white text-xs font-bold px-2">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(d => <option key={d} value={d} selected={slot.day === d}>{d}</option>)}
                </select>
              </div>
              <div className="flex-1 space-y-1">
                <span className="text-[9px] font-black uppercase text-gray-400">Start</span>
                <input type="time" className="w-full h-10 rounded-xl border border-gray-100 bg-white text-xs font-bold px-2" defaultValue={slot.startTime} />
              </div>
              <div className="flex-1 space-y-1">
                <span className="text-[9px] font-black uppercase text-gray-400">End</span>
                <input type="time" className="w-full h-10 rounded-xl border border-gray-100 bg-white text-xs font-bold px-2" defaultValue={slot.endTime} />
              </div>
              <button onClick={() => setSlots(slots.filter((_, idx) => idx !== i))} className="w-10 h-10 text-gray-300 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
            </div>
          ))}
          <Button variant="outline" className="w-full gap-2 border-dashed border-2 py-6 rounded-2xl font-black text-[10px] uppercase text-brand-blue" onClick={() => setSlots([...slots, { day: 'Monday', startTime: '08:00', endTime: '10:00' }])}>
            <Plus className="w-4 h-4" /> Add Another Slot
          </Button>
        </div>
        <div className="p-8 border-t border-gray-50 flex gap-3 text-sm font-bold text-gray-400">
          <Button variant="ghost" onClick={onClose} className="flex-1 font-black text-xs uppercase text-gray-400">Cancel</Button>
          <Button onClick={onClose} className="flex-1 font-black text-xs uppercase shadow-soft">Save Schedule</Button>
        </div>
      </Card>
    </div>
  );
};
