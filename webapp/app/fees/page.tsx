'use client';
import React, { useState } from 'react';
import { FeeTabs } from '@/components/fees/FeeTabs';
import { FeeOverview } from '@/components/fees/FeeOverview';
import { CollectFee } from '@/components/fees/CollectFee';
import { FeeRecords } from '@/components/fees/FeeRecords';
import { FeeStructure } from '@/components/fees/FeeStructure';

export default function FeesPage() {
  const [activeTab, setActiveTab] = useState<'Overview' | 'Collect' | 'Records' | 'Structure'>('Overview');

  return (
    <div className="flex flex-col h-full bg-white animate-in fade-in duration-700">
      {/* 1. Page Header */}
      <div className="p-10 pb-0 bg-white">
        <h1 className="text-4xl font-black text-text-slate tracking-tight leading-none mb-3">Fee Management</h1>
        <p className="text-sm font-bold text-gray-400 mb-8">Track collections, manage student dues, and configure fee structures</p>
        
        {/* 2. Tab Switcher */}
        <FeeTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* 3. Tab Content Area */}
      <div className="p-10 pt-0">
        <div className="min-h-[600px]">
          {activeTab === 'Overview' && <FeeOverview />}
          {activeTab === 'Collect' && <CollectFee />}
          {activeTab === 'Records' && <FeeRecords />}
          {activeTab === 'Structure' && <FeeStructure />}
        </div>
      </div>
    </div>
  );
}
