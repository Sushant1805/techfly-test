'use client';
import React, { useState } from 'react';
import { initialNotifications, NotificationSettings } from '@/lib/settingsData';
import { Button } from '@/components/ui/Button';
import { 
  Bell, CheckSquare, IndianRupee, FileText, 
  ClipboardList, AlertTriangle, MessageSquare, 
  Mail, Smartphone, Shield, Users 
} from 'lucide-react';

export default function NotificationsPanel() {
  const [settings, setSettings] = useState<NotificationSettings>(initialNotifications);

  const toggle = (path: string) => {
    const keys = path.split('.');
    setSettings(prev => {
      const updated = { ...prev };
      let current: any = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = !current[keys[keys.length - 1]];
      return updated;
    });
  };

  return (
    <div className="space-y-12 pb-10">
      {/* Student & Parent Notifications */}
      <section className="space-y-8">
        <div className="flex items-center gap-2 text-purple-600">
          <Users size={20} />
          <h2 className="text-sm font-black uppercase tracking-widest">Student & Parent Notifications</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Attendance Alerts */}
          <div className="p-8 bg-gray-50/50 rounded-[32px] border border-gray-100 space-y-6">
            <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
               <CheckSquare size={14} className="text-purple-600" /> Attendance
            </h3>
            <div className="space-y-4">
               <ToggleRow label="Notify Parent on Absence" isActive={settings.attendance.notifyParentOnAbsent} onToggle={() => toggle('attendance.notifyParentOnAbsent')} />
               <ToggleRow label="Notify Parent on Late Arrival" isActive={settings.attendance.notifyParentOnLate} onToggle={() => toggle('attendance.notifyParentOnLate')} />
               <div className="pt-4 space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Summary Frequency</label>
                  <select 
                    className="w-full rounded-2xl border border-gray-100 bg-white h-10 px-4 text-xs font-bold outline-none"
                    value={settings.attendance.summaryFrequency}
                    onChange={(e) => setSettings(prev => ({ ...prev, attendance: { ...prev.attendance, summaryFrequency: e.target.value as any } }))}
                  >
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                    <option>Never</option>
                  </select>
               </div>
            </div>
          </div>

          {/* Fee Alerts */}
          <div className="p-8 bg-gray-50/50 rounded-[32px] border border-gray-100 space-y-6">
            <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
               <IndianRupee size={14} className="text-purple-600" /> Fees
            </h3>
            <div className="space-y-4">
               <ToggleRow label="Send Pre-Due Date Reminder" isActive={settings.fees.reminderEnabled} onToggle={() => toggle('fees.reminderEnabled')} />
               <ToggleRow label="Send Overdue Fee Alerts" isActive={settings.fees.overdueReminderEnabled} onToggle={() => toggle('fees.overdueReminderEnabled')} />
               <ToggleRow label="Payment Confirmation Receipt" isActive={settings.fees.paymentConfirmation} onToggle={() => toggle('fees.paymentConfirmation')} />
            </div>
          </div>

          {/* Test & Result Alerts */}
          <div className="p-8 bg-gray-50/50 rounded-[32px] border border-gray-100 space-y-6">
            <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
               <FileText size={14} className="text-purple-600" /> Tests & Results
            </h3>
            <div className="space-y-4">
               <ToggleRow label="Upcoming Test Reminder" isActive={settings.tests.upcomingTestReminder} onToggle={() => toggle('tests.upcomingTestReminder')} />
               <ToggleRow label="Notify Parents of Results" isActive={settings.tests.resultsNotification} onToggle={() => toggle('tests.resultsNotification')} />
            </div>
          </div>

          {/* Assignment Alerts */}
          <div className="p-8 bg-gray-50/50 rounded-[32px] border border-gray-100 space-y-6">
            <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
               <ClipboardList size={14} className="text-purple-600" /> Assignments
            </h3>
            <div className="space-y-4">
               <ToggleRow label="Notify on Creation" isActive={settings.assignments.createdNotification} onToggle={() => toggle('assignments.createdNotification')} />
               <ToggleRow label="Task Due Reminder" isActive={settings.assignments.dueReminder} onToggle={() => toggle('assignments.dueReminder')} />
               <ToggleRow label="Late Submission Alert" isActive={settings.assignments.lateSubmissionAlert} onToggle={() => toggle('assignments.lateSubmissionAlert')} />
            </div>
          </div>
        </div>
      </section>

      <hr className="border-gray-100 border-dashed" />

      {/* Internal Alerts */}
      <section className="space-y-8">
        <div className="flex items-center gap-2 text-purple-600">
          <Shield size={20} />
          <h2 className="text-sm font-black uppercase tracking-widest">Admin & Teacher Alerts</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="p-6 bg-purple-50/50 rounded-3xl border border-purple-100 space-y-4">
              <h4 className="text-[10px] font-black text-purple-900 uppercase tracking-widest italic">Admin Dashboard Alerts</h4>
              <div className="space-y-3">
                 <ToggleRow label="New Student Enrollment" isActive={true} onToggle={() => {}} />
                 <ToggleRow label="Batch Attendance < 70%" isActive={true} onToggle={() => {}} />
                 <ToggleRow label="Critical Fee Overdue (>30d)" isActive={true} onToggle={() => {}} />
              </div>
           </div>
           <div className="p-6 bg-purple-50/50 rounded-3xl border border-purple-100 space-y-4">
              <h4 className="text-[10px] font-black text-purple-900 uppercase tracking-widest italic">Teacher Alerts</h4>
              <div className="space-y-3">
                 <ToggleRow label="Class Reminder (30m before)" isActive={true} onToggle={() => {}} />
                 <ToggleRow label="Timetable Changes" isActive={true} onToggle={() => {}} />
                 <ToggleRow label="New Assignment Submission" isActive={false} onToggle={() => {}} />
              </div>
           </div>
        </div>
      </section>

      <hr className="border-gray-50" />

      {/* Notification Channels */}
      <section className="space-y-8">
        <div className="flex items-center gap-2 text-purple-600">
          <MessageSquare size={20} />
          <h2 className="text-sm font-black uppercase tracking-widest">Notification Channels</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           <ChannelCard icon={Smartphone} label="In-App" status="Always On" active={true} locked={true} />
           <ChannelCard icon={MessageSquare} label="SMS" status="Configured" active={settings.channels.sms} onToggle={() => toggle('channels.sms')} />
           <ChannelCard icon={Bell} label="WhatsApp" status="Not Setup" active={settings.channels.whatsapp} onToggle={() => toggle('channels.whatsapp')} />
           <ChannelCard icon={Mail} label="Email" status="Not Setup" active={settings.channels.email} onToggle={() => toggle('channels.email')} />
        </div>
      </section>

      <div className="flex justify-center pt-6">
         <Button className="h-12 px-12 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-black uppercase tracking-widest text-xs shadow-glow">
            Save Notification Settings
         </Button>
      </div>
    </div>
  );
}

