'use client';
import React, { useState } from 'react';
import { Tabs } from '@/components/ui/Tabs';
import GlobalFilterBar from './components/GlobalFilterBar';
import OverviewTab from './components/OverviewTab';
import StudentsTab from './components/StudentsTab';
import AttendanceTab from './components/AttendanceTab';
import FeesTab from './components/FeesTab';
import AcademicTab from './components/AcademicTab';
import ReportsTab from './components/ReportsTab';
import { GlobalFilter } from '@/lib/analyticsData';

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [filters, setFilters] = useState<GlobalFilter>({
    dateRange: 'thisMonth',
    dateFrom: '2026-04-01',
    dateTo: '2026-04-30',
    batchId: 'all',
    standard: 'all'
  });

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'students', label: 'Students' },
    { id: 'attendance', label: 'Attendance' },
    { id: 'fees', label: 'Fees' },
    { id: 'academic', label: 'Academic' },
    { id: 'reports', label: 'Reports' },
  ];

  const handleFilterChange = (newFilters: Partial<GlobalFilter>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      {/* Tab Navigation */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-8 pt-4">
        <Tabs 
          tabs={tabs} 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          className="mb-0"
        />
        
        {/* Global Filter Bar */}
        <GlobalFilterBar filters={filters} onFilterChange={handleFilterChange} />
      </div>

      {/* Tab Content */}
      <div className="px-8 py-6 max-w-[1600px] mx-auto w-full">
        {activeTab === 'overview' && <OverviewTab filters={filters} />}
        {activeTab === 'students' && <StudentsTab filters={filters} />}
        {activeTab === 'attendance' && <AttendanceTab filters={filters} />}
        {activeTab === 'fees' && <FeesTab filters={filters} />}
        {activeTab === 'academic' && <AcademicTab filters={filters} />}
        {activeTab === 'reports' && <ReportsTab filters={filters} />}
      </div>
    </div>
  );
}
