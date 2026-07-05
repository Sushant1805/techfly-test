'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { Search, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Batch, teachers } from '@/lib/mockData';
import { BatchesToolbar } from '@/components/batches/BatchesToolbar';
import { BatchCard } from '@/components/batches/BatchCard';
import { BatchTable } from '@/components/batches/BatchTable';
import { BatchSidePanel } from '@/components/batches/BatchSidePanel';
import { 
  CreateEditBatchModal, 
  ManageStudentsModal, 
  DeleteConfirmDialog, 
  BatchStatusModal, 
  EditScheduleModal 
} from '@/components/batches/BatchModals';
import { CreateTestModal } from '@/components/tests/TestModals';

export default function Batches() {
  // --- State ---
  const [batches, setBatches] = useState<Batch[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    standard: 'All Standards',
    status: 'All',
    teacher: 'All Teachers',
  });
  const [viewMode, setViewMode] = useState<'Grid' | 'List'>('Grid');
  const [activeBatch, setActiveBatch] = useState<Batch | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [modalType, setModalType] = useState<string | null>(null);
  const [targetedBatch, setTargetedBatch] = useState<Batch | null>(null);
  const [statusType, setStatusType] = useState<'Full' | 'Inactive' | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isCreateTestOpen, setIsCreateTestOpen] = useState(false);
  const [createTestBatchId, setCreateTestBatchId] = useState('');
  
  const [userRole, setUserRole] = useState('teacher');
  const [userId, setUserId] = useState('');

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const userStr = localStorage.getItem('user');
        if (!userStr) return;
        const user = JSON.parse(userStr);
        const instituteSlug = user.instituteId;
        setUserRole(user.role);
        setUserId(user.id);

        const res = await fetch(`/api/${instituteSlug}/batches`);
        const data = await res.json();
        if (data.success) {
          const mapped = data.batches.map((b: any) => ({
            id: b._id,
            name: b.name,
            standard: b.standard,
            subject: b.subject || 'All Subjects',
            subjects: b.subjects || [b.subject || 'All Subjects'],
            teacherId: b.teacher?._id,
            teacher: {
              id: b.teacher?._id || '',
              name: b.teacher?.name || 'Unassigned',
              avatar: 'https://i.pravatar.cc/150?u=' + b.teacher?._id,
              phone: b.teacher?.phone || '9876543210',
              email: b.teacher?.email || 'teacher@ezzycoach.in',
              subjects: b.teacher?.subjects || [b.subject || 'All Subjects'],
            },
            status: b.status || 'Active',
            totalStudents: b.totalStudents || 0,
            capacity: b.capacity || 30,
            schedule: b.schedule && b.schedule.length > 0 ? b.schedule.map((s: any) => ({
              day: s.day || 'Monday',
              startTime: s.startTime || '10:00',
              endTime: s.endTime || '12:00'
            })) : [
              { day: 'Monday', startTime: '10:00', endTime: '12:00' },
              { day: 'Wednesday', startTime: '10:00', endTime: '12:00' }
            ],
            nextClass: b.nextClass || 'Tomorrow, 10:00 AM',
            progress: b.progress || 45,
            room: b.room || 'Room 101',
            startDate: b.startDate || '2026-06-01',
            fees: b.fees || 4500,
            color: b.color || '#5E4E99',
            attendanceToday: b.attendanceToday || 0,
            averageAttendance: b.averageAttendance || 90,
            lastClassDate: b.lastClassDate || '2026-06-25',
            upcomingTest: b.upcomingTest || null,
            notes: b.notes || 'No notes yet'
          }));
          
          // Filter if teacher
          if (user.role === 'teacher') {
            setBatches(mapped.filter((b: any) => b.teacherId === user.id));
          } else {
            setBatches(mapped);
          }
        }
      } catch (error) {
        console.error('Error fetching batches:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBatches();
  }, [modalType]);

  // --- Derived Data ---
  const filteredBatches = useMemo(() => {
    return batches.filter(b => {
      const matchesSearch = 
        b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.standard.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStandard = filters.standard === 'All Standards' || b.standard === filters.standard;
      const matchesStatus = filters.status === 'All' || b.status === filters.status;
      const matchesTeacher = filters.teacher === 'All Teachers' || b.teacher.name === filters.teacher;

      return matchesSearch && matchesStandard && matchesStatus && matchesTeacher;
    });
  }, [searchTerm, filters, batches]);

  const summaryData = useMemo(() => ({
    total: filteredBatches.length,
    active: filteredBatches.filter(b => b.status === 'Active').length,
    full: filteredBatches.filter(b => b.status === 'Full').length,
    students: filteredBatches.reduce((acc, curr) => acc + curr.totalStudents, 0),
  }), [filteredBatches]);

  const teacherNames = useMemo(() => teachers.map(t => t.name), []);

  // --- Handlers ---
  const handleOpenSidePanel = (batch: Batch) => {
    setActiveBatch(batch);
    setIsPanelOpen(true);
  };

  const handleOpenModal = (type: any, batch?: Batch, status?: 'Full' | 'Inactive') => {
    if (userRole === 'teacher') return;
    setTargetedBatch(batch || null);
    setModalType(type);
    if (status) setStatusType(status);
  };

  const handleBatchAction = (batch: Batch, action: string) => {
    if (action === 'menu') {
      handleOpenSidePanel(batch);
    }
  };

  const handleCreateTest = (batch: Batch) => {
    setCreateTestBatchId(batch.id);
    setIsCreateTestOpen(true);
  };

  return (
    <div className="relative h-full flex overflow-hidden">
      {/* Main Content Strip */}
      <div className={`flex-1 overflow-y-auto custom-scrollbar transition-all duration-500 ${isPanelOpen ? 'mr-[500px]' : 'mr-0'}`}>
        <div className="p-8 space-y-10">
          {/* Header Area */}
          <div>
            <h1 className="text-4xl font-black text-text-slate tracking-tight leading-none mb-3">
              {userRole === 'teacher' ? 'Your Batches' : 'Batches'}
            </h1>
            <p className="text-sm font-bold text-gray-400">
              {userRole === 'teacher' ? 'Your assigned schedules and student lists' : 'Manage schedules, teachers and student assignments'}
            </p>
          </div>

          <BatchesToolbar 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            filters={filters}
            onFilterChange={(name, value) => setFilters(f => ({ ...f, [name]: value }))}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onCreateClick={userRole === 'teacher' ? () => {} : () => handleOpenModal('Create')}
            teachers={userRole === 'teacher' ? [] : teacherNames}
          />


          {/* Summary Strip */}
          <div className="flex flex-wrap items-center gap-4">
            <SummaryChip label="Total Batches" value={summaryData.total} />
            <SummaryChip label="Active" value={summaryData.active} variant="success" />
            <SummaryChip label="Full" value={summaryData.full} variant="warning" />
            <SummaryChip label="Total Students" value={summaryData.students} variant="info" />
          </div>

          {/* Main View Area */}
          {viewMode === 'Grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8 pb-20">
              {filteredBatches.map(batch => (
                <BatchCard 
                  key={batch.id} 
                  batch={batch} 
                  onView={handleOpenSidePanel} 
                  onAction={handleBatchAction}
                />
              ))}
              {filteredBatches.length === 0 && <EmptyState searchTerm={searchTerm} />}
            </div>
          ) : (
            <Card className="border-none shadow-soft-lg rounded-[40px] overflow-hidden bg-white/50 backdrop-blur-sm">
              <BatchTable 
                batches={filteredBatches}
                onView={handleOpenSidePanel}
                onEdit={(b) => handleOpenModal('Edit', b)}
                onAction={handleBatchAction}
              />
              {filteredBatches.length === 0 && <EmptyState searchTerm={searchTerm} />}
            </Card>
          )}
        </div>
      </div>

      {/* Side Panel Detail View */}
      <BatchSidePanel 
        batch={activeBatch} 
        isOpen={isPanelOpen} 
        onClose={() => setIsPanelOpen(false)}
        onEdit={(b) => handleOpenModal('Edit', b)}
        onAddStudent={(b) => handleOpenModal('ManageStudents', b)}
        onCreateTest={handleCreateTest}
      />

      {/* Modals Layer */}
      <CreateEditBatchModal 
        isOpen={modalType === 'Create' || modalType === 'Edit'} 
        onClose={() => setModalType(null)}
        title={modalType === 'Create' ? 'Create New Batch' : `Edit Batch — ${targetedBatch?.name}`}
        batch={targetedBatch}
        onSuccess={(msg) => {
          setModalType(null);
          showToast(msg);
        }}
      />


      <CreateTestModal
        isOpen={isCreateTestOpen}
        initialBatchId={createTestBatchId}
        onClose={() => {
          setIsCreateTestOpen(false);
          setCreateTestBatchId('');
        }}
        onSuccess={(msg) => {
          setIsCreateTestOpen(false);
          setCreateTestBatchId('');
          showToast(msg);
        }}
      />
      {targetedBatch && (
        <>
          <ManageStudentsModal 
            isOpen={modalType === 'ManageStudents'} 
            onClose={() => setModalType(null)} 
            batch={targetedBatch!} 
            title="Manage Students" 
          />
          <DeleteConfirmDialog 
            isOpen={modalType === 'Delete'} 
            onClose={() => setModalType(null)} 
            batchName={targetedBatch?.name} 
            title="Delete Batch" 
          />
          <BatchStatusModal 
            isOpen={modalType === 'Status'} 
            onClose={() => setModalType(null)} 
            batchName={targetedBatch?.name} 
            type={statusType!}
            title={statusType === 'Full' ? 'Mark as Full' : 'Mark as Inactive'}
          />
          <EditScheduleModal 
            isOpen={modalType === 'Schedule'} 
            onClose={() => setModalType(null)} 
            batch={targetedBatch!} 
          />
        </>
      )}

      {toast && (
        <div className="fixed bottom-10 right-10 z-[200] flex items-center gap-3 bg-white border border-green-100 shadow-2xl p-5 rounded-3xl animate-in slide-in-from-bottom-5 duration-300">
          <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-500">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Success</p>
            <p className="text-sm font-black text-text-slate">{toast.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Local Components ---

const SummaryChip = ({ label, value, variant = 'default' }: { label: string; value: number; variant?: 'default' | 'success' | 'warning' | 'info' }) => {
  const styles = {
    default: 'bg-white text-text-slate border-gray-100',
    success: 'bg-green-50 text-green-600 border-green-100',
    warning: 'bg-amber-50 text-amber-600 border-amber-100',
    info: 'bg-brand-blue/5 text-brand-blue border-brand-blue/10',
  };
  return (
    <div className={`px-6 py-4 rounded-2xl border ${styles[variant]} shadow-soft flex items-center gap-4 animate-in fade-in zoom-in duration-500`}>
      <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">{label}</span>
      <span className="text-xl font-black tracking-tight">{value}</span>
    </div>
  );
};

const EmptyState = ({ searchTerm }: { searchTerm: string }) => (
  <div className="col-span-full py-32 text-center animate-in fade-in duration-700">
    <div className="w-20 h-20 rounded-[32px] bg-bg-soft flex items-center justify-center mx-auto mb-6 text-gray-300">
      <Search className="w-10 h-10" />
    </div>
    <h3 className="text-xl font-black text-text-slate mb-2">No batches found</h3>
    <p className="text-sm font-bold text-gray-400">Try adjusting your filters or search terms for &quot;{searchTerm}&quot;</p>
  </div>
);
