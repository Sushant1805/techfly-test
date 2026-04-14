'use client';
import React, { useState } from 'react';
import { initialPermissions, Permission } from '@/lib/settingsData';
import { Button } from '@/components/ui/Button';
import { 
  Shield, Check, AlertCircle, Info, 
  Lock, Eye, Edit2, Trash2, Save 
} from 'lucide-react';

export default function PermissionsPanel() {
  const [permissions, setPermissions] = useState<Permission[]>(initialPermissions);
  const [hasChanges, setHasChanges] = useState(false);

  const togglePermission = (index: number, role: keyof Omit<Permission, 'feature'>) => {
    setPermissions(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [role]: !updated[index][role] };
      return updated;
    });
    setHasChanges(true);
  };

  const roles: (keyof Omit<Permission, 'feature'>)[] = ['teacher', 'admin', 'reception', 'support'];

  return (
    <div className="space-y-10 pb-10">
      {/* Header Info */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-purple-600">
          <Shield size={20} />
          <h2 className="text-sm font-black uppercase tracking-widest">Roles & Permissions</h2>
        </div>
        
        <div className="p-6 bg-purple-50 rounded-[32px] border border-purple-100 flex items-start gap-4 shadow-sm">
           <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-purple-600 shrink-0 shadow-soft">
              <Info size={24} />
           </div>
           <div className="space-y-1">
              <h4 className="text-xs font-black text-purple-900 uppercase tracking-tight">Access Control</h4>
              <p className="text-[11px] font-bold text-purple-700 leading-relaxed uppercase tracking-tighter">
                 Manage what each user role can see and do within the EzzyCoach platform. Changes are effective immediately for all users in that role after saving.
              </p>
           </div>
        </div>
      </section>

      {/* Permissions Matrix */}
      <section className="bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-soft-lg">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-widest px-6 py-4">
              <th className="px-8 py-5 border-r border-gray-100/50 w-1/3">Feature / Module</th>
              {roles.map(role => (
                <th key={role} className="px-6 py-5 text-center uppercase tracking-tighter">
                  {role}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {permissions.map((p, idx) => (
              <tr key={p.feature} className="hover:bg-purple-50/20 transition-all group">
                <td className="px-8 py-5 border-r border-gray-100/50">
                  <span className="text-xs font-black text-gray-900 uppercase tracking-tight transition-colors group-hover:text-purple-600">
                    {p.feature}
                  </span>
                </td>
                {roles.map(role => {
                  const isChecked = p[role];
                  const isDisabled = role === 'admin'; // Admin usually has full access and might be locked
                  return (
                    <td key={role} className="px-6 py-5 text-center">
                      <div className="flex justify-center">
                        <button
                          disabled={isDisabled}
                          onClick={() => togglePermission(idx, role)}
                          className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-300 border-2 ${
                            isDisabled 
                              ? 'bg-purple-100 border-purple-100 text-purple-600 cursor-not-allowed opacity-100' 
                              : isChecked 
                                ? 'bg-purple-600 border-purple-600 text-white shadow-glow' 
                                : 'bg-white border-gray-200 text-gray-200 hover:border-purple-200 hover:text-purple-200'
                          }`}
                        >
                          {isChecked && <Check size={14} strokeWidth={4} />}
                          {!isChecked && !isDisabled && <div className="w-1 h-1 bg-gray-100 rounded-full" />}
                        </button>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Warning Banner */}
      {permissions.some(p => p.feature === 'MARK ATTENDANCE' && !p.teacher) && (
        <div className="p-5 bg-amber-50 rounded-[28px] border border-amber-100 flex items-center gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
           <AlertCircle className="text-amber-600 shrink-0" size={24} />
           <p className="text-[10px] font-black text-amber-900 uppercase tracking-tight italic">
              Warning: Removing "Mark Attendance" from Teachers will prevent them from recording daily student presence.
           </p>
        </div>
      )}

      {/* Action Bar */}
      {hasChanges && (
        <div className="flex justify-center pt-4 animate-in fade-in zoom-in duration-300">
           <Button className="h-12 px-10 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-black uppercase tracking-widest text-xs gap-3 shadow-glow" onClick={() => setHasChanges(false)}>
              <Save size={18} />
              Save Permissions Matrix
           </Button>
        </div>
      )}

      <div className="mt-6 flex flex-col items-center gap-2">
         <div className="flex items-center gap-1.5 text-gray-300">
            <Lock size={12} strokeWidth={3} />
            <span className="text-[9px] font-black uppercase tracking-widest">Admin permissions are locked for system stability</span>
         </div>
      </div>
    </div>
  );
}
