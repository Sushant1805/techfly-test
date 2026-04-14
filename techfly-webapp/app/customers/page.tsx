'use client';
import React, { useState, useMemo } from 'react';
import { FilterRow } from '@/components/customers/FilterRow';
import { CustomerTable } from '@/components/customers/CustomerTable';
import { CustomerCardGrid } from '@/components/customers/CustomerCardGrid';
import { CustomerPanel } from '@/components/customers/CustomerPanel';
import { AddCustomerModal } from '@/components/customers/AddCustomerModal';
import { customers as mockCustomers, Customer } from '@/lib/customers';
import { LayoutDashboard, LayoutGrid, CheckSquare, X } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export default function CustomersPage() {
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');
  const [search, setSearch] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);

  // Filtering Logic
  const filteredCustomers = useMemo(() => {
    return mockCustomers.filter(c => {
      // Search matches
      const searchStr = `${c.instituteName} ${c.ownerName} ${c.phone} ${c.email} ${c.city}`.toLowerCase();
      if (search && !searchStr.includes(search.toLowerCase())) return false;

      // Active filters matches
      for (const [key, value] of Object.entries(activeFilters)) {
        if (value && c[key as keyof Customer] !== value) return false;
      }

      return true;
    });
  }, [search, activeFilters]);

  // Stats
  const stats = useMemo(() => {
    const active = mockCustomers.filter(c => c.planStatus === 'Active').length;
    const expired = mockCustomers.filter(c => c.planStatus === 'Expired').length;
    const trial = mockCustomers.filter(c => c.planStatus === 'Trial').length;
    return { total: mockCustomers.length, active, expired, trial };
  }, []);

  const totalMrr = useMemo(() => {
    return filteredCustomers.reduce((acc, c) => acc + c.mrr, 0);
  }, [filteredCustomers]);

  const toggleSelectAll = () => {
    if (selectedRowIds.length === filteredCustomers.length) {
      setSelectedRowIds([]);
    } else {
      setSelectedRowIds(filteredCustomers.map(c => c.id));
    }
  };

  const toggleSelectRow = (id: string) => {
    if (selectedRowIds.includes(id)) {
      setSelectedRowIds(selectedRowIds.filter(rid => rid !== id));
    } else {
      setSelectedRowIds([...selectedRowIds, id]);
    }
  };

  const selectedCustomer = useMemo(() => 
    mockCustomers.find(c => c.id === selectedCustomerId) || null,
  [selectedCustomerId]);

  return (
    <div className="relative h-full flex flex-col gap-8 animate-in fade-in duration-700">
      
      <FilterRow 
        onAddClick={() => setIsAddModalOpen(true)}
        search={search}
        setSearch={setSearch}
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
        counts={stats}
      />

      {/* View Toggle & Summary Strip */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6 text-[11px] font-black uppercase tracking-widest text-gray-400">
          <p>Showing {filteredCustomers.length} customers</p>
          <div className="w-1 h-1 rounded-full bg-gray-200" />
          <p>MRR: <span className="text-brand-blue">₹{totalMrr.toLocaleString()}</span></p>
          <div className="w-1 h-1 rounded-full bg-gray-200" />
          <p>Active: <span className="text-green-500">{stats.active}</span></p>
          <div className="w-1 h-1 rounded-full bg-gray-200" />
          <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
            <span className="text-orange-500">Expiring in 30 days: 1</span>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-white p-1 rounded-xl shadow-soft border border-gray-100">
          <button 
            onClick={() => setViewMode('table')}
            className={`p-2 rounded-lg transition-all ${viewMode === 'table' ? 'bg-brand-blue text-white shadow-glow' : 'text-gray-400 hover:bg-gray-50'}`}
          >
            <LayoutDashboard className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setViewMode('card')}
            className={`p-2 rounded-lg transition-all ${viewMode === 'card' ? 'bg-brand-blue text-white shadow-glow' : 'text-gray-400 hover:bg-gray-50'}`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content Area: List + SidePanel */}
      <div className="flex-1 flex gap-8 min-h-0">
        <div className="flex-1 min-w-0 space-y-4">
          {/* Bulk Action Bar */}
          {selectedRowIds.length > 0 && (
            <div className="flex items-center justify-between bg-text-slate text-white px-6 py-4 rounded-3xl shadow-soft animate-in slide-in-from-top-4 duration-300">
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 rounded bg-brand-blue flex items-center justify-center">
                  <CheckSquare className="w-4 h-4" />
                </div>
                <span className="text-xs font-black uppercase tracking-widest">{selectedRowIds.length} customers selected</span>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-[10px] font-black uppercase tracking-widest transition-all">Send Email</button>
                <button className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-[10px] font-black uppercase tracking-widest transition-all">Change Assigned</button>
                <button className="px-4 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/40 text-red-100 text-[10px] font-black uppercase tracking-widest transition-all">Delete</button>
                <div className="w-px h-6 bg-white/10 mx-2" />
                <button onClick={() => setSelectedRowIds([])} className="p-2 hover:bg-white/10 rounded-full transition-all">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {viewMode === 'table' ? (
            <CustomerTable 
              customers={filteredCustomers}
              selectedRowIds={selectedRowIds}
              onSelectRow={toggleSelectRow}
              onSelectAll={toggleSelectAll}
              onRowClick={(id) => setSelectedCustomerId(id)}
              isPanelOpen={!!selectedCustomerId}
              activeId={selectedCustomerId}
            />
          ) : (
            <CustomerCardGrid 
              customers={filteredCustomers}
              onCardClick={(id) => setSelectedCustomerId(id)}
              activeId={selectedCustomerId}
            />
          )}
        </div>

        {/* Side Detail Panel beside the table */}
        <CustomerPanel 
          customer={selectedCustomer}
          isOpen={!!selectedCustomerId}
          onClose={() => setSelectedCustomerId(null)}
        />
      </div>

      <AddCustomerModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

    </div>
  );
}
