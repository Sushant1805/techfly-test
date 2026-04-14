'use client';
import React, { useState } from 'react';
import { AttendanceTabs } from '@/components/attendance/AttendanceTabs';
import { MarkAttendance } from '@/components/attendance/MarkAttendance';
import { AttendanceReports } from '@/components/attendance/AttendanceReports';
import { AttendanceSettings } from '@/components/attendance/AttendanceSettings';

export default function AttendancePage() {
  const [activeTab, setActiveTab] = useState<'Mark' | 'Reports' | 'Settings'>('Mark');

  return (
    <div className="flex flex-col h-full bg-white animate-in fade-in duration-700">
      {/* Dynamic Header Area */}
      <div className="p-10 pb-0 bg-white">
        <h1 className="text-4xl font-black text-text-slate tracking-tight leading-none mb-3">Attendance</h1>
        <p className="text-sm font-bold text-gray-400 mb-2">Track daily presence, generate reports, and configure institution rules</p>
      </div>

      <div className="p-10 pt-0">
        <AttendanceTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="min-h-[600px]">
          {activeTab === 'Mark' && <MarkAttendance />}
          {activeTab === 'Reports' && <AttendanceReports />}
          {activeTab === 'Settings' && <AttendanceSettings />}
        </div>
      </div>
    </div>
  );
}
