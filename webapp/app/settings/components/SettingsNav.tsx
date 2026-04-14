'use client';
import React from 'react';
import { 
  User, Palette, Calendar, Users, Shield, 
  BookOpen, CreditCard, Ruler, Bell, MessageSquare, 
  Mail, Database, Cpu, Receipt, AlertTriangle 
} from 'lucide-react';

export type SettingSection = 
  | 'profile' | 'branding' | 'academic' 
  | 'staff' | 'permissions' | 'subjects' 
  | 'fees' | 'grades' | 'notifications' 
  | 'sms' | 'email' | 'data' 
  | 'integrations' | 'billing' | 'danger';

interface NavItem {
  id: SettingSection;
  label: string;
  icon: any;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    label: 'INSTITUTE',
    items: [
      { id: 'profile', label: 'Institute Profile', icon: User },
      { id: 'branding', label: 'Branding & Logo', icon: Palette },
      { id: 'academic', label: 'Academic Year', icon: Calendar },
    ]
  },
  {
    label: 'PEOPLE',
    items: [
      { id: 'staff', label: 'Teachers & Staff', icon: Users },
      { id: 'permissions', label: 'Roles & Permissions', icon: Shield },
    ]
  },
  {
    label: 'ACADEMICS',
    items: [
      { id: 'subjects', label: 'Subjects', icon: BookOpen },
      { id: 'fees', label: 'Fee Structure', icon: CreditCard },
      { id: 'grades', label: 'Grade Scale', icon: Ruler },
    ]
  },
  {
    label: 'COMMUNICATION',
    items: [
      { id: 'notifications', label: 'Notifications', icon: Bell },
      { id: 'sms', label: 'SMS & WhatsApp', icon: MessageSquare },
      { id: 'email', label: 'Email Templates', icon: Mail },
    ]
  },
  {
    label: 'SYSTEM',
    items: [
      { id: 'data', label: 'Data & Backup', icon: Database },
      { id: 'integrations', label: 'Integrations', icon: Cpu },
      { id: 'billing', label: 'Billing & Plan', icon: Receipt },
      { id: 'danger', label: 'Danger Zone', icon: AlertTriangle },
    ]
  }
];

interface SettingsNavProps {
  currentSetting: SettingSection;
  onSettingChange: (setting: SettingSection) => void;
}

export const SettingsNav = ({ currentSetting, onSettingChange }: SettingsNavProps) => {
  return (
    <nav className="w-[260px] flex flex-col gap-6 py-2 overflow-y-auto no-scrollbar h-full">
      {navGroups.map((group) => (
        <div key={group.label} className="flex flex-col gap-1">
          <h3 className="px-4 text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">
            {group.label}
          </h3>
          <div className="flex flex-col gap-0.5">
            {group.items.map((item) => {
              const isActive = currentSetting === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSettingChange(item.id)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group relative ${
                    isActive 
                      ? 'bg-purple-50 text-purple-600' 
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-purple-600 rounded-r-full" />
                  )}
                  <item.icon size={18} className={isActive ? 'text-purple-600' : 'text-gray-400 group-hover:text-gray-600'} />
                  <span className="text-sm font-bold tracking-tight">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
};
