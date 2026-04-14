'use client';
import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Plus, Trash2, Edit2, Calendar, Clock, 
  Bell, ShieldAlert, Globe, Save, Check, X
} from 'lucide-react';
import { holidays, attendanceSettings } from '@/lib/mockData';

export const AttendanceSettings: React.FC = () => {
  const [activeDays, setActiveDays] = useState(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);
  
  const toggleDay = (day: string) => {
    setActiveDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  return (
    <div className="space-y-12 pb-20">
      {/* 1. Working Days */}
      <section className="space-y-6">
        <h3 className="text-xl font-black text-text-slate tracking-tight px-2">Workday Configuration</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => {
            const isActive = activeDays.includes(day);
            return (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                className={`p-6 rounded-[28px] border-2 transition-all flex flex-col items-center gap-4 group ${
                  isActive 
                    ? 'bg-brand-blue border-brand-blue shadow-brand-blue/20 shadow-xl scale-105 z-10' 
                    : 'bg-white border-gray-100/50 text-gray-400 hover:border-brand-blue/30'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                  isActive ? 'bg-white/20 text-white' : 'bg-bg-soft text-gray-300 group-hover:bg-brand-blue/5 group-hover:text-brand-blue'
                }`}>
                  <Calendar className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <p className={`text-[9px] font-black uppercase tracking-widest ${isActive ? 'text-white' : 'text-gray-300'}`}>{day.substring(0, 3)}</p>
                  <p className={`text-xs font-black ${isActive ? 'text-white' : 'text-text-slate'}`}>{day}</p>
                </div>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                  isActive ? 'bg-white border-white text-brand-blue shadow-lg' : 'border-gray-100 text-transparent'
                }`}>
                  <Check className="w-3.5 h-3.5 stroke-[4]" />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* 2. Holidays List */}
        <section className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-black text-text-slate tracking-tight">Holiday Management</h3>
            <Button variant="outline" className="h-10 px-6 rounded-xl border-gray-100 font-black text-[10px] uppercase tracking-widest gap-2">
              <Plus className="w-4 h-4" /> Add Holiday
            </Button>
          </div>
          <Card className="border-none shadow-soft rounded-[40px] overflow-hidden bg-white">
            <div className="divide-y divide-gray-50">
              {holidays.map(h => (
                <div key={h.id} className="p-6 flex items-center justify-between hover:bg-bg-soft/10 transition-colors group">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center font-black group-hover:scale-105 transition-transform">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-black text-text-slate tracking-tight leading-none mb-1.5">{h.name}</h4>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{new Date(h.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="default" className="bg-bg-soft text-gray-500 border-none font-bold text-[9px] uppercase tracking-widest px-3 py-1.5">{h.type}</Badge>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-gray-300 hover:text-brand-blue"><Edit2 className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-gray-300 hover:text-red-500"><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* 3. Logic Rules */}
        <section className="space-y-6">
          <h3 className="text-xl font-black text-text-slate tracking-tight px-2">Thresholds & Alerts</h3>
          <Card className="p-10 border-none shadow-soft rounded-[40px] bg-white space-y-10">
            <div className="grid grid-cols-2 gap-10">
              <RuleInput label="Warning Threshold" sub="Triggers orange status" defaultValue={75} unit="%" />
              <RuleInput label="Critical Alert" sub="Triggers red status" defaultValue={60} unit="%" />
              <RuleInput label="Past Entry Limit" sub="Days allowed back" defaultValue={7} unit="Days" />
              <RuleInput label="Late Buffer" sub="Time after start" defaultValue={30} unit="Min" />
            </div>
            
            <div className="pt-10 border-t border-gray-50 space-y-8">
              <ToggleRow label="Auto-Send Reminders" sub="Notify parents when attendance < threshold" checked />
              <ToggleRow label="Holiday Enrollment" sub="Allow attendance on holidays" />
              <ToggleRow label="Class Overlap" sub="Allow students in multiple batches" checked />
            </div>
          </Card>
        </section>
      </div>

      {/* 4. Notification Toggles */}
      <section className="space-y-6">
        <h3 className="text-xl font-black text-text-slate tracking-tight px-2">Communication Preferences</h3>
        <Card className="p-10 border-none shadow-soft rounded-[40px] bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <PrefCard icon={ShieldAlert} title="Absence Alerts" sub="Notify parents when marked Absent" checked />
            <PrefCard icon={Clock} title="Late Arrival" sub="Notify parents when marked Late" />
            <PrefCard icon={Globe} title="Weekly Digest" sub="Send summary reports to parents" checked />
            <PrefCard icon={Bell} title="Admin Sync" sub="Alert admin on low batch rate" checked />
            <PrefCard icon={Calendar} title="Monthly CSV" sub="Auto-email report to institute head" />
          </div>
        </Card>
      </section>

      {/* Save Button */}
      <div className="flex justify-center pt-8">
        <Button className="h-16 px-16 rounded-[24px] bg-brand-blue shadow-brand-blue/20 font-black text-sm uppercase tracking-[0.2em] gap-4">
          <Save className="w-5 h-5" /> Save All Settings
        </Button>
      </div>
    </div>
  );
};

const RuleInput = ({ label, sub, defaultValue, unit }: any) => (
  <div className="space-y-3">
    <div className="flex items-center gap-2">
      <div className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</span>
    </div>
    <div className="relative group">
      <input 
        type="number" 
        defaultValue={defaultValue}
        className="w-full h-14 rounded-[20px] bg-bg-soft/10 border border-transparent group-hover:bg-white group-hover:border-gray-100 focus:outline-none focus:ring-4 focus:ring-brand-blue/10 px-6 font-black text-lg transition-all"
      />
      <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-brand-blue uppercase tracking-widest">{unit}</span>
    </div>
    <p className="text-[10px] font-bold text-gray-300 ml-2 italic tracking-tight">{sub}</p>
  </div>
);

const ToggleRow = ({ label, sub, checked = false }: any) => (
  <div className="flex items-center justify-between group">
    <div>
      <h5 className="font-bold text-text-slate leading-none mb-1 group-hover:text-brand-blue transition-all">{label}</h5>
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{sub}</p>
    </div>
    <div className={`w-14 h-7 rounded-full p-1.5 transition-all cursor-pointer ${checked ? 'bg-brand-blue' : 'bg-gray-100'}`}>
      <div className={`w-4 h-4 rounded-full bg-white shadow-lg transition-all ${checked ? 'ml-7' : 'ml-0'}`} />
    </div>
  </div>
);

const PrefCard = ({ icon: Icon, title, sub, checked = false }: any) => (
  <div className="flex items-start gap-4 p-2 rounded-3xl hover:bg-bg-soft/10 transition-all cursor-pointer group">
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
      checked ? 'bg-brand-blue/10 text-brand-blue' : 'bg-gray-50 text-gray-300'
    }`}>
      <Icon className="w-6 h-6" />
    </div>
    <div className="flex-1 space-y-1">
      <div className="flex items-center justify-between">
        <h5 className="font-black text-text-slate text-sm tracking-tight">{title}</h5>
        <div className={`w-10 h-5 rounded-full p-1 transition-all ${checked ? 'bg-brand-blue' : 'bg-gray-100'}`}>
          <div className={`w-3 h-3 rounded-full bg-white transition-all ${checked ? 'ml-5' : 'ml-0'}`} />
        </div>
      </div>
      <p className="text-[10px] font-bold text-gray-400 leading-tight uppercase tracking-widest">{sub}</p>
    </div>
  </div>
);
