import React from 'react';
import { Subscription } from '@/lib/subscriptions';
import { CustomerAvatar } from '@/components/ui/CustomerAvatar';
import { Badge } from '@/components/ui/Badge';
import { MoreHorizontal, Edit2, RotateCw } from 'lucide-react';

interface SubscriptionTableProps {
  subscriptions: Subscription[];
  selectedRowIds: string[];
  onSelectRow: (id: string) => void;
  onSelectAll: () => void;
  onRowClick: (id: string) => void;
  onEdit: (id: string) => void;
  onRenew: (id: string) => void;
  isPanelOpen: boolean;
  activeId: string | null;
}

export const SubscriptionTable = ({
  subscriptions,
  selectedRowIds,
  onSelectRow,
  onSelectAll,
  onRowClick,
  onEdit,
  onRenew,
  isPanelOpen,
  activeId
}: SubscriptionTableProps) => {

  const getHealthBadge = (health: string) => {
    switch (health) {
      case 'Healthy': return <Badge variant="success" dot>Healthy</Badge>;
      case 'At Risk': return <Badge variant="warning" icon="⚠">At Risk</Badge>;
      case 'New': return <Badge variant="info" icon="✦">New</Badge>;
      case 'Churned': return <Badge variant="danger" icon="✗">Churned</Badge>;
      default: return <Badge>{health}</Badge>;
    }
  };

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case 'Pro': return <Badge variant="purple">Pro</Badge>;
      case 'Basic': return <Badge variant="info">Basic</Badge>;
      default: return <Badge variant="default">Free</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active': return <Badge variant="success">Active</Badge>;
      case 'Trial': return <Badge variant="warning">Trial</Badge>;
      case 'Expired': return <Badge variant="danger">Expired</Badge>;
      case 'Suspended': return <Badge variant="warning">Suspended</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="bg-white rounded-[32px] shadow-soft border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-50 uppercase text-[10px] font-black text-gray-400 tracking-[0.2em]">
              <th className="pl-8 py-6 w-12">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue"
                  checked={selectedRowIds.length === subscriptions.length && subscriptions.length > 0}
                  onChange={onSelectAll}
                />
              </th>
              <th className="px-6 py-6">Customer</th>
              <th className="px-6 py-6">Plan</th>
              <th className="px-6 py-6 text-center">Status</th>
              <th className="px-6 py-6 text-center">Health</th>
              <th className="px-6 py-6 text-right">MRR</th>
              <th className="px-6 py-6">Period</th>
              <th className="px-6 py-6 text-center">Auto Renew</th>
              <th className="px-6 py-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {subscriptions.map((sub) => {
              const isActive = activeId === sub.id;
              
              // Progress calc for the small bar
              const start = new Date(sub.currentPeriodStart).getTime();
              const end = new Date(sub.currentPeriodEnd).getTime();
              const today = new Date('2026-04-11').getTime(); // Mock fixed date
              const total = end - start;
              const elapsed = total > 0 ? Math.min(100, Math.max(0, ((today - start) / total) * 100)) : 0;

              return (
                <tr 
                  key={sub.id}
                  onClick={() => onRowClick(sub.id)}
                  className={`group h-20 transition-all cursor-pointer ${isActive ? 'bg-bg-soft' : 'hover:bg-gray-50/50'}`}
                >
                  <td className="pl-8 py-4" onClick={(e) => e.stopPropagation()}>
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue"
                      checked={selectedRowIds.includes(sub.id)}
                      onChange={() => onSelectRow(sub.id)}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <CustomerAvatar name={sub.customerName} initials={sub.ownerAvatar} size="sm" />
                      <div>
                        <p className="text-sm font-black text-text-slate leading-tight">{sub.customerName}</p>
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-tighter mt-0.5">{sub.city} • {sub.assignedTo}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1 items-start">
                      {getPlanBadge(sub.plan)}
                      {sub.billingCycle && (
                        <p className="text-[10px] font-black text-gray-400 tracking-tighter uppercase">{sub.billingCycle}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col gap-1 items-center">
                      {getStatusBadge(sub.planStatus)}
                      {sub.planStatus === 'Trial' && sub.trialDaysRemaining && (
                        <p className="text-[10px] font-bold text-orange-500 uppercase">{sub.trialDaysRemaining}d remaining</p>
                      )}
                      {sub.planStatus === 'Expired' && (
                        <p className="text-[10px] font-bold text-red-500 uppercase">Expired Jan</p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex">
                      {getHealthBadge(sub.health)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="text-sm font-black text-text-slate leading-tight">₹{sub.mrr.toLocaleString()}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mt-0.5">₹{sub.arr.toLocaleString()} arr</p>
                  </td>
                  <td className="px-6 py-4 min-w-[180px]">
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-end">
                        <p className="text-[10px] font-black text-gray-400 tracking-tighter uppercase">
                          {new Date(sub.currentPeriodStart).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} – 
                          {new Date(sub.currentPeriodEnd).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                        <p className="text-[10px] font-black text-brand-blue tracking-tighter uppercase">{sub.daysUntilExpiry}d left</p>
                      </div>
                      <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-brand-blue transition-all duration-1000" 
                          style={{ width: `${elapsed}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center" onClick={(e) => e.stopPropagation()}>
                    <button className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 ${sub.autoRenew ? 'bg-green-500' : 'bg-gray-200'}`}>
                      <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${sub.autoRenew ? 'translate-x-4' : 'translate-x-0'}`} />
                    </button>
                  </td>
                  <td className="px-8 py-4 text-center" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => onEdit(sub.id)}
                        className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-brand-blue transition-all"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => onRenew(sub.id)}
                        className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-brand-blue transition-all"
                      >
                        <RotateCw className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-brand-blue transition-all">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
