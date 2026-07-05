'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { User, Phone, CheckCircle2, Shield, Mail } from 'lucide-react';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        setUser(JSON.parse(userStr));
      } catch(e){}
    }
  }, []);

  if (!user) {
    return <div className="p-8 text-gray-400 font-bold animate-pulse text-sm">Loading user profile...</div>;
  }

  const getInitials = (name: string) => {
    const parts = name ? name.split(' ') : ['U'];
    return parts.length > 1 ? parts[0][0] + parts[parts.length - 1][0] : parts[0][0];
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700 max-w-4xl mx-auto">
      <h1 className="text-3xl font-black text-text-slate tracking-tight">My Profile</h1>
      
      <Card className="border-none shadow-soft overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-brand-blue to-purple-600"></div>
        <CardContent className="p-8 relative">
          <div className="absolute -top-16 left-8 w-32 h-32 bg-white rounded-full p-2 shadow-soft-lg">
            <div className="w-full h-full bg-gradient-to-br from-brand-blue to-purple-600 rounded-full flex items-center justify-center text-4xl font-black text-white">
               {getInitials(user.name || 'User')}
            </div>
          </div>

          <div className="mt-16 sm:mt-0 sm:ml-40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-black text-text-slate">{user.name || 'User'}</h2>
              <p className="text-sm font-bold text-gray-400 flex items-center gap-2 mt-1">
                <Shield className="w-4 h-4 text-brand-blue" />
                <span className="uppercase tracking-widest">{user.role || 'Teacher'}</span>
              </p>
            </div>
            <Badge className="bg-green-50 text-green-600 border-none px-4 py-2 uppercase tracking-widest text-[10px] font-black flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Active Account
            </Badge>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <ProfileField icon={Phone} label="Mobile Number" value={user.mobile || 'Not available'} />
              <ProfileField icon={Mail} label="Email Address" value={user.email || 'Not available'} />
            </div>
            <div className="space-y-6">
              <ProfileField icon={User} label="User ID" value={user.id || 'N/A'} isCode />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="text-center w-full max-w-4xl mx-auto -mt-2">
         <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">To change your profile information, contact your institute administrator.</p>
      </div>
    </div>
  );
}

const ProfileField = ({ icon: Icon, label, value, isCode = false }: any) => (
  <div className="flex items-center gap-4 p-4 rounded-2xl bg-bg-soft/30 hover:bg-white hover:shadow-soft transition-all border border-transparent hover:border-gray-50 group">
    <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-brand-blue group-hover:scale-110 transition-transform">
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">{label}</p>
      <p className={`text-sm font-black text-text-slate mt-1 ${isCode ? 'font-mono text-xs tracking-tighter' : ''}`}>{value}</p>
    </div>
  </div>
);
