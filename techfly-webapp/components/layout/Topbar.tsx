'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { Search, Bell, HelpCircle } from 'lucide-react';

export const Topbar = () => {
  const pathname = usePathname();
  
  const getPageTitle = () => {
    if (pathname === '/') return 'Dashboard';
    if (pathname === '/plans') return 'Plans & Pricing';
    if (pathname === '/crm') return 'CRM Pipeline';
    const path = pathname.split('/')[1];
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <header className="fixed top-0 right-0 left-[320px] h-20 bg-bg-soft/95 backdrop-blur-xl z-10 flex items-center justify-between px-8 lg:px-12 border-b border-white/60">
      <div className="flex flex-col">
        <h2 className="text-2xl font-black text-text-slate tracking-tighter leading-none">{getPageTitle()}</h2>
        <div className="flex items-center gap-2 mt-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Status: Operational</p>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="relative group hidden md:block">
          <Search className="w-4 h-4 text-gray-400 absolute left-5 top-1/2 -translate-y-1/2 group-focus-within:text-brand-blue transition-colors" />
          <input 
            type="text" 
            placeholder="Search everything..." 
            className="w-[280px] lg:w-[360px] pl-12 pr-6 py-3 bg-white border border-gray-100/50 rounded-2xl text-[13px] font-bold shadow-soft focus:outline-none focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue/20 transition-all"
          />
        </div>
        
        <div className="flex items-center gap-3 bg-white/80 backdrop-blur-md p-1.5 rounded-2xl shadow-soft border border-gray-100/50">
          <button className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-400 hover:bg-bg-soft hover:text-brand-blue transition-all">
            <HelpCircle className="w-4 h-4" />
          </button>

          <button className="relative w-10 h-10 flex items-center justify-center rounded-xl text-gray-400 hover:bg-bg-soft hover:text-brand-blue transition-all">
            <Bell className="w-4 h-4" />
            <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></span>
          </button>
          
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blue to-brand-blue-light text-white flex items-center justify-center shadow-soft hover:scale-105 transition-transform border border-white/20 cursor-pointer">
            <span className="font-black text-[11px]">RM</span>
          </div>
        </div>
      </div>
    </header>
  );
};
