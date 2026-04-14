'use client';
import React from 'react';
import { Calendar, Zap, Users, Home, Settings } from 'lucide-react';

export type TimetableTab = 'Weekly' | 'AI' | 'Teacher' | 'Room' | 'Settings';

interface TimetableTabsProps {
  activeTab: TimetableTab;
  onTabChange: (tab: TimetableTab) => void;
}

export const TimetableTabs: React.FC<TimetableTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'Weekly', label: 'Weekly View', icon: Calendar },
    { id: 'AI', label: 'AI Generator', icon: Zap },
    { id: 'Teacher', label: 'Teacher View', icon: Users },
    { id: 'Room', label: 'Room View', icon: Home },
    { id: 'Settings', label: 'Settings', icon: Settings },
  ] as const;

  return (
    <div className="flex items-center gap-2 p-1.5 bg-bg-soft/10 backdrop-blur-md rounded-[24px] border border-white/20 w-fit">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              flex items-center gap-2.5 px-6 py-2.5 rounded-[18px] text-xs font-black uppercase tracking-wider transition-all duration-500
              ${isActive 
                ? 'bg-white text-brand-blue shadow-soft-lg scale-105 z-10' 
                : 'text-gray-400 hover:text-text-slate hover:bg-white/50'
              }
            `}
          >
            <Icon className={`w-4 h-4 transition-transform duration-500 ${isActive ? 'scale-110' : ''} ${isActive && tab.id === 'AI' ? 'text-amber-500 fill-amber-500' : ''}`} />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};
