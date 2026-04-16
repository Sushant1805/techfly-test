'use client';
import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { mockFeatureFlags } from '../mockData';
import { Save, ToggleLeft as Toggle, Globe, Mail, CheckCircle2, FlaskConical, Code, Key, Plus, Copy, Trash2, Send, Wand2, Calculator, Database } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';

export const EzzyCoachConfigPanel = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">EzzyCoach Configuration</h2>
          <p className="text-sm text-gray-500">Global settings that apply to all EzzyCoach customer accounts</p>
        </div>
        <Button className="bg-[#5E4E99] hover:bg-[#4d3f82] text-white gap-2">
          <Save className="w-4 h-4" /> Save Config
        </Button>
      </div>

      <Card className="p-6 space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-4">Default Account Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Default Plan for New Signups</label>
            <select className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]">
              <option>Free</option>
              <option>Basic</option>
              <option>Pro</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Default Trial Duration (days)</label>
            <input type="number" defaultValue="14" className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]" />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg border border-gray-100 bg-gray-50/50">
            <span className="text-sm font-medium text-gray-700">Auto-enable trial on signup</span>
            <div className="w-10 h-6 bg-[#5E4E99] rounded-full p-1 cursor-pointer">
              <div className="w-4 h-4 bg-white rounded-full translate-x-4" />
            </div>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg border border-gray-100 bg-gray-50/50">
            <span className="text-sm font-medium text-gray-700">Welcome Email</span>
            <div className="w-10 h-6 bg-[#5E4E99] rounded-full p-1 cursor-pointer">
              <div className="w-4 h-4 bg-white rounded-full translate-x-4" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Default Language</label>
            <select className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]">
              <option>English (India)</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Default Currency</label>
            <select className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]">
              <option>INR ₹</option>
              <option>USD $</option>
            </select>
          </div>
        </div>
      </Card>

      <Card className="p-6 space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-4">Platform Limits (Global)</h3>
        <div className="space-y-6">
          <div className="grid grid-cols-4 gap-4 items-end bg-gray-50 p-4 rounded-xl text-[10px] font-bold text-gray-400 uppercase tracking-widest px-6">
            <div className="col-span-1">Plan</div>
            <div>Max Students</div>
            <div>Max Batches</div>
            <div>Max Teachers</div>
          </div>
          {[
            { name: 'Free', students: 50, batches: 1, teachers: 2 },
            { name: 'Basic', students: 200, batches: 5, teachers: 5 },
            { name: 'Pro', students: 0, batches: 0, teachers: 0, unlimited: true },
          ].map((plan) => (
            <div key={plan.name} className="grid grid-cols-4 gap-4 items-center px-6">
              <div className="col-span-1 font-bold text-gray-900">{plan.name}</div>
              <input type="number" defaultValue={plan.students} className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-[#5E4E99]" />
              <input type="number" defaultValue={plan.batches} className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-[#5E4E99]" />
              <input type="number" defaultValue={plan.teachers} className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-[#5E4E99]" />
            </div>
          ))}
          <p className="text-xs text-amber-600 font-medium px-6">Note: 0 = Unlimited. Changing these limits will affect all existing customers immediately.</p>
        </div>
      </Card>

      <Card className="p-6 space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-4 flex items-center gap-2"><Wand2 className="w-5 h-5 text-purple-600" /> AI Features Config</h3>
        <div className="space-y-4">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">AI Timetable Generator for</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]">
                  <option>Pro Plan only</option>
                  <option>Basic + Pro</option>
                  <option>All Plans</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Monthly AI Usage Limit</label>
                <div className="flex items-center gap-2">
                  <input type="number" defaultValue="50" className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]" />
                  <span className="text-xs text-gray-500 whitespace-nowrap">generations</span>
                </div>
              </div>
           </div>
           <div className="p-4 bg-purple-50 rounded-xl border border-purple-100 flex items-center justify-between">
             <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm font-bold text-[#5E4E99] text-xs">AI Model</div>
                <span className="text-sm font-mono text-purple-900">claude-3-5-sonnet-20241022</span>
             </div>
             <Badge variant="purple" className="text-[10px]">FIXED</Badge>
           </div>
        </div>
      </Card>

      <Card className="p-6 space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-4 flex items-center gap-2"><Database className="w-5 h-5 text-blue-600" /> Data Retention</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Student data after deletion</label>
            <select className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]">
              <option>90 days</option>
              <option>30 days</option>
              <option>1 year</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Fee records retention</label>
            <select className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]">
              <option>7 years (Legal)</option>
              <option>2 years</option>
            </select>
          </div>
        </div>
      </Card>
    </div>
  );
};

