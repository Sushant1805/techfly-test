'use client';
import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Save, Mail, MessageSquare, Bell, FileText, Send, CheckCircle2, AlertCircle, Trash2, Edit, Plus, Smartphone, Clock, Settings, Search, Layout, Wand2, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';

export const EmailConfigPanel = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Email Configuration</h2>
          <p className="text-sm text-gray-500">Configure SMTP or Amazon SES for outgoing emails</p>
        </div>
        <Button className="bg-[#5E4E99] hover:bg-[#4d3f82] text-white gap-2">
          <Save className="w-4 h-4" /> Save Configuration
        </Button>
      </div>

      <Card className="p-6 space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-4">Outgoing Email Server (SMTP)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">SMTP Host</label>
            <input type="text" defaultValue="smtp.sendgrid.net" className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">SMTP Port</label>
            <input type="text" defaultValue="587" className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Username / API Key</label>
            <input type="text" defaultValue="apikey" className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input type="password" defaultValue="••••••••••••••••" className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Encryption</label>
            <div className="flex gap-4">
              {['TLS', 'SSL', 'None'].map(e => (
                <label key={e} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input type="radio" name="encryption" defaultChecked={e === 'TLS'} className="text-[#5E4E99] focus:ring-[#5E4E99]" /> {e}
                </label>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 space-y-4 border-l-4 border-l-blue-500 bg-blue-50/30">
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-3">
             <div className="p-2 bg-white rounded-lg shadow-sm font-bold text-blue-600"><Send className="w-4 h-4" /></div>
             <div>
               <p className="text-sm font-bold text-gray-900">Test Email Connection</p>
               <p className="text-xs text-gray-500">Send a test email to verify your SMTP settings.</p>
             </div>
           </div>
           <div className="flex gap-2">
             <input type="email" placeholder="test@techfly.in" className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs outline-none bg-white" />
             <Button variant="outline" size="sm" className="bg-white border-blue-200 text-blue-600">Send Test</Button>
           </div>
        </div>
      </Card>
    </div>
  );
};

export const SmsWhatsappPanel = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">SMS & WhatsApp</h2>
        <p className="text-sm text-gray-500">Configure messaging providers for alerts and communications</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <Card className="p-6 space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
               <div className="flex items-center gap-3">
                 <div className="p-2 bg-[#25D366] text-white rounded-lg"><MessageSquare className="w-5 h-5" /></div>
                 <h3 className="text-lg font-semibold text-gray-900">WhatsApp API</h3>
               </div>
               <Badge variant="Active">CONNECTED</Badge>
            </div>
            <div className="space-y-4">
               <div className="space-y-1">
                 <label className="text-[10px] font-bold text-gray-400 uppercase">Provider</label>
                 <p className="text-sm font-bold text-gray-900">Meta WhatsApp Business API</p>
               </div>
               <div className="space-y-1">
                 <label className="text-[10px] font-bold text-gray-400 uppercase">Phone Number ID</label>
                 <p className="text-xs font-mono text-gray-600">102938475630291</p>
               </div>
               <Button variant="outline" className="w-full">Configure Templates</Button>
            </div>
         </Card>

         <Card className="p-6 space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
               <div className="flex items-center gap-3">
                 <div className="p-2 bg-gray-900 text-white rounded-lg"><Smartphone className="w-5 h-5" /></div>
                 <h3 className="text-lg font-semibold text-gray-900">SMS Gateway</h3>
               </div>
               <Badge variant="default">NOT CONNECTED</Badge>
            </div>
            <div className="space-y-4">
               <div className="space-y-1">
                 <label className="text-sm font-medium text-gray-700">Select Provider</label>
                 <select className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99] text-sm font-bold">
                   <option>Twilio</option>
                   <option>TextLocal (India)</option>
                   <option>MSG91</option>
                 </select>
               </div>
               <Button variant="outline" className="w-full text-[#5E4E99] border-purple-100 hover:bg-purple-50">Setup Provider →</Button>
            </div>
         </Card>
      </div>

      <Card className="p-6 space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-4">Communication Defaults</h3>
        <div className="space-y-4">
           {[
             { label: 'Priority for alerts', desc: 'Default channel for urgent notifications', options: ['WhatsApp', 'SMS', 'Email'] },
             { label: 'Message retry policy', desc: 'Number of times to retry failed messages', options: ['1 Retries', '3 Retries', '5 Retries'] },
           ].map(item => (
             <div key={item.label} className="grid grid-cols-2 gap-8 items-center">
               <div>
                  <h4 className="text-sm font-bold text-gray-900">{item.label}</h4>
                  <p className="text-xs text-gray-400">{item.desc}</p>
               </div>
               <select className="border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99] text-sm">
                 {item.options.map(o => <option key={o}>{o}</option>)}
               </select>
             </div>
           ))}
        </div>
      </Card>
    </div>
  );
};

