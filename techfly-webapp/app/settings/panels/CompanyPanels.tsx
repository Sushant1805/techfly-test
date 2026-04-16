'use client';
import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { mockCompanyProfile } from '../mockData';
import { Save, Upload, Trash2, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export const CompanyProfilePanel = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Company Profile</h2>
          <p className="text-sm text-gray-500">Basic information about TechFly Technologies</p>
        </div>
        <Button className="bg-[#5E4E99] hover:bg-[#4d3f82] text-white gap-2">
          <Save className="w-4 h-4" /> Save Changes
        </Button>
      </div>

      <Card className="p-6 space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-4">Company Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Company Name *</label>
            <input type="text" defaultValue={mockCompanyProfile.name} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Legal Entity Type</label>
            <select className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]">
              <option>Private Limited Company</option>
              <option>LLP</option>
              <option>Sole Proprietorship</option>
              <option>Partnership</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">CIN / Registration Number</label>
            <input type="text" defaultValue={mockCompanyProfile.cin || ''} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Date of Incorporation</label>
            <input type="date" defaultValue={mockCompanyProfile.incorporationDate || ''} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Website *</label>
            <input type="text" defaultValue={mockCompanyProfile.website} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]" />
          </div>
          <div className="space-y-1 md:col-span-2">
            <label className="text-sm font-medium text-gray-700">About / Tagline</label>
            <input type="text" defaultValue={mockCompanyProfile.tagline} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]" />
          </div>
        </div>
      </Card>

      <Card className="p-6 space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Primary Email *</label>
            <input type="email" defaultValue={mockCompanyProfile.primaryEmail} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Sales Email</label>
            <input type="email" defaultValue={mockCompanyProfile.salesEmail} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Billing Email</label>
            <input type="email" defaultValue={mockCompanyProfile.billingEmail} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Primary Phone *</label>
            <input type="text" defaultValue={mockCompanyProfile.primaryPhone} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Secondary Phone (optional)</label>
            <input type="text" defaultValue={mockCompanyProfile.secondaryPhone || ''} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]" />
          </div>
        </div>
      </Card>

      <Card className="p-6 space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-4">Registered Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1 md:col-span-2">
            <label className="text-sm font-medium text-gray-700">Address Line 1 *</label>
            <input type="text" defaultValue={mockCompanyProfile.address.line1} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]" />
          </div>
          <div className="space-y-1 md:col-span-2">
            <label className="text-sm font-medium text-gray-700">Address Line 2 (optional)</label>
            <input type="text" defaultValue={mockCompanyProfile.address.line2} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]" />
          </div>
          <div className="grid grid-cols-3 gap-4 md:col-span-2">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">City *</label>
              <input type="text" defaultValue={mockCompanyProfile.address.city} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">State *</label>
              <input type="text" defaultValue={mockCompanyProfile.address.state} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">PIN Code *</label>
              <input type="text" defaultValue={mockCompanyProfile.address.pinCode} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Country</label>
            <select className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]">
              <option>India</option>
              <option>USA</option>
              <option>UK</option>
            </select>
          </div>
        </div>
      </Card>

      <Card className="p-6 space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-4">Tax Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">GST Number *</label>
            <input type="text" defaultValue={mockCompanyProfile.gstNumber} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">PAN Number</label>
            <input type="text" defaultValue={mockCompanyProfile.panNumber} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">TAN Number (optional)</label>
            <input type="text" defaultValue={mockCompanyProfile.tanNumber || ''} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">MSME Registration (optional)</label>
            <input type="text" defaultValue={mockCompanyProfile.msmeNumber || ''} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]" />
          </div>
        </div>
      </Card>

      <div className="flex justify-end gap-3 pt-4">
        <Button variant="outline">Discard</Button>
        <Button className="bg-[#5E4E99] hover:bg-[#4d3f82] text-white">Save Changes</Button>
      </div>
    </div>
  );
};

