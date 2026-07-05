'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Plus, MoreHorizontal, Mail, Phone } from 'lucide-react';
import { setupAuthOptions } from '@/lib/api';

export default function StaffPage() {
  const [staffList, setStaffList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const userStr = localStorage.getItem('user');
        if (!userStr) return;
        const user = JSON.parse(userStr);
        const instituteSlug = user.instituteId;

        const res = await fetch(`/api/${instituteSlug}/staff`);
        const data = await res.json();
        if (data.success) setStaffList(data.staff);
      } catch (error) {
        console.error('Error fetching staff:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStaff();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-text-slate tracking-tight">Staff & HR</h1>
          <p className="text-sm font-bold text-gray-400 mt-2 uppercase tracking-widest">Manage your institute staff</p>
        </div>
        <Button className="bg-brand-blue text-white rounded-2xl px-6 py-6 font-black text-xs uppercase tracking-widest shadow-glow hover:scale-105 transition-transform flex items-center gap-2">
          <Plus size={16} /> Add Staff
        </Button>
      </div>

      <Card className="border-none shadow-soft overflow-hidden rounded-[32px]">
        <div className="p-8 border-b border-gray-50 flex items-center justify-between">
          <h3 className="text-xl font-black text-text-slate tracking-tight">Staff Directory</h3>
        </div>
        <CardContent className="p-0 overflow-x-auto">
          {loading ? (
            <div className="text-center text-gray-500 py-10 font-bold uppercase tracking-widest">Loading staff...</div>
          ) : staffList.length === 0 ? (
            <div className="text-center text-gray-400 py-10 font-bold uppercase tracking-widest">No staff found.</div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-bg-soft/50 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50">
                  <th className="px-8 py-4 text-left">Name</th>
                  <th className="px-8 py-4 text-left">Role</th>
                  <th className="px-8 py-4 text-left">Contact</th>
                  <th className="px-8 py-4 text-left">Branch</th>
                  <th className="px-8 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {staffList.map((staff, i) => (
                  <tr key={staff._id || i} className="border-b border-gray-50 last:border-0 hover:bg-bg-soft/30 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-2xl text-white flex items-center justify-center font-black text-sm shadow-sm ${
                          staff.role === 'Teacher' ? 'bg-purple-500' :
                          staff.role === 'Manager' ? 'bg-brand-blue' :
                          'bg-orange-400'
                        }`}>
                          {staff.name.charAt(0)}
                        </div>
                        <span className="font-black text-text-slate text-sm">{staff.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <Badge className={`border-none font-bold text-[10px] uppercase px-3 py-1 rounded-full ${
                        staff.role === 'Manager' ? 'bg-brand-blue/10 text-brand-blue' :
                        staff.role === 'Teacher' ? 'bg-purple-100 text-purple-600' :
                        'bg-orange-100 text-orange-600'
                      }`}>
                        {staff.role}
                      </Badge>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-500"><Phone size={12}/> {staff.phone}</div>
                        {staff.email && <div className="flex items-center gap-2 text-xs font-bold text-gray-500"><Mail size={12}/> {staff.email}</div>}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm font-black text-gray-400">
                      {staff.branch || 'Main'}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="text-gray-300 hover:text-brand-blue transition-colors">
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