export const NotificationRulesPanel = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Notification Rules</h2>
        <p className="text-sm text-gray-500">Control when and how notifications are sent to customers and team members</p>
      </div>

      <Card className="overflow-hidden">
         <div className="overflow-x-auto">
           <table className="w-full text-sm text-left">
             <thead>
               <tr className="bg-gray-50 text-gray-400 text-[10px] font-bold uppercase tracking-widest border-b border-gray-100">
                 <th className="px-6 py-4">Event Trigger</th>
                 <th className="px-6 py-4 text-center">Email</th>
                 <th className="px-6 py-4 text-center">In-App</th>
                 <th className="px-6 py-4 text-center">WhatsApp</th>
                 <th className="px-6 py-4 text-right">Settings</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-50">
               {[
                 { event: 'New Customer Signup', email: true, inApp: true, wa: false, cat: 'CUSTOMER' },
                 { event: 'Payment Success', email: true, inApp: true, wa: true, cat: 'CUSTOMER' },
                 { event: 'Subscription Expiring (3 days)', email: true, inApp: false, wa: true, cat: 'BILLING' },
                 { event: 'Failed Payment Attempt', email: true, inApp: true, wa: true, cat: 'BILLING' },
                 { event: 'Low Credits Alert', email: true, inApp: true, wa: false, cat: 'SYSTEM' },
                 { event: 'Manual Payout Initiated', email: true, inApp: true, wa: false, cat: 'PAYOUT' },
               ].map((rule, i) => (
                 <React.Fragment key={i}>
                   {i === 0 || rule.cat !== [
                    { event: 'New Customer Signup', email: true, inApp: true, wa: false, cat: 'CUSTOMER' },
                    { event: 'Payment Success', email: true, inApp: true, wa: true, cat: 'CUSTOMER' },
                    { event: 'Subscription Expiring (3 days)', email: true, inApp: false, wa: true, cat: 'BILLING' },
                    { event: 'Failed Payment Attempt', email: true, inApp: true, wa: true, cat: 'BILLING' },
                    { event: 'Low Credits Alert', email: true, inApp: true, wa: false, cat: 'SYSTEM' },
                    { event: 'Manual Payout Initiated', email: true, inApp: true, wa: false, cat: 'PAYOUT' },
                   ][i-1].cat && (
                     <tr className="bg-gray-50/50">
                       <td colSpan={5} className="px-6 py-1.5 text-[9px] font-black text-gray-400 uppercase tracking-tighter">{rule.cat}</td>
                     </tr>
                   )}
                   <tr className="hover:bg-gray-50/30 transition-colors">
                     <td className="px-6 py-4">
                       <p className="font-bold text-gray-700">{rule.event}</p>
                     </td>
                     <td className="px-6 py-4">
                       <div className="flex justify-center">
                         <div className={`w-8 h-4 rounded-full p-0.5 ${rule.email ? 'bg-[#5E4E99]' : 'bg-gray-200'}`}>
                           <div className={`w-3 h-3 bg-white rounded-full ${rule.email ? 'translate-x-4' : ''}`} />
                         </div>
                       </div>
                     </td>
                     <td className="px-6 py-4">
                       <div className="flex justify-center">
                         <div className={`w-8 h-4 rounded-full p-0.5 ${rule.inApp ? 'bg-[#5E4E99]' : 'bg-gray-200'}`}>
                           <div className={`w-3 h-3 bg-white rounded-full ${rule.inApp ? 'translate-x-4' : ''}`} />
                         </div>
                       </div>
                     </td>
                     <td className="px-6 py-4">
                       <div className="flex justify-center">
                         <div className={`w-8 h-4 rounded-full p-0.5 ${rule.wa ? 'bg-[#5E4E99]' : 'bg-gray-200'}`}>
                           <div className={`w-3 h-3 bg-white rounded-full ${rule.wa ? 'translate-x-4' : ''}`} />
                         </div>
                       </div>
                     </td>
                     <td className="px-6 py-4 text-right">
                       <button className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400"><Settings className="w-4 h-4" /></button>
                     </td>
                   </tr>
                 </React.Fragment>
               ))}
             </tbody>
           </table>
         </div>
      </Card>
    </div>
  );
};

