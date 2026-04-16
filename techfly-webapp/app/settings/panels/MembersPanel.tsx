'use client';
import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { CustomerAvatar } from '@/components/ui/CustomerAvatar';
import { mockTeamMembers } from '../mockData';
import { Search, Filter, Plus, MoreHorizontal, X, Edit, Power, User, Key, BarChart3, Users, Activity, Mail, Phone, Calendar, ShieldCheck, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';

export const TeamMembersPanel = () => {
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'Super Admin': return <Badge variant="purple">{role}</Badge>;
      case 'Admin': return <Badge variant="info">{role}</Badge>;
      case 'Sales Executive': return <Badge variant="Active">{role}</Badge>;
      case 'Support': return <Badge variant="warning">{role}</Badge>;
      default: return <Badge variant="default">{role}</Badge>;
    }
  };

  return (
    <div className="flex h-full gap-6 relative">
      <div className={`space-y-6 transition-all duration-300 ${selectedMember ? 'flex-1 overflow-hidden' : 'w-full'}`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Team Members</h2>
            <p className="text-sm text-gray-500">Manage TechFly internal team access</p>
          </div>
          <Button 
            className="bg-[#5E4E99] hover:bg-[#4d3f82] text-white gap-2"
            onClick={() => setIsInviteModalOpen(true)}
          >
            <Plus className="w-4 h-4" /> Invite Member
          </Button>
        </div>

        <Card className="overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex flex-wrap gap-4 items-center justify-between bg-gray-50/30">
            <div className="flex gap-4 items-center flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search by name, email, role..." 
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:border-[#5E4E99] outline-none"
                />
              </div>
              <div className="flex gap-2">
                <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:border-[#5E4E99] outline-none">
                  <option>All Roles</option>
                  <option>Super Admin</option>
                  <option>Admin</option>
                  <option>Sales Executive</option>
                  <option>Support</option>
                </select>
                <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:border-[#5E4E99] outline-none">
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"><input type="checkbox" className="rounded border-gray-300" /></TableHead>
                <TableHead>Member</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>2FA</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTeamMembers.map((member) => (
                <TableRow 
                  key={member.id} 
                  className={`cursor-pointer ${selectedMember?.id === member.id ? 'bg-purple-50/50' : ''}`}
                  onClick={() => setSelectedMember(member)}
                >
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" className="rounded border-gray-300" />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <CustomerAvatar name={member.name} initials={member.initials} size="sm" />
                      <div>
                        <p className="font-bold text-gray-900 text-sm leading-tight">{member.name}</p>
                        <p className="text-xs text-gray-400">{member.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getRoleBadge(member.role)}</TableCell>
                  <TableCell>
                    <div className="flex gap-1.5 items-center">
                      <div className={`w-1.5 h-1.5 rounded-full ${member.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'}`} />
                      <span className="text-xs font-medium text-gray-700">{member.status}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs text-gray-500">{member.lastActive}</TableCell>
                  <TableCell>
                    {member.twoFactorEnabled ? (
                      <span className="text-[10px] inline-flex items-center gap-1 font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" /> ENABLED
                      </span>
                    ) : (
                      <span className="text-[10px] inline-flex items-center font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                        DISABLED
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-end gap-1">
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* Member Detail Side Panel */}
      {selectedMember && (
        <div className="w-[400px] bg-white border-l border-gray-100 h-full flex flex-col animate-in slide-in-from-right duration-300 sticky top-0">
          <div className="p-6 border-b border-gray-100 space-y-4">
            <div className="flex justify-between items-start">
              <CustomerAvatar name={selectedMember.name} initials={selectedMember.initials} size="lg" />
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2" onClick={() => setIsEditModalOpen(true)}>
                  <Edit className="w-3.5 h-3.5" /> Edit
                </Button>
                <button 
                  onClick={() => setSelectedMember(null)}
                  className="p-1.5 hover:bg-gray-100 rounded-full text-gray-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{selectedMember.name}</h3>
              <p className="text-sm text-gray-500">{selectedMember.role}</p>
              <div className="flex gap-2 mt-2">
                <Badge variant={selectedMember.status === 'Active' ? 'Active' : 'default'}>{selectedMember.status}</Badge>
                {selectedMember.twoFactorEnabled ? (
                  <Badge variant="Active" className="gap-1"><ShieldCheck className="w-3 h-3" /> 2FA ON</Badge>
                ) : (
                  <Badge variant="default" className="gap-1"><ShieldAlert className="w-3 h-3" /> 2FA OFF</Badge>
                )}
              </div>
            </div>
            <div className="space-y-2 pt-2 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="w-4 h-4" /> {selectedMember.email}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="w-4 h-4" /> {selectedMember.phone}
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
             <div className="flex border-b border-gray-100 px-6">
              {['Profile', 'Performance', 'Leads', 'Activity'].map((tab) => (
                <button 
                  key={tab} 
                  className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors ${tab === 'Profile' ? 'border-[#5E4E99] text-[#5E4E99]' : 'border-transparent text-gray-400'}`}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>
            
            <div className="p-6 space-y-8">
              <section className="space-y-4">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Basic Information</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Full Name</span>
                    <span className="text-sm font-semibold text-gray-900">{selectedMember.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Role</span>
                    <span className="text-sm font-semibold text-gray-900">{selectedMember.role}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Joined at</span>
                    <span className="text-sm font-semibold text-gray-900">{selectedMember.joinedAt}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Last Active</span>
                    <span className="text-sm font-semibold text-gray-900">{selectedMember.lastActive}</span>
                  </div>
                </div>
              </section>

              {selectedMember.role === 'Sales Executive' && (
                <section className="space-y-4">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Performance (This Month)</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-[10px] text-gray-400 uppercase font-bold">Leads</p>
                      <p className="text-lg font-bold text-gray-900">{selectedMember.assignedLeads || 0}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-[10px] text-gray-400 uppercase font-bold">Demos</p>
                      <p className="text-lg font-bold text-gray-900">4</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-[10px] text-gray-400 uppercase font-bold">Converted</p>
                      <p className="text-lg font-bold text-gray-900">{selectedMember.assignedCustomers || 0}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-[10px] text-gray-400 uppercase font-bold">Win Rate</p>
                      <p className="text-lg font-bold text-gray-900">50%</p>
                    </div>
                  </div>
                </section>
              )}

              <section className="space-y-4">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Permissions</h4>
                <div className="p-4 bg-purple-50 rounded-xl border border-purple-100 flex gap-3">
                  <ShieldCheck className="w-5 h-5 text-purple-600 mt-0.5" />
                  <p className="text-xs text-purple-900 leading-relaxed font-medium"> Permissions for this member are inherited from the <strong className="font-bold underline cursor-pointer">{selectedMember.role}</strong> role configuration.</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}

      {/* Invite Modal */}
      <Modal isOpen={isInviteModalOpen} onClose={() => setIsInviteModalOpen(false)} title="Invite Team Member">
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Full Name *</label>
              <input type="text" placeholder="e.g. Rahul Sharma" className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Email *</label>
              <input type="email" placeholder="rahul@techfly.in" className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Phone</label>
              <input type="text" placeholder="+91 98XXX XXXXX" className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 block mb-2">Role *</label>
              <div className="flex flex-wrap gap-2">
                {['Super Admin', 'Admin', 'Sales Executive', 'Support'].map((role) => (
                  <button 
                    key={role}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${role === 'Sales Executive' ? 'bg-[#5E4E99] text-white border-[#5E4E99]' : 'bg-gray-50 text-gray-500 border-gray-200 hover:border-[#5E4E99] hover:text-[#5E4E99]'}`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl space-y-2">
             <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Base Permissions Preview</h4>
             <ul className="space-y-1.5">
               <li className="text-xs text-gray-600 flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> Can view dashboard</li>
               <li className="text-xs text-gray-600 flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> Can manage customers</li>
               <li className="text-xs text-gray-400 flex items-center gap-2 line-through"><X className="w-3.5 h-3.5" /> Cannot access billing</li>
             </ul>
          </div>

          <div className="flex justify-between items-center">
             <div className="flex gap-4">
                <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
                  <input type="checkbox" checked className="rounded border-gray-300 text-[#5E4E99]" /> Email
                </label>
                <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 text-[#5E4E99]" /> WhatsApp
                </label>
             </div>
             <div className="flex items-center gap-2">
               <span className="text-xs text-gray-400">Expires in:</span>
               <select className="text-xs font-bold text-gray-600 outline-none bg-transparent">
                 <option>7 days</option>
                 <option>14 days</option>
               </select>
             </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <Button variant="outline" onClick={() => setIsInviteModalOpen(false)}>Cancel</Button>
            <Button className="bg-[#5E4E99] hover:bg-[#4d3f82] text-white">Send Invitation</Button>
          </div>
        </div>
      </Modal>

       {/* Edit Member Modal */}
       <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title={`Edit — ${selectedMember?.name}`}>
        <div className="space-y-6">
          <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
             <CustomerAvatar name={selectedMember?.name} initials={selectedMember?.initials} size="lg" />
             <div className="space-y-1">
                <h4 className="font-bold text-gray-900 leading-none">{selectedMember?.name}</h4>
                <p className="text-xs text-gray-400">{selectedMember?.email}</p>
             </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Full Name *</label>
              <input type="text" defaultValue={selectedMember?.name} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Change Role</label>
              <select defaultValue={selectedMember?.role} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]">
                <option>Super Admin</option>
                <option>Admin</option>
                <option>Sales Executive</option>
                <option>Support</option>
              </select>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border border-gray-100 bg-gray-50/50">
              <span className="text-sm font-medium text-gray-700">Status</span>
              <div className={`w-10 h-6 rounded-full p-1 cursor-pointer transition-colors ${selectedMember?.status === 'Active' ? 'bg-[#5E4E99]' : 'bg-gray-300'}`}>
                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${selectedMember?.status === 'Active' ? 'translate-x-4' : 'translate-x-0'}`} />
              </div>
            </div>
          </div>

          <div className="p-4 border border-blue-100 bg-blue-50/50 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-blue-900 leading-none">Reset Password</p>
              <p className="text-[10px] text-blue-700 mt-1 uppercase tracking-wider">A secure link will be sent to the member's email</p>
            </div>
            <Button variant="outline" size="sm" className="bg-white border-blue-200 text-blue-600 hover:bg-blue-100">Send Reset Email</Button>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
            <Button className="bg-[#5E4E99] hover:bg-[#4d3f82] text-white">Save Changes</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
