'use client';
import React, { useState } from 'react';
import { 
  FileText, Download, Calendar, Settings, Clock, 
  ChevronRight, Eye, Trash2, Printer, X, Check,
  User, BarChart, ShieldCheck, PieChart, FileStack, Layers
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { GlobalFilter } from '@/lib/analyticsData';

interface ReportType {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  format: 'PDF' | 'Excel';
  pages: number;
}

export default function ReportsTab({ filters }: { filters: GlobalFilter }) {
  const [configOpen, setConfigOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<ReportType | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const reportTypes: ReportType[] = [
    { id: 'progress', title: 'Student Progress Report', description: 'Per-student breakdown of attendance, fees, and test scores for the selected period.', icon: User, color: 'bg-purple-100 text-purple-600', format: 'PDF', pages: 20 },
    { id: 'attendance', title: 'Attendance Report', description: 'Full monthly attendance log for all batches with percentage breakdown and analysis.', icon: Calendar, color: 'bg-green-100 text-green-600', format: 'PDF', pages: 12 },
    { id: 'fees', title: 'Fee Collection Report', description: 'Complete fee status, payment history, outstanding dues, and revenue projections.', icon: PieChart, color: 'bg-amber-100 text-amber-600', format: 'PDF', pages: 8 },
    { id: 'academic', title: 'Academic Performance', description: 'Test results, subject averages, top/bottom students, and class-wide performance.', icon: BarChart, color: 'bg-indigo-100 text-indigo-600', format: 'PDF', pages: 15 },
    { id: 'batch', title: 'Batch Summary Report', description: 'One page per batch: student list, attendance trends, fee status, and exam results.', icon: FileStack, color: 'bg-blue-100 text-blue-600', format: 'PDF', pages: 5 },
    { id: 'institute', title: 'Institute Summary', description: 'Executive one-pager: all KPIs, financial health, and overall performance overview.', icon: ShieldCheck, color: 'bg-pink-100 text-pink-600', format: 'PDF', pages: 1 },
  ];

  const recentReports = [
    { name: 'Student Progress Report Apr 2026', date: '11 Apr 2026', batches: 'All (5)', format: 'PDF' },
    { name: 'Attendance Report Mar 2026', date: '1 Apr 2026', batches: 'All (5)', format: 'PDF' },
    { name: 'Fee Collection Report Q1 2026', date: '31 Mar 2026', batches: 'All (5)', format: 'PDF' },
  ];

  const handleConfigure = (report: ReportType) => {
    setSelectedReport(report);
    setConfigOpen(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-700">
      {/* Report Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportTypes.map((report) => (
          <Card key={report.id} className="p-6 border-none shadow-sm hover:shadow-md transition-all group flex flex-col items-start gap-4">
            <div className={`p-4 rounded-2xl ${report.color} group-hover:scale-110 transition-transform`}>
              <report.icon size={24} />
            </div>
            <div className="flex-1">
               <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-2">{report.title}</h3>
               <p className="text-xs font-bold text-gray-400 leading-relaxed uppercase tracking-tighter italic">
                 {report.description}
               </p>
            </div>
            <div className="w-full pt-4 border-t border-gray-50 flex items-center justify-between">
               <div className="flex gap-4">
                  <div className="flex flex-col">
                     <span className="text-[9px] font-black text-gray-300 uppercase">Format</span>
                     <span className="text-[10px] font-black text-gray-700">{report.format}</span>
                  </div>
                  <div className="flex flex-col">
                     <span className="text-[9px] font-black text-gray-300 uppercase">Pages</span>
                     <span className="text-[10px] font-black text-gray-700">Est. {report.pages}</span>
                  </div>
               </div>
               <Button 
                onClick={() => handleConfigure(report)}
                className="bg-purple-600 hover:bg-purple-700 h-9 font-black uppercase text-[10px] tracking-widest gap-2 shadow-sm"
               >
                 <Settings size={14} /> Configure
               </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* History Table */}
      <Card className="border-none shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 bg-gray-50/30 flex justify-between items-center">
           <h3 className="font-black text-gray-900 uppercase tracking-widest text-sm flex items-center gap-2">
              <Clock size={18} className="text-purple-600" /> Recent Reports
           </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                <th className="px-6 py-4">Report Name</th>
                <th className="px-6 py-4">Generated On</th>
                <th className="px-6 py-4">Batches</th>
                <th className="px-6 py-4">Format</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentReports.map((report, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                     <span className="text-xs font-black text-gray-900 uppercase tracking-tighter">{report.name}</span>
                  </td>
                  <td className="px-6 py-4 text-xs font-bold text-gray-500 italic">{report.date}</td>
                  <td className="px-6 py-4 font-black">
                     <Badge className="bg-purple-50 text-purple-600 border-none text-[9px] px-2">{report.batches}</Badge>
                  </td>
                  <td className="px-6 py-4 font-black text-xs text-gray-900">{report.format}</td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                     <Button variant="ghost" className="h-8 w-8 p-0 flex items-center justify-center rounded-lg hover:bg-purple-100 text-purple-600">
                        <Download size={14} />
                     </Button>
                     <Button variant="ghost" className="h-8 w-8 p-0 flex items-center justify-center rounded-lg hover:bg-red-50 text-red-500">
                        <Trash2 size={14} />
                     </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Configuration Side Panel */}
      {configOpen && selectedReport && (
        <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm cursor-pointer" onClick={() => setConfigOpen(false)} />
          <div className="relative w-full max-w-[480px] bg-white h-screen shadow-2xl animate-in slide-in-from-right duration-500 flex flex-col p-8 overflow-y-auto">
             <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-3">
                   <div className={`p-2.5 rounded-xl ${selectedReport.color}`}>
                      <selectedReport.icon size={20} />
                   </div>
                   <h2 className="text-xl font-black text-gray-900 uppercase tracking-tighter">Configure Report</h2>
                </div>
                <button 
                  onClick={() => setConfigOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={24} className="text-gray-400" />
                </button>
             </div>

             <div className="flex-1 space-y-8">
                <div className="space-y-4">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Report Title</label>
                   <input 
                    type="text" 
                    className="w-full px-5 py-3.5 bg-gray-50 rounded-2xl border border-gray-100 text-sm font-black text-gray-900 outline-none focus:ring-4 focus:ring-purple-500/10 transition-all"
                    defaultValue={`${selectedReport.title} — April 2026`}
                   />
                </div>

                <div className="space-y-4">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Select Batches</label>
                   <div className="grid grid-cols-2 gap-3">
                      {['Batch A', 'Batch B', 'Batch C', 'Batch D', 'Batch E'].map(batch => (
                        <div key={batch} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                           <input type="checkbox" className="w-4 h-4 rounded-md accent-purple-600" defaultChecked />
                           <span className="text-xs font-black text-gray-700">{batch}</span>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-4">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Date From</label>
                      <input type="date" className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-xs font-black" defaultValue="2026-01-01" />
                   </div>
                   <div className="space-y-4">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Date To</label>
                      <input type="date" className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-xs font-black" defaultValue="2026-04-11" />
                   </div>
                </div>

                <div className="space-y-4">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Include Sections</label>
                   {[
                     'Personal Information', 'Attendance Summary', 'Fee Payment History', 
                     'Test Results & Scores', 'Assignment Rate', 'Teacher Remarks'
                   ].map(section => (
                     <div key={section} className="flex items-center justify-between group">
                        <span className="text-xs font-bold text-gray-500 group-hover:text-gray-900 transition-colors uppercase tracking-tight">{section}</span>
                        <div className="w-9 h-5 bg-purple-600 rounded-full flex items-center justify-end px-1 shadow-inner">
                           <div className="w-3 h-3 bg-white rounded-full shadow-sm" />
                        </div>
                     </div>
                   ))}
                </div>
             </div>

             <div className="mt-12 pt-8 border-t border-gray-50 grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => { setPreviewOpen(true); setConfigOpen(false); }}
                  className="h-12 rounded-2xl font-black uppercase text-[11px] tracking-widest gap-2 bg-white"
                >
                   <Eye size={16} /> Preview
                </Button>
                <Button 
                  className="h-12 rounded-2xl font-black uppercase text-[11px] tracking-widest bg-purple-600 hover:bg-purple-700 shadow-xl"
                  onClick={() => { window.print(); setConfigOpen(false); }}
                >
                   Download PDF
                </Button>
             </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewOpen && selectedReport && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-8 animate-in fade-in zoom-in-95 duration-300">
           <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-md cursor-pointer" onClick={() => setPreviewOpen(false)} />
           <div className="relative w-full max-w-4xl bg-gray-800 rounded-3xl h-[90vh] flex flex-col overflow-hidden shadow-2xl">
              <div className="flex justify-between items-center p-6 border-b border-gray-700">
                 <div className="flex items-center gap-3">
                    <span className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                       <FileText className="text-purple-400" size={18} /> PREVIEW: {selectedReport.title}
                    </span>
                    <Badge className="bg-gray-700 text-gray-300 border-none text-[9px]">PAGE 1 OF 20</Badge>
                 </div>
                 <button onClick={() => setPreviewOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                    <X size={24} />
                 </button>
              </div>

              <div className="flex-1 overflow-y-auto p-12 bg-gray-700/50 flex flex-col items-center">
                 {/* Styled A4 Div */}
                 <div className="w-[210mm] min-h-[297mm] bg-white shadow-2xl p-[20mm] flex flex-col text-gray-900 scale-[0.85] origin-top ring-1 ring-gray-900/5">
                    <div className="flex justify-between items-start border-b-[3px] border-purple-600 pb-8 mb-8">
                       <div>
                          <h1 className="text-2xl font-black uppercase tracking-tighter text-gray-900">RAJ SCIENCE CLASSES</h1>
                          <p className="text-[10px] font-bold text-gray-400 uppercase mt-1">Transforming potential into performance since 2018</p>
                       </div>
                       <div className="text-right">
                          <div className="text-[11px] font-black uppercase text-purple-600">Student Progress Report</div>
                          <div className="text-[10px] font-bold text-gray-400 uppercase mt-1">Generated: 11 Apr 2026</div>
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-12 mb-12">
                       <div className="space-y-4">
                          <div className="flex items-center gap-3">
                             <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400"><User size={24}/></div>
                             <div>
                                <div className="text-sm font-black uppercase text-gray-900">Arjun Mehta</div>
                                <div className="text-[10px] font-bold text-gray-400 uppercase">Roll No: A-01 | Batch A</div>
                             </div>
                          </div>
                       </div>
                       <div className="flex justify-end gap-12">
                          <div className="text-center">
                             <div className="text-3xl font-black text-purple-600">91%</div>
                             <div className="text-[9px] font-black text-gray-400 uppercase">Attendance</div>
                          </div>
                          <div className="text-center">
                             <div className="text-3xl font-black text-green-600">76%</div>
                             <div className="text-[9px] font-black text-gray-400 uppercase">Avg Score</div>
                          </div>
                       </div>
                    </div>

                    <div className="space-y-12">
                       <section className="space-y-6">
                          <h4 className="text-[11px] font-black uppercase tracking-widest text-gray-900 border-l-4 border-purple-600 pl-3">Attendance History (Q1 2026)</h4>
                          <div className="h-40 w-full flex items-end justify-between gap-4">
                             {[90, 88, 92, 91].map((val, i) => (
                               <div key={i} className="flex-1 flex flex-col gap-2">
                                  <div className="w-full bg-purple-50 flex items-end overflow-hidden h-32 rounded-lg">
                                     <div className="w-full bg-purple-600 rounded-t-sm" style={{ height: `${val}%` }} />
                                  </div>
                                  <div className="text-[9px] font-black text-center text-gray-400 uppercase tracking-widest">{['Jan', 'Feb', 'Mar', 'Apr'][i]}</div>
                               </div>
                             ))}
                          </div>
                       </section>

                       <section className="space-y-6">
                          <h4 className="text-[11px] font-black uppercase tracking-widest text-gray-900 border-l-4 border-purple-600 pl-3">Fee Status</h4>
                          <div className="grid grid-cols-4 gap-4">
                             {['Jan', 'Feb', 'Mar', 'Apr'].map((m) => (
                               <div key={m} className={`p-4 rounded-2xl border ${m !== 'Apr' ? 'bg-green-50 border-green-100 text-green-700' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
                                  <div className="text-[10px] font-black uppercase mb-1">{m}</div>
                                  <div className="flex items-center gap-2">
                                     {m !== 'Apr' ? <Check size={14} /> : <Clock size={14} />}
                                     <span className="text-xs font-black uppercase tracking-tight">{m !== 'Apr' ? 'Paid' : 'Pending'}</span>
                                  </div>
                               </div>
                             ))}
                          </div>
                       </section>
                    </div>

                    <div className="mt-auto pt-8 border-t border-gray-100 flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-gray-400 italic">
                       <div>Confidential — For Internal Use Only</div>
                       <div>Page 1 of 20</div>
                    </div>
                 </div>
              </div>

              <div className="p-6 bg-gray-800 border-t border-gray-700 flex justify-center gap-4">
                 <Button 
                    variant="outline" 
                    onClick={() => setPreviewOpen(false)}
                    className="h-11 rounded-2xl font-black uppercase text-[10px] tracking-widest bg-transparent border-gray-600 text-gray-300 px-8"
                 >
                    Back to Config
                 </Button>
                 <Button 
                    onClick={() => window.print()}
                    className="h-11 rounded-2xl font-black uppercase text-[10px] tracking-widest bg-purple-600 hover:bg-purple-700 px-10 shadow-lg gap-2"
                 >
                    <Download size={14} /> Download PDF
                 </Button>
              </div>
           </div>
        </div>
      )}

      {/* Scheduled Reports */}
      <Card className="p-8 border-none shadow-sm relative overflow-hidden group bg-gradient-to-br from-white to-gray-50/50">
         <div className="flex justify-between items-center mb-8 relative z-10">
            <div>
               <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                  Scheduled Automations <Layers className="text-purple-600" size={20} />
               </h3>
               <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter mt-1">Reports delivered automatically to your dashboard/email</p>
            </div>
            <Button className="bg-gray-900 hover:bg-black text-white h-9 font-black uppercase text-[10px] tracking-widest px-6 shadow-xl">
               + Schedule New
            </Button>
         </div>

         <div className="space-y-4 relative z-10">
            {[
              { title: 'Monthly Attendance Summary', next: '1 May 2026', schedule: '1st of every month', status: 'Active' },
              { title: 'Weekly Fee Defaulters List', next: '14 Apr 2026', schedule: 'Every Monday morning', status: 'Active' },
              { title: 'Quarterly Institute Audit', next: '1 Jul 2026', schedule: 'Jan 1, Apr 1, Jul 1, Oct 1', status: 'Paused' },
            ].map((sch, i) => (
              <div key={i} className="flex items-center justify-between p-5 bg-white rounded-2xl border border-gray-100 hover:border-purple-200 transition-all hover:shadow-md">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                       {i === 0 ? <Calendar size={20} /> : i === 1 ? <Clock size={20} /> : <FileText size={20} />}
                    </div>
                    <div>
                       <div className="text-sm font-black text-gray-900 uppercase tracking-tight">{sch.title}</div>
                       <div className="text-[10px] font-bold text-gray-400 mt-0.5 italic uppercase tracking-widest">Schedule: {sch.schedule}</div>
                    </div>
                 </div>
                 <div className="flex items-center gap-8">
                    <div className="hidden md:block text-right">
                       <div className="text-[9px] font-black text-gray-300 uppercase">Next Run</div>
                       <div className="text-xs font-black text-gray-700">{sch.next}</div>
                    </div>
                    <div className="flex items-center gap-3">
                       <Badge className={sch.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}>
                          {sch.status}
                       </Badge>
                       <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-purple-100 text-purple-600">
                          <ChevronRight size={18} />
                       </Button>
                    </div>
                 </div>
              </div>
            ))}
         </div>
      </Card>
    </div>
  );
}
