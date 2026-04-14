'use client';
import React, { useState } from 'react';
import { initialProfile, InstituteProfile } from '@/lib/settingsData';
import { Input } from '@/components/ui/Input';
import { 
  Building2, User, Landmark, History, Hash, 
  MapPin, Phone, Mail, Globe, MessageCircle
} from 'lucide-react';

const Facebook = ({ size, className }: { size: number, className: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Instagram = ({ size, className }: { size: number, className: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const Youtube = ({ size, className }: { size: number, className: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.14 1 12 1 12s0 3.86.42 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.86 23 12 23 12s0-3.86-.42-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
);

export default function ProfilePanel() {
  const [profile, setProfile] = useState<InstituteProfile>(initialProfile);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProfile(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof InstituteProfile] as any),
          [child]: value
        }
      }));
    } else {
      setProfile(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="space-y-10">
      {/* Basic Details */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-purple-600 mb-2">
          <Building2 size={20} />
          <h2 className="text-sm font-black uppercase tracking-widest">Basic Details</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[11px] font-black text-gray-400 ml-1 uppercase">Institute Name *</label>
            <Input 
              name="name"
              value={profile.name}
              onChange={handleChange}
              placeholder="e.g. Raj Science Classes"
              className="rounded-2xl border-gray-100 bg-gray-50/50 h-12 px-5 font-bold focus:ring-4 focus:ring-purple-500/10"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[11px] font-black text-gray-400 ml-1 uppercase">Owner / Director Name *</label>
            <Input 
              name="ownerName"
              value={profile.ownerName}
              onChange={handleChange}
              placeholder="e.g. Rajesh Mehta"
              className="rounded-2xl border-gray-100 bg-gray-50/50 h-12 px-5 font-bold focus:ring-4 focus:ring-purple-500/10"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-[11px] font-black text-gray-400 ml-1 uppercase">Institute Type</label>
            <select 
              name="type"
              value={profile.type}
              onChange={(e) => setProfile(prev => ({ ...prev, type: e.target.value as any }))}
              className="w-full rounded-2xl border border-gray-100 bg-gray-50/50 h-12 px-5 font-bold outline-none focus:ring-4 focus:ring-purple-500/10 appearance-none"
            >
              <option>Coaching Class</option>
              <option>School</option>
              <option>College</option>
              <option>Tuition Center</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-[11px] font-black text-gray-400 ml-1 uppercase">Established Year</label>
            <div className="relative">
              <History size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input 
                name="establishedYear"
                type="number"
                value={profile.establishedYear.toString()}
                onChange={handleChange}
                className="rounded-2xl border-gray-100 bg-gray-50/50 h-12 pl-12 pr-5 font-bold focus:ring-4 focus:ring-purple-500/10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-black text-gray-400 ml-1 uppercase">Registration Number</label>
            <div className="relative">
              <Landmark size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input 
                name="registrationNumber"
                value={profile.registrationNumber || ''}
                onChange={handleChange}
                placeholder="REG-XXXX-XXXX"
                className="rounded-2xl border-gray-100 bg-gray-50/50 h-12 pl-12 pr-5 font-bold focus:ring-4 focus:ring-purple-500/10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-black text-gray-400 ml-1 uppercase">GST Number (Optional)</label>
            <div className="relative">
              <Hash size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input 
                name="gstNumber"
                value={profile.gstNumber || ''}
                onChange={handleChange}
                placeholder="27XXXXXXXXXXXXX"
                className="rounded-2xl border-gray-100 bg-gray-50/50 h-12 pl-12 pr-5 font-bold focus:ring-4 focus:ring-purple-500/10"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[11px] font-black text-gray-400 ml-1 uppercase">About / Description</label>
          <textarea 
            name="description"
            value={profile.description}
            onChange={(e) => setProfile(prev => ({ ...prev, description: e.target.value }))}
            rows={4}
            className="w-full rounded-3xl border border-gray-100 bg-gray-50/50 p-5 font-bold outline-none focus:ring-4 focus:ring-purple-500/10 resize-none transition-all"
            placeholder="Tell us about your institute..."
          />
          <div className="flex justify-between items-center px-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase italic">Max 500 characters</span>
            <span className={`text-[10px] font-black ${profile.description.length > 450 ? 'text-red-500' : 'text-gray-400'}`}>
              {profile.description.length} / 500
            </span>
          </div>
        </div>
      </section>

      <hr className="border-gray-50" />

      {/* Contact Information */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-purple-600 mb-2">
          <Phone size={20} />
          <h2 className="text-sm font-black uppercase tracking-widest">Contact Information</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[11px] font-black text-gray-400 ml-1 uppercase">Primary Phone *</label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">+91</span>
              <Input 
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className="rounded-2xl border-gray-100 bg-gray-50/50 h-12 pl-14 pr-5 font-bold focus:ring-4 focus:ring-purple-500/10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[11px] font-black text-gray-400 ml-1 uppercase">Secondary Phone</label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">+91</span>
              <Input 
                name="secondaryPhone"
                value={profile.secondaryPhone || ''}
                onChange={handleChange}
                className="rounded-2xl border-gray-100 bg-gray-50/50 h-12 pl-14 pr-5 font-bold focus:ring-4 focus:ring-purple-500/10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[11px] font-black text-gray-400 ml-1 uppercase">Email Address *</label>
            <div className="relative">
              <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input 
                name="email"
                type="email"
                value={profile.email}
                onChange={handleChange}
                className="rounded-2xl border-gray-100 bg-gray-50/50 h-12 pl-12 pr-5 font-bold focus:ring-4 focus:ring-purple-500/10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[11px] font-black text-gray-400 ml-1 uppercase">Website</label>
            <div className="relative">
              <Globe size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input 
                name="website"
                value={profile.website || ''}
                onChange={handleChange}
                placeholder="www.yourinstitute.com"
                className="rounded-2xl border-gray-100 bg-gray-50/50 h-12 pl-12 pr-5 font-bold focus:ring-4 focus:ring-purple-500/10"
              />
            </div>
          </div>
        </div>
      </section>

      <hr className="border-gray-50" />

      {/* Address */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-purple-600 mb-2">
          <MapPin size={20} />
          <h2 className="text-sm font-black uppercase tracking-widest">Institute Address</h2>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[11px] font-black text-gray-400 ml-1 uppercase">Address Line 1 *</label>
            <Input 
              name="address.line1"
              value={profile.address.line1}
              onChange={handleChange}
              className="rounded-2xl border-gray-100 bg-gray-50/50 h-12 px-5 font-bold focus:ring-4 focus:ring-purple-500/10"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[11px] font-black text-gray-400 ml-1 uppercase">Address Line 2</label>
            <Input 
              name="address.line2"
              value={profile.address.line2 || ''}
              onChange={handleChange}
              className="rounded-2xl border-gray-100 bg-gray-50/50 h-12 px-5 font-bold focus:ring-4 focus:ring-purple-500/10"
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 ml-1 uppercase">City *</label>
              <Input 
                name="address.city"
                value={profile.address.city}
                onChange={handleChange}
                className="rounded-2xl border-gray-100 bg-gray-50/50 h-12 px-5 font-bold focus:ring-4 focus:ring-purple-500/10"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 ml-1 uppercase">State *</label>
              <Input 
                name="address.state"
                value={profile.address.state}
                onChange={handleChange}
                className="rounded-2xl border-gray-100 bg-gray-50/50 h-12 px-5 font-bold focus:ring-4 focus:ring-purple-500/10"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 ml-1 uppercase">PIN Code *</label>
              <Input 
                name="address.pinCode"
                value={profile.address.pinCode}
                onChange={handleChange}
                className="rounded-2xl border-gray-100 bg-gray-50/50 h-12 px-5 font-bold focus:ring-4 focus:ring-purple-500/10"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 ml-1 uppercase">Country</label>
              <select 
                name="address.country"
                value={profile.address.country}
                onChange={(e) => setProfile(prev => ({ ...prev, address: { ...prev.address, country: e.target.value } }))}
                className="w-full rounded-2xl border border-gray-100 bg-gray-50/50 h-12 px-5 font-bold outline-none focus:ring-4 focus:ring-purple-500/10 appearance-none"
              >
                <option>India</option>
                <option>USA</option>
                <option>UK</option>
                <option>Canada</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-gray-50" />

      {/* Social Media */}
      <section className="space-y-6 pb-6">
        <div className="flex items-center gap-2 text-purple-600 mb-2">
          <Globe size={20} />
          <h2 className="text-sm font-black uppercase tracking-widest">Social Media Links</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[11px] font-black text-gray-400 ml-1 uppercase italic">WhatsApp Business Number</label>
            <div className="relative">
              <MessageCircle size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input 
                name="social.whatsapp"
                value={profile.social.whatsapp || ''}
                onChange={handleChange}
                className="rounded-2xl border-gray-100 bg-gray-50/50 h-12 pl-12 pr-5 font-bold focus:ring-4 focus:ring-purple-500/10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[11px] font-black text-gray-400 ml-1 uppercase italic">Facebook Page URL</label>
            <div className="relative">
              <Facebook size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input 
                name="social.facebook"
                value={profile.social.facebook || ''}
                onChange={handleChange}
                className="rounded-2xl border-gray-100 bg-gray-50/50 h-12 pl-12 pr-5 font-bold focus:ring-4 focus:ring-purple-500/10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[11px] font-black text-gray-400 ml-1 uppercase italic">Instagram Handle</label>
            <div className="relative">
              <Instagram size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input 
                name="social.instagram"
                value={profile.social.instagram || ''}
                onChange={handleChange}
                className="rounded-2xl border-gray-100 bg-gray-50/50 h-12 pl-12 pr-5 font-bold focus:ring-4 focus:ring-purple-500/10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[11px] font-black text-gray-400 ml-1 uppercase italic">YouTube Channel</label>
            <div className="relative">
              <Youtube size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input 
                name="social.youtube"
                value={profile.social.youtube || ''}
                onChange={handleChange}
                className="rounded-2xl border-gray-100 bg-gray-50/50 h-12 pl-12 pr-5 font-bold focus:ring-4 focus:ring-purple-500/10"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
