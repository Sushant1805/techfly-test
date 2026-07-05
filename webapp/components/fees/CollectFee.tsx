'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Search, X, Check, Wallet, 
  Calendar, CreditCard, Landmark, 
  Banknote, Receipt, ChevronRight,
  Info, AlertCircle, Plus, Users
} from 'lucide-react';
import { FeeRecord, PaymentMode, FeeType } from '@/lib/mockData';
import jsPDF from 'jspdf';

export const CollectFee: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [students, setStudents] = useState<any[]>([]);
  const [feeRecords, setFeeRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) return;
      const user = JSON.parse(userStr);
      const instituteSlug = user.instituteId;
      if (!instituteSlug) return;

      const [studentsRes, feesRes] = await Promise.all([
        fetch(`/api/${instituteSlug}/students`),
        fetch(`/api/${instituteSlug}/fees`)
      ]);

      const studentsData = await studentsRes.json();
      const feesData = await feesRes.json();

      if (studentsData.success) {
        const mappedStudents = studentsData.students.map((s: any) => ({
          id: s._id,
          name: s.name,
          rollNumber: s.rollNumber || 'N/A',
          standard: s.standard || 'N/A',
          batch: s.batchId ? s.batchId.name : 'Unassigned',
          batchId: s.batchId ? s.batchId._id : '',
          phone: s.phone,
          email: s.email || '',
          parentName: s.parentName || 'N/A',
          parentPhone: s.parentPhone || 'N/A',
          address: s.address || 'N/A',
          status: s.status || 'Active', 
          feesStatus: s.feesStatus || 'Pending', 
          attendancePercent: s.attendancePercent !== undefined ? s.attendancePercent : 95,
          totalFeesDue: s.totalFeesDue !== undefined ? s.totalFeesDue : (s.feesStatus === 'Paid' ? 0 : 4500)
        }));
        setStudents(mappedStudents);
      }

      if (feesData.success) {
        const mappedFees = feesData.fees.map((f: any) => ({
          id: f._id,
          studentId: f.studentId?._id || '',
          month: 'April 2026',
          feeType: 'Monthly',
          dueDate: f.dueDate,
          balance: f.amount - (f.amountPaid || 0),
          amount: f.amount,
          amountPaid: f.amountPaid || 0,
          status: f.status
        }));
        setFeeRecords(mappedFees);
      }
    } catch (error) {
      console.error('Error fetching collect fee data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isSuccess]);
  
  const selectedStudent = useMemo(() => students.find(s => s.id === selectedStudentId), [selectedStudentId, students]);
  
  const studentDues = useMemo(() => {
    if (!selectedStudentId) return [];
    return feeRecords.filter(r => r.studentId === selectedStudentId && (r.status === 'Pending' || r.status === 'Overdue' || r.status === 'Partial'));
  }, [selectedStudentId, feeRecords]);

  const searchResults = useMemo(() => {
    if (searchTerm.length < 2) return [];
    return students.filter(s => 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      s.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.phone && s.phone.includes(searchTerm))
    ).slice(0, 5);
  }, [searchTerm, students]);

  const [form, setForm] = useState<{
    feeType: FeeType;
    month: string;
    amountDue: number;
    amountPaying: number;
    date: string;
    mode: PaymentMode;
    txnId: string;
    chequeNo: string;
    chequeDate: string;
    notes: string;
  }>({
    feeType: 'Monthly',
    month: 'April 2026',
    amountDue: 0,
    amountPaying: 0,
    date: new Date().toISOString().split('T')[0],
    mode: 'UPI',
    txnId: '',
    chequeNo: '',
    chequeDate: '',
    notes: ''
  });

  const handleSelectStudent = (id: string) => {
    setSelectedStudentId(id);
    setSearchTerm('');
    setForm(prev => ({ ...prev, amountDue: 0, amountPaying: 0 }));
  };

  const handlePreFill = (due: FeeRecord) => {
    setForm(prev => ({
      ...prev,
      month: due.month,
      amountDue: due.amount || due.balance, // Use the total fee amount as amountDue
      amountPaying: due.balance, // Pay the remaining balance
      feeType: due.feeType
    }));
  };

  const generateInvoicePDF = (fee: any, student: any) => {
    const doc = new jsPDF();
    const receiptNumber = 'REC-' + fee._id.substring(0, 8).toUpperCase();
    
    // Header
    doc.setFontSize(24);
    doc.setTextColor(59, 130, 246);
    doc.text('FEE RECEIPT', 105, 20, { align: 'center' });
    
    // Receipt Number
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`Receipt #${receiptNumber}`, 105, 30, { align: 'center' });
    
    // Date
    doc.setFontSize(10);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 105, 38, { align: 'center' });
    
    // Line separator
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 45, 190, 45);
    
    // Student Details Section
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('Student Details', 20, 55);
    
    doc.setFontSize(11);
    doc.setTextColor(80, 80, 80);
    doc.text(`Name: ${student.name}`, 20, 65);
    doc.text(`Phone: ${student.phone}`, 20, 73);
    doc.text(`Standard: ${student.standard || 'N/A'}`, 20, 81);
    
    // Payment Details Section
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('Payment Details', 110, 55);
    
    doc.setFontSize(11);
    doc.setTextColor(80, 80, 80);
    doc.text(`Amount Paid: ₹${fee.amountPaid?.toLocaleString() || fee.amount?.toLocaleString()}`, 110, 65);
    doc.text(`Payment Mode: ${fee.paymentMode || 'N/A'}`, 110, 73);
    doc.text(`Payment Date: ${fee.paymentDate || fee.dueDate}`, 110, 81);
    
    if (fee.transactionId) {
      doc.text(`Transaction ID: ${fee.transactionId}`, 110, 89);
    }
    
    // Amount Box
    doc.setFillColor(248, 250, 252);
    doc.rect(20, 95, 170, 30, 'F');
    
    doc.setFontSize(16);
    doc.setTextColor(59, 130, 246);
    doc.text(`TOTAL PAID: ₹${fee.amountPaid?.toLocaleString() || fee.amount?.toLocaleString()}`, 105, 115, { align: 'center' });
    
    // Status
    doc.setFontSize(12);
    doc.setTextColor(fee.status === 'Paid' ? 34 : 197, fee.status === 'Paid' ? 197 : 134, fee.status === 'Paid' ? 94 : 60);
    doc.text(`Status: ${fee.status.toUpperCase()}`, 105, 125, { align: 'center' });
    
    // Notes
    if (fee.notes) {
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`Notes: ${fee.notes}`, 20, 140);
    }
    
    // Footer
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.text('This is a computer-generated receipt. No signature required.', 105, 280, { align: 'center' });
    
    // Save PDF
    doc.save(`${receiptNumber}_${student.name.replace(/\s+/g, '_')}.pdf`);
  };

  const handleSave = async () => {
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) return;
      const user = JSON.parse(userStr);
      const instituteSlug = user.instituteId;
      if (!instituteSlug || !selectedStudentId) return;

      // If amountDue is 0, treat amountPaying as the full fee amount
      const totalAmount = form.amountDue && form.amountDue > 0 ? form.amountDue : form.amountPaying;
      
      const payload = {
        studentId: selectedStudentId,
        amount: form.amountPaying,
        totalAmount: totalAmount,
        paymentDate: form.date,
        paymentMode: form.mode,
        transactionId: form.mode === 'UPI' || form.mode === 'Bank Transfer' ? form.txnId : form.mode === 'Cheque' ? form.chequeNo : undefined,
        notes: form.notes
      };
      
      console.log('Sending fee collection payload:', payload);
      console.log('Form state:', form);

      const res = await fetch(`/api/${instituteSlug}/fees`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await res.json();
      console.log('Fee collection response:', result);
      
      if (result.success) {
        setIsSuccess(true);
        
        // Generate and download PDF invoice
        generateInvoicePDF(result.fee, result.student);
        
        // Refresh data to show updated dues
        await fetchData();
        setTimeout(() => setIsSuccess(false), 3000);
      } else {
        alert('Failed to save fee record: ' + result.message);
      }
    } catch (error) {
      console.error('Error saving fee:', error);
      alert('An error occurred while saving fee record.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      {/* 1. Student Search */}
      <div className="relative group">
        <label className="text-[10px] font-black text-brand-blue uppercase tracking-widest ml-4 mb-2 block">Student Selection</label>
        <div className="relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-brand-blue transition-colors" />
          <input 
            placeholder="Search student by name, roll, or phone..."
            className="w-full h-16 pl-16 pr-6 rounded-[28px] bg-white border border-gray-100 shadow-soft text-sm font-bold focus:outline-none focus:ring-4 focus:ring-brand-blue/10 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-text-slate">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {searchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-4 bg-white rounded-[32px] border border-gray-100 shadow-soft-lg overflow-hidden z-20 animate-in fade-in slide-in-from-top-2">
            {searchResults.map(s => (
              <button 
                key={s.id}
                onClick={() => handleSelectStudent(s.id)}
                className="w-full p-6 flex items-center justify-between hover:bg-bg-soft/10 transition-all border-b border-gray-50 last:border-none group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-bg-soft flex items-center justify-center font-black text-brand-blue shadow-inner group-hover:scale-110 transition-transform">
                    {s.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <h5 className="font-black text-text-slate tracking-tight">{s.name}</h5>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{s.batch} • {s.rollNumber}</p>
                  </div>
                </div>
                {(s.totalFeesDue ?? 0) > 0 && <Badge variant="Inactive" className="px-3">₹{(s.totalFeesDue ?? 0).toLocaleString()} Due</Badge>}
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedStudent && (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-500">
          {/* 2. Selected Student Card */}
          <Card className="p-8 border-none shadow-soft rounded-[40px] bg-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-brand-blue" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-[32px] bg-brand-blue/5 flex items-center justify-center font-black text-brand-blue text-3xl shadow-inner border border-brand-blue/10">
                  {selectedStudent.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-text-slate tracking-tight leading-none mb-2">{selectedStudent.name}</h3>
                  <div className="flex items-center gap-4 divide-x divide-gray-100">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none">{selectedStudent.batch} • Std 10</p>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none pl-4">Roll: {selectedStudent.rollNumber}</p>
                  </div>
                </div>
              </div>
              <button onClick={() => setSelectedStudentId(null)} className="h-10 w-10 rounded-xl bg-gray-50 text-gray-400 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-10 pt-8 border-t border-gray-50 grid grid-cols-3 gap-8">
              <div>
                <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1.5">Outstanding Balance</p>
                <p className={`text-2xl font-black ${(selectedStudent.totalFeesDue ?? 0) > 0 ? 'text-red-500' : 'text-green-500'}`}>₹{(selectedStudent.totalFeesDue ?? 0).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1.5">Last Payment</p>
                <p className="text-sm font-black text-text-slate">05 Apr 2026</p>
                <p className="text-[9px] font-black text-brand-blue uppercase">Receipt #RCP-042</p>
              </div>
              <div className="flex flex-col items-end justify-center">
                {(selectedStudent.totalFeesDue ?? 0) === 0 ? (
                  <Badge variant="Active" className="px-6 py-2 rounded-xl text-[10px] uppercase font-black bg-green-500 text-white shadow-lg shadow-green-100 border-none">All Clear ✓</Badge>
                ) : (
                  <Badge variant="Inactive" className="px-6 py-2 rounded-xl text-[10px] uppercase font-black bg-red-500 text-white shadow-lg shadow-red-100 border-none">Dues Pending</Badge>
                )}
              </div>
            </div>
          </Card>

          {/* 3. Outstanding Table */}
          {studentDues.length > 0 && (
            <section className="space-y-4">
              <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Recent Pending Records</h4>
              <Card className="border-none shadow-soft rounded-[32px] overflow-hidden bg-white">
                <table className="w-full text-left">
                  <thead className="bg-bg-soft/20 h-14 border-b border-gray-50">
                    <tr>
                      <th className="pl-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">Month</th>
                      <th className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Type</th>
                      <th className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Due Date</th>
                      <th className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Amount</th>
                      <th className="pr-8 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {studentDues.map(due => (
                      <tr key={due.id} className="h-16 group hover:bg-bg-soft/5 transition-colors">
                        <td className="pl-8 font-black text-sm text-text-slate">{due.month}</td>
                        <td><Badge variant="default" className={due.feeType === 'Monthly' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'}>{due.feeType}</Badge></td>
                        <td className="text-xs font-bold text-red-400">{due.dueDate}</td>
                        <td className="font-black text-text-slate">₹{due.balance.toLocaleString()}</td>
                        <td className="pr-8 text-right">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handlePreFill(due)}
                            className="h-9 px-4 rounded-xl text-[10px] font-black uppercase text-brand-blue bg-brand-blue/5 hover:bg-brand-blue hover:text-white border-none shadow-none"
                          >
                            Collect <ChevronRight className="w-3.5 h-3.5 ml-1" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </section>
          )}

          {/* 4. Payment Form */}
          <section className="space-y-4">
            <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Collection Form</h4>
            <Card className="p-10 border-none shadow-soft rounded-[40px] bg-white">
              <div className="grid grid-cols-2 gap-10">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Fee Type</label>
                    <select 
                      className="w-full h-14 rounded-2xl border border-gray-100 bg-bg-soft/20 px-6 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-brand-blue/10 transition-all"
                      value={form.feeType}
                      onChange={(e) => setForm(prev => ({ ...prev, feeType: e.target.value as any }))}
                    >
                      <option>Monthly</option>
                      <option>Admission</option>
                      <option>Exam</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Payment Month</label>
                    <select 
                      className="w-full h-14 rounded-2xl border border-gray-100 bg-bg-soft/20 px-6 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-brand-blue/10 transition-all"
                      value={form.month}
                      onChange={(e) => setForm(prev => ({ ...prev, month: e.target.value }))}
                    >
                      <option>January 2026</option>
                      <option>February 2026</option>
                      <option>March 2026</option>
                      <option>April 2026</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Amount Paying</label>
                    <div className="relative">
                      <input 
                        type="number" 
                        className="w-full h-14 rounded-2xl border border-gray-100 bg-bg-soft/20 pl-10 pr-6 text-lg font-black focus:outline-none focus:ring-4 focus:ring-brand-blue/10 transition-all"
                        value={form.amountPaying}
                        onChange={(e) => setForm(prev => ({ 
                          ...prev, 
                          amountPaying: Number(e.target.value)
                        }))}
                        onBlur={(e) => {
                          // Only set amountDue when user leaves the field if it's still 0
                          if (form.amountDue === 0) {
                            setForm(prev => ({ ...prev, amountDue: Number(e.target.value) }));
                          }
                        }}
                      />
                      <span className="absolute left-6 top-1/2 -translate-y-1/2 text-lg font-black text-gray-300">₹</span>
                      {form.amountDue > 0 && form.amountPaying < form.amountDue && (
                        <div className="absolute top-full left-0 mt-2 flex items-center gap-2 text-amber-500 text-[10px] font-black uppercase tracking-widest animate-in slide-in-from-top-1">
                          <Info className="w-3 h-3" /> Partial Payment (Balance: ₹{(form.amountDue - form.amountPaying).toLocaleString()})
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Payment Mode</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'Cash', icon: Banknote },
                        { id: 'UPI', icon: CreditCard },
                        { id: 'Bank Transfer', icon: Landmark },
                        { id: 'Cheque', icon: Receipt }
                      ].map(mode => (
                        <button
                          key={mode.id}
                          onClick={() => setForm(prev => ({ ...prev, mode: mode.id as any }))}
                          className={`h-14 rounded-2xl border-2 flex items-center justify-center gap-2 transition-all ${
                            form.mode === mode.id 
                              ? 'bg-brand-blue border-brand-blue text-white shadow-lg shadow-brand-blue/20 scale-[1.02] z-10' 
                              : 'bg-white border-gray-50 text-gray-400 hover:border-brand-blue/10'
                          }`}
                        >
                          <mode.icon className="w-4 h-4" />
                          <span className="text-[9px] font-black uppercase tracking-widest">{mode.id}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {(form.mode === 'UPI' || form.mode === 'Bank Transfer' || form.mode === 'Cheque') && (
                    <div className="space-y-2 animate-in zoom-in-95 duration-200">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                        {form.mode === 'Cheque' ? 'Cheque Number' : 'Transaction / Reference ID'}
                      </label>
                      <input 
                        className="w-full h-14 rounded-2xl border border-gray-100 bg-bg-soft/20 px-6 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-brand-blue/10 transition-all"
                        placeholder={form.mode === 'Cheque' ? "e.g. 123456" : "e.g. TXN987654"}
                        value={form.mode === 'Cheque' ? form.chequeNo : form.txnId}
                        onChange={(e) => setForm(prev => ({ ...prev, [form.mode === 'Cheque' ? 'chequeNo' : 'txnId']: e.target.value }))}
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Payment Date</label>
                    <input 
                      type="date"
                      className="w-full h-14 rounded-2xl border border-gray-100 bg-bg-soft/20 px-6 text-sm font-bold animate-in"
                      value={form.date}
                      onChange={(e) => setForm(prev => ({ ...prev, date: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-10 border-t border-gray-50 space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Internal Notes</label>
                <textarea 
                  placeholder="Optional notes about this payment..."
                  className="w-full h-24 rounded-2xl border border-gray-100 bg-bg-soft/20 p-6 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-brand-blue/10 transition-all resize-none"
                  value={form.notes}
                  onChange={(e) => setForm(prev => ({ ...prev, notes: e.target.value }))}
                />
              </div>

              <div className="mt-10 flex items-center justify-between gap-6">
                <Button variant="ghost" className="h-16 px-10 rounded-2xl font-black text-gray-400 uppercase tracking-widest text-xs">Reset Form</Button>
                <Button 
                  disabled={form.amountPaying <= 0}
                  onClick={handleSave}
                  className="flex-1 h-16 rounded-2xl bg-brand-blue shadow-lg shadow-brand-blue/20 font-black text-sm uppercase tracking-[0.2em] gap-4 group"
                >
                  {isSuccess ? <Check className="w-6 h-6 animate-in zoom-in" /> : <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />}
                  {isSuccess ? 'Payment Recorded!' : 'Generate Receipt & Save'}
                </Button>
              </div>
            </Card>
          </section>
        </div>
      )}

      {/* Placeholder for no selection */}
      {!selectedStudent && (
        <div className="h-[400px] flex flex-col items-center justify-center opacity-30 select-none">
          <div className="w-24 h-24 rounded-[40px] border-4 border-dashed border-gray-200 mb-6 flex items-center justify-center">
            <Users className="w-10 h-10 text-gray-200" />
          </div>
          <p className="text-sm font-black text-gray-400 uppercase tracking-widest">Search and select a student to collect fee</p>
        </div>
      )}
    </div>
  );
};
