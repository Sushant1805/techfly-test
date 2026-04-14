'use client';
import React, { useState, useMemo } from 'react';
import { Search, Filter, LayoutGrid, List, ChevronDown, Clock, Calendar, MoreVertical, Eye, Edit, Trash2, Send, Copy, XCircle, Star, FileText, Plus } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { assignmentsMock } from '@/lib/mockData';
import { Assignment } from '@/lib/mockData';
import AssignmentDetailPanel from './AssignmentDetailPanel';

export default function AllAssignmentsView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [selectedBatch, setSelectedBatch] = useState('All');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedDue, setSelectedDue] = useState('All');
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);

  const batches = ['All', 'Batch A', 'Batch B', 'Batch C', 'Batch D', 'Batch E'];
  const subjects = ['All', 'Maths', 'Physics', 'Chemistry', 'Biology', 'English', 'Hindi'];
  const types = ['All', 'Homework', 'Project', 'Practice', 'Research', 'Reading', 'Lab Work'];
  const statuses = ['All', 'Draft', 'Active', 'Closed', 'Graded'];
  const dueFilters = ['All', 'Due Today', 'Due This Week', 'Overdue', 'Upcoming'];

  const filteredAssignments = useMemo(() => {
    return assignmentsMock.filter(as => {
      const matchSearch = as.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          as.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          as.batchName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchBatch = selectedBatch === 'All' || as.batchName === selectedBatch;
      const matchSubject = selectedSubject === 'All' || as.subject === selectedSubject;
      const matchType = selectedType === 'All' || as.type === selectedType;
      const matchStatus = selectedStatus === 'All' || as.status === selectedStatus;
      
      // Due filter simplified for mock
      let matchDue = true;
      if (selectedDue === 'Overdue') matchDue = as.status === 'Active' && new Date(as.dueDate) < new Date();
      else if (selectedDue === 'Due Today') matchDue = as.dueDate === new Date().toISOString().split('T')[0];

      return matchSearch && matchBatch && matchSubject && matchType && matchStatus && matchDue;
    });
  }, [searchTerm, selectedBatch, selectedSubject, selectedType, selectedStatus, selectedDue]);

  const summary = useMemo(() => {
    return {
      total: filteredAssignments.length,
      active: filteredAssignments.filter(a => a.status === 'Active').length,
      graded: filteredAssignments.filter(a => a.status === 'Graded').length,
      overdue: filteredAssignments.filter(a => a.status === 'Active' && new Date(a.dueDate) < new Date()).length
    };
  }, [filteredAssignments]);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Active': return 'Active';
      case 'Graded': return 'default'; // Success variant usually
      case 'Closed': return 'Pending'; // Warning color
      case 'Draft': return 'secondary';
      default: return 'secondary';
    }
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy': return 'text-green-600 bg-green-50 border-green-100';
      case 'Medium': return 'text-amber-600 bg-amber-50 border-amber-100';
      case 'Hard': return 'text-red-600 bg-red-50 border-red-100';
      default: return 'text-gray-600 bg-gray-50 border-gray-100';
    }
  }

  return (
    <div className="space-y-6">
      {/* Summary Strip */}
      <div className="flex flex-wrap items-center gap-6 px-4 py-2 bg-white rounded-lg border border-gray-200 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-gray-500">Total:</span>
          <span className="font-bold text-gray-900">{summary.total}</span>
        </div>
        <div className="h-4 w-px bg-gray-200" />
        <div className="flex items-center gap-2">
          <span className="text-gray-500">Active:</span>
          <span className="font-bold text-blue-600">{summary.active}</span>
        </div>
        <div className="h-4 w-px bg-gray-200" />
        <div className="flex items-center gap-2">
          <span className="text-gray-500">Graded:</span>
          <span className="font-bold text-green-600">{summary.graded}</span>
        </div>
        <div className="h-4 w-px bg-gray-200" />
        <button 
          onClick={() => setSelectedDue('Overdue')}
          className="flex items-center gap-2 hover:bg-red-50 px-2 py-0.5 rounded transition-colors"
        >
          <span className="text-gray-500">Overdue:</span>
          <span className="font-bold text-red-600">{summary.overdue}</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Search by title, subject, batch..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
            <button 
              onClick={() => setViewType('grid')}
              className={`p-1.5 rounded-md transition-all ${viewType === 'grid' ? 'bg-white shadow-sm text-purple-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              onClick={() => setViewType('list')}
              className={`p-1.5 rounded-md transition-all ${viewType === 'list' ? 'bg-white shadow-sm text-purple-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <List size={18} />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select 
            value={selectedBatch} 
            onChange={(e) => setSelectedBatch(e.target.value)}
            className="text-sm border-gray-200 rounded-lg focus:ring-purple-500 focus:border-purple-500"
          >
            {batches.map(b => <option key={b} value={b}>Batch: {b}</option>)}
          </select>
          <select 
            value={selectedSubject} 
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="text-sm border-gray-200 rounded-lg focus:ring-purple-500 focus:border-purple-500"
          >
            {subjects.map(s => <option key={s} value={s}>Subject: {s}</option>)}
          </select>
          <select 
            value={selectedType} 
            onChange={(e) => setSelectedType(e.target.value)}
            className="text-sm border-gray-200 rounded-lg focus:ring-purple-500 focus:border-purple-500"
          >
            {types.map(t => <option key={t} value={t}>Type: {t}</option>)}
          </select>
          <select 
            value={selectedStatus} 
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="text-sm border-gray-200 rounded-lg focus:ring-purple-500 focus:border-purple-500"
          >
            {statuses.map(s => <option key={s} value={s}>Status: {s}</option>)}
          </select>
          <select 
            value={selectedDue} 
            onChange={(e) => setSelectedDue(e.target.value)}
            className="text-sm border-gray-200 rounded-lg focus:ring-purple-500 focus:border-purple-500"
          >
            {dueFilters.map(d => <option key={d} value={d}>Due: {d}</option>)}
          </select>
        </div>
      </div>

      {/* Grid View */}
      {viewType === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAssignments.map((assignment) => (
            <Card key={assignment.id} className="group hover:shadow-lg transition-all duration-300 border-t-4 overflow-hidden relative" style={{ borderTopColor: assignment.subjectColor }}>
              <div className="p-5 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-[10px] font-bold uppercase tracking-wider">{assignment.type}</Badge>
                    <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${getDifficultyColor(assignment.difficulty)}`}>
                      {assignment.difficulty}
                    </div>
                  </div>
                  <Badge variant={getStatusVariant(assignment.status)} className="text-[10px] uppercase font-bold tracking-wider">
                    {assignment.status}
                  </Badge>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-bold text-gray-900 leading-tight line-clamp-2 min-h-[2.5rem] group-hover:text-purple-600 transition-colors">
                    {assignment.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full">{assignment.subject}</span>
                    <span className="text-xs font-medium text-gray-500">•</span>
                    <span className="text-xs font-semibold px-2 py-0.5 bg-purple-50 text-purple-700 rounded-full">{assignment.batchName}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-gray-500">
                  <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-[10px] font-bold text-purple-700">
                    {assignment.teacherName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className="text-xs">{assignment.teacherName}</span>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-700">
                    <Calendar size={14} className="text-gray-400" />
                    <span>Due: {assignment.dueDate}, {assignment.dueTime}</span>
                    {assignment.status === 'Active' && new Date(assignment.dueDate) < new Date() && (
                      <span className="text-red-500 bg-red-50 px-1.5 py-0.5 rounded font-bold animate-pulse">Overdue</span>
                    )}
                  </div>

                  <ProgressBar 
                    current={assignment.submittedCount} 
                    total={assignment.totalStudents} 
                    className="mt-1"
                  />
                  
                  <div className="flex justify-between text-[11px] text-gray-500 font-medium">
                    <span>{assignment.lateSubmissions} late • {assignment.totalStudents - assignment.submittedCount} missing</span>
                    <div className="flex gap-3">
                      <span>Viewed: {assignment.viewedCount}</span>
                      <span>Avg: {assignment.averageScore || '—'}</span>
                    </div>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full mt-2 group-hover:bg-purple-50 group-hover:border-purple-200 group-hover:text-purple-700 transition-all font-semibold"
                  onClick={() => setSelectedAssignment(assignment)}
                >
                  View Details
                </Button>
              </div>

              {/* Action Menu (Simplified for mock) */}
              <button className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical size={16} />
              </button>
            </Card>
          ))}
        </div>
      ) : (
        /* List View (Simplified) */
        <Card className="overflow-hidden border-gray-200">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-700">Title</th>
                <th className="px-6 py-4 font-semibold text-gray-700">Subject</th>
                <th className="px-6 py-4 font-semibold text-gray-700">Batch</th>
                <th className="px-6 py-4 font-semibold text-gray-700">Type</th>
                <th className="px-6 py-4 font-semibold text-gray-700">Due Date</th>
                <th className="px-6 py-4 font-semibold text-gray-700">Submitted</th>
                <th className="px-6 py-4 font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 font-semibold text-gray-700 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredAssignments.map((assignment) => (
                <tr key={assignment.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4 font-bold text-gray-900">{assignment.title}</td>
                  <td className="px-6 py-4 text-gray-600">{assignment.subject}</td>
                  <td className="px-6 py-4 text-gray-600">{assignment.batchName}</td>
                  <td className="px-6 py-4">
                    <Badge variant="secondary" className="text-[10px]">{assignment.type}</Badge>
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-[13px]">{assignment.dueDate}</td>
                  <td className="px-6 py-4">
                    <div className="w-24">
                      <ProgressBar current={assignment.submittedCount} total={assignment.totalStudents} showLabel={false} />
                      <span className="text-[10px] font-bold text-gray-400 mt-1 block">{assignment.submittedCount}/{assignment.totalStudents}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={getStatusVariant(assignment.status)} className="text-[10px]">{assignment.status}</Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-purple-600 hover:bg-purple-50" onClick={() => setSelectedAssignment(assignment)}>
                        <Eye size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-blue-600 hover:bg-blue-50">
                        <Edit size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-amber-600 hover:bg-amber-50">
                        <Star size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {/* Empty State */}
      {filteredAssignments.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
          <FileText size={64} className="text-gray-200 mb-4" />
          <h3 className="text-xl font-bold text-gray-900">No assignments found</h3>
          <p className="text-gray-500 mt-1 mb-6">Create your first assignment for this batch</p>
          <Button className="gap-2 bg-purple-600 hover:bg-purple-700">
            <Plus size={18} />
            Create Assignment
          </Button>
        </div>
      )}

      {/* Detail Side Panel */}
      {selectedAssignment && (
        <AssignmentDetailPanel 
          assignment={selectedAssignment} 
          onClose={() => setSelectedAssignment(null)} 
        />
      )}
    </div>
  );
}
