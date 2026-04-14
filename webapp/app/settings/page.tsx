'use client';
import React, { useState } from 'react';
import { SettingsNav, SettingSection } from './components/SettingsNav';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Save, RotateCcw } from 'lucide-react';

// Placeholder for sections - will be implemented individually
import ProfilePanel from './components/panels/ProfilePanel';
import BrandingPanel from './components/panels/BrandingPanel';
import AcademicYearPanel from './components/panels/AcademicYearPanel';
import StaffPanel from './components/panels/StaffPanel';
import PermissionsPanel from './components/panels/PermissionsPanel';
import SubjectsPanel from './components/panels/SubjectsPanel';
import FeeStructurePanel from './components/panels/FeeStructurePanel';
import GradeScalePanel from './components/panels/GradeScalePanel';
import NotificationsPanel from './components/panels/NotificationsPanel';
import SMSPanel from './components/panels/SMSPanel';
import EmailPanel from './components/panels/EmailPanel';
import DataPanel from './components/panels/DataPanel';
import IntegrationsPanel from './components/panels/IntegrationsPanel';
import BillingPanel from './components/panels/BillingPanel';
import DangerZonePanel from './components/panels/DangerZonePanel';

export default function SettingsPage() {
  const [currentSetting, setCurrentSetting] = useState<SettingSection>('profile');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      // In a real app, we would trigger a toast here
      alert('Settings saved successfully!');
    }, 1000);
  };

  const renderPanel = () => {
    switch (currentSetting) {
      case 'profile':
        return <ProfilePanel />;
      case 'branding':
        return <BrandingPanel />;
      case 'academic':
        return <AcademicYearPanel />;
      case 'staff':
        return <StaffPanel />;
      case 'permissions':
        return <PermissionsPanel />;
      case 'subjects':
        return <SubjectsPanel />;
      case 'fees':
        return <FeeStructurePanel />;
      case 'grades':
        return <GradeScalePanel />;
      case 'notifications':
        return <NotificationsPanel />;
      case 'sms':
        return <SMSPanel />;
      case 'email':
        return <EmailPanel />;
      case 'data':
        return <DataPanel />;
      case 'integrations':
        return <IntegrationsPanel />;
      case 'billing':
        return <BillingPanel />;
      case 'danger':
        return <DangerZonePanel />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[500px] text-gray-400 gap-4">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
              <RotateCcw size={32} />
            </div>
            <p className="font-medium">Section "{currentSetting}" is under construction...</p>
          </div>
        );
    }
  };

  return (
    <div className="flex gap-8 h-[calc(100vh-140px)]">
      {/* Left Navigation */}
      <div className="w-[260px] shrink-0">
        <SettingsNav 
          currentSetting={currentSetting} 
          onSettingChange={setCurrentSetting} 
        />
      </div>

      {/* Right Content Panel */}
      <div className="flex-1 overflow-hidden flex flex-col gap-6">
        <Card className="flex-1 overflow-y-auto no-scrollbar border-none shadow-soft-lg rounded-[32px] bg-white/80 backdrop-blur-md p-8">
          {/* Panel Header */}
          <div className="flex justify-between items-start mb-10">
            <div>
              <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
                {currentSetting.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} Settings
              </h1>
              <p className="text-sm font-medium text-gray-500 mt-1">
                Manage your {currentSetting} configuration and preferences.
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="h-11 px-6 rounded-2xl font-bold">
                Discard
              </Button>
              <Button 
                onClick={handleSave} 
                className="h-11 px-6 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold gap-2"
                disabled={isSaving}
              >
                <Save size={18} />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>

          {/* Panel Content */}
          <div className="max-w-4xl">
            {renderPanel()}
          </div>
        </Card>
      </div>
    </div>
  );
}
