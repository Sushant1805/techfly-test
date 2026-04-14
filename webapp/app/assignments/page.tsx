'use client';
import React, { useState } from 'react';
import { Tabs } from '@/components/ui/Tabs';
import { LayoutGrid, List, Plus, FileText, Send, BarChart3, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';

// Mock views (I will implement these in separate files)
import AllAssignmentsView from './components/AllAssignmentsView';
import CreateAssignmentForm from './components/CreateAssignmentForm';
import SubmissionsView from './components/SubmissionsView';
import AnalyticsView from './components/AnalyticsView';

export default function AssignmentsPage() {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All Assignments', icon: <FileText size={18} /> },
    { id: 'create', label: 'Create Assignment', icon: <Plus size={18} /> },
    { id: 'submissions', label: 'Submissions', icon: <Send size={18} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={18} /> },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden bg-gray-50">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 px-6 pt-2">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Assignments</h1>
          {activeTab !== 'create' && (
            <Button 
              className="gap-2 bg-purple-600 hover:bg-purple-700 text-white"
              onClick={() => setActiveTab('create')}
            >
              <Plus size={18} />
              Create Assignment
            </Button>
          )}
        </div>
        
        <Tabs 
          tabs={tabs} 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          className="px-0"
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          {activeTab === 'all' && <AllAssignmentsView />}
          {activeTab === 'create' && <CreateAssignmentForm onCancel={() => setActiveTab('all')} />}
          {activeTab === 'submissions' && <SubmissionsView />}
          {activeTab === 'analytics' && <AnalyticsView />}
        </div>
      </div>
    </div>
  );
}
