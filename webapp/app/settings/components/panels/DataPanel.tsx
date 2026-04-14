'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { 
  Database, Download, Upload, RefreshCcw, 
  CheckCircle, FileText, Calendar, Clock, 
  Shield, Info, AlertTriangle, ChevronDown 
} from 'lucide-react';

export default function DataPanel() {
  const [isExporting, setIsExporting] = useState(false);
  const [isBackingUp, setIsBackingUp] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('Preparing export... Download will begin shortly.');
    }, 1500);
  };

  const handleBackup = () => {
    setIsBackingUp(true);
    setTimeout(() => {
      setIsBackingUp(false);
      alert('Backup complete ✓');
    }, 2000);
  };

  return (
    <div className="space-y-12 pb-10">
      {/* Export Data */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-purple-600">
          <Download size={20} />
          <h2 className="text-sm font-black uppercase tracking-widest">Export All Data</h2>
        </div>
        
        <div className="p-10 bg-gray-50/50 rounded-[40px] border border-gray-100 grid grid-cols-1 lg:grid-cols-2 gap-10">
           <div className="space-y-6">
              <div className="space-y-4">
                 <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Select Categories to Include</label>
                 <div className="grid grid-cols-2 gap-3">
                    <CheckItem label="Students & Parents" />
                    <CheckItem label="Batches & Teachers" />
                    <CheckItem label="Attendance Records" />
                    <CheckItem label="Fee Collection" />
                    <CheckItem label="Academic Results" />
                    <CheckItem label="Assignments" />
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Export Format</label>
                    <select className="w-full h-11 rounded-2xl border border-gray-100 bg-white px-4 font-bold outline-none text-xs">
                       <option>CSV</option>
                       <option>Excel (.xlsx)</option>
                       <option>JSON</option>
                       <option>PDF Summary</option>
                    </select>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Date Range</label>
                    <select className="w-full h-11 rounded-2xl border border-gray-100 bg-white px-4 font-bold outline-none text-xs">
                       <option>All Time</option>
                       <option>Academic Year</option>
                       <option>Last 30 Days</option>
                       <option>Custom</option>
                    </select>
                 </div>
              </div>

              <Button 
                onClick={handleExport}
                disabled={isExporting}
                className="w-full h-12 rounded-2xl bg-purple-600 text-white font-black uppercase tracking-widest text-xs gap-3 shadow-glow"
              >
                 {isExporting ? <RefreshCcw size={18} className="animate-spin" /> : <Download size={18} />}
                 {isExporting ? 'Preparing Data...' : 'Start Full Export'}
              </Button>
           </div>

           <div className="p-8 bg-white rounded-[32px] border border-gray-100 flex flex-col items-center justify-center text-center gap-4 group">
              <div className="w-20 h-20 rounded-3xl bg-purple-50 text-purple-600 flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform">
                 <Shield size={40} />
              </div>
              <div className="space-y-1">
                 <h4 className="text-sm font-black text-gray-900 uppercase tracking-tight italic leading-none">Safe & Secure</h4>
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed">
                    All exports are encrypted. We recommend storing exports in a secure location and deleting older files regularly.
                 </p>
              </div>
           </div>
        </div>
      </section>

      <hr className="border-gray-50 shrink-0" />

      {/* Automatic Backups */}
      <section className="space-y-8">
        <div className="flex items-center gap-2 text-purple-600">
          <RefreshCcw size={20} />
          <h2 className="text-sm font-black uppercase tracking-widest">Automatic Backups</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           <div className="p-8 bg-gray-50/50 rounded-[32px] border border-gray-100 space-y-6">
              <div className="flex items-center justify-between">
                 <span className="text-xs font-black text-gray-900 uppercase tracking-tight">Auto Backup</span>
                 <button className="w-12 h-6 bg-purple-600 rounded-full relative px-1">
                    <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1 shadow-sm" />
                 </button>
              </div>
              <div className="space-y-4 pt-2">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Frequency</label>
                    <div className="flex gap-2">
                       <Badge className="bg-purple-600 text-white text-[9px] uppercase tracking-widest py-1.5 flex-1 justify-center rounded-xl">Daily</Badge>
                       <Badge className="bg-white border-gray-100 text-gray-400 text-[9px] uppercase tracking-widest py-1.5 flex-1 justify-center rounded-xl">Weekly</Badge>
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Backup Time</label>
                    <div className="relative">
                       <Clock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                       <Input value="02:00 AM" readOnly className="rounded-2xl h-11 pl-12 bg-white border-gray-100 font-bold" />
                    </div>
                 </div>
              </div>
           </div>

           <div className="p-8 bg-white rounded-[32px] border border-gray-100 shadow-soft-lg flex flex-col gap-6 relative overflow-hidden group">
              <div className="flex justify-between items-start">
                 <div className="flex flex-col gap-0.5">
                    <h4 className="text-xs font-black text-gray-900 uppercase tracking-tight">Last Backup Status</h4>
                    <span className="text-[10px] font-bold text-gray-400 uppercase italic">11 Apr 2026, 2:00 AM</span>
                 </div>
                 <CheckCircle size={24} className="text-green-500" />
              </div>
              <div className="py-2">
                 <div className="flex items-center gap-1.5 mb-1">
                    <Database size={12} className="text-purple-600" />
                    <span className="text-[10px] font-black text-gray-700 uppercase tracking-widest">Cloud Storage: 84 MB Used</span>
                 </div>
                 <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-600 w-[15%]" />
                 </div>
              </div>
              <Button onClick={handleBackup} disabled={isBackingUp} className="w-full h-10 rounded-xl bg-purple-50 text-purple-600 font-black uppercase tracking-widest text-[10px] hover:bg-purple-600 hover:text-white transition-all">
                 {isBackingUp ? 'Backing Up...' : 'Backup Now'}
              </Button>
              <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-purple-50 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
           </div>

           <div className="flex flex-col justify-center p-6 bg-red-50/50 rounded-[32px] border border-red-100 gap-4">
              <AlertTriangle className="text-red-500" size={32} />
              <div className="space-y-1">
                 <h4 className="text-xs font-black text-red-900 uppercase tracking-tight">External Connection</h4>
                 <p className="text-[10px] font-bold text-red-700 leading-relaxed uppercase tracking-tighter italic">
                    You have not linked a Google Drive or Dropbox account for external backups. Your data is currently only backed up on EzzyCoach servers.
                 </p>
              </div>
              <Button variant="outline" className="h-9 px-4 rounded-xl border-red-200 text-red-600 hover:bg-red-50 text-[10px] font-black uppercase tracking-widest mt-2">
                 Setup Cloud Sync
              </Button>
           </div>
        </div>
      </section>

      <hr className="border-gray-50 shrink-0" />

      {/* Import Data */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-purple-600">
          <Upload size={20} />
          <h2 className="text-sm font-black uppercase tracking-widest">Import Data from CSV</h2>
        </div>

        <div className="p-12 border-4 border-dashed border-gray-100 rounded-[48px] bg-gray-50/20 flex flex-col items-center justify-center text-center gap-6 group hover:border-purple-200 hover:bg-purple-50/10 transition-all cursor-pointer">
           <div className="w-20 h-20 rounded-[32px] bg-white shadow-soft flex items-center justify-center text-gray-400 group-hover:text-purple-600 group-hover:scale-110 transition-all duration-500">
              <FileText size={40} />
           </div>
           <div className="space-y-2">
              <h3 className="text-lg font-black text-gray-800 uppercase tracking-tight">Drag and drop your CSV file here</h3>
              <p className="text-xs font-bold text-gray-400 uppercase italic">Supported fields: Students, Fees, Attendance Records</p>
           </div>
           <div className="flex gap-4">
              <Button variant="outline" className="h-11 px-8 rounded-2xl bg-white font-bold border-gray-100 hover:border-purple-200">Browse Files</Button>
              <Button className="h-11 px-8 rounded-2xl bg-purple-600 text-white font-bold shadow-soft">Import Data</Button>
           </div>
           <div className="flex items-center gap-2 text-purple-600 mt-2">
              <Info size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest underline cursor-pointer">Download CSV Import Template</span>
           </div>
        </div>
      </section>
    </div>
  );
}

function CheckItem({ label }: { label: string }) {
  const [checked, setChecked] = useState(true);
  return (
    <button 
      onClick={() => setChecked(!checked)}
      className={`px-4 py-2.5 rounded-2xl border flex items-center gap-3 transition-all ${
        checked ? 'bg-purple-600 border-purple-600 text-white shadow-soft' : 'bg-white border-gray-100 text-gray-400'
      }`}
    >
       <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
         checked ? 'bg-white border-white text-purple-600' : 'bg-transparent border-gray-200'
       }`}>
          {checked && <div className="w-1.5 h-1.5 bg-purple-600 rounded-full" />}
       </div>
       <span className="text-[10px] font-black uppercase tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">{label}</span>
    </button>
  );
}
