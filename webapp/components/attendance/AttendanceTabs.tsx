'use client';
import React from 'react';
import { CheckCircle, PieChart, Settings } from 'lucide-react';

interface AttendanceTabsProps {
  activeTab: 'Mark' | 'Reports' | 'Settings';
  onTabChange: (tab: 'Mark' | 'Reports' | 'Settings') => void;
}

export const AttendanceTabs: React.FC<AttendanceTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'Mark', label: 'Mark Attendance', icon: CheckCircle },
    { id: 'Reports', label: 'Attendance Reports', icon: PieChart },
    { id: 'Settings', label: 'Attendance Settings', icon: Settings },
  ] as const;

  return (
    <div className="flex items-center gap-2 p-2 bg-white/50 backdrop-blur-md rounded-[32px] border border-gray-100 shadow-soft w-fit mb-12 translate-y-[-24px] z-[50]">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-3 px-8 py-3.5 rounded-[24px] transition-all duration-500 group relative ${
              isActive 
                ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20' 
                : 'text-gray-400 hover:text-brand-blue hover:bg-white'
            }`}
          >
            <tab.icon className={`w-5 h-5 transition-transform duration-500 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
            <span className="text-xs font-black uppercase tracking-widest">{tab.label}</span>
            {isActive && (
              <div className="absolute inset-0 bg-white/10 rounded-[24px] pointer-events-none" />
            )}
          </button>
        );
      })}
    </div>
  );
};
