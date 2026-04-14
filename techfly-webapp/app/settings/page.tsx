'use client';
import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('Company Profile');

  const tabs = [
    'Company Profile',
    'Billing & Payments',
    'Email Templates',
    'Notifications',
    'API & Integrations',
    'Danger Zone'
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 max-w-[1200px] mx-auto pb-12">
      {/* Left NAV */}
      <div className="md:col-span-3">
        <h2 className="text-xl font-bold text-gray-900 mb-4 px-3">Settings</h2>
        <nav className="space-y-1">
          {tabs.map((tab) => (
             <button
              key={tab}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === tab ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'} ${tab === 'Danger Zone' && activeTab !== tab ? '!text-red-500 hover:!bg-red-50' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Right Content */}
      <div className="md:col-span-9">
        {activeTab === 'Company Profile' && (
          <Card className="p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Company Profile</h3>
            <div className="space-y-6 max-w-lg">
              <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center border border-dashed border-gray-300">
                  <span className="text-gray-400 text-xs">Logo</span>
                </div>
                <Button variant="outline" size="sm">Upload new</Button>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Company Name</label>
                <input type="text" defaultValue="TechFly Solutions" className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Support Email</label>
                  <input type="email" defaultValue="support@techfly.in" className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Support Phone</label>
                  <input type="text" defaultValue="+91 8000000000" className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">GST Number</label>
                <input type="text" defaultValue="27AAACT0000A1Z5" className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]" />
              </div>

              <div className="pt-4 border-t border-gray-100">
                <Button>Save Changes</Button>
              </div>
            </div>
          </Card>
        )}

        {activeTab === 'Billing & Payments' && (
          <div className="space-y-6">
            <Card className="p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Payment Gateway</h3>
              <p className="text-sm text-gray-500 mb-6">Manage how you accept subscription payments from coaching centers.</p>
              
              <div className="flex items-center justify-between p-4 border border-green-200 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded shadow-sm flex items-center justify-center font-bold text-blue-600 text-xs">
                    Razorpay
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-900">Connected to Razorpay</h4>
                    <p className="text-xs text-green-700">Account: acc_Lkxxxxx</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="bg-white">Configure</Button>
              </div>
            </Card>

            <Card className="p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Invoicing Elements</h3>
              <div className="space-y-4 max-w-sm">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Invoice Prefix</label>
                  <input type="text" defaultValue="INV-2026-" className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">GST %</label>
                  <input type="text" defaultValue="18" className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]" />
                </div>
                <Button size="sm">Save Configuration</Button>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'Notifications' && (
          <Card className="p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6">System Notifications</h3>
            <div className="space-y-4 max-w-xl">
              {[
                { title: 'New customer signup alert', enabled: true },
                { title: 'Subscription renewal reminder (7 days before)', enabled: true },
                { title: 'Payment received alert', enabled: true },
                { title: 'Overdue payment alert', enabled: false },
                { title: 'Trial expiring alert (3 days before)', enabled: true },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <span className="text-sm font-medium text-gray-700">{item.title}</span>
                  <div className={`w-10 h-6 rounded-full p-1 transition-colors cursor-pointer ${item.enabled ? 'bg-[#5E4E99]' : 'bg-gray-300'}`}>
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${item.enabled ? 'translate-x-4' : 'translate-x-0'}`} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {activeTab === 'Email Templates' && (
          <div className="space-y-6">
            <Card className="p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Email Templates</h3>
              <p className="text-sm text-gray-500 mb-6">Customize the emails sent to your customers at key lifecycle events.</p>
              <div className="space-y-3">
                {[
                  { name: 'Welcome Email', trigger: 'On customer signup', status: 'Active' },
                  { name: 'Trial Started', trigger: 'When trial begins', status: 'Active' },
                  { name: 'Trial Expiring Soon', trigger: '3 days before trial ends', status: 'Active' },
                  { name: 'Invoice Generated', trigger: 'On invoice creation', status: 'Active' },
                  { name: 'Payment Received', trigger: 'On successful payment', status: 'Active' },
                  { name: 'Payment Failed', trigger: 'On payment failure', status: 'Inactive' },
                  { name: 'Subscription Renewed', trigger: 'On renewal', status: 'Active' },
                  { name: 'Subscription Cancelled', trigger: 'On cancellation', status: 'Inactive' },
                ].map((tpl, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{tpl.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{tpl.trigger}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${tpl.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'}`}>{tpl.status}</span>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Sender Configuration</h3>
              <div className="space-y-4 max-w-lg">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">From Name</label>
                  <input type="text" defaultValue="TechFly Team" className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">From Email</label>
                  <input type="email" defaultValue="noreply@techfly.in" className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Reply-To Email</label>
                  <input type="email" defaultValue="support@techfly.in" className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]" />
                </div>
                <Button size="sm">Save Configuration</Button>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'API & Integrations' && (
          <div className="space-y-6">
            <Card className="p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-2">API Keys</h3>
              <p className="text-sm text-gray-500 mb-6">Use these keys to integrate TechFly with external tools and your own systems.</p>
              <div className="space-y-4">
                {[
                  { name: 'Production API Key', key: 'tf_live_sk_••••••••••••••••••••Xt9z', created: '12 Jan 2026', lastUsed: '2 hours ago' },
                  { name: 'Test API Key', key: 'tf_test_sk_••••••••••••••••••••Kp4m', created: '12 Jan 2026', lastUsed: '5 days ago' },
                ].map((k, i) => (
                  <div key={i} className="p-4 rounded-lg border border-gray-100 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-gray-800">{k.name}</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Copy</Button>
                        <Button variant="outline" size="sm">Regenerate</Button>
                      </div>
                    </div>
                    <code className="text-xs text-gray-500 font-mono bg-gray-50 px-3 py-1.5 rounded block">{k.key}</code>
                    <p className="text-xs text-gray-400">Created: {k.created} · Last used: {k.lastUsed}</p>
                  </div>
                ))}
                <Button variant="outline" size="sm">+ Generate New Key</Button>
              </div>
            </Card>

            <Card className="p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Connected Integrations</h3>
              <p className="text-sm text-gray-500 mb-6">Connect third-party tools to automate your workflow.</p>
              <div className="space-y-3">
                {[
                  { name: 'Razorpay', desc: 'Payment gateway for subscription billing', connected: true },
                  { name: 'WhatsApp Business', desc: 'Send automated WhatsApp messages to leads', connected: false },
                  { name: 'Slack', desc: 'Get notified about key events in your Slack workspace', connected: true },
                  { name: 'Google Sheets', desc: 'Export customer & revenue data automatically', connected: false },
                  { name: 'Zapier', desc: 'Connect with 5,000+ apps via Zapier', connected: false },
                ].map((intg, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-gray-100">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{intg.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{intg.desc}</p>
                    </div>
                    <Button variant={intg.connected ? 'outline' : 'primary'} size="sm">
                      {intg.connected ? 'Disconnect' : 'Connect'}
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Webhooks</h3>
              <p className="text-sm text-gray-500 mb-4">Receive real-time HTTP POST notifications for events in your account.</p>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Webhook URL</label>
                  <input type="url" placeholder="https://your-server.com/webhook" className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99] font-mono text-sm" />
                </div>
                <div className="flex gap-2">
                  <Button size="sm">Save Webhook</Button>
                  <Button variant="outline" size="sm">Test Webhook</Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'Danger Zone' && (
          <div className="space-y-6">
            <Card className="p-8 border border-red-100">
              <h3 className="text-lg font-bold text-red-600 mb-2">Export All Data</h3>
              <p className="text-sm text-gray-500 mb-4">Download a full export of all customers, subscriptions, invoices, and activity logs as a ZIP file.</p>
              <Button variant="outline" size="sm" className="border-red-200 text-red-600 hover:bg-red-50">Export Data (.zip)</Button>
            </Card>

            <Card className="p-8 border border-red-100">
              <h3 className="text-lg font-bold text-red-600 mb-2">Revoke All API Keys</h3>
              <p className="text-sm text-gray-500 mb-4">Immediately invalidate all existing API keys. This will break any active integrations using the old keys.</p>
              <Button variant="outline" size="sm" className="border-red-200 text-red-600 hover:bg-red-50">Revoke All Keys</Button>
            </Card>

            <Card className="p-8 border-2 border-red-200 bg-red-50">
              <h3 className="text-lg font-bold text-red-700 mb-2">Delete Account</h3>
              <p className="text-sm text-red-600 mb-1">This will permanently delete your TechFly account, all customer records, subscriptions, and billing history.</p>
              <p className="text-xs font-semibold text-red-500 mb-5">⚠ This action is irreversible. All data will be lost.</p>
              <div className="space-y-3 max-w-sm">
                <div>
                  <label className="text-sm font-medium text-red-700 block mb-1">Type <strong>DELETE MY ACCOUNT</strong> to confirm</label>
                  <input type="text" placeholder="DELETE MY ACCOUNT" className="w-full border border-red-300 rounded-lg px-3 py-2 outline-none focus:border-red-500 bg-white text-sm" />
                </div>
                <Button variant="outline" size="sm" className="border-red-400 text-red-700 hover:bg-red-100 font-bold">Permanently Delete Account</Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
