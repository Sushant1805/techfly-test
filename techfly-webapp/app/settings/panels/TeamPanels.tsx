'use client';
import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { mockPermissions, mockTeamMembers } from '../mockData';
import { ShieldCheck, ShieldAlert, Save, Key, Smartphone as Mobile, Mail, LogOut, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export const RolesPermissionsPanel = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Roles & Permissions</h2>
          <p className="text-sm text-gray-500">Control what each role can access in the TechFly Admin panel</p>
        </div>
        <Button className="bg-[#5E4E99] hover:bg-[#4d3f82] text-white gap-2">
          <Save className="w-4 h-4" /> Save Permissions
        </Button>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-400 text-[10px] font-bold uppercase tracking-widest border-b border-gray-100">
                <th className="px-6 py-4 font-bold">Feature</th>
                <th className="px-6 py-4 font-bold text-center">Super Admin</th>
                <th className="px-6 py-4 font-bold text-center">Admin</th>
                <th className="px-6 py-4 font-bold text-center">Sales Exec</th>
                <th className="px-6 py-4 font-bold text-center">Support</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {['DASHBOARD', 'CUSTOMERS', 'SUBSCRIPTIONS', 'SALES', 'ANALYTICS', 'SETTINGS'].map((category) => (
                <React.Fragment key={category}>
                  <tr className="bg-gray-50/50">
                    <td colSpan={5} className="px-6 py-2 text-[10px] font-black text-gray-500 tracking-tighter">{category}</td>
                  </tr>
                  {mockPermissions.filter(p => p.category === category).map((perm, i) => (
                    <tr key={i} className="hover:bg-gray-50/30 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-700">{perm.feature}</td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center opacity-60 pointer-events-none">
                           <input type="checkbox" checked={perm.superAdmin} readOnly className="w-4 h-4 rounded text-[#5E4E99]" />
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center">
                           <input type="checkbox" defaultChecked={perm.admin} className="w-4 h-4 rounded text-[#5E4E99] focus:ring-[#5E4E99]" />
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center">
                           <input type="checkbox" defaultChecked={perm.salesExecutive} className="w-4 h-4 rounded text-[#5E4E99] focus:ring-[#5E4E99]" />
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center">
                           <input type="checkbox" defaultChecked={perm.support} className="w-4 h-4 rounded text-[#5E4E99] focus:ring-[#5E4E99]" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
        <div className="space-y-1">
          <p className="text-sm text-amber-900 font-bold">Important Note</p>
          <p className="text-xs text-amber-700 leading-relaxed">Changes to permissions take effect immediately for all members assigned to the role. Logged-in users may need to refresh their session to see the updates.</p>
        </div>
      </div>
    </div>
  );
};

export const TwoFactorAuthPanel = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Two-Factor Authentication</h2>
        <p className="text-sm text-gray-500">Enforce 2FA for your team to enhance security</p>
      </div>

      <Card className="p-6 space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-4">2FA Policy</h3>
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl border border-purple-100">
            <div className="space-y-1">
              <p className="text-sm font-bold text-purple-900">Enforce 2FA for all team members</p>
              <p className="text-xs text-purple-700 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" /> 3 members have not set up 2FA yet. They will be prompted on next login.</p>
            </div>
            <div className="w-12 h-6 bg-[#5E4E99] rounded-full p-1 cursor-pointer">
              <div className="w-4 h-4 bg-white rounded-full translate-x-6" />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-wider block">Require 2FA for:</label>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Super Admin', enforced: true },
                { label: 'Admin', enforced: false },
                { label: 'Sales Executive', enforced: false },
                { label: 'Support', enforced: false },
              ].map((role) => (
                <label key={role.label} className={`flex items-center justify-between p-4 border rounded-xl transition-all cursor-pointer ${role.label === 'Super Admin' ? 'bg-gray-50 opacity-60 border-gray-100' : 'hover:border-[#5E4E99]'}`}>
                  <span className="text-sm font-medium text-gray-900">{role.label}</span>
                  <input 
                    type="checkbox" 
                    defaultChecked 
                    disabled={role.enforced}
                    className="w-4 h-4 rounded text-[#5E4E99] focus:ring-[#5E4E99]" 
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-100">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-wider block">Allowed Methods:</label>
            <div className="space-y-3">
               <label className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded flex items-center justify-center"><Mobile className="w-4 h-4" /></div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">Authenticator App (TOTP)</p>
                      <p className="text-xs text-gray-400">Google Authenticator, Authy, Microsoft Authenticator</p>
                    </div>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#5E4E99]" />
               </label>
               <label className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-50 text-green-600 rounded flex items-center justify-center"><Key className="w-4 h-4" /></div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">SMS OTP</p>
                      <p className="text-xs text-gray-400">One-time password sent to registered mobile number</p>
                    </div>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#5E4E99]" />
               </label>
               <label className="flex items-center justify-between p-3 border border-gray-100 rounded-xl opacity-50 cursor-not-allowed bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 text-gray-400 rounded flex items-center justify-center"><Mail className="w-4 h-4" /></div>
                    <div>
                      <p className="text-sm font-bold text-gray-400">Email OTP (Less Secure)</p>
                      <p className="text-xs text-gray-400">Not recommended for high-privilege accounts</p>
                    </div>
                  </div>
                  <input type="checkbox" disabled className="w-4 h-4 rounded" />
               </label>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Team 2FA Status</h3>
          <Button variant="outline" size="sm" className="text-[#5E4E99] border-purple-100 bg-purple-50 font-bold text-xs uppercase tracking-wider">Send All Reminders</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
                <th className="px-4 py-3">Member</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">2FA Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {mockTeamMembers.map((member) => (
                <tr key={member.id}>
                  <td className="px-4 py-3 font-medium text-gray-900">{member.name}</td>
                  <td className="px-4 py-3 text-gray-600">{member.role}</td>
                  <td className="px-4 py-3">
                    {member.twoFactorEnabled ? (
                      <span className="text-xs font-bold text-green-600 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Enabled</span>
                    ) : (
                      <span className="text-xs font-bold text-gray-400 flex items-center gap-1 font-mono tracking-tighter uppercase"><XCircle className="w-3.5 h-3.5" /> Disabled</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {member.twoFactorEnabled ? (
                      <button className="text-[10px] font-bold text-[#5E4E99] hover:underline uppercase tracking-wide">View Backup Codes</button>
                    ) : (
                      <button className="text-[10px] font-bold text-blue-600 hover:underline uppercase tracking-wide">Send Reminder</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="p-6 space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-4">Session Security</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Session Timeout</label>
            <select className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]">
              <option>8 hours</option>
              <option>1 hour</option>
              <option>4 hours</option>
              <option>24 hours</option>
              <option>Never</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Max Active Sessions</label>
            <input type="number" defaultValue="3" className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]" />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg border border-gray-100 bg-gray-50/50">
            <span className="text-sm font-medium text-gray-700">Force logout on password change</span>
            <div className="w-10 h-6 bg-[#5E4E99] rounded-full p-1 cursor-pointer">
              <div className="w-4 h-4 bg-white rounded-full translate-x-4" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Allow remember device for</label>
            <select className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]">
              <option>30 days</option>
              <option>7 days</option>
              <option>90 days</option>
            </select>
          </div>
        </div>
      </Card>

      <div className="flex justify-end pt-4">
        <Button className="bg-[#5E4E99] hover:bg-[#4d3f82] text-white">Save Security Settings</Button>
      </div>
    </div>
  );
};
