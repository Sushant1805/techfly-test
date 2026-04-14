'use client';
import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { Modal } from '@/components/ui/Modal';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { teamMembers } from '@/lib/mockData';

export default function Team() {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team Members</h1>
          <p className="text-sm text-gray-500">Manage access and roles for your internal team.</p>
        </div>
        <Button onClick={() => setIsInviteModalOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" /> Invite Member
        </Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teamMembers.map((member, idx) => (
              <TableRow key={idx}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#EAE7F8] flex items-center justify-center shrink-0">
                      <span className="text-[#5E4E99] font-bold text-xs">{member.name.substring(0,2).toUpperCase()}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 leading-none">{member.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">{member.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm font-medium text-gray-700">{member.role}</span>
                </TableCell>
                <TableCell>
                  <Badge variant={member.status as any}>{member.status}</Badge>
                </TableCell>
                <TableCell className="text-gray-500">{member.lastActive}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Edit">
                      <Edit2 className="w-4 h-4 text-gray-500" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Remove">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Modal isOpen={isInviteModalOpen} onClose={() => setIsInviteModalOpen(false)} title="Invite Team Member">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Full Name</label>
            <input type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Email Address</label>
            <input type="email" className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Role</label>
            <select className="w-full border border-gray-200 bg-white rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]">
              <option>Super Admin</option>
              <option>Admin</option>
              <option>Sales Executive</option>
              <option>Support</option>
            </select>
          </div>
          <div className="pt-4 flex items-center justify-end gap-2 border-t border-gray-100">
            <Button variant="ghost" onClick={() => setIsInviteModalOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsInviteModalOpen(false)}>Send Invite</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
