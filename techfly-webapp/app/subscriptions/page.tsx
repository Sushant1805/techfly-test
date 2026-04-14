'use client';
import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Plus, Search, Filter, TrendingUp, Users, Clock, AlertTriangle, 
  ChevronDown, ChevronUp, Download, CheckSquare, X, RefreshCw
} from 'lucide-react';
import { subscriptions, Subscription } from '@/lib/subscriptions';
import { SubscriptionTable } from '@/components/subscriptions/SubscriptionTable';
import { SubscriptionPanel } from '@/components/subscriptions/SubscriptionPanel';
import { 
  NewSubscriptionModal, EditSubscriptionModal, RenewModal, CancelModal 
} from '@/components/subscriptions/SubscriptionModals';

export default function SubscriptionsPage() {
  const [search, setSearch] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [selectedSubId, setSelectedSubId] = useState<string | null>(null);
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const [isHealthExpanded, setIsHealthExpanded] = useState(false);

  // Modal States
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRenewModalOpen, setIsRenewModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [modalSub, setModalSub] = useState<Subscription | null>(null);

  const openModal = (sub: Subscription, type: 'edit' | 'renew' | 'cancel') => {
    setModalSub(sub);
    if (type === 'edit') setIsEditModalOpen(true);
    if (type === 'renew') setIsRenewModalOpen(true);
    if (type === 'cancel') setIsCancelModalOpen(true);
  };

  // Filtering logic
  const filteredSubs = useMemo(() => {
    return subscriptions.filter(sub => {
      const searchStr = `${sub.customerName} ${sub.plan} ${sub.city} ${sub.id}`.toLowerCase();
      if (search && !searchStr.includes(search.toLowerCase())) return false;

      // Plan filter
      if (activeFilters.plan && sub.plan !== activeFilters.plan) return false;
      // Status filter
      if (activeFilters.status && sub.planStatus !== activeFilters.status) return false;
      // Health filter
      if (activeFilters.health && sub.health !== activeFilters.health) return false;
      
      return true;
    });
  }, [search, activeFilters]);

  // KPI Stats
  const stats = useMemo(() => {
    const totalMrr = subscriptions.reduce((acc, s) => acc + s.mrr, 0);
    const active = subscriptions.filter(s => s.planStatus === 'Active').length;
    const trials = subscriptions.filter(s => s.planStatus === 'Trial').length;
    const expiring = subscriptions.filter(s => s.daysUntilExpiry && s.daysUntilExpiry > 0 && s.daysUntilExpiry < 30).length;
    const churned = subscriptions.filter(s => ['Expired', 'Cancelled', 'Suspended'].includes(s.planStatus)).length;
    
    return { 
      totalMrr, 
      activeCount: active, 
      trialCount: trials, 
      expiringCount: expiring, 
      churnedCount: churned,
      activeRate: Math.round((active / subscriptions.length) * 100)
    };
  }, []);

  const totalFilteredMrr = useMemo(() => {
    return filteredSubs.reduce((acc, s) => acc + s.mrr, 0);
  }, [filteredSubs]);

  // Handlers
  const toggleSelectAll = () => {
    if (selectedRowIds.length === filteredSubs.length) {
      setSelectedRowIds([]);
    } else {
      setSelectedRowIds(filteredSubs.map(s => s.id));
    }
  };

  const toggleSelectRow = (id: string) => {
    if (selectedRowIds.includes(id)) {
      setSelectedRowIds(selectedRowIds.filter(rid => rid !== id));
    } else {
      setSelectedRowIds([...selectedRowIds, id]);
    }
  };

  const activeSub = useMemo(() => 
    subscriptions.find(s => s.id === selectedSubId) || null,
  [selectedSubId]);

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-700 pb-20">
      
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-black text-text-slate tracking-tight mb-2">Subscriptions</h1>
          <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-3">
            {subscriptions.length} total
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            {stats.activeCount} active
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            {stats.churnedCount} expired/churned
          </p>
        </div>
        <Button 
          onClick={() => setIsNewModalOpen(true)}
          className="rounded-2xl px-6 py-6 font-black uppercase tracking-widest text-xs gap-3 shadow-glow h-14"
        >
          <Plus className="w-5 h-5" /> New Subscription
        </Button>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <KPICard 
          icon={<TrendingUp className="w-6 h-6 text-brand-blue" />}
          label="Total MRR"
          value={`₹${stats.totalMrr.toLocaleString()}/mo`}
          subValue="+₹500 vs last mo"
          color="bg-brand-blue/10"
          sparkline
        />
        <KPICard 
          icon={<Users className="w-6 h-6 text-green-500" />}
          label="Active Subs"
          value={stats.activeCount.toString()}
          subValue={`${stats.activeRate}% active rate`}
          color="bg-green-500/10"
        />
        <KPICard 
          icon={<Clock className="w-6 h-6 text-orange-500" />}
          label="Trial"
          value={stats.trialCount.toString()}
          subValue="14 days left avg"
          color="bg-orange-500/10"
        />
        <KPICard 
          icon={<AlertTriangle className="w-6 h-6 text-red-500" />}
          label="Expiring (30d)"
          value={stats.expiringCount.toString()}
          subValue="⚠ Lakshya, Pinnacle"
          color="bg-red-500/10"
        />
        <KPICard 
          icon={<RefreshCw className="w-6 h-6 text-purple-500" />}
          label="Churned"
          value={stats.churnedCount.toString()}
          subValue="2 this month"
          color="bg-purple-500/10"
        />
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[300px] relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-blue transition-colors" />
            <input 
              type="text"
              placeholder="Search by customer name, plan, city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-gray-100 h-16 pl-14 pr-6 rounded-[24px] text-sm font-bold shadow-soft transition-all focus:outline-none focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue/20"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <FilterDropdown 
              label="Plan" 
              options={['All', 'Free', 'Basic', 'Pro']} 
              value={activeFilters.plan || 'All'}
              onChange={(val) => setActiveFilters(f => ({ ...f, plan: val === 'All' ? '' : val }))}
            />
            <FilterDropdown 
              label="Status" 
              options={['All', 'Active', 'Trial', 'Expired', 'Pending', 'Suspended']} 
              value={activeFilters.status || 'All'}
              onChange={(val) => setActiveFilters(f => ({ ...f, status: val === 'All' ? '' : val }))}
            />
            <FilterDropdown 
              label="Health" 
              options={['All', 'Healthy', 'At Risk', 'New', 'Churned']} 
              value={activeFilters.health || 'All'}
              onChange={(val) => setActiveFilters(f => ({ ...f, health: val === 'All' ? '' : val }))}
            />
            <button className="h-16 w-16 bg-white border border-gray-100 rounded-[24px] shadow-soft flex items-center justify-center text-gray-400 hover:text-brand-blue hover:border-brand-blue/20 transition-all">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Summary Strip */}
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
            <p>Showing <span className="text-brand-blue font-black">{filteredSubs.length}</span></p>
            <div className="w-1 h-1 rounded-full bg-gray-200" />
            <p>MRR: <span className="text-brand-blue font-black">₹{totalFilteredMrr.toLocaleString()}</span></p>
            <div className="w-1 h-1 rounded-full bg-gray-200" />
            <p>ARR: <span className="text-text-slate font-black">₹{(totalFilteredMrr * 12).toLocaleString()}</span></p>
            <div className="w-1 h-1 rounded-full bg-gray-200" />
            <p>Avg Age: <span className="text-text-slate font-black">11.2 months</span></p>
          </div>
        </div>
      </div>

      {/* Main Table Area */}
      <div className="flex gap-8 min-h-0 relative">
        <div className="flex-1 min-w-0 space-y-4">
          {/* Bulk Action Bar */}
          {selectedRowIds.length > 0 && (
            <div className="flex items-center justify-between bg-text-slate text-white px-8 py-5 rounded-[24px] shadow-soft animate-in slide-in-from-top-4 duration-300 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-xl bg-brand-blue flex items-center justify-center shadow-glow">
                  <CheckSquare className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-black uppercase tracking-[0.1em] block">{selectedRowIds.length} subscriptions selected</span>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-0.5">Bulk actions will apply to these records</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-6 py-3 rounded-[14px] bg-white/10 hover:bg-white/20 text-[10px] font-black uppercase tracking-widest transition-all">Send Reminders</button>
                <button className="px-6 py-3 rounded-[14px] bg-white/10 hover:bg-white/20 text-[10px] font-black uppercase tracking-widest transition-all">Toggle Auto-Renew</button>
                <div className="w-px h-8 bg-white/10 mx-2" />
                <button onClick={() => setSelectedRowIds([])} className="p-3 hover:bg-white/10 rounded-full transition-all">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          <SubscriptionTable 
            subscriptions={filteredSubs}
            selectedRowIds={selectedRowIds}
            onSelectRow={toggleSelectRow}
            onSelectAll={toggleSelectAll}
            onRowClick={(id) => setSelectedSubId(id)}
            onEdit={(id) => openModal(subscriptions.find(s => s.id === id)!, 'edit')}
            onRenew={(id) => openModal(subscriptions.find(s => s.id === id)!, 'renew')}
            isPanelOpen={!!selectedSubId}
            activeId={selectedSubId}
          />
        </div>

        {/* Side Panel */}
        <SubscriptionPanel 
          subscription={activeSub}
          isOpen={!!selectedSubId}
          onClose={() => setSelectedSubId(null)}
        />
      </div>

      <NewSubscriptionModal isOpen={isNewModalOpen} onClose={() => setIsNewModalOpen(false)} />
      <EditSubscriptionModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} subscription={modalSub} />
      <RenewModal isOpen={isRenewModalOpen} onClose={() => setIsRenewModalOpen(false)} subscription={modalSub} />
      <CancelModal isOpen={isCancelModalOpen} onClose={() => setIsCancelModalOpen(false)} subscription={modalSub} />

      {/* Health Overview Section */}
      <div className="bg-white rounded-[32px] border border-gray-100 shadow-soft overflow-hidden">
        <button 
          onClick={() => setIsHealthExpanded(!isHealthExpanded)}
          className="w-full flex items-center justify-between px-8 py-6 hover:bg-gray-50/50 transition-all"
        >
          <div className="flex items-center gap-3 text-text-slate">
            <RefreshCw className="w-5 h-5 text-brand-blue" />
            <span className="text-sm font-black uppercase tracking-widest">Subscription Health Overview</span>
          </div>
          {isHealthExpanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
        </button>
        
        {isHealthExpanded && (
          <div className="px-8 pb-8 pt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in slide-in-from-top-4 duration-500">
            <HealthCategory 
              title="Healthy" 
              count={stats.activeCount} 
              color="text-green-500" 
              customers={subscriptions.filter(s => s.health === 'Healthy')} 
            />
            <HealthCategory 
              title="At Risk" 
              count={subscriptions.filter(s => s.health === 'At Risk').length} 
              color="text-orange-500" 
              customers={subscriptions.filter(s => s.health === 'At Risk')}
              reasons={['Auto-renew OFF + expiring in 142 days', 'Free plan, no conversion for 102 days']}
            />
            <HealthCategory 
              title="New" 
              count={stats.trialCount + 1} 
              color="text-brand-blue" 
              customers={subscriptions.filter(s => s.health === 'New')} 
            />
            <HealthCategory 
              title="Churned" 
              count={stats.churnedCount} 
              color="text-red-500" 
              customers={subscriptions.filter(s => s.health === 'Churned')} 
            />
          </div>
        )}
      </div>

    </div>
  );
}

