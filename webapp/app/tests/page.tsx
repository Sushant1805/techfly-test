'use client';
import React, { useState } from 'react';
import { TestTabs } from '@/components/tests/TestTabs';
import { AllTests } from '@/components/tests/AllTests';
import { EnterMarks } from '@/components/tests/EnterMarks';
import { ResultsAnalysis } from '@/components/tests/ResultsAnalysis';
import { TestSettings } from '@/components/tests/TestSettings';
import { TestAnalytics } from '@/components/tests/TestAnalytics';
import { AIInsights } from '@/components/tests/AIInsights';
import { ShareToParents } from '@/components/tests/ShareToParents';

export default function TestsPage() {
  const [activeTab, setActiveTab] = useState<'All' | 'Enter' | 'Results' | 'Analytics' | 'AI' | 'Share' | 'Settings'>('All');
  const [selectedTestId, setSelectedTestId] = useState<string | undefined>(undefined);

  const handleEnterMarks = (testId: string) => {
    setSelectedTestId(testId);
    setActiveTab('Enter');
  };

  return (
    <div className="flex flex-col h-full bg-white animate-in fade-in duration-700">
      {/* 1. Page Header */}
      <div className="p-10 pb-0 bg-white">
        <h1 className="text-4xl font-black text-text-slate tracking-tight leading-none mb-3">Tests & Exams</h1>
        <p className="text-sm font-bold text-gray-400 mb-8">Schedule assessments, enter marks, analyze performance, and share with parents</p>
        
        {/* 2. Tab Switcher */}
        <TestTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* 3. Tab Content Area */}
      <div className="p-10 pt-10">
        <div className="min-h-[600px]">
          {activeTab === 'All' && <AllTests onEnterMarks={handleEnterMarks} />}
          {activeTab === 'Enter' && <EnterMarks selectedTestId={selectedTestId} />}
          {activeTab === 'Results' && <ResultsAnalysis />}
          {activeTab === 'Analytics' && <TestAnalytics />}
          {activeTab === 'AI' && <AIInsights />}
          {activeTab === 'Share' && <ShareToParents />}
          {activeTab === 'Settings' && <TestSettings />}
        </div>
      </div>
    </div>
  );
}