export const BrandingPanel = () => {
  const [primaryColor, setPrimaryColor] = useState('#5E4E99');
  const [secondaryColor, setSecondaryColor] = useState('#2A2A37');
  const [accentColor, setAccentColor] = useState('#1D9E75');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Branding & Logo</h2>
        <p className="text-sm text-gray-500">Customize TechFly's brand appearance across the platform and communications</p>
      </div>

      <Card className="p-6 space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-4">Logo</h3>
        <div className="flex flex-col items-center justify-center p-8 border border-dashed border-gray-200 rounded-xl space-y-4">
          <div className="w-20 h-20 bg-[#5E4E99] rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-soft">
            TF
          </div>
          <p className="text-sm font-medium text-gray-900">TechFly Technologies</p>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Upload className="w-4 h-4" /> Upload Logo
            </Button>
            <Button variant="outline" size="sm" className="text-red-500 hover:bg-red-50 gap-2 border-red-100">
              <Trash2 className="w-4 h-4" /> Remove Logo
            </Button>
          </div>
          <p className="text-xs text-gray-400">Recommended: 200×200px PNG/JPG, max 2MB. Used on: Invoices, Emails, Dashboard, Portal.</p>
        </div>
      </Card>

      <Card className="p-6 space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-4">Favicon</h3>
        <div className="flex items-center gap-6">
          <div className="w-8 h-8 bg-[#5E4E99] rounded flex items-center justify-center text-white text-[10px] font-bold">
            TF
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">Upload Favicon</Button>
          </div>
          <p className="text-xs text-gray-400">Recommended: 32×32px ICO or PNG</p>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 border-b pb-4">Brand Colors</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Primary Color</label>
              <div className="flex items-center gap-3">
                <span className="text-sm font-mono text-gray-500 uppercase">{primaryColor}</span>
                <input 
                  type="color" 
                  value={primaryColor} 
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-10 h-10 rounded cursor-pointer border-none p-0 overflow-hidden" 
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Secondary Color</label>
              <div className="flex items-center gap-3">
                <span className="text-sm font-mono text-gray-500 uppercase">{secondaryColor}</span>
                <input 
                  type="color" 
                  value={secondaryColor} 
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="w-10 h-10 rounded cursor-pointer border-none p-0 overflow-hidden" 
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Accent Color</label>
              <div className="flex items-center gap-3">
                <span className="text-sm font-mono text-gray-500 uppercase">{accentColor}</span>
                <input 
                  type="color" 
                  value={accentColor} 
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="w-10 h-10 rounded cursor-pointer border-none p-0 overflow-hidden" 
                />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 border-b pb-4">Preview</h3>
          <div className="border border-gray-100 rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-[#5E4E99]" style={{ backgroundColor: primaryColor }} />
                <span className="text-xs font-bold text-gray-900 leading-none">TECHFLY</span>
              </div>
              <span className="text-[10px] text-gray-400 font-bold uppercase">Invoice</span>
            </div>
            <div className="h-px bg-gray-100" />
            <div className="flex gap-2">
              <div className="px-4 py-1.5 rounded text-[10px] font-bold text-white shadow-sm" style={{ backgroundColor: primaryColor }}>PRIMARY</div>
              <div className="px-4 py-1.5 rounded text-[10px] font-bold border" style={{ borderColor: primaryColor, color: primaryColor }}>OUTLINE</div>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full w-2/3" style={{ backgroundColor: primaryColor }} />
            </div>
            <div className="flex gap-2">
              <Badge variant="purple" className="text-[8px] uppercase">Pro Badge</Badge>
              <div className="px-2 py-0.5 rounded-full text-[8px] font-bold text-white uppercase" style={{ backgroundColor: accentColor }}>Active</div>
              <Badge variant="default" className="text-[8px] uppercase">Expired</Badge>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6 space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-4">Document Branding</h3>
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Invoice Header Text</label>
            <input type="text" defaultValue={mockCompanyProfile.name} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Invoice Footer Text</label>
            <input type="text" defaultValue="Thank you for your business! support@techfly.in" className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Invoice Tagline (optional)</label>
            <input type="text" defaultValue={mockCompanyProfile.tagline} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
             <div className="flex items-center justify-between p-3 rounded-lg border border-gray-100 bg-gray-50/50">
              <span className="text-sm font-medium text-gray-700">Show logo on invoices</span>
              <div className="w-10 h-6 bg-[#5E4E99] rounded-full p-1 cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full translate-x-4" />
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border border-gray-100 bg-gray-50/50">
              <span className="text-sm font-medium text-gray-700">Logo on email headers</span>
              <div className="w-10 h-6 bg-[#5E4E99] rounded-full p-1 cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full translate-x-4" />
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border border-gray-100 bg-gray-50/50">
              <span className="text-sm font-medium text-gray-700">Logo on portal</span>
              <div className="w-10 h-6 bg-[#5E4E99] rounded-full p-1 cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full translate-x-4" />
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex justify-end gap-3 pt-4">
        <Button className="bg-[#5E4E99] hover:bg-[#4d3f82] text-white">Save Changes</Button>
      </div>
    </div>
  );
};

