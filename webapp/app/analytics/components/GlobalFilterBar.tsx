'use client';
import React from 'react';
import { Calendar, ChevronDown, Filter, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { GlobalFilter } from '@/lib/analyticsData';

interface GlobalFilterBarProps {
  filters: GlobalFilter;
  onFilterChange: (newFilters: Partial<GlobalFilter>) => void;
}

export default function GlobalFilterBar({ filters, onFilterChange }: GlobalFilterBarProps) {
  const presets: { id: GlobalFilter['dateRange']; label: string }[] = [
    { id: 'thisWeek', label: 'This Week' },
    { id: 'thisMonth', label: 'This Month' },
    { id: 'lastMonth', label: 'Last Month' },
    { id: 'last3Months', label: 'Last 3 Months' },
    { id: 'thisYear', label: 'This Year' },
    { id: 'custom', label: 'Custom' },
  ];

  return (
    <div className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
      {/* Presets */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
        {presets.map((preset) => (
          <button
            key={preset.id}
            onClick={() => onFilterChange({ dateRange: preset.id })}
            className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
              filters.dateRange === preset.id
                ? 'bg-purple-600 border-purple-600 text-white shadow-md'
                : 'bg-white border-gray-200 text-gray-500 hover:border-purple-200 hover:text-purple-600'
            }`}
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Selectors and Actions */}
      <div className="flex flex-wrap items-center gap-3">
        {filters.dateRange === 'custom' && (
          <div className="flex items-center gap-2 animate-in slide-in-from-left-2">
            <input 
              type="date" 
              className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium focus:ring-2 focus:ring-purple-500 outline-none" 
              value={filters.dateFrom}
              onChange={(e) => onFilterChange({ dateFrom: e.target.value })}
            />
            <span className="text-gray-400 text-xs">to</span>
            <input 
              type="date" 
              className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium focus:ring-2 focus:ring-purple-500 outline-none" 
              value={filters.dateTo}
              onChange={(e) => onFilterChange({ dateTo: e.target.value })}
            />
          </div>
        )}

        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={filters.batchId}
              onChange={(e) => onFilterChange({ batchId: e.target.value })}
              className="appearance-none pl-9 pr-8 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-700 outline-none focus:ring-2 focus:ring-purple-500 transition-all cursor-pointer"
            >
              <option value="all">All Batches</option>
              <option value="BAT001">Batch A</option>
              <option value="BAT002">Batch B</option>
              <option value="BAT003">Batch C</option>
            </select>
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
          </div>

          <div className="relative">
            <select
              value={filters.standard}
              onChange={(e) => onFilterChange({ standard: e.target.value })}
              className="appearance-none pl-9 pr-8 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-700 outline-none focus:ring-2 focus:ring-purple-500 transition-all cursor-pointer"
            >
              <option value="all">All Standards</option>
              <option value="9">Std 9</option>
              <option value="10">Std 10</option>
              <option value="11">Std 11</option>
              <option value="12">Std 12</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
          </div>

          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-400 hover:text-purple-600 gap-1.5 h-8 font-bold text-[11px] uppercase tracking-wider"
            onClick={() => onFilterChange({ 
              dateRange: 'thisMonth', 
              batchId: 'all', 
              standard: 'all',
              dateFrom: '2026-04-01',
              dateTo: '2026-04-30'
            })}
          >
            <RotateCcw size={14} />
            Reset
          </Button>

          <Button className="bg-purple-600 hover:bg-purple-700 h-8 px-4 font-bold text-[11px] uppercase tracking-wider shadow-sm">
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
}
