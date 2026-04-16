'use client';
import React, { useState } from 'react';
import { 
  Building2, 
  Palette, 
  Globe, 
  Users, 
  ShieldCheck, 
  Lock, 
  Settings2, 
  FlaskConical, 
  Webhook, 
  Calculator, 
  CreditCard, 
  Receipt, 
  Mail, 
  MessageSquare, 
  Bell, 
  FileCode, 
  History, 
  Database, 
  Layers, 
  AlertTriangle 
} from 'lucide-react';

import { CompanyProfilePanel, BrandingPanel, LocalizationPanel } from './panels/CompanyPanels';
import { TeamMembersPanel } from './panels/MembersPanel';
import { RolesPermissionsPanel, TwoFactorAuthPanel } from './panels/TeamPanels';
import { EzzyCoachConfigPanel, FeatureFlagsPanel, ApiWebhooksPanel } from './panels/ProductPanels';
import { TaxGstPanel, PaymentGatewaysPanel, InvoiceTemplatesPanel } from './panels/RevenuePanels';
import { EmailConfigPanel, SmsWhatsappPanel, NotificationRulesPanel, EmailTemplatesPanel } from './panels/CommunicationPanels';
import { AuditLogsPanel, DataBackupPanel, IntegrationsPanel, DangerZonePanel } from './panels/SystemPanels';


type SettingsSection = {
  id: string;
  label: string;
  icon: React.ElementType;
  group: string;
};

const SECTIONS: SettingsSection[] = [
  // Company
  { id: 'profile', label: 'Company Profile', icon: Building2, group: 'COMPANY' },
  { id: 'branding', label: 'Branding & Logo', icon: Palette, group: 'COMPANY' },
  { id: 'localization', label: 'Localization', icon: Globe, group: 'COMPANY' },
  // Team
  { id: 'members', label: 'Team Members', icon: Users, group: 'TEAM' },
  { id: 'roles', label: 'Roles & Permissions', icon: ShieldCheck, group: 'TEAM' },
  { id: '2fa', label: '2FA Policy', icon: Lock, group: 'TEAM' },
  // Product
  { id: 'ezzycoach', label: 'EzzyCoach Config', icon: Settings2, group: 'PRODUCT' },
  { id: 'flags', label: 'Feature Flags', icon: FlaskConical, group: 'PRODUCT' },
  { id: 'api', label: 'API & Webhooks', icon: Webhook, group: 'PRODUCT' },
  // Revenue
  { id: 'tax', label: 'Tax & GST', icon: Calculator, group: 'REVENUE' },
  { id: 'gateways', label: 'Payment Gateways', icon: CreditCard, group: 'REVENUE' },
  { id: 'invoice', label: 'Invoice Templates', icon: Receipt, group: 'REVENUE' },
  // Communication
  { id: 'email', label: 'Email Config', icon: Mail, group: 'COMMUNICATION' },
  { id: 'sms', label: 'SMS & WhatsApp', icon: MessageSquare, group: 'COMMUNICATION' },
  { id: 'notifications', label: 'Notification Rules', icon: Bell, group: 'COMMUNICATION' },
  { id: 'templates', label: 'Email Templates', icon: FileCode, group: 'COMMUNICATION' },
  // System
  { id: 'audit', label: 'Audit Logs', icon: History, group: 'SYSTEM' },
  { id: 'backup', label: 'Data & Backup', icon: Database, group: 'SYSTEM' },
  { id: 'integrations', label: 'Integrations', icon: Layers, group: 'SYSTEM' },
  { id: 'danger', label: 'Danger Zone', icon: AlertTriangle, group: 'SYSTEM' },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const renderContent = () => {
    switch (activeTab) {
      // Company
      case 'profile': return <CompanyProfilePanel />;
      case 'branding': return <BrandingPanel />;
      case 'localization': return <LocalizationPanel />;
      // Team
      case 'members': return <TeamMembersPanel />;
      case 'roles': return <RolesPermissionsPanel />;
      case '2fa': return <TwoFactorAuthPanel />;
      // Product
      case 'ezzycoach': return <EzzyCoachConfigPanel />;
      case 'flags': return <FeatureFlagsPanel />;
      case 'api': return <ApiWebhooksPanel />;
      // Revenue
      case 'tax': return <TaxGstPanel />;
      case 'gateways': return <PaymentGatewaysPanel />;
      case 'invoice': return <InvoiceTemplatesPanel />;
      // Communication
      case 'email': return <EmailConfigPanel />;
      case 'sms': return <SmsWhatsappPanel />;
      case 'notifications': return <NotificationRulesPanel />;
      case 'templates': return <EmailTemplatesPanel />;
      // System
      case 'audit': return <AuditLogsPanel />;
      case 'backup': return <DataBackupPanel />;
      case 'integrations': return <IntegrationsPanel />;
      case 'danger': return <DangerZonePanel />;
      default: return <CompanyProfilePanel />;
    }
  };

  const groups = Array.from(new Set(SECTIONS.map(s => s.group)));

  return (
    <div className="flex h-[calc(100vh-56px)] overflow-hidden bg-[#F8F9FA]">
      {/* Sidebar Navigation */}
      <aside className="w-[260px] bg-white border-r border-gray-100 overflow-y-auto py-6 px-4 shrink-0">
        <div className="space-y-8">
          {groups.map(group => (
            <div key={group} className="space-y-1">
              <h3 className="px-3 text-[10px] font-black text-gray-400 uppercase tracking-[2px] mb-2">{group}</h3>
              {SECTIONS.filter(s => s.group === group).map(section => {
                const Icon = section.icon;
                const isActive = activeTab === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveTab(section.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold transition-all group ${
                      isActive 
                        ? 'bg-[#5E4E99] text-white shadow-lg shadow-purple-100' 
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 border border-transparent'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-[#5E4E99]'}`} />
                    {section.label}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto p-8 pb-32">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
