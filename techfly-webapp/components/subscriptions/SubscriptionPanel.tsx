'use client';
import React, { useState } from 'react';
import { Subscription, historyItems, invoices as allInvoices } from '@/lib/subscriptions';
import { SlidePanel } from '@/components/ui/SlidePanel';
import { CustomerAvatar } from '@/components/ui/CustomerAvatar';
import { Badge } from '@/components/ui/Badge';
import { 
  X, Edit2, RotateCw, ArrowUpCircle, Bell, MoreHorizontal, 
  Calendar, CreditCard, Activity, Clock, FileText, ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface SubscriptionPanelProps {
  subscription: Subscription | null;
  isOpen: boolean;
  onClose: () => void;
}

export const SubscriptionPanel = ({ subscription, isOpen, onClose }: SubscriptionPanelProps) => {
  const [activeTab, setActiveTab] = useState<'Details' | 'History' | 'Invoices' | 'Activity'>('Details');

  if (!subscription) return null;

  const subInvoices = allInvoices.filter(inv => inv.customerId === subscription.customerId);
  const subHistory = historyItems.filter(h => h.subscriptionId === subscription.id);

  // Progress calc
  const start = new Date(subscription.currentPeriodStart).getTime();
  const end = new Date(subscription.currentPeriodEnd).getTime();
  const today = new Date('2026-04-11').getTime();
  const total = end - start;
  const elapsed = total > 0 ? Math.min(100, Math.max(0, ((today - start) / total) * 100)) : 0;

  return (
    <SlidePanel isOpen={isOpen} onClose={onClose} width="w-[500px]">
      <div className="h-full flex flex-col bg-slate-soft">
        {/* Header */}
        <div className="bg-white p-8 pb-6 border-b border-gray-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
          
          <div className="flex justify-between items-start mb-6 relative z-10">
            <CustomerAvatar name={subscription.customerName} initials={subscription.ownerAvatar} size="lg" />
            <div className="flex items-center gap-2">
              <button className="p-2.5 rounded-xl hover:bg-bg-soft text-gray-400 hover:text-brand-blue transition-all">
                <Edit2 className="w-5 h-5" />
              </button>
              <button 
                onClick={onClose}
                className="p-2.5 rounded-xl hover:bg-bg-soft text-gray-400 hover:text-brand-blue transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="relative z-10">
            <h2 className="text-2xl font-black text-text-slate tracking-tight mb-2 leading-none">{subscription.customerName}</h2>
            <p className="text-sm font-bold text-gray-400 mb-6">{subscription.ownerName} · {subscription.city}</p>
            
            <div className="flex flex-wrap gap-2">
              <Badge variant={subscription.plan === 'Pro' ? 'purple' : subscription.plan === 'Basic' ? 'info' : 'default'}>{subscription.plan}</Badge>
              <Badge variant={subscription.planStatus === 'Active' ? 'success' : 'warning'}>{subscription.planStatus}</Badge>
              <Badge variant={subscription.health === 'Healthy' ? 'success' : 'warning'} dot>{subscription.health}</Badge>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between bg-bg-soft/50 p-4 rounded-2xl border border-gray-100">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">MRR</p>
              <p className="text-xl font-black text-brand-blue">₹{subscription.mrr.toLocaleString()}</p>
            </div>
            <div className="w-px h-8 bg-gray-200" />
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">ARR</p>
              <p className="text-xl font-black text-text-slate">₹{subscription.arr.toLocaleString()}</p>
            </div>
            <div className="w-px h-8 bg-gray-200" />
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Since</p>
              <p className="text-xl font-black text-text-slate">{new Date(subscription.startDate).getFullYear()}</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 flex gap-2">
            <Button size="sm" className="flex-1 rounded-xl gap-2 font-black shadow-none bg-brand-blue/10 text-brand-blue hover:bg-brand-blue/20">
              <RotateCw className="w-4 h-4" /> Renew
            </Button>
            <Button size="sm" className="flex-1 rounded-xl gap-2 font-black shadow-none bg-purple-500/10 text-purple-600 hover:bg-purple-500/20">
              <ArrowUpCircle className="w-4 h-4" /> Upgrade
            </Button>
            <Button size="sm" className="flex-1 rounded-xl gap-2 font-black shadow-none bg-orange-500/10 text-orange-600 hover:bg-orange-500/20">
              <Bell className="w-4 h-4" /> Reminder
            </Button>
            <button className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 transition-all border border-gray-100">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-8 mt-6">
          <div className="flex items-center gap-8 border-b border-gray-100">
            {['Details', 'History', 'Invoices', 'Activity'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`pb-4 text-[11px] font-black uppercase tracking-[0.2em] transition-all relative ${
                  activeTab === tab ? 'text-brand-blue' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab}
                {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-blue rounded-full" />}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {activeTab === 'Details' && (
            <div className="space-y-6">
              {/* Subscription Info Card */}
              <div className="bg-white rounded-3xl p-6 shadow-soft border border-gray-50 flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-brand-blue/10 rounded-xl">
                    <CreditCard className="w-5 h-5 text-brand-blue" />
                  </div>
                  <h3 className="text-sm font-black text-text-slate uppercase tracking-wider">Subscription Info</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-y-4">
                  <InfoItem label="Subscription ID" value={subscription.id} />
                  <InfoItem label="Plan" value={subscription.plan} />
                  <InfoItem label="Billing Cycle" value={subscription.billingCycle || '—'} />
                  <InfoItem label="Status" value={subscription.planStatus} status />
                  <InfoItem label="Days Active" value={`${subscription.daysActive} days`} />
                  <InfoItem label="Days Remaining" value={`${subscription.daysUntilExpiry} days`} />
                </div>

                <div className="pt-4 border-t border-gray-50">
                  <div className="flex justify-between items-end mb-2">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Period Progress</p>
                    <p className="text-[10px] font-black text-brand-blue uppercase">{Math.round(elapsed)}% elapsed</p>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-blue" style={{ width: `${elapsed}%` }} />
                  </div>
                  <p className="text-[11px] font-bold text-gray-400 mt-2">
                    {new Date(subscription.currentPeriodStart).toLocaleDateString()} – {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Renewal Info Card */}
              <div className="bg-white rounded-3xl p-6 shadow-soft border border-gray-50 flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/10 rounded-xl">
                    <Calendar className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="text-sm font-black text-text-slate uppercase tracking-wider">Renewal Info</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-y-4">
                  <div className="flex flex-col gap-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Auto Renew</p>
                    <div className={`mt-1 inline-flex items-center gap-2 px-2 py-1 rounded-lg border ${subscription.autoRenew ? 'bg-green-50 text-green-600 border-green-100' : 'bg-gray-50 text-gray-400 border-gray-100'}`}>
                      <span className="text-[10px] font-black uppercase">{subscription.autoRenew ? 'ON' : 'OFF'}</span>
                    </div>
                  </div>
                  <InfoItem label="Next Billing" value={new Date(subscription.nextBillingDate || '').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} />
                  <InfoItem label="Next Amount" value={`₹${(subscription.nextBillingAmount || 0).toLocaleString()}`} />
                  <InfoItem label="Payment Mode" value={subscription.paymentMode || '—'} />
                </div>
              </div>

              {/* Customer Link */}
              <div className="bg-white rounded-3xl p-4 shadow-soft border border-gray-50 flex items-center justify-between group cursor-pointer hover:border-brand-blue/30 transition-all">
                <div className="flex items-center gap-4">
                  <CustomerAvatar name={subscription.customerName} initials={subscription.ownerAvatar} size="sm" />
                  <div>
                    <p className="text-sm font-black text-text-slate">{subscription.customerName}</p>
                    <p className="text-[11px] font-bold text-gray-400 uppercase">{subscription.city}</p>
                  </div>
                </div>
                <div className="p-2 transition-transform group-hover:translate-x-1">
                  <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-brand-blue" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'History' && (
            <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
              {subHistory.length > 0 ? subHistory.map((event) => (
                <div key={event.id} className="relative pl-10">
                  <div className={`absolute left-0 top-1 w-6 h-6 rounded-lg border-4 border-white shadow-sm flex items-center justify-center ${
                    event.type === 'renewed' ? 'bg-green-500' : 
                    event.type === 'upgraded' ? 'bg-purple-500' : 
                    'bg-brand-blue'
                  }`} />
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">
                      {new Date(event.timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                    <h4 className="text-sm font-black text-text-slate mb-1">
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      {event.fromPlan && event.toPlan && ` — ${event.fromPlan} → ${event.toPlan}`}
                    </h4>
                    <p className="text-xs font-bold text-gray-400 leading-relaxed mb-2">{event.notes}</p>
                    <p className="text-[10px] font-black text-brand-blue uppercase tracking-widest">{event.performedBy}</p>
                  </div>
                </div>
              )) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                    <Clock className="w-8 h-8 text-gray-200" />
                  </div>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">No history records</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'Invoices' && (
            <div className="space-y-3">
              {subInvoices.length > 0 ? subInvoices.map(inv => (
                <div key={inv.id} className="bg-white p-4 rounded-2xl shadow-soft border border-gray-50 flex items-center justify-between hover:border-brand-blue/30 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100 group-hover:bg-brand-blue/5 transition-colors">
                      <FileText className="w-5 h-5 text-gray-400 group-hover:text-brand-blue" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-text-slate uppercase tracking-wider">{inv.invoiceNumber}</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase mt-0.5">{inv.date} · ₹{inv.totalAmount.toLocaleString()}</p>
                    </div>
                  </div>
                  <Badge variant={inv.status === 'Paid' ? 'success' : 'warning'}>{inv.status}</Badge>
                </div>
              )) : (
                <div className="text-center py-12">
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">No invoices found</p>
                </div>
              )}
              <Button variant="outline" className="w-full mt-4 rounded-2xl border-dashed font-black text-[11px] uppercase tracking-widest hover:bg-bg-soft">
                View Full Invoices Table
              </Button>
            </div>
          )}

          {activeTab === 'Activity' && (
            <div className="space-y-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
                    <Activity className="w-4 h-4 text-gray-400" />
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-text-slate uppercase tracking-wider mb-1">Support Activity</h5>
                    <p className="text-xs font-bold text-gray-400 leading-relaxed mb-2">Automated system check performed. SSL certificate valid. Domain pointing active.</p>
                    <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">{i} hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </SlidePanel>
  );
};

const InfoItem = ({ label, value, status }: { label: string; value: string; status?: boolean }) => (
  <div className="flex flex-col gap-1">
    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</p>
    {status ? (
      <div className="inline-flex mt-0.5">
        <Badge variant={value === 'Active' ? 'success' : 'warning'}>{value}</Badge>
      </div>
    ) : (
      <p className="text-sm font-bold text-text-slate tracking-tight">{value}</p>
    )}
  </div>
);