function ToggleRow({ label, isActive, onToggle }: { label: string, isActive: boolean, onToggle: () => void }) {
  return (
    <div className="flex items-center justify-between group">
       <span className="text-[11px] font-bold text-gray-700 uppercase tracking-tight group-hover:text-purple-600 transition-colors">{label}</span>
       <button 
          onClick={onToggle}
          className={`w-10 h-5 rounded-full transition-all duration-300 relative ${isActive ? 'bg-purple-600 shadow-sm' : 'bg-gray-200'}`}
       >
          <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all duration-300 ${isActive ? 'left-5.5 shadow-soft' : 'left-0.5'}`} />
       </button>
    </div>
  );
}

function ChannelCard({ icon: Icon, label, status, active, locked, onToggle }: { icon: any, label: string, status: string, active: boolean, locked?: boolean, onToggle?: () => void }) {
  return (
    <div className={`p-6 rounded-[32px] border transition-all flex flex-col items-center gap-4 text-center group ${
      active ? 'bg-white border-purple-100 shadow-soft-lg' : 'bg-gray-50/50 border-gray-100 grayscale opacity-60'
    }`}>
       <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
         active ? 'bg-purple-100 text-purple-600 shadow-inner group-hover:scale-110' : 'bg-gray-100 text-gray-400'
       }`}>
          <Icon size={24} />
       </div>
       <div className="flex flex-col gap-0.5">
          <span className="text-xs font-black text-gray-900 group-hover:text-purple-600 transition-colors uppercase tracking-tight">{label}</span>
          <span className={`text-[9px] font-bold uppercase tracking-widest italic ${
            status === 'Not Setup' ? 'text-red-400' : 'text-green-500'
          }`}>{status}</span>
       </div>
       <button 
          disabled={locked}
          onClick={onToggle}
          className={`w-12 h-6 rounded-full transition-all duration-300 relative ${
            locked ? 'bg-purple-600 cursor-not-allowed' : (active ? 'bg-purple-600 shadow-glow' : 'bg-gray-300')
          }`}
       >
          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${active ? 'left-7 shadow-sm' : 'left-1'}`} />
       </button>
    </div>
  );
}
