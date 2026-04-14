'use client';
import React, { useState } from 'react';
import { mockStaff, StaffMember } from '@/lib/settingsData';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Users, Search, Filter, Plus, 
  MoreVertical, Edit, Power, ChevronRight,
  Shield, Mail, Phone, Calendar
} from 'lucide-react';
import StaffDetailPanel from './StaffDetailPanel';

export default function StaffPanel() {
  const [staff, setStaff] = useState<StaffMember[]>(mockStaff);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);

  const filteredStaff = staff.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || 
                         s.email.toLowerCase().includes(search.toLowerCase()) ||
                         s.phone.includes(search);
    const matchesRole = roleFilter === 'All' || s.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const roles = ['All', 'Teacher', 'Admin', 'Reception', 'Support'];

  return (
    <div className="flex h-full gap-6 relative">
      {/* Main Table Area */}
      <div className={`flex-1 flex flex-col gap-6 transition-all duration-300 ${selectedStaff ? 'mr-[420px]' : ''}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-purple-600">
            <Users size={20} />
            <h2 className="text-sm font-black uppercase tracking-widest">Teachers & Staff</h2>
          </div>
          <Button className="h-10 px-6 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold gap-2 text-xs shadow-soft">
            <Plus size={16} /> Add Staff Member
          </Button>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap gap-4 items-center bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <Input 
              placeholder="Search by name, email, phone..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 border-none bg-white rounded-xl h-10 text-xs font-bold"
            />
          </div>
          <div className="flex gap-2">
            {roles.map(role => (
              <button
                key={role}
                onClick={() => setRoleFilter(role)}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  roleFilter === role 
                    ? 'bg-purple-600 text-white shadow-soft' 
                    : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-100'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-soft">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Role</th>
                {!selectedStaff && <th className="px-6 py-4">Subjects</th>}
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredStaff.map((s) => (
                <tr 
                  key={s.id} 
                  onClick={() => setSelectedStaff(s)}
                  className={`hover:bg-purple-50/30 transition-colors cursor-pointer group ${selectedStaff?.id === s.id ? 'bg-purple-50/50' : ''}`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-black text-xs uppercase border-2 border-white shadow-sm">
                        {s.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-black text-gray-900 group-hover:text-purple-600 transition-colors">{s.name}</span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter italic">ID: {s.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className="bg-gray-100 text-gray-600 border-none text-[9px] font-black uppercase px-2 py-0.5">
                      {s.role}
                    </Badge>
                  </td>
                  {!selectedStaff && (
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {s.subjects.length > 0 ? s.subjects.map(sub => (
                          <span key={sub} className="text-[9px] font-bold text-gray-500 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">
                            {sub}
                          </span>
                        )) : <span className="text-[9px] font-bold text-gray-300 italic">—</span>}
                      </div>
                    </td>
                  )}
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] font-black text-gray-700">{s.phone}</span>
                      <span className="text-[10px] font-bold text-gray-400 lowercase">{s.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className={`text-[9px] font-black px-3 py-1 uppercase tracking-tighter ${
                      s.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {s.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-white text-gray-400 hover:text-purple-600 rounded-xl transition-all shadow-sm opacity-0 group-hover:opacity-100">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Staff Detail Side Panel */}
      <StaffDetailPanel 
        staff={selectedStaff} 
        onClose={() => setSelectedStaff(null)} 
      />
    </div>
  );
}
