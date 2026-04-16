'use client';
import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Shield, Database, LayoutGrid, AlertTriangle, Search, Filter, Download, Trash2, ShieldAlert, History, Globe, Lock, RefreshCw, Layers, Plus, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';

export const AuditLogsPanel = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Audit Logs</h2>
          <p className="text-sm text-gray-500">Track all administrative actions performed across the platform</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" /> Export Logs
        </Button>
      </div>

      <Card className="overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-wrap gap-4 items-center justify-between bg-gray-50/30">
           <div className="relative flex-1 max-w-sm">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
             <input type="text" placeholder="Search logs by user, action..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm bg-white" />
           </div>
           <div className="flex gap-2">
             <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white outline-none">
               <option>All Actions</option>
               <option>Login</option>
               <option>Create</option>
               <option>Update</option>
               <option>Delete</option>
             </select>
             <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white hover:bg-gray-50">
               <Filter className="w-4 h-4" /> Filters
             </button>
           </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Entity</TableHead>
              <TableHead>IP Address</TableHead>
              <TableHead className="text-right">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { time: '12 Apr 2026, 11:20 AM', user: 'Vishal (Super Admin)', action: 'UPDATE_PERMISSION', entity: 'Role: Admin', ip: '192.168.1.1' },
              { time: '12 Apr 2026, 10:45 AM', user: 'System', action: 'AUTO_PAYOUT', entity: 'Payout: #PO-902', ip: '—' },
              { time: '11 Apr 2026, 06:15 PM', user: 'Anjali (Admin)', action: 'REGENERATE_API_KEY', entity: 'API Key: Dashboard', ip: '103.24.12.98' },
              { time: '11 Apr 2026, 02:30 PM', user: 'Rahul (Sales)', action: 'LOGIN_SUCCESS', entity: 'User Session', ip: '172.16.0.45' },
              { time: '11 Apr 2026, 09:12 AM', user: 'Vishal (Super Admin)', action: 'DELETE_MEMBER', entity: 'Member: Suresh K.', ip: '192.168.1.1' },
            ].map((log, i) => (
              <TableRow key={i}>
                <TableCell className="text-xs text-gray-500">{log.time}</TableCell>
                <TableCell className="font-bold text-gray-900">{log.user}</TableCell>
                <TableCell>
                  <code className="px-2 py-0.5 bg-gray-100 text-[10px] font-black rounded uppercase text-gray-600 border border-gray-200">{log.action}</code>
                </TableCell>
                <TableCell className="text-xs text-gray-700">{log.entity}</TableCell>
                <TableCell className="text-[10px] font-mono text-gray-400">{log.ip}</TableCell>
                <TableCell className="text-right">
                  <button className="text-[10px] font-bold text-[#5E4E99] hover:underline uppercase tracking-wide">View Diff</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="p-4 border-t border-gray-100 flex justify-center">
           <Button variant="outline" size="sm" className="w-full max-w-xs">Load More Logs</Button>
        </div>
      </Card>
    </div>
  );
};

