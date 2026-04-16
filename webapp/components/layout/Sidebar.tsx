'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Users, BookOpen, CheckSquare, 
  IndianRupee, FileText, Calendar, ClipboardList, 
  BarChart2, Shield, Settings, Menu, X, ChevronRight
} from 'lucide-react';

const mainNavItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Students', href: '/students', icon: Users },
  { name: 'Batches', href: '/batches', icon: BookOpen },
  { name: 'Attendance', href: '/attendance', icon: CheckSquare },
  { name: 'Fees', href: '/fees', icon: IndianRupee },
  { name: 'Tests', href: '/tests', icon: FileText },
  { name: 'Timetable', href: '/timetable', icon: Calendar },
  { name: 'Assignments', href: '/assignments', icon: ClipboardList },
  { name: 'Analytics', href: '/analytics', icon: BarChart2 },
];

export const Sidebar = ({ isExpanded, setIsExpanded }: { isExpanded: boolean, setIsExpanded: (val: boolean) => void }) => {
  const pathname = usePathname();

  return (
    <aside 
      className={`fixed left-6 top-6 bottom-6 flex flex-col z-20 transition-all duration-300 ease-in-out ${
        isExpanded 
          ? 'w-[240px] bg-white/60 backdrop-blur-xl shadow-soft-lg rounded-[32px] p-4 items-stretch border border-white/40' 
          : 'w-[72px] items-center'
      }`}
    >
      {/* Expand/Collapse Toggle */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className={`absolute top-10 -right-3.5 w-7 h-7 bg-white rounded-full shadow-soft-lg flex items-center justify-center text-gray-500 hover:text-brand-blue z-50 border border-gray-100 transition-transform duration-300 ${
          isExpanded ? 'rotate-180' : ''
        }`}
      >
        <ChevronRight className="w-4 h-4 ml-0.5" />
      </button>

      {/* Top Logo / Brand Bubble */}
      <div className={`mb-6 bg-gradient-to-b from-brand-blue-gradient-start to-brand-blue-gradient-end shadow-soft-lg flex flex-col items-center justify-start py-4 shrink-0 relative transition-all duration-300 ${
        isExpanded ? 'h-24 w-full rounded-[24px]' : 'h-24 w-14 rounded-[28px] mx-auto'
      }`}>
        <div className="w-6 h-6 border-2 border-white rounded transform skew-x-12 mb-1" />
        <div className="w-4 h-1 bg-white/50 rounded-full" />
        {isExpanded && <span className="text-white font-bold mt-4 tracking-wide text-sm opacity-100 transition-opacity delay-100">EzzyCoach</span>}
      </div>

      <div className={`flex-1 flex flex-col relative w-full ${!isExpanded ? 'items-center' : ''}`}>
        {/* Connecting Line (Only visible when collapsed) */}
        {!isExpanded && (
          <div className="absolute top-0 bottom-16 left-1/2 -translate-x-[1px] w-[2px] bg-gray-200 z-0" />
        )}

        <div className={`flex-1 overflow-y-visible no-scrollbar flex flex-col gap-3 py-2 z-10 relative ${
          isExpanded ? 'w-full px-1' : 'w-full items-center'
        }`}>
          {mainNavItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link 
                key={item.name} 
                href={item.href} 
                className={`flex items-center rounded-full transition-all duration-300 relative group overflow-visible ${
                  isExpanded ? 'w-full h-12 justify-start px-4' : 'w-12 h-12 justify-center'
                } ${
                  isActive 
                    ? 'bg-brand-blue text-white shadow-glow' 
                    : isExpanded 
                      ? 'bg-transparent text-gray-500 hover:bg-white hover:text-brand-blue hover:shadow-soft'
                      : 'bg-white text-gray-400 hover:text-brand-blue shadow-sm hover:shadow-soft'
                }`}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                
                {/* Expanded text */}
                {isExpanded && (
                  <span className="ml-3 text-sm font-semibold whitespace-nowrap overflow-hidden">
                    {item.name}
                  </span>
                )}

                {/* Tooltip for collapsed sidebar */}
                {!isExpanded && (
                  <span className="absolute left-16 bg-white text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-soft opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity z-50">
                    {item.name}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      <div className={`mt-auto ${isExpanded ? 'px-1 w-full' : 'w-full flex justify-center'}`}>
        <Link 
          href="/settings"
          className={`h-12 rounded-full flex items-center cursor-pointer transition-all duration-300 relative group overflow-visible ${
            isExpanded 
              ? 'w-full justify-start px-4 bg-transparent text-gray-500 hover:bg-white hover:text-brand-blue hover:shadow-soft' 
              : 'w-12 justify-center bg-white shadow-soft border-2 border-white'
          } ${pathname === '/settings' ? 'bg-brand-blue text-white shadow-glow' : ''}`}
        >
          <Settings className={`w-5 h-5 shrink-0 ${!isExpanded && pathname !== '/settings' ? 'text-gray-400 group-hover:text-brand-blue' : ''}`} />
          
          {isExpanded && (
            <span className="ml-3 text-sm font-semibold whitespace-nowrap">
              Settings
            </span>
          )}

          {!isExpanded && (
            <span className="absolute left-16 bg-white text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-soft opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity z-50 text-center min-w-[80px]">
              Settings
            </span>
          )}
        </Link>
      </div>
    </aside>
  );
};
