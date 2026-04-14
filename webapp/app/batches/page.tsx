'use client';
import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { batches, Batch, teachers } from '@/lib/mockData';
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

export default function Batches() {
  // --- State ---
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    standard: 'All Standards',
    status: 'All',
    teacher: 'All Teachers',
  });
  const [viewMode, setViewMode] = useState<'Grid' | 'List'>('Grid');
  const [activeBatch, setActiveBatch] = useState<Batch | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  
  // Modal states
  const [modalType, setModalType] = useState<'Create' | 'Edit' | 'ManageStudents' | 'Delete' | 'Status' | 'Schedule' | null>(null);
  const [targetedBatch, setTargetedBatch] = useState<Batch | null>(null);
  const [statusType, setStatusType] = useState<'Full' | 'Inactive'>('Full');

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
  }, [searchTerm, filters]);

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
    setTargetedBatch(batch || null);
    setModalType(type);
    if (status) setStatusType(status);
  };

  const handleBatchAction = (batch: Batch, action: string) => {
    if (action === 'menu') {
      // Placeholder for context menu logic if needed, 
      // for now we'll just open the side panel or edit
      handleOpenSidePanel(batch);
    }
  };

  return (
    <div className="relative h-full flex overflow-hidden">
      {/* Main Content Strip */}
      <div className={`flex-1 overflow-y-auto custom-scrollbar transition-all duration-500 ${isPanelOpen ? 'mr-[500px]' : 'mr-0'}`}>
        <div className="p-8 space-y-10">
          {/* Header Area */}
          <div>
            <h1 className="text-4xl font-black text-text-slate tracking-tight leading-none mb-3">Batches</h1>
            <p className="text-sm font-bold text-gray-400">Manage schedules, teachers and student assignments</p>
          </div>

          <BatchesToolbar 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            filters={filters}
            onFilterChange={(name, value) => setFilters(f => ({ ...f, [name]: value }))}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onCreateClick={() => handleOpenModal('Create')}
            teachers={teacherNames}
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
      />

      {/* Modals Layer */}
      <CreateEditBatchModal 
        isOpen={modalType === 'Create' || modalType === 'Edit'} 
        onClose={() => setModalType(null)}
        title={modalType === 'Create' ? 'Create New Batch' : `Edit Batch — ${targetedBatch?.name}`}
        batch={targetedBatch}
      />

      {targetedBatch && (
        <>
          <ManageStudentsModal 
            isOpen={modalType === 'ManageStudents'} 
            onClose={() => setModalType(null)} 
            batch={targetedBatch} 
            title="Manage Students" 
          />
          <DeleteConfirmDialog 
            isOpen={modalType === 'Delete'} 
            onClose={() => setModalType(null)} 
            batchName={targetedBatch.name} 
            title="Delete Batch" 
          />
          <BatchStatusModal 
            isOpen={modalType === 'Status'} 
            onClose={() => setModalType(null)} 
            batchName={targetedBatch.name} 
            type={statusType}
            title={statusType === 'Full' ? 'Mark as Full' : 'Mark as Inactive'}
          />
          <EditScheduleModal 
            isOpen={modalType === 'Schedule'} 
            onClose={() => setModalType(null)} 
            batch={targetedBatch} 
          />
        </>
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
