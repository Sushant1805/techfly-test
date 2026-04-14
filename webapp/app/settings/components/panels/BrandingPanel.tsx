'use client';
import React, { useState } from 'react';
import { initialBranding, Branding } from '@/lib/settingsData';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { 
  Palette, Upload, Trash2, Eye, Receipt, 
  FileText, Calendar, CheckCircle, Info 
} from 'lucide-react';

export default function BrandingPanel() {
  const [branding, setBranding] = useState<Branding>(initialBranding);

  const handleChange = (name: keyof Branding, value: any) => {
    setBranding(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-10">
      {/* Institute Logo */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-purple-600">
          <Upload size={20} />
          <h2 className="text-sm font-black uppercase tracking-widest">Institute Logo</h2>
        </div>
        
        <div className="p-10 bg-gray-50/50 rounded-[32px] border border-gray-100 flex flex-col items-center gap-6 group transition-all hover:bg-white hover:shadow-soft-lg">
          <div className="w-24 h-24 rounded-3xl bg-white shadow-soft flex items-center justify-center text-3xl font-black text-purple-600 border border-purple-50 group-hover:scale-110 transition-transform">
            {branding.logoUrl ? (
              <img src={branding.logoUrl} alt="Logo" className="w-full h-full object-cover rounded-3xl" />
            ) : (
              "RS"
            )}
          </div>
          <div className="text-center">
            <h3 className="font-black text-gray-900 uppercase tracking-tight text-lg leading-tight">Raj Science Classes</h3>
            <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest italic">Logo Preview</p>
          </div>
          <div className="flex gap-3">
            <Button className="h-10 px-6 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold gap-2 text-xs">
              <Upload size={14} /> Upload Logo
            </Button>
            <Button variant="outline" className="h-10 px-6 rounded-xl font-bold text-gray-400 hover:text-red-500 hover:border-red-100 text-xs">
              <Trash2 size={14} /> Remove
            </Button>
          </div>
          <div className="flex flex-col items-center gap-1">
             <p className="text-[10px] font-bold text-gray-400 uppercase">Recommended: 200×200px, PNG or JPG</p>
             <p className="text-[10px] font-bold text-gray-400 uppercase">Max size: 2 MB</p>
          </div>
        </div>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">
           Logo appears on: <span className="text-gray-900">Receipts, Reports, PDF exports, Email headers</span>
        </p>
      </section>

      <hr className="border-gray-50" />

      {/* Brand Colors */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-purple-600 mb-2">
          <Palette size={20} />
          <h2 className="text-sm font-black uppercase tracking-widest">Brand Colors</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3 p-6 bg-gray-50/50 rounded-3xl border border-gray-100">
            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Primary Color</label>
            <div className="flex gap-3 items-center">
              <input 
                type="color" 
                value={branding.primaryColor}
                onChange={(e) => handleChange('primaryColor', e.target.value)}
                className="w-14 h-14 rounded-2xl border-none cursor-pointer p-0 bg-transparent ring-4 ring-white shadow-soft"
              />
              <span className="font-mono font-black text-gray-700 uppercase">{branding.primaryColor}</span>
            </div>
          </div>
          <div className="space-y-3 p-6 bg-gray-50/50 rounded-3xl border border-gray-100">
            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Secondary Color</label>
            <div className="flex gap-3 items-center">
              <input 
                type="color" 
                value={branding.secondaryColor}
                onChange={(e) => handleChange('secondaryColor', e.target.value)}
                className="w-14 h-14 rounded-2xl border-none cursor-pointer p-0 bg-transparent ring-4 ring-white shadow-soft"
              />
              <span className="font-mono font-black text-gray-700 uppercase">{branding.secondaryColor}</span>
            </div>
          </div>
          <div className="space-y-3 p-6 bg-gray-50/50 rounded-3xl border border-gray-100">
            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Accent Color</label>
            <div className="flex gap-3 items-center">
              <input 
                type="color" 
                value={branding.accentColor}
                onChange={(e) => handleChange('accentColor', e.target.value)}
                className="w-14 h-14 rounded-2xl border-none cursor-pointer p-0 bg-transparent ring-4 ring-white shadow-soft"
              />
              <span className="font-mono font-black text-gray-700 uppercase">{branding.accentColor}</span>
            </div>
          </div>
        </div>

        {/* Live Preview Card */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-gray-400 ml-1">
            <Eye size={16} />
            <h3 className="text-[11px] font-black uppercase tracking-widest italic">Live UI Preview</h3>
          </div>
          <div className="w-full bg-white rounded-[32px] border-2 border-gray-100 shadow-soft-lg p-8 space-y-8 overflow-hidden relative">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black"
                style={{ backgroundColor: branding.primaryColor }}
              >
                RS
              </div>
              <span className="font-black text-gray-900 uppercase tracking-tighter" style={{ color: branding.primaryColor }}>Raj Science Classes</span>
            </div>
            
            <hr className="border-gray-50" />
            
            <div className="flex flex-wrap gap-4">
               <button className="h-10 px-6 rounded-2xl text-white font-bold text-xs" style={{ backgroundColor: branding.primaryColor }}>Primary Button</button>
               <button className="h-10 px-6 rounded-2xl text-gray-700 font-bold text-xs bg-gray-100">Secondary Button</button>
            </div>

            <div className="flex gap-4">
               <div className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white" style={{ backgroundColor: branding.accentColor }}>Active Badge</div>
               <div className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white bg-green-500">Paid Badge</div>
            </div>

            <div className="space-y-2">
               <div className="flex justify-between items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  <span>Class Progress</span>
                  <span style={{ color: branding.primaryColor }}>85%</span>
               </div>
               <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: '85%', backgroundColor: branding.primaryColor }} />
               </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-gray-50" />

      {/* Reports & Receipts */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-purple-600 mb-2">
          <Receipt size={20} />
          <h2 className="text-sm font-black uppercase tracking-widest">Reports & Receipts</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div className="space-y-2">
            <label className="text-[11px] font-black text-gray-400 ml-1 uppercase">Header Text</label>
            <Input 
              value={branding.receiptHeader}
              onChange={(e) => handleChange('receiptHeader', e.target.value)}
              className="rounded-2xl border-gray-100 bg-gray-50/50 h-12 px-5 font-bold"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[11px] font-black text-gray-400 ml-1 uppercase">Tagline / Subheader</label>
            <Input 
              value={branding.receiptTagline}
              onChange={(e) => handleChange('receiptTagline', e.target.value)}
              className="rounded-2xl border-gray-100 bg-gray-50/50 h-12 px-5 font-bold"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-[11px] font-black text-gray-400 ml-1 uppercase">Footer Text (PDFs)</label>
            <Input 
              value={branding.receiptFooter}
              onChange={(e) => handleChange('receiptFooter', e.target.value)}
              className="rounded-2xl border-gray-100 bg-gray-50/50 h-12 px-5 font-bold"
            />
          </div>

          <div className="p-6 bg-gray-50/50 rounded-3xl border border-gray-100 space-y-4">
             <div className="flex items-center justify-between group">
                <div className="flex flex-col gap-0.5">
                   <span className="text-xs font-black text-gray-900 uppercase tracking-tight">Show Logo on Receipts</span>
                   <span className="text-[10px] font-bold text-gray-400 uppercase italic">Appears on fee collection slips</span>
                </div>
                <button 
                   onClick={() => handleChange('showLogoOnReceipts', !branding.showLogoOnReceipts)}
                   className={`w-12 h-6 rounded-full transition-all duration-300 relative ${branding.showLogoOnReceipts ? 'bg-purple-600' : 'bg-gray-200'}`}
                >
                   <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${branding.showLogoOnReceipts ? 'left-7 shadow-lg' : 'left-1'}`} />
                </button>
             </div>
             <div className="flex items-center justify-between group">
                <div className="flex flex-col gap-0.5">
                   <span className="text-xs font-black text-gray-900 uppercase tracking-tight">Show Logo on Reports</span>
                   <span className="text-[10px] font-bold text-gray-400 uppercase italic">Appears on academic report cards</span>
                </div>
                <button 
                   onClick={() => handleChange('showLogoOnReports', !branding.showLogoOnReports)}
                   className={`w-12 h-6 rounded-full transition-all duration-300 relative ${branding.showLogoOnReports ? 'bg-purple-600' : 'bg-gray-200'}`}
                >
                   <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${branding.showLogoOnReports ? 'left-7 shadow-lg' : 'left-1'}`} />
                </button>
             </div>
             <div className="flex items-center justify-between group">
                <div className="flex flex-col gap-0.5">
                   <span className="text-xs font-black text-gray-900 uppercase tracking-tight">Show Logo on Timetable</span>
                   <span className="text-[10px] font-bold text-gray-400 uppercase italic">Appears on printed schedule PDFs</span>
                </div>
                <button 
                   onClick={() => handleChange('showLogoOnTimetable', !branding.showLogoOnTimetable)}
                   className={`w-12 h-6 rounded-full transition-all duration-300 relative ${branding.showLogoOnTimetable ? 'bg-purple-600' : 'bg-gray-200'}`}
                >
                   <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${branding.showLogoOnTimetable ? 'left-7 shadow-lg' : 'left-1'}`} />
                </button>
             </div>
          </div>

          <div className="p-6 bg-purple-50/50 rounded-3xl border border-purple-100 flex items-start gap-4">
             <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-purple-600 shrink-0 shadow-soft">
                <Info size={20} />
             </div>
             <div className="space-y-1">
                <h4 className="text-xs font-black text-purple-900 uppercase tracking-tight">Pro Tip</h4>
                <p className="text-[11px] font-bold text-purple-700 leading-relaxed uppercase tracking-tighter">
                   Upload a high-quality PNG with a transparent background for the best look on PDF reports.
                </p>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