export const FeatureFlagsPanel = () => {
  return (
    <div className="space-y-6">
       <div>
        <h2 className="text-2xl font-bold text-gray-900">Feature Flags</h2>
        <p className="text-sm text-gray-500">Enable or disable features across the platform. Changes apply immediately.</p>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-400 text-[10px] font-bold uppercase tracking-widest border-b border-gray-100">
                <th className="px-6 py-4">Feature</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Available For</th>
                <th className="px-6 py-4">Last Changed</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {mockFeatureFlags.map((flag) => (
                <tr key={flag.id} className="hover:bg-gray-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-bold text-gray-900">{flag.name}</p>
                      <p className="text-xs text-gray-400 font-mono tracking-tighter">{flag.key}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                       <div className={`w-8 h-4 rounded-full p-0.5 transition-colors cursor-pointer ${flag.status ? 'bg-green-500' : 'bg-gray-300'}`}>
                         <div className={`w-3 h-3 bg-white rounded-full transition-transform ${flag.status ? 'translate-x-4' : 'translate-x-0'}`} />
                       </div>
                       <span className={`text-[10px] font-black uppercase ${flag.status ? 'text-green-600' : 'text-gray-400'}`}>{flag.status ? 'ON' : 'OFF'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={flag.availableFor === 'Coming Soon' ? 'Inactive' : flag.availableFor === 'Beta' ? 'warning' : 'info'}>
                      {flag.availableFor}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500">{flag.lastChangedAt || '—'}</td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="outline" size="sm">Edit</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export const ApiWebhooksPanel = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">API & Webhooks</h2>
        <p className="text-sm text-gray-500">Manage API access and webhook endpoints for integrations</p>
      </div>

      <Card className="p-6 space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <h3 className="text-lg font-semibold text-gray-900">API Keys</h3>
          <Button variant="outline" size="sm" className="text-[#5E4E99] border-purple-100 bg-purple-50 font-bold gap-2">
            <Plus className="w-4 h-4" /> New API Key
          </Button>
        </div>
        
        <div className="space-y-4">
           <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex flex-col gap-3">
             <div className="flex justify-between items-start">
               <div>
                 <p className="text-sm font-bold text-gray-900 leading-none">Internal Dashboard Key</p>
                 <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1">Status: Active · Read-only</p>
               </div>
               <div className="flex gap-2">
                 <button className="p-2 hover:bg-white rounded-lg text-gray-400 transition-white"><Copy className="w-4 h-4" /></button>
                 <button className="p-2 hover:bg-white rounded-lg text-gray-400 transition-white font-bold text-xs uppercase text-[#5E4E99]">Regenerate</button>
               </div>
             </div>
             <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-gray-100 font-mono text-sm text-gray-500">
               <span>sk-techfly-prod-</span>
               <span>••••••••••••••••••••••••</span>
               <span className="text-gray-900 font-bold tracking-normal">x4m2</span>
             </div>
             <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase">
               <span>Created: Jan 1, 2026</span>
               <span>Last used: 12 minutes ago</span>
             </div>
           </div>
        </div>
      </Card>

      <Card className="p-6 space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <h3 className="text-lg font-semibold text-gray-900">Webhook Endpoints</h3>
          <Button variant="outline" size="sm" className="text-[#5E4E99] border-purple-100 bg-purple-50 font-bold gap-2">
            <Plus className="w-4 h-4" /> Add Webhook
          </Button>
        </div>

        <div className="flex flex-col items-center justify-center p-12 border border-dashed border-gray-100 rounded-xl bg-gray-50/30">
           <div className="w-12 h-12 bg-white rounded-xl shadow-soft flex items-center justify-center text-gray-300 mb-4">
             <Globe className="w-6 h-6" />
           </div>
           <p className="text-sm font-bold text-gray-900">No webhooks configured</p>
           <p className="text-xs text-gray-400 text-center mt-1 max-w-[240px]">Get real-time updates for customers, subscriptions, and payments.</p>
           <Button variant="outline" size="sm" className="mt-6">Create your first webhook</Button>
        </div>
      </Card>

      <Card className="p-6 flex items-center justify-between border-l-4 border-l-[#5E4E99]">
         <div>
           <h3 className="text-sm font-bold text-gray-900">Developer Documentation</h3>
           <p className="text-xs text-gray-500">View our full API reference and integration guides.</p>
         </div>
         <Button variant="outline" size="sm" className="gap-2">Explore Docs <Code className="w-4 h-4" /></Button>
      </Card>
    </div>
  );
};
