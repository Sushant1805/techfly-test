'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Search, Plus, Filter, Download } from 'lucide-react';
import { Student } from '@/lib/mockData';
import { SummaryStrip } from '@/components/students/SummaryStrip';
import { StudentTable } from '@/components/students/StudentTable';
import { StudentSidePanel } from '@/components/students/StudentSidePanel';
import { BulkActionsBar } from '@/components/students/BulkActionsBar';
import { 
  AddEditStudentModal, 
  RecordPaymentModal, 
  ChangeBatchModal, 
  DeleteConfirmDialog 
} from '@/components/students/StudentModals';
import { setupAuthOptions } from '@/lib/api';

export default function Students() {
  const router = useRouter();
  // --- State ---
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    standard: 'All Standards',
    batch: 'All Batches',
    status: 'All',
    fees: 'All',
  });
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeStudent, setActiveStudent] = useState<Student | null>(null);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  
  // Modal states
  const [modalType, setModalType] = useState<'Add' | 'Edit' | 'Payment' | 'Batch' | 'Delete' | null>(null);
  const [targetedStudent, setTargetedStudent] = useState<Student | null>(null);

  const [userRole, setUserRole] = useState('teacher');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const userStr = localStorage.getItem('user');
        if (!userStr) {
          // not logged in or stale user — redirect to login to refresh stored institute
          router.push('/login');
          return;
        }
        const user = JSON.parse(userStr);
        const instituteSlug = user.instituteId;
        if (!instituteSlug) {
          router.push('/login');
          return;
        }
        setUserRole(user.role);

        const res = await fetch(`/api/${instituteSlug}/students`);
        const data = await res.json();
        if (data.success) {
          const mapped = data.students.map((s: any) => ({
            id: s._id,
            name: s.name,
            rollNumber: s.rollNumber,
            standard: s.standard,
            batch: s.batchId ? (typeof s.batchId === 'object' ? s.batchId.name : 'Unassigned') : 'Unassigned',
            batchId: s.batchId ? (typeof s.batchId === 'object' ? s.batchId._id : s.batchId) : '',
            phone: s.phone,
            email: s.email,
            parentName: s.parentName,
            parentPhone: s.parentPhone,
            address: s.address,
            status: s.status, 
            feesStatus: s.feesStatus, 
            attendancePercent: s.attendancePercent, 
            joinDate: s.createdAt ? new Date(s.createdAt).toLocaleDateString() : '',
            lastPaymentDate: s.lastPaymentDate,
            totalFeesDue: s.totalFeesDue,
            photo: s.photo,
            gender: s.gender,
            dob: s.dob,
            parentRelation: s.parentRelation,
            subjects: s.subjects,
            lastTestScore: s.lastTestScore,
            notes: s.notes
          }));
          setStudents(mapped);
        }
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, [modalType]);

  // --- Derived Data ---
  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      const matchesSearch = 
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.phone.includes(searchTerm) ||
        s.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStandard = filters.standard === 'All Standards' || s.standard === filters.standard;
      const matchesBatch = filters.batch === 'All Batches' || s.batch === filters.batch;
      const matchesStatus = filters.status === 'All' || s.status === filters.status;
      const matchesFees = filters.fees === 'All' || s.feesStatus === filters.fees;

      return matchesSearch && matchesStandard && matchesBatch && matchesStatus && matchesFees;
    });
  }, [searchTerm, filters, students]);

  const summaryData = useMemo(() => ({
    total: filteredStudents.length,
    active: filteredStudents.filter(s => s.status === 'Active').length,
    pendingFees: userRole.toLowerCase() === 'teacher' ? 0 : filteredStudents.filter(s => s.feesStatus !== 'Paid').length,
    lowAttendance: filteredStudents.filter(s => s.attendancePercent < 75).length,
  }), [filteredStudents, userRole]);

  // --- Handlers ---
  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? filteredStudents.map(s => s.id) : []);
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    setSelectedIds(prev => checked ? [...prev, id] : prev.filter(i => i !== id));
  };

  const handleOpenSidePanel = (student: Student) => {
    setActiveStudent(student);
    setIsSidePanelOpen(true);
  };

  const handleOpenModal = (type: 'Add' | 'Edit' | 'Payment' | 'Batch' | 'Delete', student?: Student) => {
    if (userRole.toLowerCase() === 'teacher' && (type === 'Add' || type === 'Edit' || type === 'Delete' || type === 'Payment' || type === 'Batch')) {
      return; // Teachers cannot perform these actions
    }
    setTargetedStudent(student || null);
    setModalType(type);
  };

  const handleBulkAction = (action: string) => {
    if (userRole.toLowerCase() === 'teacher') return;
    console.log(`Bulk action: ${action} on ${selectedIds.length} students`);
    if (action === 'Clear') setSelectedIds([]);
  };

  return (
    <div className="relative h-full flex overflow-hidden">
      {/* Main Content Strip */}
      <div className={`flex-1 overflow-y-auto custom-scrollbar transition-all duration-500 ${isSidePanelOpen ? 'mr-[520px] 2xl:mr-[580px]' : 'mr-0'}`}>
        <div className="p-8 space-y-10">
          {/* Header Area */}
          <div className="flex flex-col xl:flex-row gap-8 justify-between items-start xl:items-center">
            <div>
              <h1 className="text-4xl font-black text-text-slate tracking-tight leading-none mb-3">Students</h1>
              <p className="text-sm font-bold text-gray-400">
                {userRole.toLowerCase() === 'teacher' ? 'Your Student Rosters' : 'Management & Tracking Dashboard'}
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 w-full xl:w-auto">
              <div className="relative flex-1 xl:w-96 shadow-soft rounded-[24px] bg-white group transition-all ring-1 ring-gray-100 hover:ring-brand-blue/30 overflow-hidden">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-blue transition-colors" />
                <Input 
                  placeholder="Search by name, phone, roll..." 
                  className="pl-11 border-none bg-transparent shadow-none h-14 font-medium text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-4">
                {['owner', 'manager', 'reception'].includes(userRole.toLowerCase()) && (
                  <Button 
                    onClick={() => handleOpenModal('Add')}
                    className="h-14 px-8 rounded-2xl bg-brand-blue border-none shadow-xl shadow-brand-blue/30 font-black text-xs uppercase tracking-widest gap-4 group"
                  >
                    <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
                    Add Student
                  </Button>
                )}
              </div>
              <Button variant="outline" className="h-14 px-6 rounded-2xl gap-2 font-black text-sm uppercase tracking-widest border-gray-100 shadow-soft">
                <Download className="w-5 h-5" /> Export
              </Button>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <FilterSelect 
              value={filters.standard} 
              options={['All Standards', 'Std 9', 'Std 10', 'Std 11', 'Std 12']} 
              onChange={(val) => setFilters(f => ({ ...f, standard: val }))}
            />
            <FilterSelect 
              value={filters.batch} 
              options={['All Batches', 'Batch A', 'Batch B', 'Batch C', 'Batch D', 'Batch E']} 
              onChange={(val) => setFilters(f => ({ ...f, batch: val }))}
            />
            <FilterSelect 
              value={filters.status} 
              options={['All', 'Active', 'Inactive', 'On Leave']} 
              onChange={(val) => setFilters(f => ({ ...f, status: val }))}
            />
            {userRole.toLowerCase() !== 'teacher' && (
              <FilterSelect 
                value={filters.fees} 
                options={['All', 'Paid', 'Pending', 'Partial']} 
                onChange={(val) => setFilters(f => ({ ...f, fees: val }))}
              />
            )}
            {(filters.standard !== 'All Standards' || filters.batch !== 'All Batches' || filters.status !== 'All' || filters.fees !== 'All') && (
              <button 
                onClick={() => setFilters({ standard: 'All Standards', batch: 'All Batches', status: 'All', fees: 'All' })}
                className="text-xs font-black text-brand-blue uppercase tracking-widest ml-2 hover:underline"
              >
                Clear Filters
              </button>
            )}
          </div>

          <SummaryStrip {...summaryData} />

          {/* Table Container */}
          <Card className="border-none shadow-soft-lg rounded-[40px] overflow-hidden bg-white/50 backdrop-blur-sm">
              <StudentTable 
              students={filteredStudents}
              selectedIds={selectedIds}
              onSelectAll={handleSelectAll}
              onSelectRow={handleSelectRow}
              onView={handleOpenSidePanel}
              onEdit={userRole.toLowerCase() === 'teacher' ? (_s: Student) => {} : (s) => handleOpenModal('Edit', s)}
              onAction={(s, action) => {
                if (action === 'More') handleOpenSidePanel(s);
              }}
            />
            
            {/* Pagination Placeholder */}
            <div className="p-8 border-t border-gray-50 bg-bg-soft/20 flex items-center justify-between">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Showing 1–{filteredStudents.length} of {filteredStudents.length} Students</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled className="rounded-xl px-6 h-10 border-gray-100 bg-white">Previous</Button>
                <Button variant="outline" size="sm" disabled className="rounded-xl px-6 h-10 border-gray-100 bg-white">Next</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Side Panel Detail View */}
      <StudentSidePanel 
        student={activeStudent} 
        isOpen={isSidePanelOpen} 
        onClose={() => setIsSidePanelOpen(false)}
        onEdit={userRole.toLowerCase() === 'teacher' ? (_s: Student) => {} : (s) => handleOpenModal('Edit', s)}
        userRole={userRole}
        hideFinancials={userRole.toLowerCase() === 'teacher'}
      />


      {/* Floating Bulk Actions */}
      {userRole.toLowerCase() !== 'teacher' && (
        <BulkActionsBar 
          selectedCount={selectedIds.length} 
          onClear={() => setSelectedIds([])}
          onAction={handleBulkAction}
        />
      )}

      {/* Modals Layer */}
      {userRole.toLowerCase() !== 'teacher' && (
        <>
          <AddEditStudentModal 
            isOpen={modalType === 'Add' || modalType === 'Edit'} 
            onClose={() => setModalType(null)}
            title={modalType === 'Add' ? 'Add New Student' : `Edit Student — ${targetedStudent?.name}`}
            student={targetedStudent}
          />
          {targetedStudent && (
            <>
              <RecordPaymentModal 
                isOpen={modalType === 'Payment'} 
                onClose={() => setModalType(null)} 
                student={targetedStudent} 
                title="Record Payment" 
              />
              <ChangeBatchModal 
                isOpen={modalType === 'Batch'} 
                onClose={() => setModalType(null)} 
                student={targetedStudent} 
                title="Change Batch" 
              />
              <DeleteConfirmDialog 
                isOpen={modalType === 'Delete'} 
                onClose={() => setModalType(null)} 
                studentName={targetedStudent.name} 
                title="Delete Student" 
              />
            </>
          )}
        </>
      )}
    </div>
  );
}


// --- Local Components ---

const FilterSelect = ({ value, options, onChange }: { value: string; options: string[]; onChange: (val: string) => void }) => (
  <div className="relative group">
    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-brand-blue transition-colors">
      <Filter className="w-3 h-3" />
    </div>
    <select 
      className="appearance-none h-11 pl-10 pr-10 rounded-2xl border border-gray-50 bg-white shadow-soft text-[11px] font-black uppercase tracking-widest text-text-slate focus:outline-none focus:ring-4 focus:ring-brand-blue/10 focus:border-brand-blue/30 transition-all cursor-pointer"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);
