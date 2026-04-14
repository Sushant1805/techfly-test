'use client';
import React from 'react';
import { Search, Plus, ChevronDown, X, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface FilterRowProps {
  onAddClick: () => void;
  search: string;
  setSearch: (val: string) => void;
  activeFilters: Record<string, string>;
  setActiveFilters: (filters: Record<string, string>) => void;
  counts: { total: number; active: number; expired: number; trial: number };
}

export const FilterRow = ({ onAddClick, search, setSearch, activeFilters, setActiveFilters, counts }: FilterRowProps) => {
  const filterOptions = [
    { label: 'Plan', key: 'plan', options: ['Free', 'Basic', 'Pro'] },
    { label: 'Status', key: 'planStatus', options: ['Active', 'Trial', 'Expired', 'Pending', 'Suspended'] },
    { label: 'Assigned To', key: 'assignedTo', options: ['Vikram Shah', 'Neha Gupta', 'Ravi Tiwari', 'Pooja Mehta'] },
    { label: 'City', key: 'city', options: ['Pune', 'Mumbai', 'Nagpur', 'Nashik', 'Aurangabad', 'Solapur', 'Hyderabad', 'Kolhapur'] },
  ];

  const removeFilter = (key: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [key]: _, ...rest } = activeFilters;
    setActiveFilters(rest);
  };

  const clearAll = () => setActiveFilters({});

  return (
    <div className="space-y-6">
      {/* Top Banner: Stats & Add */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-text-slate tracking-tighter">Customers</h1>
          <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest leading-none">
            {counts.total} total · {counts.active} active · {counts.expired} expired · {counts.trial} trial
          </p>
        </div>
        <Button onClick={onAddClick} className="shadow-glow h-11 px-6">
          <Plus className="w-5 h-5 mr-2" />
          Add Customer
        </Button>
      </div>

      {/* Toolbar Row 1: Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md group">
          <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-brand-blue transition-colors" />
          <input 
            type="text" 
            placeholder="Search name, owner, city, email..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-white/50 rounded-2xl text-[13px] font-bold shadow-soft focus:outline-none focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue/20 transition-all placeholder:text-gray-300"
          />
        </div>
        
        <div className="flex items-center gap-2 px-4 py-3 bg-white border border-white/50 rounded-2xl text-[13px] font-bold shadow-soft text-gray-400 cursor-pointer hover:text-brand-blue transition-colors">
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </div>
      </div>

      {/* Filter Chips Container */}
      <div className="flex flex-wrap items-center gap-3">
        {filterOptions.map((f) => (
          <div key={f.key} className="relative group">
            <select 
              value={activeFilters[f.key] || ''}
              onChange={(e) => setActiveFilters({ ...activeFilters, [f.key]: e.target.value })}
              className="appearance-none bg-white border border-white/50 rounded-xl px-4 py-2 pr-9 text-[11px] font-black uppercase tracking-widest shadow-sm hover:shadow-soft transition-all focus:outline-none cursor-pointer"
            >
              <option value="">{f.label}: ALL</option>
              {f.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none group-hover:text-brand-blue transition-colors" />
          </div>
        ))}
        
        <div className="h-6 w-px bg-gray-200 mx-1" />

        {Object.entries(activeFilters).map(([key, value]) => (
          <div key={key} className="flex items-center gap-2 bg-brand-blue/10 text-brand-blue px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-brand-blue/20 animate-in zoom-in-95 duration-200">
            <span className="opacity-50">{key}:</span> {value}
            <button onClick={() => removeFilter(key)} className="hover:text-brand-blue-dark">
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}

        {Object.keys(activeFilters).length > 0 && (
          <button 
            onClick={clearAll}
            className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-red-500 transition-colors"
          >
            Clear All
          </button>
        )}
      </div>
    </div>
  );
};
