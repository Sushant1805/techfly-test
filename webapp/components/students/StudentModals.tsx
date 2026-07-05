import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { X, AlertTriangle, CreditCard, MoveHorizontal } from 'lucide-react';
import { Student } from '@/lib/mockData';

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
}

const ModalOverlay: React.FC<{ children: React.ReactNode; onClose: () => void }> = ({ children, onClose }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/40 backdrop-blur-md px-4 animate-in fade-in duration-300">
    <div className="absolute inset-0" onClick={onClose} />
    {children}
  </div>
);

export const AddEditStudentModal: React.FC<BaseModalProps & { student?: Student | null }> = ({ isOpen, onClose, title, student }) => {
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [standard, setStandard] = React.useState('');
  const [batchId, setBatchId] = React.useState('');
  const [batches, setBatches] = React.useState<any[]>([]);
  const [submitting, setSubmitting] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');

  React.useEffect(() => {
    if (isOpen) {
      setName(student?.name || '');
      setPhone(student?.phone || '');
      setEmail(student?.email || '');
      setStandard(student?.standard || '');
      setBatchId(student?.batchId || '');
      setErrorMsg('');
    }
  }, [isOpen, student]);

  React.useEffect(() => {
    if (!isOpen) return;
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        const instituteSlug = user.instituteId;
        if (instituteSlug) {
          fetch(`/api/${instituteSlug}/batches`)
            .then(res => res.json())
            .then(data => {
              if (data.success) {
                setBatches(data.batches);
              }
            })
            .catch(err => console.error('Error fetching batches:', err));
        }
      } catch (err) {
        console.error('Error parsing user or fetching batches:', err);
      }
    }
  }, [isOpen]);

  const handleSave = async () => {
    if (!name.trim()) {
      setErrorMsg('Full Name is required');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('Student Phone is required');
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
        phone,
        email: email || undefined,
        standard: standard || undefined,
        batchId: batchId || undefined,
      };

      const url = student 
        ? `/api/${instituteSlug}/students/${student.id}` 
        : `/api/${instituteSlug}/students`;
      
      const method = student ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
      });

      const result = await res.json();
      if (result.success) {
        onClose();
      } else {
        setErrorMsg(result.message || 'Failed to save student');
      }
    } catch (err: any) {
      console.error('Error saving student:', err);
      setErrorMsg(err.message || 'An error occurred while saving student');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClose={onClose}>
      <Card className="w-full max-w-2xl shadow-soft-lg animate-in fade-in zoom-in-95 slide-in-from-bottom-5 duration-300 border-white bg-white/90 backdrop-blur-3xl p-0 overflow-visible rounded-[40px] relative z-10">
        <div className="flex items-center justify-between px-10 py-8 border-b border-gray-100/50">
          <div>
            <h3 className="font-bold text-2xl text-text-slate tracking-tight">{title}</h3>
            <p className="text-sm text-gray-400 mt-1">{student ? 'Update student records' : 'Enroll a new student to your coaching class'}</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-bg-soft flex items-center justify-center text-gray-400 hover:text-brand-blue hover:bg-white hover:shadow-soft transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-10 py-10 max-h-[70vh] overflow-y-auto space-y-10 custom-scrollbar">
          {errorMsg && (
            <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-semibold">
              {errorMsg}
            </div>
          )}

          {/* Section 1: Personal Details */}
          <section className="space-y-6">
            <h4 className="flex items-center gap-3 text-xs font-black text-brand-blue uppercase tracking-[0.2em] before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-brand-blue">Personal Details</h4>
            <div className="grid grid-cols-2 gap-6">
              <Input 
                label="Full Name *" 
                placeholder="e.g. Arjun Mehta" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
              />
              <div className="space-y-2">
                <label className="text-sm font-bold text-text-slate ml-1">Gender *</label>
                <div className="flex gap-2">
                  {['Male', 'Female', 'Other'].map(g => (
                    <button key={g} type="button" className={`flex-1 h-12 rounded-2xl border text-sm font-bold transition-all ${student?.gender === g ? 'bg-brand-blue border-brand-blue text-white shadow-soft' : 'bg-white border-gray-100 text-gray-500 hover:border-brand-blue/30'}`}>
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Input label="Date of Birth" type="date" defaultValue={student?.dob} />
              <Input 
                label="Student Phone *" 
                placeholder="9876543210" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
              />
            </div>
          </section>

          {/* Section 2: Academic Details */}
          <section className="space-y-6">
            <h4 className="flex items-center gap-3 text-xs font-black text-brand-blue uppercase tracking-[0.2em] before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-brand-blue">Academic Details</h4>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-text-slate ml-1">Standard / Class *</label>
                <select 
                  className="flex h-12 w-full rounded-2xl border border-gray-100 bg-white px-4 text-sm font-bold text-text-slate focus:outline-none focus:ring-4 focus:ring-brand-blue/10 focus:border-brand-blue/30 shadow-sm transition-all" 
                  value={standard}
                  onChange={(e) => setStandard(e.target.value)}
                >
                  <option value="">Select Class</option>
                  <option value="Std 9">Std 9</option>
                  <option value="Std 10">Std 10</option>
                  <option value="Std 11">Std 11</option>
                  <option value="Std 12">Std 12</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-text-slate ml-1">Batch *</label>
                <select 
                  className="flex h-12 w-full rounded-2xl border border-gray-100 bg-white px-4 text-sm font-bold text-text-slate focus:outline-none focus:ring-4 focus:ring-brand-blue/10 focus:border-brand-blue/30 shadow-sm transition-all" 
                  value={batchId}
                  onChange={(e) => setBatchId(e.target.value)}
                >
                  <option value="">Select Batch</option>
                  {batches.map((b: any) => (
                    <option key={b._id} value={b._id}>
                      {b.name} ({b.standard})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* Section 3: Parent Details */}
          <section className="space-y-6">
            <h4 className="flex items-center gap-3 text-xs font-black text-brand-blue uppercase tracking-[0.2em] before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-brand-blue">Parent Details</h4>
            <div className="grid grid-cols-2 gap-6">
              <Input label="Parent Name *" defaultValue={student?.parentName} />
              <div className="space-y-2">
                <label className="text-sm font-bold text-text-slate ml-1">Relation *</label>
                <div className="flex gap-2">
                  {['Father', 'Mother', 'Guardian'].map(r => (
                    <button key={r} type="button" className={`flex-1 h-12 rounded-2xl border text-sm font-bold transition-all ${student?.parentRelation === r ? 'bg-brand-blue border-brand-blue text-white shadow-soft' : 'bg-white border-gray-100 text-gray-500 hover:border-brand-blue/30'}`}>
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Input label="Parent Phone *" defaultValue={student?.parentPhone} />
              <Input 
                label="Parent Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
          </section>
        </div>

        <div className="px-10 py-8 border-t border-gray-100/50 flex items-center justify-end gap-4">
          <Button variant="ghost" onClick={onClose} disabled={submitting} className="px-8">Cancel</Button>
          <Button onClick={handleSave} disabled={submitting} className="px-12 h-14 text-base">
            {submitting ? 'Saving...' : student ? 'Save Changes' : 'Save Student'}
          </Button>
        </div>
      </Card>
    </ModalOverlay>
  );
};

export const RecordPaymentModal: React.FC<BaseModalProps & { student: Student }> = ({ isOpen, onClose, student }) => {
  if (!isOpen) return null;
  return (
    <ModalOverlay onClose={onClose}>
      <Card className="w-full max-w-md shadow-soft-lg animate-in fade-in zoom-in-95 duration-300 border-white bg-white/90 backdrop-blur-3xl p-10 rounded-[40px] relative z-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-500 flex items-center justify-center">
            <CreditCard className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-bold text-xl text-text-slate tracking-tight">Record Payment</h3>
            <p className="text-sm text-gray-400">Student: {student.name}</p>
          </div>
        </div>

        <div className="space-y-6">
          <Input label="Amount (₹) *" defaultValue={student.totalFeesDue} type="number" />
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-text-slate ml-1">Payment Month</label>
              <select className="flex h-12 w-full rounded-2xl border border-gray-100 bg-white px-4 text-sm font-bold text-text-slate focus:outline-none focus:ring-4 focus:ring-brand-blue/10">
                <option>April 2026</option>
                <option>May 2026</option>
              </select>
            </div>
            <Input label="Payment Date" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-text-slate ml-1">Payment Mode</label>
            <div className="grid grid-cols-2 gap-2">
              {['Cash', 'UPI', 'Bank', 'Cheque'].map(m => (
                <button key={m} className="h-10 rounded-xl border border-gray-100 text-xs font-bold text-gray-500 hover:border-brand-blue/30 hover:bg-white transition-all">{m}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-10">
          <Button variant="ghost" onClick={onClose} className="flex-1">Cancel</Button>
          <Button onClick={onClose} className="flex-[2] h-12">Confirm Payment</Button>
        </div>
      </Card>
    </ModalOverlay>
  );
};

export const ChangeBatchModal: React.FC<BaseModalProps & { student: Student }> = ({ isOpen, onClose, student }) => {
  if (!isOpen) return null;
  return (
    <ModalOverlay onClose={onClose}>
      <Card className="w-full max-w-md shadow-soft-lg animate-in fade-in zoom-in-95 duration-300 border-white bg-white/90 backdrop-blur-3xl p-10 rounded-[40px] relative z-10 text-center">
        <div className="w-20 h-20 rounded-[32px] bg-brand-blue/10 text-brand-blue flex items-center justify-center mx-auto mb-6">
          <MoveHorizontal className="w-10 h-10" />
        </div>
        <h3 className="font-bold text-2xl text-text-slate tracking-tight mb-2">Change Batch</h3>
        <p className="text-sm text-gray-400 mb-8">Move <span className="font-bold text-text-slate underline">{student.name}</span> to another batch</p>

        <div className="space-y-6 text-left">
          <div className="p-4 rounded-2xl bg-bg-soft text-sm font-medium text-gray-500 border border-gray-100 italic">
            Current: {student.batch} ({student.standard})
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-text-slate ml-1">New Batch *</label>
            <select className="flex h-12 w-full rounded-2xl border border-gray-100 bg-white px-4 text-sm font-bold text-text-slate focus:outline-none focus:ring-4 focus:ring-brand-blue/10">
              <option>Batch A</option>
              <option>Batch B</option>
              <option>Batch C</option>
              <option>Batch D</option>
              <option>Batch E</option>
            </select>
          </div>
          <Input label="Reason for Change (Optional)" placeholder="e.g. Schedule conflict" />
        </div>

        <div className="flex items-center gap-3 mt-10">
          <Button variant="ghost" onClick={onClose} className="flex-1">Cancel</Button>
          <Button onClick={onClose} className="flex-[2] h-12">Move Student</Button>
        </div>
      </Card>
    </ModalOverlay>
  );
};

export const DeleteConfirmDialog: React.FC<BaseModalProps & { studentName: string }> = ({ isOpen, onClose, studentName }) => {
  if (!isOpen) return null;
  return (
    <ModalOverlay onClose={onClose}>
      <Card className="w-full max-w-sm shadow-soft-lg animate-in fade-in zoom-in-95 duration-300 border-white bg-white/90 backdrop-blur-3xl p-10 rounded-[40px] relative z-10 text-center">
        <div className="w-20 h-20 rounded-[32px] bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-10 h-10" />
        </div>
        <h3 className="font-bold text-2xl text-text-slate tracking-tight mb-3">Delete Student?</h3>
        <p className="text-sm text-gray-400 leading-relaxed mb-10">
          Are you sure you want to delete <span className="font-bold text-red-500">{studentName}</span>? This action is permanent and cannot be undone.
        </p>
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={onClose} className="flex-1">Cancel</Button>
          <Button onClick={onClose} className="flex-[2] h-12 bg-red-500 hover:bg-red-600 border-none shadow-red-500/20">Delete Student</Button>
        </div>
      </Card>
    </ModalOverlay>
  );
};
