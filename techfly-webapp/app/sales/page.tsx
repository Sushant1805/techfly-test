'use client';
import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Plus, Search, Filter, LayoutGrid, List, 
  ArrowUpRight, Users, TrendingUp, CheckCircle2, Flame
} from 'lucide-react';
import { leads as initialLeads, Lead, LeadStage } from '@/lib/salesData';
import { KanbanBoard } from '@/components/sales/KanbanBoard';
import { LeadList } from '@/components/sales/LeadList';
import { LeadPanel } from '@/components/sales/LeadPanel';
import { 
  AddLeadModal, ConvertLeadModal, MarkLostModal, 
  FollowUpModal, DemoModal 
} from '@/components/sales/SalesModals';

export default function SalesPage() {
  const [viewMode, setViewMode] = useState<'Kanban' | 'List'>('Kanban');
  const [search, setSearch] = useState('');
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isConvertModalOpen, setIsConvertModalOpen] = useState(false);
  const [isLostModalOpen, setIsLostModalOpen] = useState(false);
  const [isFollowUpModalOpen, setIsFollowUpModalOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [modalLead, setModalLead] = useState<Lead | null>(null);

  // Stats
  const stats = useMemo(() => {
    const total = leads.length;
    const active = leads.filter(l => l.stage !== 'Converted' && l.stage !== 'Lost').length;
    const converted = leads.filter(l => l.stage === 'Converted').length;
    const lost = leads.filter(l => l.stage === 'Lost').length;
    const winRate = total > 0 ? Math.round((converted / (converted + lost)) * 100) : 0;
    const pipelineValue = leads
      .filter(l => l.stage !== 'Converted' && l.stage !== 'Lost')
      .reduce((acc, l) => acc + l.expectedMRR, 0);

    return { total, active, converted, lost, winRate, pipelineValue };
  }, [leads]);

  const filteredLeads = useMemo(() => {
    return leads.filter(l => {
      const searchStr = `${l.instituteName} ${l.contactPerson} ${l.city}`.toLowerCase();
      return searchStr.includes(search.toLowerCase());
    });
  }, [leads, search]);

  const handleMoveLead = (leadId: string, newStage: LeadStage) => {
    const lead = leads.find(l => l.id === leadId);
    if (!lead) return;

    if (newStage === 'Converted') {
      setModalLead(lead);
      setIsConvertModalOpen(true);
      return;
    }

    if (newStage === 'Lost') {
      setModalLead(lead);
      setIsLostModalOpen(true);
      return;
    }

    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, stage: newStage, updatedAt: new Date().toISOString() } : l));
  };

  const handleAction = (type: string, lead: Lead) => {
    setModalLead(lead);
    if (type === 'schedule') setIsFollowUpModalOpen(true);
    if (type === 'stage') {
       // Open move stage modal or logic
    }
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-700 pb-20">
      
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <div className="flex items-center gap-3 mb-2">
             <div className="w-10 h-10 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
               <Flame className="w-6 h-6" />
             </div>
             <h1 className="text-4xl font-black text-text-slate tracking-tight">CRM Pipeline</h1>
          </div>
          <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">{stats.total} leads · ₹{stats.pipelineValue.toLocaleString()} pipeline value · {stats.converted} converted</p>
        </div>
        <Button 
          onClick={() => setIsAddModalOpen(true)}
          className="rounded-2xl px-6 py-6 font-black uppercase tracking-widest text-xs gap-3 shadow-glow h-14 bg-brand-blue"
        >
          <Plus className="w-5 h-5" /> Add Lead
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <KPICard label="Total Leads" value={stats.total.toString()} icon={<Users className="w-4 h-4" />} color="bg-brand-blue/10 text-brand-blue" />
        <KPICard label="Active Pipeline" value={stats.active.toString()} icon={<TrendingUp className="w-4 h-4" />} color="bg-purple-500/10 text-purple-600" />
        <KPICard label="Pipe Value" value={`₹${stats.pipelineValue.toLocaleString()}`} icon={<div className="font-black text-xs">₹</div>} color="bg-amber-500/10 text-amber-600" />
        <KPICard label="Converted" value={stats.converted.toString()} subValue="this month" icon={<CheckCircle2 className="w-4 h-4" />} color="bg-green-500/10 text-green-600" />
        <KPICard label="Win Rate" value={`${stats.winRate}%`} subValue="Avg across all" icon={<ArrowUpRight className="w-4 h-4" />} color="bg-indigo-500/10 text-indigo-600" />
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex-1 min-w-[300px] relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-blue transition-colors" />
          <input 
            type="text"
            placeholder="Search by institute, contact, city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-gray-100 h-16 pl-14 pr-6 rounded-[24px] text-sm font-bold shadow-soft transition-all focus:outline-none focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue/20"
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-white p-1.5 rounded-2xl shadow-soft border border-gray-100 flex items-center gap-1">
             <button 
               onClick={() => setViewMode('Kanban')}
               className={`p-3 rounded-xl transition-all ${viewMode === 'Kanban' ? 'bg-text-slate text-white shadow-soft' : 'text-gray-400 hover:text-text-slate'}`}
             >
               <LayoutGrid className="w-5 h-5" />
             </button>
             <button 
               onClick={() => setViewMode('List')}
               className={`p-3 rounded-xl transition-all ${viewMode === 'List' ? 'bg-text-slate text-white shadow-soft' : 'text-gray-400 hover:text-text-slate'}`}
             >
               <List className="w-5 h-5" />
             </button>
          </div>
          <Button variant="outline" className="h-16 px-8 rounded-2xl border-gray-100 bg-white font-black uppercase tracking-widest text-[11px] gap-2 shadow-soft">
            <Filter className="w-4 h-4" /> Filters
          </Button>
        </div>
      </div>

      {/* Main Grid area */}
      <div className="relative">
        <div className={`transition-all duration-500 ${selectedLead ? 'mr-[520px]' : ''}`}>
           {viewMode === 'Kanban' ? (
             <KanbanBoard 
              leads={filteredLeads} 
              onMoveLead={handleMoveLead}
              onSelectLead={setSelectedLead}
             />
           ) : (
             <LeadList 
              leads={filteredLeads}
              onSelectLead={setSelectedLead}
             />
           )}
        </div>

        <LeadPanel 
          lead={selectedLead}
          isOpen={!!selectedLead}
          onClose={() => setSelectedLead(null)}
          onAction={handleAction}
        />
      </div>

      {/* Modals */}
      <AddLeadModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      <ConvertLeadModal isOpen={isConvertModalOpen} onClose={() => setIsConvertModalOpen(false)} lead={modalLead} />
      <MarkLostModal isOpen={isLostModalOpen} onClose={() => setIsLostModalOpen(false)} lead={modalLead} />
      <FollowUpModal isOpen={isFollowUpModalOpen} onClose={() => setIsFollowUpModalOpen(false)} lead={modalLead} />
      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} lead={modalLead} />

    </div>
  );
}

const KPICard = ({ label, value, subValue, icon, color }: any) => (
  <Card className="p-6 border-none shadow-soft flex flex-col justify-between group hover:shadow-soft-lg transition-all relative overflow-hidden">
    <div className="flex items-center gap-4 mb-4">
      <div className={`p-3 rounded-xl ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</p>
        {subValue && <p className="text-[9px] font-black text-brand-blue uppercase mt-0.5">{subValue}</p>}
      </div>
    </div>
    <p className="text-3xl font-black text-text-slate tracking-tighter leading-none">{value}</p>
  </Card>
);
