'use client';
import React, { useState, useMemo } from 'react';
import { Search, Filter, Calendar, Users, Send, AlertCircle, Download, FileText, Paperclip, MoreVertical, Eye, Star, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { studentSubmissions, assignmentsMock } from '@/lib/mockData';

export default function SubmissionsView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedAssignment, setSelectedAssignment] = useState('All');

  const batches = ['All', 'Batch A', 'Batch B', 'Batch C', 'Batch D', 'Batch E'];
  const statuses = ['All', 'Submitted', 'Graded', 'Missing', 'Late'];
  const assignmentOptions = ['All', ...assignmentsMock.map(a => a.title)];

  const filteredSubmissions = useMemo(() => {
    return studentSubmissions.filter(sub => {
      const assignment = assignmentsMock.find(a => a.id === sub.assignmentId);
      const matchSearch = sub.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (assignment?.title.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
      const matchBatch = selectedBatch === 'All' || sub.batchId === (batches.indexOf(selectedBatch) === 0 ? 'All' : `BAT00${batches.indexOf(selectedBatch)}`);
      // Simpler batch match for mock
      const matchBatchActual = selectedBatch === 'All' || assignmentsMock.find(a => a.id === sub.assignmentId)?.batchName === selectedBatch;
      
      const matchStatus = selectedStatus === 'All' || 
                          (selectedStatus === 'Late' ? sub.isLate : sub.status === selectedStatus);
      const matchAssignment = selectedAssignment === 'All' || assignment?.title === selectedAssignment;

      return matchSearch && matchBatchActual && matchStatus && matchAssignment;
    });
  }, [searchTerm, selectedBatch, selectedStatus, selectedAssignment]);

  const stats = useMemo(() => {
    const total = studentSubmissions.length;
    return {
      total,
      onTime: studentSubmissions.filter(s => s.status !== 'Missing' && !s.isLate).length,
      late: studentSubmissions.filter(s => s.isLate).length,
      missing: studentSubmissions.filter(s => s.status === 'Missing').length
    };
  }, []);

  const getStatusBadge = (status: string, isLate: boolean) => {
    if (status === 'Missing') return <Badge variant="destructive" className="text-[10px]">MISSING</Badge>;
    if (status === 'Graded') return <Badge variant="default" className="text-[10px]">GRADED</Badge>;
    if (isLate) return <Badge variant="Pending" className="text-[10px]">LATE</Badge>;
    return <Badge variant="Active" className="text-[10px]">SUBMITTED</Badge>;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Submissions', value: stats.total, icon: <FileText size={20} />, color: 'text-gray-600', bg: 'bg-gray-100' },
          { label: 'On Time', value: stats.onTime, icon: <CheckCircle2 size={20} />, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Late', value: stats.late, icon: <Clock size={20} />, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Missing', value: stats.missing, icon: <XCircle size={20} />, color: 'text-red-600', bg: 'bg-red-50' },
        ].map((stat, i) => (
          <Card key={i} className="p-4 flex items-center gap-4 border-none shadow-sm">
            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">{stat.label}</div>
              <div className="text-2xl font-black text-gray-900">{stat.value}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Search by student or assignment..." 
              className="pl-10 h-11"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select 
            value={selectedAssignment} 
            onChange={(e) => setSelectedAssignment(e.target.value)}
            className="text-sm border-gray-200 rounded-lg h-11 focus:ring-purple-500"
          >
            <option value="All">All Assignments</option>
            {assignmentOptions.filter(a => a !== 'All').map(a => <option key={a} value={a}>{a}</option>)}
          </select>
          <select 
            value={selectedBatch} 
            onChange={(e) => setSelectedBatch(e.target.value)}
            className="text-sm border-gray-200 rounded-lg h-11 focus:ring-purple-500"
          >
            {batches.map(b => <option key={b} value={b}>Batch: {b}</option>)}
          </select>
          <select 
            value={selectedStatus} 
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="text-sm border-gray-200 rounded-lg h-11 focus:ring-purple-500"
          >
            {statuses.map(s => <option key={s} value={s}>Status: {s}</option>)}
          </select>
          <Button variant="outline" className="h-11 font-bold gap-2">
            <Download size={18} />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Missing Submissions Alert */}
      {stats.missing > 0 && selectedStatus === 'All' && (
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 text-red-600 rounded-lg">
              <AlertCircle size={20} />
            </div>
            <div>
              <div className="text-sm font-bold text-red-900">{stats.missing} missing submissions across all assignments</div>
              <div className="text-xs text-red-700 font-medium">Notify parents and students for pending tasks</div>
            </div>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white font-bold flex-1 md:flex-none">Send Bulk Reminder</Button>
            <Button size="sm" variant="outline" className="text-red-600 border-red-200 font-bold flex-1 md:flex-none">Export Missing List</Button>
          </div>
        </div>
      )}

      {/* Table */}
      <Card className="overflow-hidden border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-black text-gray-500 uppercase tracking-widest text-[11px]">Student</th>
                <th className="px-6 py-4 font-black text-gray-500 uppercase tracking-widest text-[11px]">Assignment</th>
                <th className="px-6 py-4 font-black text-gray-500 uppercase tracking-widest text-[11px]">Batch</th>
                <th className="px-6 py-4 font-black text-gray-500 uppercase tracking-widest text-[11px]">Submitted At</th>
                <th className="px-6 py-4 font-black text-gray-500 uppercase tracking-widest text-[11px]">Files</th>
                <th className="px-6 py-4 font-black text-gray-500 uppercase tracking-widest text-[11px]">Status</th>
                <th className="px-6 py-4 font-black text-gray-500 uppercase tracking-widest text-[11px]">Marks</th>
                <th className="px-6 py-4 font-black text-gray-500 uppercase tracking-widest text-[11px] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {filteredSubmissions.map((sub) => {
                const as = assignmentsMock.find(a => a.id === sub.assignmentId);
                return (
                  <tr key={sub.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center font-bold text-purple-700 text-xs">
                          {sub.studentName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 leading-none mb-1">{sub.studentName}</div>
                          <div className="text-[10px] text-gray-400 font-bold uppercase">{sub.rollNumber}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-[180px]">
                        <div className="font-bold text-gray-800 line-clamp-1 leading-none mb-1">{as?.title}</div>
                        <span className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full font-bold uppercase">{as?.subject}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded-lg border border-purple-100">{as?.batchName}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`text-xs ${sub.isLate ? 'text-amber-600 font-bold' : 'text-gray-600'}`}>
                        {sub.submittedAt || '—'}
                        {sub.isLate && <div className="text-[9px] uppercase font-black tracking-tighter mt-0.5">Late Submission</div>}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-blue-600 hover:underline cursor-pointer">
                        <Paperclip size={14} />
                        <span className="text-xs font-bold">{sub.files.length} {sub.files.length === 1 ? 'file' : 'files'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(sub.status, sub.isLate)}
                    </td>
                    <td className="px-6 py-4">
                      {sub.status === 'Graded' ? (
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-black text-gray-900">{sub.marksObtained}</span>
                          <span className="text-xs font-bold text-gray-400">/ {sub.maxMarks}</span>
                          <span className="text-[10px] font-black text-green-600 ml-1">({sub.percentage}%)</span>
                        </div>
                      ) : (
                        <span className="text-gray-300 font-bold">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-purple-600 hover:bg-purple-50">
                          <Eye size={16} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-amber-600 hover:bg-amber-50">
                          <Star size={16} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-blue-600 hover:bg-blue-50">
                          <Send size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filteredSubmissions.length === 0 && (
            <div className="py-20 text-center flex flex-col items-center">
              <Search size={48} className="text-gray-100 mb-4" />
              <h3 className="text-lg font-bold text-gray-900">No submissions found</h3>
              <p className="text-gray-500 text-sm">Try adjusting your filters or search term</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
