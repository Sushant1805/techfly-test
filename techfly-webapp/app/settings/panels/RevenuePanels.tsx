'use client';
import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Save, Receipt, CreditCard, Layout, CheckCircle2, AlertCircle, Trash2, Edit, Plus, Smartphone, QrCode, Banknote, Building2 } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export const TaxGstPanel = () => {
  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tax & GST</h2>
          <p className="text-sm text-gray-500">Configure tax settings for invoices and billing</p>
        </div>
        <Button className="bg-[#5E4E99] hover:bg-[#4d3f82] text-white gap-2">
          <Save className="w-4 h-4" /> Save Settings
        </Button>
      </div>

      <Card className="p-6 space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-4">TechFly Tax Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">GSTIN</label>
            <div className="flex gap-2">
              <input type="text" defaultValue="27AABCT1234M1Z5" className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]" />
              <Button variant="outline" size="sm">Edit</Button>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">PAN Number</label>
            <input type="text" defaultValue="AABCT1234M" className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 outline-none" readOnly />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">State of Registration</label>
            <input type="text" defaultValue="Maharashtra" className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 outline-none" readOnly />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">GST Filing Frequency</label>
            <select className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]">
              <option>Quarterly</option>
              <option>Monthly</option>
            </select>
          </div>
        </div>
      </Card>

      <Card className="p-6 space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-4">Invoice Tax Config</h3>
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="flex items-center gap-3">
               <div className="p-2 bg-white rounded-lg shadow-sm"><Receipt className="w-5 h-5 text-[#5E4E99]" /></div>
               <div>
                  <h4 className="text-sm font-bold text-gray-900">Apply GST on invoices</h4>
                  <p className="text-xs text-gray-500">Enable automatic GST calculation for all customer billing.</p>
               </div>
            </div>
            <div className="w-10 h-6 bg-[#5E4E99] rounded-full p-1 cursor-pointer">
              <div className="w-4 h-4 bg-white rounded-full translate-x-4" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Default GST Rate (%)</label>
              <input type="number" defaultValue="18" className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]" />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">GST Type Distribution</label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="gstType" checked className="text-[#5E4E99] focus:ring-[#5E4E99]" />
                <span className="text-sm text-gray-700">Auto-detect based on customer's state</span>
              </label>
              <div className="grid grid-cols-3 gap-2 p-3 bg-gray-50 rounded-lg">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">CGST</span>
                  <p className="text-sm font-bold text-gray-900">9%</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">SGST</span>
                  <p className="text-sm font-bold text-gray-900">9%</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">IGST</span>
                  <p className="text-sm font-bold text-gray-900">18%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export const PaymentGatewaysPanel = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Payment Gateways</h2>
        <p className="text-sm text-gray-500">Configure payment methods for customer subscription billing</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { name: 'Razorpay', status: 'Not Connected', desc: 'Accept UPI, Cards, NetBanking', icon: 'RZP' },
          { name: 'Instamojo', status: 'Not Connected', desc: 'Accept UPI, Cards', icon: 'IMO' },
        ].map((gw) => (
          <Card key={gw.name} className="p-6 space-y-4 hover:border-purple-200 transition-all cursor-pointer group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-8 bg-white border border-gray-100 rounded flex items-center justify-center font-black text-[#1F2937] text-[10px] tracking-tighter">
                  {gw.icon}
                </div>
                <div>
                   <h4 className="font-bold text-gray-900">{gw.name}</h4>
                   <div className="flex items-center gap-1.5">
                     <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                     <span className="text-xs text-gray-400 font-medium">{gw.status}</span>
                   </div>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500">{gw.desc}</p>
            <Button variant="outline" className="w-full text-[#5E4E99] border-purple-100 hover:bg-purple-50 group-hover:bg-[#5E4E99] group-hover:text-white group-hover:border-[#5E4E99] transition-all">Connect {gw.name} →</Button>
          </Card>
        ))}
      </div>

      <Card className="p-6 space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-3">
            <Banknote className="w-6 h-6 text-green-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Manual / Offline Payments</h3>
              <p className="text-xs text-gray-500">Status: ● Active (default)</p>
            </div>
          </div>
          <Button variant="outline" size="sm">Configure</Button>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Accepted Manual Methods</label>
            <div className="flex gap-6">
              {['Bank Transfer', 'UPI', 'Cheque'].map(m => (
                <label key={m} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-[#5E4E99]" /> {m}
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <div className="space-y-4">
               <h4 className="flex items-center gap-2 text-sm font-bold text-gray-900"><Building2 className="w-4 h-4" /> Bank Account Details</h4>
               <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Account Name</label>
                    <p className="text-sm font-medium text-gray-700">TechFly Technologies Pvt. Ltd.</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Bank Name & Branch</label>
                    <p className="text-sm font-medium text-gray-700">HDFC Bank, Baner, Pune</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Account Number</label>
                      <p className="text-sm font-medium text-gray-700 line-clamp-1">50100123456789</p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">IFSC Code</label>
                      <p className="text-sm font-medium text-gray-700">HDFC0001234</p>
                    </div>
                  </div>
               </div>
            </div>
            <div className="space-y-4">
               <h4 className="flex items-center gap-2 text-sm font-bold text-gray-900"><Smartphone className="w-4 h-4" /> UPI Payment</h4>
               <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">UPI ID</label>
                  <p className="text-sm font-medium text-gray-700">techfly@hdfcbank</p>
               </div>
               <div className="w-24 h-24 bg-white border border-gray-100 rounded-lg flex items-center justify-center p-1">
                 <QrCode className="w-full h-full text-gray-300" />
               </div>
               <p className="text-[10px] text-gray-400 italic">QR code will be automatically generated on invoices.</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export const InvoiceTemplatesPanel = () => {
  return (
    <div className="space-y-6">
       <div>
        <h2 className="text-2xl font-bold text-gray-900">Invoice Templates</h2>
        <p className="text-sm text-gray-500">Customize how invoices are generated and sent to customers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
           <Card className="p-6 space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-4">Invoice Format</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Prefix</label>
                <input type="text" defaultValue="INV-" className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]" />
              </div>
               <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Next Number</label>
                <input type="text" defaultValue="2026-001" className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]" />
              </div>
               <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Due Days</label>
                <input type="number" defaultValue="10" className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]" />
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-4">Invoice Content</h3>
            <div className="space-y-4">
               {[
                 { label: 'Show company logo', checked: true },
                 { label: 'Show customer GSTIN', checked: true },
                 { label: 'Show bank details', checked: true },
                 { label: 'Show amount in words', checked: true },
               ].map(item => (
                 <label key={item.label} className="flex items-center justify-between cursor-pointer">
                   <span className="text-sm text-gray-700">{item.label}</span>
                   <div className="w-10 h-6 bg-[#5E4E99] rounded-full p-1">
                     <div className="w-4 h-4 bg-white rounded-full translate-x-4" />
                   </div>
                 </label>
               ))}
               <div className="space-y-1 pt-2">
                 <label className="text-sm font-medium text-gray-700">Default Notes</label>
                 <textarea defaultValue="Thank you for choosing EzzyCoach." rows={2} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99] text-sm" />
               </div>
            </div>
          </Card>
        </div>

        <div className="sticky top-6">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Preview — Sample Invoice</p>
          <Card className="p-8 shadow-2xl border-purple-100 bg-white min-h-[500px] flex flex-col space-y-8">
            <div className="flex justify-between items-start">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-[#5E4E99] rounded flex items-center justify-center text-white font-black">TF</div>
                 <div>
                    <h4 className="text-[10px] font-black text-gray-900 uppercase leading-none">TECHFLY TECHNOLOGIES</h4>
                    <p className="text-[8px] text-gray-400 max-w-[120px] mt-1">501, Tech Tower, Baner Road, Pune 411045</p>
                 </div>
               </div>
               <div className="text-right">
                 <h2 className="text-xl font-black text-gray-300 uppercase tracking-tighter">INVOICE</h2>
                 <p className="text-xs font-bold text-gray-900 mt-1">#INV-2026-001</p>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-12">
               <div className="space-y-2">
                 <p className="text-[10px] font-bold text-gray-400 uppercase">Bill To:</p>
                 <p className="text-xs font-bold text-gray-900">Sample Customer Institute</p>
                 <p className="text-[10px] text-gray-400">GST: 27AABCT1234M1Z5</p>
               </div>
               <div className="space-y-2 text-right">
                 <div className="flex justify-end gap-4">
                   <span className="text-[10px] font-bold text-gray-400 uppercase">Date:</span>
                   <span className="text-[10px] font-bold text-gray-900">11 Apr 2026</span>
                 </div>
                 <div className="flex justify-end gap-4">
                   <span className="text-[10px] font-bold text-gray-400 uppercase">Due:</span>
                   <span className="text-[10px] font-bold text-gray-900">21 Apr 2026</span>
                 </div>
               </div>
            </div>

            <div className="flex-1">
               <table className="w-full">
                  <thead className="border-b border-gray-900">
                    <tr className="text-[10px] font-black uppercase text-gray-900">
                      <th className="py-2 text-left">Description</th>
                      <th className="py-2 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="py-4 font-bold text-gray-900 text-sm">EzzyCoach Pro — Annual Subscription</td>
                      <td className="py-4 text-right font-bold text-sm">₹10,000.00</td>
                    </tr>
                  </tbody>
               </table>
            </div>

            <div className="flex flex-col items-end pt-4 space-y-2">
               <div className="flex gap-12 text-[10px]">
                 <span className="text-gray-400 font-bold uppercase">CGST @9%</span>
                 <span className="font-bold text-gray-900">₹900.00</span>
               </div>
               <div className="flex gap-12 text-[10px]">
                 <span className="text-gray-400 font-bold uppercase">SGST @9%</span>
                 <span className="font-bold text-gray-900">₹900.00</span>
               </div>
               <div className="flex gap-12 text-lg border-t-2 border-gray-900 pt-2">
                 <span className="font-black text-gray-900">TOTAL</span>
                 <span className="font-black text-gray-900">₹11,800.00</span>
               </div>
               <p className="text-[8px] text-gray-400 italic">Rupees Eleven Thousand Eight Hundred Only</p>
            </div>

            <div className="pt-8 grid grid-cols-2 gap-6 items-end">
               <div className="space-y-1">
                 <p className="text-[8px] font-bold text-gray-900 uppercase">Bank Transfer Details:</p>
                 <div className="text-[8px] text-gray-400 space-y-0.5">
                   <p>HDFC Bank | Acc: 50100123456789</p>
                   <p>IFSC: HDFC0001234 | Baner, Pune</p>
                 </div>
               </div>
               <div className="text-right">
                 <p className="text-[8px] font-bold text-gray-900">Thank you for choosing EzzyCoach.</p>
               </div>
            </div>
          </Card>
          <div className="flex justify-end mt-6">
            <Button className="bg-[#5E4E99] hover:bg-[#4d3f82] text-white">Save Template Settings</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
