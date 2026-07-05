'use client';
import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Shield, BookOpen, MessageSquare, ExternalLink } from 'lucide-react';

export default function HelpPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-text-slate tracking-tight">Help & Support</h1>
          <p className="text-sm font-bold text-gray-400 mt-2 uppercase tracking-widest">Get assistance with EzzyCoach</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-none shadow-soft hover:shadow-soft-lg transition-all rounded-[32px] cursor-pointer group">
          <CardContent className="p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-brand-blue/10 text-brand-blue flex items-center justify-center font-black text-2xl mb-6 group-hover:scale-110 transition-transform">
              <BookOpen />
            </div>
            <h3 className="text-xl font-black text-text-slate mb-2">Documentation</h3>
            <p className="text-xs font-bold text-gray-400 mb-6">Read our detailed guides and tutorials on how to use all features.</p>
            <span className="text-[10px] font-black uppercase tracking-widest text-brand-blue bg-brand-blue/10 px-4 py-2 rounded-full flex items-center gap-2">
              Browse Docs <ExternalLink size={12} />
            </span>
          </CardContent>
        </Card>

        <Card className="border-none shadow-soft hover:shadow-soft-lg transition-all rounded-[32px] cursor-pointer group">
          <CardContent className="p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-green-50 text-green-500 flex items-center justify-center font-black text-2xl mb-6 group-hover:scale-110 transition-transform">
              <MessageSquare />
            </div>
            <h3 className="text-xl font-black text-text-slate mb-2">Contact Support</h3>
            <p className="text-xs font-bold text-gray-400 mb-6">Need help? Create a ticket and our support team will get back to you.</p>
            <span className="text-[10px] font-black uppercase tracking-widest text-green-600 bg-green-100 px-4 py-2 rounded-full">
              Create Ticket
            </span>
          </CardContent>
        </Card>

        <Card className="border-none shadow-soft hover:shadow-soft-lg transition-all rounded-[32px] cursor-pointer group">
          <CardContent className="p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-black text-2xl mb-6 group-hover:scale-110 transition-transform">
              <Shield />
            </div>
            <h3 className="text-xl font-black text-text-slate mb-2">System Status</h3>
            <p className="text-xs font-bold text-gray-400 mb-6">Check the operational status of all EzzyCoach systems and services.</p>
            <span className="text-[10px] font-black uppercase tracking-widest text-purple-600 bg-purple-100 px-4 py-2 rounded-full">
              All Systems Active
            </span>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
