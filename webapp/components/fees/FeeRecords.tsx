'use client';
import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Search, Filter, Download, Bell,
  Trash2, MoreVertical, Eye, Plus,
  FileDown, CheckSquare, X, Mail,
  Calendar, CreditCard, Banknote, Landmark,
  ChevronLeft, ChevronRight, Receipt
} from 'lucide-react';
import { feeRecords, FeeStatus, PaymentMode, FeeType } from '@/lib/mockData';

export const FeeRecords: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBatch, setFilterBatch] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedRecords, setSelectedRecords] = useState<string[]>([]);

  const filteredRecords = useMemo(() => {
    return feeRecords.filter(r => {
      const matchesSearch = r.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           r.receiptNumber?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBatch = filterBatch === 'All' || r.batchName === filterBatch;
      const matchesStatus = filterStatus === 'All' || r.status === filterStatus;
      return matchesSearch && matchesBatch && matchesStatus;
    });
  }, [searchTerm, filterBatch, filterStatus]);

  const summary = useMemo(() => {
    const collected = filteredRecords.reduce((acc, r) => acc + r.amountPaid, 0);
    const pending = filteredRecords.filter(r => r.status === 'Pending' || r.status === 'Partial').reduce((acc, r) => acc + r.balance, 0);
    const overdue = filteredRecords.filter(r => r.status === 'Overdue').reduce((acc, r) => acc + r.balance, 0);
    return { count: filteredRecords.length, collected, pending, overdue };
  }, [filteredRecords]);

  const toggleSelectAll = () => {
    if (selectedRecords.length === filteredRecords.length) setSelectedRecords([]);
    else setSelectedRecords(filteredRecords.map(r => r.id));
  };

  const toggleSelect = (id: string) => {
    setSelectedRecords(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className="space-y-6">
      {/* 1. Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-6 p-6 rounded-[28px] bg-white shadow-soft">
        <div className="flex flex-wrap items-center gap-4 flex-1">
          <div className="relative min-w-[300px] flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              placeholder="Search by student, receipt #..."
              className="w-full h-11 pl-11 pr-4 rounded-xl border border-gray-100 bg-bg-soft/10 text-xs font-bold focus:outline-none focus:ring-4 focus:ring-brand-blue/10 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="h-11 px-4 rounded-xl border border-gray-100 bg-bg-soft/10 text-[10px] font-black uppercase tracking-widest focus:outline-none"
            value={filterBatch}
            onChange={(e) => setFilterBatch(e.target.value)}
          >
            <option>All Batches</option>
            <option>Batch A</option>
            <option>Batch B</option>
            <option>Batch C</option>
          </select>
          <select 
            className="h-11 px-4 rounded-xl border border-gray-100 bg-bg-soft/10 text-[10px] font-black uppercase tracking-widest focus:outline-none"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option>All Status</option>
            <option>Paid</option>
            <option>Pending</option>
            <option>Partial</option>
            <option>Overdue</option>
            <option>Waived</option>
          </select>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-11 px-6 rounded-xl border-gray-100 font-black text-[10px] uppercase tracking-widest gap-2">
            <Download className="w-3.5 h-3.5" /> Export CSV
          </Button>
          {filterStatus !== 'Paid' && filterStatus !== 'All' && (
            <Button className="h-11 px-6 rounded-xl bg-brand-blue/10 text-brand-blue hover:bg-brand-blue hover:text-white border-none font-black text-[10px] uppercase tracking-widest gap-2 shadow-none">
              <Bell className="w-3.5 h-3.5" /> Send Bulk Reminders
            </Button>
          )}
        </div>
      </div>

      {/* 2. Summary Strip */}
      <div className="flex items-center gap-8 px-8 py-4 rounded-2xl bg-bg-soft/30 border border-gray-100/50">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Showing: <span className="text-text-slate font-black">{summary.count} Records</span></p>
        <div className="w-px h-4 bg-gray-200" />
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Collected: <span className="text-green-500 font-black">₹{summary.collected.toLocaleString()}</span></p>
        <div className="w-px h-4 bg-gray-200" />
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Pending: <span className="text-amber-500 font-black">₹{summary.pending.toLocaleString()}</span></p>
        <div className="w-px h-4 bg-gray-200" />
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Overdue: <span className="text-red-500 font-black">₹{summary.overdue.toLocaleString()}</span></p>
      </div>

      {/* 3. Table */}
      <Card className="border-none shadow-soft rounded-[40px] overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-bg-soft/30 h-16 border-b border-gray-50">
                <th className="pl-10 text-left w-10">
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 rounded-md border-gray-200 text-brand-blue focus:ring-brand-blue" 
                    checked={selectedRecords.length === filteredRecords.length && filteredRecords.length > 0}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="text-left font-black text-[10px] text-gray-400 uppercase tracking-widest">Receipt #</th>
                <th className="text-left font-black text-[10px] text-gray-400 uppercase tracking-widest">Student</th>
                <th className="text-left font-black text-[10px] text-gray-400 uppercase tracking-widest">Batch</th>
                <th className="text-left font-black text-[10px] text-gray-400 uppercase tracking-widest">Month</th>
                <th className="text-left font-black text-[10px] text-gray-400 uppercase tracking-widest">Amount</th>
                <th className="text-left font-black text-[10px] text-gray-400 uppercase tracking-widest">Paid</th>
                <th className="text-left font-black text-[10px] text-gray-400 uppercase tracking-widest">Mode</th>
                <th className="text-left font-black text-[10px] text-gray-400 uppercase tracking-widest">Status</th>
                <th className="pr-10 text-right font-black text-[10px] text-gray-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredRecords.map(record => (
                <tr key={record.id} className="h-20 hover:bg-bg-soft/5 transition-colors group">
                  <td className="pl-10">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 rounded-md border-gray-200 text-brand-blue focus:ring-brand-blue" 
                      checked={selectedRecords.includes(record.id)}
                      onChange={() => toggleSelect(record.id)}
                    />
                  </td>
                  <td className="font-bold text-xs text-gray-400">{record.receiptNumber || '—'}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-bg-soft flex items-center justify-center font-black text-brand-blue text-[10px]">
                        {record.studentName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-text-slate leading-none mb-1">{record.studentName}</p>
                        <p className="text-[9px] font-bold text-gray-300 uppercase tracking-tight">{record.rollNumber}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="font-bold text-text-slate leading-none mb-1">{record.batchName}</p>
                    <p className="text-[9px] font-bold text-gray-300 uppercase tracking-tight">{record.standard}</p>
                  </td>
                  <td className="font-bold text-gray-500 text-xs">{record.month}</td>
                  <td className="font-black text-text-slate">₹{record.amount.toLocaleString()}</td>
                  <td className={`font-black ${record.amountPaid > 0 ? 'text-green-500' : 'text-gray-300'}`}>₹{record.amountPaid.toLocaleString()}</td>
                  <td>
                    {record.paymentMode === 'Cash' && <Badge className="bg-purple-50 text-purple-600 border-none gap-1.5"><Banknote className="w-3 h-3" /> Cash</Badge>}
                    {record.paymentMode === 'UPI' && <Badge className="bg-blue-50 text-blue-600 border-none gap-1.5"><CreditCard className="w-3 h-3" /> UPI</Badge>}
                    {record.paymentMode === 'Bank Transfer' && <Badge className="bg-emerald-50 text-emerald-600 border-none gap-1.5"><Landmark className="w-3 h-3" /> Bank</Badge>}
                    {record.paymentMode === 'Cheque' && <Badge className="bg-amber-50 text-amber-600 border-none gap-1.5"><Receipt className="w-3 h-3" /> Cheque</Badge>}
                    {!record.paymentMode && <span className="text-gray-200">—</span>}
                  </td>
                  <td>
                    <Badge variant={record.status as any} className="font-black text-[9px] uppercase tracking-widest px-3 py-1">
                      {record.status}
                    </Badge>
                  </td>
                  <td className="pr-10 text-right">
                    <div className="flex items-center justify-end gap-1 group-hover:opacity-100 transition-opacity">
                      {record.status === 'Paid' ? (
                        <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-gray-300 hover:text-brand-blue"><Eye className="w-4 h-4" /></Button>
                      ) : (
                        <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-brand-blue hover:bg-brand-blue/5"><Plus className="w-4 h-4" /></Button>
                      )}
                      <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-gray-300 hover:text-text-slate"><MoreVertical className="w-4 h-4" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Placeholder */}
        <div className="p-8 border-t border-gray-50 flex items-center justify-between bg-bg-soft/5">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Showing 1 to 15 of {filteredRecords.length} records</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-9 w-9 p-0 rounded-lg border-gray-100"><ChevronLeft className="w-4 h-4" /></Button>
            <div className="flex items-center gap-1">
              {[1, 2, 3].map(p => (
                <Button key={p} variant={p === 1 ? 'default' : 'ghost'} className={`h-9 w-9 p-0 rounded-lg text-xs font-black ${p === 1 ? 'bg-brand-blue text-white shadow-brand-blue/20' : 'text-gray-400'}`}>{p}</Button>
              ))}
            </div>
            <Button variant="outline" size="sm" className="h-9 w-9 p-0 rounded-lg border-gray-100"><ChevronRight className="w-4 h-4" /></Button>
          </div>
        </div>
      </Card>

      {/* Bulk Actions Floating Bar */}
      {selectedRecords.length > 0 && (
        <div className="fixed bottom-10 left-[280px] right-10 z-[100] animate-in slide-in-from-bottom-full duration-500">
          <div className="p-4 rounded-[28px] bg-text-slate/90 backdrop-blur-xl border border-white/10 shadow-2xl flex items-center justify-between gap-10 px-10">
            <div className="flex items-center gap-6">
              <div className="w-10 h-10 rounded-xl bg-brand-blue flex items-center justify-center text-white shadow-lg">
                <CheckSquare className="w-5 h-5" />
              </div>
              <div>
                <p className="text-white font-black text-sm">{selectedRecords.length} records selected</p>
                <p className="text-white/40 text-[9px] font-bold uppercase tracking-widest">Apply bulk actions to selected fees</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" className="h-12 px-6 rounded-xl text-white hover:bg-white/10 font-black uppercase text-[10px] tracking-widest gap-2">
                <Mail className="w-4 h-4" /> Send Reminders
              </Button>
              <Button variant="ghost" className="h-12 px-6 rounded-xl text-white hover:bg-white/10 font-black uppercase text-[10px] tracking-widest gap-2">
                <X className="w-4 h-4" /> Mark as Waived
              </Button>
              <Button variant="ghost" className="h-12 px-6 rounded-xl text-red-400 hover:bg-red-500/10 font-black uppercase text-[10px] tracking-widest gap-2">
                <Trash2 className="w-4 h-4" /> Delete
              </Button>
              <div className="w-px h-8 bg-white/10 mx-2" />
              <button 
                onClick={() => setSelectedRecords([])}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
