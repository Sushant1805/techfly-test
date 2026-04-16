'use client';
import React, { useState } from 'react';
import { TimetableTabs, TimetableTab } from '@/components/timetable/TimetableTabs';
import { WeeklyView } from '@/components/timetable/WeeklyView';
import { AiGenerator } from '@/components/timetable/AiGenerator';
import { TeacherView } from '@/components/timetable/TeacherView';
import { RoomView } from '@/components/timetable/RoomView';
import { TimetableSettings } from '@/components/timetable/TimetableSettings';

export default function TimetablePage() {
  const [activeTab, setActiveTab] = useState<TimetableTab>('Weekly');

  const renderContent = () => {
    switch (activeTab) {
      case 'Weekly': return <WeeklyView />;
      case 'AI': return <AiGenerator />;
      case 'Teacher': return <TeacherView />;
      case 'Room': return <RoomView />;
      case 'Settings': return <TimetableSettings />;
      default: return <WeeklyView />;
    }
  };

  return (
    <div className="p-8 space-y-10 animate-in fade-in duration-500">
      {/* 1. Header & Navigation */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-text-slate tracking-tight leading-none">Timetable</h1>
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest leading-none p-1">
            Academic Schedule & AI Generation
          </p>
        </div>
        <TimetableTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* 2. Main Content */}
      <div className="relative min-h-[600px]">
        {renderContent()}
      </div>

      {/* 3. Global Footer Stats */}
      <div className="fixed bottom-10 right-10 z-50 pointer-events-none sm:pointer-events-auto hidden xl:block">
         <div className="bg-text-slate/90 backdrop-blur-xl rounded-[32px] p-6 shadow-2xl flex items-center gap-6 border border-white/10 ring-1 ring-black/20">
            <div className="flex -space-x-3">
               {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-xl border-4 border-text-slate bg-brand-blue/20 flex items-center justify-center text-[10px] font-black text-white/80">
                     B{i}
                  </div>
               ))}
            </div>
            <div className="h-10 w-px bg-white/10" />
            <div className="space-y-0.5">
               <p className="text-[9px] font-black text-white/40 uppercase tracking-widest leading-none">Status</p>
               <p className="text-xs font-black text-white leading-none">Timetable Active</p>
            </div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-lg shadow-green-500/20 animate-pulse" />
         </div>
      </div>
    </div>
  );
}
