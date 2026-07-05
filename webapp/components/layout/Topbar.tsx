'use client';
import React, { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Search, Bell, RefreshCw, Settings, User, LogOut, TrendingUp, CheckCircle } from 'lucide-react';
import { setupAuthOptions } from '@/lib/api';

export const Topbar = ({ isSidebarExpanded = false }: { isSidebarExpanded?: boolean }) => {
  const pathname = usePathname();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState<{name: string, role: string, initials: string} | null>(null);
  const router = useRouter();
  
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const u = JSON.parse(userStr);
        const nameParts = u.name ? u.name.split(' ') : ['User'];
        const initials = nameParts.length > 1 ? nameParts[0][0] + nameParts[nameParts.length - 1][0] : nameParts[0][0];
        setUser({ name: u.name || 'User', role: u.role || 'Teacher', initials: initials.toUpperCase() });
      } catch(e){}
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = () => {
    setupAuthOptions().logout();
    router.push('/login');
  };

  const getPageTitle = () => {
    if (pathname === '/') return 'Dashboard';
    const path = pathname.split('/')[1];
    if (!path) return 'Dashboard';
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 800);
  };

  const notifications = [
    { id: 1, text: "Aarav Patel paid April Fees", time: "10m ago", isUnread: true },
    { id: 2, text: "Physics Test results published", time: "1h ago", isUnread: true },
    { id: 3, text: "New registration: Neha Gupta", time: "3h ago", isUnread: false },
    { id: 4, text: "System backup successful", time: "5h ago", isUnread: false },
  ];

  return (
    <header className="w-full h-16 flex items-center justify-between mb-4 sticky top-6 z-50">
      <div>
        <h2 className="text-2xl font-black text-text-slate tracking-tight">{getPageTitle()}</h2>
        {pathname === '/dashboard' && (
          <p className="text-[11px] font-bold text-gray-400 mt-1 uppercase tracking-widest flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Live System Status: Healthy
          </p>
        )}
      </div>
      
      <div className="flex items-center gap-4">
        {/* Pill Search */}
        <div className="relative group">
          <Search className="w-4 h-4 text-gray-400 absolute left-5 top-1/2 -translate-y-1/2 group-focus-within:text-brand-blue transition-colors" />
          <input 
            type="text" 
            placeholder="Search students, batches..." 
            className="pl-12 pr-6 py-3 bg-white border border-gray-100/50 rounded-2xl text-[13px] font-bold shadow-soft focus:outline-none focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue/20 w-[240px] lg:w-[320px] transition-all"
          />
        </div>
        
        {/* Actions Container */}
        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-xl p-1.5 rounded-2xl shadow-soft border border-gray-100/50">
          
          {/* Refresh Button */}
          <button 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all ${isRefreshing ? 'bg-brand-blue/5 text-brand-blue' : 'hover:bg-bg-soft text-gray-400 hover:text-brand-blue'}`}
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>

          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className={`relative w-10 h-10 flex items-center justify-center rounded-xl transition-all ${showNotifications ? 'bg-brand-blue text-white shadow-soft-lg' : 'hover:bg-bg-soft text-gray-400 hover:text-brand-blue'}`}
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 bg-white rounded-3xl shadow-soft-xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-5 border-b border-gray-50 flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase tracking-widest text-text-slate">Notifications</h4>
                  <button className="text-[10px] font-black uppercase text-brand-blue hover:underline">Mark all read</button>
                </div>
                <div className="max-h-[320px] overflow-y-auto">
                  {notifications.map(n => (
                    <div key={n.id} className={`p-4 border-b border-gray-50 last:border-0 hover:bg-bg-soft transition-colors cursor-pointer flex gap-3 ${n.isUnread ? 'bg-brand-blue/[0.02]' : ''}`}>
                      <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${n.isUnread ? 'bg-brand-blue' : 'bg-gray-200'}`} />
                      <div>
                        <p className={`text-[13px] leading-tight ${n.isUnread ? 'font-bold text-text-slate' : 'font-medium text-gray-500'}`}>{n.text}</p>
                        <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-tighter">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-bg-soft/50 text-center">
                  <button className="text-[10px] font-black uppercase text-gray-400 hover:text-brand-blue transition-colors">View All Activities</button>
                </div>
              </div>
            )}
          </div>
          
          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <div 
              onClick={() => setShowProfile(!showProfile)}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blue to-purple-600 text-white flex items-center justify-center cursor-pointer shadow-soft hover:scale-105 transition-transform border-2 border-white"
            >
              <span className="font-black text-[11px]">{user ? user.initials : 'U'}</span>
            </div>

            {showProfile && (
              <div className="absolute right-0 mt-3 w-64 bg-white rounded-3xl shadow-soft-xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-5 bg-gradient-to-br from-brand-blue to-purple-700 text-white">
                  <p className="font-black text-sm">{user ? user.name : 'Unknown User'}</p>
                  <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest">{user ? user.role : 'Guest'}</p>
                  <div className="mt-3 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/20 text-[9px] font-black uppercase">
                    <CheckCircle className="w-3 h-3" /> Configured
                  </div>
                </div>
                <div className="p-2">
                  <ProfileLink icon={User} label="My Profile" onClick={() => { setShowProfile(false); router.push('/profile'); }} />
                  <ProfileLink icon={Settings} label="Institute Settings" onClick={() => setShowProfile(false)} />
                  <ProfileLink icon={TrendingUp} label="Analytics" onClick={() => { setShowProfile(false); router.push('/analytics'); }} />
                  <hr className="my-2 border-gray-50" />
                  <ProfileLink icon={LogOut} label="Sign Out" color="text-red-500 hover:bg-red-50" onClick={handleSignOut} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

const ProfileLink = ({ icon: Icon, label, color = "text-text-slate hover:bg-bg-soft", onClick }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${color}`}
  >
    <Icon className="w-4 h-4" />
    <span className="text-[13px] font-bold">{label}</span>
  </button>
);