export const DataBackupPanel = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Data & Backup</h2>
        <p className="text-sm text-gray-500">Manage database backups, data exports, and retention policies</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <Card className="p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-4 flex items-center gap-2"><History className="w-5 h-5 text-green-600" /> Automated Backups</h3>
            <div className="space-y-4">
               <div className="flex items-center justify-between">
                 <span className="text-sm text-gray-600">Daily Backups</span>
                 <Badge variant="Active">ACTIVE</Badge>
               </div>
               <div className="flex items-center justify-between">
                 <span className="text-sm text-gray-600">Last Backup Successful</span>
                 <span className="text-sm font-bold text-gray-900">6 hours ago</span>
               </div>
               <div className="flex items-center justify-between">
                 <span className="text-sm text-gray-600">Next Scheduled</span>
                 <span className="text-sm font-bold text-gray-400 italic">Tomorrow, 03:00 AM</span>
               </div>
               <Button className="w-full bg-[#5E4E99] text-white">Create Ad-hoc Backup</Button>
            </div>
         </Card>

         <Card className="p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-4 flex items-center gap-2"><Download className="w-5 h-5 text-blue-600" /> Bulk Data Export</h3>
            <div className="space-y-4">
               <p className="text-xs text-gray-500 leading-relaxed">Download a complete snapshot of all customer data, transactions, and system configuration in JSON or SQL format.</p>
               <div className="space-y-1">
                 <label className="text-[10px] font-bold text-gray-400 uppercase">Select Format</label>
                 <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none">
                    <option>SQL Dump (.sql.gz)</option>
                    <option>JSON Bundle (.json.zip)</option>
                    <option>CSV Archive (.csv.zip)</option>
                 </select>
               </div>
               <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50">Initiate Export</Button>
            </div>
         </Card>
      </div>

      <Card className="p-6 space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-4 flex items-center gap-2"><Database className="w-5 h-5 text-purple-600" /> Storage Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="space-y-4">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wider block">Production Database</label>
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-3">
                 <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">Host</span>
                    <span className="font-mono font-bold text-gray-900">db-prod.techfly.in</span>
                 </div>
                 <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">Version</span>
                    <span className="font-bold text-gray-900">PostgreSQL 16.2</span>
                 </div>
                 <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-bold uppercase">
                       <span className="text-gray-400">Disk Usage</span>
                       <span className="text-[#5E4E99]">64 GB / 100 GB</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                       <div className="h-full w-2/3 bg-[#5E4E99]" />
                    </div>
                 </div>
              </div>
           </div>
           <div className="space-y-4">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wider block">File Storage (S3)</label>
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-3">
                 <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">Region</span>
                    <span className="font-bold text-gray-900">ap-south-1 (Mumbai)</span>
                 </div>
                 <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">Bucket</span>
                    <span className="font-mono font-bold text-gray-900">techfly-assets-v1</span>
                 </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-bold uppercase">
                       <span className="text-gray-400">Storage Used</span>
                       <span className="text-blue-600">812 GB</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                       <div className="h-full w-4/5 bg-blue-500" />
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </Card>
    </div>
  );
};

