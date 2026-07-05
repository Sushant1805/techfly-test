'use client';
import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { usePathname, useRouter } from 'next/navigation';
import { setupAuthOptions } from '@/lib/api';

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isAuthPage = pathname === '/login' || pathname === '/signup';

  // Check token validity and auto-logout
  useEffect(() => {
    if (!isAuthPage) {
      const token = setupAuthOptions().getToken();
      if (!token) {
        router.push('/login');
        return;
      }

      // Decode JWT to check expiration
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);

        // Check if token is expired
        if (payload.exp < currentTime) {
          setupAuthOptions().logout();
          router.push('/login');
          return;
        }

        // Set up auto-logout timer (logout 1 minute before expiration)
        const timeUntilExpiry = (payload.exp - currentTime) * 1000;
        const warningTime = timeUntilExpiry - 60000; // 1 minute before expiry

        if (warningTime > 0) {
          const warningTimer = setTimeout(() => {
            alert('Your session will expire in 1 minute. Please save your work.');
          }, warningTime);

          const logoutTimer = setTimeout(() => {
            setupAuthOptions().logout();
            router.push('/login');
            alert('Your session has expired. Please login again.');
          }, timeUntilExpiry);

          return () => {
            clearTimeout(warningTimer);
            clearTimeout(logoutTimer);
          };
        }
      } catch (error) {
        // Invalid token, logout
        setupAuthOptions().logout();
        router.push('/login');
      }
    }
  }, [pathname, isAuthPage, router]);

  if (isAuthPage) {
    return <div className="min-h-screen w-full relative">{children}</div>;
  }

  return (
    <div className="flex min-h-screen relative">
      <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarExpanded ? 'pl-[280px]' : 'pl-[100px] lg:pl-[120px]'
        }`}
      >
        <Topbar isSidebarExpanded={isSidebarExpanded} />
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};
