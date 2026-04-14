'use client';
import React from 'react';
import { LayoutDashboard, Wallet, ClipboardList, Settings } from 'lucide-react';

interface FeeTabsProps {
  activeTab: 'Overview' | 'Collect' | 'Records' | 'Structure';
  onTabChange: (tab: 'Overview' | 'Collect' | 'Records' | 'Structure') => void;
}

export const FeeTabs: React.FC<FeeTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'Overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'Collect', label: 'Collect Fee', icon: Wallet },
    { id: 'Records', label: 'Fee Records', icon: ClipboardList },
    { id: 'Structure', label: 'Fee Structure', icon: Settings },
  ] as const;

  return (
    <div className="flex items-center gap-2 p-1.5 bg-white rounded-[24px] border border-gray-100 shadow-soft w-fit mb-10">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id as any)}
            className={`flex items-center gap-2.5 px-6 py-2.5 rounded-[18px] transition-all duration-300 group ${
              isActive 
                ? 'bg-brand-blue text-white shadow-md shadow-brand-blue/20' 
                : 'text-gray-400 hover:text-brand-blue hover:bg-bg-soft'
            }`}
          >
            <tab.icon className={`w-4 h-4 ${isActive ? 'scale-110' : 'group-hover:scale-110'} transition-transform`} />
            <span className="text-[11px] font-black uppercase tracking-wider">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};
