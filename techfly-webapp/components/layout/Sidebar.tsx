'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, BarChart2, Building2, UserPlus, 
  CreditCard, Tag, FileText, Flame, Bell, Users, Settings 
} from 'lucide-react';

const navGroups = [
  {
    title: 'OVERVIEW',
    items: [
      { name: 'Dashboard', href: '/', icon: LayoutDashboard },
      { name: 'Analytics', href: '/analytics', icon: BarChart2 },
    ]
  },
  {
    title: 'CUSTOMERS',
    items: [
      { name: 'All Customers', href: '/customers', icon: Building2 },
      { name: 'Add Customer', href: '#add-customer', icon: UserPlus }, // Handled by Modal via layout later or page level
    ]
  },
  {
    title: 'SUBSCRIPTIONS',
    items: [
      { name: 'Subscriptions', href: '/subscriptions', icon: CreditCard },
      { name: 'Plans & Pricing', href: '/subscriptions/plans', icon: Tag },
      { name: 'Invoices', href: '/subscriptions/invoices', icon: FileText },
    ]
  },
  {
    title: 'SALES',
    items: [
      { name: 'CRM Pipeline', href: '/sales', icon: Flame },
      { name: 'Follow-ups', href: '/sales/followups', icon: Bell },
      { name: 'Demo Schedule', href: '/sales/demos', icon: FileText },
      { name: 'Sales Analytics', href: '/sales/analytics', icon: BarChart2 },
    ]
  },
  {
    title: 'SETTINGS',
    items: [
      { name: 'Team Members', href: '/team', icon: Users },
      { name: 'Settings', href: '/settings', icon: Settings },
    ]
  }
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="fixed left-6 top-6 bottom-6 w-[260px] bg-white/95 backdrop-blur-2xl shadow-soft-xl rounded-[32px] flex flex-col z-20 border border-white/60 p-4 transition-all hover:shadow-glow">
      <div className="h-20 flex items-center px-6 mb-6 shrink-0 bg-gradient-to-br from-brand-blue to-brand-blue-light rounded-[24px] shadow-glow relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-110" />
        <div className="relative z-10">
          <h1 className="text-white font-black text-2xl tracking-tighter leading-none">TechFly</h1>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70 mt-1">Super Admin Core</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar py-2">
        <nav className="space-y-6">
          {navGroups.map((group, idx) => (
            <div key={idx} className="px-2">
              <div className="px-4 mb-3">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{group.title}</p>
              </div>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link 
                      key={item.name} 
                      href={item.href} 
                      className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group ${
                        isActive 
                          ? 'bg-brand-blue text-white shadow-glow' 
                          : 'text-gray-500 hover:bg-white hover:text-brand-blue hover:shadow-soft'
                      }`}
                    >
                      <item.icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : ''}`} />
                      <span className="text-sm font-bold tracking-tight">{item.name}</span>
                      {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100/50 shrink-0">
        <div className="flex items-center gap-3 bg-white p-3 rounded-2xl shadow-soft border border-gray-50 group cursor-pointer hover:shadow-soft-lg transition-all">
          <div className="w-10 h-10 rounded-xl bg-brand-blue-gradient-start flex items-center justify-center text-white font-black text-sm shadow-sm group-hover:rotate-6 transition-transform">
            VS
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-black text-text-slate truncate">Vikram Shah</p>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Super Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