export const EmailTemplatesPanel = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Email Templates</h2>
          <p className="text-sm text-gray-500">Design and manage automated emails sent by the system</p>
        </div>
        <Button className="bg-[#5E4E99] hover:bg-[#4d3f82] text-white gap-2">
          <Plus className="w-4 h-4" /> New Template
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-4 space-y-4 md:col-span-1 h-fit">
           <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
             <input type="text" placeholder="Search templates..." className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-[#5E4E99]" />
           </div>
           <div className="space-y-1">
             {[
               { name: 'Welcome Email', cat: 'Onboarding', active: true },
               { name: 'Password Reset', cat: 'Auth', active: false },
               { name: 'Invoice Generated', cat: 'Billing', active: false },
               { name: 'Subscription Expired', cat: 'Billing', active: false },
               { name: 'Payment Success', cat: 'Billing', active: false },
               { name: 'Weekly Report', cat: 'Analytics', active: false },
             ].map(t => (
               <button key={t.name} className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between group transition-colors ${t.active ? 'bg-purple-50 text-[#5E4E99]' : 'hover:bg-gray-50 text-gray-600'}`}>
                 <div className="space-y-0.5">
                    <p className="text-xs font-bold leading-none">{t.name}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter opacity-70">{t.cat}</p>
                 </div>
                 <ArrowRight className={`w-3 h-3 transition-opacity ${t.active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
               </button>
             ))}
           </div>
        </Card>

        <Card className="md:col-span-2 overflow-hidden flex flex-col h-[600px]">
           <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layout className="w-4 h-4 text-gray-400" />
                <h4 className="text-sm font-bold text-gray-900">Editor — Welcome Email</h4>
              </div>
              <div className="flex gap-2">
                 <Button variant="outline" size="sm">Preview</Button>
                 <Button className="bg-[#5E4E99] text-white" size="sm">Save</Button>
              </div>
           </div>

           <div className="bg-gray-50 flex-1 grid grid-cols-1 md:grid-cols-2">
              <div className="p-6 space-y-4 bg-white border-r border-gray-100">
                 <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Subject Line</label>
                    <input type="text" defaultValue="Welcome to EzzyCoach, {{customer_name}}! 🚀" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs font-bold outline-none focus:border-[#5E4E99]" />
                 </div>
                 <div className="space-y-1">
                    <div className="flex justify-between items-center">
                       <label className="text-[10px] font-bold text-gray-400 uppercase">Email Body (HTML/Markdown)</label>
                       <button className="text-[10px] text-[#5E4E99] font-bold gap-1 flex items-center"><Wand2 className="w-3 h-3" /> Improve with AI</button>
                    </div>
                    <textarea 
                      className="w-full h-80 border border-gray-200 rounded-lg px-3 py-2 text-xs font-mono bg-gray-50 outline-none focus:border-[#5E4E99] resize-none"
                      defaultValue={`Hi {{customer_name}},\n\nWelcome to EzzyCoach! We're excited to have you on board.\n\nYou can now start managing your coaching institute more efficiently.\n\nHere are your primary login details:\nDashboard: https://portal.ezzycoach.com\nUser: {{email}}\n\nGet started with our 2-min guide: {{guide_link}}\n\nBest,\nTechFly Team`}
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Dynamic Tags</label>
                    <div className="flex flex-wrap gap-1.5">
                       {['{{customer_name}}', '{{email}}', '{{plan_name}}', '{{portal_url}}', '{{support_email}}'].map(tag => (
                         <span key={tag} className="px-2 py-0.5 bg-gray-100 border border-gray-200 rounded text-[9px] font-mono text-gray-600 cursor-pointer hover:bg-white hover:border-[#5E4E99]">{tag}</span>
                       ))}
                    </div>
                 </div>
              </div>

              <div className="p-12 overflow-y-auto">
                 <div className="bg-white shadow-xl rounded-xl border border-gray-100 max-w-[400px] mx-auto min-h-full">
                    <div className="p-6 border-b border-gray-50 flex justify-center">
                       <div className="w-8 h-8 bg-[#5E4E99] rounded-lg text-white font-black flex items-center justify-center text-xs">TF</div>
                    </div>
                    <div className="p-8 space-y-6">
                       <h1 className="text-lg font-bold text-gray-900">Welcome to EzzyCoach, Rahul! 🚀</h1>
                       <div className="space-y-4 text-xs text-gray-600 leading-relaxed">
                          <p>Hi Rahul,</p>
                          <p>Welcome to EzzyCoach! We're excited to have you on board.</p>
                          <p>You can now start managing your coaching institute more efficiently.</p>
                          <div className="p-4 bg-gray-50 rounded-xl space-y-1">
                             <p><strong>Dashboard:</strong> portal.ezzycoach.com</p>
                             <p><strong>User:</strong> rahul@institute.com</p>
                          </div>
                          <Button className="w-full bg-[#5E4E99] text-white font-bold py-3 mt-4">Go to Dashboard</Button>
                       </div>
                    </div>
                    <div className="p-6 bg-gray-50 border-t border-gray-50 text-center">
                       <p className="text-[9px] text-gray-400 font-bold uppercase">TechFly Technologies Pvt Ltd</p>
                       <p className="text-[8px] text-gray-400 mt-1">Pune, India · Unsubscribe</p>
                    </div>
                 </div>
              </div>
           </div>
        </Card>
      </div>
    </div>
  );
};