// Sub-components

const KPICard = ({ icon, label, value, subValue, color, sparkline }: any) => (
  <Card className="p-6 h-full flex flex-col justify-between group cursor-pointer hover:shadow-soft-lg transition-all border-none shadow-soft overflow-hidden relative">
    {sparkline && (
      <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-brand-blue to-purple-500 opacity-20" />
    )}
    <div className="flex items-center gap-4 mb-4">
      <div className={`p-3 rounded-2xl ${color} transition-transform group-hover:scale-110`}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</p>
        <p className="text-[13px] font-black text-text-slate mt-0.5">{subValue}</p>
      </div>
    </div>
    <div className="flex items-end justify-between">
      <p className="text-3xl font-black text-text-slate tracking-tighter">{value}</p>
      {sparkline && (
        <div className="flex items-center gap-1">
          {[40, 60, 45, 80, 70, 95].map((h, i) => (
            <div key={i} className="w-1 bg-brand-blue/20 rounded-full h-8 flex items-end">
              <div className="w-full bg-brand-blue rounded-full" style={{ height: `${h}%` }} />
            </div>
          ))}
        </div>
      )}
    </div>
  </Card>
);

const FilterDropdown = ({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) => (
  <div className="relative group">
    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 z-10">
      <Filter className="w-4 h-4" />
    </div>
    <select 
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="appearance-none h-16 pl-14 pr-12 bg-white border border-gray-100 rounded-[24px] shadow-soft text-[11px] font-black uppercase tracking-widest text-text-slate focus:outline-none focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue/20 transition-all cursor-pointer"
    >
      <option value="">All {label}</option>
      {options.filter(o => o !== 'All').map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
    <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
  </div>
);

const HealthCategory = ({ title, count, color, customers, reasons }: any) => (
  <div className="p-4 rounded-3xl bg-slate-soft border border-gray-100/50">
    <div className="flex justify-between items-center mb-6">
      <h4 className={`text-[11px] font-black uppercase tracking-widest ${color}`}>{title} ({count})</h4>
      <div className={`w-2 h-2 rounded-full bg-current ${color}`} />
    </div>
    <div className="space-y-3">
      {customers.map((c: any) => (
        <div key={c.id} className="group">
          <button className="text-sm font-bold text-text-slate hover:text-brand-blue flex items-center gap-2 transition-all">
            {c.customerName}
            <ChevronDown className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          {reasons && reasons[customers.indexOf(c)] && (
            <p className="text-[10px] font-bold text-gray-400 mt-1 italic tracking-tight">{reasons[customers.indexOf(c)]}</p>
          )}
        </div>
      ))}
    </div>
  </div>
);