export const IntegrationsPanel = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Integrations</h2>
          <p className="text-sm text-gray-500">Connect TechFly with external tools and services</p>
        </div>
        <Button variant="outline" className="gap-2 text-[#5E4E99] border-purple-100">
          <Plus className="w-4 h-4" /> Custom Integration
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { name: 'Slack', cat: 'Communication', connected: true, desc: 'Get alerts in #techfly-ops' },
          { name: 'Postmark', cat: 'Transactional Email', connected: true, desc: '99.9% delivery rate active' },
          { name: 'Sentry', cat: 'Error Tracking', connected: true, desc: 'Tracking production issues' },
          { name: 'Google Analytics', cat: 'Analytics', connected: false, desc: 'Track visitor behavior' },
          { name: 'HubSpot', cat: 'CRM', connected: false, desc: 'Sync customer data to CRM' },
          { name: 'Intercom', cat: 'Customer Support', connected: false, desc: 'Live chat and onboarding' },
        ].map((int) => (
          <Card key={int.name} className="p-5 space-y-4 hover:border-purple-200 transition-all cursor-pointer group">
             <div className="flex justify-between items-start">
                <div className="w-10 h-10 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center font-bold text-gray-400 text-xs">
                  {int.name.substring(0, 2).toUpperCase()}
                </div>
                {int.connected ? (
                  <div className="p-1 px-2 rounded-full bg-green-50 text-green-600 text-[8px] font-bold uppercase border border-green-100 flex items-center gap-1">
                    <CheckCircle2 className="w-2.5 h-2.5" /> ACTIVE
                  </div>
                ) : (
                  <div className="p-1 px-2 rounded-full bg-gray-50 text-gray-400 text-[8px] font-bold uppercase border border-gray-100">
                    DISCONNECTED
                  </div>
                )}
             </div>
             <div>
                <h4 className="font-bold text-gray-900 text-sm">{int.name}</h4>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none mt-1">{int.cat}</p>
             </div>
             <p className="text-xs text-gray-500 line-clamp-2 min-h-[2.5rem]">{int.desc}</p>
             <div className="pt-2">
                <Button variant="outline" size="sm" className={`w-full text-xs font-bold transition-all ${int.connected ? 'text-gray-400 hover:text-red-600 hover:border-red-100 hover:bg-red-50' : 'text-[#5E4E99] border-purple-100 hover:bg-purple-50 group-hover:bg-[#5E4E99] group-hover:text-white group-hover:border-[#5E4E99]'}`}>
                  {int.connected ? 'Configure' : 'Connect Now'}
                </Button>
             </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export const DangerZonePanel = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 border-b-4 border-red-500 w-fit pr-8 pb-1">Danger Zone</h2>
        <p className="text-sm text-gray-500 mt-2">Critical system actions. Proceed with extreme caution.</p>
      </div>

      <div className="space-y-4">
        <Card className="p-6 border-red-100 hover:bg-red-50/10 transition-colors">
           <div className="flex items-start justify-between">
              <div className="space-y-1">
                 <h4 className="text-sm font-bold text-red-700 flex items-center gap-2 uppercase tracking-wider"><ShieldAlert className="w-4 h-4" /> Maintenance Mode</h4>
                 <p className="text-xs text-gray-500 max-w-[480px]">Take the entire platform offline for updates. Existing users will see a "System Down for Maintenance" screen. API requests will return 503.</p>
              </div>
              <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-100 px-8 font-black text-xs uppercase tracking-widest">Enable</Button>
           </div>
        </Card>

        <Card className="p-6 border-red-100 hover:bg-red-50/10 transition-colors">
           <div className="flex items-start justify-between">
              <div className="space-y-1">
                 <h4 className="text-sm font-bold text-red-700 flex items-center gap-2 uppercase tracking-wider"><RefreshCw className="w-4 h-4" /> Clear System Cache</h4>
                 <p className="text-xs text-gray-500 max-w-[480px]">Flush all Redis caches, CDN assets, and temporary database views. May cause a temporary slowdown in performance for 5-10 minutes.</p>
              </div>
              <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-100 px-8 font-black text-xs uppercase tracking-widest">Flush Cache</Button>
           </div>
        </Card>

        <Card className="p-6 border-red-200 bg-red-50/50">
           <div className="flex items-start justify-between">
              <div className="space-y-2">
                 <h4 className="text-sm font-black text-red-900 flex items-center gap-2 uppercase tracking-tighter"><AlertTriangle className="w-4 h-4" /> RESET PLATFORM</h4>
                 <p className="text-xs text-red-700 max-w-[480px]">Permanently delete all customer data, transactions, and configurations. This action is irreversible and requires manual database unlocking.</p>
                 <div className="pt-2">
                    <label className="flex items-center gap-2 text-[10px] font-bold text-red-900 uppercase cursor-pointer">
                       <input type="checkbox" className="rounded border-red-300 text-red-600 focus:ring-red-500" /> I understand that this will delete all data permanently
                    </label>
                 </div>
              </div>
              <Button className="bg-red-600 hover:bg-red-700 text-white px-8 font-black text-xs uppercase tracking-widest shadow-lg shadow-red-200">Reset Data</Button>
           </div>
        </Card>
      </div>

       <div className="p-6 bg-gray-900 rounded-3xl text-white space-y-4">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-gray-800 rounded-lg"><Lock className="w-5 h-5 text-gray-400" /></div>
             <div>
                <h4 className="text-sm font-bold">System Super-Key Required</h4>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Security Level: Level 4 · Admin Auth Required</p>
             </div>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">Some actions in the Danger Zone require a hardware security key (YubiKey) or a one-time authorization from two Super Admins.</p>
       </div>
    </div>
  );
};