export const LocalizationPanel = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Localization</h2>
        <p className="text-sm text-gray-500">Configure language, timezone, and regional formats</p>
      </div>

      <Card className="p-6 space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-4">Regional Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Default Language</label>
            <select className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]">
              <option>English (India)</option>
              <option>English (US)</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Timezone</label>
            <select className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]">
              <option>Asia/Kolkata (IST, UTC+5:30)</option>
              <option>UTC (GMT)</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Date Format</label>
            <select className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]">
              <option>DD MMM YYYY (e.g. 11 Apr 2026)</option>
              <option>DD/MM/YYYY</option>
              <option>MM/DD/YYYY</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Time Format</label>
            <select className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]">
              <option>12-hour (AM/PM)</option>
              <option>24-hour</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">First Day of Week</label>
            <select className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]">
              <option>Monday</option>
              <option>Sunday</option>
            </select>
          </div>
        </div>
      </Card>

      <Card className="p-6 space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-4">Currency</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Currency</label>
            <select className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]">
              <option>Indian Rupee (₹)</option>
              <option>US Dollar ($)</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Currency Symbol</label>
            <input type="text" defaultValue="₹" className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 outline-none" readOnly />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Number Format</label>
            <select className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]">
              <option>Indian (1,00,000)</option>
              <option>International (100,000)</option>
            </select>
            <p className="text-[10px] text-gray-400 mt-1">Preview: ₹10,00,000</p>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Decimal Places</label>
            <select className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]">
              <option>2</option>
              <option>0</option>
            </select>
          </div>
        </div>
      </Card>

      <Card className="p-6 space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-4">GST Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Default GST Rate</label>
            <div className="flex items-center gap-2">
              <input type="number" defaultValue="18" className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]" />
              <span className="text-gray-500 font-medium">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">GST Type</label>
            <select className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]">
              <option>CGST + SGST (9% + 9%)</option>
              <option>IGST</option>
              <option>Exempt</option>
            </select>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg border border-gray-100 bg-gray-50/50 md:col-span-1">
              <span className="text-sm font-medium text-gray-700">Show GST breakdown on invoices</span>
              <div className="w-10 h-6 bg-[#5E4E99] rounded-full p-1 cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full translate-x-4" />
              </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">GST Registration State</label>
            <select className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]">
              <option>Maharashtra</option>
              <option>Delhi</option>
              <option>Karnataka</option>
            </select>
          </div>
        </div>
      </Card>

      <div className="flex justify-end pt-4">
        <Button className="bg-[#5E4E99] hover:bg-[#4d3f82] text-white">Save Changes</Button>
      </div>
    </div>
  );
};
