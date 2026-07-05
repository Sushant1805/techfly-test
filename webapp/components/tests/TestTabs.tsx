'use client';
import React from 'react';
import { LayoutGrid, Edit3, PieChart, Settings, Brain, Share2 } from 'lucide-react';

interface TestTabsProps {
  activeTab: 'All' | 'Enter' | 'Results' | 'Analytics' | 'AI' | 'Share' | 'Settings';
  onTabChange: (tab: 'All' | 'Enter' | 'Results' | 'Analytics' | 'AI' | 'Share' | 'Settings') => void;
}

export const TestTabs: React.FC<TestTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'All', label: 'All Tests', icon: LayoutGrid },
    { id: 'Enter', label: 'Enter Marks', icon: Edit3 },
    { id: 'Results', label: 'Results & Analysis', icon: PieChart },
    { id: 'Analytics', label: 'Test Analytics', icon: PieChart },
    { id: 'AI', label: 'AI Insights', icon: Brain },
    { id: 'Share', label: 'Share to Parents', icon: Share2 },
    { id: 'Settings', label: 'Test Settings', icon: Settings },
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
            <Icon className={`w-4 h-4 transition-transform duration-500 ${isActive ? 'scale-110' : ''}`} />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};
