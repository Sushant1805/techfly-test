'use client';
import React from 'react';
import { 
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell 
} from '@/components/ui/Table';
import { CustomerAvatar } from '@/components/ui/CustomerAvatar';
import { Badge } from '@/components/ui/Badge';
import { Customer } from '@/lib/customers';
import { Eye, Edit3, MoreHorizontal } from 'lucide-react';

interface CustomerTableProps {
  customers: Customer[];
  selectedRowIds: string[];
  onSelectRow: (id: string) => void;
  onSelectAll: () => void;
  onRowClick: (id: string) => void;
  isPanelOpen: boolean;
  activeId: string | null;
}

export const CustomerTable = ({ 
  customers, selectedRowIds, onSelectRow, onSelectAll, onRowClick, isPanelOpen, activeId 
}: CustomerTableProps) => {

  const getStatusVariant = (status: Customer['planStatus']) => {
    switch (status) {
      case 'Active': return 'Active';
      case 'Trial': return 'Warning';
      case 'Expired': return 'Inactive';
      case 'Pending': return 'default';
      case 'Suspended': return 'Inactive';
      default: return 'default';
    }
  };

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'VIP': return 'bg-purple-50 text-purple-600 border-purple-100';
      case 'Champion': return 'bg-green-50 text-green-600 border-green-100';
      case 'At Risk': return 'bg-red-50 text-red-600 border-red-100';
      case 'Trial': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'New': return 'bg-blue-50 text-blue-600 border-blue-100';
      default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-[32px] shadow-soft border border-white/50 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[50px]">
              <input 
                type="checkbox" 
                className="w-4 h-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue"
                checked={selectedRowIds.length === customers.length && customers.length > 0}
                onChange={onSelectAll}
              />
            </TableHead>
            <TableHead>Institute</TableHead>
            <TableHead>Plan</TableHead>
            <TableHead>Status</TableHead>
            {!isPanelOpen && <TableHead>MRR</TableHead>}
            <TableHead>Assigned To</TableHead>
            {!isPanelOpen && <TableHead>Start Date</TableHead>}
            {!isPanelOpen && <TableHead>Expiry</TableHead>}
            {!isPanelOpen && <TableHead>Last Login</TableHead>}
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((c) => (
            <TableRow 
              key={c.id} 
              onClick={() => onRowClick(c.id)}
              className={`cursor-pointer group ${activeId === c.id ? 'bg-brand-blue/5' : ''}`}
            >
              <TableCell onClick={(e) => e.stopPropagation()}>
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue"
                  checked={selectedRowIds.includes(c.id)}
                  onChange={() => onSelectRow(c.id)}
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <CustomerAvatar name={c.instituteName} initials={c.ownerAvatar} />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-black text-text-slate text-sm leading-none">{c.instituteName}</p>
                      {c.tags.slice(0, 1).map(t => (
                        <span key={t} className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase border ${getTagColor(t)}`}>
                          {t}
                        </span>
                      ))}
                    </div>
                    <p className="text-[11px] font-bold text-gray-400 mt-1 uppercase tracking-tighter">
                      {c.ownerName} · {c.city}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={c.plan as any} className="font-black shadow-sm">{c.plan}</Badge>
                <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-tighter">{c.billingCycle}</p>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${c.planStatus === 'Active' ? 'bg-green-500' : 'bg-gray-300'}`} />
                    <span className="text-[11px] font-black text-text-slate uppercase tracking-widest">{c.planStatus}</span>
                  </div>
                  {c.planStatus === 'Trial' && (
                    <p className="text-[10px] font-black text-orange-500 uppercase tracking-tighter ml-3.5">
                      {c.daysUntilExpiry} days left
                    </p>
                  )}
                </div>
              </TableCell>
              {!isPanelOpen && (
                <TableCell>
                  <p className="text-sm font-black text-text-slate leading-none">₹{c.mrr.toLocaleString()}</p>
                  <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-tighter">₹{c.totalRevenue.toLocaleString()} total</p>
                </TableCell>
              )}
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-600">
                    {c.assignedTo.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className="text-[11px] font-bold text-gray-500">{c.assignedTo}</span>
                </div>
              </TableCell>
              {!isPanelOpen && <TableCell className="text-[13px] font-bold text-gray-500">{c.startDate}</TableCell>}
              {!isPanelOpen && (
                <TableCell>
                  <p className={`text-[13px] font-bold ${c.daysUntilExpiry && c.daysUntilExpiry < 30 ? 'text-orange-500' : 'text-gray-500'}`}>
                    {c.currentPeriodEnd}
                  </p>
                  {c.daysUntilExpiry && c.daysUntilExpiry < 30 && c.daysUntilExpiry > 0 && (
                    <p className="text-[10px] font-black text-orange-500 uppercase tracking-tighter">⚠ {c.daysUntilExpiry} days left</p>
                  )}
                </TableCell>
              )}
              {!isPanelOpen && (
                <TableCell>
                  <p className="text-[13px] font-bold text-gray-500 leading-none">{c.lastLoginDate}</p>
                  <p className="text-[11px] font-bold text-gray-300 mt-1 uppercase tracking-tighter">3 hrs ago</p>
                </TableCell>
              )}
              <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-end gap-1">
                  <button className="p-2 text-gray-400 hover:text-brand-blue hover:bg-brand-blue/5 rounded-xl transition-all">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-brand-blue hover:bg-brand-blue/5 rounded-xl transition-all">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-brand-blue hover:bg-brand-blue/5 rounded-xl transition-all">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {/* Pagination Footer */}
      <div className="px-8 py-5 border-t border-gray-50 flex items-center justify-between bg-gray-50/30">
        <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Showing 1–{customers.length} of {customers.length} customers</p>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 rounded-xl border border-gray-200 text-gray-500 text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all disabled:opacity-50" disabled>Previous</button>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 rounded-lg bg-brand-blue text-white text-[10px] font-black shadow-glow">1</button>
          </div>
          <button className="px-4 py-2 rounded-xl border border-gray-200 text-gray-500 text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all disabled:opacity-50" disabled>Next</button>
        </div>
      </div>
    </div>
  );
};
